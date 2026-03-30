"""
GloryChem — Python Web Server with Socket.IO (Eventlet version)
Run locally:  python server.py
Deploy Render: gunicorn -k eventlet -w 1 --bind 0.0.0.0:$PORT server:app
"""
import eventlet
eventlet.monkey_patch()
# ⚠️ Monkey-patch must happen before any other imports

from supabase import create_client, Client
import os
import uuid
import json
import random
import math
from pathlib import Path
from flask import Flask, send_from_directory, send_file, request
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS

# ══════════════════════════════════════
#   APP SETUP
# ══════════════════════════════════════
app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'glorychem-secret-2025')

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    async_mode='eventlet',
    ping_timeout=60,
    ping_interval=25,
    max_http_buffer_size=1_000_000,
    logger=False,
    engineio_logger=False,
)

# ══════════════════════════════════════
#   SUPABASE
# ══════════════════════════════════════
SUPABASE_URL = os.environ.get('SUPABASE_URL', "https://cmrbsiuzrpsglynnfund.supabase.co")
SUPABASE_KEY = os.environ.get('SUPABASE_KEY', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtcmJzaXV6cnBzZ2x5bm5mdW5kIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDg0ODY3MywiZXhwIjoyMDkwNDI0NjczfQ.plgqzEWW505FqZegHzCklxO-JKXFsXhjegfdrbvU-7E")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ══════════════════════════════════════
#   IN-MEMORY STATE
# ══════════════════════════════════════
queued_players  = []   # list of (sid, user_data)
game_rooms      = {}   # room_id -> RoomState dict
online_users    = {}   # sid -> user_data
sid_to_uid      = {}   # sid -> userId
uid_to_sid      = {}   # userId -> sid
pending_invites = {}   # room_id -> invite metadata


# ══════════════════════════════════════
#   HELPERS
# ══════════════════════════════════════
def broadcast_presence():
    socketio.emit('presence_update', list(online_users.values()))


def make_user_payload(u):
    return {
        'userId':    u.get('userId'),
        'full_name': u.get('full_name', ''),
        'username':  u.get('username', ''),
        'elo':       u.get('elo', 1200),
        'wins':      u.get('wins', 0),
        'losses':    u.get('losses', 0),
    }


def scores_by_uid(room):
    return {
        room['players'][sid]['user'].get('userId'): room['scores'].get(sid, 0)
        for sid in room['players']
    }


def sanitize_q(q):
    """Strip answer/explanation before sending to clients."""
    return {k: v for k, v in q.items() if k not in ('correct', 'exp')}


def cancel_timer(room, key):
    h = room.pop(key, None)
    if h:
        try:
            h.cancel()   # eventlet GreenThread cancel
        except Exception:
            pass


def calc_elo(elo1, elo2, score1, score2, k=32):
    if score1 > score2:
        s1, s2 = 1, 0
    elif score1 < score2:
        s1, s2 = 0, 1
    else:
        s1 = s2 = 0.5

    e1 = 1 / (1 + 10 ** ((elo2 - elo1) / 400))
    e2 = 1 / (1 + 10 ** ((elo1 - elo2) / 400))

    new1 = int(elo1 + k * (s1 - e1))
    new2 = int(elo2 + k * (s2 - e2))

    return new1, new2


def end_battle_and_update(room_id):
    room = game_rooms.get(room_id)
    if not room:
        return

    players = list(room['players'].items())
    if len(players) < 2:
        return

    (sid1, p1), (sid2, p2) = players

    u1 = p1['user']
    u2 = p2['user']

    user1_id = u1.get('userId')
    user2_id = u2.get('userId')

    score1 = room['scores'].get(sid1, 0)
    score2 = room['scores'].get(sid2, 0)

    # 🔥 Lấy ELO hiện tại từ DB
    res = supabase.table('profiles') \
        .select('id, elo, wins, losses') \
        .in_('id', [user1_id, user2_id]) \
        .execute()

    profiles = {p['id']: p for p in res.data}

    p1_db = profiles.get(user1_id, {})
    p2_db = profiles.get(user2_id, {})

    elo1 = p1_db.get('elo', 1200)
    elo2 = p2_db.get('elo', 1200)

    # 🧠 Tính ELO mới
    new1, new2 = calc_elo(elo1, elo2, score1, score2)

    # 🏆 Win/Loss
    win1 = score1 > score2
    win2 = score2 > score1

    upd1 = {
        "elo": max(100, new1),
        "wins":   (p1_db.get('wins', 0) + 1) if win1 else p1_db.get('wins', 0),
        "losses": (p1_db.get('losses', 0) + 1) if win2 else p1_db.get('losses', 0),
    }

    upd2 = {
        "elo": max(100, new2),
        "wins":   (p2_db.get('wins', 0) + 1) if win2 else p2_db.get('wins', 0),
        "losses": (p2_db.get('losses', 0) + 1) if win1 else p2_db.get('losses', 0),
    }

    # 🚀 Update DB
    err1 = supabase.table('profiles').update(upd1).eq('id', user1_id).execute()
    err2 = supabase.table('profiles').update(upd2).eq('id', user2_id).execute()

    print("DB UPDATE:", err1.data, err2.data)

    # 📤 Gửi về client
    socketio.emit('battle_result', {
        "scores": {
            user1_id: score1,
            user2_id: score2
        },
        "elo_change": {
            user1_id: upd1["elo"] - elo1,
            user2_id: upd2["elo"] - elo2
        },
        "winnerUserId": user1_id if win1 else user2_id if win2 else None
    }, room=room_id)

    # 🧹 Cleanup room
    game_rooms.pop(room_id, None)


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
    return {"status": "ok", "app": "GloryChem", "online": len(online_users)}, 200


# ══════════════════════════════════════
#   CONNECTION LIFECYCLE
# ══════════════════════════════════════
@socketio.on('connect')
def handle_connect():
    print(f"[+] Connect: {request.sid}")


@socketio.on('disconnect')
def handle_disconnect():
    sid = request.sid
    print(f"[-] Disconnect: {sid}")

    global queued_players
    queued_players = [p for p in queued_players if p[0] != sid]

    user_data = online_users.pop(sid, None)
    if user_data:
        uid = user_data.get('userId')
        if uid and uid_to_sid.get(uid) == sid:
            uid_to_sid.pop(uid, None)
        sid_to_uid.pop(sid, None)

    # Notify opponent in active room
    rooms_to_remove = []
    for room_id, room in game_rooms.items():
        if sid in room['players'] and room['state'] in ('lobby', 'battle'):
            other_sids = [s for s in room['players'] if s != sid]
            for other in other_sids:
                socketio.emit('opponent_left', {
                    'msg': 'Đối thủ đã ngắt kết nối.'
                }, room=other)
            rooms_to_remove.append(room_id)

    for room_id in rooms_to_remove:
        game_rooms.pop(room_id, None)

    broadcast_presence()


# ══════════════════════════════════════
#   PRESENCE
# ══════════════════════════════════════
@socketio.on('presence:join')
def handle_presence_join(data):
    sid = request.sid
    uid = data.get('userId')
    if not uid:
        emit('error', {'msg': 'userId required'})
        return

    # Handle reconnect: evict old session for same user
    old_sid = uid_to_sid.get(uid)
    if old_sid and old_sid != sid:
        online_users.pop(old_sid, None)
        sid_to_uid.pop(old_sid, None)

    entry = {
        'sid':       sid,
        'userId':    uid,
        'full_name': data.get('full_name', ''),
        'username':  data.get('username', ''),
        'elo':       int(data.get('elo', 1200)),
        'wins':      int(data.get('wins', 0)),
        'losses':    int(data.get('losses', 0)),
    }
    online_users[sid] = entry
    sid_to_uid[sid]   = uid
    uid_to_sid[uid]   = sid

    emit('presence_list', list(online_users.values()))
    broadcast_presence()


@socketio.on('presence:update')
def handle_presence_update(data):
    sid = request.sid
    if sid not in online_users:
        return
    for key in ('full_name', 'username', 'elo', 'wins', 'losses'):
        if key in data:
            online_users[sid][key] = data[key]
    broadcast_presence()


# ══════════════════════════════════════
#   QUICK MATCH
# ══════════════════════════════════════
@socketio.on('join_queue')
def handle_join_queue(data=None):
    sid  = request.sid
    user = online_users.get(sid)
    if not user:
        emit('error', {'msg': 'Chưa đăng nhập'})
        return
    if any(p[0] == sid for p in queued_players):
        return

    queued_players.append((sid, user))

    if len(queued_players) >= 2:
        queued_players.sort(key=lambda x: x[1].get('elo', 1200))
        p1_sid, p1_data = queued_players.pop(0)
        p1_elo = p1_data.get('elo', 1200)
        best = min(range(len(queued_players)),
                   key=lambda i: abs(queued_players[i][1].get('elo', 1200) - p1_elo))
        p2_sid, p2_data = queued_players.pop(best)
        _create_room_and_notify(p1_sid, p1_data, p2_sid, p2_data)
    else:
        emit('queued', {'waiting': True, 'position': len(queued_players)})


@socketio.on('cancel_queue')
def handle_cancel_queue(data=None):
    global queued_players
    sid = request.sid
    queued_players = [p for p in queued_players if p[0] != sid]
    emit('queue_cancelled', {})


# ══════════════════════════════════════
#   INVITE FRIEND
# ══════════════════════════════════════
@socketio.on('invite_friend')
def handle_invite_friend(data):
    sid       = request.sid
    from_user = online_users.get(sid)
    if not from_user:
        emit('error', {'msg': 'Chưa đăng nhập'})
        return

    to_uid = data.get('toUserId')
    if not to_uid:
        emit('error', {'msg': 'toUserId required'})
        return

    to_sid = uid_to_sid.get(to_uid)
    if not to_sid or to_sid not in online_users:
        emit('error', {'msg': 'Người chơi không còn online'})
        return

    if to_sid == sid:
        emit('error', {'msg': 'Không thể mời chính mình'})
        return

    room_id = str(uuid.uuid4())
    game_rooms[room_id] = {
        'players':          {},
        'state':            'invited',
        'lobby_timeout':    30,
        'battle_timeout':   30,
        'questions':        [],
        'scores':           {},
        'current_question': 0,
        'answers_received': {},
        'player_topics':    {},
        'player_ready':     {},
    }
    pending_invites[room_id] = {
        'from_sid': sid,
        'to_sid':   to_sid,
    }

    socketio.emit('invite_received', {
        'roomId': room_id,
        'from':   make_user_payload(from_user),
    }, room=to_sid)

    emit('invite_sent', {'roomId': room_id})


@socketio.on('invite_response')
def handle_invite_response(data):
    sid     = request.sid
    room_id = data.get('roomId')
    accept  = data.get('accept', False)
    room    = game_rooms.get(room_id)
    invite  = pending_invites.get(room_id)

    if not room or not invite:
        emit('error', {'msg': 'Lời mời không còn hợp lệ'})
        return

    from_sid = invite['from_sid']

    if not accept:
        socketio.emit('invite_rejected', {'roomId': room_id}, room=from_sid)
        game_rooms.pop(room_id, None)
        pending_invites.pop(room_id, None)
        return

    from_user = online_users.get(from_sid)
    to_user   = online_users.get(sid)
    if not from_user or not to_user:
        emit('error', {'msg': 'Người chơi không còn online'})
        game_rooms.pop(room_id, None)
        pending_invites.pop(room_id, None)
        return

    pending_invites.pop(room_id, None)
    _setup_room(room_id, from_sid, from_user, sid, to_user)

    socketio.emit('match_found', {
        'roomId':   room_id,
        'role':     'host',
        'opponent': make_user_payload(to_user),
    }, room=from_sid)

    socketio.emit('match_found', {
        'roomId':   room_id,
        'role':     'guest',
        'opponent': make_user_payload(from_user),
    }, room=sid)


# ══════════════════════════════════════
#   ROOM LIFECYCLE
# ══════════════════════════════════════
@socketio.on('join_room')
def handle_join_room(data):
    sid     = request.sid
    room_id = data.get('roomId')
    room    = game_rooms.get(room_id)

    if not room:
        emit('error', {'msg': 'Phòng không tồn tại'})
        return
    if sid not in room['players']:
        emit('error', {'msg': 'Bạn không thuộc phòng này'})
        return

    join_room(room_id)
    room['players'][sid]['joined'] = True

    all_joined = all(p.get('joined', False) for p in room['players'].values())
    if all_joined and room['state'] == 'lobby':
        _start_lobby(room_id)


@socketio.on('lobby_action')
def handle_lobby_action(data):
    sid     = request.sid
    room_id = data.get('roomId')
    room    = game_rooms.get(room_id)

    if not room or room['state'] != 'lobby':
        return
    if sid not in room['players']:
        return

    if 'topics' in data:
        room['player_topics'][sid] = data['topics']

    if data.get('ready'):
        room['player_ready'][sid] = True
        uid = room['players'][sid]['user'].get('userId')
        socketio.emit('lobby_update', {
            'readyUserId': uid,
            'playerReady': {
                room['players'][s]['user']['userId']: room['player_ready'].get(s, False)
                for s in room['players']
            },
        }, room=room_id)

        if len(room['player_ready']) == 2 and all(room['player_ready'].values()):
            cancel_timer(room, '_lobby_timer')
            _finalize_and_start_battle(room_id)


@socketio.on('battle_action')
def handle_battle_action(data):
    sid = request.sid
    room_id = data.get('roomId')
    room = game_rooms.get(room_id)

    if not room or room['state'] != 'battle':
        return
    if sid not in room['players']:
        return
    if room.get('question_finished', False):
        return
    if room['player_correct'].get(sid, False):
        return

    q_idx = room['current_question']
    q = room['questions'][q_idx]
    ans = data.get('answer')

    if q['type'] == 'mcq':
        correct = (ans is not None and int(ans) == int(q['correct']))
    else:
        correct = (str(ans).strip().lower() == str(q['correct']).strip().lower())

    emit('answer_result', {
        'correct': correct,
        'explanation': q.get('exp', ''),
        'correctAnswer': q['correct'],
        'opts': q.get('opts', []),
    })

    if correct:
        if not room['player_correct'].get(sid, False):
            room['scores'][sid] = room['scores'].get(sid, 0) + 1
            room['player_correct'][sid] = True

        room['question_finished'] = True
        cancel_timer(room, '_q_timer')

        socketio.emit('battle_update', {
            'playerAnsweredUserId': room['players'][sid]['user'].get('userId'),
            'correct': True,
            'scores': scores_by_uid(room),
        }, room=room_id)

        # Sau 1 giây chuyển sang câu tiếp theo
        eventlet.spawn_after(1.0, _next_question, room_id)
        return

    socketio.emit('battle_update', {
        'playerAnsweredUserId': room['players'][sid]['user'].get('userId'),
        'correct': False,
        'scores': scores_by_uid(room),
    }, room=room_id)


# ══════════════════════════════════════
#   INTERNAL FUNCTIONS
# ══════════════════════════════════════
def _create_room_and_notify(sid1, u1, sid2, u2):
    room_id = str(uuid.uuid4())
    _setup_room(room_id, sid1, u1, sid2, u2)
    socketio.emit('match_found', {
        'roomId': room_id, 'role': 'host', 'opponent': make_user_payload(u2),
    }, room=sid1)
    socketio.emit('match_found', {
        'roomId': room_id, 'role': 'guest', 'opponent': make_user_payload(u1),
    }, room=sid2)


def _setup_room(room_id, sid1, u1, sid2, u2):
    game_rooms[room_id] = {
        'players': {
            sid1: {'user': u1, 'joined': False},
            sid2: {'user': u2, 'joined': False},
        },
        'state':             'lobby',
        'lobby_timeout':     30,
        'battle_timeout':    30,
        'questions':         [],
        'scores':            {sid1: 0, sid2: 0},
        'current_question':  0,
        'player_correct':    {},
        'question_finished': False,
        'player_topics':     {},
        'player_ready':      {},
    }


def _start_lobby(room_id):
    room = game_rooms.get(room_id)
    if not room:
        return
    socketio.emit('lobby_start', {
        'roomId': room_id, 'timeout': room['lobby_timeout'],
    }, room=room_id)

    def _on_timeout():
        r = game_rooms.get(room_id)
        if r and r['state'] == 'lobby':
            _finalize_and_start_battle(room_id)

    room['_lobby_timer'] = eventlet.spawn_after(room['lobby_timeout'], _on_timeout)


def _finalize_and_start_battle(room_id):
    room = game_rooms.get(room_id)
    if not room or room['state'] != 'lobby':
        return

    all_topics = set()
    for sid in room['players']:
        all_topics.update(room['player_topics'].get(sid, []))
    if not all_topics:
        all_topics = set(random.sample(list(TOPICS.keys()), 3))

    qs = _build_questions(list(all_topics), 10)
    room['questions']        = qs
    room['state']            = 'battle'
    room['current_question'] = 0
    room['scores']           = {sid: 0 for sid in room['players']}
    room['answers_received'] = {sid: False for sid in room['players']}

    _send_current_question(room_id)


def _send_current_question(room_id):
    room = game_rooms.get(room_id)
    if not room or room['state'] != 'battle':
        return

    q_idx = room['current_question']
    if q_idx >= len(room['questions']):
        _end_battle(room_id)
        return

    room['question_finished'] = False
    room['player_correct'] = {}

    q = room['questions'][q_idx]
    socketio.emit('battle_question', {
        'question': sanitize_q(q),
        'index':    q_idx + 1,
        'total':    len(room['questions']),
        'timeout':  room['battle_timeout'],
    }, room=room_id)

    def _on_q_timeout():
        r = game_rooms.get(room_id)
        if r and r['state'] == 'battle' and r['current_question'] == q_idx and not r['question_finished']:
            r['question_finished'] = True
            _next_question(room_id)

    room['_q_timer'] = eventlet.spawn_after(room['battle_timeout'], _on_q_timeout)


def _next_question(room_id):
    room = game_rooms.get(room_id)
    if not room or room['state'] != 'battle':
        return

    room['current_question'] += 1

    if room['current_question'] >= len(room['questions']):
        print(f"🏁 Battle finished: {room_id}")
        if room.get('ended'):
            return
        room['ended'] = True
        end_battle_and_update(room_id)
        return

    _send_current_question(room_id)


def _end_battle(room_id):
    room = game_rooms.get(room_id)
    if not room:
        return

    room['state'] = 'finished'
    sc = room['scores']
    sids = list(sc.keys())

    winner_uid = loser_uid = None
    if len(sids) == 2:
        s1, s2 = sids[0], sids[1]
        if sc[s1] > sc[s2]:
            winner_uid = room['players'][s1]['user'].get('userId')
            loser_uid  = room['players'][s2]['user'].get('userId')
        elif sc[s2] > sc[s1]:
            winner_uid = room['players'][s2]['user'].get('userId')
            loser_uid  = room['players'][s1]['user'].get('userId')

    elo_change = {}
    for sid in room['players']:
        uid = room['players'][sid]['user'].get('userId')
        if uid == winner_uid:
            elo_change[uid] = 20
        elif uid == loser_uid:
            elo_change[uid] = -15
        else:
            elo_change[uid] = 0

    socketio.emit('battle_result', {
        'scores':       scores_by_uid(room),
        'winnerUserId': winner_uid,
        'elo_change':   elo_change,
    }, room=room_id)

    eventlet.spawn_after(10, lambda: game_rooms.pop(room_id, None))


def _build_questions(topics, num_questions=10):
    pool = []
    for t in topics:
        for q in QUESTION_BANK.get(t, []):
            pool.append({**q, 'topicId': t})
    random.shuffle(pool)
    return pool[:num_questions]


# ══════════════════════════════════════
#   DATA
# ══════════════════════════════════════
TOPICS = {
    'acid-base': {'name': 'Axit — Bazơ',       'icon': '⚗️'},
    'redox':     {'name': 'Oxi hóa khử',         'icon': '⚡'},
    'electro':   {'name': 'Điện hóa',            'icon': '🔋'},
    'organic':   {'name': 'Hóa hữu cơ',          'icon': '🌿'},
    'periodic':  {'name': 'Bảng tuần hoàn',      'icon': '📋'},
    'solution':  {'name': 'Dung dịch',           'icon': '💧'},
    'thermo':    {'name': 'Nhiệt hóa học',       'icon': '🔥'},
    'equilib':   {'name': 'Cân bằng hóa học',   'icon': '⚖️'},
}

QUESTION_BANK = {
    'acid-base': [
        {'type':'mcq','q':'Dung dịch HCl 0.01M có pH bằng bao nhiêu?','opts':['pH = 1','pH = 2','pH = 3','pH = 12'],'correct':1,'exp':'[HCl]=0.01M → [H⁺]=0.01 → pH=-log(0.01)=2'},
        {'type':'num','q':'Tính pH của dung dịch NaOH 0.001M (pOH trước, rồi pH = 14 - pOH)','correct':'11','exp':'pOH=3 → pH=11'},
        {'type':'mcq','q':'Chất nào sau đây là axit mạnh?','opts':['CH₃COOH','HF','HNO₃','H₂CO₃'],'correct':2,'exp':'HNO₃ là axit mạnh, phân li hoàn toàn trong nước'},
        {'type':'num','q':'Trộn 100ml HCl 0.2M với 100ml NaOH 0.1M. pH của dung dịch thu được (làm tròn nguyên)?','correct':'1','exp':'nHCl=0.02, nNaOH=0.01 → dư 0.01mol HCl/200ml → [H+]=0.05M → pH≈1.3 ≈ 1'},
        {'type':'mcq','q':'Ion nào làm cho dung dịch có môi trường bazơ?','opts':['NH₄⁺','Al³⁺','CO₃²⁻','Fe³⁺'],'correct':2,'exp':'CO₃²⁻ thủy phân tạo OH⁻ → môi trường bazơ'},
        {'type':'mcq','q':'Giá trị pH của máu người bình thường là?','opts':['6.8 – 7.0','7.35 – 7.45','7.8 – 8.0','6.0 – 6.5'],'correct':1,'exp':'pH máu bình thường: 7.35 – 7.45'},
    ],
    'redox': [
        {'type':'mcq','q':'Trong phản ứng: Fe + CuSO₄ → FeSO₄ + Cu. Chất nào bị oxi hóa?','opts':['Fe','CuSO₄','FeSO₄','Cu'],'correct':0,'exp':'Fe → Fe²⁺ (mất electron) → Fe bị oxi hóa'},
        {'type':'num','q':'Số oxi hóa của Mn trong KMnO₄ là? (nhập số nguyên dương)','correct':'7','exp':'K(+1)+Mn(x)+4O(-2)=0 → x=+7'},
        {'type':'mcq','q':'Chất khử là chất:','opts':['Nhận electron','Cho electron','Nhận proton','Cho proton'],'correct':1,'exp':'Chất khử là chất nhường/cho electron'},
        {'type':'num','q':'Số oxi hóa của S trong H₂SO₄?','correct':'6','exp':'2(+1)+S+4(-2)=0 → S=+6'},
        {'type':'mcq','q':'Phản ứng nào sau đây là phản ứng oxi hóa khử?','opts':['NaCl + AgNO₃','CaCO₃ nhiệt phân','Zn + H₂SO₄ loãng','NaOH + HCl'],'correct':2,'exp':'Zn → Zn²⁺ + 2e⁻ (oxi hóa); 2H⁺ + 2e⁻ → H₂ (khử)'},
    ],
    'electro': [
        {'type':'mcq','q':'Suất điện động của pin Daniell (Zn-Cu) ở điều kiện chuẩn là bao nhiêu?','opts':['0.76 V','1.10 V','1.46 V','0.34 V'],'correct':1,'exp':'E°cell = E°Cu - E°Zn = 0.34 - (-0.76) = 1.10 V'},
        {'type':'num','q':'Điện cực nào là cực âm (anot) trong pin điện hóa? Nhập 1=anot, 2=catot','correct':'1','exp':'Cực âm = anot = xảy ra oxi hóa'},
        {'type':'mcq','q':'Trong điện phân dung dịch CuSO₄, tại catot xảy ra:','opts':['Cu²⁺ + 2e⁻ → Cu','Cu → Cu²⁺ + 2e⁻','2H₂O → O₂ + 4H⁺ + 4e⁻','SO₄²⁻ bị oxi hóa'],'correct':0,'exp':'Catot: Cu²⁺ + 2e⁻ → Cu (khử)'},
    ],
    'organic': [
        {'type':'mcq','q':'Công thức phân tử của metan là?','opts':['C₂H₆','CH₄','C₃H₈','C₂H₄'],'correct':1,'exp':'Metan = CH₄, hydrocacbon no đơn giản nhất'},
        {'type':'num','q':'Etilen (C₂H₄) có bao nhiêu liên kết đôi C=C?','correct':'1','exp':'Etilen: CH₂=CH₂ → 1 liên kết đôi C=C'},
        {'type':'mcq','q':'Phản ứng đặc trưng của ankan là?','opts':['Cộng hợp','Thế halogen','Trùng hợp','Tách nước'],'correct':1,'exp':'Ankan có liên kết đơn bền → đặc trưng là phản ứng thế (halogen hóa)'},
        {'type':'mcq','q':'Glucozơ (C₆H₁₂O₆) thuộc loại hợp chất nào?','opts':['Lipit','Protein','Cacbohidrat','Axit amin'],'correct':2,'exp':'Glucozơ là monosaccarit thuộc nhóm cacbohidrat'},
        {'type':'num','q':'Số nguyên tử C trong phân tử benzen (C₆H₆)?','correct':'6','exp':'Benzen: C₆H₆ → 6 nguyên tử cacbon'},
    ],
    'periodic': [
        {'type':'num','q':'Nguyên tố nào có số hiệu nguyên tử Z = 26? Nhập số nguyên tử proton của Fe','correct':'26','exp':'Z=26 là Fe (Sắt)'},
        {'type':'mcq','q':'Nhóm IA của bảng tuần hoàn còn được gọi là:','opts':['Halogen','Kim loại kiềm','Kim loại kiềm thổ','Khí hiếm'],'correct':1,'exp':'Nhóm IA = kim loại kiềm: Li, Na, K, Rb, Cs, Fr'},
        {'type':'num','q':'Chu kì 2 của bảng tuần hoàn có bao nhiêu nguyên tố?','correct':'8','exp':'Chu kì 2: Li → Ne = 8 nguyên tố'},
        {'type':'mcq','q':'Trong một chu kì, tính kim loại biến đổi theo chiều nào?','opts':['Tăng từ trái qua phải','Giảm từ trái qua phải','Không đổi','Biến đổi bất thường'],'correct':1,'exp':'Trong chu kì: tính kim loại giảm dần từ trái → phải'},
    ],
    'solution': [
        {'type':'num','q':'Độ tan của NaCl trong 100g nước ở 20°C là khoảng bao nhiêu gam? (làm tròn đến chục)','correct':'36','exp':'NaCl có độ tan ≈ 36g/100g nước ở 20°C'},
        {'type':'mcq','q':'Dung dịch bão hòa là dung dịch:','opts':['Có thể hòa tan thêm chất tan','Không thể hòa tan thêm chất tan','Không có chất tan','Có nồng độ mol/L = 1'],'correct':1,'exp':'Dung dịch bão hòa đã đạt giới hạn hòa tan của chất tan'},
        {'type':'mcq','q':'Nồng độ mol/L (C_M) được tính bằng:','opts':['m/V','n/V(L)','m/m_dm','n/m'],'correct':1,'exp':'C_M = n(mol) / V(lít)'},
    ],
    'thermo': [
        {'type':'mcq','q':'Phản ứng tỏa nhiệt có ΔH:','opts':['ΔH > 0','ΔH < 0','ΔH = 0','ΔH không xác định'],'correct':1,'exp':'Phản ứng tỏa nhiệt: ΔH < 0 (hệ tỏa năng lượng ra môi trường)'},
        {'type':'num','q':'Nhiệt đốt cháy của C thành CO₂ là -394 kJ/mol. Đốt 12g C sinh ra bao nhiêu kJ? (số nguyên)','correct':'394','exp':'12g C = 1mol → tỏa 394 kJ'},
    ],
    'equilib': [
        {'type':'mcq','q':'Nguyên lý Le Chatelier phát biểu về:','opts':['Tốc độ phản ứng','Chiều dịch chuyển cân bằng khi bị tác động','Năng lượng hoạt hóa','Trật tự phản ứng'],'correct':1,'exp':'Le Chatelier: khi cân bằng bị phá vỡ, hệ tự điều chỉnh để chống lại sự thay đổi đó'},
        {'type':'mcq','q':'Tăng nồng độ chất phản ứng sẽ làm cân bằng:','opts':['Dịch chuyển sang trái','Dịch chuyển sang phải','Không đổi','Phụ thuộc nhiệt độ'],'correct':1,'exp':'Tăng nồng độ chất đầu → cân bằng chuyển sang phải (tạo thêm sản phẩm)'},
    ],
}


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 GloryChem server on port {port}")
    socketio.run(app, host="0.0.0.0", port=port, debug=False)