'use strict';

let CELL_W = 90;
let CELL_H = 105;
const ROWS = 7;
const COLS = 10;

const PLANTS = {
    acid: { cost: { acid: 3 }, hp: 100, bulletType: 'acid', fireRate: 1.5, name: 'Cây Acid', color: '#00ff00' },
    base: { cost: { base: 3 }, hp: 100, bulletType: 'base', fireRate: 1.5, name: 'Cây Base', color: '#00aaff' },
    water: { cost: { fire: 3 }, hp: 100, bulletType: 'water', fireRate: 1.5, name: 'Cây Nước', color: '#44ddff' }
};

const ZOM_TYPES = ['acid', 'base', 'fire'];

class Particle {
    constructor(game, x, y, options = {}) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * (options.speed || 100);
        this.vy = (Math.random() - 0.5) * (options.speed || 100);
        this.life = options.life || 0.5;
        this.maxLife = this.life;
        this.color = options.color || '#fff';
        this.radius = options.radius || 3;
        this.gravity = options.gravity || 0;
        this.shape = options.shape || 'circle'; // 'circle' or 'text'
        this.text = options.text || '';
    }
    update(dt) {
        this.vy += this.gravity * dt;
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= dt;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life / this.maxLife;
        if (this.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else if (this.shape === 'text') {
            ctx.fillStyle = this.color;
            ctx.font = 'bold 16px Outfit';
            ctx.textAlign = 'center';
            ctx.fillText(this.text, this.x, this.y);
        }
        ctx.restore();
    }
}

// ── Chất hóa học của từng loại zombie ────────────────────────────────────────
// Zombie Acid  → mang axit  → bị khắc bởi cây Base (đạn NaOH)
// Zombie Base  → mang bazơ  → bị khắc bởi cây Acid (đạn HCl)
// Zombie Fire  → mang chất dễ cháy / phản ứng với nước → bị khắc bởi cây Nước
const SUBSTANCES = {
    acid: ['HCl', 'H₂SO₄', 'HNO₃', 'CH₃COOH'],
    base: ['NaOH', 'KOH', 'Ca(OH)₂', 'NH₃'],
    fire: ['Na', 'K', 'Mg', 'C₂H₅OH']
};

// Zombie chết rơi muối (sản phẩm phản ứng hóa học thực tế)
// key: "bulletType:zombieLabel" → loại muối rơi ra
const SALT_DROPS = {
    // Cây Acid (HCl) diệt Zombie Base
    'acid:NaOH': { salt: 'NaCl', icon: '🧂', color: '#e8e8e8' },
    'acid:KOH': { salt: 'KCl', icon: '🧂', color: '#f0e0ff' },
    'acid:Ca(OH)₂': { salt: 'CaCl₂', icon: '🧂', color: '#ffe8e8' },
    'acid:NH₃': { salt: 'NH₄Cl', icon: '🧂', color: '#fffacd' },
    // Cây Base (NaOH) diệt Zombie Acid
    'base:HCl': { salt: 'NaCl', icon: '🧂', color: '#e8e8e8' },
    'base:H₂SO₄': { salt: 'Na₂SO₄', icon: '🧂', color: '#e8f4ff' },
    'base:HNO₃': { salt: 'NaNO₃', icon: '🧂', color: '#e8ffe8' },
    'base:CH₃COOH': { salt: 'CH₃COONa', icon: '🧂', color: '#fff8e8' },
    // Cây Nước diệt Zombie Fire (C₂H₅OH) trực tiếp → tro
    'water:C₂H₅OH': { salt: 'Tro', icon: '🌫️', color: '#888888' },
    // Zombie Fire đã biến thành Base → Cây Acid diệt
    'acid:NaOH_2': { salt: 'NaCl', icon: '🧂', color: '#e8e8e8' },
    'acid:KOH_2': { salt: 'KCl', icon: '🧂', color: '#f0e0ff' },
    'acid:Mg(OH)₂': { salt: 'MgCl₂', icon: '🧂', color: '#e0ffee' },
};
// Muối mặc định nếu không khớp
const DEFAULT_SALT = { salt: 'Muối', icon: '🧂', color: '#cccccc' };

// Bảng điện phân: muối → nguyên liệu tạo ra
// Điện phân NaCl(dd) → 2NaOH + Cl₂↑ + H₂↑  (có thể dùng NaOH làm base)
// Điện phân Na₂SO₄(dd) → H₂SO₄ + 2NaOH     (tạo cả acid lẫn base)
const ELECTROLYSIS = {
    'NaCl': { requires: 2, produces: [{ type: 'base', amt: 2 }, { type: 'acid', amt: 1 }], equation: '2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑' },
    'KCl': { requires: 2, produces: [{ type: 'base', amt: 2 }, { type: 'acid', amt: 1 }], equation: '2KCl + 2H₂O → 2KOH + Cl₂↑ + H₂↑' },
    'CaCl₂': { requires: 2, produces: [{ type: 'base', amt: 1 }, { type: 'acid', amt: 2 }], equation: 'CaCl₂ + 2H₂O → Ca(OH)₂ + Cl₂↑ + H₂↑' },
    'NH₄Cl': { requires: 3, produces: [{ type: 'acid', amt: 2 }], equation: 'NH₄Cl → NH₃↑ + HCl (nhiệt phân)' },
    'Na₂SO₄': { requires: 2, produces: [{ type: 'acid', amt: 2 }, { type: 'base', amt: 2 }], equation: '2Na₂SO₄ + 2H₂O → 2H₂SO₄ + 4NaOH (điện phân)' },
    'NaNO₃': { requires: 2, produces: [{ type: 'acid', amt: 2 }, { type: 'fire', amt: 1 }], equation: '4NaNO₃ → 2Na₂O + 4NO₂↑ + O₂↑ (nhiệt phân)' },
    'CH₃COONa': { requires: 3, produces: [{ type: 'acid', amt: 1 }, { type: 'fire', amt: 2 }], equation: 'CH₃COONa + NaOH → CH₄↑ + Na₂CO₃ (vôi tôi)' },
    'MgCl₂': { requires: 2, produces: [{ type: 'base', amt: 1 }, { type: 'acid', amt: 2 }], equation: 'MgCl₂ + 2H₂O → Mg(OH)₂ + Cl₂↑ + H₂↑' },
    'Tro': { requires: 4, produces: [{ type: 'fire', amt: 3 }], equation: 'Tro hữu cơ → tái chế năng lượng nhiệt' },
    'Muối': { requires: 3, produces: [{ type: 'acid', amt: 1 }, { type: 'base', amt: 1 }], equation: 'Muối + H₂O → điện phân → Acid + Base' },
};

const ZOM_COLORS = { acid: '#00ff88', base: '#00aaff', fire: '#ff6600' };

// ── Phương trình phản ứng đúng — key: `bulletType:z.label` ──────────────────
// Mỗi cặp (loại đạn, chất zombie) → đúng 1 phương trình hóa học cụ thể
// Cây Acid dùng đạn HCl; Cây Base dùng đạn NaOH; Cây Nước dùng đạn H₂O
const REACTION_MAP = {
    // Cây Acid (đạn HCl) bắn Zombie Base ──────────────────────────────────
    //   HCl + NaOH → NaCl + H₂O
    'acid:NaOH': 'HCl + NaOH → NaCl + H₂O',
    //   HCl + KOH → KCl + H₂O
    'acid:KOH': 'HCl + KOH → KCl + H₂O',
    //   2HCl + Ca(OH)₂ → CaCl₂ + 2H₂O
    'acid:Ca(OH)₂': '2HCl + Ca(OH)₂ → CaCl₂ + 2H₂O',
    //   HCl + NH₃ → NH₄Cl   (phản ứng tạo muối amoni)
    'acid:NH₃': 'HCl + NH₃ → NH₄Cl',

    // Cây Base (đạn NaOH) bắn Zombie Acid ────────────────────────────────
    //   NaOH + HCl → NaCl + H₂O
    'base:HCl': 'NaOH + HCl → NaCl + H₂O',
    //   2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O
    'base:H₂SO₄': '2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O',
    //   NaOH + HNO₃ → NaNO₃ + H₂O
    'base:HNO₃': 'NaOH + HNO₃ → NaNO₃ + H₂O',
    //   NaOH + CH₃COOH → CH₃COONa + H₂O
    'base:CH₃COOH': 'NaOH + CH₃COOH → CH₃COONa + H₂O',

    // Cây Nước (đạn H₂O) bắn Zombie Fire ─────────────────────────────────
    //   2Na + 2H₂O → 2NaOH + H₂↑  (phản ứng mãnh liệt, tỏa nhiệt)
    'water:Na': '2Na + 2H₂O → 2NaOH + H₂↑',
    //   2K + 2H₂O → 2KOH + H₂↑    (mãnh liệt hơn Na, bốc cháy)
    'water:K': '2K + 2H₂O → 2KOH + H₂↑',
    //   Mg + 2H₂O → Mg(OH)₂ + H₂↑ (phản ứng chậm hơn với nước lạnh)
    'water:Mg': 'Mg + 2H₂O → Mg(OH)₂ + H₂↑',
    //   C₂H₅OH + H₂O: pha loãng làm giảm nồng độ, hạ điểm bắt cháy
    'water:C₂H₅OH': 'H₂O + C₂H₅OH → pha loãng → dập tắt',
};

const ZOM_FRAMES = [[1, 1, 128, 128], [131, 1, 128, 128]];

// Các chất fire khi gặp H₂O → biến thành bazơ tương ứng, cần Acid tiêu diệt tiếp
// C₂H₅OH không phản ứng với nước tạo bazơ → dập tắt bình thường (không biến đổi)
const WATER_TRANSFORMS = {
    'Na': { newLabel: 'NaOH', equation: '2Na + 2H₂O → 2NaOH + H₂↑' },
    'K': { newLabel: 'KOH', equation: '2K + 2H₂O → 2KOH + H₂↑' },
    'Mg': { newLabel: 'Mg(OH)₂', equation: 'Mg + 2H₂O → Mg(OH)₂ + H₂↑' },
    // C₂H₅OH: không biến đổi, dập tắt trực tiếp
};

class Drop {
    constructor(game, x, y, type, saltInfo) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.targetY = y + 20;
        this.vy = -30;
        this.type = type; // 'salt'
        this.saltInfo = saltInfo || DEFAULT_SALT; // { salt, icon, color }
        this.life = 10;
        this.radius = 20;
        this.collected = false;
        this._collectingTo = null;
    }
    update(dt) {
        if (this.collected) {
            // Bay đến khu vực salt storage (góc phải màn hình)
            const targetX = this.game.cssW - 60;
            const targetY = 80;
            const dx = targetX - this.x;
            const dy = targetY - this.y;
            this.x += dx * dt * 6;
            this.y += dy * dt * 6;
            if (Math.hypot(dx, dy) < 30) {
                this.game.addSalt(this.saltInfo.salt, 1);
                this.life = 0;
            }
            return;
        }
        this.vy += 100 * dt;
        this.y += this.vy * dt;
        if (this.y > this.targetY) {
            this.y = this.targetY;
            this.vy = 0;
            this.life -= dt;
        }
        // Auto-collect when clicked via the canvas click — handled in Game
    }
    draw(ctx) {
        if (this.life <= 0) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = this.collected ? 1 : Math.min(1, this.life);

        // Glow màu theo loại muối
        const sc = this.saltInfo.color || '#ffffff';
        ctx.shadowBlur = 14;
        ctx.shadowColor = sc;

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = sc + 'cc';
        ctx.fill();

        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Icon muối
        ctx.font = '13px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.saltInfo.icon, 0, 1);

        // Tên muối bên dưới (Dễ đọc hơn)
        const labelSafe = this.saltInfo.salt;
        ctx.font = 'bold 11px Outfit, sans-serif';
        const tw = ctx.measureText(labelSafe).width;
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(-tw / 2 - 4, this.radius + 2, tw + 8, 14);
        ctx.fillStyle = '#fff';
        ctx.fillText(labelSafe, 0, this.radius + 9);

        ctx.restore();
    }
}

class Plant {
    constructor(game, type, row, col) {
        this.game = game;
        this.type = type;
        this.row = row;
        this.col = col;
        this.hp = PLANTS[type].hp;
        this.maxHp = this.hp;
        this.fireCooldown = 0;
    }
    get x() { return this.game.getGridPos(this.col, this.row).x; }
    get y() { return this.game.getGridPos(this.col, this.row).y; }

    update(dt) {
        this.fireCooldown -= dt;
        if (this.fireCooldown <= 0) {
            let hasZombie = false;
            for (let z of this.game.zombies) {
                if (z.row === this.row && z.x > this.x) {
                    hasZombie = true;
                    break;
                }
            }
            if (hasZombie) {
                this.game.bullets.push(new Bullet(this.game, this.x + 20, this.row, this.type));
                this.fireCooldown = PLANTS[this.type].fireRate;
            }
        }
    }
    draw(ctx) {
        const img = this.game.images[this.type + 'plant'];
        const pos = this.game.getGridPos(this.col, this.row);
        const size = pos.w * 0.95;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.type === 'acid' ? '#00ff00' : (this.type === 'base' ? '#00aaff' : '#44ddff');
        if (img && img.complete && img.naturalWidth > 0) {
            const bounce = Math.sin(this.game._now / 200 + this.col) * 4;
            ctx.drawImage(img, -size / 2, -size / 2 + bounce, size, size);
        } else {
            // Fallback shape
            ctx.fillStyle = PLANTS[this.type].color;
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${size * 0.3}px Outfit`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.type === 'acid' ? 'A' : this.type === 'base' ? 'B' : 'W', 0, 0);
        }
        ctx.restore();

        // HP bar (only show when damaged)
        if (this.hp < this.maxHp) {
            const bw = pos.w * 0.7;
            const bx = this.x - bw / 2;
            const by = this.y + size * 0.42;
            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            ctx.fillRect(bx, by, bw, 6);
            ctx.fillStyle = this.hp > this.maxHp * 0.5 ? '#00ff00' : '#ff4400';
            ctx.fillRect(bx, by, bw * (this.hp / this.maxHp), 6);
        }
    }
}

class Bullet {
    constructor(game, x, row, type) {
        this.game = game;
        this.x = x;
        this.row = row;
        this.type = type;
        this.vx = 400;
        this.dead = false;
        this.damage = 20;
    }
    get y() { return this.game.getGridPos(0, this.row).y - 15; }
    update(dt) {
        this.x += this.vx * dt;
        if (this.x > this.game.cssW + 100) this.dead = true;
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
        ctx.shadowBlur = 12;
        if (this.type === 'acid') { ctx.fillStyle = '#00ff00'; ctx.shadowColor = '#00ff00'; }
        else if (this.type === 'base') { ctx.fillStyle = '#00aaff'; ctx.shadowColor = '#00aaff'; }
        else { ctx.fillStyle = '#44ddff'; ctx.shadowColor = '#44ddff'; }
        ctx.fill();
        ctx.restore();
    }
}

class Zombie {
    constructor(game, row, type) {
        this.game = game;
        this.row = row;
        this.type = type;
        this.x = game.cssW + 50;

        // Tăng máu Zombie để "trâu" hơn và tỉ lệ theo Wave
        const hpMultiplier = 1 + (game.wave - 1) * 0.3;
        this.maxHp = 250 * hpMultiplier;
        this.hp = this.maxHp;

        this.vx = -35 - (game.wave * 2);
        this.eating = null;
        this.eatTimer = 0;
        this.frameTimer = 0;
        this.frameIdx = 0;
        // Pick a random chemical substance label for this zombie
        this.label = SUBSTANCES[type][Math.floor(Math.random() * SUBSTANCES[type].length)];
        this.buffAnim = 0;
        this.scaleAnim = 1;
        // Flag: zombie fire đã bị nước biến thành base chưa
        this.transformed = false;   // true → đang là "base thứ cấp" cần acid
        this.transformAnim = 0;     // timer hiệu ứng biến đổi
    }
    get y() { return this.game.getGridPos(0, this.row).y; }
    update(dt) {
        if (this.buffAnim > 0) {
            this.buffAnim -= dt;
            this.scaleAnim = 1 + Math.sin(this.buffAnim * 10) * 0.1;
        } else {
            this.scaleAnim = 1;
        }
        if (this.transformAnim > 0) this.transformAnim -= dt;

        this.frameTimer += dt;
        if (this.frameTimer > 0.3) {
            this.frameTimer = 0;
            this.frameIdx = (this.frameIdx + 1) % ZOM_FRAMES.length;
        }

        if (this.eating) {
            this.eatTimer += dt;
            if (this.eatTimer > 1) {
                this.eating.hp -= 20;
                for (let i = 0; i < 5; i++) {
                    this.game.particles.push(new Particle(this.game, this.eating.x, this.eating.y, {
                        color: PLANTS[this.eating.type].color, speed: 80, gravity: 200
                    }));
                }
                this.eatTimer = 0;
                if (this.eating.hp <= 0) {
                    this.game.removePlant(this.eating);
                    this.eating = null;
                }
            }
        } else {
            this.x += this.vx * dt;
            for (let p of this.game.plants) {
                if (p.row === this.row && Math.abs(p.x - this.x) < 55) {
                    this.eating = p;
                    break;
                }
            }
        }
        if (this.x < this.game.getGridPos(0, this.row).x - 50) {
            this.game.gameOver();
        }
    }
    draw(ctx) {
        const imgKey = { acid: 'zombie1', base: 'zombie2', fire: 'zombie3' }[this.type];
        const img = this.game.images[imgKey];
        const pos = this.game.getGridPos(0, this.row);
        const size = pos.w * 0.9 * this.scaleAnim;
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.buffAnim > 0) {
            ctx.shadowColor = '#ffdd00';
            ctx.shadowBlur = 20;
        }

        if (img && img.complete && img.naturalWidth > 0) {
            const f = ZOM_FRAMES[this.eating ? 0 : this.frameIdx];
            if (this.buffAnim > 0.8) ctx.filter = 'brightness(2)';
            ctx.drawImage(img, f[0], f[1], f[2], f[3], -size * 0.5, -size * 0.5, size, size);
        } else {
            // Fallback: colored circle
            ctx.fillStyle = ZOM_COLORS[this.type];
            ctx.beginPath();
            ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // ── Hiệu ứng biến đổi: vòng glow khi vừa transform ──
        if (this.transformAnim > 0) {
            ctx.save();
            ctx.strokeStyle = `rgba(0,170,255,${this.transformAnim / 1.2})`;
            ctx.lineWidth = 3;
            ctx.shadowColor = '#00aaff';
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(this.x, this.y, size * 0.55 + (1 - this.transformAnim / 1.2) * 15, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        }

        // ── Nhãn "⚠ ACID!" khi zombie đã biến thành base cần tiêu diệt tiếp ──
        if (this.transformed) {
            ctx.save();
            ctx.font = 'bold 11px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#ffcc00';
            ctx.shadowColor = '#ffcc00';
            ctx.shadowBlur = 8;
            ctx.fillText('⚠ Dùng Acid!', this.x, this.y - size * 0.72);
            ctx.restore();
        }

        // ── Draw chemical label above zombie ──
        const labelY = this.y - size * 0.55;
        ctx.save();
        ctx.font = 'bold 13px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Background pill
        const labelW = ctx.measureText(this.label).width + 12;
        const labelH = 18;
        ctx.fillStyle = 'rgba(10,10,20,0.75)';
        ctx.beginPath();
        ctx.roundRect(this.x - labelW / 2, labelY - labelH / 2, labelW, labelH, 5);
        ctx.fill();

        // Text
        ctx.fillStyle = ZOM_COLORS[this.type];
        ctx.shadowColor = ZOM_COLORS[this.type];
        ctx.shadowBlur = 6;
        ctx.fillText(this.label, this.x, labelY);
        ctx.restore();

        // ── HP bar ──
        const bw = size * 0.8;
        const bx = this.x - bw / 2;
        const by = this.y + size * 0.48;
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(bx, by, bw, 5);
        const hpRatio = this.hp / this.maxHp;
        ctx.fillStyle = hpRatio > 0.5 ? '#00ff88' : hpRatio > 0.25 ? '#ffcc00' : '#ff3333';
        ctx.fillRect(bx, by, bw * hpRatio, 5);
    }
}

class Mower {
    constructor(game, row) {
        this.game = game;
        this.row = row;
        this.triggered = false;
        this.vx = 400;
        this.active = true;
        this._x = null;
    }
    get x() { return this._x !== null ? this._x : this.game.getGridPos(0, this.row).x; }
    set x(val) { this._x = val; }
    get y() { return this.game.getGridPos(0, this.row).y; }
    update(dt) {
        if (!this.triggered) {
            for (let z of this.game.zombies) {
                if (z.row === this.row && z.x < this.x + 20) {
                    this.triggered = true;
                    this._x = this.x; // lock position before movement starts
                    this.game.showReaction("⚡ Hệ thống phòng thủ ĐÃ KÍCH HOẠT!", false);
                    break;
                }
            }
        } else {
            this.x += this.vx * dt;
            for (let i = this.game.zombies.length - 1; i >= 0; i--) {
                const z = this.game.zombies[i];
                if (z.row === this.row && Math.abs(z.x - this.x) < 60) {
                    const mSalts = Object.values(SALT_DROPS);
                    const mSalt = mSalts[Math.floor(Math.random() * mSalts.length)];
                    this.game.drops.push(new Drop(this.game, z.x, z.y, 'salt', mSalt));
                    this.game.zombies.splice(i, 1);
                    this.game.score++;
                    this.game.updateHUD();
                }
            }
            if (this.x > this.game.cssW + 100) this.active = false;
        }
    }
    draw(ctx) {
        if (!this.active && this.triggered) return;
        const img = this.game.images['protect'];
        const size = this.game.getGridPos(0, this.row).w * 0.8;
        ctx.save();
        ctx.translate(this.x, this.y);
        if (img && img.complete && img.naturalWidth > 0) {
            ctx.drawImage(img, -size / 2, -size / 2, size, size);
        } else {
            ctx.fillStyle = '#ffcc00';
            ctx.font = `${size * 0.6}px serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🛡️', 0, 0);
        }
        ctx.restore();
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.running = false;
        this.images = {};
        this.inventory = { acid: 6, base: 6, fire: 6 };
        this.score = 0;
        this.wave = 1;
        this.selectedCard = null;
        this.shovelMode = false;
        this.saltStorage = {};

        // Perspective constants
        this.yT = 0; this.yB = 0;
        this.xLT = 0; this.xRT = 0;
        this.xLB = 0; this.xRB = 0;

        // Mouse tracking
        this.mouseX = 0;
        this.mouseY = 0;
        this._now = 0;

        // Game object lists
        this.plants = [];
        this.zombies = [];
        this.bullets = [];
        this.drops = [];
        this.mowers = [];
        this.particles = [];

        this.init();
    }

    get cssW() { return window.innerWidth; }
    get cssH() { return window.innerHeight; }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Card selection
        document.querySelectorAll('.card').forEach(el => {
            el.addEventListener('click', () => {
                if (!this.running) return;
                const type = el.getAttribute('data-type');

                // ── SHOVEL TOGGLE ──────────────────────────────────
                if (type === 'shovel') {
                    if (this.shovelMode) {
                        this.shovelMode = false;
                        el.classList.remove('selected');
                        document.getElementById('game-container').classList.remove('shovel-mode');
                    } else {
                        // Tắt chọn cây hiện tại nếu có
                        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
                        this.selectedCard = null;

                        this.shovelMode = true;
                        el.classList.add('selected');
                        document.getElementById('game-container').classList.add('shovel-mode');
                        this.showReaction('⛏️ Chế độ nhổ cây đang bật!', true);
                    }
                    return;
                }

                // ── PLANT TOGGLE ───────────────────────────────────
                // Tắt xẻng nếu đang bật
                if (this.shovelMode) {
                    this.shovelMode = false;
                    document.getElementById('game-container').classList.remove('shovel-mode');
                    document.getElementById('shovel-card').classList.remove('selected');
                }

                // Không cho chọn nếu không đủ tiền
                if (!this.canAfford(type)) {
                    this.showReaction('❌ Không đủ nguyên liệu để chọn cây này!', false);
                    return;
                }

                if (this.selectedCard === type) {
                    this.selectedCard = null;
                    el.classList.remove('selected');
                } else {
                    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
                    this.selectedCard = type;
                    el.classList.add('selected');
                }
            });
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });

        this.canvas.addEventListener('mousedown', (e) => this.handleCanvasClick(e));
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.startGame());

        // Lab button & Electrolysis panel
        this.initElectroPanel();

        // ── Keyboard Shortcuts ─────────────────────────────────────────────
        window.addEventListener('keydown', (e) => {
            if (!this.running) return;
            const key = e.key.toLowerCase();
            let targetType = null;

            if (key === '1') targetType = 'acid';
            else if (key === '2') targetType = 'base';
            else if (key === '3') targetType = 'water';
            else if (key === 'q') targetType = 'shovel';
            else if (key === 'c') {
                // Toggle Lab Panel
                const panel = document.getElementById('electro-panel');
                const isHidden = panel.classList.contains('hidden');
                if (isHidden) {
                    document.getElementById('lab-btn').click(); // Open
                } else {
                    document.getElementById('electro-close').click(); // Close
                }
                return;
            }

            if (targetType) {
                const card = document.querySelector(`.card[data-type="${targetType}"]`);
                if (card) card.click(); // Trigger existing click logic
            }
        });

        this.loadAssets();
    }

    initElectroPanel() {
        // ── State ──────────────────────────────────────────────────────────
        this._ep = {
            inputSalt: null,   // { name, info, recipe } salt đang trong input slot
            outputReady: null, // produces array đang chờ thu thập
            smelting: false,
            progress: 0,
            rafId: null,
        };

        // ── Open panel ─────────────────────────────────────────────────────
        document.getElementById('lab-btn').addEventListener('click', () => {
            if (!this.running) return;
            document.getElementById('electro-panel').classList.remove('hidden');
            this._refreshEpInventory();
            this._renderSaltGrid();
        });

        // ── Close panel ────────────────────────────────────────────────────
        document.getElementById('electro-close').addEventListener('click', () => {
            document.getElementById('electro-panel').classList.add('hidden');
            this._stopSmelt();
        });

        // ── Smelt button ───────────────────────────────────────────────────
        document.getElementById('mc-smelt-btn').addEventListener('click', () => {
            if (!this._ep.inputSalt) return;
            this._startSmelt();
        });

        // ── Collect button ─────────────────────────────────────────────────
        document.getElementById('mc-collect-btn').addEventListener('click', () => {
            this._collectOutput();
        });
        document.getElementById('mc-output-slot').addEventListener('click', () => {
            if (this._ep.outputReady) this._collectOutput();
        });

        // ── Input slot: click to remove ────────────────────────────────────
        document.getElementById('mc-input-slot').addEventListener('click', () => {
            if (this._ep.smelting) return;
            if (this._ep.inputSalt) {
                // Return salt to storage
                this.saltStorage[this._ep.inputSalt.name] = (this.saltStorage[this._ep.inputSalt.name] || 0) + this._ep.inputSalt.recipe.requires;
                this._ep.inputSalt = null;
                this._updateInputSlot();
                this._renderSaltGrid();
                this.updateSaltHUD();
            }
        });

        // ── Drag and drop ──────────────────────────────────────────────────
        this._initDragDrop();
    }

    _initDragDrop() {
        let ghost = null;
        let dragging = null; // { name, info, recipe }
        const inputSlot = document.getElementById('mc-input-slot');

        const makeGhost = (icon, x, y) => {
            if (ghost) ghost.remove();
            ghost = document.createElement('div');
            ghost.className = 'mc-drag-ghost';
            ghost.textContent = icon;
            ghost.style.left = x + 'px';
            ghost.style.top = y + 'px';
            document.body.appendChild(ghost);
        };

        const removeGhost = () => { if (ghost) { ghost.remove(); ghost = null; } };

        // Pointer events on salt grid (delegated)
        document.getElementById('mc-salt-grid').addEventListener('pointerdown', (e) => {
            const slot = e.target.closest('.mc-slot.has-item');
            if (!slot || this._ep.smelting) return;
            const saltName = slot.getAttribute('data-salt');
            const info = Object.values(SALT_DROPS).find(s => s.salt === saltName) || DEFAULT_SALT;
            const recipe = ELECTROLYSIS[saltName];
            if (!recipe) return;
            const have = this.saltStorage[saltName] || 0;
            if (have < recipe.requires) return;

            dragging = { name: saltName, info, recipe };
            makeGhost(info.icon, e.clientX, e.clientY);
            slot.style.opacity = '0.4';
            e.preventDefault();
        });

        document.addEventListener('pointermove', (e) => {
            if (!dragging || !ghost) return;
            ghost.style.left = e.clientX + 'px';
            ghost.style.top = e.clientY + 'px';
            // Highlight input slot
            const r = inputSlot.getBoundingClientRect();
            const over = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
            inputSlot.classList.toggle('dragging-over', over);
        });

        document.addEventListener('pointerup', (e) => {
            if (!dragging) return;
            const r = inputSlot.getBoundingClientRect();
            const dropped = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;

            if (dropped && !this._ep.smelting) {
                const totalHave = this.saltStorage[dragging.name] || 0;
                if (totalHave >= dragging.recipe.requires) {
                    // Nếu đã có input, hoàn lại kho trước
                    if (this._ep.inputSalt) {
                        this.saltStorage[this._ep.inputSalt.name] = (this.saltStorage[this._ep.inputSalt.name] || 0) + (this._ep.inputSalt.amountUsed || 0);
                    }

                    // Lấy hết toàn bộ số lượng có thể chia hết cho định mức
                    const multiples = Math.floor(totalHave / dragging.recipe.requires);
                    const amountToUse = multiples * dragging.recipe.requires;

                    this.saltStorage[dragging.name] -= amountToUse;
                    this._ep.inputSalt = {
                        ...dragging,
                        amountUsed: amountToUse,
                        multiples: multiples
                    };

                    this._updateInputSlot();
                    this._renderSaltGrid();
                    this.updateSaltHUD();
                }
            }

            // Restore opacity on all salt slots
            document.querySelectorAll('#mc-salt-grid .mc-slot').forEach(s => s.style.opacity = '');
            inputSlot.classList.remove('dragging-over');
            removeGhost();
            dragging = null;
        });
    }

    _renderSaltGrid() {
        const grid = document.getElementById('mc-salt-grid');
        if (!grid) return;
        const salts = this.saltStorage || {};
        // Only show salts that exist in ELECTROLYSIS and have qty > 0
        const available = Object.entries(salts).filter(([name, qty]) => qty > 0 && ELECTROLYSIS[name]);

        grid.innerHTML = '';
        if (available.length === 0) {
            grid.innerHTML = '<div style="color:#555;font-size:11px;padding:10px;grid-column:1/-1;text-align:center">Chưa có muối<br>Tiêu diệt zombie để thu thập!</div>';
            return;
        }
        for (const [name, qty] of available) {
            const info = Object.values(SALT_DROPS).find(s => s.salt === name) || DEFAULT_SALT;
            const recipe = ELECTROLYSIS[name];
            const enough = qty >= recipe.requires;
            const slot = document.createElement('div');
            slot.className = 'mc-slot has-item' + (enough ? '' : ' empty');
            slot.setAttribute('data-salt', name);
            slot.setAttribute('draggable', 'false'); // use pointer events
            slot.innerHTML = `
                <span class="mc-slot-icon">${info.icon}</span>
                <span class="mc-slot-name">${name}</span>
                <span class="mc-slot-count" style="color:${enough ? '#fff' : '#ff6060'}">${qty}</span>`;
            slot.title = `${name} × ${qty}
Cần ${recipe.requires} để điện phân`;
            grid.appendChild(slot);
        }
    }

    _updateInputSlot() {
        const slot = document.getElementById('mc-input-slot');
        const smeltBtn = document.getElementById('mc-smelt-btn');
        const eqEl = document.getElementById('mc-equation');
        if (!slot) return;

        if (this._ep.inputSalt) {
            const { name, info, recipe, multiples } = this._ep.inputSalt;
            const producedStr = recipe.produces.map(p =>
                `+${p.amt * multiples} ${p.type === 'acid' ? '🟢' : p.type === 'base' ? '🔵' : '🔥'}`).join(' ');
            slot.classList.add('has-item');
            slot.innerHTML = `
                <span class="mc-slot-icon">${info.icon}</span>
                <span class="mc-slot-name">${name} (x${multiples})</span>
                <span style="font-size:9px;color:#aaffcc;margin-top:2px">${producedStr}</span>`;
            smeltBtn.disabled = false;
            eqEl.textContent = `${recipe.equation} (Quy mô x${multiples})`;
        } else {
            slot.classList.remove('has-item');
            slot.innerHTML = '<span class="mc-slot-hint">Thả muối<br>vào đây</span>';
            smeltBtn.disabled = true;
            eqEl.textContent = 'Chọn muối để xem phản ứng';
        }
    }

    _startSmelt() {
        if (this._ep.smelting || !this._ep.inputSalt) return;
        this._ep.smelting = true;
        this._ep.progress = 0;
        const arrow = document.getElementById('mc-arrow');
        if (arrow) arrow.classList.add('active');
        document.getElementById('mc-smelt-btn').disabled = true;

        // Thời gian tỷ lệ thuận với số lượng muối (Min 1s, Max 10s cho quy mô lớn)
        const duration = Math.min(10000, 1000 * this._ep.inputSalt.multiples);
        const start = performance.now();
        const tick = (now) => {
            const pct = Math.min(1, (now - start) / duration);
            this._ep.progress = pct;
            const fill = document.getElementById('mc-progress-fill');
            if (fill) fill.style.width = (pct * 100) + '%';
            if (pct < 1) {
                this._ep.rafId = requestAnimationFrame(tick);
            } else {
                this._finishSmelt();
            }
        };
        this._ep.rafId = requestAnimationFrame(tick);
    }

    _stopSmelt() {
        if (this._ep.rafId) { cancelAnimationFrame(this._ep.rafId); this._ep.rafId = null; }
        this._ep.smelting = false;
        this._ep.progress = 0;
        const fill = document.getElementById('mc-progress-fill');
        if (fill) fill.style.width = '0%';
        const arrow = document.getElementById('mc-arrow');
        if (arrow) arrow.classList.remove('active');
    }

    _finishSmelt() {
        this._ep.smelting = false;
        const multiples = this._ep.inputSalt.multiples;
        this._ep.outputReady = this._ep.inputSalt.recipe.produces.map(p => ({
            type: p.type,
            amt: p.amt * multiples
        }));

        const arrow = document.getElementById('mc-arrow');
        if (arrow) arrow.classList.remove('active');

        // Render output slot
        const outputSlot = document.getElementById('mc-output-slot');
        const outputLabel = document.getElementById('mc-output-label');
        const collectBtn = document.getElementById('mc-collect-btn');
        const producedStr = this._ep.outputReady.map(p =>
            `${p.amt} ${p.type === 'acid' ? '🟢 Acid' : p.type === 'base' ? '🔵 Base' : '🔥 Năng lượng'}`
        ).join(' | ');
        const icons = this._ep.outputReady.map(p =>
            p.type === 'acid' ? '🟢' : p.type === 'base' ? '🔵' : '🔥').join('');

        if (outputSlot) {
            outputSlot.classList.add('has-output');
            outputSlot.innerHTML = `<span style="font-size:28px">${icons}</span>`;
        }
        if (outputLabel) outputLabel.textContent = producedStr;

        // Hiển thị phương trình kết quả bên dưới
        const resEq = document.getElementById('mc-result-equation');
        if (resEq) resEq.textContent = this._ep.inputSalt.recipe.equation;

        if (collectBtn) collectBtn.classList.remove('hidden');

        // Clear input
        this._ep.inputSalt = null;
        this._updateInputSlot();
        const fill = document.getElementById('mc-progress-fill');
        if (fill) fill.style.width = '0%';

        this.showReaction('⚡ Điện phân hoàn tất! Click thu thập sản phẩm.', true);
    }

    _collectOutput() {
        if (!this._ep.outputReady) return;
        for (const { type, amt } of this._ep.outputReady) {
            this.inventory[type] = (this.inventory[type] || 0) + amt;
        }
        const str = this._ep.outputReady.map(p =>
            `+${p.amt} ${p.type === 'acid' ? '🟢 Acid' : p.type === 'base' ? '🔵 Base' : '🔥 Năng lượng'}`
        ).join(' | ');
        this.showReaction(`✅ Thu thập: ${str}`, true);
        this.updateHUD();
        this._ep.outputReady = null;

        // Reset output UI
        const outputSlot = document.getElementById('mc-output-slot');
        if (outputSlot) {
            outputSlot.classList.remove('has-output');
            outputSlot.innerHTML = '<span class="mc-slot-hint">Output<br>ở đây</span>';
        }
        const outputLabel = document.getElementById('mc-output-label');
        if (outputLabel) outputLabel.textContent = '';
        const resEq = document.getElementById('mc-result-equation');
        if (resEq) resEq.textContent = '';

        const collectBtn = document.getElementById('mc-collect-btn');
        if (collectBtn) collectBtn.classList.add('hidden');
        this._refreshEpInventory();

        // Spark particles on canvas
        for (let k = 0; k < 25; k++) {
            this.particles.push(new Particle(this, this.cssW * 0.5, this.cssH * 0.5, {
                color: ['#ffe066', '#00ffcc', '#00aaff', '#ffffff'][k % 4],
                speed: 220, life: 0.9, radius: 4, gravity: 80
            }));
        }
    }

    _refreshEpInventory() {
        const a = document.getElementById('ep-acid');
        const b = document.getElementById('ep-base');
        const f = document.getElementById('ep-fire');
        if (a) a.textContent = this.inventory.acid;
        if (b) b.textContent = this.inventory.base;
        if (f) f.textContent = this.inventory.fire;
    }

    async loadAssets() {
        const imgMap = {
            acidplant: 'images/acidplant.png',
            baseplant: 'images/baseplant.png',
            waterplant: 'images/waterplant.png',
            ground: 'images/ground.png',
            zombie1: 'images/z1-sheet0.png',
            zombie2: 'images/z2-sheet0.png',
            zombie3: 'images/z3-sheet0.png',
            protect: 'images/protect.png',
            shovel: 'images/xeng.png'
        };
        for (const [k, p] of Object.entries(imgMap)) {
            const i = new Image();
            i.src = p;
            await new Promise(r => { i.onload = r; i.onerror = r; });
            this.images[k] = i;
        }
    }

    getGridPos(col, row) {
        const midT = (row + 0.5) / ROWS;
        const getY = (v) => this.yT + (this.yB - this.yT) * v;
        const y = getY(midT);
        const xl = this.xLT + (this.xLB - this.xLT) * midT;
        const xr = this.xRT + (this.xRB - this.xRT) * midT;
        const cw = (xr - xl) / COLS;
        return { x: xl + (col + 0.5) * cw, y, w: cw };
    }

    resize() {
        const cssW = window.innerWidth, cssH = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = Math.round(cssW * dpr);
        this.canvas.height = Math.round(cssH * dpr);
        this.canvas.style.width = cssW + 'px';
        this.canvas.style.height = cssH + 'px';
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        this.yT = cssH * 0.16;
        this.yB = cssH * 0.98;
        this.xLT = cssW * 0.17;
        this.xRT = cssW * 0.665;
        this.xLB = cssW * 0.10;
        this.xRB = cssW * 0.72;
    }

    startGame() {
        this.running = true;
        this.score = 0;
        this.wave = 1;
        this.inventory = { acid: 6, base: 6, fire: 6 };
        this.selectedCard = null;
        this.shovelMode = false;
        document.getElementById('game-container').classList.remove('shovel-mode');
        this.plants = [];
        this.zombies = [];
        this.bullets = [];
        this.drops = [];
        this.mowers = [];
        this.particles = [];

        for (let i = 0; i < ROWS; i++) this.mowers.push(new Mower(this, i));

        this.zomSpawnTimer = 5;
        this.waveTimer = 60;

        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-over-screen').classList.add('hidden');
        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected', 'disabled'));

        this.clearLog();
        this.showReaction("🧪 Thí nghiệm bắt đầu! Hãy bảo vệ phòng lab!", true);

        this.updateHUD();
        this.lastTS = performance.now();
        requestAnimationFrame((t) => this.loop(t));
    }

    loop(ts) {
        if (!this.running) return;
        const dt = Math.min((ts - this.lastTS) / 1000, 0.05);
        this.lastTS = ts;
        this._now = ts;
        this.update(dt);
        this.draw();
        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        // Wave / spawn logic
        this.zomSpawnTimer -= dt;
        if (this.zomSpawnTimer <= 0) {
            this.zombies.push(new Zombie(this, Math.floor(Math.random() * ROWS), ZOM_TYPES[Math.floor(Math.random() * 3)]));
            this.zomSpawnTimer = Math.max(2, 6 - this.wave * 0.5) + Math.random() * 3;
        }
        this.waveTimer -= dt;
        if (this.waveTimer <= 0) {
            this.wave++;
            this.waveTimer = 60;
            this.updateHUD();
            this.showReaction(`🌊 WAVE ${this.wave} bắt đầu!`, true);
        }

        this.plants.forEach(p => p.update(dt));
        this.bullets.forEach(b => b.update(dt));
        this.zombies.forEach(z => z.update(dt));
        this.mowers.forEach(m => m.update(dt));
        this.particles.forEach(p => p.update(dt));
        this.drops.forEach(d => d.update(dt));

        this.particles = this.particles.filter(p => p.life > 0);
        this.bullets = this.bullets.filter(b => !b.dead);
        this.drops = this.drops.filter(d => d.life > 0);

        // Bullet ↔ Zombie collisions
        for (let b of this.bullets) {
            if (b.dead) continue;
            for (let z of this.zombies) {
                if (z.row === b.row && Math.abs(z.x - b.x) < 30) {
                    // ── Kiểm tra hiệu quả đạn ────────────────────────────
                    // Zombie đã biến đổi thành base (do nước) → chỉ acid mới diệt được
                    const isTransformedBase = z.transformed && z.type === 'base';
                    const isEffective =
                        (b.type === 'acid' && z.type === 'base') ||
                        (b.type === 'base' && z.type === 'acid') ||
                        (b.type === 'water' && z.type === 'fire' && !z.transformed);

                    // Đạn nước bắn zombie fire có thể biến đổi thành base
                    const canTransform = b.type === 'water' && z.type === 'fire' && !z.transformed && WATER_TRANSFORMS[z.label];

                    if (canTransform) {
                        // ── BIẾN ĐỔI: Fire → Base ────────────────────────────
                        const tf = WATER_TRANSFORMS[z.label];
                        const oldLabel = z.label;
                        z.type = 'base';
                        z.label = tf.newLabel;
                        z.hp = Math.ceil(z.hp * 0.6); // còn 60% HP
                        z.maxHp = z.hp;
                        z.transformed = true;
                        z.transformAnim = 1.2;

                        // Hiệu ứng particles nước
                        for (let k = 0; k < 15; k++) {
                            this.particles.push(new Particle(this, b.x, b.y, {
                                color: '#44ddff', speed: 150, life: 0.8, radius: 4
                            }));
                        }
                        this.showReaction(`⚗️ ${tf.equation}`, true);
                        this.showReaction(`💡 ${oldLabel} → ${tf.newLabel}! Dùng Cây Acid để tiêu diệt!`, true);

                    } else if (isEffective) {
                        // ── HIỆU QUẢ: damage × 5 ────────────────────────────
                        const dmg = b.damage * 5;
                        z.hp -= dmg;

                        // Particles
                        for (let k = 0; k < 10; k++) {
                            this.particles.push(new Particle(this, b.x, b.y, {
                                color: b.type === 'acid' ? '#00ff00' : (b.type === 'base' ? '#00aaff' : '#44ddff'),
                                speed: 120, life: 0.6, radius: 4
                            }));
                        }

                        // Phương trình đúng theo cặp
                        const rxnKey = b.type + ':' + z.label;
                        const equation = REACTION_MAP[rxnKey] || (b.type + ' + ' + z.label + ' → phản ứng trung hòa');
                        this.showReaction('⚗️ ' + equation, true);

                    } else {
                        // ── SAI HỆ: hồi máu + tăng tốc ──────────────────────
                        z.hp = Math.min(z.maxHp, z.hp + 20);
                        z.vx = Math.min(z.vx * 1.3, -25);
                        z.buffAnim = 1;

                        // Gợi ý cây đúng
                        let hint;
                        if (z.transformed) {
                            hint = 'Cây Acid (HCl) — zombie này đã biến thành base!';
                        } else {
                            hint = z.type === 'acid' ? 'Cây Base (NaOH)' : z.type === 'base' ? 'Cây Acid (HCl)' : 'Cây Nước (H₂O)';
                        }
                        this.showReaction(`⚠️ Sai hệ! ${z.label} kháng loại này. Dùng ${hint}!`, false);
                    }

                    b.dead = true;

                    if (z.hp <= 0) {
                        this.score++;
                        this.updateHUD();
                        // Xác định muối rơi ra dựa theo cặp đạn:zombie
                        const dropKey = b.type + ':' + z.label;
                        const saltInfo = SALT_DROPS[dropKey] || DEFAULT_SALT;
                        this.drops.push(new Drop(this, z.x, z.y, 'salt', saltInfo));
                    }
                    break;
                }
            }
        }

        this.zombies = this.zombies.filter(z => z.hp > 0);
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.cssW, this.cssH);

        // Draw grid overlay when a card is selected
        if (this.selectedCard) {
            ctx.save();
            const pulse = 0.3 + Math.sin(this._now / 300) * 0.15;
            ctx.lineWidth = 1.5;

            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    const getY = (v) => this.yT + (this.yB - this.yT) * v;
                    const getX = (rv, cv) => {
                        const xl = this.xLT + (this.xLB - this.xLT) * rv;
                        const xr = this.xRT + (this.xRB - this.xRT) * rv;
                        return xl + (xr - xl) * cv;
                    };

                    const p1 = { x: getX(r / ROWS, c / COLS), y: getY(r / ROWS) };
                    const p2 = { x: getX(r / ROWS, (c + 1) / COLS), y: getY(r / ROWS) };
                    const p3 = { x: getX((r + 1) / ROWS, (c + 1) / COLS), y: getY((r + 1) / ROWS) };
                    const p4 = { x: getX((r + 1) / ROWS, c / COLS), y: getY((r + 1) / ROWS) };

                    // Skip col 0 (mower lane)
                    if (c === 0) continue;

                    const isOccupied = this.plants.some(p => p.row === r && p.col === c);
                    const isHover = this.isPointInTrapezoid(this.mouseX, this.mouseY, p1, p2, p3, p4);

                    if (isOccupied) {
                        ctx.setLineDash([]);
                        ctx.strokeStyle = 'rgba(255,60,60,0.6)';
                        ctx.fillStyle = 'rgba(255,60,60,0.1)';
                    } else if (isHover) {
                        ctx.setLineDash([]);
                        ctx.strokeStyle = `rgba(0,255,255,${pulse + 0.3})`;
                        ctx.fillStyle = 'rgba(0,255,255,0.15)';
                    } else {
                        ctx.setLineDash([10, 5]);
                        ctx.strokeStyle = `rgba(255,255,255,${pulse})`;
                        ctx.fillStyle = 'transparent';
                    }

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.lineTo(p3.x, p3.y);
                    ctx.lineTo(p4.x, p4.y);
                    ctx.closePath();
                    if (!isOccupied || isHover) ctx.fill();
                    ctx.stroke();
                }
            }
            ctx.setLineDash([]);
            ctx.restore();
        }

        // ── SHOVEL MODE: highlight plants ─────────────────────────────────
        if (this.shovelMode) {
            const pulse = 0.5 + Math.sin(this._now / 200) * 0.4;
            for (let p of this.plants) {
                const size = this.getGridPos(p.col, p.row).w * 0.95;
                ctx.save();
                ctx.beginPath();
                ctx.arc(p.x, p.y, size * 0.52, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 60, 60, ${pulse * 0.25})`;
                ctx.fill();
                ctx.strokeStyle = `rgba(255, 80, 80, ${pulse})`;
                ctx.lineWidth = 3;
                ctx.shadowColor = '#ff4444';
                ctx.shadowBlur = 14;
                ctx.stroke();
                // Shovel icon above plant
                ctx.font = `bold ${size * 0.38}px serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.globalAlpha = pulse;
                ctx.fillText('⛏️', p.x, p.y - size * 0.6);
                ctx.restore();
            }
        }

        const ents = [...this.plants, ...this.zombies].sort((a, b) => a.y - b.y);
        for (let e of ents) e.draw(ctx);
        for (let m of this.mowers) m.draw(ctx);
        for (let b of this.bullets) b.draw(ctx);
        for (let d of this.drops) d.draw(ctx);
        for (let p of this.particles) p.draw(ctx);
    }

    handleCanvasClick(e) {
        if (!this.running) return;
        const rect = this.canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // Check if clicking a drop to collect it
        for (let d of this.drops) {
            if (!d.collected && d.life > 0 && Math.hypot(d.x - mx, d.y - my) < d.radius + 10) {
                d.collected = true;
                return;
            }
        }

        if (!this.selectedCard && !this.shovelMode) return;

        // Helper to find grid cell from mouse position
        const findCell = (mx, my) => {
            for (let r = 0; r < ROWS; r++) {
                const getY = (v) => this.yT + (this.yB - this.yT) * v;
                const getX = (rv, cv) => {
                    const xl = this.xLT + (this.xLB - this.xLT) * rv;
                    const xr = this.xRT + (this.xRB - this.xRT) * rv;
                    return xl + (xr - xl) * cv;
                };
                const y1 = getY(r / ROWS);
                const y2 = getY((r + 1) / ROWS);
                if (my >= y1 && my <= y2) {
                    const xl1 = getX(r / ROWS, 0), xr1 = getX(r / ROWS, 1);
                    const xl2 = getX((r + 1) / ROWS, 0), xr2 = getX((r + 1) / ROWS, 1);
                    const t = (my - y1) / (y2 - y1);
                    const curXL = xl1 + (xl2 - xl1) * t;
                    const curXR = xr1 + (xr2 - xr1) * t;
                    if (mx >= curXL && mx <= curXR) {
                        const col = Math.floor((mx - curXL) / ((curXR - curXL) / COLS));
                        return { r, col };
                    }
                }
            }
            return null;
        };

        // ── SHOVEL MODE: remove plant ──────────────────────────────────────
        if (this.shovelMode) {
            const cell = findCell(mx, my);
            if (!cell || cell.col < 1) return;
            const idx = this.plants.findIndex(p => p.row === cell.r && p.col === cell.col);
            if (idx !== -1) {
                const plant = this.plants[idx];
                // Spawn dig particles
                for (let k = 0; k < 14; k++) {
                    this.particles.push(new Particle(this, plant.x, plant.y, {
                        color: '#c8a020', speed: 120, life: 0.7, radius: 4, gravity: 200
                    }));
                }
                this.plants.splice(idx, 1);
                // Hoàn lại năng lượng theo tỉ lệ HP còn lại
                const hpRatio = plant.hp / plant.maxHp;
                const cost = PLANTS[plant.type].cost;
                const refundParts = [];
                for (const [res, amount] of Object.entries(cost)) {
                    const refund = Math.max(1, Math.round(amount * hpRatio));
                    this.inventory[res] = (this.inventory[res] || 0) + refund;
                    const icon = res === 'acid' ? '🟢' : res === 'base' ? '🔵' : '🔥';
                    refundParts.push(`+${refund}/${amount} ${icon}`);
                }
                const pct = Math.round(hpRatio * 100);
                this.showReaction(`⛏️ Đã nhổ ${PLANTS[plant.type].name}! (HP ${pct}%) Hoàn lại ${refundParts.join(' ')}`, true);
                this.updateHUD();
                // Giữ nguyên shovelMode để đào tiếp theo yêu cầu
            } else {
                this.showReaction('❌ Không có cây ở đây!', false);
            }
            return;
        }

        // ── PLANT MODE: place plant ────────────────────────────────────────
        const cell = findCell(mx, my);
        if (!cell) return;
        const { r, col } = cell;

        // Col 0 is reserved for mowers
        if (col < 1) return;

        // Check if cell is occupied
        if (this.plants.some(p => p.row === r && p.col === col)) {
            this.showReaction("❌ Ô này đã có cây!", false);
            return;
        }

        // Check affordability again at planting time
        if (!this.canAfford(this.selectedCard)) {
            this.showReaction("❌ Không đủ nguyên liệu để đặt tiếp!", false);
            // Vẫn giữ selectedCard để người chơi nhắm vị trí hoặc đợi đủ tiền
            return;
        }

        // Deduct cost
        this.spendCost(this.selectedCard);

        // Place plant
        this.plants.push(new Plant(this, this.selectedCard, r, col));

        // KHÔNG clear selectedCard để đặt tiếp
        this.updateHUD();
        return;
    }

    isPointInTrapezoid(px, py, p1, p2, p3, p4) {
        const area = (x1, y1, x2, y2, x3, y3) =>
            Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
        const totalArea = area(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y) +
            area(p1.x, p1.y, p4.x, p4.y, p3.x, p3.y);
        const a1 = area(px, py, p1.x, p1.y, p2.x, p2.y);
        const a2 = area(px, py, p2.x, p2.y, p3.x, p3.y);
        const a3 = area(px, py, p3.x, p3.y, p4.x, p4.y);
        const a4 = area(px, py, p4.x, p4.y, p1.x, p1.y);
        return (a1 + a2 + a3 + a4) <= totalArea + 1.0;
    }

    // ── Inventory helpers ──────────────────────────────────────────────────

    canAfford(type) {
        const cost = PLANTS[type]?.cost;
        if (!cost) return false;
        for (const [res, amount] of Object.entries(cost)) {
            if ((this.inventory[res] || 0) < amount) return false;
        }
        return true;
    }

    spendCost(type) {
        const cost = PLANTS[type]?.cost;
        if (!cost) return;
        for (const [res, amount] of Object.entries(cost)) {
            this.inventory[res] = (this.inventory[res] || 0) - amount;
        }
    }

    addSalt(saltName, amount) {
        if (!this.saltStorage) this.saltStorage = {};
        this.saltStorage[saltName] = (this.saltStorage[saltName] || 0) + amount;
        this.updateSaltHUD();
        this.showReaction(`🧂 +${amount} ${saltName} → kho muối!`, true);
    }

    addInventory(type, amount) {
        if (!(type in this.inventory)) return;
        this.inventory[type] = (this.inventory[type] || 0) + amount;
        this.updateHUD();
        this.showReaction(`+${amount} ${type === 'acid' ? '🟢 Acid' : type === 'base' ? '🔵 Base' : '🔥 Lửa'} thu thập!`, true);
    }

    // ── HUD ───────────────────────────────────────────────────────────────

    updateHUD() {
        // Inventory counts
        document.getElementById('inv-acid').textContent = this.inventory.acid;
        document.getElementById('inv-base').textContent = this.inventory.base;
        document.getElementById('inv-fire').textContent = this.inventory.fire;

        // Score & wave
        document.getElementById('score-value').textContent = this.score;
        document.getElementById('wave-value').textContent = this.wave;

        // Card availability (show disabled state)
        document.querySelectorAll('.card').forEach(el => {
            const type = el.getAttribute('data-type');
            // Shovel is always available
            if (type === 'shovel') {
                el.classList.remove('disabled');
                return;
            }
            if (!this.canAfford(type)) {
                el.classList.add('disabled');
                if (this.selectedCard === type) {
                    this.selectedCard = null;
                    el.classList.remove('selected');
                }
            } else {
                el.classList.remove('disabled');
            }
        });
    }

    updateSaltHUD() {
        const el = document.getElementById('salt-storage-list');
        if (!el) return;
        const salts = this.saltStorage || {};
        const entries = Object.entries(salts).filter(([, v]) => v > 0);
        if (entries.length === 0) {
            el.innerHTML = '<span style="color:#666;font-size:11px">Chưa có muối</span>';
        } else {
            el.innerHTML = entries.map(([name, qty]) => {
                const info = Object.values(SALT_DROPS).find(s => s.salt === name) || DEFAULT_SALT;
                return `<div class="salt-item" title="${name}">${info.icon} <b>${name}</b>: ${qty}</div>`;
            }).join('');
        }
        // Badge tổng số muối
        const total = Object.values(salts).reduce((a, b) => a + b, 0);
        const badge = document.getElementById('salt-badge');
        if (badge) {
            badge.textContent = total;
            badge.classList.toggle('hidden', total === 0);
        }
        // Refresh salt grid nếu panel đang mở
        const panel = document.getElementById('electro-panel');
        if (panel && !panel.classList.contains('hidden')) {
            this._renderSaltGrid();
            this._refreshEpInventory();
        }
    }

    // ── Combat log ────────────────────────────────────────────────────────

    clearLog() {
        const logEl = document.getElementById('log-entries');
        if (logEl) logEl.innerHTML = '';
    }

    showReaction(text, isSuccess = true) {
        const logEl = document.getElementById('log-entries');
        if (!logEl) return;

        const entry = document.createElement('div');
        entry.className = 'log-entry ' + (isSuccess ? 'log-success' : 'log-error');
        entry.textContent = text;
        logEl.appendChild(entry);

        // Keep only last 5 entries
        while (logEl.children.length > 5) {
            logEl.removeChild(logEl.firstChild);
        }

        // Scroll to bottom
        logEl.scrollTop = logEl.scrollHeight;
    }

    // ── Game over ─────────────────────────────────────────────────────────

    gameOver() {
        if (!this.running) return;
        this.running = false;
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('game-over-screen').classList.remove('hidden');
    }

    removePlant(p) {
        this.plants = this.plants.filter(x => x !== p);
    }

    doElectrolysis(saltName) {
        const recipe = ELECTROLYSIS[saltName];
        if (!recipe) return;
        const have = this.saltStorage[saltName] || 0;
        if (have < recipe.requires) {
            this.showReaction(`❌ Cần ${recipe.requires} ${saltName}, chỉ có ${have}!`, false);
            return;
        }
        this.saltStorage[saltName] -= recipe.requires;
        for (const { type, amt } of recipe.produces) {
            this.inventory[type] = (this.inventory[type] || 0) + amt;
        }
        const producedStr = recipe.produces.map(p =>
            `+${p.amt} ${p.type === 'acid' ? '🟢' : p.type === 'base' ? '🔵' : '🔥'}`
        ).join(' ');
        this.showReaction(`⚡ ${recipe.equation}`, true);
        this.showReaction(`✅ Điện phân xong! ${producedStr}`, true);
        this.updateHUD();
        this.updateSaltHUD();
        // Particle điện ở giữa màn hình
        for (let k = 0; k < 20; k++) {
            this.particles.push(new Particle(this, this.cssW * 0.88, this.cssH * 0.35, {
                color: '#ffe066', speed: 180, life: 0.8, radius: 3, gravity: -50
            }));
        }
    }
}

window.onload = () => new Game();