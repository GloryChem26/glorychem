window.DATA_12 = {
    label: 'Lớp 12',
    icon: '🧬',
    chapters: [
      {
        id: 'c12-1',
        title: 'Chương 1: Este – Lipit',
        lessons: [
          {
            id: 'l12-1-1',
            title: 'Bài 1: Este',
            tag: 'Lý thuyết · Lớp 12',
            readTime: '10 phút',
            sections: [
              {
                icon: '🔬', iconClass: 'icon-blue',
                title: '1. Khái niệm và cấu tạo Este',
                body: `
<p><strong>Este</strong> là sản phẩm của phản ứng axit (hoặc axit hữu cơ) với rượu (alcohol), trong đó nhóm −OH của axit được thay thế bởi nhóm −OR′.</p>
<div class="ls-formula"><span class="label">Công thức chung Este (đơn chức)</span>
RCOOR′

R: gốc hydrocarbon của axit (có thể là H)
R′: gốc hydrocarbon của alcohol (≠ H)</div>
<div class="ls-formula"><span class="label">Phản ứng este hóa</span>
RCOOH + HOR′ ⇌ RCOOR′ + H₂O
(xúc tác: H₂SO₄ đặc, đun nóng)</div>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Este đơn giản nhất là <strong>metyl formate</strong>: HCOOCH₃ (từ HCOOH + CH₃OH).</span>
</div>`
              },
              {
                icon: '🧪', iconClass: 'icon-teal',
                title: '2. Tính chất vật lý',
                body: `
<ul>
  <li>Este thường là <strong>chất lỏng hoặc rắn</strong> ở điều kiện thường</li>
  <li><strong>Ít tan trong nước</strong>, tan tốt trong dung môi hữu cơ</li>
  <li>Nhiệt độ sôi thấp hơn axit tương ứng (vì không tạo liên kết H liên phân tử)</li>
  <li>Nhiều este có <strong>mùi thơm đặc trưng</strong>: ethyl acetate (mùi quả lê), isoamyl acetate (mùi chuối), methyl butyrate (mùi táo)...</li>
</ul>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Este</th><th>CTPT</th><th>Mùi</th></tr>
    <tr><td>Isoamyl acetate</td><td>CH₃COOC₅H₁₁</td><td>Mùi chuối</td></tr>
    <tr><td>Ethyl formate</td><td>HCOOC₂H₅</td><td>Mùi đào</td></tr>
    <tr><td>Ethyl butyrate</td><td>C₃H₇COOC₂H₅</td><td>Mùi dứa</td></tr>
  </table>
</div>`
              },
              {
                icon: '⚗️', iconClass: 'icon-amber',
                title: '3. Phản ứng thủy phân Este',
                body: `
<h4>Thủy phân trong môi trường axit (thuận nghịch)</h4>
<div class="ls-formula">RCOOR′ + H₂O ⇌ RCOOH + R′OH
(H₂SO₄ loãng, đun nóng)</div>
<h4>Thủy phân trong môi trường kiềm — Phản ứng xà phòng hóa (một chiều)</h4>
<div class="ls-formula">RCOOR′ + NaOH → RCOONa + R′OH
(đun nóng, một chiều → hoàn toàn)</div>
<div class="ls-callout success">
  <span class="ls-callout-icon">⭐</span>
  <span>Phản ứng xà phòng hóa là <strong>một chiều</strong> (→) vì muối RCOONa không tác dụng với alcohol để tạo este. Đây là điểm khác biệt quan trọng với thủy phân axit.</span>
</div>
<h4>Este của phenol</h4>
<div class="ls-formula">RCOOC₆H₅ + 2NaOH → RCOONa + C₆H₅ONa + H₂O
(tiêu tốn 2 mol NaOH)</div>`
              },
              {
                icon: '🏭', iconClass: 'icon-green',
                title: '4. Điều chế và ứng dụng',
                body: `
<h4>Điều chế</h4>
<ul>
  <li>Phương pháp chính: phản ứng este hóa (axit + alcohol, xúc tác H₂SO₄ đặc)</li>
  <li>Phản ứng của anhydride axit với alcohol</li>
</ul>
<h4>Ứng dụng</h4>
<ul>
  <li><strong>Dung môi</strong>: ethyl acetate dùng trong sơn, keo, mực in</li>
  <li><strong>Hương liệu</strong>: ngành thực phẩm, mỹ phẩm, nước hoa</li>
  <li><strong>Nguyên liệu</strong>: sản xuất polymer (polyester PET)</li>
  <li><strong>Dược phẩm</strong>: aspirin (acetyl salicylic acid)</li>
</ul>`
              }
            ],
            quiz: [
              {
                q: 'Este có công thức phân tử C₄H₈O₂. Este nào sau đây thủy phân cho ra acid acetic (CH₃COOH)?',
                opts: ['HCOOC₃H₇', 'CH₃COOC₂H₅', 'C₂H₅COOCH₃', 'HCOOC₂H₅'],
                ans: 1,
                explain: 'CH₃COOC₂H₅ (ethyl acetate) thủy phân cho CH₃COOH (acid acetic) + C₂H₅OH.'
              },
              {
                q: 'Este RCOOR′ phản ứng với NaOH theo tỉ lệ:',
                opts: ['1:1 (trừ este của phenol)', '1:2 luôn luôn', '2:1', '1:3'],
                ans: 0,
                explain: 'Este thường phản ứng 1:1 với NaOH. Riêng este của phenol (RCOOC₆H₅) tiêu tốn 2 mol NaOH (1 cho xà phòng hóa, 1 phản ứng với phenol).'
              },
              {
                q: 'Phản ứng xà phòng hóa este khác phản ứng thủy phân axit ở điểm nào?',
                opts: [
                  'Xà phòng hóa cần nhiệt độ cao hơn',
                  'Xà phòng hóa là phản ứng một chiều (hoàn toàn)',
                  'Xà phòng hóa không cần đun nóng',
                  'Xà phòng hóa tạo ra acid, không phải muối'
                ],
                ans: 1,
                explain: 'Xà phòng hóa (dùng NaOH/KOH) là phản ứng một chiều → đi đến hoàn toàn. Thủy phân axit là thuận nghịch ⇌.'
              },
              {
                q: 'Este nào có mùi chuối chín?',
                opts: ['Ethyl formate', 'Methyl acetate', 'Isoamyl acetate', 'Ethyl butyrate'],
                ans: 2,
                explain: 'Isoamyl acetate (CH₃COOC₅H₁₁) có mùi chuối chín đặc trưng, thường dùng trong hương liệu thực phẩm.'
              },
              {
                q: 'Cho CH₃COOC₂H₅ + NaOH → ? (đun nóng)',
                opts: [
                  'CH₃COOH + C₂H₅OH',
                  'CH₃COONa + C₂H₅OH',
                  'CH₃OH + C₂H₅COONa',
                  'CH₃COONa + C₂H₅ONa'
                ],
                ans: 1,
                explain: 'Xà phòng hóa: CH₃COOC₂H₅ + NaOH → CH₃COONa (sodium acetate) + C₂H₅OH (ethanol).'
              }
            ]
          },
          {
            id: 'l12-1-2',
            title: 'Bài 2: Lipit',
            tag: 'Lý thuyết · Lớp 12',
            readTime: '9 phút',
            sections: [
              {
                icon: '🫙', iconClass: 'icon-amber',
                title: '1. Khái niệm Lipit',
                body: `
<p><strong>Lipit</strong> là nhóm hợp chất hữu cơ thiên nhiên có trong tế bào sống, <strong>không tan trong nước</strong> nhưng <strong>tan trong dung môi hữu cơ</strong> (ether, benzene, chloroform).</p>
<p>Lipit bao gồm: chất béo (triglyceride), sáp, phospholipid, steroid...</p>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Trong chương trình THPT, <strong>chất béo (triglyceride)</strong> là loại lipit quan trọng nhất cần nắm vững.</span>
</div>`
              },
              {
                icon: '🧈', iconClass: 'icon-teal',
                title: '2. Chất béo (Triglyceride)',
                body: `
<p>Chất béo là trieste của glycerol (C₃H₅(OH)₃) với 3 phân tử acid béo (acid carboxylic mạch dài, không phân nhánh).</p>
<div class="ls-formula"><span class="label">Công thức chung</span>
(RCOO)₃C₃H₅   hay   Glycerol + 3 RCOOH → Triglyceride + 3H₂O</div>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Chất béo</th><th>Trạng thái</th><th>Acid béo chính</th></tr>
    <tr><td>Dầu thực vật</td><td>Lỏng (25°C)</td><td>Acid oleic, linoleic (không no)</td></tr>
    <tr><td>Mỡ động vật</td><td>Rắn (25°C)</td><td>Acid palmitic, stearic (no)</td></tr>
  </table>
</div>
<h4>Sự khác nhau dầu – mỡ</h4>
<p>Dầu thực vật chứa nhiều acid béo <strong>không no</strong> (có nối đôi C=C) → lỏng ở nhiệt độ thường. Mỡ động vật chứa nhiều acid béo <strong>no</strong> → rắn hoặc bán rắn.</p>`
              },
              {
                icon: '⚗️', iconClass: 'icon-green',
                title: '3. Tính chất hóa học chất béo',
                body: `
<h4>Phản ứng thủy phân (xà phòng hóa)</h4>
<div class="ls-formula">(RCOO)₃C₃H₅ + 3NaOH → C₃H₅(OH)₃ + 3RCOONa
Triglyceride   +  NaOH  → Glycerol  + Xà phòng (muối)</div>
<div class="ls-callout success">
  <span class="ls-callout-icon">🧼</span>
  <span>Đây là nguyên tắc sản xuất <strong>xà phòng</strong>: đun chất béo với NaOH (hay KOH) → muối carboxylate dùng làm xà phòng + glycerol.</span>
</div>
<h4>Phản ứng hydrogen hóa (cộng H₂)</h4>
<div class="ls-formula">Dầu lỏng (acid béo không no) + H₂ →(Ni, t°)→ Mỡ rắn (bơ thực vật)</div>
<h4>Phản ứng oxi hóa — Sự ôi thiu</h4>
<p>Chất béo không no bị oxi hóa bởi O₂ (không khí) tạo peroxide → aldehyde có mùi khó chịu. Đây là nguyên nhân <strong>dầu ăn bị ôi thiu</strong>.</p>`
              }
            ],
            quiz: [
              {
                q: 'Chất béo (triglyceride) là trieste của glycerol với:',
                opts: ['Acid vô cơ', 'Acid béo (mạch dài, không phân nhánh)', 'Acid acetic', 'Amino acid'],
                ans: 1,
                explain: 'Chất béo = triester của glycerol with acid béo (RCOOH, R là mạch C dài thẳng, không phân nhánh).'
              },
              {
                q: 'Vì sao dầu thực vật ở thể lỏng còn mỡ động vật ở thể rắn?',
                opts: [
                  'Dầu có phân tử khối lớn hơn',
                  'Dầu chứa acid béo không no (có C=C), mỡ chứa acid béo no',
                  'Mỡ chứa nhiều nguyên tử C hơn dầu',
                  'Dầu có nhiều glycerol hơn'
                ],
                ans: 1,
                explain: 'Acid béo không no (có nối đôi C=C) làm giảm nhiệt độ nóng chảy → dầu lỏng. Acid béo no (no liên kết C-C) làm mỡ rắn hoặc bán rắn ở nhiệt độ thường.'
              },
              {
                q: 'Cho (RCOO)₃C₃H₅ + 3NaOH → ?',
                opts: [
                  'RCOONa + C₃H₅(OH)₃',
                  '3RCOONa + C₃H₅(OH)₃',
                  'RCOOH + C₃H₅(OH)₃ + NaCl',
                  '3RCOOH + C₃H₅(OH)₃'
                ],
                ans: 1,
                explain: '(RCOO)₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₅(OH)₃. Ba nhóm este phản ứng with 3 mol NaOH tạo 3 mol xà phòng (muối) và 1 mol glycerol.'
              },
              {
                q: 'Để chuyển dầu thực vật (lỏng) thành bơ thực vật (rắn), người ta dùng phản ứng:',
                opts: ['Oxi hóa bằng O₂', 'Thủy phân bằng NaOH', 'Cộng H₂ (hydrogen hóa)', 'Este hóa'],
                ans: 2,
                explain: 'Hydrogen hóa dầu (Ni, t°): cộng H₂ vào các nối đôi C=C của acid béo không no → acid béo no → chất béo rắn (bơ thực vật, shortening).'
              },
              {
                q: 'Nguyên nhân dầu ăn bị ôi thiu là do:',
                opts: [
                  'Bị thủy phân bởi nước',
                  'Acid béo không no bị oxi hóa bởi O₂ không khí',
                  'Bị este hóa thêm',
                  'Glycerol bị phân hủy'
                ],
                ans: 1,
                explain: 'Các nối đôi C=C của acid béo không no bị O₂ (không khí, ánh sáng) oxi hóa → peroxide → aldehyde → mùi ôi khó chịu.'
              }
            ]
          },
          {
            id: 'l12-1-3',
            title: 'Bài 3: Xà phòng và Chất giặt rửa',
            tag: 'Lý thuyết · Lớp 12',
            readTime: '7 phút',
            sections: [
              {
                icon: '🧼', iconClass: 'icon-blue',
                title: '1. Xà phòng',
                body: `
<p><strong>Xà phòng</strong> là muối natri (hay kali) của acid béo, sản xuất bằng cách đun chất béo với NaOH (hay KOH).</p>
<div class="ls-formula"><span class="label">Phản ứng sản xuất xà phòng</span>
(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃
Tristearin             Xà phòng (sodium stearate) + Glycerol</div>
<h4>Cấu trúc phân tử xà phòng</h4>
<p>Phân tử xà phòng (RCOONa) có 2 phần:</p>
<ul>
  <li><strong>Đuôi kỵ nước</strong> (R−): mạch hydrocarbon dài, không phân cực → tan trong dầu mỡ</li>
  <li><strong>Đầu ưa nước</strong> (−COO⁻Na⁺): nhóm carboxylate phân cực → tan trong nước</li>
</ul>
<div class="ls-callout info">
  <span class="ls-callout-icon">🔬</span>
  <span>Cơ chế tẩy rửa: đuôi kỵ nước bao quanh vết dầu mỡ; đầu ưa nước hướng ra nước → tạo mixen → nước cuốn trôi.</span>
</div>`
              },
              {
                icon: '🫧', iconClass: 'icon-teal',
                title: '2. Chất giặt rửa tổng hợp',
                body: `
<p>Chất giặt rửa tổng hợp là muối của acid sulfonic hay acid sulfate, tổng hợp từ dầu mỏ.</p>
<h4>Ưu điểm so với xà phòng</h4>
<ul>
  <li><strong>Dùng được trong nước cứng</strong> (có Ca²⁺, Mg²⁺): ion của chất tẩy rửa tổng hợp không tạo kết tủa với Ca²⁺, Mg²⁺</li>
  <li>Hiệu quả trong môi trường axit</li>
  <li>Đa dạng công thức cho nhiều ứng dụng khác nhau</li>
</ul>
<h4>Nhược điểm</h4>
<ul>
  <li>Khó phân hủy sinh học hơn xà phòng truyền thống → ảnh hưởng môi trường</li>
</ul>`
              }
            ],
            quiz: [
              {
                q: 'Thành phần chính của xà phòng là:',
                opts: [
                  'Triglyceride',
                  'Muối natri của acid béo',
                  'Acid béo tự do',
                  'Glycerol'
                ],
                ans: 1,
                explain: 'Xà phòng = muối natri (RCOONa) hoặc kali (RCOOK) of acid béo mạch dài. Glycerol là sản phẩm phụ của quá trình sản xuất.'
              },
              {
                q: 'Xà phòng tẩy rửa được vết dầu mỡ nhờ:',
                opts: [
                  'Tính acid của nhóm −COOH',
                  'Cấu trúc lưỡng cực: đầu ưa nước (−COO⁻) và đuôi kỵ nước (R−)',
                  'Phản ứng trung hòa với dầu mỡ',
                  'Xà phòng hòa tan trực tiếp dầu mỡ vào nước'
                ],
                ans: 1,
                explain: 'Cấu trúc lưỡng cực of xà phòng: đuôi R− kỵ nước thấm vào dầu mỡ, đầu −COO⁻ ưa nước hướng ra nước → tạo mixen → nước cuốn trôi vết bẩn.'
              },
              {
                q: 'Chất giặt rửa tổng hợp có ưu điểm gì so với xà phòng truyền thống?',
                opts: [
                  'Thân thiện môi trường hơn',
                  'Dùng được trong nước cứng (có Ca²⁺, Mg²⁺)',
                  'Rẻ tiền hơn',
                  'Tan tốt hơn trong nước'
                ],
                ans: 1,
                explain: 'Xà phòng (RCOONa) tạo kết tủa with Ca²⁺, Mg²⁺ trong nước cứng → giảm tác dụng. Chất giặt rửa tổng hợp không có nhược điểm này.'
              }
            ]
          },
          {
            id: 'l12-1-4',
            title: 'Bài 4: Luyện tập Este và Chất béo',
            tag: 'Luyện tập · Lớp 12',
            readTime: '9 phút',
            sections: [
              {
                icon: '📝', iconClass: 'icon-amber',
                title: 'Tổng hợp kiến thức Chương 1',
                body: `
<h4>Este — Nhớ nhanh</h4>
<div class="ls-formula">• CTCT: RCOOR′  (R có thể là H; R′ ≠ H)
• Este hóa: RCOOH + R′OH ⇌ RCOOR′ + H₂O  (H₂SO₄ đặc, ⇌)
• Thủy phân (axit):  RCOOR′ + H₂O ⇌ RCOOH + R′OH  (⇌)
• Xà phòng hóa: RCOOR′ + NaOH → RCOONa + R′OH  (→, 1 chiều)
• Este của phenol: + 2 NaOH</div>
<h4>Chất béo — Nhớ nhanh</h4>
<div class="ls-formula">• Chất béo = (RCOO)₃C₃H₅  (trieste glycerol + acid béo)
• Dầu: acid béo không no (lỏng); Mỡ: acid béo no (rắn)
• Xà phòng hóa: + 3NaOH → 3RCOONa + glycerol
• Hydrogen hóa: dầu + H₂ →(Ni)→ bơ thực vật
• Ôi thiu: C=C bị oxi hóa bởi O₂</div>
<h4>Xà phòng & Chất giặt rửa</h4>
<div class="ls-formula">• Xà phòng = RCOONa (muối natri acid béo)
• Cơ chế: đầu ưa nước + đuôi kỵ nước → mixen
• Chất giặt rửa TH: dùng được nước cứng, ít phân hủy sinh học</div>
<div class="ls-callout success">
  <span class="ls-callout-icon">🎯</span>
  <span>Điểm phân biệt quan trọng: Thủy phân axit (<strong>thuận nghịch ⇌</strong>) vs. Xà phòng hóa (<strong>một chiều →</strong>). Este of phenol cần <strong>2 NaOH</strong>.</span>
</div>`
              }
            ],
            quiz: [
              {
                q: 'Este CH₃COOC₂H₅ có tên gọi là:',
                opts: ['Methyl formate', 'Ethyl acetate', 'Methyl acetate', 'Ethyl formate'],
                ans: 1,
                explain: 'CH₃COO− là gốc acetate (từ acid acetic CH₃COOH), −C₂H₅ là gốc ethyl. Tên: ethyl acetate.'
              },
              {
                q: 'Cho este X + NaOH → CH₃COONa + C₂H₅OH. Tên của X là:',
                opts: ['Methyl acetate', 'Ethyl formate', 'Ethyl acetate', 'Methyl propanoate'],
                ans: 2,
                explain: 'Sản phẩm CH₃COONa (từ CH₃COOH) and C₂H₅OH (từ C₂H₅O−) → X là CH₃COOC₂H₅ = ethyl acetate.'
              },
              {
                q: 'Số mol NaOH cần để xà phòng hóa hoàn toàn 1 mol tristearin là:',
                opts: ['1 mol', '2 mol', '3 mol', '6 mol'],
                ans: 2,
                explain: 'Tristearin (C₁₇H₃₅COO)₃C₃H₅ có 3 nhóm este → cần 3 mol NaOH.'
              },
              {
                q: 'Chất béo không no khi tác dụng với H₂ (Ni, t°) tạo ra:',
                opts: [
                  'Acid béo tự do',
                  'Chất béo no (rắn hơn)',
                  'Glycerol',
                  'Xà phòng'
                ],
                ans: 1,
                explain: 'Hydrogen hóa các nối đôi C=C của acid béo không no → acid béo no → chất béo rắn (bơ thực vật).'
              },
              {
                q: 'Este of phenol C₆H₅OOCCH₃ tác dụng with NaOH (đủ) tạo ra:',
                opts: [
                  'CH₃COONa + C₆H₅OH',
                  'CH₃COONa + C₆H₅ONa + H₂O',
                  'CH₃COOH + C₆H₅ONa',
                  'CH₃OH + C₆H₅COONa'
                ],
                ans: 1,
                explain: 'Este of phenol + 2NaOH: C₆H₅OOCCH₃ + 2NaOH → CH₃COONa + C₆H₅ONa + H₂O. Phenol tạo muối with NaOH.'
              }
            ]
          }
        ]
      },
      { id: 'c12-2', title: 'Chương 2: Cacbohidrat', lessons: [] },
      { id: 'c12-3', title: 'Chương 3: Amin, Amino Axit và Protein', lessons: [] },
      { id: 'c12-4', title: 'Chương 4: Polime và Vật Liệu Polime', lessons: [] },
      { id: 'c12-5', title: 'Chương 5: Đại cương về Kim Loại', lessons: [] },
      { id: 'c12-6', title: 'Chương 6: Kim Loại Kiềm, Kiềm Thổ, Nhôm', lessons: [] },
      { id: 'c12-7', title: 'Chương 7: Sắt và Một Số Kim Loại Quan Trọng', lessons: [] },
      { id: 'c12-8', title: 'Chương 8: Phân Biệt Một Số Chất Vô Cơ', lessons: [] },
      { id: 'c12-9', title: 'Chương 9: Hóa Học và Phát Triển Kinh Tế', lessons: [] }
    ]
  };
