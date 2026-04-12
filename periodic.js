/* ═══ BẢNG TUẦN HOÀN (PERIODIC TABLE) JS ═══ */

let ptRendered = false;
let atomSceneInfo = null;

// The color mapping based on element categories
const CAT_COLORS = {
  'nonmetal': '#22c55e',       // green
  'noble': '#a855f7',          // purple
  'alkali': '#f43f5e',         // rose
  'alkaline-earth': '#f59e0b', // amber
  'metalloid': '#14b8a6',      // teal
  'halogen': '#ef4444',        // red
  'transition': '#3b82f6',     // blue
  'post-transition': '#6366f1',// indigo
  'actinide': '#d946ef'        // fuchsia
};

function initPeriodicTable() {
  if (ptRendered) return;
  
  const container = document.getElementById('periodic-table-container');
  if (!container) return;

  // Add elements
  ELEMENTS_DATA.forEach(el => {
    const card = document.createElement('div');
    let blockClass = '';
    let spCol = 0, dCol = 0, fCol = 0;
    
    // Group logic
    if (el.group >= 1 && el.group <= 2 || el.group >= 13 && el.group <= 18) {
       blockClass = 'b-sp';
       spCol = el.group <= 2 ? el.group : el.group - 10;
    } else if (el.group >= 3 && el.group <= 12) {
       blockClass = 'b-d';
       dCol = el.group - 2;
    }
    
    // For Actinides/Lanthanides (hack mapping based on our mockup)
    if (el.sym === 'U') {
       blockClass = 'b-f';
       fCol = 4; // Arbitrary column map
    }

    card.className = `pt-el ${el.cat} ${blockClass}`;
    card.style.gridColumn = el.group;
    card.style.gridRow = el.period;
    
    // Default styling properties for CSS overrides
    card.style.setProperty('--col', el.group);
    card.style.setProperty('--row', el.period);

    // Support actinide offsets if needed
    if (el.sym === 'U') {
       card.style.gridRow = 9;
       card.style.gridColumn = 6;
       card.style.setProperty('--row', 9);
       card.style.setProperty('--col', 6);
    }

    card.style.setProperty('--sp-col', spCol);
    card.style.setProperty('--d-col', dCol);
    card.style.setProperty('--f-col', fCol);

    card.innerHTML = `
      <div class="el-num">${el.num}</div>
      <div class="el-sym">${el.sym}</div>
      <div class="el-name">${el.name}</div>
    `;
    
    card.onclick = () => openElementDetail(el);
    container.appendChild(card);
  });
  
  ptRendered = true;
}

function openElementDetail(el) {
  document.getElementById('periodic-table-container').style.display = 'none';
  const overlay = document.getElementById('element-detail-overlay');
  overlay.classList.add('open');
  
  const color = CAT_COLORS[el.cat] || '#0d9488';
  
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  
  document.getElementById('ed-content').innerHTML = `
    <div style="display:flex; justify-content: space-between; align-items: flex-start;">
      <button class="btn btn-ghost" onclick="closeElementDetail()" style="padding: 0.5rem 1rem; border-radius: 8px; display: flex; align-items: center; gap: 0.5rem; font-family: var(--font-m); font-size: 0.85rem; background: var(--bg-2); border: 1px solid var(--border-2); color: var(--text);">
        <span style="font-size: 1.2rem;">←</span> Quay lại
      </button>
    </div>
    <div class="ed-head">
      <div class="ed-sym-box" style="background: linear-gradient(135deg, ${color}, ${lightenColor(color, 40)})">
        ${el.sym}
      </div>
      <div>
        <div class="ed-num">Nguyên tố số ${el.num}</div>
        <div style="display:flex; align-items:center; gap: 0.5rem">
          <div class="ed-title">${el.name}</div>
          <button id="btn-pronounce" class="ed-speak-btn" onclick="playPronunciation('${el.name}')" title="Nghe phát âm chuẩn">🔊</button>
        </div>
      </div>
    </div>
    
    <div class="ed-grid">
      <div class="ed-card">
        <div class="ed-lbl">Khối lượng nguyên tử</div>
        <div class="ed-val">${el.mass} u</div>
      </div>
      <div class="ed-card">
        <div class="ed-lbl">Cấu hình Electron</div>
        <div class="ed-val">${el.elConfig}</div>
      </div>
      <div class="ed-card">
        <div class="ed-lbl">Trạng thái Oxi hóa</div>
        <div class="ed-val">${el.oxStates || 'N/A'}</div>
      </div>
      <div class="ed-card">
        <div class="ed-lbl">Ứng dụng chính</div>
        <div class="ed-val" style="font-size: 0.85rem; font-weight: 500">${el.uses || 'Nhiều ứng dụng'}</div>
      </div>
    </div>
    
    <div class="ed-fact-box" style="border-left-color: ${color}">
      <strong>✨ Hóa học thú vị:</strong> ${el.fact || 'Nguyên tố này chứa đầy bí ẩn đang chờ bạn khám phá.'}
    </div>
  `;
  
  // Render 3D Model
  render3DAtom(el, color);
}

function closeElementDetail() {
  document.getElementById('element-detail-overlay').classList.remove('open');
  document.getElementById('periodic-table-container').style.display = 'grid';
  
  // Clean up 3D scene
  if (atomSceneInfo) {
    cancelAnimationFrame(atomSceneInfo.reqId);
    atomSceneInfo.renderer.dispose();
    document.getElementById('atom-3d-container').innerHTML = '';
    atomSceneInfo = null;
  }
}

// Three.js Render Logic
function render3DAtom(el, baseColor) {
  const container = document.getElementById('atom-3d-container');
  container.innerHTML = ''; // clear old
  
  if (!window.THREE) {
    container.innerHTML = `<div style="padding:2rem;text-align:center;color:var(--text-4)">Đang tải engine 3D...</div>`;
    setTimeout(() => render3DAtom(el, baseColor), 500);
    return;
  }
  
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  const scene = new THREE.Scene();
  // We don't add full background, use CSS background via alpha:true
  
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 25;
  
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);
  
  const atomGroup = new THREE.Group();
  scene.add(atomGroup);
  
  // Nucleus
  // Handle Theme
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const neutronCol = isDark ? '#cbd5e1' : '#64748b'; // Sáng thì nơtron sậm màu hơn tí để dễ nhìn
  const orbitCol = isDark ? 0xffffff : 0x000000;
  const orbitOpacity = isDark ? 0.2 : 0.15;
  const electronCol = '#fbbf24';

  const nucleusGroup = new THREE.Group();
  const protonMat = new THREE.MeshPhongMaterial({ color: baseColor, shininess: 80 });
  const neutronMat = new THREE.MeshPhongMaterial({ color: neutronCol, shininess: 80 });
  const nucleonGeo = new THREE.SphereGeometry(0.6, 16, 16);
  
  // Generate a cluster of spheres for the nucleus based on atomic number
  const nucleonCount = Math.min(el.num * 2, 40); // Cap at 40 for performance/visual clarity
  for(let i=0; i<nucleonCount; i++) {
    const isProton = Math.random() > 0.5;
    const mesh = new THREE.Mesh(nucleonGeo, isProton ? protonMat : neutronMat);
    // Random position in a small sphere
    const r = Math.random() * 1.5;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    mesh.position.x = r * Math.sin(phi) * Math.cos(theta);
    mesh.position.y = r * Math.sin(phi) * Math.sin(theta);
    mesh.position.z = r * Math.cos(phi);
    nucleusGroup.add(mesh);
  }
  atomGroup.add(nucleusGroup);
  
  // Shells and Electrons
  const electrons = [];
  const shells = el.shells || [2, 8]; // fallback
  
  const electronGeo = new THREE.SphereGeometry(0.3, 16, 16);
  const electronMat = new THREE.MeshPhongMaterial({ 
    color: electronCol, 
    emissive: '#f59e0b',
    emissiveIntensity: 0.5 
  });
  
  const orbitMat = new THREE.LineBasicMaterial({ color: orbitCol, transparent: true, opacity: orbitOpacity });
  
  shells.forEach((electronCount, shellIdx) => {
    const radius = 3.5 + shellIdx * 2.5;
    
    // Draw orbit path
    const orbitCurve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2*Math.PI, false, 0);
    const points = orbitCurve.getPoints(64);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
    const orbitMesh = new THREE.Line(orbitGeo, orbitMat);
    
    // Randomly tilt the orbit
    orbitMesh.rotation.x = Math.random() * Math.PI;
    orbitMesh.rotation.y = Math.random() * Math.PI;
    atomGroup.add(orbitMesh);
    
    // Add electrons to this shell
    for(let e=0; e<electronCount; e++) {
      const elMesh = new THREE.Mesh(electronGeo, electronMat);
      const angle = (e / electronCount) * Math.PI * 2;
      electrons.push({
        mesh: elMesh,
        orbitParams: {
          radius: radius,
          angle: angle,
          speed: 0.01 + Math.random() * 0.01,
          rotX: orbitMesh.rotation.x,
          rotY: orbitMesh.rotation.y
        }
      });
      atomGroup.add(elMesh);
    }
  });

  // Animation Loop
  let reqId;
  function animate() {
    reqId = requestAnimationFrame(animate);
    
    // Rotate entire atom slowly
    atomGroup.rotation.y += 0.005;
    atomGroup.rotation.x += 0.002;
    
    // Rotate nucleus slightly faster
    nucleusGroup.rotation.y += 0.01;
    
    // Move electrons along orbits
    electrons.forEach(elObj => {
      const p = elObj.orbitParams;
      p.angle += p.speed;
      
      // Calculate local 2D position on orbit
      const lx = Math.cos(p.angle) * p.radius;
      const ly = Math.sin(p.angle) * p.radius;
      
      // Apply orbit rotations (simplified Euler rotation)
      const cx = Math.cos(p.rotX), sx = Math.sin(p.rotX);
      const cy = Math.cos(p.rotY), sy = Math.sin(p.rotY);
      
      // Rotate around X, then Y
      const x1 = lx;
      const y1 = ly * cx;
      const z1 = ly * sx;
      
      const x2 = x1 * cy + z1 * sy;
      const y2 = y1;
      const z2 = -x1 * sy + z1 * cy;
      
      elObj.mesh.position.set(x2, y2, z2);
    });
    
    // Thêm theo dõi theme real-time để update nếu user đổi theme
    const curDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if(curDark !== (orbitMat.color.getHex() === 0xffffff)) {
       orbitMat.color.setHex(curDark ? 0xffffff : 0x000000);
       orbitMat.opacity = curDark ? 0.2 : 0.15;
       neutronMat.color.set(curDark ? '#cbd5e1' : '#64748b');
    }

    renderer.render(scene, camera);
  }
  
  animate();
  
  // Store info to cleanup later
  atomSceneInfo = { renderer, reqId };
  
  // Handle resize gracefully
  window.addEventListener('resize', () => {
    if(!atomSceneInfo || !document.getElementById('atom-3d-container')) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }, {once: true});
}

function lightenColor(color, percent) {
  var num = parseInt(color.replace("#",""),16),
  amt = Math.round(2.55 * percent),
  R = (num >> 16) + amt,
  B = (num >> 8 & 0x00FF) + amt,
  G = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
}

// ── TTS THUYẾT MINH PHÁT ÂM ──
// Nạp giọng đọc trước để tránh lỗi async trên một số trình duyệt
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
}

function playPronunciation(word) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Dừng nếu đang đọc dở
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US'; 
    utterance.rate = 0.85; // Đọc chậm lại gốc tiếng để học sinh nghe rõ 
    
    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(v => v.lang.startsWith('en-US') && v.name.includes('Google')) || voices.find(v => v.lang.startsWith('en-'));
    if (usVoice) utterance.voice = usVoice;

    // Hiệu ứng nhấp nháy cho nút
    const btn = document.getElementById('btn-pronounce');
    if(btn) {
      btn.classList.add('playing');
      utterance.onend = () => btn.classList.remove('playing');
      utterance.onerror = () => btn.classList.remove('playing');
    }
    
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Trình duyệt không hỗ trợ Web Speech API.");
  }
}

function switchPtMode(mode, btnEl) {
  // Update active tab styling
  document.querySelectorAll('.pt-m-tab').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  
  // Set the grid mode wrapper
  const container = document.getElementById('periodic-table-container');
  if (container) {
    container.className = 'pt-mode-' + mode;
  }
}

// Hook into existing navigation if possible
// We will intercept the active page changes.
document.addEventListener('DOMContentLoaded', () => {
  // Listen for clicks on the newly added periodic table nav links
  const links = document.querySelectorAll('#nl-periodic, #bn-periodic');
  links.forEach(link => {
    link.addEventListener('click', () => {
      // Khi nhấn vào tab Khám Phá, luôn hiện màn hình lựa chọn trước
      backToDiscovery();
    });
  });
});

function showPeriodicTable() {
  const selection = document.getElementById('discovery-selection');
  const content = document.getElementById('periodic-content');
  if (selection) selection.style.display = 'none';
  if (content) {
    content.style.display = 'block';
    content.classList.add('fade-up');
    // Khởi tạo bảng nếu chưa có
    initPeriodicTable();
  }
}

function backToDiscovery() {
  const selection = document.getElementById('discovery-selection');
  const content = document.getElementById('periodic-content');
  if (selection) {
    selection.style.display = 'grid';
    selection.classList.add('fade-up');
  }
  if (content) content.style.display = 'none';
}
