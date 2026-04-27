/* ═══ GloryChem Smart — AI Chemistry Assistant + 3D Molecule Viewer ═══ */
'use strict';

const GloryChemAI = (() => {
  // ── State ──
  let scene, camera, renderer, controls, animFrameId;
  let currentMolData = null;
  let currentImageData = [];
  let currentImageIndex = 0;
  let chatHistory = [];   // [{role, content}]
  let isLoading = false;
  let renderMode = 'ballstick';

  // ── DOM refs (set in init) ──
  let elMessages, elTyping, elTextarea, elSendBtn,
      elCanvas, el3dEmpty, el3dLoading,
      elMolFormula, elMolName, elMolDesc, elMolStats,
      elMolInfoCard, elMolEmptyState, elMolInfoInner,
      elImageEmpty, elImageLoading, elImageCarousel, elImageTrack,
      elImageDots, elImagePrev, elImageNext, elImageViewport;

  // ── Atom color & radius table ──
  const ATOM = {
    H:  { color: 0xffffff, r: 0.31 },
    C:  { color: 0x333333, r: 0.77 },
    N:  { color: 0x3050f8, r: 0.75 },
    O:  { color: 0xff0d0d, r: 0.73 },
    F:  { color: 0x90e050, r: 0.71 },
    P:  { color: 0xff8000, r: 1.06 },
    S:  { color: 0xffff30, r: 1.02 },
    Cl: { color: 0x1ff01f, r: 0.99 },
    Br: { color: 0xa62929, r: 1.14 },
    I:  { color: 0x940094, r: 1.33 },
    Na: { color: 0xab5cf2, r: 1.54 },
    K:  { color: 0x8f40d4, r: 1.96 },
    Ca: { color: 0x3dff00, r: 1.97 },
    Fe: { color: 0xe06633, r: 1.26 },
    Cu: { color: 0xc88033, r: 1.28 },
    Zn: { color: 0x7d80b0, r: 1.25 },
    default: { color: 0x999999, r: 1.0 }
  };



  // ── Simple markdown → HTML ──
  function mdToHtml(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,     '<em>$1</em>')
      .replace(/`(.+?)`/g,       '<code>$1</code>')
      .replace(/^- (.+)$/gm,     '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, s => `<ul>${s}</ul>`)
      .replace(/\n{2,}/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(?!<)/m, '<p>')
      .replace(/(?<!>)$/, '</p>');
  }

  // ── Append message bubble ──
  function appendMsg(role, html, renderData) {
    const isBot = role === 'assistant';
    const wrap = document.createElement('div');
    wrap.className = `ai-msg ${isBot ? 'bot-msg' : 'user-msg'}`;

    const avatar = document.createElement('div');
    avatar.className = 'ai-msg-avatar';
    avatar.textContent = isBot ? '🤖' : '👤';

    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';
    bubble.innerHTML = html;

    // If AI detected a molecule and user can render
    if (isBot && renderData) {
      const btn = document.createElement('button');
      btn.className = 'ai-render-btn';
      btn.innerHTML = '🔬 Xem mô hình 3D';
      btn.onclick = () => fetchAndRender3D(renderData.name, renderData.cid);
      bubble.appendChild(btn);
    }

    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    elMessages.appendChild(wrap);
    elMessages.scrollTop = elMessages.scrollHeight;
    return bubble;
  }

  // ── Show / hide typing indicator ──
  function showTyping(show) {
    if (show) {
      // Di chuyển xuống cuối messages rồi mới hiện
      elMessages.appendChild(elTyping);
      elTyping.style.display = 'flex';
      elMessages.scrollTop = elMessages.scrollHeight;
    } else {
      elTyping.style.display = 'none';
    }
  }

  // ── Send message to backend ──
  async function sendMessage(userText) {
    if (!userText.trim() || isLoading) return;
    isLoading = true;
    elSendBtn.disabled = true;

    appendMsg('user', mdToHtml(userText));
    chatHistory.push({ role: 'user', content: userText });
    elTextarea.value = '';
    elTextarea.style.height = '24px';

    showTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: chatHistory.slice(-10) })
      });
      const data = await res.json();
      showTyping(false);

      if (!res.ok) throw new Error(data.error || 'Lỗi server');

      appendMsg(
        'assistant',
        mdToHtml(data.reply),
        data.molecule ? { name: data.molecule.name, cid: data.molecule.cid } : null
      );
      chatHistory.push({ role: 'assistant', content: data.reply });

      // ── Auto-render 3D ngay nếu AI trả về molecule ──
      if (data.molecule) {
        setTimeout(() => fetchAndRender3D(data.molecule.name, data.molecule.cid), 300);
      }

    } catch (err) {
      showTyping(false);
      const bubble = appendMsg('assistant', `⚠️ ${err.message}`);
      bubble.classList.add('ai-error-bubble');
    } finally {
      isLoading = false;
      elSendBtn.disabled = false;
    }
  }

  // ── Fetch 3D data & render ──
  async function fetchAndRender3D(name, cid) {
    el3dLoading.classList.add('active');
    el3dEmpty.classList.add('hidden');

    try {
      const url = cid
        ? `/api/ai/molecule3d?cid=${cid}`
        : `/api/ai/molecule3d?name=${encodeURIComponent(name)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Không tìm thấy dữ liệu');

      currentMolData = data;
      renderMolecule(data);
      updateMolInfo(data);
      fetchAndRenderImages({
        name: data.name || name,
        formula: data.formula || '',
        cid: data.cid || cid || ''
      });
    } catch (err) {
      // ── Reset về mặc định khi lỗi 3D ──
      currentMolData = null;
      if (scene) {
        while (scene.children.length > 3) scene.remove(scene.children[3]);
      }
      if (camera) camera.position.set(0, 0, 15);
      if (controls) controls.reset();

      if (elMolEmptyState) elMolEmptyState.style.display = 'block';
      if (elMolInfoInner) elMolInfoInner.style.display = 'none';

      el3dEmpty.classList.remove('hidden');
      el3dEmpty.querySelector('.ai-3d-empty-text').textContent = `⚠️ ${err.message}`;

      // ── Vẫn tiếp tục tìm ảnh thực tế dù 3D thất bại ──
      if (name) {
        fetchAndRenderImages({ name, formula: '', cid: cid || '' });
      } else {
        resetImageCarousel(`⚠️ Không tải được ảnh: ${err.message}`);
      }
    } finally {
      el3dLoading.classList.remove('active');
    }
  }

  function resetImageCarousel(msg) {
    currentImageData = [];
    currentImageIndex = 0;
    if (elImageTrack) elImageTrack.innerHTML = '';
    if (elImageDots) elImageDots.innerHTML = '';
    if (elImageCarousel) elImageCarousel.style.display = 'none';
    if (elImageLoading) elImageLoading.style.display = 'none';
    if (elImageEmpty) {
      elImageEmpty.style.display = 'block';
      if (msg) elImageEmpty.textContent = msg;
    }
  }

  function updateCarouselPosition() {
    if (!elImageTrack) return;
    elImageTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    if (elImageDots) {
      elImageDots.querySelectorAll('.ai-image-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentImageIndex);
      });
    }
  }

  function moveCarousel(step) {
    if (!currentImageData.length) return;
    currentImageIndex = (currentImageIndex + step + currentImageData.length) % currentImageData.length;
    updateCarouselPosition();
  }

  function bindCarouselSwipe() {
    if (!elImageViewport) return;
    let startX = 0;
    let endX = 0;
    const threshold = 35;
    elImageViewport.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });
    elImageViewport.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const delta = endX - startX;
      if (Math.abs(delta) < threshold) return;
      if (delta > 0) moveCarousel(-1);
      else moveCarousel(1);
    }, { passive: true });
  }

  function renderImageCarousel(images, notice) {
    currentImageData = images || [];
    currentImageIndex = 0;
    if (!currentImageData.length) {
      resetImageCarousel(notice || 'Không tìm thấy ảnh thực tế phù hợp cho chất này.');
      return;
    }

    elImageTrack.innerHTML = '';
    elImageDots.innerHTML = '';

    currentImageData.forEach((img, idx) => {
      const slide = document.createElement('div');
      slide.className = 'ai-image-slide';
      const kindLabel = img.kind === 'structure'
        ? 'Ảnh cấu trúc (PubChem)'
        : (img.source === 'Wikipedia' || img.source === 'Wikimedia Commons')
          ? 'Ảnh thực tế / ngữ cảnh'
          : 'Ảnh liên quan';
      slide.innerHTML = `
        <img src="${img.url}" alt="${(img.title || 'Chemical image').replace(/"/g, '&quot;')}" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <div class="ai-image-empty" style="display:none;padding:1rem">Không tải được ảnh này.</div>
        <div class="ai-image-caption">
          <div class="ai-image-caption-title">${img.title || 'Ảnh liên quan hóa chất'}</div>
          <div class="ai-image-caption-meta">${kindLabel} • ${img.source || 'Nguồn mở'} • ${img.license || 'Kiểm tra license tại nguồn'}</div>
        </div>
      `;
      elImageTrack.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = `ai-image-dot ${idx === 0 ? 'active' : ''}`;
      dot.type = 'button';
      dot.onclick = () => {
        currentImageIndex = idx;
        updateCarouselPosition();
      };
      elImageDots.appendChild(dot);
    });

    elImageEmpty.style.display = 'none';
    elImageLoading.style.display = 'none';
    elImageCarousel.style.display = 'flex';
    updateCarouselPosition();
  }

  async function fetchAndRenderImages({ name, formula, cid }) {
    if (!name && !formula && !cid) {
      resetImageCarousel('Thiếu dữ liệu để tìm ảnh thực tế.');
      return;
    }
    elImageEmpty.style.display = 'none';
    elImageCarousel.style.display = 'none';
    elImageLoading.style.display = 'block';

    try {
      const params = new URLSearchParams();
      if (name) params.set('name', name);
      if (formula) params.set('formula', formula);
      if (cid) params.set('cid', cid);
      const res = await fetch(`/api/ai/molecule-images?${params.toString()}`);
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Không lấy được ảnh thực tế');

      // Ưu tiên ảnh thực tế trước, rồi mới tới ảnh cấu trúc
      const real = (data.real_images || []).map(x => ({ ...x, kind: x.kind || 'real' }));
      const structure = (data.structure_images || []).map(x => ({ ...x, kind: 'structure' }));
      const allImages = [...real, ...structure];
      renderImageCarousel(allImages, data.notice);
    } catch (err) {
      resetImageCarousel(`⚠️ ${err.message}`);
    } finally {
      elImageLoading.style.display = 'none';
    }
  }

  // ── Three.js: initialize scene ──
  function initThree() {
    if (renderer) { renderer.dispose(); }
    const w = elCanvas.clientWidth || 440;
    const h = elCanvas.clientHeight || 300;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 0, 15);

    renderer = new THREE.WebGLRenderer({ canvas: elCanvas, antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const dir1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dir1.position.set(5, 10, 7);
    scene.add(dir1);
    const dir2 = new THREE.DirectionalLight(0x8080ff, 0.4);
    dir2.position.set(-5, -5, -5);
    scene.add(dir2);

    // OrbitControls
    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
    }

    // Animation loop
    if (animFrameId) cancelAnimationFrame(animFrameId);
    function animate() {
      animFrameId = requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }

  // ── Three.js: build molecule mesh ──
  function renderMolecule(data) {
    // Clear old objects
    while (scene.children.length > 3) scene.remove(scene.children[3]);

    const atoms = data.atoms || [];
    const bonds = data.bonds || [];
    const group = new THREE.Group();

    // Center
    let cx = 0, cy = 0, cz = 0;
    atoms.forEach(a => { cx += a.x; cy += a.y; cz += a.z; });
    cx /= atoms.length || 1; cy /= atoms.length || 1; cz /= atoms.length || 1;

    // Scale factor
    let maxDist = 0;
    atoms.forEach(a => {
      const d = Math.sqrt((a.x - cx)**2 + (a.y - cy)**2 + (a.z - cz)**2);
      if (d > maxDist) maxDist = d;
    });
    const scale = maxDist > 0.1 ? 4 / maxDist : 1;

    // Draw atoms
    atoms.forEach((a, i) => {
      const info = ATOM[a.element] || ATOM.default;
      const radius = renderMode === 'spacefill' ? info.r * 0.45 * scale
                   : renderMode === 'wireframe' ? 0.06 * scale
                   : info.r * 0.28 * scale;
      const geo = new THREE.SphereGeometry(radius, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: info.color,
        roughness: 0.4,
        metalness: 0.15,
        wireframe: renderMode === 'wireframe',
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((a.x - cx) * scale, (a.y - cy) * scale, (a.z - cz) * scale);
      mesh.userData = { index: i, element: a.element };
      group.add(mesh);
    });

    // Draw bonds (ball-stick mode)
    if (renderMode !== 'spacefill') {
      bonds.forEach(b => {
        const a1 = atoms[b.begin];
        const a2 = atoms[b.end];
        if (!a1 || !a2) return;
        const v1 = new THREE.Vector3((a1.x - cx)*scale, (a1.y - cy)*scale, (a1.z - cz)*scale);
        const v2 = new THREE.Vector3((a2.x - cx)*scale, (a2.y - cy)*scale, (a2.z - cz)*scale);
        const dir = new THREE.Vector3().subVectors(v2, v1);
        const dirNorm = dir.clone().normalize();
        const len = dir.length();
        const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
        
        // Vẽ nhiều khối trụ (cylinder) tùy thuộc vào bậc liên kết (order)
        const order = b.order || 1;
        const bondRadius = 0.05 * scale;
        const geo = new THREE.CylinderGeometry(bondRadius, bondRadius, len, 12);
        const mat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.5, metalness: 0.1 });

        if (order === 1) {
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.copy(mid);
          mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dirNorm);
          group.add(mesh);
        } else {
          // Tính vector vuông góc với hướng liên kết để tạo độ lệch song song
          let up = new THREE.Vector3(0, 1, 0);
          if (Math.abs(dirNorm.y) > 0.9) up.set(1, 0, 0);
          const normal = new THREE.Vector3().crossVectors(dirNorm, up).normalize();
          
          const offsetDist = bondRadius * 2.5; // Khoảng cách giữa các liên kết

          if (order === 2) {
            for (let i of [-0.5, 0.5]) {
              const offset = normal.clone().multiplyScalar(i * offsetDist);
              const mesh = new THREE.Mesh(geo, mat);
              mesh.position.copy(mid).add(offset);
              mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dirNorm);
              group.add(mesh);
            }
          } else if (order === 3) {
            for (let i of [-1, 0, 1]) {
              const offset = normal.clone().multiplyScalar(i * offsetDist);
              const mesh = new THREE.Mesh(geo, mat);
              mesh.position.copy(mid).add(offset);
              mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), dirNorm);
              group.add(mesh);
            }
          }
        }
      });
    }

    scene.add(group);
    // Fit camera
    camera.position.set(0, 0, maxDist * scale * 3.5 + 4);
    if (controls) controls.reset();
  }

  // ── Helper: Chuẩn hóa công thức hóa học ──
  function formatFormula(str, isText = false) {
    if (!str) return isText ? '' : '—';
    const sub = { '0':'₀', '1':'₁', '2':'₂', '3':'₃', '4':'₄', '5':'₅', '6':'₆', '7':'₇', '8':'₈', '9':'₉' };
    
    if (isText) {
      // Trong đoạn văn, chỉ subscript các số đứng ngay sau chữ cái hoặc dấu ngoặc đóng (VD: H2O, Ca(OH)2)
      return str.replace(/(?<=[a-zA-Z\]\)])\d+/g, match => match.split('').map(d => sub[d]).join(''));
    }
    // Đối với trường "Công thức", an toàn để chuyển tất cả số thành subscript
    return str.replace(/\d/g, m => sub[m]);
  }

  // ── Update info card ──
  function updateMolInfo(data) {
    elMolEmptyState.style.display = 'none';
    elMolInfoInner.style.display = 'block';
    elMolFormula.textContent  = formatFormula(data.formula, false);
    // Hiển thị tên gọi ngắn ngọn hoặc mã CID cho card title 
    elMolName.textContent     = (data.name && data.name.length < 30 ? data.name : (currentMolData ? currentMolData.name : '')) || `Hợp chất CID ${data.cid || '—'}`;
    elMolDesc.textContent     = formatFormula(data.desc, true);
    elMolStats.innerHTML = '';
    const stats = [
      ['Tên gọi IUPAC', data.name || '—'],
      ['Nguyên tử', data.atoms ? data.atoms.length : '—'],
      ['Liên kết',  data.bonds ? data.bonds.length : '—'],
      ['Khối lượng', data.weight ? data.weight + ' g/mol' : '—'],
      ['Khối lượng chuẩn', data.exact_mass ? data.exact_mass + ' u' : '—'],
      ['Mã PubChem', data.cid || '—'],
      ['Độ phức tạp', data.complexity || '—']
    ];
    stats.forEach(([lbl, val]) => {
      elMolStats.innerHTML += `
        <div class="ai-mol-stat">
          <div class="ai-mol-stat-lbl">${lbl}</div>
          <div class="ai-mol-stat-val">${val}</div>
        </div>`;
    });
  }

  // ── Switch render mode ──
  function setRenderMode(mode) {
    renderMode = mode;
    document.querySelectorAll('.ai-3d-ctrl-btn[data-mode]').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });
    if (currentMolData) renderMolecule(currentMolData);
  }

  // ── Auto-resize textarea ──
  function autoResize(ta) {
    ta.style.height = '24px';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  }

  // ── Toggle Expand 3D Viewer ──
  function toggleExpand() {
    const elCard = document.getElementById('ai-3d-card');
    const elOverlay = document.getElementById('ai-3d-overlay');
    const elBtn = document.getElementById('ai-3d-expand-btn');
    
    if (elCard.classList.contains('expanded')) {
      elCard.classList.remove('expanded');
      elOverlay.classList.remove('active');
      elBtn.innerHTML = '⛶'; // Biểu tượng maximize
      elBtn.title = 'Phóng to';
    } else {
      elCard.classList.add('expanded');
      elOverlay.classList.add('active');
      elBtn.innerHTML = '✖'; // Biểu tượng close
      elBtn.title = 'Thu nhỏ';
    }

    // Force re-render để mô hình tự căn giữa và không bị che khuất
    setTimeout(() => {
      if (renderer && elCanvas) {
        const wrap = elCanvas.parentElement;
        renderer.setSize(wrap.clientWidth, wrap.clientHeight);
        camera.aspect = wrap.clientWidth / wrap.clientHeight;
        camera.updateProjectionMatrix();
        if (currentMolData) renderMolecule(currentMolData);
      }
    }, 50);
  }

  // ── Public: show page ──
  function show() {
    document.getElementById('discovery-selection').style.display = 'none';
    document.getElementById('glorychem-ai-content').style.display = 'block';
    if (!renderer) initThree();
  }

  // ── Public: hide page ──
  function hide() {
    document.getElementById('glorychem-ai-content').style.display = 'none';
    document.getElementById('discovery-selection').style.display = '';
  }

  // ── Init ──
  function init() {
    elMessages     = document.getElementById('ai-messages');
    elTyping       = document.getElementById('ai-typing');
    elTextarea     = document.getElementById('ai-textarea');
    elSendBtn      = document.getElementById('ai-send-btn');
    elCanvas       = document.getElementById('ai-molecule-canvas');
    el3dEmpty      = document.getElementById('ai-3d-empty');
    el3dLoading    = document.getElementById('ai-3d-loading');
    elMolFormula   = document.getElementById('ai-mol-formula');
    elMolName      = document.getElementById('ai-mol-name');
    elMolDesc      = document.getElementById('ai-mol-desc');
    elMolStats     = document.getElementById('ai-mol-stats');
    elMolInfoCard  = document.getElementById('ai-mol-info-card');
    elMolEmptyState= document.getElementById('ai-mol-empty-state');
    elMolInfoInner = document.getElementById('ai-mol-info-inner');
    elImageEmpty   = document.getElementById('ai-image-empty');
    elImageLoading = document.getElementById('ai-image-loading');
    elImageCarousel= document.getElementById('ai-image-carousel');
    elImageTrack   = document.getElementById('ai-image-track');
    elImageDots    = document.getElementById('ai-image-dots');
    elImagePrev    = document.getElementById('ai-image-prev');
    elImageNext    = document.getElementById('ai-image-next');
    elImageViewport= document.getElementById('ai-image-viewport');



    // Send button
    elSendBtn.onclick = () => sendMessage(elTextarea.value);

    // Enter key (Shift+Enter = newline)
    elTextarea.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(elTextarea.value); }
    });
    elTextarea.addEventListener('input', () => autoResize(elTextarea));

    // Render mode buttons
    document.querySelectorAll('.ai-3d-ctrl-btn[data-mode]').forEach(b => {
      b.onclick = () => setRenderMode(b.dataset.mode);
    });

    // Clear chat
    document.getElementById('ai-clear-btn').onclick = () => {
      chatHistory = [];
      elMessages.innerHTML = '';
      resetImageCarousel('Chưa có ảnh. Hãy hỏi AI về một chất để tải ảnh tự động.');
      appendMsg('assistant', mdToHtml('🧪 Xin chào! Tôi là **GloryChem Smart**, trợ lý Hóa học thông minh.\n\nHãy hỏi tôi bất kỳ điều gì về Hóa học — từ cấu trúc phân tử đến phản ứng hóa học. Nếu bạn muốn xem mô hình 3D của một chất, hãy yêu cầu tôi!'));
    };

    // Expand logic
    document.getElementById('ai-3d-expand-btn').onclick = toggleExpand;
    document.getElementById('ai-3d-overlay').onclick = toggleExpand;
    if (elImagePrev) elImagePrev.onclick = () => moveCarousel(-1);
    if (elImageNext) elImageNext.onclick = () => moveCarousel(1);
    bindCarouselSwipe();

    // ResizeObserver for canvas wrapper
    if (window.ResizeObserver) {
      new ResizeObserver(() => {
        if (!renderer || !elCanvas || !elCanvas.parentElement) return;
        const w = elCanvas.parentElement.clientWidth;
        const h = elCanvas.parentElement.clientHeight;
        if (w > 0 && h > 0) {
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
      }).observe(document.querySelector('.ai-3d-canvas-wrap'));
    }

    // Welcome message
    appendMsg('assistant', mdToHtml('🧪 Xin chào! Tôi là **GloryChem Smart**, trợ lý Hóa học thông minh.\n\nHãy hỏi tôi bất kỳ điều gì về Hóa học — từ cấu trúc phân tử đến phản ứng hóa học. Nếu bạn muốn xem **mô hình 3D** của một chất, hãy yêu cầu tôi!'));
  }

  // ── Expose API ──
  return { init, show, hide, fetchAndRender3D };
})();

// ── Global helpers ──
function showGloryChemAI() { GloryChemAI.show(); }