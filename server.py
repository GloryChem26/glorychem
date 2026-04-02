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
import json

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
    ping_timeout=120,
    ping_interval=20,
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
def get_user_status(sid):
    uid = sid_to_uid.get(sid)
    if not uid: return "free"
    # Kiểm tra game rooms
    for r in game_rooms.values():
        if sid in r["players"]:
            return "battle"
        # Dự phòng: kiểm tra theo userId nếu sid đã thay đổi nhưng chưa kịp update room
        for psid, pdata in r["players"].items():
            if pdata.get("user", {}).get("userId") == uid:
                return "battle"
            
    # Kiểm tra lobby rooms
    for r in lobby_rooms.values():
        if sid in r["players"]:
            return "lobby"
        # Dự phòng: kiểm tra theo userId
        for psid, puser in r["players"].items():
            if puser.get("userId") == uid:
                return "lobby"
    return "free"

def get_presence_payload():
    payload = []
    for sid, u in online_users.items():
        cp = dict(u)
        cp["status"] = get_user_status(sid)
        payload.append(cp)
    return payload

def broadcast_presence():
    socketio.emit("presence_update", get_presence_payload())


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


@socketio.on("request_sync")
def handle_request_sync():
    """Client yêu cầu đồng bộ lại trạng thái sau khi reconnect."""
    sid = request.sid
    print(f"[sync] request_sync from {sid}")

    # Gửi lại danh sách online users
    emit("presence_list", get_presence_payload())

    # Gửi lại danh sách lobby rooms đang chờ
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
    emit("lobby_rooms_list", rooms_info)

    # Nếu sid này đang trong một game room đang battle, gửi lại câu hỏi hiện tại
    for room_id, room in game_rooms.items():
        if sid in room["players"] and room["state"] == "battle":
            q_idx = room["current_question"]
            if q_idx < len(room["questions"]):
                q = {k: v for k, v in room["questions"][q_idx].items() if k not in ("correct", "exp")}
                emit("battle_question", {
                    "question": q,
                    "index":    q_idx + 1,
                    "total":    len(room["questions"]),
                    "timeout":  room["battle_timeout"],
                    "scores":   {
                        room["players"][s]["user"].get("userId"): room["scores"].get(s, 0)
                        for s in room["players"]
                    },
                })
            break


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
    broadcast_presence()
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
    broadcast_presence()
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
    broadcast_presence()


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
        "lobby_timeout":     90,
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
    broadcast_presence()
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

    # ✅ FIX: Chuyển membership phòng nếu user đang trong phòng (tránh bị reset status khi reconnect)
    if old_sid and old_sid != sid:
        # Lobby rooms
        for rid, room in lobby_rooms.items():
            if old_sid in room["players"]:
                room["players"][sid] = room["players"].pop(old_sid)
                join_room(rid, sid=sid)
                if room["host_sid"] == old_sid:
                    room["host_sid"] = sid
                # Cập nhật ready_players if exists
                if "ready_players" in room and old_sid in room["ready_players"]:
                    room["ready_players"].remove(old_sid)
                    room["ready_players"].append(sid)
        
        # Game rooms
        for rid, room in game_rooms.items():
            if old_sid in room["players"]:
                room["players"][sid] = room["players"].pop(old_sid)
                join_room(rid, sid=sid)
                # Cập nhật scores
                if old_sid in room.get("scores", {}):
                    room["scores"][sid] = room["scores"].pop(old_sid)

    emit("presence_list", get_presence_payload())
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

    # Check if target is busy
    for r_id, r in lobby_rooms.items():
        if to_sid in r["players"]:
            emit("error", {"msg": "Người chơi này đang ở trong phòng khác"}); return
            
    for r_id, r in game_rooms.items():
        if to_sid in r["players"]:
            emit("error", {"msg": "Người chơi này đang tham gia trận đấu"}); return

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
        broadcast_presence()
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
    global queued_players
    sid  = request.sid
    user = online_users.get(sid)
    if not user:
        emit("error", {"msg": "Chưa đăng nhập"}); return
    # Ngăn người chơi queue nhiều tab, xóa session cũ nếu có
    if any(p[1].get("userId") == user.get("userId") for p in queued_players):
        queued_players = [p for p in queued_players if p[1].get("userId") != user.get("userId")]
    
    queued_players.append((sid, user))

    if len(queued_players) >= 2:
        # Sắp xếp queue theo ELO
        queued_players.sort(key=lambda x: x[1].get("elo", 1200))
        
        p1_sid, p1_data = queued_players[0]
        p1_uid = p1_data.get("userId")
        p1_elo = p1_data.get("elo", 1200)

        # Tìm đối thủ phù hợp nhất (ELO gần nhất, NHƯNG KHÁC userId)
        valid_opponents = [(i, p) for i, p in enumerate(queued_players) if i != 0 and p[1].get("userId") != p1_uid]

        if valid_opponents:
            # Chọn đối thủ có ELO gần nhất với p1
            best_idx, best_item = min(valid_opponents, key=lambda item: abs(item[1][1].get("elo", 1200) - p1_elo))
            
            # Lấy 2 người chơi ra khỏi queue
            p2_sid, p2_data = queued_players.pop(best_idx) # pop p2 trước (vì index > 0)
            queued_players.pop(0)                          # pop p1
            
            _create_room_and_notify(p1_sid, p1_data, p2_sid, p2_data)
        else:
            emit("queued", {"waiting": True, "position": len(queued_players)})
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
    broadcast_presence()


def _setup_room(room_id, sid1, u1, sid2, u2):
    game_rooms[room_id] = {
        "players":           {sid1: {"user": u1, "joined": False}, sid2: {"user": u2, "joined": False}},
        "state":             "lobby",
        "lobby_timeout":     90,
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
def load_questions_database():
    try:
        with open("questions.json", "r", encoding="utf-8") as f:
            data = json.load(f)
            return data.get("TOPICS", {}), data.get("QUESTION_BANK", {})
    except Exception as e:
        print(f"[!] Lỗi khi tải questions.json: {e}")
        return {}, {}

TOPICS, QUESTION_BANK = load_questions_database()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 GloryChem server on port {port}")
    socketio.run(app, host="0.0.0.0", port=port, debug=False)