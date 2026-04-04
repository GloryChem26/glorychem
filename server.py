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
import time
import functools

from flask import Flask, send_file, send_from_directory, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from supabase import create_client, Client
from dotenv import load_dotenv

# Tải biến môi trường từ .env nằm cùng thư mục với server.py
_env_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(_env_path):
    load_dotenv(_env_path)
    print(f"📖 Loaded .env from {_env_path}")
else:
    load_dotenv() # Fallback to standard CWD search
    print("⚠️ No .env file found at expected path, using defaults.")

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
def _sc(v):
    """Sanitize config value — remove spaces and quotes."""
    if not v: return v
    return v.strip().strip("'").strip('"')

SUPABASE_URL      = _sc(os.environ.get("SUPABASE_URL"))
SUPABASE_KEY      = _sc(os.environ.get("SUPABASE_KEY"))
SUPABASE_ANON_KEY = _sc(os.environ.get("SUPABASE_ANON_KEY"))

# Kiểm tra các khóa bắt buộc
_missing = []
if not SUPABASE_URL: _missing.append("SUPABASE_URL")
if not SUPABASE_KEY: _missing.append("SUPABASE_KEY (Service Role)")
if not SUPABASE_ANON_KEY: _missing.append("SUPABASE_ANON_KEY (Public)")

if _missing:
    print(f"❌ ERROR: Missing target env variables: {', '.join(_missing)}")
    print("👉 Hãy copy dán nội dung từ .env.example vào .env và điền các khóa từ Supabase Dashboard.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

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
#   API CACHE — leaderboard & forum
# ══════════════════════════════════════
_cache: dict = {}   # key -> {"data": ..., "ts": float}

def _cache_get(key: str, ttl: int):
    """Trả về data nếu còn hạn, ngược lại None."""
    entry = _cache.get(key)
    if entry and (time.time() - entry["ts"]) < ttl:
        return entry["data"]
    return None

def _cache_set(key: str, data):
    _cache[key] = {"data": data, "ts": time.time()}

def _cache_invalidate(key: str):
    _cache.pop(key, None)


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


# ══════════════════════════════════════
#   SECURITY & AUTH HELPERS
# ══════════════════════════════════════
def get_user_from_request():
    """
    Xác thực JWT từ client gửi lên (Authorization: Bearer <token>).
    Sử dụng Supabase Auth để verify.
    """
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    token = auth_header.split(" ")[1]
    try:
        # Supabase Python SDK can verify the JWT by fetching user
        # Note: This is an API call, you might want to cache this or use a local JWT verify
        # but for simplicity and reliability with Supabase, we use get_user.
        res = supabase.auth.get_user(token)
        if res and res.user:
            return res.user
    except Exception as e:
        print(f"[AUTH] JWT Verify error: {e}")
    return None

# ══════════════════════════════════════
#   SECURITY: RATE LIMITING
# ══════════════════════════════════════
_ratelimit_data = {} # (key, endpoint) -> (timestamp, count)

def rate_limit(limit=10, period=60):
    """
    Decorator đơn giản để giới hạn số request từ 1 IP/user.
    Mặc định 10 request / 60 giây.
    """
    def decorator(f):
        @functools.wraps(f)
        def wrapped(*args, **kwargs):
            key = request.remote_addr
            # Nếu user đã log in, ưu tiên dùng userId làm key
            user = get_user_from_request()
            if user:
                key = user.id
                
            now = time.time()
            rl_key = (key, request.path)
            
            if rl_key not in _ratelimit_data:
                _ratelimit_data[rl_key] = [now, 1]
            else:
                last_time, count = _ratelimit_data[rl_key]
                if now - last_time < period:
                    if count >= limit:
                        return jsonify({"error": "Quá nhiều yêu cầu. Vui lòng thử lại sau."}), 429
                    _ratelimit_data[rl_key][1] += 1
                else:
                    _ratelimit_data[rl_key] = [now, 1]
            return f(*args, **kwargs)
        return wrapped
    return decorator

@app.after_request
def add_security_headers(response):
    """Thêm các headers bảo mật quan trọng."""
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    # Strict CORS configuration could be added here
    return response

def mk_user_payload(u):
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


@app.route("/api/config")
def api_config():
    """Trả về URL và ANON_KEY cho frontend."""
    return jsonify({
        "url": SUPABASE_URL,
        "anonKey": SUPABASE_ANON_KEY
    })


# ══════════════════════════════════════
#   REST API — LEADERBOARD
# ══════════════════════════════════════
LB_TTL = 30   # giây — cache leaderboard

@app.route("/api/leaderboard")
def api_leaderboard():
    """Trả top-100 profiles sắp xếp theo ELO, cache 30 giây."""
    cached = _cache_get("leaderboard", LB_TTL)
    if cached is not None:
        return jsonify(cached)

    try:
        res = (
            supabase.table("profiles")
            .select("id, full_name, username, elo, wins, losses, avatar_url")
            .order("elo", desc=True)
            .limit(100)
            .execute()
        )
        data = res.data or []
        _cache_set("leaderboard", data)
        return jsonify(data)
    except Exception as e:
        print(f"[API] /api/leaderboard error: {e}")
        return jsonify({"error": "Không thể tải bảng xếp hạng"}), 500


# ══════════════════════════════════════
#   REST API — FORUM
# ══════════════════════════════════════
FORUM_POSTS_TTL  = 20   # giây — cache danh sách bài viết
FORUM_COUNTS_TTL = 30   # giây — cache counts theo category
FORUM_COMMENTS_TTL = 15 # giây — cache comments từng bài

@app.route("/api/forum/posts")
def api_forum_posts():
    """Trả 50 bài viết mới nhất, lọc theo ?category=tip|memory|question."""
    cat = request.args.get("category", "all")
    cache_key = f"forum_posts_{cat}"

    cached = _cache_get(cache_key, FORUM_POSTS_TTL)
    if cached is not None:
        return jsonify(cached)

    try:
        # Thử lấy data có kèm join profile
        try:
            query = (
                supabase.table("forum_posts")
                .select("id, user_id, title, content, category, comment_count, created_at, profiles:user_id(full_name, avatar_url)")
                .order("created_at", desc=True)
                .limit(50)
            )
            if cat != "all":
                query = query.eq("category", cat)
            res = query.execute()
            data = res.data or []
        except Exception as join_err:
            print(f"[Forum] Join failed, falling back to manual fetch: {join_err}")
            # Fallback: lấy bài trước, sau đó lấy profile
            query = (
                supabase.table("forum_posts")
                .select("id, user_id, title, content, category, comment_count, created_at")
                .order("created_at", desc=True)
                .limit(50)
            )
            if cat != "all":
                query = query.eq("category", cat)
            res = query.execute()
            data = res.data or []
            
            if data:
                uids = list(set(p["user_id"] for p in data))
                profiles = _fetch_profiles_safe(uids)
                for p in data:
                    p["profiles"] = profiles.get(p["user_id"])

        _cache_set(cache_key, data)
        return jsonify(data)
    except Exception as e:
        print(f"[API] /api/forum/posts error: {e}")
        return jsonify({"error": "Không thể tải bài viết"}), 500


@app.route("/api/forum/counts")
def api_forum_counts():
    """Trả số lượng bài theo từng category."""
    cached = _cache_get("forum_counts", FORUM_COUNTS_TTL)
    if cached is not None:
        return jsonify(cached)

    try:
        res  = supabase.table("forum_posts").select("category").execute()
        rows = res.data or []
        counts = {"all": 0, "tip": 0, "memory": 0, "question": 0}
        for r in rows:
            counts["all"] += 1
            c = r.get("category")
            if c in counts:
                counts[c] += 1
        _cache_set("forum_counts", counts)
        return jsonify(counts)
    except Exception as e:
        print(f"[API] /api/forum/counts error: {e}")
        return jsonify({"error": "Không thể tải thống kê"}), 500


@app.route("/api/forum/posts/<post_id>/comments")
def api_forum_comments(post_id):
    """Trả comments của một bài viết."""
    cache_key = f"forum_comments_{post_id}"
    cached = _cache_get(cache_key, FORUM_COMMENTS_TTL)
    if cached is not None:
        return jsonify(cached)

    try:
        data = []
        try:
            res = (
                supabase.table("forum_comments")
                .select("id, content, created_at, profiles:user_id(full_name, avatar_url)")
                .eq("post_id", post_id)
                .order("created_at", desc=False)
                .execute()
            )
            data = res.data or []
        except Exception as join_err:
            print(f"[Forum] Comments join failed: {join_err}")
            res = (
                supabase.table("forum_comments")
                .select("id, user_id, content, created_at")
                .eq("post_id", post_id)
                .order("created_at", desc=False)
                .execute()
            )
            data = res.data or []
            if data:
                uids = list(set(c["user_id"] for c in data))
                profiles = _fetch_profiles_safe(uids)
                for c in data:
                    c["profiles"] = profiles.get(c["user_id"])

        _cache_set(cache_key, data)
        return jsonify(data)
    except Exception as e:
        print(f"[API] /api/forum/comments error: {e}")
        return jsonify({"error": "Không thể tải bình luận"}), 500


@app.route("/api/forum/posts", methods=["POST"])
@rate_limit(limit=5, period=60) # Tối đa 5 bài / phút
def api_forum_post_create():
    """Tạo bài viết mới, xóa cache liên quan."""
    try:
        user = get_user_from_request()
        if not user:
            return jsonify({"error": "Unauthorized. Please log in again."}), 401
            
        body    = request.get_json(force=True) or {}
        user_id = user.id # Dùng user_id từ JWT thay vì body
        title   = (body.get("title") or "").strip()
        content = (body.get("content") or "").strip()
        cat     = body.get("category", "tip")

        if not title or not content:
            return jsonify({"error": "Thiếu thông tin bắt buộc"}), 400
        if cat not in ("tip", "memory", "question"):
            return jsonify({"error": "Category không hợp lệ"}), 400
        if len(title) > 200 or len(content) > 3000:
            return jsonify({"error": "Nội dung vượt giới hạn ký tự"}), 400

        try:
            res = (
                supabase.table("forum_posts")
                .insert({"user_id": user_id, "title": title,
                         "content": content, "category": cat, "comment_count": 0})
                .execute()
            )
            # data is usually a list of dicts from .insert().execute()
            data = res.data[0] if res.data and isinstance(res.data, list) else res.data
        except Exception as err:
            print(f"[Forum] Post create failed: {err}")
            return jsonify({"error": "Đăng bài thất bại"}), 500

        # Nếu data có, thử lấy thêm profile (best-effort)
        if data and isinstance(data, dict):
            profile = _fetch_profiles_safe([user_id]).get(user_id)
            data["profiles"] = profile

        # Xóa cache
        _cache_invalidate("forum_posts_all")
        _cache_invalidate(f"forum_posts_{cat}")
        _cache_invalidate("forum_counts")
        return jsonify(data), 201
    except Exception as e:
        print(f"[API] POST /api/forum/posts error: {e}")
        return jsonify({"error": str(e) or "Đăng bài thất bại"}), 500


@app.route("/api/forum/posts/<post_id>", methods=["DELETE"])
def api_forum_post_delete(post_id):
    """Xóa bài viết (chỉ chủ bài), xóa cache liên quan. Đã fix IDOR bằng JWT verification."""
    user = get_user_from_request()
    if not user:
        return jsonify({"error": "Unauthorized. Please log in again."}), 401
        
    user_id = user.id

    try:
        res = (
            supabase.table("forum_posts")
            .delete()
            .eq("id", post_id)
            .eq("user_id", user_id)   # Chỉ chủ bài thật (verified qua JWT) mới xóa được
            .execute()
        )
        # Xóa toàn bộ cache forum
        for k in list(_cache.keys()):
            if k.startswith("forum_"):
                _cache_invalidate(k)
        return jsonify({"ok": True}), 200
    except Exception as e:
        print(f"[API] DELETE /api/forum/posts error: {e}")
        return jsonify({"error": "Xóa bài thất bại"}), 500


@app.route("/api/forum/posts/<post_id>/comments", methods=["POST"])
@rate_limit(limit=10, period=60) # Tối đa 10 comment / phút
def api_forum_comment_create(post_id):
    """Thêm bình luận, cập nhật comment_count, xóa cache."""
    try:
        user = get_user_from_request()
        if not user:
            return jsonify({"error": "Unauthorized"}), 401
            
        body    = request.get_json(force=True) or {}
        user_id = user.id # Dùng từ JWT
        content = (body.get("content") or "").strip()

        if not content:
            return jsonify({"error": "Thiếu nội dung bình luận"}), 400
        if len(content) > 1000:
            return jsonify({"error": "Bình luận vượt 1000 ký tự"}), 400

        try:
            res = (
                supabase.table("forum_comments")
                .insert({"post_id": post_id, "user_id": user_id, "content": content})
                .execute()
            )
            # data is usually a list of dicts from .insert().execute()
            data = res.data[0] if res.data and isinstance(res.data, list) else res.data
        except Exception as err:
            print(f"[Forum] Comment create failed: {err}")
            return jsonify({"error": "Gửi bình luận thất bại"}), 500

        # Thêm profile info (best effort)
        if data and isinstance(data, dict):
            profile = _fetch_profiles_safe([user_id]).get(user_id)
            data["profiles"] = profile

        # Cập nhật comment_count (re-count để luôn chính xác nếu không dùng trigger)
        try:
            r_res = supabase.table("forum_comments").select("id", count="exact").eq("post_id", post_id).execute()
            new_count = r_res.count if r_res.count is not None else 0
            supabase.table("forum_posts").update({"comment_count": new_count}).eq("id", post_id).execute()
        except Exception as up_err:
            print(f"[Forum] Update count failed: {up_err}")

        # Xóa cache
        _cache_invalidate(f"forum_comments_{post_id}")
        _cache_invalidate("forum_posts_all")
        _cache_invalidate("forum_counts")
        return jsonify(data), 201
    except Exception as e:
        print(f"[API] POST /api/forum/comments error: {e}")
        return jsonify({"error": str(e) or "Gửi bình luận thất bại"}), 500


@app.route("/api/forum/posts/<post_id>/comments/<comment_id>", methods=["DELETE"])
def api_forum_comment_delete(post_id, comment_id):
    """Xóa bình luận, cập nhật lại comment_count. Đã fix IDOR bằng JWT verification."""
    user = get_user_from_request()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    
    user_id = user.id

    try:
        print(f"[API] Deleting comment {comment_id} on post {post_id} by verified user {user_id}")
        # Xóa comment (chỉ được xóa comment của mình – verified qua JWT)
        res = (
            supabase.table("forum_comments")
            .delete()
            .eq("id", comment_id)
            .eq("post_id", post_id)
            .eq("user_id", user_id)
            .execute()
        )
        
        if not res.data:
            print(f"[Forum] No comment deleted. Check if comment exists and user matches.")
            return jsonify({"error": "Không tìm thấy bình luận hoặc bạn không có quyền xóa"}), 404

        print(f"[Forum] Comment {comment_id} deleted successfully.")
        
        # Cập nhật lại số lượng
        try:
            r_res = supabase.table("forum_comments").select("id", count="exact").eq("post_id", post_id).execute()
            new_count = r_res.count if r_res.count is not None else 0
            supabase.table("forum_posts").update({"comment_count": new_count}).eq("id", post_id).execute()
        except Exception as upd_err:
            print(f"[Forum] Re-count after delete failed: {upd_err}")

        # Xóa cache
        _cache_invalidate(f"forum_comments_{post_id}")
        _cache_invalidate("forum_posts_all")
        return jsonify({"ok": True}), 200
    except Exception as e:
        print(f"[API] DELETE /api/forum/comments error: {e}")
        return jsonify({"error": "Xóa bình luận thất bại"}), 500


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
@rate_limit(limit=3, period=300) # Tối đa 3 lần đổi ảnh / 5 phút
def upload_avatar():
    """Đã fix IDOR bằng JWT verification."""
    try:
        user = get_user_from_request()
        if not user:
            return {"error": "Unauthorized"}, 401
            
        import base64, time
        body    = request.get_json(force=True)
        user_id = user.id # Dùng từ JWT
        mime    = body.get("mime", "image/jpeg")
        b64data = body.get("data", "")
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










import random as _random
import string  as _string

# ══════════════════════════════════════
#   QUIZ ROOMS (in-memory)
# ══════════════════════════════════════
# quiz_rooms[pin] = {
#   "pin": str,
#   "host_sid": str,
#   "teacher_id": str,
#   "set_id": str,
#   "title": str,
#   "questions": [...],         # full questions with correct answers
#   "state": "waiting|playing|ended",
#   "current_q": int,
#   "players": {userId: {"name": str, "sid": str, "avatarUrl": str}},
#   "scores": {userId: int},
#   "answers_this_round": {userId: answer},  # reset each question
#   "_q_timer": Timer | None,
# }
quiz_rooms: dict = {}
_used_pins: set = set()


def _gen_pin() -> str:
    """Generate unique 6-digit PIN."""
    while True:
        pin = "".join(_random.choices(_string.digits, k=6))
        if pin not in _used_pins:
            _used_pins.add(pin)
            return pin


def _qz_sanitize(q: dict) -> dict:
    """Remove correct answer before sending to players."""
    return {k: v for k, v in q.items() if k not in ("correct", "correct_answer", "exp", "explanation")}


def _qz_broadcast_count(pin: str):
    room = quiz_rooms.get(pin)
    if not room:
        return
    socketio.emit(
        "quiz_player_count",
        {"count": len(room["players"])},
        room=pin,
    )


def _qz_leaderboard_payload(room: dict) -> list:
    return sorted(
        [{"userId": uid, "name": room["players"][uid]["name"], "score": room["scores"].get(uid, 0)}
         for uid in room["players"]],
        key=lambda x: x["score"], reverse=True,
    )


def _qz_scores_dict(room: dict) -> dict:
    return {uid: room["scores"].get(uid, 0) for uid in room["players"]}


def _qz_players_dict(room: dict) -> dict:
    return {uid: {"name": p["name"], "avatarUrl": p.get("avatarUrl", "")}
            for uid, p in room["players"].items()}


def _qz_send_question(pin: str):
    room = quiz_rooms.get(pin)
    if not room or room["state"] != "playing":
        return

    q_idx = room["current_q"]
    questions = room["questions"]

    if q_idx >= len(questions):
        _qz_end_game(pin)
        return

    q = questions[q_idx]
    room["answers_this_round"] = {}
    room["question_revealed"]  = False

    # Send to players (without correct answer)
    sanitized = _qz_sanitize(q)
    sanitized["time"]      = q.get("time_limit", q.get("time", 20))
    sanitized["timeLimit"] = sanitized["time"]
    sanitized["points"]    = q.get("points", 1000)

    socketio.emit(
        "quiz_question",
        {
            "question": sanitized,
            "index":    q_idx + 1,
            "total":    len(questions),
            "timeLimit": sanitized["time"],
        },
        room=pin,
    )

    # Also notify host
    socketio.emit(
        "quiz_host_question_sent",
        {"questionIdx": q_idx, "timeLimit": sanitized["time"]},
        room=room["host_sid"],
    )

    # Auto-advance timer (server-side safety net)
    time_limit = sanitized["time"]
    def _on_timeout():
        r = quiz_rooms.get(pin)
        if r and r["state"] == "playing" and r["current_q"] == q_idx and not r.get("question_revealed"):
            r["question_revealed"] = True
            _qz_reveal_and_scores(pin, q_idx)
            socketio.emit("quiz_question_timeout", {}, room=pin)

    t = _schedule(time_limit + 2, _on_timeout)  # +2s grace
    room["_q_timer"] = t


def _qz_reveal_and_scores(pin: str, q_idx: int):
    """Send answer results to each player, update scores."""
    room = quiz_rooms.get(pin)
    if not room:
        return
    q = room["questions"][q_idx]
    correct = str(q.get("correct_answer", q.get("correct", "")))
    time_limit = q.get("time_limit", q.get("time", 20))
    base_points = q.get("points", 1000)

    answered_this = room.get("answers_this_round", {})

    # Calculate scores and send per-player result
    for uid, p in list(room["players"].items()):
        p_sid = p.get("sid")
        if not p_sid:
            continue

        player_ans_data = answered_this.get(uid)

        if player_ans_data is None:
            # No answer — 0 points
            socketio.emit("quiz_answer_result", {
                "correct":       False,
                "points":        0,
                "explanation":   q.get("exp", q.get("explanation", "")),
                "correctAnswer": correct,
                "myScore":       room["scores"].get(uid, 0),
                "myRank":        0,
            }, room=p_sid)
        else:
            ans      = str(player_ans_data["answer"]).strip().lower()
            is_mcq   = (q.get("type", "mcq") == "mcq")
            is_correct = (ans == correct.lower()) if not is_mcq else (ans == correct)

            if is_correct:
                time_bonus  = int(player_ans_data.get("timeBonus", 0))
                earned      = min(base_points + time_bonus, base_points * 2)
                room["scores"][uid] = room["scores"].get(uid, 0) + earned
            else:
                earned = 0

            socketio.emit("quiz_answer_result", {
                "correct":       is_correct,
                "points":        earned,
                "explanation":   q.get("exp", q.get("explanation", "")),
                "correctAnswer": correct,
                "myScore":       room["scores"].get(uid, 0),
                "myRank":        0,  # will update below
            }, room=p_sid)

    # Build ranked list and update myRank
    ranked = _qz_leaderboard_payload(room)
    rank_map = {e["userId"]: i + 1 for i, e in enumerate(ranked)}

    for uid, p in list(room["players"].items()):
        p_sid = p.get("sid")
        if p_sid:
            socketio.emit("quiz_rank_update", {
                "myRank":  rank_map.get(uid, 0),
                "myScore": room["scores"].get(uid, 0),
            }, room=p_sid)

    # Send leaderboard to everyone
    socketio.emit(
        "quiz_leaderboard",
        {"scores": _qz_scores_dict(room), "players": _qz_players_dict(room)},
        room=pin,
    )

    # Notify host of current scores
    socketio.emit(
        "quiz_host_scores",
        {"scores": _qz_scores_dict(room), "players": _qz_players_dict(room)},
        room=room["host_sid"],
    )


def _qz_end_game(pin: str):
    room = quiz_rooms.get(pin)
    if not room:
        return
    room["state"] = "ended"
    cancel_timer(room, "_q_timer")

    final_scores  = _qz_scores_dict(room)
    final_players = _qz_players_dict(room)

    socketio.emit(
        "quiz_ended",
        {"scores": final_scores, "players": final_players},
        room=pin,
    )

    # Clean up after 5 min
    def _cleanup():
        quiz_rooms.pop(pin, None)
        _used_pins.discard(pin)

    _schedule(300, _cleanup)


# ══════════════════════════════════════
#   SOCKET.IO — HOST EVENTS
# ══════════════════════════════════════

@socketio.on("quiz_host_create")
def handle_quiz_host_create(data):
    """Giáo viên tạo phòng quiz."""
    sid        = request.sid
    set_id     = data.get("setId")
    title      = data.get("title", "Quiz")
    q_count    = data.get("questionCount", 0)
    teacher_id = data.get("userId")

    pin = _gen_pin()

    quiz_rooms[pin] = {
        "pin":               pin,
        "host_sid":          sid,
        "teacher_id":        teacher_id,
        "set_id":            set_id,
        "title":             title,
        "questions":         [],   # questions loaded on start
        "state":             "waiting",
        "current_q":         -1,
        "players":           {},
        "scores":            {},
        "answers_this_round":{},
        "question_revealed": False,
        "_q_timer":          None,
    }

    join_room(pin)
    emit("quiz_room_created", {"pin": pin, "title": title})
    print(f"[Quiz] Room created: PIN={pin} by {teacher_id}")


@socketio.on("quiz_host_start")
def handle_quiz_host_start(data):
    """Giáo viên bắt đầu quiz (sau khi có đủ người)."""
    sid = request.sid
    pin = data.get("pin")
    room = quiz_rooms.get(pin)

    if not room or room["host_sid"] != sid:
        emit("error", {"msg": "Không có quyền bắt đầu phòng này."}); return

    if room["state"] != "waiting":
        emit("error", {"msg": "Phòng đã bắt đầu rồi."}); return

    # Load questions from Supabase
    try:
        res = supabase.table("quiz_questions") \
            .select("*") \
            .eq("set_id", room["set_id"]) \
            .order("order_num") \
            .execute()
        questions = res.data or []
    except Exception as e:
        print(f"[Quiz] Load questions error: {e}")
        emit("error", {"msg": "Không tải được câu hỏi."}); return

    if not questions:
        emit("error", {"msg": "Bộ đề không có câu hỏi nào."}); return

    room["questions"] = questions
    room["state"]     = "playing"
    room["current_q"] = 0
    room["scores"]    = {uid: 0 for uid in room["players"]}

    # Notify all players
    socketio.emit("quiz_starting", {"total": len(questions)}, room=pin)

    # Small delay then first question
    def _send_first():
        _qz_send_question(pin)

    _schedule(1.5, _send_first)
    print(f"[Quiz] Game started: PIN={pin} | {len(questions)} Qs | {len(room['players'])} players")


@socketio.on("quiz_host_next")
def handle_quiz_host_next(data):
    """Host bấm Câu Tiếp Theo."""
    sid = request.sid
    pin = data.get("pin")
    room = quiz_rooms.get(pin)

    if not room or room["host_sid"] != sid: return
    if room["state"] != "playing": return

    cancel_timer(room, "_q_timer")

    next_idx = data.get("questionIdx", room["current_q"] + 1)
    room["current_q"] = next_idx

    if next_idx >= len(room["questions"]):
        _qz_end_game(pin)
        return

    _qz_send_question(pin)


@socketio.on("quiz_host_reveal")
def handle_quiz_host_reveal(data):
    """Host bấm Hiện Đáp Án trước khi hết giờ."""
    sid = request.sid
    pin = data.get("pin")
    room = quiz_rooms.get(pin)

    if not room or room["host_sid"] != sid: return
    if room.get("question_revealed"): return

    cancel_timer(room, "_q_timer")
    room["question_revealed"] = True
    q_idx = data.get("questionIdx", room["current_q"])
    _qz_reveal_and_scores(pin, q_idx)


@socketio.on("quiz_host_end")
def handle_quiz_host_end(data):
    """Host kết thúc quiz sớm."""
    sid = request.sid
    pin = data.get("pin")
    room = quiz_rooms.get(pin)

    if not room or room["host_sid"] != sid: return
    cancel_timer(room, "_q_timer")
    _qz_end_game(pin)


# ══════════════════════════════════════
#   SOCKET.IO — PLAYER EVENTS
# ══════════════════════════════════════

@socketio.on("quiz_player_join")
def handle_quiz_player_join(data):
    """Học sinh tham gia phòng bằng PIN."""
    sid       = request.sid
    pin       = str(data.get("pin", "")).strip()
    user_id   = data.get("userId")
    name      = data.get("name", "Học sinh")
    avatar_url = data.get("avatarUrl", "")

    room = quiz_rooms.get(pin)
    if not room:
        emit("quiz_join_error", {"msg": f"Không tìm thấy phòng với mã PIN {pin}."}); return
    if room["state"] != "waiting":
        emit("quiz_join_error", {"msg": "Phòng đã bắt đầu thi. Không thể tham gia."}); return
    if not user_id:
        emit("quiz_join_error", {"msg": "Bạn cần đăng nhập để tham gia."}); return

    # Register player
    room["players"][user_id] = {"name": name, "sid": sid, "avatarUrl": avatar_url}
    room["scores"][user_id]  = 0
    join_room(pin)

    emit("quiz_joined", {
        "pin":         pin,
        "setTitle":    room["title"],
        "playerCount": len(room["players"]),
    })

    # Notify host
    socketio.emit(
        "quiz_player_joined",
        {
            "userId":  user_id,
            "name":    name,
            "players": {
                uid: {"name": p["name"], "avatarUrl": p.get("avatarUrl", "")}
                for uid, p in room["players"].items()
            },
        },
        room=room["host_sid"],
    )

    # Broadcast updated count to all in room
    _qz_broadcast_count(pin)
    print(f"[Quiz] Player joined: {name} → PIN={pin} ({len(room['players'])} total)")


@socketio.on("quiz_player_answer")
def handle_quiz_player_answer(data):
    """Học sinh gửi đáp án."""
    sid       = request.sid
    pin       = data.get("pin")
    user_id   = data.get("userId")
    answer    = data.get("answer")
    time_bonus = data.get("timeBonus", 0)

    room = quiz_rooms.get(pin)
    if not room or room["state"] != "playing": return
    if user_id not in room["players"]: return
    if user_id in room["answers_this_round"]: return  # already answered

    room["answers_this_round"][user_id] = {
        "answer":    answer,
        "timeBonus": time_bonus,
        "sid":       sid,
    }

    answered_count = len(room["answers_this_round"])
    total_players  = len(room["players"])

    # Notify host of answer progress
    socketio.emit(
        "quiz_answer_received",
        {
            "userId":       user_id,
            "answerCount":  answered_count,
            "totalPlayers": total_players,
            "scores":       _qz_scores_dict(room),
        },
        room=room["host_sid"],
    )

    # Auto-reveal when everyone answered
    if answered_count >= total_players and not room.get("question_revealed"):
        cancel_timer(room, "_q_timer")
        room["question_revealed"] = True
        _qz_reveal_and_scores(pin, room["current_q"])


# ══════════════════════════════════════
#   STATIC ROUTES (add to server.py)
# ══════════════════════════════════════

@app.route("/teacher")
def teacher_page():
    return send_file("teacher.html")

@app.route("/play")
def play_page():
    return send_file("play.html")





if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"[Server] GloryChem starting on port {port}")
    socketio.run(app, host="0.0.0.0", port=port, debug=False, allow_unsafe_werkzeug=True)