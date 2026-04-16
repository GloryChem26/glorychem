# 🧪 GloryChem

> **Nền tảng học hóa học tương tác** — Kết hợp game thủ thành, đấu trí trực tuyến và hệ thống quiz dành cho giáo viên & học sinh.

---

## 📖 Giới thiệu

**GloryChem** là một web app học hóa học gamified, bao gồm:

- 🎮 **GloryDefense** — Game Tower Defense hóa học (phong cách Plants vs Zombies), nơi người chơi sử dụng phản ứng trung hòa axit–bazơ để tiêu diệt Zombie.
- ⚔️ **Battle Mode** — Đấu trí 1v1 hoặc FFA (Free-for-All) với câu hỏi trắc nghiệm hóa học theo chủ đề, có hệ thống ELO xếp hạng.
- 📚 **Quiz Mode** — Giáo viên tạo phòng quiz qua mã PIN, học sinh tham gia và thi đua theo thời gian thực.
- 🏆 **Leaderboard & Forum** — Bảng xếp hạng toàn cầu và diễn đàn chia sẻ kiến thức hóa học.

---

## ✨ Tính năng nổi bật

| Tính năng | Mô tả |
|---|---|
| 🎮 GloryDefense | Game Tower Defense với cơ chế phản ứng hóa học Axit / Bazơ / Lửa |
| ⚔️ 1v1 & FFA Battle | Đấu trí real-time, có lobby, hàng đợi xếp cặp theo ELO |
| 📚 Quiz Classroom | Giáo viên điều khiển quiz theo PIN; học sinh trả lời realtime |
| 🏆 ELO Rating | Tính điểm ELO sau mỗi trận đấu (cả 1v1 và FFA) |
| 📊 Leaderboard | Bảng xếp hạng top 100 theo ELO, cập nhật mỗi 30 giây |
| 💬 Forum | Viết/đọc bài theo 3 chủ đề: Mẹo học, Ghi nhớ, Câu hỏi |
| 👤 Hồ sơ cá nhân | Đổi avatar, xem lịch sử thắng/thua |
| 🔒 Bảo mật | JWT Auth qua Supabase, rate limiting, bảo vệ IDOR |

---

## 🛠️ Công nghệ sử dụng

**Backend**
- Python 3.10+
- Flask + Flask-SocketIO (async threading mode)
- Flask-CORS
- Supabase Python SDK (PostgreSQL + Auth + Storage)
- `python-dotenv`

**Frontend**
- HTML5 / CSS3 / Vanilla JavaScript
- Socket.IO Client
- Canvas API (game engine)

**Database & Auth**
- Supabase (PostgreSQL)
- Supabase Auth (JWT)
- Supabase Storage (avatar upload)

**Deploy**
- Render.com (Uvicorn ASGI)

---

## 📁 Cấu trúc thư mục

```
GloryChem/
├── server.py              # Backend Flask + Socket.IO chính
├── .env                   # Biến môi trường (không commit)
├── .env.example           # Mẫu biến môi trường
│
├── templates/
│   ├── index.html         # Trang chủ (Login, Battle, Lobby, Leaderboard, Forum)
│   ├── teacher.html       # Trang điều khiển quiz của giáo viên
│   └── play.html          # Trang học sinh tham gia quiz
│
├── static/
│   └── quiz/
│       └── questions.json # Ngân hàng câu hỏi hóa học (theo chủ đề)
│
└── game/
    ├── index.html         # Giao diện game GloryDefense
    ├── game.js            # Logic game (Tower Defense engine)
    ├── style.css          # Style cho game
    └── images/            # Sprite: acidplant, baseplant, waterplant, xeng...
```

---

## ⚙️ Cài đặt & Chạy

### 1. Clone dự án

```bash
git clone https://github.com/<your-username>/GloryChem.git
cd GloryChem
```

### 2. Tạo môi trường ảo & cài thư viện

```bash
python -m venv venv
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

pip install flask flask-socketio flask-cors supabase python-dotenv
```

### 3. Cấu hình biến môi trường

Sao chép file `.env.example` thành `.env` rồi điền thông tin từ Supabase Dashboard:

```bash
cp .env.example .env
```

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key
SUPABASE_ANON_KEY=your-anon-public-key
SECRET_KEY=your-flask-secret-key
```

> ⚠️ **Lưu ý:** `SUPABASE_KEY` là Service Role Key — **không được** commit lên Git.

### 4. Chạy server

```bash
python server.py
```

Mở trình duyệt tại `http://localhost:5000`

---

## 🗄️ Cấu trúc Database (Supabase)

### Bảng `profiles`
| Cột | Kiểu | Mô tả |
|---|---|---|
| `id` | uuid (FK auth.users) | ID người dùng |
| `full_name` | text | Họ tên |
| `username` | text | Tên hiển thị |
| `elo` | int | Điểm ELO (mặc định 1200) |
| `wins` | int | Số trận thắng |
| `losses` | int | Số trận thua |
| `avatar_url` | text | URL ảnh đại diện |

### Bảng `forum_posts`
| Cột | Kiểu | Mô tả |
|---|---|---|
| `id` | uuid | ID bài viết |
| `user_id` | uuid | FK profiles |
| `title` | text | Tiêu đề (tối đa 200 ký tự) |
| `content` | text | Nội dung (tối đa 3000 ký tự) |
| `category` | text | `tip` / `memory` / `question` |
| `comment_count` | int | Số bình luận |
| `created_at` | timestamp | Thời gian tạo |

### Bảng `forum_comments`
| Cột | Kiểu | Mô tả |
|---|---|---|
| `id` | uuid | ID bình luận |
| `post_id` | uuid | FK forum_posts |
| `user_id` | uuid | FK profiles |
| `content` | text | Nội dung (tối đa 1000 ký tự) |
| `created_at` | timestamp | Thời gian tạo |

### Bảng `quiz_questions`
| Cột | Kiểu | Mô tả |
|---|---|---|
| `id` | uuid | ID câu hỏi |
| `set_id` | uuid | ID bộ đề |
| `order_num` | int | Thứ tự câu hỏi |
| `correct_answer` | text | Đáp án đúng |
| `time_limit` | int | Thời gian (giây) |
| `points` | int | Điểm tối đa |

---

## 🌐 API Endpoints

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| `GET` | `/api/config` | Lấy Supabase URL & Anon Key | Không |
| `GET` | `/api/leaderboard` | Top 100 ELO (cache 30s) | Không |
| `GET` | `/api/forum/posts` | Danh sách bài viết (filter `?category=`) | Không |
| `POST` | `/api/forum/posts` | Tạo bài viết mới | ✅ JWT |
| `DELETE` | `/api/forum/posts/<id>` | Xóa bài viết (chỉ chủ bài) | ✅ JWT |
| `GET` | `/api/forum/posts/<id>/comments` | Lấy bình luận | Không |
| `POST` | `/api/forum/posts/<id>/comments` | Thêm bình luận | ✅ JWT |
| `DELETE` | `/api/forum/posts/<id>/comments/<cid>` | Xóa bình luận (chỉ chủ) | ✅ JWT |
| `POST` | `/upload-avatar` | Upload ảnh đại diện | ✅ JWT |
| `GET` | `/health` | Kiểm tra trạng thái server | Không |

---

## 🔌 Socket.IO Events

### Presence
| Event | Chiều | Mô tả |
|---|---|---|
| `presence:join` | Client → Server | Đăng ký online |
| `presence_update` | Server → All | Cập nhật danh sách online |

### Battle (1v1 & FFA)
| Event | Chiều | Mô tả |
|---|---|---|
| `join_queue` | Client → Server | Tham gia hàng đợi xếp cặp |
| `match_found` | Server → Client | Đã tìm được đối thủ |
| `battle_question` | Server → Room | Gửi câu hỏi |
| `battle_action` | Client → Server | Gửi đáp án |
| `battle_result` | Server → Room | Kết quả trận + ELO mới |

### Lobby Room
| Event | Chiều | Mô tả |
|---|---|---|
| `create_lobby_room` | Client → Server | Tạo phòng chờ |
| `join_lobby_room` | Client → Server | Vào phòng (hỗ trợ mật khẩu) |
| `start_lobby_battle` | Host → Server | Bắt đầu FFA |
| `toggle_lobby_ready` | Client → Server | Bật/tắt trạng thái sẵn sàng |

### Quiz (Classroom)
| Event | Chiều | Mô tả |
|---|---|---|
| `quiz_host_create` | Teacher → Server | Tạo phòng quiz, nhận PIN |
| `quiz_host_start` | Teacher → Server | Bắt đầu quiz |
| `quiz_player_join` | Student → Server | Tham gia bằng PIN |
| `quiz_question` | Server → Room | Gửi câu hỏi đến học sinh |
| `quiz_player_answer` | Student → Server | Gửi đáp án |
| `quiz_answer_result` | Server → Player | Kết quả đúng/sai + điểm |
| `quiz_ended` | Server → Room | Kết thúc quiz + bảng điểm |

---

## 🚀 Deploy lên Render

1. Tạo service **Web Service** mới trên [render.com](https://render.com)
2. Kết nối GitHub repository
3. Cấu hình:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT --workers 1`
4. Thêm các biến môi trường trong tab **Environment**

---

## 🔒 Bảo mật

- Xác thực bằng **JWT Supabase** — mọi endpoint nhạy cảm đều verify token.
- **Rate Limiting** tích hợp: giới hạn số request per IP/user trên các API dễ bị spam.
- Bảo vệ **IDOR**: chỉ chủ bài / chủ bình luận mới có thể xóa nội dung của mình.
- **Security headers**: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`.
- Password phòng lobby **không bao giờ** gửi về client.

---

## 🎮 Hướng dẫn chơi GloryDefense

1. Truy cập `/GloryDefense`
2. Đặt cây **Axit (HCl)**, **Bazơ (NaOH)** hoặc **Nước (H₂O)** lên các ô trống
3. Mỗi loại Zombie có hệ yếu riêng — dùng đúng hệ để gây sát thương gấp đôi, sai hệ sẽ làm Zombie **hồi máu**
4. Thu thập **Túi Muối 🧂** rơi ra khi Zombie chết → điện phân tại **Bàn Điện Phân ⚡** để nhận thêm năng lượng
5. Dùng **Xẻng ⛏️** (phím `Q`) để thu hồi cây cũ

| Cây | Chi phí | Hiệu quả nhất với |
|---|---|---|
| 🟢 Axit (HCl) | 1 🟢 | Zombie Bazơ |
| 🔵 Bazơ (NaOH) | 1 🔵 | Zombie Axit |
| 💧 Nước (H₂O) | 1 🟢 + 1 🔵 | Zombie Lửa (Na, K...) |

---

## 🤝 Đóng góp

Pull request và issue luôn được chào đón!

```bash
# Fork repo → tạo branch mới
git checkout -b feature/ten-tinh-nang

# Commit thay đổi
git commit -m "feat: mô tả tính năng"

# Push và tạo Pull Request
git push origin feature/ten-tinh-nang
```

---

## 📄 License

MIT License — xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

<p align="center">
  Made with ❤️ for Chemistry Education
</p>
