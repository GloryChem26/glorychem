const LESSON_DATA = {
  10: window.DATA_10,
  11: window.DATA_11,
  12: window.DATA_12
};

const MOTIVATIONAL_QUOTES = [
  { text: "Mỗi ngày cố gắng thêm một chút, thành công sẽ không còn xa.", author: "Khuyết danh" },
  { text: "Hành trình vạn dặm bắt đầu từ bước chân đầu tiên.", author: "Lão Tử" },
  { text: "Kiến thức là chìa khóa mở ra cánh cửa tương lai.", author: "Khuyết danh" },
  { text: "Đừng đợi đến ngày mai mới bắt đầu, hãy làm ngay hôm nay.", author: "Khuyết danh" },
  { text: "Học tập là kho báu đi theo chủ nhân của nó khắp mọi nơi.", author: "Ngạn ngữ" },
  { text: "Hóc búa nhất không phải là vấn đề, mà là suy nghĩ của con người.", author: "Albert Einstein" },
  { text: "Thất bại là mẹ thành công, mỗi lần ngã là một bài học.", author: "Khuyết danh" },
  { text: "Học đi đôi với hành, kiến thức là sức mạnh.", author: "Khuyết danh" }
];

/* ──────────────────────────────────────────────────
   LESSON STATE
────────────────────────────────────────────────── */
const LS = {
  grade: 10,
  chapterId: null,
  lessonId: null,
  quizState: {}, // lessonId → { current, score, answers, done }
  done: {}       // lessonId → true
};

/* ──────────────────────────────────────────────────
   LESSON RENDER
────────────────────────────────────────────────── */

function initLessonPage() {
  renderLessonGrade(10);
  initMobileLessonUI();
}

function switchLessonGrade(grade) {
  LS.grade = grade;
  LS.chapterId = null;
  LS.lessonId = null;
  document.querySelectorAll('.ls-grade-tab').forEach(t => {
    t.classList.toggle('active', +t.dataset.grade === grade);
  });
  renderLessonGrade(grade);
  updateMobileLessonNav();
}

function renderLessonGrade(grade) {
  const data = LESSON_DATA[grade];
  if (!data) return;

  const sidebar = document.getElementById('ls-sidebar');
  const content = document.getElementById('ls-content');
  if (!sidebar || !content) return;

  // Render sidebar
  sidebar.innerHTML = data.chapters.map((ch, ci) => {
    const hasLessons = ch.lessons && ch.lessons.length > 0;
    const isCurrent = LS.chapterId === ch.id || (ci === 0 && !LS.chapterId);
    return `
    <div class="ls-chapter-group">
      <button class="ls-chapter-btn${isCurrent ? ' open active' : ''}" onclick="toggleChapter('${ch.id}', this)">
        <span style="font-size:.8rem;opacity:.5">${ci + 1}.</span>
        <span>${ch.title}</span>
        ${hasLessons ? `<span class="ls-chapter-arrow">▶</span>` : `<span class="ls-chapter-arrow" style="opacity:.3">▶</span>`}
      </button>
      <div class="ls-lessons-list${isCurrent ? ' open' : ''}" id="ll-${ch.id}">
        ${hasLessons ? ch.lessons.map(l => `
          <button class="ls-lesson-btn${LS.lessonId === l.id ? ' active' : ''}" onclick="selectLesson('${ch.id}', '${l.id}')">
            <span class="ls-lesson-dot"></span>
            <span>${l.title}</span>
            ${LS.done[l.id] ? `<span class="ls-lesson-done">✓</span>` : ''}
          </button>
        `).join('') : `<div style="padding:.3rem .65rem;font-size:.75rem;color:var(--text-4);font-style:italic">Đang cập nhật...</div>`}
      </div>
    </div>`;
  }).join('');

  // Render content area
  if (LS.lessonId) {
    renderLessonContent();
  } else {
    renderWelcomeScreen();
  }
}

function toggleChapter(chId, btn) {
  const list = document.getElementById('ll-' + chId);
  if (!list) return;
  const isOpen = list.classList.contains('open');

  // Accordion: Close all others
  if (!isOpen) {
    document.querySelectorAll('.ls-lessons-list').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('.ls-chapter-btn').forEach(el => el.classList.remove('open', 'active'));

    list.classList.add('open');
    btn.classList.add('open', 'active');
    LS.chapterId = chId;
  } else {
    list.classList.remove('open');
    btn.classList.remove('open', 'active');
  }
}

function selectLesson(chId, lessonId) {
  LS.chapterId = chId;
  LS.lessonId = lessonId;

  // Close mobile drawer if open
  closeLessonDrawer();

  // Update sidebar active states
  document.querySelectorAll('.ls-lesson-btn').forEach(b => b.classList.remove('active'));
  const btns = document.querySelectorAll('.ls-lesson-btn');
  btns.forEach(b => {
    if (b.onclick && b.onclick.toString().includes(lessonId)) b.classList.add('active');
  });
  // Re-render sidebar to update active state properly
  renderLessonGrade(LS.grade);

  // Update mobile lesson nav bar
  updateMobileLessonNav();

  // On mobile, scroll to top of content
  if (window.innerWidth <= 900) {
    const content = document.getElementById('ls-content');
    if (content) content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  }
}

function renderWelcomeScreen() {
  const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  const data = LESSON_DATA[LS.grade];
  const content = document.getElementById('ls-content');
  if (!content) return;

  content.innerHTML = `
    <div class="ls-welcome">
      <div class="ls-welcome-card">
        <div class="ls-welcome-icon">✨</div>
        <h2 class="ls-welcome-title">Học cùng GloryChem — ${data.label}</h2>
        <p class="ls-welcome-desc">Chào mừng bạn! Chọn một bài học từ danh sách mục lục để bắt đầu khám phá tri thức hóa học nhé.</p>
        
        <div class="ls-welcome-quote">
          <p class="ls-quote-text">"${quote.text}"</p>
          <span class="ls-quote-author">— ${quote.author}</span>
        </div>
      </div>
    </div>
  `;
}

function renderChapterOverview(chapter) {
  // Keeping as legacy for now but replaced by renderWelcomeScreen
  renderWelcomeScreen();
}

function renderLessonContent() {
  const data = LESSON_DATA[LS.grade];
  const chapter = data.chapters.find(c => c.id === LS.chapterId);
  const lesson = chapter?.lessons?.find(l => l.id === LS.lessonId);
  const content = document.getElementById('ls-content');
  if (!lesson) { renderWelcomeScreen(); return; }

  content.innerHTML = `
    <div class="ls-breadcrumb">
      <span>${data.label}</span>
      <span class="sep">›</span>
      <span>${chapter.title}</span>
      <span class="sep">›</span>
      <span style="color:var(--text-2)">${lesson.title}</span>
    </div>
    <div class="ls-lesson-header">
      <div class="ls-lesson-tag">📚 ${lesson.tag}</div>
      <h1 class="ls-lesson-title">${lesson.title}</h1>
      <div class="ls-lesson-meta">
        <span>🕐 Đọc ~${lesson.readTime}</span>
        <span>📝 ${lesson.quiz.length} câu trắc nghiệm</span>
        ${LS.done[lesson.id] ? `<span style="color:var(--green)">✓ Đã hoàn thành</span>` : ''}
      </div>
    </div>

    <!-- Theory -->
    <div class="ls-theory" id="ls-theory-${lesson.id}">
      ${lesson.sections.map((sec, i) => `
        <div class="ls-theory-section${i === 0 ? ' open' : ''}" id="sec-${lesson.id}-${i}">
          <button class="ls-theory-section-head" onclick="toggleSection('${lesson.id}',${i})">
            <div class="ls-theory-icon ${sec.iconClass}">${sec.icon}</div>
            <span class="ls-theory-section-title">${sec.title}</span>
            <span class="ls-theory-section-chevron">▶</span>
          </button>
          <div class="ls-theory-section-body">
            <div class="ls-theory-body">${sec.body}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Quiz -->
    <div class="ls-quiz" id="ls-quiz-${lesson.id}">
      <div class="ls-quiz-header">
        <div class="ls-quiz-header-icon">🎯</div>
        <div class="ls-quiz-header-text">
          <strong>Luyện tập trắc nghiệm</strong>
          <span>${lesson.quiz.length} câu hỏi · Chọn đáp án đúng</span>
        </div>
      </div>
      <div class="ls-quiz-progress-bar">
        <div class="ls-quiz-progress-fill" id="qpf-${lesson.id}" style="width:0%"></div>
      </div>
      <div class="ls-quiz-body" id="qbody-${lesson.id}">
        ${lesson.quiz.map((q, qi) => renderQuestion(lesson.id, q, qi)).join('')}
        <div class="ls-quiz-result" id="qresult-${lesson.id}"></div>
      </div>
      <div class="ls-quiz-nav">
        <div class="ls-quiz-dots" id="qdots-${lesson.id}">
          ${lesson.quiz.map((_, qi) => `<div class="ls-quiz-dot${qi === 0 ? ' current' : ''}" id="qdot-${lesson.id}-${qi}"></div>`).join('')}
        </div>
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-ghost" style="padding:.4rem .85rem;font-size:.8rem" id="qbtn-prev-${lesson.id}" onclick="quizNav('${lesson.id}',-1)" disabled>← Trước</button>
          <button class="btn btn-teal" style="padding:.4rem .85rem;font-size:.8rem" id="qbtn-next-${lesson.id}" onclick="quizNav('${lesson.id}',1)">Tiếp →</button>
        </div>
      </div>
    </div>
  `;

  // Process tables for mobile card layout (add data-label) & overflow hints
  const tables = content.querySelectorAll('.ls-table');
  tables.forEach(table => {
    // 1. Add data-label to all td elements based on th
    const ths = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());
    const trs = table.querySelectorAll('tr');
    trs.forEach(tr => {
      const tds = tr.querySelectorAll('td');
      tds.forEach((td, i) => {
        if (ths[i]) td.setAttribute('data-label', ths[i]);
      });
    });

    // 2. Check for overflow
    const wrap = table.closest('.ls-table-wrap');
    if (wrap && wrap.scrollWidth > wrap.clientWidth) {
      wrap.classList.add('has-overflow');
      wrap.addEventListener('scroll', () => {
        if (wrap.scrollLeft + wrap.clientWidth >= wrap.scrollWidth - 5) {
          wrap.classList.remove('has-overflow');
        } else {
          wrap.classList.add('has-overflow');
        }
      }, { passive: true });
    }
  });

  // Init quiz state
  if (!LS.quizState[lesson.id]) {
    LS.quizState[lesson.id] = { current: 0, answers: {}, done: false };
  }
  showQuestion(lesson.id, LS.quizState[lesson.id].current);
  updateQuizProgress(lesson.id);
}

function renderQuestion(lessonId, q, qi) {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  return `
    <div class="ls-question" id="qq-${lessonId}-${qi}">
      <div class="ls-q-num">Câu ${qi + 1}</div>
      <div class="ls-q-text">${q.q}</div>
      <div class="ls-q-opts">
        ${q.opts.map((opt, oi) => `
          <button class="ls-q-opt" id="qopt-${lessonId}-${qi}-${oi}" onclick="selectAnswer('${lessonId}',${qi},${oi})">
            <span class="ls-q-opt-letter">${letters[oi]}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div class="ls-q-explain" id="qexp-${lessonId}-${qi}">
        💡 <strong>Giải thích:</strong> ${q.explain}
      </div>
    </div>`;
}

function toggleSection(lessonId, idx) {
  const sec = document.getElementById(`sec-${lessonId}-${idx}`);
  if (sec) sec.classList.toggle('open');
}

function showQuestion(lessonId, qi) {
  const lesson = findLesson(lessonId);
  if (!lesson) return;
  document.querySelectorAll(`[id^="qq-${lessonId}-"]`).forEach(el => el.classList.remove('active'));
  const q = document.getElementById(`qq-${lessonId}-${qi}`);
  if (q) q.classList.add('active');

  // Update dots
  document.querySelectorAll(`[id^="qdot-${lessonId}-"]`).forEach((d, i) => {
    d.classList.remove('current');
    if (i === qi) d.classList.add('current');
  });

  // Update nav buttons
  const prevBtn = document.getElementById(`qbtn-prev-${lessonId}`);
  const nextBtn = document.getElementById(`qbtn-next-${lessonId}`);
  if (prevBtn) prevBtn.disabled = qi === 0;

  const state = LS.quizState[lessonId];
  if (nextBtn) {
    if (qi === lesson.quiz.length - 1) {
      const allAnswered = Object.keys(state.answers).length === lesson.quiz.length;
      nextBtn.textContent = '🏁 Nộp bài';
      nextBtn.onclick = () => submitQuiz(lessonId);
    } else {
      nextBtn.textContent = 'Tiếp →';
      nextBtn.onclick = () => quizNav(lessonId, 1);
    }
  }
}

function selectAnswer(lessonId, qi, oi) {
  const state = LS.quizState[lessonId];
  if (state.done) return;
  if (state.answers[qi] !== undefined) return; // already answered

  const lesson = findLesson(lessonId);
  const correct = lesson.quiz[qi].ans;
  state.answers[qi] = oi;

  // Mark options
  ['A', 'B', 'C', 'D', 'E'].forEach((_, i) => {
    const opt = document.getElementById(`qopt-${lessonId}-${qi}-${i}`);
    if (!opt) return;
    opt.classList.add('disabled');
    if (i === correct) opt.classList.add('correct');
    if (i === oi && oi !== correct) opt.classList.add('wrong');
    if (i === oi) opt.classList.add('selected');
  });

  // Show explanation
  const exp = document.getElementById(`qexp-${lessonId}-${qi}`);
  if (exp) exp.classList.add('show');

  // Update dot
  const dot = document.getElementById(`qdot-${lessonId}-${qi}`);
  if (dot) {
    dot.classList.remove('current', 'answered');
    dot.classList.add(oi === correct ? 'correct' : 'wrong');
  }

  updateQuizProgress(lessonId);

  // Auto-advance after 1.2s if not last question
  if (qi < lesson.quiz.length - 1) {
    setTimeout(() => quizNav(lessonId, 1), 1200);
  }
}

function quizNav(lessonId, dir) {
  const state = LS.quizState[lessonId];
  const lesson = findLesson(lessonId);
  const next = state.current + dir;
  if (next < 0 || next >= lesson.quiz.length) return;
  state.current = next;
  showQuestion(lessonId, next);
}

function updateQuizProgress(lessonId) {
  const lesson = findLesson(lessonId);
  const state = LS.quizState[lessonId];
  const pct = (Object.keys(state.answers).length / lesson.quiz.length) * 100;
  const fill = document.getElementById(`qpf-${lessonId}`);
  if (fill) fill.style.width = pct + '%';
}

function submitQuiz(lessonId) {
  const lesson = findLesson(lessonId);
  const state = LS.quizState[lessonId];

  if (Object.keys(state.answers).length < lesson.quiz.length) {
    // Still unanswered questions — navigate to first unanswered
    for (let i = 0; i < lesson.quiz.length; i++) {
      if (state.answers[i] === undefined) {
        state.current = i;
        showQuestion(lessonId, i);
        tw('⚠️ Hãy trả lời hết tất cả câu hỏi!', 'warn');
        return;
      }
    }
  }

  state.done = true;
  const score = lesson.quiz.filter((q, i) => state.answers[i] === q.ans).length;
  const total = lesson.quiz.length;
  const pct = Math.round((score / total) * 100);

  let emoji, label, cls;
  if (pct >= 80) { emoji = '🏆'; label = 'Xuất sắc!'; cls = 'great'; }
  else if (pct >= 60) { emoji = '👍'; label = 'Khá tốt!'; cls = 'ok'; }
  else { emoji = '💪'; label = 'Cần ôn thêm!'; cls = 'retry'; }

  if (score === total) LS.done[lessonId] = true;

  const qbody = document.getElementById(`qbody-${lessonId}`);
  const result = document.getElementById(`qresult-${lessonId}`);
  if (!qbody || !result) return;

  // Hide questions
  qbody.querySelectorAll('.ls-question').forEach(q => q.style.display = 'none');
  document.getElementById(`ls-quiz-${lessonId}`)?.querySelector('.ls-quiz-nav')?.style.setProperty('display', 'none');

  result.innerHTML = `
    <div class="ls-result-ring ${cls}">${emoji}</div>
    <div class="ls-result-score ${cls}">${score}/${total}</div>
    <div class="ls-result-label">${label}</div>
    <div class="ls-result-sub">Bạn trả lời đúng <strong>${score}</strong> trên <strong>${total}</strong> câu (${pct}%)</div>
    <div class="ls-result-btns">
      <button class="btn btn-ghost" style="font-size:.85rem" onclick="retryQuiz('${lessonId}')">🔄 Làm lại</button>
      ${nextLessonBtn(lessonId)}
    </div>
  `;
  result.classList.add('show');

  // Update progress fill to 100%
  const fill = document.getElementById(`qpf-${lessonId}`);
  if (fill) fill.style.width = '100%';

  // Show ✓ badge in sidebar
  updateSidebarDone(lessonId);
}

function retryQuiz(lessonId) {
  LS.quizState[lessonId] = { current: 0, answers: {}, done: false };
  renderLessonContent();
}

function nextLessonBtn(lessonId) {
  const data = LESSON_DATA[LS.grade];
  for (const ch of data.chapters) {
    const idx = ch.lessons.findIndex(l => l.id === lessonId);
    if (idx !== -1) {
      if (idx < ch.lessons.length - 1) {
        const next = ch.lessons[idx + 1];
        return `<button class="btn btn-teal" style="font-size:.85rem" onclick="selectLesson('${ch.id}','${next.id}')">Bài tiếp → </button>`;
      }
    }
  }
  return '';
}

function updateSidebarDone(lessonId) {
  document.querySelectorAll('.ls-lesson-btn').forEach(b => {
    if (b.onclick && b.onclick.toString().includes(`'${lessonId}'`)) {
      if (!b.querySelector('.ls-lesson-done')) {
        const done = document.createElement('span');
        done.className = 'ls-lesson-done';
        done.textContent = '✓';
        b.appendChild(done);
      }
    }
  });
}

function findLesson(lessonId) {
  for (const grade of Object.values(LESSON_DATA)) {
    for (const ch of grade.chapters) {
      const lesson = ch.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
  }
  return null;
}

/* Helper: toast message */
function tw(msg, type = 'info') {
  const t = document.getElementById('tw');
  if (!t) return;
  t.textContent = msg;
  t.className = 'tw show ' + type;
  clearTimeout(tw._t);
  tw._t = setTimeout(() => t.classList.remove('show'), 2500);
}

/* ──────────────────────────────────────────────────
   MOBILE DRAWER & NAVIGATION SYSTEM
────────────────────────────────────────────────── */

function initMobileLessonUI() {
  if (document.getElementById('ls-mobile-fab')) return; // Already inited

  const page = document.getElementById('page-lesson');
  if (!page) return;

  // ── Backdrop overlay ──
  const backdrop = document.createElement('div');
  backdrop.id = 'ls-drawer-backdrop';
  backdrop.className = 'ls-drawer-backdrop';
  backdrop.onclick = closeLessonDrawer;
  page.appendChild(backdrop);

  // ── FAB button (open drawer) ──
  const fab = document.createElement('button');
  fab.id = 'ls-mobile-fab';
  fab.className = 'ls-mobile-fab';
  fab.setAttribute('aria-label', 'Mở mục lục bài học');
  fab.innerHTML = `<span class="ls-fab-icon">📋</span><span class="ls-fab-label">Mục lục</span>`;
  fab.onclick = toggleLessonDrawer;
  page.appendChild(fab);

  // ── Mobile lesson navigation bar ──
  const navBar = document.createElement('div');
  navBar.id = 'ls-mobile-lesson-nav';
  navBar.className = 'ls-mobile-lesson-nav';
  navBar.innerHTML = `
    <button class="ls-mnav-btn ls-mnav-prev" id="ls-mnav-prev" onclick="mobilePrevLesson()" disabled>
      <span>←</span><span class="ls-mnav-btn-label">Trước</span>
    </button>
    <div class="ls-mnav-center">
      <div class="ls-mnav-info" id="ls-mnav-info">📚 Chọn bài để bắt đầu</div>
    </div>
    <button class="ls-mnav-btn ls-mnav-next" id="ls-mnav-next" onclick="mobileNextLesson()" disabled>
      <span class="ls-mnav-btn-label">Sau</span><span>→</span>
    </button>
  `;
  page.appendChild(navBar);

  // Init mobile nav display
  updateMobileLessonNav();
}

function toggleLessonDrawer() {
  const sidebar = document.getElementById('ls-sidebar');
  const backdrop = document.getElementById('ls-drawer-backdrop');
  if (!sidebar) return;

  const isOpen = sidebar.classList.contains('drawer-open');
  if (isOpen) {
    closeLessonDrawer();
  } else {
    // Inject handle if not already present
    if (!sidebar.querySelector('.ls-drawer-handle-wrap')) {
      const handle = document.createElement('div');
      handle.className = 'ls-drawer-handle-wrap';
      handle.innerHTML = `
        <div class="ls-drawer-grip"></div>
        <div class="ls-drawer-titlebar">
          <span>📚 Mục lục bài học</span>
          <button class="ls-drawer-close-btn" onclick="closeLessonDrawer()" aria-label="Đóng">✕</button>
        </div>
      `;
      sidebar.insertBefore(handle, sidebar.firstChild);
    }
    sidebar.classList.add('drawer-open');
    if (backdrop) backdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeLessonDrawer() {
  const sidebar = document.getElementById('ls-sidebar');
  const backdrop = document.getElementById('ls-drawer-backdrop');
  if (sidebar) sidebar.classList.remove('drawer-open');
  if (backdrop) backdrop.classList.remove('show');
  document.body.style.overflow = '';
}

function updateMobileLessonNav() {
  const navInfo = document.getElementById('ls-mnav-info');
  const prevBtn = document.getElementById('ls-mnav-prev');
  const nextBtn = document.getElementById('ls-mnav-next');

  if (!navInfo) return;

  if (!LS.lessonId) {
    navInfo.textContent = '📚 Chọn bài để bắt đầu';
    if (prevBtn) { prevBtn.disabled = true; prevBtn._data = null; }
    if (nextBtn) { nextBtn.disabled = true; nextBtn._data = null; }
    return;
  }

  const data = LESSON_DATA[LS.grade];
  let prevData = null, nextData = null;
  let foundChIdx = -1, foundLIdx = -1;

  outer:
  for (let ci = 0; ci < data.chapters.length; ci++) {
    const ch = data.chapters[ci];
    for (let li = 0; li < ch.lessons.length; li++) {
      if (ch.lessons[li].id === LS.lessonId) {
        foundChIdx = ci; foundLIdx = li;
        break outer;
      }
    }
  }

  if (foundChIdx === -1) return;

  const chapter = data.chapters[foundChIdx];
  const lesson = chapter.lessons[foundLIdx];

  // Short title for nav display
  navInfo.textContent = lesson.title.replace(/^Bài \d+:\s*/, '');

  // Find prev lesson (cross-chapter)
  if (foundLIdx > 0) {
    prevData = { chId: chapter.id, lessonId: chapter.lessons[foundLIdx - 1].id };
  } else {
    for (let ci = foundChIdx - 1; ci >= 0; ci--) {
      const prevCh = data.chapters[ci];
      if (prevCh.lessons && prevCh.lessons.length > 0) {
        prevData = { chId: prevCh.id, lessonId: prevCh.lessons[prevCh.lessons.length - 1].id };
        break;
      }
    }
  }

  // Find next lesson (cross-chapter)
  if (foundLIdx < chapter.lessons.length - 1) {
    nextData = { chId: chapter.id, lessonId: chapter.lessons[foundLIdx + 1].id };
  } else {
    for (let ci = foundChIdx + 1; ci < data.chapters.length; ci++) {
      const nextCh = data.chapters[ci];
      if (nextCh.lessons && nextCh.lessons.length > 0) {
        nextData = { chId: nextCh.id, lessonId: nextCh.lessons[0].id };
        break;
      }
    }
  }

  if (prevBtn) { prevBtn.disabled = !prevData; prevBtn._data = prevData; }
  if (nextBtn) { nextBtn.disabled = !nextData; nextBtn._data = nextData; }
}

function mobilePrevLesson() {
  const btn = document.getElementById('ls-mnav-prev');
  if (btn && btn._data) {
    selectLesson(btn._data.chId, btn._data.lessonId);
  }
}

function mobileNextLesson() {
  const btn = document.getElementById('ls-mnav-next');
  if (btn && btn._data) {
    selectLesson(btn._data.chId, btn._data.lessonId);
  }
}