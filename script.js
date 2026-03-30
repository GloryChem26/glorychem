
// ══ SUPABASE ══
const SURL = 'https://cmrbsiuzrpsglynnfund.supabase.co';
const SKEY = 'sb_publishable_-4uRGeYYYeJAvSMKnwZr5Q_LOSAr_dZ';
const { createClient } = supabase;
let sb;
try { sb = createClient(SURL, SKEY); console.log('✅ GloryChem connected'); }
catch(e) { console.warn('Supabase:', e.message); }
let U = null;

// ── INIT ──
async function init() {
  if (!sb) return;

  // ① Kiểm tra URL từ email link (cả hash lẫn query param – PKCE)
  const handled = await handleEmailRedirect();

  // Nếu đang xử lý recovery redirect thì dừng ở đây,
  // onAuthStateChange sẽ tiếp quản sau khi exchangeCodeForSession xong
  if (handled) return;

  try {
    const { data: { session } } = await sb.auth.getSession();
    if (session) { U = session.user; await loadP(); renderIn(); }
    sb.auth.onAuthStateChange(async (ev, s) => {
      if (ev === 'SIGNED_IN' && s) {
        U = s.user; await loadP(); renderIn(); closeM();
        toast('ok','✅ Đăng nhập thành công!');
        subscribeProfileRealtime()
      }
      else if (ev === 'SIGNED_OUT') { U = null; renderOut(); }
    });
  } catch(e) { console.error(e); }
}

async function subscribeProfileRealtime() {
  if (!sb || !U) return;
  const channel = sb.channel(`profile:${U.id}`);
  channel
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'profiles',
      filter: `id=eq.${U.id}`
    }, async (payload) => {
      // Cập nhật profile local
      U.profile = payload.new;
      // Làm mới UI
      renderIn();
      // Nếu đang ở trang challenge, cũng cập nhật các thành phần liên quan
      if (G('page-challenge').classList.contains('active')) {
        // Cập nhật thêm phần challenge nếu cần
        G('peloval').textContent = U.profile?.elo || 1200;
        // ...
      }
    })
    .subscribe();
}

// ── XỬ LÝ REDIRECT TỪ EMAIL LINK (PKCE + implicit) ──
async function handleEmailRedirect() {
  const qp   = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));

  // Lấy các param có thể có
  const code      = qp.get('code');           // PKCE flow (mặc định Supabase mới)
  const errorQ    = qp.get('error') || hash.get('error');
  const token     = hash.get('access_token'); // Implicit flow (cũ)
  const type      = hash.get('type') || qp.get('type');

  // Dọn URL ngay lập tức để tránh loop khi reload
  history.replaceState(null, '', window.location.pathname);

  // ── Trường hợp 1: Có lỗi (link hết hạn / đã dùng) ──
  if (errorQ) {
    console.warn('Email link error:', errorQ);
    openResetModal('expired');
    // Vẫn init session bình thường ở background
    _initNormalSession();
    return true;
  }

  // ── Trường hợp 2: PKCE – có ?code= trong URL ──
  if (code) {
    console.log('PKCE code detected, exchanging...');
    try {
      const { data, error } = await sb.auth.exchangeCodeForSession(code);
      if (error) throw error;
      U = data.session.user;
      await loadP();
      renderIn();
      openResetModal('form');
      // Lắng nghe các sự kiện tiếp theo
      _initNormalSession(true);
    } catch(e) {
      console.error('exchangeCodeForSession failed:', e);
      openResetModal('expired');
      _initNormalSession();
    }
    return true;
  }

  // ── Trường hợp 3: Implicit – có #access_token&type=recovery ──
  if (token && type === 'recovery') {
    console.log('Implicit recovery token detected');
    try {
      const { data, error } = await sb.auth.setSession({
        access_token:  token,
        refresh_token: hash.get('refresh_token') || '',
      });
      if (error) throw error;
      U = data.session.user;
      await loadP();
      renderIn();
      openResetModal('form');
      _initNormalSession(true);
    } catch(e) {
      console.error('setSession failed:', e);
      openResetModal('expired');
      _initNormalSession();
    }
    return true;
  }

  return false; // Không phải email redirect
}

// Khởi tạo onAuthStateChange bình thường (tách ra để dùng lại)
function _initNormalSession(skipSignInToast = false) {
  sb.auth.onAuthStateChange(async (ev, s) => {
    if (ev === 'SIGNED_IN' && s && !skipSignInToast) {
      U = s.user; await loadP(); renderIn(); closeM();
      toast('ok','✅ Đăng nhập thành công!');
    }
    else if (ev === 'SIGNED_OUT') { U = null; renderOut(); }
  });
}

// ── RESET MODAL HELPERS ──
function openResetModal(mode) {
  const ov = G('ov-reset');
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';

  G('reset-form-body').style.display  = mode === 'form'    ? 'block' : 'none';
  G('reset-success').style.display    = mode === 'success' ? 'block' : 'none';
  G('reset-expired').style.display    = mode === 'expired' ? 'block' : 'none';

  if (mode === 'form') {
    G('reset-subtitle').textContent = 'Đặt mật khẩu mới cho tài khoản';
    G('reset-pw').value = '';
    G('reset-pw-cf').value = '';
    clrA('a-reset');
    // Reset strength bars
    ['rs1','rs2','rs3','rs4'].forEach(id => { G(id).className = 'ps'; });
  }
}

function closeResetModal() {
  G('ov-reset').classList.remove('open');
  document.body.style.overflow = '';
}

// Click backdrop để đóng
G('ov-reset').addEventListener('click', function(e) { if (e.target === this) closeResetModal(); });

// ── ĐẶT MẬT KHẨU MỚI ──
async function doResetPw() {
  const pw = G('reset-pw').value;
  const cf = G('reset-pw-cf').value;
  clrA('a-reset');

  if (!pw || !cf) { alrt('a-reset','err','⚠️ Vui lòng điền đầy đủ thông tin'); return; }
  if (pw.length < 8) { alrt('a-reset','err','⚠️ Mật khẩu phải ít nhất 8 ký tự'); return; }
  if (pw !== cf)     { alrt('a-reset','err','⚠️ Mật khẩu xác nhận không khớp'); return; }
  if (!sb)           { alrt('a-reset','err','⚠️ Supabase chưa cấu hình'); return; }

  const btn = G('b-reset'); btn.disabled = true;
  btn.querySelector('.bt').style.display = 'none';
  btn.querySelector('.bl').style.display = 'inline-flex';
  try {
    const { error } = await sb.auth.updateUser({ password: pw });
    if (error) throw error;
    openResetModal('success');
    toast('ok','🔒 Mật khẩu mới đã được lưu!');
  } catch(e) {
    alrt('a-reset','err','❌ ' + (e.message || 'Lỗi không xác định'));
  } finally {
    btn.disabled = false;
    btn.querySelector('.bt').style.display = 'inline';
    btn.querySelector('.bl').style.display = 'none';
  }
}

// ── GỬI LẠI EMAIL KHI LINK HẾT HẠN ──
async function doResendReset() {
  const email = G('reset-email-retry').value.trim();
  clrA('a-reset-retry');

  if (!email) { alrt('a-reset-retry','err','⚠️ Vui lòng nhập email'); return; }
  if (!/\S+@\S+\.\S+/.test(email)) { alrt('a-reset-retry','err','⚠️ Email không hợp lệ'); return; }
  if (!sb) { alrt('a-reset-retry','err','⚠️ Supabase chưa cấu hình'); return; }

  const btn = G('b-reset-retry'); btn.disabled = true;
  btn.querySelector('.bt').style.display = 'none';
  btn.querySelector('.bl').style.display = 'inline-flex';
  try {
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (error) throw error;
    alrt('a-reset-retry','ok','✅ Email đã gửi! Vui lòng kiểm tra hộp thư.');
    G('b-reset-retry').style.display = 'none';
  } catch(e) {
    alrt('a-reset-retry','err','❌ ' + (e.message || 'Lỗi không xác định'));
  } finally {
    btn.disabled = false;
    btn.querySelector('.bt').style.display = 'inline';
    btn.querySelector('.bl').style.display = 'none';
  }
}

// ── LOGIN ──
async function doLogin() {
  const id = v('li'), pw = v('lp');
  clrA('al');
  if (!id||!pw) { alrt('al','err','⚠️ Vui lòng điền đầy đủ thông tin'); return; }
  if (!sb) { alrt('al','err','⚠️ Supabase chưa cấu hình'); return; }
  ld('bli', true);
  try {
    let email = id;
    if (!id.includes('@')) {
      const { data: p } = await sb.from('profiles').select('email').eq('username', id).single();
      if (!p) { alrt('al','err','❌ Không tìm thấy tài khoản'); return; }
      email = p.email;
    }
    const { error } = await sb.auth.signInWithPassword({ email, password: pw });
    if (error) throw error;
  } catch(e) {
    alrt('al','err', e.message?.includes('Invalid') ? '❌ Email/mật khẩu không đúng' : '❌ ' + (e.message||'Lỗi không xác định'));
  } finally { ld('bli', false); }
}

// ── REGISTER ──
async function doReg() {
  const fn=v('rn'), un=v('ru'), em=v('re'), pw=v('rp'), cf=v('rc');
  clrA('ar'); hide('ecf');
  if (!fn||!un||!em||!pw||!cf) { alrt('ar','err','⚠️ Vui lòng điền đầy đủ thông tin'); return; }
  if (pw !== cf) { show('ecf'); return; }
  if (pw.length < 8) { alrt('ar','err','⚠️ Mật khẩu phải ít nhất 8 ký tự'); return; }
  if (!/^[a-zA-Z0-9_]+$/.test(un)) { alrt('ar','err','⚠️ Tên đăng nhập chỉ chứa chữ, số, dấu _'); return; }
  if (!sb) { alrt('ar','err','⚠️ Supabase chưa cấu hình'); return; }
  ld('brg', true);
  try {
    // Đăng ký không cần xác thực email — đăng nhập luôn sau khi tạo tài khoản
    const { data: signUpData, error: signUpErr } = await sb.auth.signUp({
      email: em, password: pw,
      options: { data: { full_name: fn, username: un }, emailRedirectTo: null }
    });
    if (signUpErr) throw signUpErr;

    // Đăng nhập ngay lập tức (không chờ xác thực email)
    const { data: loginData, error: loginErr } = await sb.auth.signInWithPassword({ email: em, password: pw });
    if (loginErr) throw loginErr;

    const uid = loginData.user?.id || signUpData.user?.id;
    if (uid) await sb.from('profiles').upsert({ id: uid, username: un, full_name: fn, email: em, elo: 1200, created_at: new Date().toISOString() });

    closeM();
    toast('ok', '🎉 Đăng ký thành công! Chào mừng ' + fn.split(' ').pop());
  } catch(e) {
    alrt('ar','err', e.message?.includes('already') ? '❌ Email này đã được đăng ký' : '❌ ' + (e.message||'Lỗi không xác định'));
  } finally { ld('brg', false); }
}

async function doLogout() {
  if (!sb) return; await sb.auth.signOut(); toast('ok','👋 Đã đăng xuất');
}
async function loadP() {
  if (!sb||!U) return;
  try { const { data } = await sb.from('profiles').select('*').eq('id', U.id).single(); if (data) U.profile = data; } catch(e) {}
}

function submitAnswer(answer) {
  if (AR.answered) return;
  AR.answered = true;
  socket.emit('battle_action', {
    roomId: currentRoomId,
    answer: answer
  });
}


// ── RENDER ──
function renderIn() {
  joinGlobalPresence();
  const p = U?.profile;
  const name = p?.full_name || U?.email?.split('@')[0] || 'Người dùng';
  const un = p?.username || '';
  const ini = name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  const elo = p?.elo || 1200;
  const wins = p?.wins || 0;
  const rank = getRankFromElo(elo);


  // Nav avatar pill
  G('nav-r').innerHTML = `
    <div class="upill" tabindex="0">
      <div class="uav">${ini}</div>
      <span class="un">${name.split(' ').pop()}</span>
      <span class="chv">▾</span>
      <div class="dmenu">
        <a href="#" onclick="openProfile();return false">👤 Hồ Sơ</a>
        <a href="#">📊 Thống Kê</a>
        <a href="#">⚙️ Cài Đặt</a>
        <button class="lo" onclick="doLogout()">🚪 Đăng Xuất</button>
      </div>
    </div>`;

  // Challenge page states
  G('s-out').style.display = 'none';
  G('s-in').style.display = 'block';
  G('pname').textContent = name;
  G('pmeta').textContent = `@${un} · Electron`;
  G('pav').textContent = ini;
  G('peloval').textContent = elo;

  // Hero section toggle
  G('hero-logged-out').style.display = 'none';
  G('hero-logged-in').style.display = 'block';

  // Welcome banner
  G('wb-av').textContent = ini;
  G('wb-name').textContent = `Chào mừng, ${name.split(' ').pop()}! 👋`;
  G('wb-sub').textContent = `@${un} · Tiếp tục hành trình chinh phục Hóa học`;

  const wbStats = document.querySelectorAll('.wb-stat');
  if (wbStats.length >= 3) {
    wbStats[0].querySelector('.wb-stat-val').textContent = elo;
    wbStats[1].querySelector('.wb-stat-val').textContent = wins;
    wbStats[2].querySelector('.wb-stat-val').textContent = rank;
  }

  // Subscribe to friend invites
  subscribeToInvites();
      // ... existing code ...
    if (socket && socket.connected) {
        socket.disconnect();
    }
    socket = io();
    socket.on('connect', () => {
        // Send presence info
        socket.emit('presence:join', {
            userId: U.id,
            full_name: U.profile?.full_name || U.email?.split('@')[0],
            username: U.profile?.username || '',
            elo: U.profile?.elo || 1200,
            wins: U.profile?.wins || 0,
            losses: U.profile?.losses || 0,
        });
    });
    // Listen for presence updates
    socket.on('presence_list', (users) => {
      ONLINE_USERS = {};
      users.forEach(u => ONLINE_USERS[u.userId] = u);
      updateOnlineCount();
      refreshOnlineUI();
    });
    socket.on('answer_result', (data) => {
      const fb = G('battle-feedback');
      fb.classList.add('battle-feedback-animate');
      setTimeout(() => fb.classList.remove('battle-feedback-animate'), 400);

      if (data.correct) {
        G('cooldown-overlay').style.display = 'none';
        fb.textContent = `✅ Chính xác! ${data.explanation || ''}`;
        fb.style.background = 'var(--green-lt)';
        fb.style.color = 'var(--green)';
        AR.questionFinished = true;
        AR.waitingResponse = false;
        disableBattleInputs(true);   // vô hiệu hóa vĩnh viễn cho câu này
        if (AR.cooldownTimer) clearTimeout(AR.cooldownTimer);
        AR.answerCooldown = false;
        G('cooldown-indicator').style.display = 'none';
      } else {
        fb.textContent = `❌ Sai rồi!`;
        fb.style.background = 'var(--rose-lt)';
        fb.style.color = 'var(--rose)';

        if (!AR.questionFinished) {
          AR.waitingResponse = false;
          AR.answerCooldown = true;
          disableBattleInputs(true);   // vô hiệu hóa tạm thời

          if (AR.cooldownInterval) clearInterval(AR.cooldownInterval);

          showCooldownOverlay(3, () => {
            if (!AR.questionFinished) {
              AR.answerCooldown = false;
              disableBattleInputs(false); // kích hoạt lại
              const fb = G('battle-feedback');
              fb.textContent = `⌛ Hết thời gian chờ, bạn có thể trả lời lại.`;
              fb.style.background = 'var(--amber-lt)';
              fb.style.color = 'var(--amber)';
              fb.style.display = 'block';
              setTimeout(() => {
                if (fb.style.display === 'block') fb.style.display = 'none';
              }, 2000);
            }
            AR.cooldownInterval = null;
          });
        }
      }
      fb.style.display = 'block';
      setTimeout(() => {
        if (fb.style.display === 'block' && !fb.textContent.includes('Hết thời gian chờ')) {
          fb.style.display = 'none';
        }
      }, 2000);
    });
    socket.on('presence_update', (users) => {
      ONLINE_USERS = {};
      users.forEach(u => ONLINE_USERS[u.userId] = u);
      updateOnlineCount();
      refreshOnlineUI();
    });

    // Listen for match found
    socket.on('match_found', (data) => {
      // data: { roomId, role, opponent: { userId, full_name, username, elo, wins, losses } }
      G('ov-friend').classList.remove('open');
      G('friend-waiting').style.display = 'none';
      G('friend-selected').style.display = 'none';
      G('ov-invite').classList.remove('open');
      clearTimeout(AR.waitTimer);
      currentRoomId = data.roomId;
      AR.roomId = data.roomId;
      AR.role = data.role;
      AR.oppId = data.opponent.userId;
      AR.oppProfile = data.opponent;

      // Tham gia phòng qua socket (để server biết)
      socket.emit('join_room', { roomId: data.roomId });
      const overlay = document.getElementById('cooldown-overlay');
      if (overlay) overlay.style.display = 'none';   // ← thêm dòng này
      if (AR.waitTimer) clearInterval(AR.waitTimer);   // ← thêm dòng này
      // Chuyển sang giao diện phòng chờ (lobby)
      enterLobby();
    });
    // Lobby events
    socket.on('lobby_start', (data) => {
      AR.lobbySec = data.timeout;
      startLobbyCountdown(data.timeout);
    });
    socket.on('lobby_update', (data) => {
      // data.playerReady[userId] = true/false
      const oppId = AR.oppId;
      AR.oppReady = data.playerReady[oppId] || false;
      updateOppReadyUI(); // cập nhật giao diện
      if (AR.ready && AR.oppReady) {
        // Cả hai đã sẵn sàng, server sẽ tự động chuyển sang battle
        // (không cần làm gì thêm, server sẽ gửi battle_question)
      }
    });
    // Battle events
    socket.on('battle_question', (data) => {
      renderBattleQuestion(data);
    });
    socket.on('battle_update', (data) => {
      // Cập nhật điểm số từ server
      const myId = U.id;
      const oppId = AR.oppId;
      AR.myScore = data.scores[myId] || 0;
      AR.oppScore = data.scores[oppId] || 0;
      updateBattleScore();

      // Nếu đối thủ trả lời đúng và mình chưa trả lời
      if (data.correct && data.playerAnsweredUserId !== U.id) {

        AR.questionFinished = true;
        disableBattleInputs(true);
        if (AR.cooldownTimer) {
          clearTimeout(AR.cooldownTimer);
          AR.cooldownTimer = null;
        }
        AR.answerCooldown = false;
        G('cooldown-indicator').style.display = 'none';

        G('battle-feedback').textContent = `⚡ Đối thủ đã trả lời đúng!`;
        G('battle-feedback').style.display = 'block';
        setTimeout(() => {
          if (G('battle-feedback').style.display === 'block')
            G('battle-feedback').style.display = 'none';
        }, 2000);
        if (AR.cooldownInterval) clearInterval(AR.cooldownInterval);
        G('cooldown-overlay').style.display = 'none';
      }
    });
    socket.on('battle_result', (data) => {
        console.log('🔍 battle_result received:', data);
        endBattle(data);
    });
    socket.on('disconnect', () => {
      toast('err', 'Mất kết nối đến máy chủ');
      closeArena();
    });

    socket.on('opponent_left', () => {
      toast('err', 'Đối thủ đã thoát trận');
      closeArena();
    });


    // Invite events
    socket.on('invite_received', (data) => {
      // data: { roomId, from: { userId, full_name, username, elo, wins, losses } }
      AR.inviteFrom = data.from;
      AR.inviteRoomId = data.roomId;
      G('inv-from-name').innerText = data.from.full_name;
      G('inv-from-elo').innerHTML = `⚡ ELO: ${data.from.elo}`;
      G('ov-invite').classList.add('open');
    });
    // Error handling
    socket.on('error', (err) => {
      toast('err', err.msg || 'Có lỗi xảy ra');
    });

}

function renderOut() {
  if (socket) socket.disconnect();
  leaveGlobalPresence();
  G('nav-r').innerHTML = `
    <button class="btn btn-ghost" onclick="openM('login')">Đăng Nhập</button>
    <button class="btn btn-teal"  onclick="openM('register')">Đăng Ký</button>`;
  G('s-out').style.display = 'block';
  G('s-in').style.display = 'none';
  G('hero-logged-out').style.display = 'block';
  G('hero-logged-in').style.display = 'none';
}



function showCooldownOverlay(seconds, onComplete) {
  const overlay = document.getElementById('cooldown-overlay');
  const circle = document.getElementById('cooldown-circle');
  const secSpan = document.getElementById('cooldown-seconds-big');
  if (!overlay || !circle || !secSpan) return;

  // Clear any existing interval to avoid duplicates
  if (AR.cooldownInterval) clearInterval(AR.cooldownInterval);

  const circumference = 2 * Math.PI * 45; // ~282.6
  let remaining = seconds;

  // Reset circle
  circle.style.transition = 'none';
  circle.style.strokeDashoffset = '0';
  circle.getBoundingClientRect(); // force reflow
  circle.style.transition = 'stroke-dashoffset 1s linear';

  secSpan.textContent = remaining;
  overlay.style.display = 'flex';

  const startTime = Date.now();
  AR.cooldownInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    remaining = Math.max(0, seconds - elapsed);
    secSpan.textContent = Math.ceil(remaining);

    const percent = (seconds - remaining) / seconds;
    const dashoffset = circumference * percent;
    circle.style.strokeDashoffset = dashoffset;

    if (remaining <= 0) {
      clearInterval(AR.cooldownInterval);
      AR.cooldownInterval = null;
      overlay.style.display = 'none';
      if (onComplete) onComplete();
    }
  }, 100);
}

function disableBattleInputs(disable) {
  const isMcq = AR.currentQuestion?.type === 'mcq' || AR.currentQuestion?.t === 'mcq';
  if (isMcq) {
    document.querySelectorAll('.mcq-btn').forEach(btn => btn.disabled = disable);
  } else {
    const inp = G('battle-ans-inp');
    if (inp) inp.disabled = disable;
    const btn = G('submit-ans-btn');
    if (btn) btn.disabled = disable;
  }
}

let searchTimeout;
function searchFriendsDebounced(query) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => searchFriends(query), 300);
}


function getCorrectAnswerStr(data) {
  if (data.opts && data.opts.length && typeof data.correctAnswer === 'number') {
    const letters = ['A', 'B', 'C', 'D'];
    return `${letters[data.correctAnswer]}. ${data.opts[data.correctAnswer]}`;
  }
  return data.correctAnswer;
}

// ── MODAL ──
function openM(tab) {
  G('ov').classList.add('open');
  swTab(tab || 'login');
  document.body.style.overflow = 'hidden';
}
function closeM() {
  G('ov').classList.remove('open');
  document.body.style.overflow = '';
}
function swTab(t) {
  G('fl').style.display  = t==='login'    ? 'block' : 'none';
  G('fr').style.display  = t==='register' ? 'block' : 'none';
  G('ffp').style.display = t==='forgot'   ? 'block' : 'none';
  G('tl').className = 'mt-tab' + (t==='login'    ? ' active' : '');
  G('tr').className = 'mt-tab' + (t==='register' ? ' active' : '');
  // Reset forgot form when switching away
  if (t !== 'forgot') { clrA('afp'); }
  if (t === 'forgot') {
    G('fp-ok').style.display = 'none';
    G('fp-form-body').style.display = 'block';
    clrA('afp');
    if (G('fpe')) G('fpe').value = '';
  }
  clrA('al'); clrA('ar');
}

// ── FORGOT PASSWORD ──
async function doForgotPw() {
  const email = G('fpe').value.trim();
  clrA('afp');
  if (!email) { alrt('afp','err','⚠️ Vui lòng nhập địa chỉ email'); return; }
  if (!/\S+@\S+\.\S+/.test(email)) { alrt('afp','err','⚠️ Email không hợp lệ'); return; }
  if (!sb) { alrt('afp','err','⚠️ Supabase chưa cấu hình'); return; }
  const btn = G('bfp'); btn.disabled = true;
  btn.querySelector('.bt').style.display = 'none';
  btn.querySelector('.bl').style.display = 'inline-flex';
  try {
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (error) throw error;
    G('fp-form-body').style.display = 'none';
    G('fp-ok').style.display = 'block';
  } catch(e) {
    alrt('afp','err','❌ ' + (e.message || 'Lỗi không xác định'));
  } finally {
    btn.disabled = false;
    btn.querySelector('.bt').style.display = 'inline';
    btn.querySelector('.bl').style.display = 'none';
  }
}

G('ov').addEventListener('click', function(e) { if (e.target === this) closeM(); });
G('mcl').addEventListener('click', function(e) { e.stopPropagation(); closeM(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeM(); });

// ── HELPERS ──
function G(id) { return document.getElementById(id); }
function v(id)  { return G(id).value.trim(); }
function show(id) { G(id).classList.add('show'); }
function hide(id) { G(id).classList.remove('show'); }
function alrt(id, type, msg) { const e = G(id); e.textContent = msg; e.className = 'abox ' + type; }
function clrA(id) { const e = G(id); e.className = 'abox'; e.textContent = ''; }
function ld(bid, on) {
  const b = G(bid); b.disabled = on;
  b.querySelector('.bt').style.display = on ? 'none' : 'inline';
  b.querySelector('.bl').style.display = on ? 'inline-flex' : 'none';
}
function eye(id, btn) {
  const i = G(id); i.type = i.type==='password' ? 'text' : 'password';
  btn.textContent = i.type==='password' ? '👁' : '🙈';
}
function pws(pw) {
  let s = 0;
  if (pw.length >= 8) s++; if (/[A-Z]/.test(pw)) s++; if (/[0-9]/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++;
  const c = s<=2?'weak':s===3?'medium':'strong';
  ['s1','s2','s3','s4'].forEach((id,i) => { if(G(id)) G(id).className = 'ps' + (i<s ? ' '+c : ''); });
  // Cũng update thanh strength trong reset modal nếu đang mở
  ['rs1','rs2','rs3','rs4'].forEach((id,i) => { if(G(id)) G(id).className = 'ps' + (i<s ? ' '+c : ''); });
}
function toast(type, msg) {
  const d = document.createElement('div');
  d.className = `toast ${type}`;
  d.innerHTML = `<span>${type==='ok'?'✅':'❌'}</span><span>${msg}</span>`;
  G('tw').appendChild(d); setTimeout(() => d.remove(), 3200);
}
function gp(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  G('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const m = {home:'nl-home', challenge:'nl-challenge'};
  if (m[id]) G(m[id])?.classList.add('active');

  // Nếu chuyển về trang chủ và đã đăng nhập, làm mới dữ liệu
  if (id === 'home' && U) {
    renderIn();
  }
}

// ══ PROFILE PAGE ══
function openProfile() {
  gp('profile');
  loadProfileFields();
  swPTab('info');
}

function swPTab(t) {
  ['info','sec'].forEach(id => {
    G('pc-' + id).classList.toggle('active', id === t);
    G('pt-' + id).classList.toggle('active', id === t);
  });
  // Clear alerts when switching
  setPA('info-alert','',''); setPA('sec-alert','','');
}

function loadProfileFields() {
  const p = U?.profile;
  const name = p?.full_name || U?.email?.split('@')[0] || '';
  const un   = p?.username  || '';
  const email= p?.email     || U?.email || '';
  const dob  = p?.date_of_birth || '';
  const ini  = name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2) || '?';

  // Header
  G('ph-av').textContent   = ini;
  G('ph-name').textContent = name || 'Người dùng';
  G('ph-un').textContent   = un ? `@${un}` : '';

  // Fields
  G('p-fullname').value = name;
  G('p-username').value = un;
  G('p-email').value    = email;
  G('p-dob').value      = dob;

  setPA('info-alert','','');
}

function setPA(id, type, msg) {
  const e = G(id);
  if (!e) return;
  e.textContent = msg;
  e.className = 'pf-abox' + (type ? ' '+type : '');
}

async function saveInfo() {
  if (!sb || !U) return;
  const fn = G('p-fullname').value.trim();
  const un = G('p-username').value.trim();
  const dob= G('p-dob').value;
  setPA('info-alert','','');

  if (!fn) { setPA('info-alert','err','⚠️ Họ và tên không được để trống'); return; }
  if (!un) { setPA('info-alert','err','⚠️ Tên đăng nhập không được để trống'); return; }
  if (!/^[a-zA-Z0-9_]+$/.test(un)) { setPA('info-alert','err','⚠️ Tên đăng nhập chỉ chứa chữ, số, dấu _'); return; }

  const btn = G('p-save-info'); btn.disabled = true;
  G('p-save-info-txt').textContent = '⏳ Đang lưu...';
  try {
    const upd = { full_name: fn, username: un };
    if (dob) upd.date_of_birth = dob;
    const { error } = await sb.from('profiles').update(upd).eq('id', U.id);
    if (error) throw error;
    // Refresh local profile
    if (!U.profile) U.profile = {};
    U.profile.full_name = fn; U.profile.username = un;
    if (dob) U.profile.date_of_birth = dob;
    setPA('info-alert','ok','✅ Lưu thành công!');
    toast('ok','✅ Cập nhật hồ sơ thành công!');
    // Update header displays
    renderIn();
    loadProfileFields();
  } catch(e) {
    setPA('info-alert','err','❌ ' + (e.message||'Lỗi không xác định'));
  } finally {
    btn.disabled = false;
    G('p-save-info-txt').textContent = '💾 Lưu thay đổi';
  }
}

function ppws(pw) {
  let s=0;
  if(pw.length>=8)s++;if(/[A-Z]/.test(pw))s++;if(/[0-9]/.test(pw))s++;if(/[^A-Za-z0-9]/.test(pw))s++;
  const c=s<=2?'weak':s===3?'medium':'strong';
  ['pp1','pp2','pp3','pp4'].forEach((id,i)=>{G(id).className='pps'+(i<s?' '+c:'')});
}

function peye(id, btn) {
  const i=G(id); i.type=i.type==='password'?'text':'password';
  btn.textContent=i.type==='password'?'👁':'🙈';
}

function clearPwForm() {
  ['p-pw-cur','p-pw-new','p-pw-cf'].forEach(id=>{ G(id).value=''; });
  ['pp1','pp2','pp3','pp4'].forEach(id=>{ G(id).className='pps'; });
  setPA('sec-alert','','');
}

// ── PROFILE FORGOT PASSWORD MODAL ──
function openForgotFromProfile() {
  const email = U?.profile?.email || U?.email || '';
  G('pfp-email-display').textContent = email;
  G('pfp-sent-email').textContent    = email;
  // Reset về trạng thái ban đầu
  G('pfp-body').style.display    = 'block';
  G('pfp-success').style.display = 'none';
  clrA('a-pfp');
  G('b-pfp').disabled = false;
  G('b-pfp').querySelector('.bt').style.display = 'inline';
  G('b-pfp').querySelector('.bl').style.display = 'none';
  // Mở modal
  G('ov-pfp').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePFP() {
  G('ov-pfp').classList.remove('open');
  document.body.style.overflow = '';
}

G('ov-pfp').addEventListener('click', function(e) { if (e.target === this) closePFP(); });

async function doSendProfileReset() {
  const email = U?.profile?.email || U?.email || '';
  if (!email) { alrt('a-pfp','err','⚠️ Không tìm thấy email tài khoản'); return; }
  if (!sb)    { alrt('a-pfp','err','⚠️ Supabase chưa cấu hình'); return; }

  const btn = G('b-pfp'); btn.disabled = true;
  btn.querySelector('.bt').style.display = 'none';
  btn.querySelector('.bl').style.display = 'inline-flex';
  clrA('a-pfp');
  try {
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (error) throw error;
    G('pfp-body').style.display    = 'none';
    G('pfp-success').style.display = 'block';
  } catch(e) {
    alrt('a-pfp','err','❌ ' + (e.message || 'Lỗi không xác định'));
    btn.disabled = false;
    btn.querySelector('.bt').style.display = 'inline';
    btn.querySelector('.bl').style.display = 'none';
  }
}

async function savePw() {
  if (!sb || !U) return;
  const cur = G('p-pw-cur').value;
  const nw  = G('p-pw-new').value;
  const cf  = G('p-pw-cf').value;
  setPA('sec-alert','','');

  if (!cur||!nw||!cf) { setPA('sec-alert','err','⚠️ Vui lòng điền đầy đủ thông tin'); return; }
  if (nw.length < 8)  { setPA('sec-alert','err','⚠️ Mật khẩu mới phải ít nhất 8 ký tự'); return; }
  if (nw !== cf)      { setPA('sec-alert','err','⚠️ Mật khẩu xác nhận không khớp'); return; }

  const btn = G('p-save-pw'); btn.disabled = true;
  G('p-save-pw-txt').textContent = '⏳ Đang xử lý...';
  try {
    // Re-authenticate first
    const email = U.profile?.email || U.email;
    const { error: reErr } = await sb.auth.signInWithPassword({ email, password: cur });
    if (reErr) { setPA('sec-alert','err','❌ Mật khẩu hiện tại không đúng'); return; }

    const { error } = await sb.auth.updateUser({ password: nw });
    if (error) throw error;
    setPA('sec-alert','ok','✅ Đổi mật khẩu thành công!');
    toast('ok','🔒 Mật khẩu đã được cập nhật!');
    clearPwForm();
  } catch(e) {
    setPA('sec-alert','err','❌ ' + (e.message||'Lỗi không xác định'));
  } finally {
    btn.disabled = false;
    G('p-save-pw-txt').textContent = '🔒 Đổi Mật Khẩu';
  }
}

// ══════════════════════════════════════════════════════
//   GLORYCHEM ARENA — QUESTION BANK
// ══════════════════════════════════════════════════════
const TOPICS = [
  {id:'acid-base', name:'Axit — Bazơ', icon:'⚗️'},
  {id:'redox',     name:'Oxi hóa khử', icon:'⚡'},
  {id:'electro',   name:'Điện hóa',    icon:'🔋'},
  {id:'organic',   name:'Hóa hữu cơ',  icon:'🌿'},
  {id:'periodic',  name:'Bảng tuần hoàn', icon:'📋'},
  {id:'solution',  name:'Dung dịch',   icon:'💧'},
  {id:'thermo',    name:'Nhiệt hóa học',icon:'🔥'},
  {id:'equilib',   name:'Cân bằng hóa học',icon:'⚖️'},
];

const QUESTION_BANK = {
  'acid-base':[
    {t:'mcq',q:'Dung dịch HCl 0.01M có pH bằng bao nhiêu?',opts:['pH = 1','pH = 2','pH = 3','pH = 12'],ans:1,exp:'[HCl]=0.01M → [H⁺]=0.01 → pH=-log(0.01)=2'},
    {t:'num',q:'Tính pH của dung dịch NaOH 0.001M (pOH trước, rồi pH = 14 - pOH)',ans:'11',exp:'pOH=3 → pH=11'},
    {t:'mcq',q:'Chất nào sau đây là axit mạnh?',opts:['CH₃COOH','HF','HNO₃','H₂CO₃'],ans:2,exp:'HNO₃ là axit mạnh, phân li hoàn toàn trong nước'},
    {t:'num',q:'Trộn 100ml HCl 0.2M với 100ml NaOH 0.1M. pH của dung dịch thu được (làm tròn nguyên)?',ans:'1',exp:'nHCl=0.02, nNaOH=0.01 → dư 0.01mol HCl/200ml → [H+]=0.05M → pH≈1.3 ≈ 1'},
    {t:'mcq',q:'Ion nào làm cho dung dịch có môi trường bazơ?',opts:['NH₄⁺','Al³⁺','CO₃²⁻','Fe³⁺'],ans:2,exp:'CO₃²⁻ thủy phân tạo OH⁻ → môi trường bazơ'},
    {t:'mcq',q:'Giá trị pH của máu người bình thường là?',opts:['6.8 – 7.0','7.35 – 7.45','7.8 – 8.0','6.0 – 6.5'],ans:1,exp:'pH máu bình thường: 7.35 – 7.45'},
  ],
  'redox':[
    {t:'mcq',q:'Trong phản ứng: Fe + CuSO₄ → FeSO₄ + Cu. Chất nào bị oxi hóa?',opts:['Fe','CuSO₄','FeSO₄','Cu'],ans:0,exp:'Fe → Fe²⁺ (mất electron) → Fe bị oxi hóa'},
    {t:'num',q:'Số oxi hóa của Mn trong KMnO₄ là? (nhập số nguyên dương)',ans:'7',exp:'K(+1)+Mn(x)+4O(-2)=0 → x=+7'},
    {t:'mcq',q:'Chất khử là chất:',opts:['Nhận electron','Cho electron','Nhận proton','Cho proton'],ans:1,exp:'Chất khử là chất nhường/cho electron'},
    {t:'num',q:'Số oxi hóa của S trong H₂SO₄?',ans:'6',exp:'2(+1)+S+4(-2)=0 → S=+6'},
    {t:'mcq',q:'Phản ứng nào sau đây là phản ứng oxi hóa khử?',opts:['NaCl + AgNO₃','CaCO₃ nhiệt phân','Zn + H₂SO₄ loãng','NaOH + HCl'],ans:2,exp:'Zn → Zn²⁺ + 2e⁻ (oxi hóa); 2H⁺ + 2e⁻ → H₂ (khử)'},
  ],
  'electro':[
    {t:'mcq',q:'Suất điện động của pin Daniell (Zn-Cu) ở điều kiện chuẩn là bao nhiêu?',opts:['0.76 V','1.10 V','1.46 V','0.34 V'],ans:1,exp:'E°cell = E°Cu - E°Zn = 0.34 - (-0.76) = 1.10 V'},
    {t:'num',q:'Điện cực nào là cực âm (anot) trong pin điện hóa? Nhập 1=anot, 2=catot',ans:'1',exp:'Cực âm = anot = xảy ra oxi hóa'},
    {t:'mcq',q:'Trong điện phân dung dịch CuSO₄, tại catot xảy ra:',opts:['Cu²⁺ + 2e⁻ → Cu','Cu → Cu²⁺ + 2e⁻','2H₂O → O₂ + 4H⁺ + 4e⁻','SO₄²⁻ bị oxi hóa'],ans:0,exp:'Catot: Cu²⁺ + 2e⁻ → Cu (khử)'},
  ],
  'organic':[
    {t:'mcq',q:'Công thức phân tử của metan là?',opts:['C₂H₆','CH₄','C₃H₈','C₂H₄'],ans:1,exp:'Metan = CH₄, hydrocacbon no đơn giản nhất'},
    {t:'num',q:'Etilen (C₂H₄) có bao nhiêu liên kết đôi C=C?',ans:'1',exp:'Etilen: CH₂=CH₂ → 1 liên kết đôi C=C'},
    {t:'mcq',q:'Phản ứng đặc trưng của ankan là?',opts:['Cộng hợp','Thế halogen','Trùng hợp','Tách nước'],ans:1,exp:'Ankan có liên kết đơn bền → đặc trưng là phản ứng thế (halogen hóa)'},
    {t:'mcq',q:'Glucozơ (C₆H₁₂O₆) thuộc loại hợp chất nào?',opts:['Lipit','Protein','Cacbohidrat','Axit amin'],ans:2,exp:'Glucozơ là monosaccarit thuộc nhóm cacbohidrat'},
    {t:'num',q:'Số nguyên tử C trong phân tử benzen (C₆H₆)?',ans:'6',exp:'Benzen: C₆H₆ → 6 nguyên tử cacbon'},
  ],
  'periodic':[
    {t:'num',q:'Nguyên tố nào có số hiệu nguyên tử Z = 26? Nhập số nguyên tử proton của Fe',ans:'26',exp:'Z=26 là Fe (Sắt)'},
    {t:'mcq',q:'Nhóm IA của bảng tuần hoàn còn được gọi là:',opts:['Halogen','Kim loại kiềm','Kim loại kiềm thổ','Khí hiếm'],ans:1,exp:'Nhóm IA = kim loại kiềm: Li, Na, K, Rb, Cs, Fr'},
    {t:'num',q:'Chu kì 2 của bảng tuần hoàn có bao nhiêu nguyên tố?',ans:'8',exp:'Chu kì 2: Li → Ne = 8 nguyên tố'},
    {t:'mcq',q:'Trong một chu kì, tính kim loại biến đổi theo chiều nào?',opts:['Tăng từ trái qua phải','Giảm từ trái qua phải','Không đổi','Biến đổi bất thường'],ans:1,exp:'Trong chu kì: tính kim loại giảm dần từ trái → phải'},
  ],
  'solution':[
    {t:'num',q:'Độ tan của NaCl trong 100g nước ở 20°C là khoảng bao nhiêu gam? (làm tròn đến chục)',ans:'36',exp:'NaCl có độ tan ≈ 36g/100g nước ở 20°C'},
    {t:'mcq',q:'Dung dịch bão hòa là dung dịch:',opts:['Có thể hòa tan thêm chất tan','Không thể hòa tan thêm chất tan','Không có chất tan','Có nồng độ mol/L = 1'],ans:1,exp:'Dung dịch bão hòa đã đạt giới hạn hòa tan của chất tan'},
    {t:'mcq',q:'Nồng độ mol/L (C_M) được tính bằng:',opts:['m/V','n/V(L)','m/m_dm','n/m'],ans:1,exp:'C_M = n(mol) / V(lít)'},
  ],
  'thermo':[
    {t:'mcq',q:'Phản ứng tỏa nhiệt có ΔH:',opts:['ΔH > 0','ΔH < 0','ΔH = 0','ΔH không xác định'],ans:1,exp:'Phản ứng tỏa nhiệt: ΔH < 0 (hệ tỏa năng lượng ra môi trường)'},
    {t:'num',q:'Nhiệt đốt cháy của C thành CO₂ là -394 kJ/mol. Đốt 12g C sinh ra bao nhiêu kJ? (số nguyên)',ans:'394',exp:'12g C = 1mol → tỏa 394 kJ'},
  ],
  'equilib':[
    {t:'mcq',q:'Nguyên lý Le Chatelier phát biểu về:',opts:['Tốc độ phản ứng','Chiều dịch chuyển cân bằng khi bị tác động','Năng lượng hoạt hóa','Trật tự phản ứng'],ans:1,exp:'Le Chatelier: khi cân bằng bị phá vỡ, hệ tự điều chỉnh để chống lại sự thay đổi đó'},
    {t:'mcq',q:'Tăng nồng độ chất phản ứng sẽ làm cân bằng:',opts:['Dịch chuyển sang trái','Dịch chuyển sang phải','Không thay đổi','Phụ thuộc nhiệt độ'],ans:1,exp:'Tăng nồng độ chất đầu → cân bằng chuyển sang phải (tạo thêm sản phẩm)'},
  ],
};

// ══════════════════════════════════════════════════════
//   ARENA STATE
// ══════════════════════════════════════════════════════
let AR = {
  roomId: null, channel: null, presenceChannel: null,
  role: null,     // 'host' | 'guest'
  oppId: null, oppProfile: null,
  selectedTopics: [], ready: false,
  oppReady: false, oppTopics: [],
  lobbyTimer: null, lobbySec: 30,
  questions: [], qIndex: 0,
  myScore: 0, oppScore: 0,
  battleTimer: null, battleSec: 60,
  answered: false,   // đã trả lời câu hiện tại chưa
  oppAnswered: false,
  waitTimer: null, waitSec: 0,
  inviteFrom: null, inviteRoomId: null,
  waitingResponse: false,   // đang chờ phản hồi từ server
  questionFinished: false,  // câu hỏi đã kết thúc (do ai đó đúng hoặc hết giờ)
  answerCooldown: false,    // whether player is currently frozen
  cooldownTimer: null,      // setTimeout handle for unfreeze
  cooldownInterval: null,
};

// ── HELPERS ──
function showArena(step) {
  ['ar-searching','ar-lobby','ar-battle','ar-result'].forEach(id=>{
    const el = G(id);
    el.style.display = 'none';
    el.style.flexDirection = '';
  });
  G('arena-overlay').style.display = 'block';
  document.body.style.overflow = 'hidden';
  const el = G('ar-'+step);
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
}

function closeArena() {
  G('arena-overlay').style.display = 'none';
  document.body.style.overflow = '';
  cleanupRoom();
}

function cleanupRoom() {
  if (AR.lobbyTimer) clearInterval(AR.lobbyTimer);
  if (AR.battleTimer) clearInterval(AR.battleTimer);
  if (AR.cooldownTimer) clearTimeout(AR.cooldownTimer);
  if (AR.waitTimer) clearInterval(AR.waitTimer);   // ← thêm dòng này
  AR.waitTimer = null;

  AR = {
    roomId: null,
    channel: null,
    presenceChannel: null,
    role: null,
    oppId: null,
    oppProfile: null,
    selectedTopics: [],
    ready: false,
    oppReady: false,
    oppTopics: [],
    lobbyTimer: null,
    lobbySec: 30,
    questions: [],
    qIndex: 0,
    myScore: 0,
    oppScore: 0,
    battleTimer: null,
    battleSec: 60,
    answered: false,
    oppAnswered: false,
    waitTimer: null,
    waitSec: 0,
    inviteFrom: null,
    inviteRoomId: null,
    waitingResponse: false,
    questionFinished: false,
    answerCooldown: false,
    cooldownTimer: null,
    currentQuestion: null,
    currentIndex: 0,
    totalQuestions: 0
  };
  currentRoomId = null;

  // Ẩn overlay cooldown (nếu có)
  const overlay = document.getElementById('cooldown-overlay');
  if (overlay) overlay.style.display = 'none';
  if (AR.cooldownInterval) clearInterval(AR.cooldownInterval);
}

function getMyInfo() {
  const p = U?.profile;
  return {
    id: U?.id,
    name: p?.full_name || U?.email?.split('@')[0] || 'Bạn',
    username: p?.username || '',
    elo: p?.elo || 1200,
    wins: p?.wins || 0,
    losses: p?.losses || 0,
  };
}

function mkIni(name) {
  return name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2) || '?';
}

// ── BUILD QUESTION SET FROM TOPICS ──
function buildQuestions(topics) {
  const pool = [];
  topics.forEach(tid => {
    const qs = QUESTION_BANK[tid] || [];
    pool.push(...qs);
  });
  // Shuffle & take 10
  for (let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0, 10);
}


function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ══════════════════════════════════════════════════════
//   QUICK MATCH — SUPABASE REALTIME
// ══════════════════════════════════════════════════════
function startQuickMatch() {
  if (!U) { openM('login'); return; }
  cleanupRoom();

  // === BẮT ĐẦU ĐẾM THỜI GIAN CHỜ ===
  if (AR.waitTimer) clearInterval(AR.waitTimer);
  AR.waitSec = 0;
  const waitEl = document.getElementById('ar-wait-time');
  if (waitEl) waitEl.textContent = 'Đã chờ: 0 giây';
  AR.waitTimer = setInterval(() => {
    AR.waitSec++;
    const el = document.getElementById('ar-wait-time');
    if (el) el.textContent = `Đã chờ: ${AR.waitSec} giây`;
  }, 1000);
  // === KẾT THÚC ===

  const overlay = document.getElementById('cooldown-overlay');
  if (overlay) overlay.style.display = 'none';
  showArena('searching');
  socket.emit('join_queue');
}


function cancelSearch() {
  if (AR.roomId) socket.emit('cancel_queue');
  if (AR.waitTimer) clearInterval(AR.waitTimer);   // ← thêm dòng này
  closeArena();
}
// ── SUBSCRIBE TO ROOM — broadcast + presence realtime ──
function subscribeToRoom(roomId) {
  AR.channel = sb.channel('room:' + roomId, {
    config: { broadcast: { self: false }, presence: { key: U.id } }
  })
  .on('postgres_changes', {
    event: 'UPDATE', schema: 'public', table: 'battle_rooms', filter: `id=eq.${roomId}`
  }, handleRoomUpdate)
  .on('broadcast', { event: 'lobby_action' }, ({ payload }) => handleLobbyAction(payload))
  .on('broadcast', { event: 'battle_action' }, ({ payload }) => handleBattleAction(payload))
  .on('presence', { event: 'join' }, async ({ newPresences }) => {
    for (const p of newPresences) {
      if (!p.userId || p.userId === U.id) continue;
      if (AR.role === 'host' && p.role === 'guest' && !G('ar-lobby').style.display.includes('flex')) {
        const { data: gp } = await sb.from('profiles').select('*').eq('id', p.userId).single();
        AR.oppId = p.userId;
        AR.oppProfile = gp;
        await sb.from('battle_rooms').update({ guest_id: p.userId, status: 'lobby' }).eq('id', roomId);
        enterLobby();
      }
    }
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await AR.channel.track({ userId: U.id, role: AR.role });
      if (AR.role === 'guest') {
        // Broadcast guest_joined để host biết ngay lập tức (song song với presence)
        await AR.channel.send({
          type: 'broadcast', event: 'lobby_action',
          payload: { type: 'guest_joined', userId: U.id }
        });
        enterLobby();
      }
    }
  });
}

async function handleRoomUpdate(payload) {
  const room = payload.new;
  // Fallback: host vào lobby qua postgres_changes nếu presence chưa kịp trigger
  if (room.status === 'lobby' && AR.role === 'host' && !G('ar-lobby').style.display.includes('flex')) {
    if (!AR.oppProfile && room.guest_id) {
      const { data: gp } = await sb.from('profiles').select('*').eq('id', room.guest_id).single();
      AR.oppId = room.guest_id;
      AR.oppProfile = gp;
    }
    if (AR.oppProfile) enterLobby();
  }
  if (room.status === 'battle') {
    if (!G('ar-battle').style.display.includes('flex')) startBattle(room.questions);
  }
}



function startLobbyCountdown(seconds) {

  if (!seconds || isNaN(seconds)) seconds = 30;

  let time = seconds;
  const el = G('lobby-countdown');
  if (!el) return;
  el.innerText = time;

  const interval = setInterval(() => {
    time--;
    el.innerText = time;
    if (time <= 10) el.style.color = 'var(--rose)';
    if (time <= 0) {
      clearInterval(interval);
      autoReady();   // Tự động sẵn sàng khi hết giờ
    }
  }, 1000);
}

// ── LOBBY ──
function enterLobby() {
  showArena('lobby');
  clearInterval(AR.waitTimer);
  const me = getMyInfo();
  const opp = AR.oppProfile;
  const oppName = opp?.full_name || opp?.username || 'Đối thủ';

  // Render player cards
  G('lp-me-av').textContent   = mkIni(me.name);
  G('lp-me-name').textContent = me.name;
  G('lp-me-elo').textContent  = `ELO: ${me.elo}`;
  G('lp-me-rec').textContent  = `${me.wins}W — ${me.losses}L`;

  G('lp-opp-av').textContent   = mkIni(oppName);
  G('lp-opp-name').textContent = oppName;
  G('lp-opp-elo').textContent  = `ELO: ${opp?.elo || 1200}`;
  const oppWins = opp?.wins||0, oppLosses = opp?.losses||0;
  G('lp-opp-rec').textContent  = `${oppWins}W — ${oppLosses}L`;

  // Render topic buttons
  const tg = G('topic-grid');
  tg.innerHTML = '';
  TOPICS.forEach(tp => {
    const btn = document.createElement('button');
    btn.className = 'topic-btn';
    btn.innerHTML = `${tp.icon}<br>${tp.name}`;
    btn.dataset.id = tp.id;
    btn.onclick = () => toggleTopic(tp.id, btn);
    tg.appendChild(btn);
  });

  AR.selectedTopics = [];
  AR.ready = false;
  AR.oppReady = false;
  G('topic-count').textContent = '0';

  showArena('lobby');

 
  startLobbyCountdown(AR.lobbySec || 30);
}


 

function updateMeReadyUI() {
  G('lp-me-ready').textContent = '✅ Sẵn sàng!';
  G('lp-me-ready').className = 'lpc-status ready';
  G('btn-ready').disabled = true;
  G('btn-ready').style.opacity = '.6';
}

function updateOppReadyUI() {
  if (AR.oppReady) {
    G('lp-opp-ready').textContent = '✅ Sẵn sàng!';
    G('lp-opp-ready').className = 'lpc-status ready';
  } else {
    G('lp-opp-ready').textContent = '⏳ Đang chọn...';
    G('lp-opp-ready').className = 'lpc-status wait';
  }
}

function toggleTopic(tid, btn) {
  if (AR.ready) return;
  if (AR.selectedTopics.includes(tid)) {
    AR.selectedTopics = AR.selectedTopics.filter(t=>t!==tid);
    btn.classList.remove('selected');
  } else {
    if (AR.selectedTopics.length >= 3) { toast('err','⚠️ Chỉ chọn tối đa 3 chủ đề!'); return; }
    AR.selectedTopics.push(tid);
    btn.classList.add('selected');
  }
  G('topic-count').textContent = AR.selectedTopics.length;
}
function setReady() {
  if (AR.selectedTopics.length === 0) {
    // nếu chưa chọn, lấy 3 chủ đề ngẫu nhiên
    AR.selectedTopics = TOPICS.map(t => t.id).sort(() => Math.random() - 0.5).slice(0,3);
  }
  AR.ready = true;
  updateMeReadyUI(); // hiển thị "Sẵn sàng"
  socket.emit('lobby_action', {
    roomId: currentRoomId,
    topics: AR.selectedTopics,
    ready: true
  });
}

function autoReady() {
  if (!AR.ready) {
    if (AR.selectedTopics.length === 0)
      AR.selectedTopics = TOPICS.map(t=>t.id).sort(()=>Math.random()-.5).slice(0,3);
    setReady();
  }
}

function handleLobbyAction(payload) {
  if (payload.userId === U.id) return; // ignore self
  if (payload.type === 'player_ready') {
    AR.oppReady = true;
    AR.oppTopics = payload.topics || [];
    G('lp-opp-ready').textContent = '✅ Sẵn sàng!';
    G('lp-opp-ready').className = 'lpc-status ready';
    checkBothReady();
  }
}

async function checkBothReady() {
  if (!AR.ready || !AR.oppReady) return;
  clearInterval(AR.lobbyTimer);

  // Merge topics và build questions (chỉ host làm để tránh duplicate)
  if (AR.role === 'host') {
    const allTopics = [...new Set([...AR.selectedTopics, ...AR.oppTopics])];
    const qs = buildQuestions(allTopics);
    await sb.from('battle_rooms').update({
      status: 'battle',
      questions: JSON.stringify(qs)
    }).eq('id', AR.roomId);
  }
}

// ── BATTLE ──
function startBattle(questionsJson) {
  clearInterval(AR.lobbyTimer);
  let qs;
  try { qs = typeof questionsJson === 'string' ? JSON.parse(questionsJson) : questionsJson; }
  catch(e) { qs = buildQuestions(AR.selectedTopics.length?AR.selectedTopics:['acid-base','redox']); }
  AR.questions = qs;
  AR.qIndex = 0; AR.myScore = 0; AR.oppScore = 0;

  // Init scoreboard
  const me = getMyInfo();
  const oppName = AR.oppProfile?.full_name || AR.oppProfile?.username || 'Đối thủ';
  G('bs-me-av').textContent    = mkIni(me.name);
  G('bs-me-name').textContent  = me.name;
  G('bs-opp-av').textContent   = mkIni(oppName);
  G('bs-opp-name').textContent = oppName;
  updateBattleScore();

  showArena('battle');
  startBattleTimer();
  renderQuestion();
}

function startBattleTimer(seconds = 60) {
  AR.battleSec = seconds;
  G('battle-timer').textContent = seconds;
  G('battle-progress').style.width = '100%';
  clearInterval(AR.battleTimer);
  AR.battleTimer = setInterval(() => {
    AR.battleSec--;
    G('battle-timer').textContent = AR.battleSec;
    G('battle-progress').style.width = (AR.battleSec / seconds * 100) + '%';
    if (AR.battleSec <= 10) G('battle-timer').style.color = 'var(--rose)';
    else G('battle-timer').style.color = 'var(--rose)'; // adjust if you want different colors
    if (AR.battleSec <= 0) {
      clearInterval(AR.battleTimer);
      // Tạo data giả để kết thúc battle (điểm số = 0 cho cả hai)
      const me = getMyInfo();
      const opp = AR.oppProfile;
      const scores = {};
      scores[me.id] = AR.myScore;
      scores[opp?.userId || AR.oppId] = AR.oppScore;
      endBattle({ scores, winnerUserId: null, elo_change: {} });
    }
  }, 1000);
}



function renderBattleQuestion(data) {
  const overlay = document.getElementById('cooldown-overlay');
  if (overlay) overlay.style.display = 'none';   // ← thêm đầu hàm
  // Hiển thị battle nếu chưa hiển thị
  if (G('ar-battle').style.display !== 'flex') {
    showArena('battle');
  }

  // Cập nhật thông tin người chơi (tên, avatar)
  const me = getMyInfo();
  const oppName = AR.oppProfile?.full_name || AR.oppProfile?.username || 'Đối thủ';
  G('bs-me-av').textContent = mkIni(me.name);
  G('bs-me-name').textContent = me.name;
  G('bs-opp-av').textContent = mkIni(oppName);
  G('bs-opp-name').textContent = oppName;

  // Cập nhật điểm hiện tại (giữ nguyên từ trước)
  updateBattleScore();

  // Lưu câu hỏi hiện tại
  AR.currentQuestion = data.question;
  AR.currentIndex = data.index;
  AR.totalQuestions = data.total;

  // Reset các trạng thái (không reset điểm)
  AR.answered = false;
  AR.oppAnswered = false;
  AR.waitingResponse = false;
  AR.questionFinished = false;
  AR.answerCooldown = false;
  if (AR.cooldownTimer) clearTimeout(AR.cooldownTimer);
  AR.answerCooldown = false;
  disableBattleInputs(false);
  G('cooldown-indicator').style.display = 'none';

  G('opp-answered').style.display = 'none';
  G('battle-feedback').style.display = 'none';
  G('cooldown-indicator').style.display = 'none';

  // Cập nhật nội dung câu hỏi
  G('battle-q-num').textContent = `Câu ${data.index}/${data.total}`;
  G('battle-q-text').textContent = data.question.q;
  const topicName = TOPICS.find(t => t.id === data.question.topicId)?.name || '';
  G('battle-q-topic').textContent = topicName;

  const typeBadge = G('battle-q-type');
  if (data.question.type === 'mcq') {
    typeBadge.textContent = 'Trắc nghiệm';
    typeBadge.className = 'q-type-badge mcq';
    G('battle-mcq').style.display = 'grid';
    G('battle-input').style.display = 'none';
    G('battle-mcq').innerHTML = '';
    data.question.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'mcq-btn';
      btn.textContent = `${['A','B','C','D'][i]}. ${opt}`;
      btn.onclick = () => submitMCQ(i, btn, data.question);
      G('battle-mcq').appendChild(btn);
    });
    // Kích hoạt các nút
    document.querySelectorAll('.mcq-btn').forEach(btn => btn.disabled = false);
  } else {
    typeBadge.textContent = 'Điền số';
    typeBadge.className = 'q-type-badge num';
    G('battle-mcq').style.display = 'none';
    G('battle-input').style.display = 'block';
    const inp = G('battle-ans-inp');
    inp.value = '';
    inp.disabled = false;
    inp.focus();
    const submitBtn = G('submit-ans-btn');
    if (submitBtn) submitBtn.disabled = false;
  }
  if (AR.cooldownInterval) clearInterval(AR.cooldownInterval);
  G('cooldown-overlay').style.display = 'none';
  // Bắt đầu bộ đếm thời gian
  startBattleTimer(data.timeout);
}

function renderQuestion() {
  const q = AR.currentQuestion;
  if (!q) { endBattle(); return; }

  AR.answered = false;
  AR.oppAnswered = false;
  G('opp-answered').style.display = 'none';
  G('battle-feedback').style.display = 'none';

  const topicName = TOPICS.find(t=>t.id === q.topicId)?.name || '';
  G('battle-q-num').textContent  = `Câu ${AR.qIndex+1}/${AR.questions.length}`;
  G('battle-q-text').textContent = q.q;
  G('battle-q-topic').textContent = topicName;

  const typeBadge = G('battle-q-type');
  if (q.type === 'mcq') {
    typeBadge.textContent = 'Trắc nghiệm'; typeBadge.className = 'q-type-badge mcq';
    G('battle-mcq').style.display = 'grid';
    G('battle-input').style.display = 'none';
    G('battle-mcq').innerHTML = '';
    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'mcq-btn';
      btn.textContent = `${['A','B','C','D'][i]}. ${opt}`;
      btn.onclick = () => submitMCQ(i, btn, q);
      G('battle-mcq').appendChild(btn);
    });
  } else {
    typeBadge.textContent = 'Điền số'; typeBadge.className = 'q-type-badge num';
    G('battle-mcq').style.display = 'none';
    G('battle-input').style.display = 'block';
    G('battle-ans-inp').value = '';
    G('battle-ans-inp').focus();
  }
}

function submitMCQ(i, btn, q) {
  if (AR.waitingResponse || AR.questionFinished || AR.answerCooldown) return;
  AR.waitingResponse = true;

  // Vô hiệu hóa các nút tạm thời
  document.querySelectorAll('.mcq-btn').forEach(b => b.disabled = true);

  socket.emit('battle_action', {
    roomId: currentRoomId,
    answer: i,
  });
}

function submitAns() {
  if (AR.waitingResponse || AR.questionFinished || AR.answerCooldown) return;
  const inp = G('battle-ans-inp');
  let val = inp.value.trim();
  if (!val) return;

  // Kiểm tra định dạng số nguyên (cho phép số âm)
  if (AR.currentQuestion?.type === 'num') {
    if (!/^-?\d+$/.test(val)) {
      const fb = G('battle-feedback');
      fb.textContent = `⚠️ Vui lòng nhập số nguyên.`;
      fb.style.background = 'var(--amber-lt)';
      fb.style.color = 'var(--amber)';
      fb.style.display = 'block';
      setTimeout(() => {
        if (fb.style.display === 'block') fb.style.display = 'none';
      }, 2000);
      return;
    }
  }

  AR.waitingResponse = true;
  inp.disabled = true;
  const submitBtn = G('submit-ans-btn');
  if (submitBtn) submitBtn.disabled = true;
  socket.emit('battle_action', {
    roomId: currentRoomId,
    answer: val,
  });
}

function showFeedback(correct, exp) {
  const fb = G('battle-feedback');
  fb.style.display = 'block';
  fb.textContent = correct ? `✅ Chính xác! ${exp}` : `❌ Sai. ${exp}`;
  fb.style.background = correct ? 'var(--green-lt)' : 'var(--rose-lt)';
  fb.style.color = correct ? 'var(--green)' : 'var(--rose)';
  fb.style.border = `1px solid ${correct ? 'rgba(22,163,74,.2)' : 'rgba(225,29,72,.15)'}`;
}

async function broadcastAnswer(correct) {
  await AR.channel?.send({ type:'broadcast', event:'battle_action', payload:{
    type:'answered', userId: U.id, correct, qIndex: AR.qIndex
  }});
}

function handleBattleAction(payload) {
  if (payload.userId === U.id) return;
  if (payload.type === 'answered' && payload.qIndex === AR.qIndex) {
    AR.oppAnswered = true;
    if (payload.correct) AR.oppScore++;
    updateBattleScore();
    const oppName = AR.oppProfile?.full_name?.split(' ').pop() || 'Đối thủ';
    G('opp-name-ind').textContent = oppName;
    G('opp-answered').style.display = 'block';
  }
}

function updateBattleScore() {
  G('bs-me-score').textContent  = AR.myScore;
  G('bs-opp-score').textContent = AR.oppScore;
}

function nextQ() {
  AR.qIndex++;
  if (AR.qIndex >= AR.questions.length) { endBattle(); return; }
  renderQuestion();
}

// ── END BATTLE ──
async function endBattle(data) {
  clearInterval(AR.battleTimer);
  if (AR.cooldownTimer) clearTimeout(AR.cooldownTimer);
  AR.answerCooldown = false;

  const me = getMyInfo();
  const oppName = AR.oppProfile?.full_name || AR.oppProfile?.username || 'Đối thủ';

  // Lấy điểm từ data (ưu tiên dữ liệu server)
  let scores = data?.scores;
  if (!scores) {
    scores = {};
    scores[me.id] = AR.myScore;
    scores[AR.oppId] = AR.oppScore;
  }

  const myScore = scores[me.id] || 0;
  const oppScore = scores[AR.oppId] || 0;
  const win = myScore > oppScore;
  const draw = myScore === oppScore;

  // Emoji kết quả
  G('result-emoji').textContent = win ? '🏆' : draw ? '🤝' : '💪';
  G('result-title').textContent = win ? 'Chiến Thắng!' : draw ? 'Hòa!' : 'Thất Bại!';
  G('result-sub').textContent = win ? 'Xuất sắc!' : draw ? 'Màn trình diễn ngang tài ngang sức!' : 'Cố lên!';
  G('rs-me-score').textContent = myScore;
  G('rs-opp-score').textContent = oppScore;
  G('rs-me-name').textContent = me.name;
  G('rs-opp-name').textContent = oppName;

  // Lấy thay đổi ELO từ server (ưu tiên), fallback nếu không có
  let eloChange = 0;
  if (data?.elo_change && typeof data.elo_change === 'object') {
    eloChange = data.elo_change[me.id] || 0;
  } else {
    eloChange = win ? 20 : draw ? 0 : -15;
  }

  // Hiển thị thay đổi ELO trên màn hình kết quả
  const eloEl = G('result-elo-change');
  if (eloChange > 0) {
    eloEl.textContent = `📈 +${eloChange} ELO`;
    eloEl.style.background = 'var(--green-lt)';
    eloEl.style.color = 'var(--green)';
  } else if (eloChange < 0) {
    eloEl.textContent = `📉 ${eloChange} ELO`;
    eloEl.style.background = 'var(--rose-lt)';
    eloEl.style.color = 'var(--rose)';
  } else {
    eloEl.textContent = `📊 ELO không đổi`;
    eloEl.style.background = 'var(--amber-lt)';
    eloEl.style.color = 'var(--amber)';
  }

  showArena('result');

 

  addToHistory({ win, myScore, oppScore, oppName, eloChange });
  cleanupRoom();
}

// Hàm phụ trợ để xác định rank theo ELO (có thể đặt ở đâu đó)
function getRankFromElo(elo) {
  if (elo < 1300) return 'Electron';
  if (elo < 1500) return 'Nguyên Tử';
  if (elo < 1700) return 'Phân Tử';
  if (elo < 1900) return 'Nhà Hóa Học';
  return 'Giáo Sư';
}
function addToHistory(entry) {
  const list = G('hist-list');
  const old = list.querySelector('.hist-empty');
  if (old) old.remove();
  const d = document.createElement('div');
  d.style.cssText='display:flex;align-items:center;gap:.75rem;padding:.65rem .85rem;border:1px solid var(--border);border-radius:10px;background:var(--bg-white);margin-bottom:.4rem';
  d.innerHTML=`<span style="font-size:1.3rem">${entry.win?'🏆':'💪'}</span><div style="flex:1"><div style="font-weight:700;font-size:.85rem;font-family:var(--font-h)">${entry.win?'Thắng':'Thua'} vs ${entry.oppName}</div><div style="font-size:.75rem;color:var(--text-3)">${entry.myScore} – ${entry.oppScore}</div></div><div style="font-size:.8rem;font-weight:700;color:${entry.eloChange>=0?'var(--green)':'var(--rose)'}">${entry.eloChange>=0?'+':''}${entry.eloChange} ELO</div>`;
  list.prepend(d);
}

// ══════════════════════════════════════════════════════
//   GLOBAL PRESENCE — realtime online tracking
// ══════════════════════════════════════════════════════
let PRESENCE_CH = null;
let ONLINE_USERS = {}; // { userId: presenceData }
let socket = null;
let currentRoomId = null;
let onlineUsers = {};           // key = userId, value = user data

let FA = { selectedUser: null }; // cho mời bạn bè


function joinGlobalPresence() {
  if (!sb || !U) return;
  if (PRESENCE_CH) { sb.removeChannel(PRESENCE_CH); PRESENCE_CH = null; }
  const me = getMyInfo();
  PRESENCE_CH = sb.channel('global:presence', {
    config: { presence: { key: U.id } }
  });
  PRESENCE_CH
    .on('presence', { event: 'sync' }, () => {
      const state = PRESENCE_CH.presenceState();
      ONLINE_USERS = {};
      Object.values(state).forEach(presences => {
        const p = presences[0];
        if (p && p.userId && p.userId !== U.id) ONLINE_USERS[p.userId] = p;
      });
      updateOnlineCount();
      refreshOnlineUI();
    })
    .on('presence', { event: 'join' }, ({ newPresences }) => {
      newPresences.forEach(p => {
        if (p.userId && p.userId !== U.id) ONLINE_USERS[p.userId] = p;
      });
      updateOnlineCount();
      refreshOnlineUI();
    })
    .on('presence', { event: 'leave' }, ({ leftPresences }) => {
      leftPresences.forEach(p => { if (p.userId) delete ONLINE_USERS[p.userId]; });
      updateOnlineCount();
      refreshOnlineUI();
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await PRESENCE_CH.track({
          userId: U.id,
          name: me.name,
          username: me.username,
          elo: me.elo,
          wins: me.wins,
          losses: me.losses,
        });
        updateOnlineCount();
      }
    });
}



function initSocket() {
  if (socket && socket.connected) socket.disconnect();
  socket = io();

  socket.on('connect', () => {
    console.log('Socket connected');
    // Gửi thông tin người dùng lên server
    socket.emit('presence:join', {
      userId: U.id,
      full_name: U.profile?.full_name || U.email.split('@')[0],
      username: U.profile?.username || '',
      elo: U.profile?.elo || 1200,
      wins: U.profile?.wins || 0,
      losses: U.profile?.losses || 0
    });
  });
}




function leaveGlobalPresence() {
  if (PRESENCE_CH) { PRESENCE_CH.untrack(); sb.removeChannel(PRESENCE_CH); PRESENCE_CH = null; }
  ONLINE_USERS = {};
  updateOnlineCount();
}

function updateOnlineCount() {
  const count = Object.keys(ONLINE_USERS).length;
  document.querySelectorAll('.online-count-badge').forEach(el => {
    el.textContent = count > 0 ? `${count} người online` : 'Chưa có ai online';
  });
}

function refreshOnlineUI() {
  if (G('ov-friend')?.classList.contains('open')) {
    const q = G('friend-search')?.value?.trim() || '';
    renderOnlinePlayers(Object.values(ONLINE_USERS), q);
  }
}

// ══════════════════════════════════════════════════════
//   FRIEND ARENA
// ══════════════════════════════════════════════════════
 

function selectFriendPlayer(player, row) {
  document.querySelectorAll('.online-player-row').forEach(r => r.classList.remove('selected'));
  row.classList.add('selected');
  FA.selectedUser = player;
  G('fs-name').innerText = player.full_name;
  G('fs-elo').innerHTML = `⚡ ELO: ${player.elo}`;
  G('friend-selected').style.display = 'block';
}


function openFriendArena() {
  if (!U) { openM('login'); return; }
  G('ov-friend').classList.add('open');
  document.body.style.overflow = 'hidden';
  FA.selectedUser = null;
  refreshOnlineUI(); // render danh sách từ onlineUsers
}

function closeFriendArena() {
  G('ov-friend').classList.remove('open');
  document.body.style.overflow = '';
  FA.selectedUser = null;
}

function renderOnlinePlayers(players, query='') {
  const list = G('online-list');
  let filtered = players;
  if (query) {
    const q = query.toLowerCase();
    filtered = players.filter(p =>
      (p.name||'').toLowerCase().includes(q) ||
      (p.username||'').toLowerCase().includes(q)
    );
  }
  if (!filtered.length) {
    list.innerHTML = `<div style="color:var(--text-4);font-size:.83rem;padding:.75rem 0;text-align:center">
      ${Object.keys(ONLINE_USERS).length === 0 ? '😴 Chưa có người chơi nào online' : '🔍 Không tìm thấy kết quả'}
    </div>`;
    return;
  }
  list.innerHTML = '';
  filtered.forEach(p => {
    const name = p.name || p.full_name || p.username || 'Người chơi';
    const row = document.createElement('div');
    row.className = 'online-player-row';
    row.innerHTML = `
      <div class="opr-av">${mkIni(name)}</div>
      <div style="flex:1">
        <div class="opr-name">${name}</div>
        <div style="font-size:.73rem;color:var(--text-4)">@${p.username||''}</div>
      </div>
      <div class="opr-elo">⚡ ${p.elo||1200}</div>
      <div class="online-dot" title="Online ngay bây giờ"></div>`;
      row.onclick = () => selectFriendPlayer({
        userId: p.userId,
        full_name: p.name,
        username: p.username,
        elo: p.elo,
        wins: p.wins || 0,
        losses: p.losses || 0
      }, row);
    list.appendChild(row);
  });
}
function searchFriends(query) {
  const filtered = Object.values(onlineUsers).filter(u =>
    (u.full_name + u.username).toLowerCase().includes(query.toLowerCase())
  );
  renderOnlineList(filtered);
}

function selectFriend(player) {
  FA.selectedUser = player;
  // hiển thị thông tin người được chọn
  document.getElementById('friend-selected').style.display = 'block';
  document.getElementById('fs-name').innerText = player.full_name;
  document.getElementById('fs-elo').innerHTML = `⚡ ELO: ${player.elo}`;
}

async function sendInvite() {
  if (!FA.selectedUser) return;
  socket.emit('invite_friend', {
    toUserId: FA.selectedUser.userId
  });
  // Chuyển sang trạng thái đang chờ chấp nhận
  document.getElementById('friend-selected').style.display = 'none';
  document.getElementById('friend-waiting').style.display = 'block';
  document.getElementById('fw-name').innerText = FA.selectedUser.full_name;
}

function clearFriendSelected() {
  FA.selectedUser = null;
  G('friend-selected').style.display = 'none';
  document.querySelectorAll('.online-player-row').forEach(r=>r.classList.remove('selected'));
}

 

function cancelInvite() {
  if (AR.roomId) sb.from('battle_rooms').delete().eq('id', AR.roomId).then(()=>{});
  G('friend-waiting').style.display = 'none';
  G('friend-selected').style.display = 'none';
  cleanupRoom();
}

function subscribeToInvites() {
  if (!U) return;
  FA.inviteChannel = sb.channel('invites:'+U.id)
    .on('postgres_changes', { event:'INSERT', schema:'public', table:'battle_invites', filter:`to_id=eq.${U.id}` },
      async ({new: inv}) => {
        // Load invite room & sender
        const { data: room } = await sb.from('battle_rooms').select('*').eq('id', inv.room_id).single();
        if (!room || room.status !== 'invited') return;
        const { data: sender } = await sb.from('profiles').select('*').eq('id', inv.from_id).single();
        AR.inviteFrom = inv.from_id;
        AR.inviteRoomId = inv.room_id;
        AR.oppProfile = sender;
        const senderName = sender?.full_name || sender?.username || 'Ai đó';
        G('inv-from-name').textContent = senderName;
        G('inv-from-elo').textContent  = `⚡ ELO: ${sender?.elo||1200}`;
        G('ov-invite').classList.add('open');
      })
    .subscribe();
}

function acceptInvite() {
  G('ov-invite').classList.remove('open');
  closeFriendArena();
  socket.emit('invite_response', {
    roomId: AR.inviteRoomId,
    accept: true
  });
  // Server sẽ gửi match_found cho cả hai người sau đó
}

async function rejectInvite() {
  G('ov-invite').classList.remove('open');
  if (AR.inviteRoomId) await sb.from('battle_rooms').update({ status:'rejected' }).eq('id', AR.inviteRoomId);
  AR.inviteFrom = null; AR.inviteRoomId = null;
}

// ══════════════════════════════════
//   ENHANCED CHEMISTRY PARTICLE SYSTEM
// ══════════════════════════════════
(function() {
  const canvas = G('pc');
  const ctx = canvas.getContext('2d');
  let W, H, pts = [], mols = [], bubbles = [], rings = [];
  const COLS = ['#0d9488','#2563eb','#7c3aed','#0891b2','#059669','#0284c7'];
  const ELEMENTS = ['H','C','O','N','Fe','Cu','Na','Cl','Mg','Ca','K','S'];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  // Floating atom particle
  function mkPt() {
    return {
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.5, vy: (Math.random()-.5)*.5,
      r: Math.random()*2.5+1,
      col: COLS[Math.floor(Math.random()*COLS.length)],
      a: Math.random()*.28+.08,
      ph: Math.random()*Math.PI*2,
    };
  }

  // Molecule cluster
  function mkMol() {
    const cx = Math.random()*W, cy = Math.random()*H;
    const n = Math.floor(Math.random()*4)+2;
    const col = COLS[Math.floor(Math.random()*COLS.length)];
    const nodes = [{x:cx, y:cy, r:5, el:ELEMENTS[Math.floor(Math.random()*ELEMENTS.length)]}];
    for (let i=0;i<n;i++) {
      const a = (i/n)*Math.PI*2 + Math.random()*.3;
      const d = 22+Math.random()*18;
      nodes.push({x:cx+Math.cos(a)*d, y:cy+Math.sin(a)*d, r:3.5+Math.random(), el:ELEMENTS[Math.floor(Math.random()*ELEMENTS.length)]});
    }
    return { nodes, col, a:0.08+Math.random()*.07, vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22, ph:Math.random()*Math.PI*2, rot:0, rotV:(Math.random()-.5)*.005 };
  }

  // Electron orbit ring
  function mkRing() {
    return {
      x: Math.random()*W, y: Math.random()*H,
      rx: 30+Math.random()*25, ry: 12+Math.random()*10,
      rot: Math.random()*Math.PI,
      col: COLS[Math.floor(Math.random()*COLS.length)],
      a: .04+Math.random()*.04,
      speed: .012+Math.random()*.018,
      angle: Math.random()*Math.PI*2,
      vx: (Math.random()-.5)*.18, vy: (Math.random()-.5)*.18,
    };
  }

  // Rising bubble
  function mkBubble() {
    return {
      x: Math.random()*W,
      y: H + 20,
      r: 4+Math.random()*12,
      vy: -(0.3+Math.random()*.5),
      a: .05+Math.random()*.06,
      col: COLS[Math.floor(Math.random()*COLS.length)],
      wobble: Math.random()*Math.PI*2,
      wobbleS: .02+Math.random()*.02,
    };
  }

  function setup() {
    pts    = Array.from({length:55}, mkPt);
    mols   = Array.from({length:8},  mkMol);
    rings  = Array.from({length:6},  mkRing);
    bubbles= Array.from({length:12}, mkBubble);
  }

  function hexA(a) { return Math.round(Math.max(0,Math.min(1,a))*255).toString(16).padStart(2,'0'); }

  function draw() {
    ctx.clearRect(0,0,W,H);
    const t = Date.now()/1000;

    // ─ ELECTRON ORBIT RINGS ─
    rings.forEach(rg => {
      rg.angle += rg.speed;
      rg.x += rg.vx; rg.y += rg.vy;
      if (rg.x < -80||rg.x > W+80) rg.vx *= -1;
      if (rg.y < -80||rg.y > H+80) rg.vy *= -1;

      ctx.save();
      ctx.translate(rg.x, rg.y);
      ctx.rotate(rg.rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, rg.rx, rg.ry, 0, 0, Math.PI*2);
      ctx.strokeStyle = rg.col + hexA(rg.a);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Electron dot on ring
      const ex = Math.cos(rg.angle)*rg.rx;
      const ey = Math.sin(rg.angle)*rg.ry;
      ctx.beginPath(); ctx.arc(ex, ey, 2.5, 0, Math.PI*2);
      ctx.fillStyle = rg.col + hexA(rg.a*3.5);
      ctx.fill();
      // Electron glow
      const g = ctx.createRadialGradient(ex,ey,0,ex,ey,8);
      g.addColorStop(0, rg.col+hexA(rg.a*2.5)); g.addColorStop(1, rg.col+'00');
      ctx.beginPath(); ctx.arc(ex,ey,8,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();

      ctx.restore();
    });

    // ─ RISING BUBBLES ─
    bubbles.forEach(b => {
      b.wobble += b.wobbleS;
      b.y += b.vy;
      b.x += Math.sin(b.wobble)*0.5;
      if (b.y < -b.r*2) {
        b.y = H + b.r; b.x = Math.random()*W;
        b.r = 4+Math.random()*12;
      }
      const prog = 1 - Math.max(0, (-b.y+H)/(H+b.r*2));
      const oa = b.a * (1 - prog*.6);
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx.strokeStyle = b.col + hexA(oa*1.8);
      ctx.lineWidth = .8;
      ctx.stroke();
      // Highlight
      ctx.beginPath(); ctx.arc(b.x - b.r*.28, b.y - b.r*.28, b.r*.22, 0, Math.PI*2);
      ctx.fillStyle = '#fff' + hexA(oa*.5);
      ctx.fill();
    });

    // ─ MOLECULE CLUSTERS ─
    mols.forEach(m => {
      m.ph  += .006;
      m.rot += m.rotV;
      const oa = m.a + Math.sin(m.ph)*.022;
      m.nodes.forEach(nd => { nd.x += m.vx; nd.y += m.vy; });
      const c = m.nodes[0];
      if (c.x<-80||c.x>W+80) m.vx*=-1;
      if (c.y<-80||c.y>H+80) m.vy*=-1;

      // Bonds
      ctx.lineWidth = 1.5;
      for (let i=1;i<m.nodes.length;i++) {
        ctx.beginPath(); ctx.moveTo(c.x,c.y); ctx.lineTo(m.nodes[i].x,m.nodes[i].y);
        ctx.strokeStyle = m.col + hexA(oa*.85); ctx.stroke();
        if (i%2===0) {
          const dx = m.nodes[i].x-c.x, dy = m.nodes[i].y-c.y;
          const len = Math.sqrt(dx*dx+dy*dy)||1;
          const ox=-dy/len*4, oy=dx/len*4;
          ctx.beginPath(); ctx.moveTo(c.x+ox,c.y+oy); ctx.lineTo(m.nodes[i].x+ox,m.nodes[i].y+oy);
          ctx.strokeStyle = m.col + hexA(oa*.38); ctx.stroke();
        }
      }
      // Atoms
      m.nodes.forEach(nd => {
        ctx.beginPath(); ctx.arc(nd.x,nd.y,nd.r,0,Math.PI*2);
        ctx.fillStyle = m.col + hexA(oa*1.5); ctx.fill();
        const g = ctx.createRadialGradient(nd.x,nd.y,0,nd.x,nd.y,nd.r*3.2);
        g.addColorStop(0, m.col+hexA(oa*.45)); g.addColorStop(1, m.col+'00');
        ctx.beginPath(); ctx.arc(nd.x,nd.y,nd.r*3.2,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
      });
    });

    // ─ FLOATING PARTICLES + CONNECTIONS ─
    const maxD = 110;
    for (let i=0;i<pts.length;i++) {
      const p = pts[i];
      p.ph += .016; p.x += p.vx; p.y += p.vy;
      if (p.x<0||p.x>W) p.vx*=-1;
      if (p.y<0||p.y>H) p.vy*=-1;
      for (let j=i+1;j<pts.length;j++) {
        const q = pts[j];
        const dx=p.x-q.x, dy=p.y-q.y, d=Math.sqrt(dx*dx+dy*dy);
        if (d<maxD) {
          ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
          ctx.strokeStyle = p.col + hexA((1-d/maxD)*.12);
          ctx.lineWidth = .6; ctx.stroke();
        }
      }
      const pr = p.r + Math.sin(p.ph)*.5;
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,pr*4);
      g.addColorStop(0, p.col+hexA(p.a*.75)); g.addColorStop(1, p.col+'00');
      ctx.beginPath(); ctx.arc(p.x,p.y,pr*4,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x,p.y,pr,0,Math.PI*2);
      ctx.fillStyle = p.col + hexA(p.a*1.9); ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); setup(); });
  resize(); setup(); draw();
})();

init();
