// ══ SUPABASE ══
const SURL = 'https://cmrbsiuzrpsglynnfund.supabase.co';
const SKEY = 'sb_publishable_-4uRGeYYYeJAvSMKnwZr5Q_LOSAr_dZ';
const { createClient } = supabase;
let sb;
try { sb = createClient(SURL, SKEY); console.log('✅ GloryChem connected'); }
catch (e) { console.warn('Supabase:', e.message); }
let U = null;

// ── THEME TOGGLE ──
function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('glorychem-theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const sun = btn.querySelector('.icon-sun');
  const moon = btn.querySelector('.icon-moon');
  if (theme === 'dark') {
    if (sun) sun.style.display = 'none';
    if (moon) moon.style.display = 'inline';
  } else {
    if (sun) sun.style.display = 'inline';
    if (moon) moon.style.display = 'none';
  }
}

let currentLobbyRoomId = null;
let currentLobbyRoom = null;
let lobbyRoomsList = [];
let _pendingJoinRoomId = null; // for password prompt flow

// ── Escape HTML to prevent XSS ──
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Lấy danh sách phòng ──
function loadLobbyRooms() {
  if (!socket || !socket.connected) {
    // retry once socket is ready
    setTimeout(() => loadLobbyRooms(), 500);
    return;
  }
  socket.emit('list_lobby_rooms');
}

// ── Mở overlay tạo phòng ──
function openCreateRoomForm() {
  const name = (U?.profile?.full_name || U?.email?.split('@')[0] || 'Bạn');
  const inp = document.getElementById('cr-name');
  if (inp) inp.value = `Phòng của ${name}`;
  selectRoomType('public');
  clrA('a-create-room');
  document.getElementById('ov-create-room').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCreateRoomForm() {
  document.getElementById('ov-create-room').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeIcon(currentTheme);

  const ov = document.getElementById('ov-create-room');
  if (ov) ov.addEventListener('click', e => { if (e.target === ov) closeCreateRoomForm(); });
  const ovLobby = document.getElementById('ov-lobby');
  if (ovLobby) ovLobby.addEventListener('click', e => { if (e.target === ovLobby) closeLobbyRooms(); });
  const ovDetail = document.getElementById('ov-lobby-detail');
  if (ovDetail) ovDetail.addEventListener('click', e => { if (e.target === ovDetail) leaveLobbyRoom(); });
  const ovPw = document.getElementById('ov-room-password');
  if (ovPw) ovPw.addEventListener('click', e => { if (e.target === ovPw) closeRoomPasswordModal(); });
});

function selectRoomType(type) {
  document.getElementById('cr-opt-public').classList.toggle('selected', type === 'public');
  document.getElementById('cr-opt-private').classList.toggle('selected', type === 'private');
  document.getElementById('cr-pw-wrap').style.display = type === 'private' ? 'block' : 'none';
}

function submitCreateRoom() {
  const name = (document.getElementById('cr-name')?.value || '').trim();
  const isPrivate = document.getElementById('cr-opt-private').classList.contains('selected');
  const password = document.getElementById('cr-password')?.value || '';
  clrA('a-create-room');

  if (!name) { alrt('a-create-room', 'err', '⚠️ Vui lòng nhập tên phòng'); return; }
  if (isPrivate && !password) { alrt('a-create-room', 'err', '⚠️ Vui lòng nhập mật khẩu cho phòng riêng tư'); return; }
  if (!socket || !socket.connected) { alrt('a-create-room', 'err', '❌ Chưa kết nối máy chủ'); return; }

  const btn = document.getElementById('b-create-room');
  btn.disabled = true;
  btn.querySelector('.bt').style.display = 'none';
  btn.querySelector('.bl').style.display = 'inline-flex';

  socket.emit('create_lobby_room', { name, isPrivate, password });
  // Button will be re-enabled on server response or timeout
  setTimeout(() => {
    btn.disabled = false;
    btn.querySelector('.bt').style.display = 'inline';
    btn.querySelector('.bl').style.display = 'none';
  }, 3000);
}

// ── Tham gia phòng ──
function joinLobbyRoom(roomId, password = null) {
  if (!socket || !socket.connected) return;
  socket.emit('join_lobby_room', { roomId, password });
}

// ── Password prompt for private rooms ──
function openRoomPasswordModal(roomId) {
  _pendingJoinRoomId = roomId;
  clrA('a-room-pw');
  document.getElementById('rp-password').value = '';
  document.getElementById('ov-room-password').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('rp-password')?.focus(), 150);
}
function closeRoomPasswordModal() {
  _pendingJoinRoomId = null;
  document.getElementById('ov-room-password').classList.remove('open');
  document.body.style.overflow = '';
}
function submitRoomPassword() {
  if (!_pendingJoinRoomId) return;
  const pw = document.getElementById('rp-password')?.value || '';
  if (!pw) { alrt('a-room-pw', 'err', '⚠️ Vui lòng nhập mật khẩu'); return; }
  joinLobbyRoom(_pendingJoinRoomId, pw);
  closeRoomPasswordModal();
}

// ── Rời phòng ──
function leaveLobbyRoom() {
  if (currentLobbyRoomId) {
    socket.emit('leave_lobby_room', { roomId: currentLobbyRoomId });
  }
  currentLobbyRoomId = null;
  currentLobbyRoom = null;
  document.getElementById('ov-lobby-detail').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Bắt đầu trận trong phòng ──
function startLobbyBattle() {
  if (!currentLobbyRoomId) return;
  socket.emit('start_lobby_battle', { roomId: currentLobbyRoomId });
}




// ── INIT ──
async function init() {
  await loadCompetitionData(); 
  if (!sb) return;

  // ① Kiểm tra URL từ email link (cả hash lẫn query param – PKCE)
  const handled = await handleEmailRedirect();

  // Nếu đang xử lý recovery redirect thì dừng ở đây,
  // onAuthStateChange sẽ tiếp quản sau khi exchangeCodeForSession xong
  if (handled) return;

  try {
    const { data: { session } } = await sb.auth.getSession();
    if (session) { U = session.user; await loadP(); renderIn(); initSocket(); }
    sb.auth.onAuthStateChange(async (ev, s) => {
      if (ev === 'SIGNED_IN' && s) {
        U = s.user; await loadP(); renderIn(); initSocket(); closeM();
        toast('ok', '✅ Đăng nhập thành công!');
        subscribeProfileRealtime()
      }
      else if (ev === 'SIGNED_OUT') { U = null; renderOut(); }
    });
  } catch (e) { console.error(e); }
}

async function subscribeProfileRealtime() {
  if (!sb || !U) return;
  // Xóa channel cũ để tránh duplicate
  if (U._profileChannel) {
    try { await sb.removeChannel(U._profileChannel); } catch (e) { }
    U._profileChannel = null;
  }
  const channel = sb.channel(`profile:${U.id}`);
  U._profileChannel = channel;
  channel
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'profiles',
      filter: `id=eq.${U.id}`
    }, async (payload) => {
      if (!payload.new) return;
      // Merge dữ liệu mới vào U.profile — không dùng mặc định cũ
      U.profile = { ...(U.profile || {}), ...payload.new };
      renderIn();
      if (G('page-challenge')?.classList.contains('active')) {
        const eloEl = G('peloval');
        if (eloEl) eloEl.textContent = U.profile?.elo || 1200;
      }
      if (socket && socket.connected) {
        socket.emit('presence:update', {
          elo: U.profile.elo || 1200,
          wins: U.profile.wins || 0,
          losses: U.profile.losses || 0,
        });
      }
      console.log(`🔄 Profile realtime update: ELO=${U.profile.elo} W=${U.profile.wins} L=${U.profile.losses}`);
    })
    .subscribe((status, err) => {
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        console.warn('[Supabase] Profile channel error:', status, err);
        // Thử reconnect sau 3 giây
        setTimeout(() => subscribeProfileRealtime(), 3000);
      }
    });
}

// ── XỬ LÝ REDIRECT TỪ EMAIL LINK (PKCE + implicit) ──
async function handleEmailRedirect() {
  const qp = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));

  // Lấy các param có thể có
  const code = qp.get('code');           // PKCE flow (mặc định Supabase mới)
  const errorQ = qp.get('error') || hash.get('error');
  const token = hash.get('access_token'); // Implicit flow (cũ)
  const type = hash.get('type') || qp.get('type');

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
    } catch (e) {
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
        access_token: token,
        refresh_token: hash.get('refresh_token') || '',
      });
      if (error) throw error;
      U = data.session.user;
      await loadP();
      renderIn();
      openResetModal('form');
      _initNormalSession(true);
    } catch (e) {
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
      U = s.user; await loadP(); renderIn(); initSocket(); closeM();
      toast('ok', '✅ Đăng nhập thành công!');
    }
    else if (ev === 'SIGNED_OUT') { U = null; renderOut(); }
  });
}

// ── RESET MODAL HELPERS ──
function openResetModal(mode) {
  const ov = G('ov-reset');
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';

  G('reset-form-body').style.display = mode === 'form' ? 'block' : 'none';
  G('reset-success').style.display = mode === 'success' ? 'block' : 'none';
  G('reset-expired').style.display = mode === 'expired' ? 'block' : 'none';

  if (mode === 'form') {
    G('reset-subtitle').textContent = 'Đặt mật khẩu mới cho tài khoản';
    G('reset-pw').value = '';
    G('reset-pw-cf').value = '';
    clrA('a-reset');
    // Reset strength bars
    ['rs1', 'rs2', 'rs3', 'rs4'].forEach(id => { G(id).className = 'ps'; });
  }
}

function closeResetModal() {
  G('ov-reset').classList.remove('open');
  document.body.style.overflow = '';
}

// Click backdrop để đóng
G('ov-reset').addEventListener('click', function (e) { if (e.target === this) closeResetModal(); });

// ── ĐẶT MẬT KHẨU MỚI ──
async function doResetPw() {
  const pw = G('reset-pw').value;
  const cf = G('reset-pw-cf').value;
  clrA('a-reset');

  if (!pw || !cf) { alrt('a-reset', 'err', '⚠️ Vui lòng điền đầy đủ thông tin'); return; }
  if (pw.length < 8) { alrt('a-reset', 'err', '⚠️ Mật khẩu phải ít nhất 8 ký tự'); return; }
  if (pw !== cf) { alrt('a-reset', 'err', '⚠️ Mật khẩu xác nhận không khớp'); return; }
  if (!sb) { alrt('a-reset', 'err', '⚠️ Supabase chưa cấu hình'); return; }

  const btn = G('b-reset'); btn.disabled = true;
  btn.querySelector('.bt').style.display = 'none';
  btn.querySelector('.bl').style.display = 'inline-flex';
  try {
    const { error } = await sb.auth.updateUser({ password: pw });
    if (error) throw error;
    openResetModal('success');
    toast('ok', '🔒 Mật khẩu mới đã được lưu!');
  } catch (e) {
    alrt('a-reset', 'err', '❌ ' + (e.message || 'Lỗi không xác định'));
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

  if (!email) { alrt('a-reset-retry', 'err', '⚠️ Vui lòng nhập email'); return; }
  if (!/\S+@\S+\.\S+/.test(email)) { alrt('a-reset-retry', 'err', '⚠️ Email không hợp lệ'); return; }
  if (!sb) { alrt('a-reset-retry', 'err', '⚠️ Supabase chưa cấu hình'); return; }

  const btn = G('b-reset-retry'); btn.disabled = true;
  btn.querySelector('.bt').style.display = 'none';
  btn.querySelector('.bl').style.display = 'inline-flex';
  try {
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (error) throw error;
    alrt('a-reset-retry', 'ok', '✅ Email đã gửi! Vui lòng kiểm tra hộp thư.');
    G('b-reset-retry').style.display = 'none';
  } catch (e) {
    alrt('a-reset-retry', 'err', '❌ ' + (e.message || 'Lỗi không xác định'));
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
  if (!id || !pw) { alrt('al', 'err', '⚠️ Vui lòng điền đầy đủ thông tin'); return; }
  if (!sb) { alrt('al', 'err', '⚠️ Supabase chưa cấu hình'); return; }
  ld('bli', true);
  try {
    let email = id;
    if (!id.includes('@')) {
      const { data: p } = await sb.from('profiles').select('email').eq('username', id).single();
      if (!p) { alrt('al', 'err', '❌ Không tìm thấy tài khoản'); return; }
      email = p.email;
    }
    const { error } = await sb.auth.signInWithPassword({ email, password: pw });
    if (error) throw error;
  } catch (e) {
    alrt('al', 'err', e.message?.includes('Invalid') ? '❌ Email/mật khẩu không đúng' : '❌ ' + (e.message || 'Lỗi không xác định'));
  } finally { ld('bli', false); }
}

// ── REGISTER ──
async function doReg() {
  const fn = v('rn'), un = v('ru'), em = v('re'), pw = v('rp'), cf = v('rc');
  clrA('ar'); hide('ecf');
  if (!fn || !un || !em || !pw || !cf) { alrt('ar', 'err', '⚠️ Vui lòng điền đầy đủ thông tin'); return; }
  if (pw !== cf) { show('ecf'); return; }
  if (pw.length < 8) { alrt('ar', 'err', '⚠️ Mật khẩu phải ít nhất 8 ký tự'); return; }
  if (!/^[a-zA-Z0-9_]+$/.test(un)) { alrt('ar', 'err', '⚠️ Tên đăng nhập chỉ chứa chữ, số, dấu _'); return; }
  if (!sb) { alrt('ar', 'err', '⚠️ Supabase chưa cấu hình'); return; }
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
  } catch (e) {
    alrt('ar', 'err', e.message?.includes('already') ? '❌ Email này đã được đăng ký' : '❌ ' + (e.message || 'Lỗi không xác định'));
  } finally { ld('brg', false); }
}

async function doLogout() {
  if (!sb) return;

  try {
    await sb.auth.signOut();

    toast('ok', '👋 Đã đăng xuất');

    // Delay nhẹ để user thấy toast (optional)
    setTimeout(() => {
      window.location.href = '/'; // về trang chủ
      // hoặc: location.reload();
    }, 800);

  } catch (e) {
    console.error('Logout error:', e);
    toast('err', '❌ Lỗi khi đăng xuất');
  }
}

async function loadP(retries = 3) {
  if (!sb || !U) return;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const { data, error } = await sb.from('profiles').select('*').eq('id', U.id).single();
      if (error) throw error;
      if (data) {
        U.profile = data;
        console.log(`✅ Profile loaded (attempt ${attempt}): ELO=${data.elo} W=${data.wins} L=${data.losses}`);
        return;
      }
    } catch (e) {
      console.warn(`⚠️ loadP attempt ${attempt}/${retries} failed:`, e.message);
      if (attempt < retries) await new Promise(r => setTimeout(r, 600 * attempt));
    }
  }
  console.error('❌ loadP: failed after all retries');
}

// ── AVATAR HELPERS ──
/**
 * Trả về HTML cho một avatar element:
 * - Nếu có avatar_url → <img>
 * - Nếu không → initials text
 * targetClass: CSS class của container (uav / lpc-av / bsc-av / ...)
 */
function mkAvHTML(name, avatarUrl, extraClass = '') {
  if (avatarUrl) {
    return `<img src="${avatarUrl}" alt="${name}" class="av-img ${extraClass}" onerror="this.style.display='none';this.nextSibling.style.display=''"><span style="display:none">${mkIni(name)}</span>`;
  }
  return mkIni(name);
}

/**
 * Set nội dung avatar cho một element DOM:
 * el: HTMLElement
 */
function setAvEl(el, name, avatarUrl) {
  if (!el) return;
  if (avatarUrl) {
    el.innerHTML = `<img src="${avatarUrl}" alt="${name}" class="av-img" onerror="this.innerHTML='${mkIni(name)}'">`;
  } else {
    el.textContent = mkIni(name);
  }
}

/**
 * Upload avatar lên server, cập nhật profile
 */
async function uploadAvatar(file) {
  if (!U || !sb) return;
  const LIMIT = 3 * 1024 * 1024;
  if (file.size > LIMIT) { toast('err', '❌ Ảnh quá lớn! Tối đa 3MB.'); return; }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) { toast('err', '❌ Chỉ hỗ trợ JPG, PNG, WebP, GIF'); return; }

  const uploadBtn = G('av-upload-btn');
  if (uploadBtn) { uploadBtn.disabled = true; uploadBtn.textContent = '⏳ Đang tải...'; }

  // Preview tạm bằng Object URL
  const previewUrl = URL.createObjectURL(file);
  if (!U.profile) U.profile = {};
  const prevAv = U.profile.avatar_url;
  U.profile.avatar_url = previewUrl;
  refreshAllAvatars();

  try {
    const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
    const path = `${U.id}.${ext}`;

    // Upload lên Supabase Storage bucket "avatars" (upsert)
    const { error: upErr } = await sb.storage
      .from('avatars')
      .upload(path, file, { upsert: true, contentType: file.type });
    if (upErr) throw upErr;

    // Lấy public URL (thêm cache-bust)
    const { data: pubData } = sb.storage.from('avatars').getPublicUrl(path);
    const avatarUrl = pubData.publicUrl + '?v=' + Date.now();

    // Lưu vào profiles
    const { error: dbErr } = await sb.from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', U.id);
    if (dbErr) throw dbErr;

    // Cập nhật local state
    U.profile.avatar_url = avatarUrl;
    URL.revokeObjectURL(previewUrl);
    refreshAllAvatars();
    toast('ok', '✅ Cập nhật ảnh đại diện thành công!');

    // Cập nhật presence socket
    if (socket && socket.connected) {
      socket.emit('presence:join', {
        userId: U.id,
        full_name: U.profile?.full_name || U.email?.split('@')[0],
        username: U.profile?.username || '',
        elo: U.profile?.elo || 1200,
        wins: U.profile?.wins || 0,
        losses: U.profile?.losses || 0,
        avatar_url: avatarUrl,
      });
    }
  } catch (err) {
    console.error('uploadAvatar error:', err);
    // Rollback preview
    U.profile.avatar_url = prevAv;
    URL.revokeObjectURL(previewUrl);
    refreshAllAvatars();

    // Thông báo lỗi rõ ràng
    let msg = err.message || 'Lỗi không xác định';
    if (msg.includes('Bucket not found') || msg.includes('bucket')) {
      msg = 'Bucket "avatars" chưa được tạo trong Supabase Storage.';
    } else if (msg.includes('not allowed') || msg.includes('policy')) {
      msg = 'Chưa cấu hình Storage Policy. Vào Supabase → Storage → Policies.';
    }
    toast('err', '❌ ' + msg);
  } finally {
    if (uploadBtn) { uploadBtn.disabled = false; uploadBtn.textContent = '📷 Đổi ảnh'; }
  }
}

/**
 * Làm mới tất cả các avatar trên toàn trang với thông tin hiện tại
 */
function refreshAllAvatars() {
  const p = U?.profile;
  const name = p?.full_name || U?.email?.split('@')[0] || 'Người dùng';
  const av = p?.avatar_url || '';
  const ini = mkIni(name);

  // Nav pill avatar
  const uavEl = document.querySelector('.uav');
  if (uavEl) setAvEl(uavEl, name, av);

  // Challenge page avatar
  const pavEl = G('pav');
  if (pavEl) setAvEl(pavEl, name, av);

  // Welcome banner
  const wbAvEl = G('wb-av');
  if (wbAvEl) setAvEl(wbAvEl, name, av);

  // Profile header
  const phAvEl = G('ph-av');
  if (phAvEl) setAvEl(phAvEl, name, av);

  // Battle scoreboard - my side (nếu đang battle)
  const bsMeEl = G('bs-me-av');
  if (bsMeEl && AR.oppId) setAvEl(bsMeEl, name, av);

  // Lobby - my side (nếu đang lobby)
  const lpMeEl = G('lp-me-av');
  if (lpMeEl && AR.oppId) setAvEl(lpMeEl, name, av);
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
  const ini = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const elo = p?.elo || 1200;
  const wins = p?.wins || 0;
  const rank = getRankFromElo(elo);
  const av = p?.avatar_url || '';

  // Nav avatar pill
  G('nav-r').innerHTML = `
    <div class="upill" tabindex="0">
      <div class="uav">${av ? `<img src="${av}" alt="${name}" class="av-img" onerror="this.parentElement.textContent='${ini}'">` : ini}</div>
      <span class="un">${name.split(' ').pop()}</span>
      <span class="chv">▾</span>
      <div class="dmenu">
        <a href="#" onclick="openProfile();return false">👤 Hồ Sơ</a>
        <a href="#">📊 Thống Kê</a>
        <button class="lo" onclick="doLogout()">🚪 Đăng Xuất</button>
      </div>
    </div>`;

  // Challenge page states
  G('s-out').style.display = 'none';
  G('s-in').style.display = 'block';
  G('pname').textContent = name;
  G('pmeta').textContent = `@${un} · Electron`;
  setAvEl(G('pav'), name, av);
  G('peloval').textContent = elo;

  // Hero section toggle
  G('hero-logged-out').style.display = 'none';
  G('hero-logged-in').style.display = 'block';

  // Magazine hero sync
  const mgName = document.getElementById('mg-welcome-name');
  if (mgName) mgName.textContent = name.split(' ').pop().toUpperCase();
  const mgElo = document.getElementById('mg-elo');
  if (mgElo) mgElo.textContent = Number(elo).toLocaleString('vi-VN');
  const mgWins = document.getElementById('mg-wins');
  if (mgWins) mgWins.textContent = wins;
  const mgRank = document.getElementById('mg-rank-label');
  if (mgRank) mgRank.textContent = rank;

  // Welcome banner (only if elements exist)
  setAvEl(G('wb-av'), name, av);
  const wbName = G('wb-name');
  if (wbName) wbName.textContent = `Chào mừng, ${name.split(' ').pop()}! 👋`;
  const wbSub = G('wb-sub');
  if (wbSub) wbSub.textContent = `@${un} · Tiếp tục hành trình chinh phục Hóa học`;

  const wbStats = document.querySelectorAll('.wb-stat');
  if (wbStats.length >= 3) {
    wbStats[0].querySelector('.wb-stat-val').textContent = elo;
    wbStats[1].querySelector('.wb-stat-val').textContent = wins;
    wbStats[2].querySelector('.wb-stat-val').textContent = rank;
  }

  // Subscribe to friend invites
  subscribeToInvites();
  // Cập nhật presence info nếu socket đã kết nối
  if (socket && socket.connected) {
    socket.emit('presence:join', {
      userId: U.id,
      full_name: U.profile?.full_name || U.email?.split('@')[0],
      username: U.profile?.username || '',
      elo: U.profile?.elo || 1200,
      wins: U.profile?.wins || 0,
      losses: U.profile?.losses || 0,
      avatar_url: U.profile?.avatar_url || '',
    });
  }

  // CTA bottom section — swap register button
  const ctaRegBtn = G('mg-cta-btn-register');
  const ctaActionBtn = G('mg-cta-btn-action');
  const ctaNote = G('mg-cta-note');
  if (ctaRegBtn) {
    ctaRegBtn.textContent = '⚔️ Vào Đấu Trường';
    ctaRegBtn.onclick = () => gp('challenge');
  }
  if (ctaActionBtn) {
    ctaActionBtn.textContent = 'Bảng Xếp Hạng →';
    ctaActionBtn.onclick = () => gp('leaderboard');
  }
  if (ctaNote) ctaNote.textContent = '✓ Đối đầu trực tiếp · ✓ Cập nhật ELO theo thời gian thực';
}

function renderOut() {
  if (socket) { socket.disconnect(); socket = null; }
  leaveGlobalPresence();
  G('nav-r').innerHTML = `
    <button class="btn btn-ghost" onclick="openM('login')">Đăng Nhập</button>
    <button class="btn btn-teal"  onclick="openM('register')">Đăng Ký</button>`;
  G('s-out').style.display = 'block';
  G('s-in').style.display = 'none';
  G('hero-logged-out').style.display = 'block';
  G('hero-logged-in').style.display = 'none';

  // CTA bottom section — restore register button
  const ctaRegBtn = G('mg-cta-btn-register');
  const ctaActionBtn = G('mg-cta-btn-action');
  const ctaNote = G('mg-cta-note');
  if (ctaRegBtn) {
    ctaRegBtn.textContent = 'Đăng Ký Miễn Phí';
    ctaRegBtn.onclick = () => openM('register');
  }
  if (ctaActionBtn) {
    ctaActionBtn.textContent = 'Xem Bảng Xếp Hạng →';
    ctaActionBtn.onclick = () => gp('leaderboard');
  }
  if (ctaNote) ctaNote.textContent = '✓ Miễn phí · ✓ Không cần cài đặt · ✓ Học sinh THPT toàn quốc';
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
  G('fl').style.display = t === 'login' ? 'block' : 'none';
  G('fr').style.display = t === 'register' ? 'block' : 'none';
  G('ffp').style.display = t === 'forgot' ? 'block' : 'none';
  G('tl').className = 'mt-tab' + (t === 'login' ? ' active' : '');
  G('tr').className = 'mt-tab' + (t === 'register' ? ' active' : '');
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
  if (!email) { alrt('afp', 'err', '⚠️ Vui lòng nhập địa chỉ email'); return; }
  if (!/\S+@\S+\.\S+/.test(email)) { alrt('afp', 'err', '⚠️ Email không hợp lệ'); return; }
  if (!sb) { alrt('afp', 'err', '⚠️ Supabase chưa cấu hình'); return; }
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
  } catch (e) {
    alrt('afp', 'err', '❌ ' + (e.message || 'Lỗi không xác định'));
  } finally {
    btn.disabled = false;
    btn.querySelector('.bt').style.display = 'inline';
    btn.querySelector('.bl').style.display = 'none';
  }
}

G('ov').addEventListener('click', function (e) { if (e.target === this) closeM(); });
G('mcl').addEventListener('click', function (e) { e.stopPropagation(); closeM(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeM(); });

// ── HELPERS ──
function G(id) { return document.getElementById(id); }
function v(id) { return G(id).value.trim(); }
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
  const i = G(id); i.type = i.type === 'password' ? 'text' : 'password';
  btn.textContent = i.type === 'password' ? '👁' : '🙈';
}
function pws(pw) {
  let s = 0;
  if (pw.length >= 8) s++; if (/[A-Z]/.test(pw)) s++; if (/[0-9]/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++;
  const c = s <= 2 ? 'weak' : s === 3 ? 'medium' : 'strong';
  ['s1', 's2', 's3', 's4'].forEach((id, i) => { if (G(id)) G(id).className = 'ps' + (i < s ? ' ' + c : ''); });
  // Cũng update thanh strength trong reset modal nếu đang mở
  ['rs1', 'rs2', 'rs3', 'rs4'].forEach((id, i) => { if (G(id)) G(id).className = 'ps' + (i < s ? ' ' + c : ''); });
}
function toast(type, msg) {
  const d = document.createElement('div');
  d.className = `toast ${type}`;
  d.innerHTML = `<span>${type === 'ok' ? '✅' : '❌'}</span><span>${msg}</span>`;
  G('tw').appendChild(d); setTimeout(() => d.remove(), 3200);
}
function gp(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  G('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const m = { home: 'nl-home', challenge: 'nl-challenge', leaderboard: 'nl-leaderboard', lesson: 'nl-lesson' };
  if (m[id]) G(m[id])?.classList.add('active');
  // Sync bottom nav
  document.querySelectorAll('.bn-item').forEach(b => b.classList.remove('active'));
  const bm = { home: 'bn-home', challenge: 'bn-challenge', leaderboard: 'bn-leaderboard', profile: 'bn-profile', lesson: 'bn-lesson' };
  if (bm[id]) G(bm[id])?.classList.add('active');

  // Load leaderboard khi chuyển tab
  if (id === 'leaderboard') { loadLeaderboard(); }
  // Nếu chuyển về trang chủ và đã đăng nhập, làm mới dữ liệu
  if (id === 'home' && U) {
    renderIn();
  }
  // Khởi tạo trang bài học (lazy — chỉ lần đầu)
  if (id === 'lesson') {
    if (typeof initLessonPage === 'function' && !gp._lessonInited) {
      gp._lessonInited = true;
      initLessonPage();
    }
  }
}

// ══ PROFILE PAGE ══
function openProfile() {
  gp('profile');
  loadProfileFields();
  swPTab('info');
  // Khởi tạo drag-and-drop cho avatar wrapper
  setupAvatarDragDrop();
}

function setupAvatarDragDrop() {
  const wrap = document.querySelector('.ph-avatar-wrap');
  if (!wrap || wrap._ddInit) return;
  wrap._ddInit = true;
  ['dragenter', 'dragover'].forEach(ev => wrap.addEventListener(ev, e => {
    e.preventDefault(); wrap.classList.add('dragover');
  }));
  ['dragleave', 'drop'].forEach(ev => wrap.addEventListener(ev, e => {
    e.preventDefault(); wrap.classList.remove('dragover');
    if (ev === 'drop' && e.dataTransfer?.files[0]) uploadAvatar(e.dataTransfer.files[0]);
  }));
}

function swPTab(t) {
  ['info', 'sec'].forEach(id => {
    G('pc-' + id).classList.toggle('active', id === t);
    G('pt-' + id).classList.toggle('active', id === t);
  });
  // Clear alerts when switching
  setPA('info-alert', '', ''); setPA('sec-alert', '', '');
}

function loadProfileFields() {
  const p = U?.profile;
  const name = p?.full_name || U?.email?.split('@')[0] || '';
  const un = p?.username || '';
  const email = p?.email || U?.email || '';
  const dob = p?.date_of_birth || '';
  const ini = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
  const av = p?.avatar_url || '';

  // Header avatar
  const phAvEl = G('ph-av');
  if (phAvEl) {
    if (av) {
      phAvEl.innerHTML = `<img src="${av}" alt="${name}" class="av-img" onerror="this.parentElement.textContent='${ini}'">`;
    } else {
      phAvEl.textContent = ini;
    }
  }
  G('ph-name').textContent = name || 'Người dùng';
  G('ph-un').textContent = un ? `@${un}` : '';

  // Fields
  G('p-fullname').value = name;
  G('p-username').value = un;
  G('p-email').value = email;
  G('p-dob').value = dob;

  setPA('info-alert', '', '');
}

function setPA(id, type, msg) {
  const e = G(id);
  if (!e) return;
  e.textContent = msg;
  e.className = 'pf-abox' + (type ? ' ' + type : '');
}

async function saveInfo() {
  if (!sb || !U) return;
  const fn = G('p-fullname').value.trim();
  const un = G('p-username').value.trim();
  const dob = G('p-dob').value;
  setPA('info-alert', '', '');

  if (!fn) { setPA('info-alert', 'err', '⚠️ Họ và tên không được để trống'); return; }
  if (!un) { setPA('info-alert', 'err', '⚠️ Tên đăng nhập không được để trống'); return; }
  if (!/^[a-zA-Z0-9_]+$/.test(un)) { setPA('info-alert', 'err', '⚠️ Tên đăng nhập chỉ chứa chữ, số, dấu _'); return; }

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
    setPA('info-alert', 'ok', '✅ Lưu thành công!');
    toast('ok', '✅ Cập nhật hồ sơ thành công!');
    // Update header displays
    renderIn();
    loadProfileFields();
  } catch (e) {
    setPA('info-alert', 'err', '❌ ' + (e.message || 'Lỗi không xác định'));
  } finally {
    btn.disabled = false;
    G('p-save-info-txt').textContent = '💾 Lưu thay đổi';
  }
}

function ppws(pw) {
  let s = 0;
  if (pw.length >= 8) s++; if (/[A-Z]/.test(pw)) s++; if (/[0-9]/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++;
  const c = s <= 2 ? 'weak' : s === 3 ? 'medium' : 'strong';
  ['pp1', 'pp2', 'pp3', 'pp4'].forEach((id, i) => { G(id).className = 'pps' + (i < s ? ' ' + c : '') });
}

function peye(id, btn) {
  const i = G(id); i.type = i.type === 'password' ? 'text' : 'password';
  btn.textContent = i.type === 'password' ? '👁' : '🙈';
}

function clearPwForm() {
  ['p-pw-cur', 'p-pw-new', 'p-pw-cf'].forEach(id => { G(id).value = ''; });
  ['pp1', 'pp2', 'pp3', 'pp4'].forEach(id => { G(id).className = 'pps'; });
  setPA('sec-alert', '', '');
}

// ── PROFILE FORGOT PASSWORD MODAL ──
function openForgotFromProfile() {
  const email = U?.profile?.email || U?.email || '';
  G('pfp-email-display').textContent = email;
  G('pfp-sent-email').textContent = email;
  // Reset về trạng thái ban đầu
  G('pfp-body').style.display = 'block';
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

G('ov-pfp').addEventListener('click', function (e) { if (e.target === this) closePFP(); });

async function doSendProfileReset() {
  const email = U?.profile?.email || U?.email || '';
  if (!email) { alrt('a-pfp', 'err', '⚠️ Không tìm thấy email tài khoản'); return; }
  if (!sb) { alrt('a-pfp', 'err', '⚠️ Supabase chưa cấu hình'); return; }

  const btn = G('b-pfp'); btn.disabled = true;
  btn.querySelector('.bt').style.display = 'none';
  btn.querySelector('.bl').style.display = 'inline-flex';
  clrA('a-pfp');
  try {
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (error) throw error;
    G('pfp-body').style.display = 'none';
    G('pfp-success').style.display = 'block';
  } catch (e) {
    alrt('a-pfp', 'err', '❌ ' + (e.message || 'Lỗi không xác định'));
    btn.disabled = false;
    btn.querySelector('.bt').style.display = 'inline';
    btn.querySelector('.bl').style.display = 'none';
  }
}

async function savePw() {
  if (!sb || !U) return;
  const cur = G('p-pw-cur').value;
  const nw = G('p-pw-new').value;
  const cf = G('p-pw-cf').value;
  setPA('sec-alert', '', '');

  if (!cur || !nw || !cf) { setPA('sec-alert', 'err', '⚠️ Vui lòng điền đầy đủ thông tin'); return; }
  if (nw.length < 8) { setPA('sec-alert', 'err', '⚠️ Mật khẩu mới phải ít nhất 8 ký tự'); return; }
  if (nw !== cf) { setPA('sec-alert', 'err', '⚠️ Mật khẩu xác nhận không khớp'); return; }

  const btn = G('p-save-pw'); btn.disabled = true;
  G('p-save-pw-txt').textContent = '⏳ Đang xử lý...';
  try {
    // Re-authenticate first
    const email = U.profile?.email || U.email;
    const { error: reErr } = await sb.auth.signInWithPassword({ email, password: cur });
    if (reErr) { setPA('sec-alert', 'err', '❌ Mật khẩu hiện tại không đúng'); return; }

    const { error } = await sb.auth.updateUser({ password: nw });
    if (error) throw error;
    setPA('sec-alert', 'ok', '✅ Đổi mật khẩu thành công!');
    toast('ok', '🔒 Mật khẩu đã được cập nhật!');
    clearPwForm();
  } catch (e) {
    setPA('sec-alert', 'err', '❌ ' + (e.message || 'Lỗi không xác định'));
  } finally {
    btn.disabled = false;
    G('p-save-pw-txt').textContent = '🔒 Đổi Mật Khẩu';
  }
}

// ══════════════════════════════════════════════════════
//   GLORYCHEM ARENA — QUESTION BANK
// ══════════════════════════════════════════════════════
// ??? ARENA DATA SOURCE - Now dynamic from questions.json
let TOPICS = [];
let QUESTION_BANK = {};

async function loadCompetitionData() {
  try {
    const res = await fetch('questions.json');
    if (!res.ok) throw new Error('Không thể tải questions.json');
    const data = await res.json();
    
    if (data.TOPICS) {
      TOPICS = Object.entries(data.TOPICS).map(([id, info]) => ({
        id,
        name: info.name,
        icon: info.icon
      }));
    }
    
    if (data.QUESTION_BANK) {
      QUESTION_BANK = {};
      for (const [tid, qs] of Object.entries(data.QUESTION_BANK)) {
        QUESTION_BANK[tid] = qs.map(q => ({
          t: q.type || 'mcq',
          q: q.q,
          opts: q.opts,
          ans: q.correct !== undefined ? q.correct : 0,
          exp: q.exp,
          topicId: tid
        }));
      }
    }
    console.log('?? D? li?u Arena t? questions.json d du?c t?i:', TOPICS.length, 'ch? d?');
  } catch (e) {
    console.error('?? L?i loadCompetitionData:', e);
    // Fallback n?u fetch l?i
    TOPICS = [
      { id: 'acid-base', name: 'Axit  Baz?', icon: '??' },
      { id: 'redox', name: 'Oxi ha kh?', icon: '??' },
      { id: 'electro', name: 'Di?n ha', icon: '??' },
      { id: 'organic', name: 'Ha h?u c?', icon: '??' }
    ];
  }
}



// ══════════════════════════════════════════════════════
//   ARENA STATE
// ══════════════════════════════════════════════════════
let AR = {
  roomId: null, channel: null, presenceChannel: null,
  role: null,
  oppId: null, oppProfile: null,
  selectedTopics: [], ready: false,
  oppReady: false, oppTopics: [],
  lobbyTimer: null, lobbySec: 90,
  questions: [], qIndex: 0,
  myScore: 0, oppScore: 0,
  battleTimer: null, battleSec: 30,
  answered: false,
  oppAnswered: false,
  waitTimer: null, waitSec: 0,
  inviteFrom: null, inviteRoomId: null,
  waitingResponse: false,
  questionFinished: false,
  answerCooldown: false,
  cooldownTimer: null,
  cooldownInterval: null,
  // FFA fields
  isFFA: false,
  ffaPlayers: [],
  ffaScores: {},
  myUserId: null,
};


// ── HELPERS ──
function showArena(step) {
  ['ar-searching', 'ar-lobby', 'ar-battle', 'ar-result'].forEach(id => {
    const el = G(id);
    el.style.display = 'none';
    el.style.flexDirection = '';
  });
  G('arena-overlay').style.display = 'block';
  document.body.style.overflow = 'hidden';
  const el = G('ar-' + step);
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
    lobbySec: 90,
    questions: [],
    qIndex: 0,
    myScore: 0,
    oppScore: 0,
    battleTimer: null,
    battleSec: 30,
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
    totalQuestions: 0,
    isFFA: false,
    ffaPlayers: [],
    ffaScores: {},
    myUserId: null,
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
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
}

// ── BUILD QUESTION SET FROM TOPICS ──
function buildQuestions(topics) {
  const pool = [];
  topics.forEach(tid => {
    const qs = QUESTION_BANK[tid] || [];
    pool.push(...qs);
  });
  // Shuffle & take 10
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[pool[i], pool[j]] = [pool[j], pool[i]]; }
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

  if (!seconds || isNaN(seconds)) seconds = 90;

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

  if (AR.isFFA && AR.ffaPlayers && AR.ffaPlayers.length > 0) {
    // ── FFA mode: hiện grid tất cả players ──
    G('lobby-2p-area').style.display = 'none';
    const ffaArea = G('lobby-ffa-area');
    ffaArea.style.display = 'block';
    ffaArea.innerHTML = `
      <div class="ffa-lobby-header">👥 ${AR.ffaPlayers.length} người tham chiến</div>
      <div class="ffa-lobby-grid">
        ${AR.ffaPlayers.map(p => {
      const name = p.full_name || p.name || p.username || 'Người chơi';
      const isMe = p.userId === AR.myUserId;
      const ini = mkIni(name);
      const av = p.avatar_url || '';
      return `<div class="ffa-lobby-card${isMe ? ' me' : ''}">
            <div class="lpc-av">${av ? `<img src="${av}" style="width:100%;height:100%;border-radius:50%;object-fit:cover" onerror="this.parentElement.textContent='${ini}'" alt="">` : ini}</div>
            <div class="lpc-name" style="font-size:.82rem">${name.split(' ').pop()}${isMe ? ' <span style="color:var(--teal);font-size:.6rem">● Bạn</span>' : ''}</div>
            <div class="lpc-elo">ELO: ${p.elo || 1200}</div>
            <div id="lp-ready-${p.userId}" class="lpc-status wait">⏳ Chờ...</div>
          </div>`;
    }).join('')}
      </div>`;
  } else {
    // ── 1v1 mode: hiện 2 player dạng cũ ──
    G('lobby-2p-area').style.display = 'grid';
    G('lobby-ffa-area').style.display = 'none';
    const opp = AR.oppProfile;
    const oppName = opp?.full_name || opp?.username || 'Đối thủ';
    const myAv = U?.profile?.avatar_url || '';
    const oppAv = opp?.avatar_url || '';
    setAvEl(G('lp-me-av'), me.name, myAv);
    G('lp-me-name').textContent = me.name;
    G('lp-me-elo').textContent = `ELO: ${me.elo}`;
    G('lp-me-rec').textContent = `${me.wins}W — ${me.losses}L`;
    setAvEl(G('lp-opp-av'), oppName, oppAv);
    G('lp-opp-name').textContent = oppName;
    G('lp-opp-elo').textContent = `ELO: ${opp?.elo || 1200}`;
    const oppWins = opp?.wins || 0, oppLosses = opp?.losses || 0;
    G('lp-opp-rec').textContent = `${oppWins}W — ${oppLosses}L`;
  }

  // Chọn chủ đề (giống nhau cho cả 2 mode)
  // Nhóm chủ đề theo khối lớp để dễ chọn
  const cats = {
    "Lớp 10": ["atomic", "periodic", "chemical-bonds", "redox", "thermo", "speed", "halogens", "equilib"],
    "Lớp 11": ["nitrogen", "sulfur", "organic", "hydrocarbon", "halogen-deriv", "alcohol-phenol", "carbonyl", "carboxylic"],
    "Lớp 12": ["ester-lipid", "carbohydrate", "nitrogen-compounds", "polymer", "electro", "metals", "alkali-alkaline", "aluminum", "transition-complex"]
  };

  const tg = G('topic-grid');
  tg.innerHTML = '';
  
  for (const catName in cats) {
    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'topic-cat-title';
    sectionTitle.textContent = catName;
    tg.appendChild(sectionTitle);

    const grid = document.createElement('div');
    grid.className = 'topic-grid';
    
    const catTopicIds = cats[catName];
    const catTopics = TOPICS.filter(t => catTopicIds.includes(t.id));
    
    catTopics.forEach(tp => {
      const btn = document.createElement('button');
      btn.className = 'topic-btn';
      btn.innerHTML = `<span class="topic-btn-icon">${tp.icon}</span><span class="topic-btn-name">${tp.name}</span>`;
      btn.dataset.id = tp.id;
      btn.onclick = () => toggleTopic(tp.id, btn);
      grid.appendChild(btn);
    });
    tg.appendChild(grid);
  }

  AR.selectedTopics = [];
  AR.ready = false;
  AR.oppReady = false;
  G('topic-count').textContent = '0';
  startLobbyCountdown(AR.lobbySec || 90);
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
    AR.selectedTopics = AR.selectedTopics.filter(t => t !== tid);
    btn.classList.remove('selected');
  } else {
    if (AR.selectedTopics.length >= 3) { toast('err', '⚠️ Chỉ chọn tối đa 3 chủ đề!'); return; }
    AR.selectedTopics.push(tid);
    btn.classList.add('selected');
  }
  G('topic-count').textContent = AR.selectedTopics.length;
}
function setReady() {
  if (AR.selectedTopics.length === 0) {
    AR.selectedTopics = TOPICS.map(t => t.id).sort(() => Math.random() - 0.5).slice(0, 3);
  }
  AR.ready = true;
  if (AR.isFFA) {
    const myReadyEl = G('lp-ready-' + (AR.myUserId || U?.id));
    if (myReadyEl) { myReadyEl.textContent = '✅ Sẵn sàng!'; myReadyEl.className = 'lpc-status ready'; }
    G('btn-ready').disabled = true;
    G('btn-ready').style.opacity = '.6';
  } else {
    updateMeReadyUI();
  }
  socket.emit('lobby_action', {
    roomId: currentRoomId,
    topics: AR.selectedTopics,
    ready: true
  });
}

function autoReady() {
  if (!AR.ready) {
    if (AR.selectedTopics.length === 0)
      AR.selectedTopics = TOPICS.map(t => t.id).sort(() => Math.random() - .5).slice(0, 3);
    setReady();
  }
}

function handleLobbyAction(payload) {
  if (payload.userId === U.id) return;
  if (payload.type === 'player_ready') {
    if (AR.isFFA) {
      const readyEl = G('lp-ready-' + payload.userId);
      if (readyEl) { readyEl.textContent = '✅ Sẵn sàng!'; readyEl.className = 'lpc-status ready'; }
    } else {
      AR.oppReady = true;
      AR.oppTopics = payload.topics || [];
      G('lp-opp-ready').textContent = '✅ Sẵn sàng!';
      G('lp-opp-ready').className = 'lpc-status ready';
      checkBothReady();
    }
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
  catch (e) { qs = buildQuestions(AR.selectedTopics.length ? AR.selectedTopics : ['atomic', 'periodic']); }
  AR.questions = qs;
  AR.qIndex = 0; AR.myScore = 0; AR.oppScore = 0;

  if (AR.isFFA) {
    AR.ffaScores = {};
    (AR.ffaPlayers || []).forEach(p => { AR.ffaScores[p.userId] = 0; });
    G('battle-2p-scoreboard').style.display = 'none';
    const ffaSb = G('ffa-scoreboard');
    if (ffaSb) { ffaSb.style.display = 'flex'; renderFfaScoreboard(); }
  } else {
    const me = getMyInfo();
    const oppName = AR.oppProfile?.full_name || AR.oppProfile?.username || 'Đối thủ';
    const myAv = U?.profile?.avatar_url || '';
    const oppAv = AR.oppProfile?.avatar_url || '';
    setAvEl(G('bs-me-av'), me.name, myAv);
    G('bs-me-name').textContent = me.name;
    setAvEl(G('bs-opp-av'), oppName, oppAv);
    G('bs-opp-name').textContent = oppName;
    updateBattleScore();
  }

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
  if (AR.isFFA) {
    G('battle-2p-scoreboard').style.display = 'none';
    const ffaSb = G('ffa-scoreboard');
    if (ffaSb) ffaSb.style.display = 'flex';
  } else {
    G('battle-2p-scoreboard').style.display = '';
    const ffaSb = G('ffa-scoreboard');
    if (ffaSb) ffaSb.style.display = 'none';
    const oppName = AR.oppProfile?.full_name || AR.oppProfile?.username || 'Đối thủ';
    const myAv = U?.profile?.avatar_url || '';
    const oppAv = AR.oppProfile?.avatar_url || '';
    setAvEl(G('bs-me-av'), me.name, myAv);
    G('bs-me-name').textContent = me.name;
    setAvEl(G('bs-opp-av'), oppName, oppAv);
    G('bs-opp-name').textContent = oppName;
  }
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
      btn.innerHTML = `<div class=\"mcq-num-label\">${['A', 'B', 'C', 'D'][i]}</div><div class=\"mcq-text-content\">${opt}</div>`;
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

  const topicName = TOPICS.find(t => t.id === q.topicId)?.name || '';
  G('battle-q-num').textContent = `Câu ${AR.qIndex + 1}/${AR.questions.length}`;
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
      btn.innerHTML = `<div class=\"mcq-num-label\">${['A', 'B', 'C', 'D'][i]}</div><div class=\"mcq-text-content\">${opt}</div>`;
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
  await AR.channel?.send({
    type: 'broadcast', event: 'battle_action', payload: {
      type: 'answered', userId: U.id, correct, qIndex: AR.qIndex
    }
  });
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
  if (AR.isFFA) {
    renderFfaScoreboard();
  } else {
    G('bs-me-score').textContent = AR.myScore;
    G('bs-opp-score').textContent = AR.oppScore;
  }
}

function renderFfaScoreboard() {
  const sb = G('ffa-scoreboard');
  if (!sb) return;
  const players = [...(AR.ffaPlayers || [])];
  players.sort((a, b) => (AR.ffaScores[b.userId] || 0) - (AR.ffaScores[a.userId] || 0));
  const rankEmojis = ['🥇', '🥈', '🥉'];
  sb.innerHTML = players.map((p, idx) => {
    const score = AR.ffaScores[p.userId] || 0;
    const isMe = p.userId === (AR.myUserId || U?.id);
    const name = (p.full_name || p.name || p.username || 'Người chơi').split(' ').pop();
    const ini = mkIni(p.full_name || p.name || '?');
    const rank = rankEmojis[idx] || `${idx + 1}.`;
    return `<div class="ffa-sb-row${isMe ? ' me' : ''}">
      <div class="ffa-sb-rank">${rank}</div>
      <div class="ffa-sb-av">${ini}</div>
      <div class="ffa-sb-name">${name}${isMe ? ' <span style="font-size:.6rem;color:var(--teal)">(Bạn)</span>' : ''}</div>
      <div class="ffa-sb-score">${score}</div>
    </div>`;
  }).join('');
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
  const isFfa = AR.isFFA || data?.mode === 'ffa';

  if (isFfa) {
    // ── Kết quả FFA ──
    const scores = data?.scores || AR.ffaScores || {};
    const eloChanges = data?.elo_change || {};
    const winnerUid = data?.winnerUserId;
    const myScore = scores[me.id] || 0;
    const myEloChange = eloChanges[me.id] || 0;

    const players = [...(AR.ffaPlayers || [])];
    players.sort((a, b) => (scores[b.userId] || 0) - (scores[a.userId] || 0));
    const myRank = players.findIndex(p => p.userId === me.id) + 1;
    const rankEmojis = ['🏆', '🥈', '🥉'];

    G('result-emoji').textContent = rankEmojis[myRank - 1] || '💪';
    G('result-title').textContent = myRank === 1 ? 'Chiến Thắng!' : myRank === 2 ? 'Á Quân!' : myRank === 3 ? 'Hạng Ba!' : 'Tiếp Tục Cố!';
    G('result-sub').textContent = `Bạn xếp hạng #${myRank} trong số ${players.length} người chơi`;

    // Ẩn bảng 2p, hiện FFA ranked list
    const twoCard = G('result-2p-scores');
    if (twoCard) twoCard.style.display = 'none';
    const ffaList = G('ffa-result-list');
    if (ffaList) {
      ffaList.style.display = 'block';
      ffaList.innerHTML = players.map((p, idx) => {
        const pScore = scores[p.userId] || 0;
        const pElo = eloChanges[p.userId] || 0;
        const isMe = p.userId === me.id;
        const name = p.full_name || p.name || p.username || 'Người chơi';
        const ini = mkIni(name);
        const badge = rankEmojis[idx] || `#${idx + 1}`;
        return `<div class="ffa-result-row${isMe ? ' me' : ''}">
          <div class="ffa-result-rank">${badge}</div>
          <div class="ffa-result-av">${ini}</div>
          <div class="ffa-result-info">
            <div class="ffa-result-name">${name.split(' ').pop()}${isMe ? ' <span style="color:var(--teal);font-size:.6rem">● Bạn</span>' : ''}</div>
            <div class="ffa-result-elo" style="color:${pElo >= 0 ? 'var(--green)' : 'var(--rose)'}">${pElo >= 0 ? '+' : ''}${pElo} ELO</div>
          </div>
          <div class="ffa-result-score">${pScore}</div>
        </div>`;
      }).join('');
    }

    const eloEl = G('result-elo-change');
    if (myEloChange > 0) { eloEl.textContent = `📈 +${myEloChange} ELO`; eloEl.style.background = 'var(--green-lt)'; eloEl.style.color = 'var(--green)'; }
    else if (myEloChange < 0) { eloEl.textContent = `📉 ${myEloChange} ELO`; eloEl.style.background = 'var(--rose-lt)'; eloEl.style.color = 'var(--rose)'; }
    else { eloEl.textContent = `📊 ELO không đổi`; eloEl.style.background = 'var(--amber-lt)'; eloEl.style.color = 'var(--amber)'; }

    addToHistory({ win: myRank === 1, myScore, oppScore: scores[winnerUid] || 0, oppName: players[0]?.full_name || 'Người chơi', eloChange: myEloChange });

  } else {
    // ── Kết quả 1v1 ──
    let scores = data?.scores;
    if (!scores) { scores = {}; scores[me.id] = AR.myScore; scores[AR.oppId] = AR.oppScore; }
    const myScore = scores[me.id] || 0;
    const oppScore = scores[AR.oppId] || 0;
    const win = myScore > oppScore;
    const draw = myScore === oppScore;
    const oppName = AR.oppProfile?.full_name || AR.oppProfile?.username || 'Đối thủ';

    G('result-emoji').textContent = win ? '🏆' : draw ? '🤝' : '💪';
    G('result-title').textContent = win ? 'Chiến Thắng!' : draw ? 'Hòa!' : 'Thất Bại!';
    G('result-sub').textContent = win ? 'Xuất sắc!' : draw ? 'Màn trình diễn ngang tài ngang sức!' : 'Cố lên!';
    G('rs-me-score').textContent = myScore;
    G('rs-opp-score').textContent = oppScore;
    G('rs-me-name').textContent = me.name;
    G('rs-opp-name').textContent = oppName;

    const twoCard = G('result-2p-scores');
    if (twoCard) twoCard.style.display = '';
    const ffaList = G('ffa-result-list');
    if (ffaList) ffaList.style.display = 'none';

    let eloChange = 0;
    if (data?.elo_change && typeof data.elo_change === 'object') eloChange = data.elo_change[me.id] || 0;
    else eloChange = win ? 20 : draw ? 0 : -15;

    const eloEl = G('result-elo-change');
    if (eloChange > 0) { eloEl.textContent = `📈 +${eloChange} ELO`; eloEl.style.background = 'var(--green-lt)'; eloEl.style.color = 'var(--green)'; }
    else if (eloChange < 0) { eloEl.textContent = `📉 ${eloChange} ELO`; eloEl.style.background = 'var(--rose-lt)'; eloEl.style.color = 'var(--rose)'; }
    else { eloEl.textContent = `📊 ELO không đổi`; eloEl.style.background = 'var(--amber-lt)'; eloEl.style.color = 'var(--amber)'; }

    addToHistory({ win, myScore, oppScore, oppName, eloChange });
  }

  showArena('result');
  cleanupRoom();
}

// Hàm phụ trợ để xác định rank theo ELO (có thể đặt ở đâu đó)
function getRankFromElo(elo) {
  if (elo < 1300) return 'Electron';
  if (elo < 1500) return 'Nguyên Tử';
  if (elo < 1700) return 'Phân Tử';
  if (elo < 1900) return 'Thách Đấu';
  return 'Chiến Thần';
}
function addToHistory(entry) {
  const list = G('hist-list');
  const old = list.querySelector('.hist-empty');
  if (old) old.remove();
  const d = document.createElement('div');
  d.style.cssText = 'display:flex;align-items:center;gap:.75rem;padding:.65rem .85rem;border:1px solid var(--border);border-radius:10px;background:var(--bg-white);margin-bottom:.4rem';
  d.innerHTML = `<span style="font-size:1.3rem">${entry.win ? '🏆' : '💪'}</span><div style="flex:1"><div style="font-weight:700;font-size:.85rem;font-family:var(--font-h)">${entry.win ? 'Thắng' : 'Thua'} vs ${entry.oppName}</div><div style="font-size:.75rem;color:var(--text-3)">${entry.myScore} – ${entry.oppScore}</div></div><div style="font-size:.8rem;font-weight:700;color:${entry.eloChange >= 0 ? 'var(--green)' : 'var(--rose)'}">${entry.eloChange >= 0 ? '+' : ''}${entry.eloChange} ELO</div>`;
  list.prepend(d);
}

// ══════════════════════════════════════════════════════
//   GLOBAL PRESENCE — realtime online tracking
// ══════════════════════════════════════════════════════
let PRESENCE_CH = null;
let ONLINE_USERS = {}; // { userId: presenceData }
let onlineUsers = {};           // key = userId, value = user data

let FA = { selectedUser: null, inviteRoomId: null }; // cho mời bạn bè


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
      const NEW_USERS = {};
      Object.values(state).forEach(presences => {
        const p = presences[0];
        if (p && p.userId && p.userId !== U.id) {
          // Lấy status từ list cũ nếu có (ưu tiên Socket.io status)
          if (ONLINE_USERS[p.userId] && ONLINE_USERS[p.userId].status) {
            p.status = ONLINE_USERS[p.userId].status;
          }
          NEW_USERS[p.userId] = p;
        }
      });
      // Thay vì overwrite hoàn toàn, chúng ta chỉ thay các user từ sync
      // Nhưng sync của Supabase là full state, nên ta gán NEW_USERS
      // Tuy nhiên cần cẩn thận không để mất status nếu Socket.io vừa update
      ONLINE_USERS = NEW_USERS;
      updateOnlineCount();
      refreshOnlineUI();
    })
    .on('presence', { event: 'join' }, ({ newPresences }) => {
      newPresences.forEach(p => {
        if (p.userId && p.userId !== U.id) {
          // Merge với data cũ: giữ lại status nếu Supabase join ko có status
          const existing = ONLINE_USERS[p.userId] || {};
          ONLINE_USERS[p.userId] = { ...existing, ...p };
          if (existing.status && !p.status) {
            ONLINE_USERS[p.userId].status = existing.status;
          }
        }
      });
      updateOnlineCount();
      refreshOnlineUI();
    })
    .on('presence', { event: 'leave' }, ({ leftPresences }) => {
      leftPresences.forEach(p => { if (p.userId) delete ONLINE_USERS[p.userId]; });
      updateOnlineCount();
      refreshOnlineUI();
    })
    .subscribe(async (status, err) => {
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
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        console.warn('[Supabase] Presence channel error:', status, err);
        // Tự động tái kết nối sau 3 giây
        setTimeout(() => joinGlobalPresence(), 3000);
      }
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
  if (G('ov-lobby-detail')?.classList.contains('open')) {
    const q = G('friend-search')?.value?.trim() || '';
    renderOnlinePlayers(Object.values(ONLINE_USERS), q);
  }
}

// ══════════════════════════════════════════════════════
//   FRIEND ARENA
// ══════════════════════════════════════════════════════

function renderOnlinePlayers(players, query = '') {
  const list = G('online-list');
  if (!list) return;
  let filtered = players;
  if (query) {
    const q = query.toLowerCase();
    filtered = players.filter(p =>
      (p.name || p.full_name || p.username || '').toLowerCase().includes(q) ||
      (p.username || '').toLowerCase().includes(q)
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
    const status = p.status || 'free';

    let btnHtml = '';
    if (status === 'battle') {
      btnHtml = `<button class="btn btn-secondary btn-invite-friend" style="padding:.4rem .8rem;font-size:.70rem;border-radius:8px;background:var(--bg-3);color:var(--text-4);opacity:0.8;box-shadow:none;border:1px solid var(--border-2)" disabled>Đang đấu</button>`;
    } else if (status === 'lobby') {
      btnHtml = `<button class="btn btn-secondary btn-invite-friend" style="padding:.4rem .8rem;font-size:.70rem;border-radius:8px;background:var(--bg-3);color:var(--text-4);opacity:0.8;box-shadow:none;border:1px solid var(--border-2)" disabled>Trong nhóm</button>`;
    } else {
      btnHtml = `<button class="btn btn-teal btn-invite-friend" style="padding:.4rem .8rem;font-size:.75rem;border-radius:8px;" onclick="sendInviteDirectly(this, '${p.userId}')">Mời</button>`;
    }

    const row = document.createElement('div');
    row.className = 'online-player-row';
    row.style.cursor = 'default';
    row.innerHTML = `
      <div class="opr-av">${mkIni(name)}</div>
      <div style="flex:1">
        <div class="opr-name">${name}</div>
        <div style="font-size:.73rem;color:var(--text-4)">@${p.username || ''}</div>
      </div>
      <div class="opr-elo" style="margin-right:.5rem;">⚡ ${p.elo || 1200}</div>
      ${btnHtml}
      <div class="online-dot" title="Online" style="margin-left:.4rem;${status !== 'free' ? 'background:var(--amber)' : ''}"></div>`;
    list.appendChild(row);
  });
}

function searchFriends(query) {
  renderOnlinePlayers(Object.values(ONLINE_USERS), query);
}

function sendInviteDirectly(btn, userId) {
  if (!currentLobbyRoomId && !FA.inviteRoomId) return;
  const roomId = currentLobbyRoomId || FA.inviteRoomId;
  socket.emit('invite_friend', { toUserId: userId, roomId: roomId });

  const originalText = btn.innerText;
  btn.innerText = "Đã gửi lời mời!";
  btn.style.background = 'transparent';
  btn.style.color = 'var(--text-3)';
  btn.style.border = '1px solid var(--border-2)';
  btn.style.boxShadow = 'none';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerText = "Mời";
    btn.style.background = '';
    btn.style.color = '';
    btn.style.border = '';
    btn.style.boxShadow = '';
    btn.disabled = false;
  }, 10000);
}



function cancelInvite() {
  if (AR.roomId) sb.from('battle_rooms').delete().eq('id', AR.roomId).then(() => { });
  G('friend-waiting').style.display = 'none';
  G('friend-selected').style.display = 'none';
  cleanupRoom();
}

function subscribeToInvites() {
  if (!U) return;
  FA.inviteChannel = sb.channel('invites:' + U.id)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'battle_invites', filter: `to_id=eq.${U.id}` },
      async ({ new: inv }) => {
        // Load invite room & sender
        const { data: room } = await sb.from('battle_rooms').select('*').eq('id', inv.room_id).single();
        if (!room || room.status !== 'invited') return;
        const { data: sender } = await sb.from('profiles').select('*').eq('id', inv.from_id).single();
        AR.inviteFrom = inv.from_id;
        AR.inviteRoomId = inv.room_id;
        AR.oppProfile = sender;
        const senderName = sender?.full_name || sender?.username || 'Ai đó';
        G('inv-from-name').textContent = senderName;
        G('inv-from-elo').textContent = `⚡ ELO: ${sender?.elo || 1200}`;
        G('ov-invite').classList.add('open');
      })
    .subscribe();
}

function acceptInvite() {
  G('ov-invite').classList.remove('open');
  socket.emit('invite_response', {
    roomId: AR.inviteRoomId,
    accept: true
  });
  // Server sẽ gửi match_found cho cả hai người sau đó
}

async function rejectInvite() {
  G('ov-invite').classList.remove('open');
  if (AR.inviteRoomId) await sb.from('battle_rooms').update({ status: 'rejected' }).eq('id', AR.inviteRoomId);
  AR.inviteFrom = null; AR.inviteRoomId = null;
}

// ══════════════════════════════════
//   ENHANCED CHEMISTRY PARTICLE SYSTEM
// ══════════════════════════════════
(function () {
  const canvas = G('pc');
  const ctx = canvas.getContext('2d');
  let W, H, pts = [], mols = [], bubbles = [], rings = [];
  const COLS = ['#0d9488', '#2563eb', '#7c3aed', '#0891b2', '#059669', '#0284c7'];
  const ELEMENTS = ['H', 'C', 'O', 'N', 'Fe', 'Cu', 'Na', 'Cl', 'Mg', 'Ca', 'K', 'S'];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  // Floating atom particle
  function mkPt() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5,
      r: Math.random() * 2.5 + 1,
      col: COLS[Math.floor(Math.random() * COLS.length)],
      a: Math.random() * .28 + .08,
      ph: Math.random() * Math.PI * 2,
    };
  }

  // Molecule cluster
  function mkMol() {
    const cx = Math.random() * W, cy = Math.random() * H;
    const n = Math.floor(Math.random() * 4) + 2;
    const col = COLS[Math.floor(Math.random() * COLS.length)];
    const nodes = [{ x: cx, y: cy, r: 5, el: ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)] }];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + Math.random() * .3;
      const d = 22 + Math.random() * 18;
      nodes.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, r: 3.5 + Math.random(), el: ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)] });
    }
    return { nodes, col, a: 0.08 + Math.random() * .07, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, ph: Math.random() * Math.PI * 2, rot: 0, rotV: (Math.random() - .5) * .005 };
  }

  // Electron orbit ring
  function mkRing() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      rx: 30 + Math.random() * 25, ry: 12 + Math.random() * 10,
      rot: Math.random() * Math.PI,
      col: COLS[Math.floor(Math.random() * COLS.length)],
      a: .04 + Math.random() * .04,
      speed: .012 + Math.random() * .018,
      angle: Math.random() * Math.PI * 2,
      vx: (Math.random() - .5) * .18, vy: (Math.random() - .5) * .18,
    };
  }

  // Rising bubble
  function mkBubble() {
    return {
      x: Math.random() * W,
      y: H + 20,
      r: 4 + Math.random() * 12,
      vy: -(0.3 + Math.random() * .5),
      a: .05 + Math.random() * .06,
      col: COLS[Math.floor(Math.random() * COLS.length)],
      wobble: Math.random() * Math.PI * 2,
      wobbleS: .02 + Math.random() * .02,
    };
  }

  function setup() {
    pts = Array.from({ length: 55 }, mkPt);
    mols = Array.from({ length: 8 }, mkMol);
    rings = Array.from({ length: 6 }, mkRing);
    bubbles = Array.from({ length: 12 }, mkBubble);
  }

  function hexA(a) { return Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0'); }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() / 1000;

    // ─ ELECTRON ORBIT RINGS ─
    rings.forEach(rg => {
      rg.angle += rg.speed;
      rg.x += rg.vx; rg.y += rg.vy;
      if (rg.x < -80 || rg.x > W + 80) rg.vx *= -1;
      if (rg.y < -80 || rg.y > H + 80) rg.vy *= -1;

      ctx.save();
      ctx.translate(rg.x, rg.y);
      ctx.rotate(rg.rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, rg.rx, rg.ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = rg.col + hexA(rg.a);
      ctx.lineWidth = 1;
      ctx.stroke();

      // Electron dot on ring
      const ex = Math.cos(rg.angle) * rg.rx;
      const ey = Math.sin(rg.angle) * rg.ry;
      ctx.beginPath(); ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = rg.col + hexA(rg.a * 3.5);
      ctx.fill();
      // Electron glow
      const g = ctx.createRadialGradient(ex, ey, 0, ex, ey, 8);
      g.addColorStop(0, rg.col + hexA(rg.a * 2.5)); g.addColorStop(1, rg.col + '00');
      ctx.beginPath(); ctx.arc(ex, ey, 8, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();

      ctx.restore();
    });

    // ─ RISING BUBBLES ─
    bubbles.forEach(b => {
      b.wobble += b.wobbleS;
      b.y += b.vy;
      b.x += Math.sin(b.wobble) * 0.5;
      if (b.y < -b.r * 2) {
        b.y = H + b.r; b.x = Math.random() * W;
        b.r = 4 + Math.random() * 12;
      }
      const prog = 1 - Math.max(0, (-b.y + H) / (H + b.r * 2));
      const oa = b.a * (1 - prog * .6);
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = b.col + hexA(oa * 1.8);
      ctx.lineWidth = .8;
      ctx.stroke();
      // Highlight
      ctx.beginPath(); ctx.arc(b.x - b.r * .28, b.y - b.r * .28, b.r * .22, 0, Math.PI * 2);
      ctx.fillStyle = '#fff' + hexA(oa * .5);
      ctx.fill();
    });

    // ─ MOLECULE CLUSTERS ─
    mols.forEach(m => {
      m.ph += .006;
      m.rot += m.rotV;
      const oa = m.a + Math.sin(m.ph) * .022;
      m.nodes.forEach(nd => { nd.x += m.vx; nd.y += m.vy; });
      const c = m.nodes[0];
      if (c.x < -80 || c.x > W + 80) m.vx *= -1;
      if (c.y < -80 || c.y > H + 80) m.vy *= -1;

      // Bonds
      ctx.lineWidth = 1.5;
      for (let i = 1; i < m.nodes.length; i++) {
        ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(m.nodes[i].x, m.nodes[i].y);
        ctx.strokeStyle = m.col + hexA(oa * .85); ctx.stroke();
        if (i % 2 === 0) {
          const dx = m.nodes[i].x - c.x, dy = m.nodes[i].y - c.y;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const ox = -dy / len * 4, oy = dx / len * 4;
          ctx.beginPath(); ctx.moveTo(c.x + ox, c.y + oy); ctx.lineTo(m.nodes[i].x + ox, m.nodes[i].y + oy);
          ctx.strokeStyle = m.col + hexA(oa * .38); ctx.stroke();
        }
      }
      // Atoms
      m.nodes.forEach(nd => {
        ctx.beginPath(); ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
        ctx.fillStyle = m.col + hexA(oa * 1.5); ctx.fill();
        const g = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, nd.r * 3.2);
        g.addColorStop(0, m.col + hexA(oa * .45)); g.addColorStop(1, m.col + '00');
        ctx.beginPath(); ctx.arc(nd.x, nd.y, nd.r * 3.2, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      });
    });

    // ─ FLOATING PARTICLES + CONNECTIONS ─
    const maxD = 110;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.ph += .016; p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.col + hexA((1 - d / maxD) * .12);
          ctx.lineWidth = .6; ctx.stroke();
        }
      }
      const pr = p.r + Math.sin(p.ph) * .5;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pr * 4);
      g.addColorStop(0, p.col + hexA(p.a * .75)); g.addColorStop(1, p.col + '00');
      ctx.beginPath(); ctx.arc(p.x, p.y, pr * 4, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, pr, 0, Math.PI * 2);
      ctx.fillStyle = p.col + hexA(p.a * 1.9); ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); setup(); });
  resize(); setup(); draw();
})();

// ══════════════════════════════════════
//   DISCONNECT BANNER — hiện khi mất kết nối
// ══════════════════════════════════════
(function _setupDisconnectBanner() {
  if (document.getElementById('gc-disconnect-banner')) return;
  const style = document.createElement('style');
  style.textContent = `
    #gc-disconnect-banner {
      position:fixed;bottom:0;left:0;right:0;z-index:99999;
      background:#dc2626;color:#fff;text-align:center;
      padding:.55rem 1rem;font-size:.82rem;font-weight:600;letter-spacing:.01em;
      display:flex;align-items:center;justify-content:center;gap:.5rem;
      transform:translateY(100%);transition:transform .35s cubic-bezier(.4,0,.2,1);
      box-shadow:0 -2px 12px rgba(0,0,0,.18);
    }
    #gc-disconnect-banner.visible { transform:translateY(0); }
    @keyframes _gcSpin { to { transform:rotate(360deg); } }
    #gc-disconnect-banner .gc-spin { display:inline-block; animation:_gcSpin 1s linear infinite; }
  `;
  document.head.appendChild(style);
  const el = document.createElement('div');
  el.id = 'gc-disconnect-banner';
  el.innerHTML = `<span class="gc-spin">🔄</span><span id="gc-disc-msg">Đang kết nối lại máy chủ...</span>`;
  document.body.appendChild(el);
})();

function _showDisconnectBanner(attempt) {
  const el = document.getElementById('gc-disconnect-banner');
  const msg = document.getElementById('gc-disc-msg');
  if (msg) msg.textContent = attempt
    ? `Đang kết nối lại... (lần ${attempt})`
    : 'Mất kết nối — Đang thử kết nối lại...';
  if (el) el.classList.add('visible');
}

function _hideDisconnectBanner() {
  const el = document.getElementById('gc-disconnect-banner');
  if (el) el.classList.remove('visible');
}

// ══════════════════════════════════════
//   SOCKET INIT — chỉ gọi 1 lần
// ══════════════════════════════════════
let socket = null;
let currentRoomId = null;

function initSocket() {
  if (socket && socket.connected) return; // Đã kết nối rồi, không init lại
  if (socket) { socket.removeAllListeners(); socket.disconnect(); }

  socket = io({
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
    reconnectionAttempts: Infinity,
    timeout: 20000,
  });

  socket.on('connect', () => {
    if (!U) return;
    socket.emit('presence:join', {
      userId: U.id,
      full_name: U.profile?.full_name || U.email?.split('@')[0],
      username: U.profile?.username || '',
      elo: U.profile?.elo || 1200,
      wins: U.profile?.wins || 0,
      losses: U.profile?.losses || 0,
      avatar_url: U.profile?.avatar_url || '',
    });
  });

  socket.on('presence_list', (users) => {
    // Không reset ONLINE_USERS = {} kẻo mất data từ Supabase
    users.forEach(u => {
      if (!u.userId) return;
      if (u.userId === U?.id) {
        if (U && U.profile) {
          if (u.elo && u.elo !== U.profile.elo) U.profile.elo = u.elo;
          if (u.wins !== undefined && u.wins !== U.profile.wins) U.profile.wins = u.wins;
          if (u.losses !== undefined && u.losses !== U.profile.losses) U.profile.losses = u.losses;
        }
        return;
      }
      // Merge: Socket.IO data (có status) luôn được ưu tiên
      ONLINE_USERS[u.userId] = { ...(ONLINE_USERS[u.userId] || {}), ...u };
    });
    updateOnlineCount();
    refreshOnlineUI();
  });

  socket.on('presence_update', (users) => {
    // Giữ lại list hiện tại, chỉ update những user có trong payload
    // Những ai không có trong payload Socket.IO presence_update (full list server) 
    // thì vẫn giữ lại data Supabase nhưng reset status (vì server bảo họ ko còn trong room nào)
    const socketUserIds = new Set(users.map(u => u.userId).filter(id => id));

    users.forEach(u => {
      if (!u.userId) return;
      if (u.userId === U?.id) {
        if (U && U.profile) {
          if (u.elo && u.elo !== U.profile.elo) U.profile.elo = u.elo;
          if (u.wins !== undefined && u.wins !== U.profile.wins) U.profile.wins = u.wins;
          if (u.losses !== undefined && u.losses !== U.profile.losses) U.profile.losses = u.losses;
        }
        return;
      }
      ONLINE_USERS[u.userId] = { ...(ONLINE_USERS[u.userId] || {}), ...u };
    });

    // Những user có trong ONLINE_USERS nhưng KHÔNG có trong list Socket.io vừa gửi
    // nghĩa là họ không online trên socket (hoặc vừa disconnect). 
    // Ta xóa status của họ.
    Object.keys(ONLINE_USERS).forEach(uid => {
      if (!socketUserIds.has(uid)) {
        if (ONLINE_USERS[uid].status) delete ONLINE_USERS[uid].status;
        // Nếu muốn gỡ hẳn khỏi list khi họ cũng ko có trên Supabase thì làm ở leave event
      }
    });

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
      disableBattleInputs(true);
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
        disableBattleInputs(true);
        if (AR.cooldownInterval) clearInterval(AR.cooldownInterval);

        showCooldownOverlay(3, () => {
          if (!AR.questionFinished) {
            AR.answerCooldown = false;
            disableBattleInputs(false);
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

  socket.on('match_found', async (data) => {
    // Safety check optionally close any old lobby if necessary
    G('ov-lobby-detail')?.classList.remove('open');
    G('ov-invite')?.classList.remove('open');
    clearTimeout(AR.waitTimer);
    currentRoomId = data.roomId;
    AR.roomId = data.roomId;
    AR.role = data.role;
    AR.oppId = data.opponent.userId;
    AR.oppProfile = data.opponent;

    // Gửi join_room NGAY LẬP TỨC trước khi enterLobby (async)
    socket.emit('join_room', { roomId: data.roomId });

    const overlay = document.getElementById('cooldown-overlay');
    if (overlay) overlay.style.display = 'none';
    if (AR.waitTimer) clearInterval(AR.waitTimer);
    await enterLobby();
  });

  socket.on('lobby_start', (data) => {
    AR.lobbySec = data.timeout;
    startLobbyCountdown(data.timeout);
  });


  socket.on('lobby_rooms_list', (rooms) => {
    lobbyRoomsList = rooms;
    renderLobbyRoomsList(rooms);
  });

  socket.on('lobby_room_created', (data) => {
    const btn = document.getElementById('b-create-room');
    if (btn) {
      btn.disabled = false;
      btn.querySelector('.bt').style.display = 'inline';
      btn.querySelector('.bl').style.display = 'none';
    }
    toast('ok', `✅ Đã tạo phòng "${data.room.name}"`);
    currentLobbyRoomId = data.roomId;
    showLobbyRoomDetails(data.room);
  });

  socket.on('lobby_room_joined', (data) => {
    currentLobbyRoomId = data.roomId;
    showLobbyRoomDetails(data.room);
  });

  socket.on('lobby_room_update', (data) => {
    if (currentLobbyRoomId === data.roomId) {
      currentLobbyRoom = data;
      renderLobbyRoomPlayers(data.players, data.host_sid, data.ready_players || []);
      const countEl = document.getElementById('lobby-player-count');
      if (countEl) countEl.textContent = Object.keys(data.players || {}).length;
    }
  });

  socket.on('lobby_battle_start', (data) => {
    // Đóng các modal lobby khi bắt đầu trận đấu
    document.getElementById('ov-lobby')?.classList.remove('open');
    document.getElementById('ov-lobby-detail')?.classList.remove('open');
    document.getElementById('ov-create-room')?.classList.remove('open');
    document.body.style.overflow = '';

    currentRoomId = data.battleRoomId;
    AR.roomId = data.battleRoomId;
    AR.role = data.role;
    if (data.mode === 'ffa') {
      AR.isFFA = true;
      AR.ffaPlayers = data.players || [];
      AR.ffaScores = {};
      AR.myUserId = data.myUserId;
      const others = AR.ffaPlayers.filter(p => p.userId !== data.myUserId);
      AR.oppId = others[0]?.userId || null;
      AR.oppProfile = others[0] || null;
    } else {
      AR.isFFA = false;
      AR.oppId = data.opponent.userId;
      AR.oppProfile = data.opponent;
    }
    socket.emit('join_room', { roomId: data.battleRoomId });
    const overlay = document.getElementById('cooldown-overlay');
    if (overlay) overlay.style.display = 'none';
    if (AR.waitTimer) clearInterval(AR.waitTimer);
    enterLobby();
  });

  socket.on('lobby_battle_spectate', (data) => {
    toast('info', 'Trận đấu đã bắt đầu! Bạn có thể xem...');
    // Có thể hiển thị giao diện xem
  });

  socket.on('lobby_battle_ended', (data) => {
    if (currentLobbyRoomId === data.roomId) {
      toast('ok', '🏁 Trận đấu kết thúc, có thể bắt đầu trận mới');
      socket.emit('list_lobby_rooms');
      // Refresh room detail
      joinLobbyRoom(currentLobbyRoomId);
    }
  });

  socket.on('invite_received', (data) => {
    // Cập nhật để hiển thị tên phòng
    AR.inviteFrom = data.from;
    AR.inviteRoomId = data.roomId;
    G('inv-from-name').innerText = data.from.full_name;
    G('inv-from-elo').innerHTML = `⚡ ELO: ${data.from.elo}`;
    const roomWrap = G('inv-room-wrap');
    const roomNameEl = G('inv-room-name');
    if (data.roomName && roomNameEl) {
      roomNameEl.innerText = data.roomName;
      if (roomWrap) roomWrap.style.display = 'inline-block';
    } else {
      if (roomWrap) roomWrap.style.display = 'none';
    }
    G('ov-invite').classList.add('open');
  });

  socket.on('lobby_update', (data) => {
    if (AR.isFFA) {
      if (data.readyUserId) {
        const el = G('lp-ready-' + data.readyUserId);
        if (el) { el.textContent = '✅ Sẵn sàng!'; el.className = 'lpc-status ready'; }
      }
    } else {
      const oppId = AR.oppId;
      AR.oppReady = data.playerReady[oppId] || false;
      updateOppReadyUI();
    }
  });

  socket.on('battle_question', (data) => {
    renderBattleQuestion(data);
  });

  socket.on('battle_update', (data) => {
    const myId = U.id;
    if (AR.isFFA) {
      if (data.scores) { AR.ffaScores = data.scores; renderFfaScoreboard(); }
    } else {
      AR.myScore = data.scores[myId] || 0;
      AR.oppScore = data.scores[AR.oppId] || 0;
      updateBattleScore();
    }

    if (data.correct && data.playerAnsweredUserId !== U.id) {
      AR.questionFinished = true;
      disableBattleInputs(true);
      if (AR.cooldownTimer) { clearTimeout(AR.cooldownTimer); AR.cooldownTimer = null; }
      AR.answerCooldown = false;
      G('cooldown-indicator').style.display = 'none';
      let answererName = 'Đối thủ';
      if (AR.isFFA) {
        const ans = AR.ffaPlayers?.find(p => p.userId === data.playerAnsweredUserId);
        answererName = (ans?.full_name || ans?.name || 'Người chơi').split(' ').pop();
      } else {
        answererName = AR.oppProfile?.full_name?.split(' ').pop() || 'Đối thủ';
      }
      G('battle-feedback').textContent = `⚡ ${answererName} đã trả lời đúng!`;
      G('battle-feedback').style.display = 'block';
      setTimeout(() => {
        if (G('battle-feedback').style.display === 'block')
          G('battle-feedback').style.display = 'none';
      }, 2000);
      if (AR.cooldownInterval) clearInterval(AR.cooldownInterval);
      G('cooldown-overlay').style.display = 'none';
    }
  });

  socket.on('battle_result', async (data) => {
    console.log('🔍 battle_result received:', data);
    endBattle(data);
    // Reload profile from DB so UI reflects the updated ELO/wins/losses
    if (U) {
      await loadP();
      renderIn();
    }
  });

  socket.on('opponent_left', () => {
    toast('err', 'Đối thủ đã thoát trận');
    closeArena();
  });

  // ── Mất kết nối: chỉ đóng arena nếu server chủ động ngắt, còn lại chờ reconnect ──
  socket.on('disconnect', (reason) => {
    console.warn('[Socket] Disconnected:', reason);
    const intentional = reason === 'io client disconnect' || reason === 'io server disconnect';
    if (intentional) {
      _hideDisconnectBanner();
      toast('err', 'Mất kết nối đến máy chủ');
      closeArena();
    } else {
      // Mất mạng tạm thời — hiện banner chờ reconnect, KHÔNG đóng arena
      _showDisconnectBanner();
    }
  });

  // ── Đang thử kết nối lại ──
  socket.on('reconnect_attempt', (n) => {
    _showDisconnectBanner(n);
  });

  // ── Kết nối lại thành công ──
  socket.on('reconnect', async (n) => {
    console.log('[Socket] Reconnected after', n, 'attempt(s)');
    _hideDisconnectBanner();
    toast('ok', '✅ Đã kết nối lại!');
    if (!U) return;

    // Tải profile mới nhất từ DB (không dùng giá trị mặc định cũ)
    await loadP();
    renderIn();

    // Gửi lại presence với dữ liệu mới nhất
    if (socket.connected) {
      socket.emit('presence:join', {
        userId: U.id,
        full_name: U.profile?.full_name || U.email?.split('@')[0],
        username: U.profile?.username || '',
        elo: U.profile?.elo || 1200,
        wins: U.profile?.wins || 0,
        losses: U.profile?.losses || 0,
        avatar_url: U.profile?.avatar_url || '',
      });
      // Yêu cầu server đồng bộ lại trạng thái (danh sách phòng, online users)
      socket.emit('request_sync');
    }

    // Tái kết nối Supabase realtime channels nếu bị gián đoạn
    subscribeProfileRealtime();
    joinGlobalPresence();
  });

  socket.on('reconnect_failed', () => {
    toast('err', '❌ Không thể kết nối lại. Vui lòng tải lại trang.');
  });

  // ── Đồng bộ state từ server sau khi reconnect ──
  socket.on('sync_state', (data) => {
    if (data.presence) {
      ONLINE_USERS = {};
      (data.presence || []).forEach(u => {
        if (u.userId && u.userId !== U?.id) ONLINE_USERS[u.userId] = u;
        // Cập nhật stats của bản thân nếu server có dữ liệu mới hơn
        if (u.userId === U?.id && U?.profile) {
          if (u.elo !== undefined) U.profile.elo = u.elo;
          if (u.wins !== undefined) U.profile.wins = u.wins;
          if (u.losses !== undefined) U.profile.losses = u.losses;
        }
      });
      updateOnlineCount();
      refreshOnlineUI();
    }
    if (data.lobby_rooms) renderLobbyRoomsList(data.lobby_rooms);
  });

  socket.on('error', (err) => {
    toast('err', err.msg || 'Có lỗi xảy ra');
  });
}

init();

// ══════════════════════════════════════
//   VISIBILITY CHANGE — kết nối lại khi quay lại tab
// ══════════════════════════════════════
document.addEventListener('visibilitychange', async () => {
  if (document.hidden || !U) return;

  // Khi tab hiển thị trở lại: kiểm tra kết nối socket
  if (!socket || !socket.connected) {
    console.log('[Visibility] Tab visible, socket disconnected — reconnecting...');
    if (!socket) initSocket();
    else socket.connect();
  }

  // Luôn tải lại profile mới nhất từ Supabase để tránh dữ liệu cũ
  try {
    await loadP();
    renderIn();
    if (socket && socket.connected) {
      socket.emit('presence:join', {
        userId: U.id,
        full_name: U.profile?.full_name || U.email?.split('@')[0],
        username: U.profile?.username || '',
        elo: U.profile?.elo || 1200,
        wins: U.profile?.wins || 0,
        losses: U.profile?.losses || 0,
        avatar_url: U.profile?.avatar_url || '',
      });
    }
  } catch (e) { console.warn('[Visibility] Profile reload failed:', e); }
});

// ══════════════════════════════════════
//   PERIODIC REFRESH — tải lại dữ liệu mỗi 3 phút
// ══════════════════════════════════════
setInterval(async () => {
  if (!U || !sb || document.hidden) return;
  try {
    const prev = { elo: U.profile?.elo, wins: U.profile?.wins, losses: U.profile?.losses };
    await loadP();
    const cur = U.profile;
    // Chỉ re-render nếu dữ liệu thực sự thay đổi
    if (cur && (cur.elo !== prev.elo || cur.wins !== prev.wins || cur.losses !== prev.losses)) {
      console.log('[Refresh] Profile updated:', cur.elo, 'ELO');
      renderIn();
      if (socket && socket.connected) {
        socket.emit('presence:update', {
          elo: cur.elo || 1200,
          wins: cur.wins || 0,
          losses: cur.losses || 0,
        });
      }
    }
    // Đảm bảo Supabase realtime còn hoạt động
    if (!PRESENCE_CH || PRESENCE_CH.state !== 'joined') {
      console.log('[Refresh] Supabase presence channel lost, resubscribing...');
      joinGlobalPresence();
    }
  } catch (e) { console.warn('[Refresh] Periodic refresh error:', e); }
}, 3 * 60 * 1000); // mỗi 3 phút





function renderLobbyRoomsList(rooms) {
  const container = document.getElementById('lobby-rooms-list');
  if (!container) return;
  if (!rooms || !rooms.length) {
    container.innerHTML = `
          <div class="empty-rooms">
            <div style="font-size:2.5rem;margin-bottom:.65rem">🏠</div>
            <div style="font-weight:700;margin-bottom:.3rem;color:var(--text-3)">Chưa có phòng nào</div>
            <div>Hãy tạo phòng mới để bắt đầu!</div>
          </div>`;
    return;
  }
  container.innerHTML = rooms.map(room => {
    const isFull = room.player_count >= room.max_players;
    return `
          <div class="lobby-room-card">
            <div class="lrc-icon">${room.is_private ? '🔒' : '🏠'}</div>
            <div style="flex:1;min-width:0">
              <div class="lrc-name">${escapeHtml(room.name)}</div>
              <div class="lrc-meta">
                <span class="${room.is_private ? 'lrc-badge private' : 'lrc-badge public'}">${room.is_private ? '🔒 Riêng tư' : '🌐 Công khai'}</span>
                <span>👥 ${room.player_count}/${room.max_players}</span>
                <span>👑 ${escapeHtml(room.host_name)}</span>
              </div>
            </div>
            <button class="btn-join-room${isFull ? ' full' : ''}"
              ${isFull ? 'disabled title="Phòng đã đầy"' : ''}
              onclick="${room.is_private
        ? `openRoomPasswordModal('${room.id}')`
        : `joinLobbyRoom('${room.id}')`}">
              ${isFull ? '🔴 Đầy' : '🚪 Vào'}
            </button>
          </div>`;
  }).join('');
}

function showLobbyRoomDetails(room) {
  const modal = document.getElementById('ov-lobby-detail');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('ov-lobby')?.classList.remove('open');
  document.getElementById('ov-create-room')?.classList.remove('open');
  currentLobbyRoom = room;
  currentLobbyRoomId = room.id || room.roomId || currentLobbyRoomId;
  document.getElementById('lobby-room-name').textContent = room.name || 'Phòng';
  const typeIcon = document.getElementById('lr-type-icon');
  if (typeIcon) typeIcon.textContent = room.is_private ? '🔒' : '👥';
  const privBadge = document.getElementById('lr-privacy-badge');
  if (privBadge) privBadge.textContent = room.is_private ? '🔒 Riêng tư' : '🌐 Công khai';
  const sharePw = document.getElementById('lr-share-pw');
  if (sharePw) sharePw.style.display = room.is_private ? 'block' : 'none';
  renderLobbyRoomPlayers(room.players, room.host_sid, room.ready_players || []);
  refreshOnlineUI();
}

function toggleLobbyReady() {
  if (!currentLobbyRoomId || !socket) return;
  socket.emit('toggle_lobby_ready', { roomId: currentLobbyRoomId });
}

function renderLobbyRoomPlayers(players, hostSid, readyPlayers = []) {
  const container = document.getElementById('lobby-players-list');
  const emptySlots = document.getElementById('lobby-empty-slots');
  const countEl = document.getElementById('lobby-player-count');
  const hostNameEl = document.getElementById('lr-host-name');
  const youHostEl = document.getElementById('lr-you-host');
  const hostActionsEl = document.getElementById('lr-host-actions');
  const guestActionsEl = document.getElementById('lr-guest-actions');
  const btnStart = document.getElementById('btn-start-lobby-battle');
  const btnReady = document.getElementById('btn-lobby-ready');
  if (!container) return;
  const entries = Object.entries(players || {});
  const count = entries.length;
  const MAX = 5;
  if (countEl) countEl.textContent = count;
  const hostEntry = entries.find(([sid]) => sid === hostSid);
  const hostUser = hostEntry ? hostEntry[1] : null;
  if (hostNameEl) hostNameEl.textContent = hostUser ? (hostUser.full_name || hostUser.username || 'Chủ phòng') : 'Chủ phòng';
  const isHost = socket && hostSid === socket.id;

  const allGuestsReady = entries.filter(([sid]) => sid !== hostSid).every(([sid]) => readyPlayers.includes(sid));
  const canStart = count >= 2 && allGuestsReady;

  if (youHostEl) youHostEl.style.display = isHost ? 'inline' : 'none';
  if (hostActionsEl) hostActionsEl.style.display = isHost ? 'block' : 'none';
  if (guestActionsEl) guestActionsEl.style.display = (!isHost && socket) ? 'block' : 'none';

  if (btnStart) {
    if (canStart) {
      btnStart.disabled = false;
      btnStart.style.background = 'linear-gradient(135deg,var(--teal),#0891b2)';
      btnStart.style.cursor = 'pointer';
      btnStart.textContent = '⚔️ Bắt Đầu — Tất Cả Cùng Đấu!';
    } else {
      btnStart.disabled = true;
      btnStart.style.background = 'var(--text-4)';
      btnStart.style.cursor = 'not-allowed';
      btnStart.textContent = count < 2 ? '⚠️ Cần ít nhất 2 người' : '⏳ Đang chờ người chơi sẵn sàng...';
    }
  }

  if (btnReady && socket) {
    const isReady = readyPlayers.includes(socket.id);
    if (isReady) {
      btnReady.textContent = '✅ Đã Sẵn Sàng (Nhấn để hủy)';
      btnReady.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
    } else {
      btnReady.textContent = '☑️ Sẵn Sàng';
      btnReady.style.background = 'linear-gradient(135deg, #eab308, #ca8a04)';
    }
  }

  container.innerHTML = entries.map(([sid, p]) => {
    const name = p.full_name || p.username || 'Người chơi';
    const isH = sid === hostSid;
    const isR = readyPlayers.includes(sid);
    const ini = mkIni(name);
    const isMe = U && p.userId === U.id;
    const av = p.avatar_url
      ? `<img src="${p.avatar_url}" alt="${ini}" class="av-img" onerror="this.parentElement.textContent='${ini}'" style="width:100%;height:100%;border-radius:50%;object-fit:cover">`
      : ini;

    let readyBadge = '';
    if (!isH) {
      if (isR) readyBadge = '<div style="position:absolute;bottom:-4px;right:-4px;background:#16a34a;color:#fff;font-size:.65rem;padding:2px 4px;border-radius:4px;font-weight:bold;z-index:2;line-height:1">✅</div>';
      else readyBadge = '<div style="position:absolute;bottom:-4px;right:-4px;background:#eab308;color:#fff;font-size:.65rem;padding:2px 4px;border-radius:4px;font-weight:bold;z-index:2;line-height:1">⏳</div>';
    }

    return `
          <div class="lr-player-card${isH ? ' host' : ''}${isR && !isH ? ' ready' : ''}" style="position:relative">
            ${isH ? '<div class="lr-host-crown">👑</div>' : ''}
            <div class="lr-player-av" style="position:relative">${av}${readyBadge}</div>
            <div class="lr-player-name">${escapeHtml(name)}${isMe ? ' <span style="color:var(--teal);font-size:.65rem">● Bạn</span>' : ''}</div>
            <div class="lr-player-elo">⚡ ${p.elo || 1200}</div>
          </div>`;
  }).join('');
  if (emptySlots) {
    emptySlots.innerHTML = Array.from({ length: Math.max(0, MAX - count) }).map(() => `
          <div class="lr-empty-slot">
            <div class="lr-empty-slot-av">👤</div>
            <div>Chờ người...</div>
          </div>`).join('');
  }
}

function openLobbyRooms() {
  if (!U) { openM('login'); return; }
  document.getElementById('ov-lobby').classList.add('open');
  document.body.style.overflow = 'hidden';
  loadLobbyRooms();
}
function closeLobbyRooms() {
  document.getElementById('ov-lobby').classList.remove('open');
  document.body.style.overflow = '';
}



// ══════════════════════════════════════
//   LEADERBOARD
// ══════════════════════════════════════
let LB = { filter: 'all', data: [], myRank: null };

// Rank colors cho pill
const RANK_COLORS = {
  'Electron': { bg: '#dbeafe', color: '#1d4ed8' },
  'Nguyên Tử': { bg: '#ede9fe', color: '#5b21b6' },
  'Phân Tử': { bg: '#ccfbf1', color: '#0f766e' },
  'Nhà Hóa Học': { bg: '#fef3c7', color: '#92400e' },
  'Giáo Sư': { bg: '#ffe4e6', color: '#9f1239' },
};

function lbSetFilter(f, btn) {
  LB.filter = f;
  document.querySelectorAll('.lb-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLeaderboard(LB.data);
}

async function loadLeaderboard() {
  if (!sb) return;
  const listEl = G('lb-list');
  listEl.innerHTML = '<div class="lb-loading"><div class="lb-spin">⚗️</div><div>Đang tải dữ liệu...</div></div>';

  try {
    const { data, error } = await sb
      .from('profiles')
      .select('id, full_name, username, elo, wins, losses, avatar_url')
      .order('elo', { ascending: false })
      .limit(100);

    if (error) throw error;

    LB.data = data || [];

    // Podium top 3
    renderPodium(LB.data);

    // My rank
    if (U) {
      const myIdx = LB.data.findIndex(p => p.id === U.id);
      LB.myRank = myIdx >= 0 ? myIdx + 1 : null;
      renderMyRankCard(LB.data[myIdx] || null, LB.myRank);
    } else {
      G('lb-my-rank-card').style.display = 'none';
    }

    renderLeaderboard(LB.data);
    G('lb-total-count').textContent = LB.data.length + ' người chơi';

  } catch (e) {
    listEl.innerHTML = '<div class="lb-empty">❌ Không thể tải dữ liệu. Vui lòng thử lại.</div>';
    console.error('Leaderboard error:', e);
  }
}

function renderPodium(data) {
  const slots = [1, 2, 3];
  slots.forEach(rank => {
    const p = data[rank - 1];
    const av = G(`lb-pod-av-${rank}`);
    const nameEl = G(`lb-pod-name-${rank}`);
    const eloEl = G(`lb-pod-elo-${rank}`);
    if (!p) {
      av.textContent = '?';
      nameEl.textContent = '—';
      eloEl.textContent = '—';
      return;
    }
    const name = p.full_name || p.username || 'Ẩn danh';
    const ini = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

    if (p.avatar_url) {
      av.innerHTML = `<img src="${p.avatar_url}" alt="${name}" class="av-img" onerror="this.parentElement.textContent='${ini}'">`;
    } else {
      av.textContent = ini;
    }
    // Reset inline background khi có ảnh
    if (!p.avatar_url) {
      if (rank === 1) av.style.background = 'linear-gradient(135deg,#d97706,#fbbf24)';
      else if (rank === 2) av.style.background = 'linear-gradient(135deg,#64748b,#94a3b8)';
      else av.style.background = 'linear-gradient(135deg,#92400e,#d97706)';
    } else {
      av.style.background = 'transparent';
    }
    nameEl.textContent = name.split(' ').pop();
    eloEl.textContent = (p.elo || 1200) + ' ELO';
  });
}





function renderMyRankCard(profile, rank) {
  const card = G('lb-my-rank-card');
  if (!profile || !rank) { card.style.display = 'none'; return; }
  card.style.display = 'block';

  const name = profile.full_name || profile.username || 'Bạn';
  const un = profile.username || '';
  const ini = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const elo = profile.elo || 1200;
  const rankName = getRankFromElo(elo);
  const av = profile.avatar_url || U?.profile?.avatar_url || '';

  G('lb-my-badge').textContent = '#' + rank;
  setAvEl(G('lb-my-av'), name, av);
  G('lb-my-name').textContent = name;
  G('lb-my-sub').textContent = (un ? '@' + un + ' · ' : '') + rankName;
  G('lb-my-elo').textContent = elo;
  G('lb-my-wins').textContent = profile.wins || 0;
  G('lb-my-rank-label').textContent = rankName;
}

function renderLeaderboard(data) {
  const listEl = G('lb-list');
  if (!data || data.length === 0) {
    listEl.innerHTML = '<div class="lb-empty">Chưa có người chơi nào 🌙</div>';
    return;
  }

  let filtered = data;
  // Filter tuần này: chỉ người có wins > 0 (proxy vì không có created_week)
  if (LB.filter === 'week') {
    filtered = data.filter(p => (p.wins || 0) > 0 || (p.losses || 0) > 0);
  }

  if (filtered.length === 0) {
    listEl.innerHTML = '<div class="lb-empty">Chưa có trận đấu nào tuần này 📅</div>';
    return;
  }

  const rows = filtered.map((p, i) => {
    const rank = i + 1;
    const name = p.full_name || p.username || 'Ẩn danh';
    const un = p.username || '';
    const ini = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const elo = p.elo || 1200;
    const wins = p.wins || 0;
    const losses = p.losses || 0;
    const rankName = getRankFromElo(elo);
    const rc = RANK_COLORS[rankName] || { bg: '#f1f5f9', color: '#475569' };
    const isMe = U && p.id === U.id;
    const topClass = rank === 1 ? 'lb-top1' : rank === 2 ? 'lb-top2' : rank === 3 ? 'lb-top3' : '';
    const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank;
    const rankNumClass = rank <= 3 ? 'lb-rank-num top' : 'lb-rank-num';
    const avHtml = p.avatar_url
      ? `<img src="${p.avatar_url}" alt="${name}" class="av-img" onerror="this.parentElement.textContent='${ini}'">`
      : ini;

    return `<div class="lb-row ${topClass} ${isMe ? 'lb-me' : ''}" style="animation-delay:${i * 0.03}s">
      <div class="${rankNumClass}">${rankEmoji}</div>
      <div class="lb-player-info">
        <div class="lb-av">${avHtml}</div>
        <div>
          <div class="lb-player-name">${name}${isMe ? ' <span style="font-size:.68rem;color:var(--teal);font-weight:900">● Bạn</span>' : ''}</div>
          <div class="lb-player-un">${un ? '@' + un : ''}</div>
        </div>
      </div>
      <div class="lb-elo-val">${elo}</div>
      <div class="lb-wins-val">${wins}</div>
      <div class="lb-losses-val">${losses}</div>
      <div class="lb-rank-badge"><span class="lb-rank-pill" style="background:${rc.bg};color:${rc.color}">${rankName}</span></div>
    </div>`;
  }).join('');

  listEl.innerHTML = rows;
}

/* ═══════════════════════════════
   MAGAZINE HOME ANIMATIONS
═══════════════════════════════ */

// ── Counter animation ──
function animateCounter(el, target, duration) {
  const suffix = el.dataset.suffix || '';
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start).toLocaleString('vi-VN') + suffix;
    if (start >= target) clearInterval(timer);
  }, 16);
}

function initCounters() {
  const els = document.querySelectorAll('.mg-ticker-val[data-target]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.done) {
        entry.target.dataset.done = '1';
        const target = parseInt(entry.target.dataset.target, 10);
        animateCounter(entry.target, target, 1400);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .3 });
  els.forEach(el => obs.observe(el));
}

// ── Progress bar animate on scroll ──
function initProgressBars() {
  const bars = document.querySelectorAll('.mg-prog-fill');
  if (!bars.length) return;
  bars.forEach(b => {
    const target = b.style.width;
    b.style.width = '0';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => { b.style.width = target; }, 200);
          obs.unobserve(b);
        }
      });
    }, { threshold: .5 });
    obs.observe(b);
  });
}

// ── 3D tilt on card hover (desktop only) ──
function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.mg-tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
// ── Scroll-reveal for section elements ──
function initScrollReveal() {
  const targets = document.querySelectorAll('.mg-bc, .mg-fact-card, .mg-user-stats');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .12 });
  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity .45s ${i * .06}s ease, transform .45s ${i * .06}s ease`;
    obs.observe(el);
  });
}

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initProgressBars();
  initTilt();
  initScrollReveal();
});