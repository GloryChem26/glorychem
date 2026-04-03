/* ═══════════════════════════════════════════════
   GLORYCHEM — FORUM MODULE
   forum.js — tách riêng, dễ bảo trì
   
   Phụ thuộc: sb (Supabase client từ script.js), U (user object)
   Yêu cầu Supabase:
     - Bảng forum_posts  (id, user_id, title, content, category, comment_count, created_at)
     - Bảng forum_comments (id, post_id, user_id, content, created_at)
     - Join với profiles (full_name, avatar_url)
═══════════════════════════════════════════════ */

/* ──────────────────────────────────────
   STATE
─────────────────────────────────────── */
const FR = {
  posts:         [],         // danh sách bài đang hiển thị
  currentCat:    'all',      // bộ lọc danh mục
  currentPost:   null,       // bài đang xem chi tiết
  comments:      [],         // bình luận của bài hiện tại
  loading:       false,      // đang tải posts
  submitting:    false,      // đang submit bài/comment
  inited:        false,      // đã init chưa
  selectedCat:   'tip',      // category đang chọn trong modal tạo bài
  counts:        { all: 0, tip: 0, memory: 0, question: 0 },
};

/* ──────────────────────────────────────
   CATEGORY CONFIG
─────────────────────────────────────── */
const FR_CATS = {
  tip:      { label: 'Mẹo Học',   icon: '💡', desc: 'Chiến thuật ôn tập' },
  memory:   { label: 'Ghi Nhớ',   icon: '🧠', desc: 'Cách nhớ nhanh'     },
  question: { label: 'Câu Hỏi',   icon: '❓', desc: 'Hỏi đáp kiến thức'  },
};

/* ──────────────────────────────────────
   HELPERS
─────────────────────────────────────── */
function frG(id) { return document.getElementById(id); }

function frTimeAgo(dateStr) {
  const now  = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const m    = Math.floor(diff / 60000);
  const h    = Math.floor(m / 60);
  const d    = Math.floor(h / 24);
  if (m < 1)  return 'vừa xong';
  if (m < 60) return `${m} phút trước`;
  if (h < 24) return `${h} giờ trước`;
  if (d < 7)  return `${d} ngày trước`;
  return new Date(dateStr).toLocaleDateString('vi-VN');
}

function frEsc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function frAvatar(profile, size = 'sm') {
  const name   = profile?.full_name || profile?.email?.split('@')[0] || '?';
  const letter = name.charAt(0).toUpperCase();
  if (profile?.avatar_url) {
    return `<img src="${frEsc(profile.avatar_url)}" alt="${frEsc(name)}" onerror="this.parentNode.textContent='${letter}'">`;
  }
  return letter;
}

function frSetAlert(id, type, msg) {
  const el = frG(id);
  if (!el) return;
  el.className = 'fr-modal-alert ' + (type || '');
  el.textContent = msg;
}
function frClrAlert(id) {
  const el = frG(id);
  if (!el) return;
  el.className = 'fr-modal-alert';
  el.textContent = '';
}

/* ──────────────────────────────────────
   INIT — gọi khi user vào tab Diễn Đàn
─────────────────────────────────────── */
function initForum() {
  if (FR.inited) {
    // Đã init rồi, chỉ refresh counts
    frLoadCounts();
    return;
  }
  FR.inited = true;
  frRenderListView();
  frLoadPosts();
  frLoadCounts();
}

/* ──────────────────────────────────────
   LOAD POSTS
─────────────────────────────────────── */
async function frLoadPosts() {
  if (FR.loading) return;
  FR.loading = true;
  frRenderSkeletons();

  try {
    const cat = FR.currentCat;
    const url = cat === 'all'
      ? '/api/forum/posts'
      : `/api/forum/posts?category=${encodeURIComponent(cat)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    FR.posts = data || [];
    frRenderPosts();
  } catch (e) {
    console.error('[Forum] loadPosts:', e);
    frRenderPostsError();
  } finally {
    FR.loading = false;
  }
}

async function frLoadCounts() {
  try {
    const res = await fetch('/api/forum/counts');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const counts = await res.json();

    FR.counts = { all: counts.all || 0, tip: counts.tip || 0, memory: counts.memory || 0, question: counts.question || 0 };

    ['all', 'tip', 'memory', 'question'].forEach(cat => {
      const el = frG(`fr-tab-count-${cat}`);
      if (el) el.textContent = FR.counts[cat];
    });
  } catch (e) { /* im lặng */ }
}

/* ──────────────────────────────────────
   RENDER LIST VIEW
─────────────────────────────────────── */
function frRenderListView() {
  const listEl   = frG('fr-list-view');
  const detailEl = frG('fr-detail-view');
  if (listEl)   listEl.style.display   = '';
  if (detailEl) detailEl.classList.remove('active');
}

function frRenderSkeletons() {
  const container = frG('fr-posts-list');
  if (!container) return;
  container.innerHTML = [1,2,3].map(() => `
    <div class="fr-skeleton">
      <div style="display:flex;gap:.75rem;align-items:center;margin-bottom:1rem">
        <div class="fr-sk-circle"></div>
        <div style="flex:1">
          <div class="fr-sk-line w-1-2"></div>
          <div class="fr-sk-line w-1-4" style="margin-bottom:0"></div>
        </div>
        <div class="fr-sk-line w-1-4" style="height:20px;border-radius:100px"></div>
      </div>
      <div class="fr-sk-line tall w-3-4"></div>
      <div class="fr-sk-line w-full"></div>
      <div class="fr-sk-line w-1-2" style="margin-bottom:0"></div>
    </div>
  `).join('');
}

function frRenderPosts() {
  const container = frG('fr-posts-list');
  if (!container) return;

  if (!FR.posts.length) {
    const catLabel = FR.currentCat === 'all' ? 'nào' : FR_CATS[FR.currentCat]?.label || '';
    container.innerHTML = `
      <div class="fr-empty">
        <span class="fr-empty-icon">📭</span>
        <div class="fr-empty-text">Chưa có bài viết ${catLabel} nào</div>
        <div class="fr-empty-sub">Hãy là người đầu tiên đăng bài!</div>
      </div>
    `;
    return;
  }

  container.innerHTML = FR.posts.map(p => frPostCardHTML(p)).join('');
}

function frRenderPostsError() {
  const container = frG('fr-posts-list');
  if (!container) return;
  container.innerHTML = `
    <div class="fr-empty">
      <span class="fr-empty-icon">⚠️</span>
      <div class="fr-empty-text">Không thể tải bài viết</div>
      <div class="fr-empty-sub">Kiểm tra kết nối và thử lại</div>
    </div>
  `;
}

function frPostCardHTML(p) {
  const cat    = FR_CATS[p.category] || FR_CATS.tip;
  const author = p.profiles?.full_name || 'Ẩn danh';
  const av     = frAvatar(p.profiles);
  const preview = (p.content || '').slice(0, 160);
  const cCount = p.comment_count || 0;

  return `
    <div class="fr-card" data-cat="${frEsc(p.category)}" onclick="frOpenPost('${frEsc(p.id)}')">
      <div class="fr-card-top">
        <div class="fr-card-avatar">${av}</div>
        <div class="fr-card-meta">
          <div class="fr-card-author">${frEsc(author)}</div>
          <div class="fr-card-time">${frTimeAgo(p.created_at)}</div>
        </div>
        <div class="fr-card-badge ${frEsc(p.category)}">${cat.icon} ${cat.label}</div>
      </div>
      <div class="fr-card-title">${frEsc(p.title)}</div>
      <div class="fr-card-preview">${frEsc(preview)}${p.content?.length > 160 ? '...' : ''}</div>
      <div class="fr-card-footer">
        <div class="fr-card-stat"><span>💬</span><span>${cCount} bình luận</span></div>
        ${(U && p.user_id === U.id) ? `
          <button class="fr-btn-delete-sm" onclick="event.stopPropagation(); frOpenDeleteConfirm('${frEsc(p.id)}')">
            🗑️ Xóa
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

/* ──────────────────────────────────────
   FILTER TABS
─────────────────────────────────────── */
function frSetTab(cat) {
  FR.currentCat = cat;

  // Cập nhật active tab
  document.querySelectorAll('.fr-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.cat === cat);
  });

  frLoadPosts();
}

/* ──────────────────────────────────────
   DETAIL VIEW — mở bài viết
─────────────────────────────────────── */
async function frOpenPost(postId) {
  // Tìm post trong cache
  const post = FR.posts.find(p => p.id === postId);
  if (!post) return;

  FR.currentPost = post;

  // Chuyển sang detail view
  const listEl   = frG('fr-list-view');
  const detailEl = frG('fr-detail-view');
  if (listEl)   listEl.style.display = 'none';
  if (detailEl) detailEl.classList.add('active');

  // Scroll lên đầu
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Render post detail
  frRenderPostDetail(post);

  // Load comments
  frLoadComments(postId);
}

function frBackToList() {
  FR.currentPost = null;
  frRenderListView();
}

function frRenderPostDetail(p) {
  const container = frG('fr-post-detail-wrap');
  if (!container) return;

  const cat    = FR_CATS[p.category] || FR_CATS.tip;
  const author = p.profiles?.full_name || 'Ẩn danh';
  const av     = frAvatar(p.profiles, 'md');

  container.setAttribute('data-cat', p.category);
  container.innerHTML = `
    <div class="fr-post-header">
      <div class="fr-post-header-top">
        <div class="fr-card-badge ${frEsc(p.category)}">${cat.icon} ${cat.label}</div>
      </div>
      <div class="fr-post-title">${frEsc(p.title)}</div>
      <div class="fr-post-author-row">
        <div class="fr-post-author-row-left">
          <div class="fr-post-avatar">${av}</div>
          <div class="fr-post-author-info">
            <div class="fr-post-author-name">${frEsc(author)}</div>
            <div class="fr-post-author-time">${frTimeAgo(p.created_at)}</div>
          </div>
        </div>
        ${(U && p.user_id === U.id) ? `
          <button class="fr-btn-delete-md" onclick="frOpenDeleteConfirm('${frEsc(p.id)}')">
            🗑️ Xóa Bài Viết
          </button>
        ` : ''}
      </div>
    </div>
    <div class="fr-divider"></div>
    <div class="fr-post-body">${frEsc(p.content)}</div>
  `;

  // Render form bình luận
  frRenderCommentForm();
}

/* ──────────────────────────────────────
   COMMENTS
─────────────────────────────────────── */
async function frLoadComments(postId) {
  const container = frG('fr-comment-list');
  if (!container) return;

  container.innerHTML = `
    <div class="fr-comments-loading">
      <span class="spin">↻</span> Đang tải bình luận...
    </div>
  `;

  const countEl = frG('fr-comments-count-badge');
  if (countEl) countEl.textContent = '...';

  try {
    const res = await fetch(`/api/forum/posts/${encodeURIComponent(postId)}/comments`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    FR.comments = data || [];
    if (countEl) countEl.textContent = FR.comments.length;

    frRenderComments();
  } catch (e) {
    console.error('[Forum] loadComments:', e);
    container.innerHTML = `
      <div class="fr-empty" style="padding:1.5rem">
        <div class="fr-empty-text">Không thể tải bình luận</div>
      </div>
    `;
  }
}

function frRenderComments() {
  const container = frG('fr-comment-list');
  if (!container) return;

  if (!FR.comments.length) {
    container.innerHTML = `
      <div class="fr-empty" style="padding:1.5rem 0">
        <span class="fr-empty-icon">💬</span>
        <div class="fr-empty-text">Chưa có bình luận</div>
        <div class="fr-empty-sub">Hãy là người đầu tiên bình luận!</div>
      </div>
    `;
    return;
  }

  container.innerHTML = FR.comments.map(c => frCommentHTML(c)).join('');
}

function frCommentHTML(c) {
  const author = c.profiles?.full_name || 'Ẩn danh';
  const av     = frAvatar(c.profiles);

  return `
    <div class="fr-comment" id="comment-${c.id}">
      <div class="fr-comment-avatar">${av}</div>
      <div class="fr-comment-bubble">
        <div class="fr-comment-head">
          <div style="display:flex;justify-content:space-between;width:100%;align-items:center">
            <div>
              <span class="fr-comment-name">${frEsc(author)}</span>
              <span class="fr-comment-ts">${frTimeAgo(c.created_at)}</span>
            </div>
            ${(U && c.user_id === U.id) ? `
              <button class="fr-comment-del-btn" onclick="frDeleteComment('${frEsc(c.id)}')">🗑️</button>
            ` : ''}
          </div>
        </div>
        <div class="fr-comment-text">${frEsc(c.content)}</div>
      </div>
    </div>
  `;
}

let frCommentIdToDelete = null;

function frDeleteComment(commentId) {
  if (!FR.currentPost || !U) return;
  frCommentIdToDelete = commentId;
  const ov = frG('fr-del-comment-overlay');
  if (ov) {
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function frCloseDelComment() {
  frCommentIdToDelete = null;
  const ov = frG('fr-del-comment-overlay');
  if (ov) {
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }
}

async function frExecuteDelComment() {
  if (!frCommentIdToDelete || !FR.currentPost || !U) return;

  const btn = frG('fr-btn-do-del-comment');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '...';
  }

  try {
    const url = `/api/forum/posts/${encodeURIComponent(FR.currentPost.id)}/comments/${encodeURIComponent(frCommentIdToDelete)}?user_id=${encodeURIComponent(U.id)}`;
    const res = await fetch(url, {
      method:  'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    // Cập nhật state cục bộ
    FR.comments = FR.comments.filter(c => c.id !== frCommentIdToDelete);
    FR.currentPost.comment_count = Math.max(0, (FR.currentPost.comment_count || 1) - 1);
    
    // Cập nhật UI
    const countEl = frG('fr-comments-count-badge');
    if (countEl) countEl.textContent = FR.comments.length;

    // Cập nhật card trong list view
    const card = document.querySelector(`.fr-card[onclick*="${FR.currentPost.id}"] .fr-card-stat span:last-child`);
    if (card) card.textContent = `${FR.currentPost.comment_count} bình luận`;

    frRenderComments();
    frCloseDelComment();
  } catch (e) {
    console.error('[Forum] deleteComment:', e);
    alert('Không thể xóa bình luận: ' + e.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Xóa Ngay';
    }
  }
}

function frRenderCommentForm() {
  const wrap = frG('fr-comment-form-wrap');
  if (!wrap) return;

  if (!U) {
    // Chưa đăng nhập
    wrap.innerHTML = `
      <div class="fr-login-prompt">
        <p>🔐 Đăng nhập để tham gia bình luận và chia sẻ kiến thức</p>
        <div class="fr-login-prompt-btns">
          <button class="fr-login-btn" onclick="openM('login')">Đăng Nhập</button>
          <button class="fr-login-btn primary" onclick="openM('register')">Đăng Ký Ngay →</button>
        </div>
      </div>
    `;
    return;
  }

  const av = frAvatar(U?.profile);

  wrap.innerHTML = `
    <div class="fr-comment-form" id="fr-comment-form">
      <div class="fr-comment-form-top">
        <div class="fr-comment-form-avatar">${av}</div>
        <textarea
          class="fr-comment-textarea"
          id="fr-comment-input"
          placeholder="Viết bình luận của bạn..."
          maxlength="1000"
          onkeydown="frCommentKeydown(event)"
        ></textarea>
      </div>
      <div class="fr-comment-form-footer">
        <button class="fr-comment-submit" id="fr-comment-btn" onclick="frSubmitComment()">
          <span id="fr-comment-btn-text">Gửi 💬</span>
        </button>
      </div>
    </div>
    <div class="fr-modal-alert" id="fr-comment-alert"></div>
  `;
}

function frCommentKeydown(e) {
  // Ctrl+Enter hoặc Cmd+Enter để gửi
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    frSubmitComment();
  }
}

async function frSubmitComment() {
  if (!U) { openM('login'); return; }
  if (FR.submitting) return;
  if (!FR.currentPost) return;

  const input   = frG('fr-comment-input');
  const btn     = frG('fr-comment-btn');
  const btnText = frG('fr-comment-btn-text');
  const content = input?.value?.trim() || '';

  frClrAlert('fr-comment-alert');

  if (!content) {
    frSetAlert('fr-comment-alert', 'err', '⚠️ Vui lòng nhập nội dung bình luận');
    return;
  }
  if (content.length > 1000) {
    frSetAlert('fr-comment-alert', 'err', '⚠️ Bình luận không được vượt quá 1000 ký tự');
    return;
  }

  FR.submitting = true;
  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = '↻ Đang gửi...';

  try {
    const res = await fetch(`/api/forum/posts/${encodeURIComponent(FR.currentPost.id)}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: U.id, content }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data = await res.json();

    // Cập nhật comment_count local
    FR.currentPost.comment_count = (FR.currentPost.comment_count || 0) + 1;
    const card = document.querySelector(`.fr-card[onclick*="${FR.currentPost.id}"] .fr-card-stat span:last-child`);
    if (card) card.textContent = `${FR.currentPost.comment_count} bình luận`;

    FR.comments.push(data);
    if (input) input.value = '';

    const countEl = frG('fr-comments-count-badge');
    if (countEl) countEl.textContent = FR.comments.length;

    frRenderComments();

    setTimeout(() => {
      const list = frG('fr-comment-list');
      if (list) list.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);

  } catch (e) {
    console.error('[Forum] submitComment:', e);
    frSetAlert('fr-comment-alert', 'err', '❌ Gửi bình luận thất bại. Thử lại sau!');
  } finally {
    FR.submitting = false;
    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = 'Gửi 💬';
  }
}

/* ──────────────────────────────────────
   NEW POST MODAL
─────────────────────────────────────── */
function frOpenNewPost() {
  if (!U) {
    openM('login');
    return;
  }

  // Reset form
  frSelectCat('tip');
  const titleInp   = frG('fr-inp-title');
  const contentInp = frG('fr-inp-content');
  if (titleInp)   titleInp.value   = '';
  if (contentInp) contentInp.value = '';
  frClrAlert('fr-post-alert');
  frUpdateCharCount();

  const ov = frG('fr-post-overlay');
  if (ov) {
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => titleInp?.focus(), 200);
  }
}

function frCloseNewPost() {
  const ov = frG('fr-post-overlay');
  if (ov) {
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function frSelectCat(cat) {
  FR.selectedCat = cat;
  document.querySelectorAll('.fr-cat-opt').forEach(el => {
    el.classList.toggle('selected', el.dataset.val === cat);
  });
}

function frUpdateCharCount() {
  const contentInp = frG('fr-inp-content');
  const countEl    = frG('fr-char-count');
  if (!contentInp || !countEl) return;

  const len = contentInp.value.length;
  const MAX = 3000;
  countEl.textContent = `${len} / ${MAX}`;
  countEl.className = 'fr-char-count';
  if (len > MAX * 0.85) countEl.classList.add('warn');
  if (len > MAX)        countEl.classList.add('over');
}

async function frSubmitPost() {
  if (!U) { openM('login'); return; }
  if (FR.submitting) return;

  const title   = (frG('fr-inp-title')?.value || '').trim();
  const content = (frG('fr-inp-content')?.value || '').trim();
  const cat     = FR.selectedCat;

  frClrAlert('fr-post-alert');

  if (!title) {
    frSetAlert('fr-post-alert', 'err', '⚠️ Vui lòng nhập tiêu đề bài viết');
    return;
  }
  if (title.length > 200) {
    frSetAlert('fr-post-alert', 'err', '⚠️ Tiêu đề không được vượt quá 200 ký tự');
    return;
  }
  if (!content) {
    frSetAlert('fr-post-alert', 'err', '⚠️ Vui lòng nhập nội dung');
    return;
  }
  if (content.length > 3000) {
    frSetAlert('fr-post-alert', 'err', '⚠️ Nội dung không được vượt quá 3000 ký tự');
    return;
  }

  FR.submitting = true;
  const btn     = frG('fr-post-submit-btn');
  const btnText = frG('fr-post-submit-text');
  const btnLoad = frG('fr-post-submit-load');
  if (btn)     btn.disabled = true;
  if (btnText) btnText.style.display = 'none';
  if (btnLoad) btnLoad.style.display = 'inline-flex';

  try {
    const res = await fetch('/api/forum/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: U.id, title, content, category: cat }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data = await res.json();

    frSetAlert('fr-post-alert', 'ok', '✅ Đăng bài thành công!');

    FR.posts.unshift(data);
    FR.counts.all++;
    if (FR.counts[cat] !== undefined) FR.counts[cat]++;

    if (FR.currentCat === 'all' || FR.currentCat === cat) {
      frRenderPosts();
    }
    frLoadCounts();

    setTimeout(() => {
      frCloseNewPost();
    }, 1200);

  } catch (e) {
    console.error('[Forum] submitPost:', e);
    frSetAlert('fr-post-alert', 'err', '❌ Đăng bài thất bại. Vui lòng thử lại!');
  } finally {
    FR.submitting = false;
    if (btn)     btn.disabled = false;
    if (btnText) btnText.style.display = 'inline';
    if (btnLoad) btnLoad.style.display = 'none';
  }
}

/* ──────────────────────────────────────
   DELETE POST MODAL LOGIC
─────────────────────────────────────── */
let frPostIdToDelete = null;

function frOpenDeleteConfirm(postId) {
  frPostIdToDelete = postId;
  const ov = frG('fr-delete-confirm-overlay');
  if (ov) {
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function frCloseDeleteConfirm() {
  frPostIdToDelete = null;
  const ov = frG('fr-delete-confirm-overlay');
  if (ov) {
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }
}

async function frExecuteDelete() {
  if (!frPostIdToDelete || !U) return;
  const btn = frG('fr-btn-do-delete');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '↻ Đang xóa...';
  }

  try {
    const url = `/api/forum/posts/${encodeURIComponent(frPostIdToDelete)}?user_id=${encodeURIComponent(U.id)}`;
    const res = await fetch(url, {
      method:  'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    if (FR.currentPost && FR.currentPost.id === frPostIdToDelete) {
      frBackToList();
    }

    FR.posts = FR.posts.filter(p => p.id !== frPostIdToDelete);
    frRenderPosts();
    frLoadCounts();
    frCloseDeleteConfirm();

  } catch (e) {
    console.error('[Forum] deletePost:', e);
    alert('Không thể xóa bài viết. Vui lòng thử lại sau!');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Đúng, Xóa Nó!';
    }
  }
}