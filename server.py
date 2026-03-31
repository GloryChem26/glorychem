"""
GloryChem — Python Web Server with Socket.IO
Run locally:  python server.py
              hoặc: flask run --port 5000
Deploy Render: uvicorn server:app --host 0.0.0.0 --port $PORT --workers 1
"""

import asyncio
import os
import uuid
import random
import threading

from flask import Flask, send_file, send_from_directory, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# ══════════════════════════════════════
#   APP SETUP
# ══════════════════════════════════════
app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "glorychem-secret-2025")

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    async_mode="threading",
    ping_timeout=60,
    ping_interval=25,
    max_http_buffer_size=1_000_000,
    logger=False,
    engineio_logger=False,
)

# ══════════════════════════════════════
#   SUPABASE
# ══════════════════════════════════════
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://cmrbsiuzrpsglynnfund.supabase.co")
SUPABASE_KEY = os.environ.get(
    "SUPABASE_KEY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcmJzaXV6cnBzZ2x5bm5mdW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg0ODY3MywiZXhwIjoyMDkwNDI0NjczfQ.plgqzEWW505FqZegHzCklxO-JKXFsXhjegfdrbvU-7E",
)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ══════════════════════════════════════
#   IN-MEMORY STATE
# ══════════════════════════════════════
queued_players: list  = []
game_rooms:     dict  = {}
online_users:   dict  = {}   # sid -> user_data
sid_to_uid:     dict  = {}   # sid -> userId
uid_to_sid:     dict  = {}   # userId -> sid
pending_invites: dict = {}   # key -> invite metadata
lobby_rooms:    dict  = {}   # room_id -> lobby_room_data

_state_lock = threading.Lock()


# ══════════════════════════════════════
#   HELPERS
# ══════════════════════════════════════
def broadcast_presence():
    socketio.emit("presence_update", list(online_users.values()))


def make_user_payload(u):
    return {
        "userId":     u.get("userId"),
        "full_name":  u.get("full_name", ""),
        "username":   u.get("username", ""),
        "elo":        u.get("elo", 1200),
        "wins":       u.get("wins", 0),
        "losses":     u.get("losses", 0),
        "avatar_url": u.get("avatar_url", ""),
    }


def _safe_room_payload(room):
    """Room object an toàn để gửi client — KHÔNG có password."""
    return {
        "id":          room["id"],
        "name":        room["name"],
        "host_sid":    room["host_sid"],
        "players":     room["players"],
        "max_players": room["max_players"],
        "is_private":  room["is_private"],
        "state":       room["state"],
    }


def broadcast_lobby_rooms_list():
    """Gửi danh sách phòng đang chờ cho tất cả client.
    Hiện cả public lẫn private (client sẽ hiện khóa 🔒 cho private).
    """
    rooms_info = []
    for rid, room in lobby_rooms.items():
        if room["state"] == "waiting":
            rooms_info.append({
                "id":           rid,
                "name":         room["name"],
                "player_count": len(room["players"]),
                "max_players":  room["max_players"],
                "host_name":    online_users.get(room["host_sid"], {}).get("full_name", "Chủ phòng"),
                "is_private":   room["is_private"],
            })
    socketio.emit("lobby_rooms_list", rooms_info)


def _remove_sid_from_lobby_rooms(sid):
    """Xóa sid khỏi tất cả lobby rooms khi disconnect."""
    changed = False
    rooms_to_delete = []

    for room_id, room in list(lobby_rooms.items()):
        if sid not in room["players"]:
            continue
        changed = True
        del room["players"][sid]
        leave_room(room_id)

        if sid == room["host_sid"] and room["players"]:
            room["host_sid"] = next(iter(room["players"]))

        if not room["players"]:
            rooms_to_delete.append(room_id)
        else:
            socketio.emit(
                "lobby_room_update",
                {"roomId": room_id, "players": room["players"], "host_sid": room["host_sid"]},
                room=room_id,
            )

    for room_id in rooms_to_delete:
        lobby_rooms.pop(room_id, None)

    if changed:
        broadcast_lobby_rooms_list()


def scores_by_uid(room):
    return {
        room["players"][sid]["user"].get("userId"): room["scores"].get(sid, 0)
        for sid in room["players"]
    }


def sanitize_q(q):
    """Bỏ đáp án / giải thích trước khi gửi về client."""
    return {k: v for k, v in q.items() if k not in ("correct", "exp")}


def cancel_timer(room, key):
    h = room.pop(key, None)
    if h is None:
        return
    try:
        if hasattr(h, "cancel"):
            h.cancel()
    except Exception:
        pass


def _schedule(delay: float, fn, *args):
    """Schedule fn(*args) sau delay giây, thread-safe."""
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            async def _coro():
                await asyncio.sleep(delay)
                fn(*args)
            return loop.create_task(_coro())
    except RuntimeError:
        pass
    t = threading.Timer(delay, fn, args)
    t.daemon = True
    t.start()
    return t


def calc_elo(elo1, elo2, score1, score2, k=32):
    if score1 > score2:
        s1, s2 = 1, 0
    elif score1 < score2:
        s1, s2 = 0, 1
    else:
        s1 = s2 = 0.5
    e1 = 1 / (1 + 10 ** ((elo2 - elo1) / 400))
    e2 = 1 / (1 + 10 ** ((elo1 - elo2) / 400))
    return int(elo1 + k * (s1 - e1)), int(elo2 + k * (s2 - e2))


def calc_ffa_elo(players_data, k=32):
    """
    Tính ELO cho trận FFA (Free-for-All).
    players_data: list of {"userId": str, "elo": int, "score": int}
    Mỗi player so sánh với tất cả player còn lại, K chia đều cho (n-1) cặp.
    Returns dict: {userId: elo_change (int)}
    """
    n = len(players_data)
    if n < 2:
        return {p["userId"]: 0 for p in players_data}
    elo_changes = {p["userId"]: 0.0 for p in players_data}
    for i in range(n):
        pi = players_data[i]
        for j in range(n):
            if i == j:
                continue
            pj = players_data[j]
            if pi["score"] > pj["score"]:
                s = 1.0
            elif pi["score"] < pj["score"]:
                s = 0.0
            else:
                s = 0.5
            expected = 1.0 / (1 + 10 ** ((pj["elo"] - pi["elo"]) / 400))
            elo_changes[pi["userId"]] += (k / (n - 1)) * (s - expected)
    return {uid: round(v) for uid, v in elo_changes.items()}


def _fetch_profiles_safe(user_ids: list) -> dict:
    try:
        res = (
            supabase.table("profiles")
            .select("id, elo, wins, losses, full_name, username, avatar_url")
            .in_("id", user_ids)
            .execute()
        )
        return {p["id"]: p for p in (res.data or [])}
    except Exception as e:
        print(f"[DB] fetch_profiles error: {e}")
        return {}


def end_battle_and_update(room_id):
    """Kết thúc trận: tính ELO, cập nhật DB, emit kết quả, cleanup."""
    room = game_rooms.get(room_id)
    if not room or room.get("result_sent"):
        return
    room["result_sent"] = True
    cancel_timer(room, "_q_timer")

    players_items = list(room["players"].items())
    if len(players_items) < 2:
        game_rooms.pop(room_id, None)
        return

    mode = room.get("mode", "1v1")
    user_ids = [p["user"].get("userId") for _, p in players_items]
    profiles  = _fetch_profiles_safe(user_ids)

    # ── FFA: Xếp hạng theo điểm, ELO theo so sánh cặp ──
    if mode == "ffa":
        players_data = []
        for sid, p in players_items:
            uid   = p["user"].get("userId")
            elo   = profiles.get(uid, {}).get("elo") or p["user"].get("elo", 1200)
            score = room["scores"].get(sid, 0)
            players_data.append({"userId": uid, "sid": sid, "elo": elo, "score": score})

        elo_changes   = calc_ffa_elo(players_data)
        scores_by_uid_map = {pd["userId"]: pd["score"] for pd in players_data}
        max_score     = max(scores_by_uid_map.values(), default=0)
        # Có thể hòa: lấy người đầu tiên theo thứ tự sort
        winners       = [pd["userId"] for pd in players_data if pd["score"] == max_score]
        winner_uid    = winners[0] if winners else None

        db_ok = True
        try:
            for pd in players_data:
                uid      = pd["userId"]
                profile  = profiles.get(uid, {})
                new_elo  = max(100, pd["elo"] + elo_changes.get(uid, 0))
                is_winner = uid in winners and pd["score"] == max_score and max_score > 0
                upd = {
                    "elo":    new_elo,
                    "wins":   (profile.get("wins") or 0) + (1 if is_winner else 0),
                    "losses": (profile.get("losses") or 0) + (0 if is_winner else 1),
                }
                supabase.table("profiles").update(upd).eq("id", uid).execute()
                with _state_lock:
                    s_sid = uid_to_sid.get(uid) or pd["sid"]
                    if s_sid and s_sid in online_users:
                        online_users[s_sid].update({"elo": new_elo, "wins": upd["wins"], "losses": upd["losses"]})
            print(f"[DB] FFA ELO updated: {elo_changes}")
        except Exception as e:
            print(f"[DB] FFA update error: {e}")
            db_ok = False

        broadcast_presence()
        socketio.emit("battle_result", {
            "mode":        "ffa",
            "scores":      scores_by_uid_map,
            "elo_change":  elo_changes,
            "winnerUserId": winner_uid,
            "db_updated":  db_ok,
        }, room=room_id)

    # ── 1v1 (giữ nguyên logic cũ) ──
    else:
        (sid1, p1), (sid2, p2) = players_items[:2]
        u1, u2   = p1["user"], p2["user"]
        user1_id = u1.get("userId")
        user2_id = u2.get("userId")
        score1   = room["scores"].get(sid1, 0)
        score2   = room["scores"].get(sid2, 0)

        p1_db = profiles.get(user1_id, {})
        p2_db = profiles.get(user2_id, {})
        elo1  = p1_db.get("elo") or u1.get("elo", 1200)
        elo2  = p2_db.get("elo") or u2.get("elo", 1200)

        new_elo1, new_elo2 = calc_elo(elo1, elo2, score1, score2)
        new_elo1 = max(100, new_elo1)
        new_elo2 = max(100, new_elo2)
        win1 = score1 > score2
        win2 = score2 > score1

        upd1 = {"elo": new_elo1, "wins": p1_db.get("wins", u1.get("wins", 0)) + (1 if win1 else 0), "losses": p1_db.get("losses", u1.get("losses", 0)) + (1 if win2 else 0)}
        upd2 = {"elo": new_elo2, "wins": p2_db.get("wins", u2.get("wins", 0)) + (1 if win2 else 0), "losses": p2_db.get("losses", u2.get("losses", 0)) + (1 if win1 else 0)}

        db_ok = True
        try:
            supabase.table("profiles").update(upd1).eq("id", user1_id).execute()
            supabase.table("profiles").update(upd2).eq("id", user2_id).execute()
            print(f"[DB] ELO updated: {user1_id}→{new_elo1} | {user2_id}→{new_elo2}")
        except Exception as e:
            print(f"[DB] update error: {e}")
            db_ok = False

        with _state_lock:
            for sid, upd, uid in [(sid1, upd1, user1_id), (sid2, upd2, user2_id)]:
                for store_sid in [sid, uid_to_sid.get(uid)]:
                    if store_sid and store_sid in online_users:
                        online_users[store_sid].update({"elo": upd["elo"], "wins": upd["wins"], "losses": upd["losses"]})

        broadcast_presence()
        socketio.emit(
            "battle_result",
            {"scores": {user1_id: score1, user2_id: score2},
             "elo_change": {user1_id: new_elo1 - elo1, user2_id: new_elo2 - elo2},
             "winnerUserId": user1_id if win1 else user2_id if win2 else None,
             "db_updated": db_ok},
            room=room_id,
        )

    game_rooms.pop(room_id, None)

    # Reset lobby room nếu trận này từ lobby
    for l_id, l_room in lobby_rooms.items():
        if l_room.get("current_battle_room_id") == room_id:
            l_room["state"] = "waiting"
            l_room["current_battle_room_id"] = None
            socketio.emit("lobby_battle_ended", {"roomId": l_id}, room=l_id)
            broadcast_lobby_rooms_list()
            break


# ══════════════════════════════════════
#   STATIC ROUTES
# ══════════════════════════════════════
@app.route("/")
def index():
    return send_file("index.html")


@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(".", filename)


@app.route("/health")
def health():
    return {"status": "ok", "app": "GloryChem", "online": len(online_users),
            "lobby_rooms": len(lobby_rooms), "game_rooms": len(game_rooms)}, 200


# ══════════════════════════════════════
#   AVATAR UPLOAD
# ══════════════════════════════════════
ALLOWED_MIME     = {"image/jpeg", "image/png", "image/webp", "image/gif"}
MAX_AVATAR_BYTES = 3 * 1024 * 1024


@app.route("/upload-avatar", methods=["POST"])
def upload_avatar():
    try:
        import base64, time
        body    = request.get_json(force=True)
        user_id = body.get("userId", "").strip()
        mime    = body.get("mime", "image/jpeg")
        b64data = body.get("data", "")

        if not user_id:
            return {"error": "userId required"}, 400
        if mime not in ALLOWED_MIME:
            return {"error": "Loại file không hỗ trợ (chỉ jpg/png/webp/gif)"}, 400

        raw = base64.b64decode(b64data)
        if len(raw) > MAX_AVATAR_BYTES:
            return {"error": "Ảnh quá lớn (tối đa 3 MB)"}, 413

        ext  = mime.split("/")[1].replace("jpeg", "jpg")
        path = f"avatars/{user_id}.{ext}"
        supabase.storage.from_("avatars").upload(path, raw, {"content-type": mime, "upsert": "true"})
        pub        = supabase.storage.from_("avatars").get_public_url(path)
        avatar_url = f"{pub}?v={int(time.time())}"
        supabase.table("profiles").update({"avatar_url": avatar_url}).eq("id", user_id).execute()

        uid_sid = uid_to_sid.get(user_id)
        if uid_sid and uid_sid in online_users:
            online_users[uid_sid]["avatar_url"] = avatar_url
            broadcast_presence()

        return {"url": avatar_url}, 200
    except Exception as e:
        print("upload_avatar error:", e)
        return {"error": str(e)}, 500


# ══════════════════════════════════════
#   CONNECTION LIFECYCLE
# ══════════════════════════════════════
@socketio.on("connect")
def handle_connect():
    print(f"[+] Connect: {request.sid}")


@socketio.on("disconnect")
def handle_disconnect():
    sid = request.sid
    print(f"[-] Disconnect: {sid}")

    global queued_players
    queued_players = [p for p in queued_players if p[0] != sid]

    user_data = online_users.pop(sid, None)
    if user_data:
        uid = user_data.get("userId")
        if uid and uid_to_sid.get(uid) == sid:
            uid_to_sid.pop(uid, None)
        sid_to_uid.pop(sid, None)

    # Xử lý game rooms (trận 1v1 đang diễn ra)
    rooms_to_remove = []
    for room_id, room in game_rooms.items():
        if sid in room["players"] and room["state"] in ("lobby", "battle"):
            for other in [s for s in room["players"] if s != sid]:
                socketio.emit("opponent_left", {"msg": "Đối thủ đã ngắt kết nối."}, room=other)
            rooms_to_remove.append(room_id)
    for room_id in rooms_to_remove:
        game_rooms.pop(room_id, None)

    # ✅ FIX: Xóa khỏi lobby rooms (bug cũ bỏ sót)
    _remove_sid_from_lobby_rooms(sid)

    broadcast_presence()


# ══════════════════════════════════════
#   LOBBY ROOMS — TẠO / XEM / VÀO / RỜI
# ══════════════════════════════════════

@socketio.on("create_lobby_room")
def handle_create_lobby_room(data):
    sid  = request.sid
    user = online_users.get(sid)
    if not user:
        emit("error", {"msg": "Chưa đăng nhập"}); return

    name       = (data.get("name") or f"Phòng của {user.get('full_name') or user.get('username', 'Bạn')}").strip()
    is_private = bool(data.get("isPrivate", False))
    password   = data.get("password", "").strip() if is_private else ""

    if not name:
        emit("error", {"msg": "Tên phòng không được để trống"}); return
    if is_private and not password:
        emit("error", {"msg": "Phòng riêng tư cần đặt mật khẩu"}); return

    room_id = str(uuid.uuid4())
    lobby_rooms[room_id] = {
        "id":                     room_id,
        "name":                   name,
        "host_sid":               sid,
        "players":                {sid: user},
        "max_players":            5,
        "is_private":             is_private,
        "password":               password,   # server-side only
        "state":                  "waiting",
        "current_battle_room_id": None,
    }
    join_room(room_id)

    # ✅ FIX: Chỉ gửi _safe_room_payload — không lộ password
    emit("lobby_room_created", {
        "roomId": room_id,
        "room":   _safe_room_payload(lobby_rooms[room_id]),
    })
    broadcast_lobby_rooms_list()
    print(f"[LOBBY] Created '{name}' id={room_id[:8]} private={is_private}")


@socketio.on("list_lobby_rooms")
def handle_list_lobby_rooms():
    broadcast_lobby_rooms_list()


@socketio.on("join_lobby_room")
def handle_join_lobby_room(data):
    sid      = request.sid
    user     = online_users.get(sid)
    if not user:
        emit("error", {"msg": "Chưa đăng nhập"}); return

    room_id  = data.get("roomId")
    password = data.get("password", "")
    room     = lobby_rooms.get(room_id)

    if not room:
        emit("error", {"msg": "Phòng không tồn tại"}); return
    if room["state"] != "waiting":
        emit("error", {"msg": "Phòng đang trong trận đấu"}); return
    if len(room["players"]) >= room["max_players"]:
        emit("error", {"msg": "Phòng đã đầy (tối đa 5 người)"}); return
    if room["is_private"] and room["password"] != password:
        emit("error", {"msg": "Sai mật khẩu phòng"}); return

    # Đã trong phòng → refresh
    if sid in room["players"]:
        emit("lobby_room_joined", {"roomId": room_id, "room": _safe_room_payload(room)}); return

    room["players"][sid] = user
    join_room(room_id)

    emit("lobby_room_joined", {"roomId": room_id, "room": _safe_room_payload(room)})
    if "ready_players" not in room: room["ready_players"] = []
    socketio.emit(
        "lobby_room_update",
        {"roomId": room_id, "players": room["players"], "host_sid": room["host_sid"], "ready_players": room["ready_players"]},
        room=room_id,
    )
    broadcast_lobby_rooms_list()
    print(f"[LOBBY] {user.get('full_name','?')} joined {room_id[:8]}")


@socketio.on("leave_lobby_room")
def handle_leave_lobby_room(data):
    sid     = request.sid
    room_id = data.get("roomId")
    room    = lobby_rooms.get(room_id)
    if not room or sid not in room["players"]:
        return

    del room["players"][sid]
    if "ready_players" in room and sid in room["ready_players"]:
        room["ready_players"].remove(sid)
    leave_room(room_id)

    if sid == room["host_sid"] and room["players"]:
        room["host_sid"] = next(iter(room["players"]))

    if not room["players"]:
        lobby_rooms.pop(room_id, None)
        print(f"[LOBBY] Room {room_id[:8]} deleted (empty)")
    else:
        socketio.emit(
            "lobby_room_update",
            {"roomId": room_id, "players": room["players"], "host_sid": room["host_sid"], "ready_players": room.get("ready_players", [])},
            room=room_id,
        )

    broadcast_lobby_rooms_list()


@socketio.on("toggle_lobby_ready")
def handle_toggle_lobby_ready(data):
    sid = request.sid
    room_id = data.get("roomId")
    room = lobby_rooms.get(room_id)
    if not room or sid not in room["players"] or sid == room["host_sid"]:
        return

    if "ready_players" not in room:
        room["ready_players"] = []
    
    if sid in room["ready_players"]:
        room["ready_players"].remove(sid)
    else:
        room["ready_players"].append(sid)
    
    socketio.emit(
        "lobby_room_update",
        {"roomId": room_id, "players": room["players"], "host_sid": room["host_sid"], "ready_players": room["ready_players"]},
        room=room_id,
    )


@socketio.on("start_lobby_battle")
def handle_start_lobby_battle(data):
    sid     = request.sid
    room_id = data.get("roomId")
    room    = lobby_rooms.get(room_id)

    if not room:
        emit("error", {"msg": "Phòng không tồn tại"}); return
    if room["host_sid"] != sid:
        emit("error", {"msg": "Chỉ chủ phòng mới có thể bắt đầu trận"}); return
    if len(room["players"]) < 2:
        emit("error", {"msg": "Cần ít nhất 2 người để bắt đầu"}); return
    if room["state"] == "battle":
        emit("error", {"msg": "Phòng đang trong trận"}); return

    # Check if all guests are ready
    ready_players = room.get("ready_players", [])
    members = [s for s in room["players"].keys() if s != room["host_sid"]]
    if not all(s in ready_players for s in members):
        emit("error", {"msg": "Chưa phải tất cả thành viên đều sẵn sàng"}); return

    # FFA — tất cả người chơi cùng đấu
    all_sids  = list(room["players"].keys())
    all_users = room["players"]  # sid -> user_data

    battle_room_id = str(uuid.uuid4())
    game_rooms[battle_room_id] = {
        "players":           {s: {"user": all_users[s], "joined": False} for s in all_sids},
        "state":             "lobby",
        "mode":              "ffa",
        "lobby_timeout":     30,
        "battle_timeout":    30,
        "questions":         [],
        "scores":            {s: 0 for s in all_sids},
        "current_question":  0,
        "player_correct":    {},
        "question_finished": False,
        "player_topics":     {},
        "player_ready":      {},
        "result_sent":       False,
        "ended":             False,
    }
    room["current_battle_room_id"] = battle_room_id
    room["state"] = "battle"

    # Payload danh sách tất cả player (để client hiển thị)
    all_players_payload = [make_user_payload(all_users[s]) for s in all_sids]

    for p_sid in all_sids:
        my_uid = all_users[p_sid].get("userId")
        socketio.emit("lobby_battle_start", {
            "battleRoomId": battle_room_id,
            "role":         "host" if p_sid == room["host_sid"] else "player",
            "players":      all_players_payload,
            "myUserId":     my_uid,
            "mode":         "ffa",
        }, room=p_sid)

    broadcast_lobby_rooms_list()
    print(f"[LOBBY] FFA started {room_id[:8]}: {len(all_sids)} players")


# ══════════════════════════════════════
#   PRESENCE
# ══════════════════════════════════════
@socketio.on("presence:join")
def handle_presence_join(data):
    sid = request.sid
    uid = data.get("userId")
    if not uid:
        emit("error", {"msg": "userId required"}); return

    old_sid = uid_to_sid.get(uid)
    if old_sid and old_sid != sid:
        online_users.pop(old_sid, None)
        sid_to_uid.pop(old_sid, None)

    fresh = {}
    try:
        res = supabase.table("profiles").select("elo, wins, losses, full_name, username, avatar_url").eq("id", uid).single().execute()
        if res.data:
            fresh = res.data
    except Exception as e:
        print(f"[presence:join] DB error for {uid}: {e}")

    entry = {
        "sid":        sid,
        "userId":     uid,
        "full_name":  fresh.get("full_name")  or data.get("full_name", ""),
        "username":   fresh.get("username")   or data.get("username", ""),
        "elo":        int(fresh.get("elo")    or data.get("elo", 1200)),
        "wins":       int(fresh.get("wins")   or data.get("wins", 0)),
        "losses":     int(fresh.get("losses") or data.get("losses", 0)),
        "avatar_url": fresh.get("avatar_url") or data.get("avatar_url", ""),
    }
    online_users[sid] = entry
    sid_to_uid[sid]   = uid
    uid_to_sid[uid]   = sid

    emit("presence_list", list(online_users.values()))
    broadcast_presence()


@socketio.on("presence:update")
def handle_presence_update(data):
    sid = request.sid
    if sid not in online_users:
        return
    for key in ("full_name", "username", "elo", "wins", "losses", "avatar_url"):
        if key in data:
            online_users[sid][key] = data[key]
    broadcast_presence()


# ══════════════════════════════════════
#   INVITE FRIEND
# ══════════════════════════════════════
@socketio.on("invite_friend")
def handle_invite_friend(data):
    sid       = request.sid
    from_user = online_users.get(sid)
    if not from_user:
        emit("error", {"msg": "Chưa đăng nhập"}); return

    to_uid  = data.get("toUserId")
    room_id = data.get("roomId")

    if not to_uid:
        emit("error", {"msg": "toUserId is required"}); return

    to_sid = uid_to_sid.get(to_uid)
    if not to_sid or to_sid not in online_users:
        emit("error", {"msg": "Người chơi không còn online"}); return
    if to_sid == sid:
        emit("error", {"msg": "Không thể mời chính mình"}); return

    if room_id:
        # Mời vào lobby room cụ thể
        room = lobby_rooms.get(room_id)
        if not room:
            emit("error", {"msg": "Phòng không tồn tại"}); return
        if len(room["players"]) >= room["max_players"]:
            emit("error", {"msg": "Phòng đã đầy"}); return

        invite_key = f"{room_id}:{to_uid}"
        pending_invites[invite_key] = {"from_sid": sid, "to_sid": to_sid, "room_id": room_id}
        socketio.emit("invite_received", {
            "roomId": room_id, "roomName": room["name"],
            "from": make_user_payload(from_user), "isPrivate": room["is_private"],
        }, room=to_sid)
        emit("invite_sent", {"roomId": room_id, "toUserId": to_uid})
    else:
        # Mời 1v1 trực tiếp
        battle_room_id = str(uuid.uuid4())
        pending_invites[battle_room_id] = {"from_sid": sid, "to_sid": to_sid}
        socketio.emit("invite_received", {
            "roomId": battle_room_id, "roomName": None,
            "from": make_user_payload(from_user),
        }, room=to_sid)
        emit("invite_sent", {"roomId": battle_room_id})


@socketio.on("invite_response")
def handle_invite_response(data):
    sid     = request.sid
    room_id = data.get("roomId")
    accept  = data.get("accept", False)

    to_user = online_users.get(sid)
    if not to_user:
        emit("error", {"msg": "Bạn không online"}); return

    uid        = to_user.get("userId")
    lobby_key  = f"{room_id}:{uid}"
    invite     = pending_invites.get(lobby_key) or pending_invites.get(room_id)
    invite_key = lobby_key if lobby_key in pending_invites else room_id
    from_sid   = invite["from_sid"] if invite else None

    if not accept:
        if from_sid:
            socketio.emit("invite_rejected", {"roomId": room_id}, room=from_sid)
        pending_invites.pop(invite_key, None)
        return

    if not invite:
        emit("error", {"msg": "Lời mời không còn hợp lệ"}); return

    if "room_id" in invite:
        # Lobby invite
        lr_id = invite["room_id"]
        room  = lobby_rooms.get(lr_id)
        if not room:
            emit("error", {"msg": "Phòng không còn tồn tại"})
            pending_invites.pop(invite_key, None); return
        if len(room["players"]) >= room["max_players"]:
            emit("error", {"msg": "Phòng đã đầy"})
            pending_invites.pop(invite_key, None); return
        if sid not in room["players"]:
            room["players"][sid] = to_user
            join_room(lr_id)
        emit("lobby_room_joined", {"roomId": lr_id, "room": _safe_room_payload(room)})
        socketio.emit("lobby_room_update",
            {"roomId": lr_id, "players": room["players"], "host_sid": room["host_sid"]},
            room=lr_id)
        broadcast_lobby_rooms_list()
    else:
        # Direct 1v1
        from_user = online_users.get(from_sid)
        if not from_user:
            emit("error", {"msg": "Người mời không còn online"})
            pending_invites.pop(invite_key, None); return
        _create_room_and_notify(from_sid, from_user, sid, to_user)

    pending_invites.pop(invite_key, None)


# ══════════════════════════════════════
#   QUICK MATCH
# ══════════════════════════════════════
@socketio.on("join_queue")
def handle_join_queue(data=None):
    sid  = request.sid
    user = online_users.get(sid)
    if not user:
        emit("error", {"msg": "Chưa đăng nhập"}); return
    if any(p[0] == sid for p in queued_players):
        return

    queued_players.append((sid, user))

    if len(queued_players) >= 2:
        queued_players.sort(key=lambda x: x[1].get("elo", 1200))
        p1_sid, p1_data = queued_players.pop(0)
        p1_elo = p1_data.get("elo", 1200)
        best   = min(range(len(queued_players)), key=lambda i: abs(queued_players[i][1].get("elo", 1200) - p1_elo))
        p2_sid, p2_data = queued_players.pop(best)
        _create_room_and_notify(p1_sid, p1_data, p2_sid, p2_data)
    else:
        emit("queued", {"waiting": True, "position": len(queued_players)})


@socketio.on("cancel_queue")
def handle_cancel_queue(data=None):
    global queued_players
    sid            = request.sid
    queued_players = [p for p in queued_players if p[0] != sid]
    emit("queue_cancelled", {})


# ══════════════════════════════════════
#   ROOM LIFECYCLE (1v1 battle)
# ══════════════════════════════════════
@socketio.on("join_room")
def handle_join_room(data):
    sid     = request.sid
    room_id = data.get("roomId")
    room    = game_rooms.get(room_id)

    if not room:
        emit("error", {"msg": "Phòng không tồn tại"}); return
    if sid not in room["players"]:
        emit("error", {"msg": "Bạn không thuộc phòng này"}); return

    join_room(room_id)
    room["players"][sid]["joined"] = True

    all_joined = all(p.get("joined", False) for p in room["players"].values())
    if all_joined and room["state"] == "lobby":
        _start_lobby(room_id)


@socketio.on("lobby_action")
def handle_lobby_action(data):
    sid     = request.sid
    room_id = data.get("roomId")
    room    = game_rooms.get(room_id)
    if not room or room["state"] != "lobby" or sid not in room["players"]:
        return

    if "topics" in data:
        room["player_topics"][sid] = data["topics"]

    if data.get("ready"):
        room["player_ready"][sid] = True
        uid = room["players"][sid]["user"].get("userId")
        socketio.emit("lobby_update", {
            "readyUserId": uid,
            "playerReady": {
                room["players"][s]["user"]["userId"]: room["player_ready"].get(s, False)
                for s in room["players"]
            },
        }, room=room_id)

        if len(room["player_ready"]) == len(room["players"]) and all(room["player_ready"].values()):
            cancel_timer(room, "_lobby_timer")
            _finalize_and_start_battle(room_id)


@socketio.on("battle_action")
def handle_battle_action(data):
    sid     = request.sid
    room_id = data.get("roomId")
    room    = game_rooms.get(room_id)

    if not room or room["state"] != "battle": return
    if sid not in room["players"]:            return
    if room.get("question_finished", False):  return
    if room["player_correct"].get(sid, False):return

    q_idx = room["current_question"]
    q     = room["questions"][q_idx]
    ans   = data.get("answer")

    correct = (int(ans) == int(q["correct"])) if q["type"] == "mcq" else (str(ans).strip().lower() == str(q["correct"]).strip().lower())

    emit("answer_result", {
        "correct":       correct,
        "explanation":   q.get("exp", ""),
        "correctAnswer": q["correct"],
        "opts":          q.get("opts", []),
    })

    if correct:
        room["scores"][sid]            = room["scores"].get(sid, 0) + 1
        room["player_correct"][sid]    = True
        room["question_finished"]      = True
        cancel_timer(room, "_q_timer")
        socketio.emit("battle_update", {
            "playerAnsweredUserId": room["players"][sid]["user"].get("userId"),
            "correct": True, "scores": scores_by_uid(room),
        }, room=room_id)
        _schedule(1.0, _next_question, room_id)
    else:
        socketio.emit("battle_update", {
            "playerAnsweredUserId": room["players"][sid]["user"].get("userId"),
            "correct": False, "scores": scores_by_uid(room),
        }, room=room_id)


# ══════════════════════════════════════
#   INTERNAL — ROOM / BATTLE HELPERS
# ══════════════════════════════════════
def _create_room_and_notify(sid1, u1, sid2, u2):
    room_id = str(uuid.uuid4())
    _setup_room(room_id, sid1, u1, sid2, u2)
    socketio.emit("match_found", {"roomId": room_id, "role": "host", "opponent": make_user_payload(u2)}, room=sid1)
    socketio.emit("match_found", {"roomId": room_id, "role": "guest", "opponent": make_user_payload(u1)}, room=sid2)


def _setup_room(room_id, sid1, u1, sid2, u2):
    game_rooms[room_id] = {
        "players":           {sid1: {"user": u1, "joined": False}, sid2: {"user": u2, "joined": False}},
        "state":             "lobby",
        "lobby_timeout":     30,
        "battle_timeout":    30,
        "questions":         [],
        "scores":            {sid1: 0, sid2: 0},
        "current_question":  0,
        "player_correct":    {},
        "question_finished": False,
        "player_topics":     {},
        "player_ready":      {},
        "result_sent":       False,
        "ended":             False,
    }


def _start_lobby(room_id):
    room = game_rooms.get(room_id)
    if not room: return
    socketio.emit("lobby_start", {"roomId": room_id, "timeout": room["lobby_timeout"]}, room=room_id)

    def _on_timeout():
        r = game_rooms.get(room_id)
        if r and r["state"] == "lobby":
            _finalize_and_start_battle(room_id)

    room["_lobby_timer"] = _schedule(room["lobby_timeout"], _on_timeout)


def _finalize_and_start_battle(room_id):
    room = game_rooms.get(room_id)
    if not room or room["state"] != "lobby": return

    all_topics: set = set()
    for sid in room["players"]:
        all_topics.update(room["player_topics"].get(sid, []))
    if not all_topics:
        all_topics = set(random.sample(list(TOPICS.keys()), 3))

    qs = _build_questions(list(all_topics), 10)
    room.update({"questions": qs, "state": "battle", "current_question": 0,
                 "scores": {sid: 0 for sid in room["players"]},
                 "answers_received": {sid: False for sid in room["players"]}})
    _send_current_question(room_id)


def _send_current_question(room_id):
    room = game_rooms.get(room_id)
    if not room or room["state"] != "battle": return

    q_idx = room["current_question"]
    if q_idx >= len(room["questions"]):
        if not room.get("ended"):
            room["ended"] = True
            end_battle_and_update(room_id)
        return

    room["question_finished"] = False
    room["player_correct"]    = {}
    q = room["questions"][q_idx]

    socketio.emit("battle_question", {
        "question": sanitize_q(q), "index": q_idx + 1,
        "total": len(room["questions"]), "timeout": room["battle_timeout"],
    }, room=room_id)

    def _on_q_timeout():
        r = game_rooms.get(room_id)
        if r and r["state"] == "battle" and r["current_question"] == q_idx and not r["question_finished"]:
            r["question_finished"] = True
            _next_question(room_id)

    room["_q_timer"] = _schedule(room["battle_timeout"], _on_q_timeout)


def _next_question(room_id):
    room = game_rooms.get(room_id)
    if not room or room["state"] != "battle": return
    room["current_question"] += 1
    if room["current_question"] >= len(room["questions"]):
        if not room.get("ended"):
            room["ended"] = True
            end_battle_and_update(room_id)
        return
    _send_current_question(room_id)


def _build_questions(topics, num_questions=10):
    pool = []
    for t in topics:
        for q in QUESTION_BANK.get(t, []):
            pool.append({**q, "topicId": t})
    random.shuffle(pool)
    return pool[:num_questions]


# ══════════════════════════════════════
#   DATA — CHỦ ĐỀ & NGÂN HÀNG CÂU HỎI
# ══════════════════════════════════════
TOPICS = {
    "acid-base": {"name": "Axit — Bazơ",      "icon": "⚗️"},
    "redox":     {"name": "Oxi hóa khử",       "icon": "⚡"},
    "electro":   {"name": "Điện hóa",          "icon": "🔋"},
    "organic":   {"name": "Hóa hữu cơ",        "icon": "🌿"},
    "periodic":  {"name": "Bảng tuần hoàn",    "icon": "📋"},
    "solution":  {"name": "Dung dịch",         "icon": "💧"},
    "thermo":    {"name": "Nhiệt hóa học",     "icon": "🔥"},
    "equilib":   {"name": "Cân bằng hóa học", "icon": "⚖️"},
}

QUESTION_BANK = {
    "acid-base": [
        {"type": "mcq", "q": "Dung dịch HCl 0.01M có pH bằng bao nhiêu?", "opts": ["pH = 1", "pH = 2", "pH = 3", "pH = 12"], "correct": 1, "exp": "[HCl]=0.01M → [H⁺]=0.01 → pH=2"},
        {"type": "num", "q": "Tính pH của dung dịch NaOH 0.001M", "correct": "11", "exp": "pOH=3 → pH=11"},
        {"type": "mcq", "q": "Chất nào sau đây là axit mạnh?", "opts": ["CH₃COOH", "HF", "HNO₃", "H₂CO₃"], "correct": 2, "exp": "HNO₃ phân li hoàn toàn"},
        {"type": "num", "q": "Trộn 100ml HCl 0.2M với 100ml NaOH 0.1M. pH của dung dịch (làm tròn)?", "correct": "1", "exp": "dư HCl → [H+]=0.05M → pH≈1"},
        {"type": "mcq", "q": "Ion nào làm dung dịch có môi trường bazơ?", "opts": ["NH₄⁺", "Al³⁺", "CO₃²⁻", "Fe³⁺"], "correct": 2, "exp": "CO₃²⁻ thủy phân tạo OH⁻"},
        {"type": "mcq", "q": "pH máu người bình thường là?", "opts": ["6.8–7.0", "7.35–7.45", "7.8–8.0", "6.0–6.5"], "correct": 1, "exp": "pH máu: 7.35–7.45"},
    ],
    "redox": [
        {"type": "mcq", "q": "Fe + CuSO₄ → FeSO₄ + Cu. Chất nào bị oxi hóa?", "opts": ["Fe", "CuSO₄", "FeSO₄", "Cu"], "correct": 0, "exp": "Fe → Fe²⁺ (mất e⁻)"},
        {"type": "num", "q": "Số oxi hóa của Mn trong KMnO₄?", "correct": "7", "exp": "K(+1)+Mn(x)+4O(-2)=0 → x=+7"},
        {"type": "mcq", "q": "Chất khử là chất:", "opts": ["Nhận electron", "Cho electron", "Nhận proton", "Cho proton"], "correct": 1, "exp": "Chất khử nhường electron"},
        {"type": "num", "q": "Số oxi hóa của S trong H₂SO₄?", "correct": "6", "exp": "2(+1)+S+4(-2)=0 → S=+6"},
        {"type": "mcq", "q": "Phản ứng nào là oxi hóa khử?", "opts": ["NaCl+AgNO₃", "CaCO₃ nhiệt phân", "Zn+H₂SO₄ loãng", "NaOH+HCl"], "correct": 2, "exp": "Zn→Zn²⁺+2e⁻"},
    ],
    "electro": [
        {"type": "mcq", "q": "Suất điện động pin Daniell (Zn-Cu) chuẩn?", "opts": ["0.76V", "1.10V", "1.46V", "0.34V"], "correct": 1, "exp": "E°=E°Cu-E°Zn=0.34-(-0.76)=1.10V"},
        {"type": "num", "q": "Anot (cực âm) trong pin? Nhập 1=anot, 2=catot", "correct": "1", "exp": "Cực âm=anot=oxi hóa"},
        {"type": "mcq", "q": "Điện phân CuSO₄, tại catot xảy ra:", "opts": ["Cu²⁺+2e⁻→Cu", "Cu→Cu²⁺+2e⁻", "2H₂O→O₂+4H⁺+4e⁻", "SO₄²⁻ bị oxi hóa"], "correct": 0, "exp": "Catot: Cu²⁺+2e⁻→Cu"},
    ],
    "organic": [
        {"type": "mcq", "q": "Công thức phân tử của metan?", "opts": ["C₂H₆", "CH₄", "C₃H₈", "C₂H₄"], "correct": 1, "exp": "Metan = CH₄"},
        {"type": "num", "q": "Etilen (C₂H₄) có bao nhiêu liên kết đôi C=C?", "correct": "1", "exp": "CH₂=CH₂ → 1 liên kết đôi"},
        {"type": "mcq", "q": "Phản ứng đặc trưng của ankan?", "opts": ["Cộng hợp", "Thế halogen", "Trùng hợp", "Tách nước"], "correct": 1, "exp": "Ankan → thế halogen"},
        {"type": "mcq", "q": "Glucozơ (C₆H₁₂O₆) thuộc loại?", "opts": ["Lipit", "Protein", "Cacbohidrat", "Axit amin"], "correct": 2, "exp": "Glucozơ là monosaccarit"},
        {"type": "num", "q": "Số nguyên tử C trong benzen (C₆H₆)?", "correct": "6", "exp": "C₆H₆ → 6 C"},
    ],
    "periodic": [
        {"type": "num", "q": "Số proton của Fe (Z=26)?", "correct": "26", "exp": "Z=26 là Fe"},
        {"type": "mcq", "q": "Nhóm IA còn gọi là:", "opts": ["Halogen", "Kim loại kiềm", "Kim loại kiềm thổ", "Khí hiếm"], "correct": 1, "exp": "Nhóm IA = kim loại kiềm"},
        {"type": "num", "q": "Chu kì 2 có bao nhiêu nguyên tố?", "correct": "8", "exp": "Li→Ne = 8 nguyên tố"},
        {"type": "mcq", "q": "Trong chu kì, tính kim loại biến đổi thế nào?", "opts": ["Tăng trái→phải", "Giảm trái→phải", "Không đổi", "Bất thường"], "correct": 1, "exp": "Giảm dần trái→phải"},
    ],
    "solution": [
        {"type": "num", "q": "Độ tan NaCl trong 100g nước ở 20°C (g)?", "correct": "36", "exp": "NaCl ≈ 36g/100g nước"},
        {"type": "mcq", "q": "Dung dịch bão hòa là:", "opts": ["Có thể hòa tan thêm", "Không thể hòa tan thêm", "Không có chất tan", "C=1M"], "correct": 1, "exp": "Đã đạt giới hạn hòa tan"},
        {"type": "mcq", "q": "Nồng độ mol/L tính bằng:", "opts": ["m/V", "n/V(L)", "m/m_dm", "n/m"], "correct": 1, "exp": "C_M = n(mol)/V(lít)"},
    ],
    "thermo": [
        {"type": "mcq", "q": "Phản ứng tỏa nhiệt có ΔH:", "opts": ["ΔH>0", "ΔH<0", "ΔH=0", "Không xác định"], "correct": 1, "exp": "Tỏa nhiệt: ΔH<0"},
        {"type": "num", "q": "Đốt 12g C (ΔH=-394kJ/mol) sinh bao nhiêu kJ?", "correct": "394", "exp": "12g=1mol→394kJ"},
    ],
    "equilib": [
        {"type": "mcq", "q": "Nguyên lý Le Chatelier về:", "opts": ["Tốc độ phản ứng", "Chiều dịch cân bằng khi bị tác động", "Năng lượng hoạt hóa", "Trật tự phản ứng"], "correct": 1, "exp": "Hệ tự điều chỉnh chống lại thay đổi"},
        {"type": "mcq", "q": "Tăng nồng độ chất phản ứng → cân bằng:", "opts": ["Dịch trái", "Dịch phải", "Không đổi", "Phụ thuộc T"], "correct": 1, "exp": "Tăng chất đầu → dịch phải"},
    ],
}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 GloryChem server on port {port}")
    socketio.run(app, host="0.0.0.0", port=port, debug=False)