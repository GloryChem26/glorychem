
const LESSON_DATA = {

  /* ══════════ LỚP 10 ══════════ */
  10: {
    label: 'Lớp 10',
    icon: '⚛️',
    chapters: [
      {
        id: 'c10-1',
        title: 'Chương 1: Cấu tạo nguyên tử',
        lessons: [
          {
            id: 'l10-1-1',
            title: 'Bài 1: Thành phần của nguyên tử',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '8 phút',
            sections: [
              {
                icon: '🔬', iconClass: 'icon-blue',
                title: '1. Nguyên tử là gì?',
                body: `
<p>Nguyên tử là hạt vô cùng nhỏ, trung hòa về điện, tạo nên mọi chất vật chất. Nguyên tử gồm hai phần:</p>
<ul>
  <li><strong>Hạt nhân</strong>: nằm ở trung tâm, mang điện tích dương (+)</li>
  <li><strong>Lớp vỏ electron</strong>: gồm các electron mang điện tích âm (−), chuyển động xung quanh hạt nhân</li>
</ul>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Kích thước nguyên tử vào khoảng <strong>10⁻¹⁰ m</strong> (1 Å), trong khi hạt nhân chỉ khoảng <strong>10⁻¹⁵ m</strong> — nhỏ hơn 100.000 lần!</span>
</div>`
              },
              {
                icon: '⚡', iconClass: 'icon-teal',
                title: '2. Các hạt cơ bản trong nguyên tử',
                body: `
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Hạt</th><th>Ký hiệu</th><th>Điện tích</th><th>Khối lượng (u)</th><th>Vị trí</th></tr>
    <tr><td>Proton</td><td>p</td><td>+1</td><td>1,0073</td><td>Hạt nhân</td></tr>
    <tr><td>Neutron</td><td>n</td><td>0</td><td>1,0087</td><td>Hạt nhân</td></tr>
    <tr><td>Electron</td><td>e</td><td>−1</td><td>0,000549</td><td>Vỏ nguyên tử</td></tr>
  </table>
</div>
<div class="ls-callout warn">
  <span class="ls-callout-icon">⚠️</span>
  <span>Khối lượng electron rất nhỏ (bằng 1/1836 proton) nên thực tế <strong>khối lượng nguyên tử tập trung gần như toàn bộ ở hạt nhân</strong>.</span>
</div>`
              },
              {
                icon: '🔢', iconClass: 'icon-amber',
                title: '3. Số hiệu nguyên tử (Z) và Số khối (A)',
                body: `
<h4>Số hiệu nguyên tử Z</h4>
<p>Z = số proton trong hạt nhân = số electron trong nguyên tử trung hòa. Đây là con số đặc trưng cho mỗi nguyên tố hóa học.</p>
<div class="ls-formula"><span class="label">Quy tắc</span>Z = số proton = số electron (nguyên tử trung hòa)</div>
<h4>Số khối A</h4>
<p>A = Z + N, trong đó N là số neutron.</p>
<div class="ls-formula"><span class="label">Công thức</span>A = Z + N  →  N = A − Z</div>
<h4>Ký hiệu nguyên tử</h4>
<div class="ls-formula"><span class="label">Ký hiệu</span>ᴬ_Z X   (X là ký hiệu nguyên tố; A ở trên, Z ở dưới bên trái)
Ví dụ:  ⁵⁶₂₆Fe  →  Z=26 (sắt), A=56, N=30</div>`
              }
            ],
            quiz: [
              {
                q: 'Hạt nào trong nguyên tử mang điện tích dương (+1)?',
                opts: ['Electron', 'Neutron', 'Proton', 'Tất cả đều đúng'],
                ans: 2,
                explain: 'Proton mang điện tích +1, nằm trong hạt nhân. Electron mang −1, neutron không mang điện.'
              },
              {
                q: 'Nguyên tử ⁴⁰₂₀Ca có số neutron là bao nhiêu?',
                opts: ['20', '40', '60', '80'],
                ans: 0,
                explain: 'N = A − Z = 40 − 20 = 20 neutron.'
              },
              {
                q: 'Điều nào sau đây ĐÚNG về nguyên tử trung hòa điện?',
                opts: [
                  'Số proton > số electron',
                  'Số proton = số electron',
                  'Số neutron = số electron',
                  'Số neutron = số proton'
                ],
                ans: 1,
                explain: 'Nguyên tử trung hòa điện nghĩa là tổng điện tích bằng 0, do đó số proton (điện +) luôn bằng số electron (điện −).'
              },
              {
                q: 'Hạt nhân nguyên tử được cấu tạo từ những hạt nào?',
                opts: ['Electron và proton', 'Proton và neutron', 'Neutron và electron', 'Chỉ có proton'],
                ans: 1,
                explain: 'Hạt nhân gồm proton (+) và neutron (trung hòa). Electron không nằm trong hạt nhân.'
              },
              {
                q: 'Nguyên tử X có Z = 17. Số electron của X là:',
                opts: ['17', '34', '51', 'Không xác định được'],
                ans: 0,
                explain: 'Z = số proton = số electron = 17. Đây là nguyên tố Clo (Cl).'
              }
            ]
          },
          {
            id: 'l10-1-2',
            title: 'Bài 2: Nguyên tố hóa học',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '7 phút',
            sections: [
              {
                icon: '🏷️', iconClass: 'icon-teal',
                title: '1. Định nghĩa nguyên tố hóa học',
                body: `
<p><strong>Nguyên tố hóa học</strong> là tập hợp những nguyên tử có cùng số proton (số hiệu nguyên tử Z) trong hạt nhân.</p>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Hiện nay có <strong>118 nguyên tố</strong> đã được xác nhận, từ Hydro (Z=1) đến Oganesson (Z=118).</span>
</div>
<h4>Nguyên tử khối</h4>
<p>Nguyên tử khối là khối lượng tương đối của nguyên tử, tính theo đơn vị <strong>u</strong> (đvC) — bằng 1/12 khối lượng nguyên tử carbon-12.</p>
<div class="ls-formula"><span class="label">Đơn vị</span>1 u = 1,66054 × 10⁻²⁷ kg</div>`
              },
              {
                icon: '🔄', iconClass: 'icon-purple',
                title: '2. Đồng vị',
                body: `
<p><strong>Đồng vị</strong> là những nguyên tử của cùng một nguyên tố (cùng Z) nhưng khác nhau về số neutron (N) → khác số khối A.</p>
<div class="ls-formula"><span class="label">Ví dụ — Đồng vị Carbon</span>
¹²₆C  →  Z=6, N=6  (bền, phổ biến 98,9%)
¹³₆C  →  Z=6, N=7  (bền, 1,1%)
¹⁴₆C  →  Z=6, N=8  (phóng xạ, dùng định tuổi)</div>
<div class="ls-formula"><span class="label">Ví dụ — Đồng vị Hydro</span>
¹₁H  (Protium)  →  N=0
²₁H  (Deuterium) →  N=1
³₁H  (Tritium)  →  N=2  (phóng xạ)</div>`
              },
              {
                icon: '📊', iconClass: 'icon-amber',
                title: '3. Nguyên tử khối trung bình',
                body: `
<p>Do các nguyên tố có nhiều đồng vị với tỉ lệ tự nhiên khác nhau, nguyên tử khối ghi trong bảng tuần hoàn là <strong>giá trị trung bình</strong>.</p>
<div class="ls-formula"><span class="label">Công thức</span>Ā = (a₁·A₁ + a₂·A₂ + ... + aₙ·Aₙ) / 100

Trong đó: aᵢ là % đồng vị i, Aᵢ là số khối đồng vị i</div>
<h4>Ví dụ: Clo (Cl)</h4>
<p>Cl có 2 đồng vị: ³⁵Cl (75,77%) và ³⁷Cl (24,23%)</p>
<div class="ls-formula">Ā = (75,77 × 35 + 24,23 × 37) / 100 = 35,48 u</div>`
              }
            ],
            quiz: [
              {
                q: 'Đặc điểm nào giống nhau giữa các đồng vị của cùng một nguyên tố?',
                opts: ['Số neutron', 'Số khối', 'Số proton', 'Khối lượng nguyên tử'],
                ans: 2,
                explain: 'Đồng vị là các nguyên tử cùng nguyên tố → cùng số proton (Z). Khác nhau về số neutron → khác số khối A.'
              },
              {
                q: 'Clo có 2 đồng vị: ³⁵Cl (75%) và ³⁷Cl (25%). Nguyên tử khối trung bình của Cl là:',
                opts: ['35,50', '35,75', '35,25', '36,00'],
                ans: 0,
                explain: 'Ā = (75×35 + 25×37)/100 = (2625+925)/100 = 3550/100 = 35,50'
              },
              {
                q: '¹H, ²H, ³H là các đồng vị của nguyên tố nào?',
                opts: ['Helium', 'Carbon', 'Hydro', 'Lithi'],
                ans: 2,
                explain: 'Tất cả đều có Z=1 (1 proton) → đều là Hydro (H). Chúng khác nhau về số neutron: 0, 1, 2.'
              },
              {
                q: 'Nguyên tố hóa học được phân biệt với nhau bởi:',
                opts: ['Số neutron', 'Số khối', 'Số proton (số hiệu nguyên tử)', 'Nguyên tử khối'],
                ans: 2,
                explain: 'Số proton (Z) là đặc trưng duy nhất xác định loại nguyên tố. Hai nguyên tử cùng Z → cùng nguyên tố dù số neutron có thể khác.'
              },
              {
                q: 'Boron (B) có nguyên tử khối trung bình = 10,81. Hai đồng vị là ¹⁰B và ¹¹B. Phần trăm đồng vị ¹⁰B là:',
                opts: ['81%', '19%', '10%', '90%'],
                ans: 1,
                explain: 'Gọi x% là %¹⁰B. (10x + 11(100-x))/100 = 10,81 → 10x + 1100 - 11x = 1081 → x = 19. Vậy ¹⁰B chiếm 19%.'
              }
            ]
          },
          {
            id: 'l10-1-3',
            title: 'Bài 3: Cấu trúc lớp vỏ electron',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '12 phút',
            sections: [
              {
                icon: '🌀', iconClass: 'icon-blue',
                title: '1. Lớp và phân lớp electron',
                body: `
<p>Electron trong nguyên tử sắp xếp theo từng <strong>lớp (shell)</strong>, đánh số n = 1, 2, 3, 4... (tương ứng K, L, M, N...)</p>
<p>Mỗi lớp chia thành các <strong>phân lớp (subshell)</strong>: s, p, d, f</p>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Lớp (n)</th><th>Tên</th><th>Phân lớp</th><th>Số e tối đa</th></tr>
    <tr><td>1</td><td>K</td><td>1s</td><td>2</td></tr>
    <tr><td>2</td><td>L</td><td>2s, 2p</td><td>8</td></tr>
    <tr><td>3</td><td>M</td><td>3s, 3p, 3d</td><td>18</td></tr>
    <tr><td>4</td><td>N</td><td>4s, 4p, 4d, 4f</td><td>32</td></tr>
  </table>
</div>
<div class="ls-callout info">
  <span class="ls-callout-icon">📌</span>
  <span>Số e tối đa của phân lớp: <strong>s = 2, p = 6, d = 10, f = 14</strong></span>
</div>`
              },
              {
                icon: '📋', iconClass: 'icon-teal',
                title: '2. Ba nguyên lý điền electron',
                body: `
<h4>Nguyên lý Aufbau (xây dựng)</h4>
<p>Electron điền vào orbital có năng lượng thấp trước, cao sau. Thứ tự: <code>1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p...</code></p>
<h4>Nguyên lý Pauli</h4>
<p>Mỗi orbital chứa tối đa <strong>2 electron</strong> và hai electron này phải có spin ngược chiều nhau (↑↓).</p>
<h4>Quy tắc Hund</h4>
<p>Trong cùng một phân lớp, electron điền vào từng orbital trống trước, rồi ghép đôi sau. Mọi electron đơn độc phải có spin cùng chiều.</p>
<div class="ls-callout success">
  <span class="ls-callout-icon">✏️</span>
  <span>Nhớ thứ tự điền e: <strong>1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶ ...</strong></span>
</div>`
              },
              {
                icon: '✍️', iconClass: 'icon-amber',
                title: '3. Viết cấu hình electron',
                body: `
<h4>Cách viết</h4>
<p>Điền electron theo thứ tự năng lượng (Aufbau), sau đó sắp xếp lại theo số lớp để viết cấu hình.</p>
<div class="ls-formula"><span class="label">Ví dụ — Na (Z=11)</span>
Điền: 1s² 2s² 2p⁶ 3s¹
Cấu hình: [Ne] 3s¹  hoặc  1s²2s²2p⁶3s¹</div>
<div class="ls-formula"><span class="label">Ví dụ — Fe (Z=26)</span>
Điền: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶
Cấu hình: [Ar] 3d⁶ 4s²</div>
<h4>Electron lớp ngoài cùng</h4>
<p>Số electron lớp ngoài cùng quyết định tính chất hóa học của nguyên tố. Nguyên tử có 1-3 e ngoài cùng thường là <strong>kim loại</strong>; 5-7 e là <strong>phi kim</strong>; 8 e là <strong>khí hiếm</strong> (bền).</p>`
              }
            ],
            quiz: [
              {
                q: 'Số electron tối đa trong phân lớp p là:',
                opts: ['2', '6', '10', '14'],
                ans: 1,
                explain: 'Phân lớp p có 3 orbital, mỗi orbital chứa tối đa 2e → tổng tối đa = 6 electron.'
              },
              {
                q: 'Cấu hình electron của Na (Z=11) là:',
                opts: ['1s²2s²2p⁶3s¹', '1s²2s²2p⁵3s²', '1s²2s²2p⁶3p¹', '1s²2s²2p⁷'],
                ans: 0,
                explain: 'Na có 11e. Điền lần lượt: 1s²(2) 2s²(4) 2p⁶(10) 3s¹(11). Cấu hình đúng: 1s²2s²2p⁶3s¹.'
              },
              {
                q: 'Nguyên tử có cấu hình electron 1s²2s²2p⁶3s²3p⁵ thuộc loại nguyên tố nào?',
                opts: ['Kim loại kiềm', 'Khí hiếm', 'Phi kim (halogen)', 'Kim loại chuyển tiếp'],
                ans: 2,
                explain: 'Lớp ngoài cùng là 3s²3p⁵ = 7 electron. Nguyên tử có 7e ngoài cùng là halogen (phi kim mạnh). Đây là Clo (Z=17).'
              },
              {
                q: 'Theo nguyên lý Pauli, một orbital nguyên tử chứa tối đa bao nhiêu electron?',
                opts: ['1', '2', '3', '4'],
                ans: 1,
                explain: 'Nguyên lý Pauli: mỗi orbital chứa tối đa 2 electron với spin ngược chiều (↑↓).'
              },
              {
                q: 'Nguyên tử X có cấu hình electron kết thúc ...3d⁵4s¹. Nguyên tử này vi phạm quy tắc nào nếu được viết là 3d⁴4s²?',
                opts: ['Nguyên lý Pauli', 'Quy tắc Hund', 'Nguyên lý Aufbau', 'Không vi phạm gì'],
                ans: 3,
                explain: 'Thực ra cả 3d⁵4s¹ và 3d⁴4s² đều không vi phạm nguyên lý nào về mặt lý thuyết cơ bản ở cấp THPT. Nhưng 3d⁵4s¹ là cấu hình thực nghiệm (đặc biệt ở Cr, Z=24) do phân lớp 3d nửa đầy bền hơn.'
              }
            ]
          },
          {
            id: 'l10-1-4',
            title: 'Bài 4: Ôn tập chương 1',
            tag: 'Ôn tập · Lớp 10',
            readTime: '10 phút',
            sections: [
              {
                icon: '📌', iconClass: 'icon-teal',
                title: 'Tóm tắt kiến thức chương 1',
                body: `
<h4>1. Thành phần nguyên tử</h4>
<ul>
  <li>Nguyên tử gồm <strong>hạt nhân</strong> (proton, neutron) và <strong>vỏ electron</strong></li>
  <li>Proton: điện tích +1, khối lượng ≈ 1u</li>
  <li>Neutron: không mang điện, khối lượng ≈ 1u</li>
  <li>Electron: điện tích −1, khối lượng cực nhỏ (≈ 0u)</li>
</ul>
<h4>2. Số hiệu Z và số khối A</h4>
<div class="ls-formula">Z = số proton = số electron (nguyên tử trung hòa)
A = Z + N  →  N = A − Z</div>
<h4>3. Đồng vị và nguyên tử khối trung bình</h4>
<ul>
  <li>Đồng vị: cùng Z, khác N</li>
  <li>Ā = Σ(aᵢ × Aᵢ) / 100</li>
</ul>
<h4>4. Cấu hình electron</h4>
<ul>
  <li>Thứ tự điền: 1s 2s 2p 3s 3p 4s 3d 4p ...</li>
  <li>Tối đa: s(2), p(6), d(10), f(14)</li>
  <li>3 nguyên lý: Aufbau, Pauli, Hund</li>
</ul>
<div class="ls-callout success">
  <span class="ls-callout-icon">🎯</span>
  <span>Electron lớp ngoài cùng quyết định tính chất hóa học: 1-3e (kim loại), 5-7e (phi kim), 8e (khí hiếm).</span>
</div>`
              }
            ],
            quiz: [
              {
                q: 'Nguyên tử ³²S có số proton, neutron, electron lần lượt là:',
                opts: ['16, 16, 16', '16, 32, 16', '32, 16, 32', '16, 14, 16'],
                ans: 0,
                explain: 'S: Z=16 → proton=16, electron=16. N = A−Z = 32−16 = 16 neutron.'
              },
              {
                q: 'Cấu hình electron của Mg (Z=12) là:',
                opts: ['1s²2s²2p⁶3s²', '1s²2s²2p⁸3s²', '1s²2s²2p⁶3p²', '2s²2p⁶3s²'],
                ans: 0,
                explain: 'Mg có 12e: 1s²(2) 2s²(4) 2p⁶(10) 3s²(12). Cấu hình: 1s²2s²2p⁶3s².'
              },
              {
                q: 'Nguyên tố X có 2 đồng vị: ⁶³X (69%) và ⁶⁵X (31%). Nguyên tử khối trung bình là:',
                opts: ['63,62', '64,00', '63,38', '64,62'],
                ans: 0,
                explain: 'Ā = (69×63 + 31×65)/100 = (4347+2015)/100 = 6362/100 = 63,62. Đây là đồng (Cu).'
              },
              {
                q: 'Ion X²⁺ có cấu hình electron 1s²2s²2p⁶. Nguyên tử X có tổng số electron là:',
                opts: ['10', '12', '8', '11'],
                ans: 1,
                explain: 'X²⁺ mất 2e so với X trung hòa. X²⁺ có 10e → X có 10+2 = 12e. X là Magie (Mg).'
              },
              {
                q: 'Nguyên tử nào dưới đây có số neutron bằng số proton?',
                opts: ['⁴⁰₁₈Ar', '¹²₆C', '³⁵₁₇Cl', '²³₁₁Na'],
                ans: 1,
                explain: '¹²₆C: Z=6, N=12−6=6. Số neutron = số proton = 6. Các nguyên tử còn lại: Ar(22n), Cl(18n), Na(12n) đều khác số proton.'
              }
            ]
          }
        ]
      },
      {
        id: 'c10-2',
        title: 'Chương 2: Bảng tuần hoàn các nguyên tố hóa học và định luật tuần hoàn',
        lessons: [
          {
            id: 'l10-2-1',
            title: 'Bài 5: Cấu tạo của bảng tuần hoàn các nguyên tố hóa học',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '10 phút',
            sections: [
              {
                icon: '📋', iconClass: 'icon-blue',
                title: '1. Nguyên tắc sắp xếp',
                body: `<p>Các nguyên tố được xếp theo chiều tăng dần của <strong>điện tích hạt nhân</strong>.</p>
<ul>
  <li>Cùng số lớp e → cùng Chu kì.</li>
  <li>Cùng số e hóa trị → cùng Nhóm.</li>
</ul>`
              },
              {
                icon: '📊', iconClass: 'icon-teal',
                title: '2. Cấu trúc bảng',
                body: `<p>Bảng gồm 7 chu kì và 18 cột (nhóm A và B).</p>
<ul>
  <li><strong>Chu kì:</strong> dãy hàng ngang. Chu kì 1, 2, 3 là chu kì nhỏ, còn lại là lớn.</li>
  <li><strong>Nhóm:</strong> cột dọc. Nhóm A (s, p), Nhóm B (d, f).</li>
</ul>`
              }
            ],
            quiz: [
              {
                q: 'Các nguyên tố trong cùng một chu kì có đặc điểm chung là gì?',
                opts: ['Cùng số electron', 'Cùng số lớp electron', 'Cùng số electron hóa trị', 'Tính chất hóa học tương tự'],
                ans: 1,
                explain: 'Các nguyên tố thuộc cùng chu kì có số lớp electron bằng nhau (bằng số thứ tự chu kì).'
              },
              {
                q: 'Bảng tuần hoàn có bao nhiêu chu kì nhỏ?',
                opts: ['2', '3', '4', '7'],
                ans: 1,
                explain: 'Chu kì nhỏ là chu kì 1, 2, 3.'
              }
            ]
          },
          {
            id: 'l10-2-2',
            title: 'Bài 6: Xu hướng biến đổi một số tính chất của nguyên tử các nguyên tố',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '12 phút',
            sections: [
              {
                icon: '📈', iconClass: 'icon-purple',
                title: '1. Trong một chu kì',
                body: `<p>Theo chiều Z tăng: Bán kính nguyên tử giảm, tính kim loại giảm, tính phi kim tăng, độ âm điện tăng.</p>`
              },
              {
                icon: '📉', iconClass: 'icon-amber',
                title: '2. Trong một nhóm A',
                body: `<p>Theo chiều Z tăng: Bán kính tăng, tính kim loại tăng, tính phi kim giảm, độ âm điện giảm.</p>`
              }
            ],
            quiz: [
              {
                q: 'Đại lượng nào sau đây tăng dần từ trái sang phải trong một chu kì?',
                opts: ['Bán kính nguyên tử', 'Tính kim loại', 'Độ âm điện', 'Cả 3 cấu trên'],
                ans: 2,
                explain: 'Độ âm điện tăng; bán kính và kim loại giảm.'
              }
            ]
          },
          {
            id: 'l10-2-3',
            title: 'Bài 7: Xu hướng biến đổi thành phần và một số tính chất của hợp chất',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '8 phút',
            sections: [
              {
                icon: '🧪', iconClass: 'icon-red',
                title: 'Oxide & Hydroxide lớn nhất',
                body: `<p>Trong một chu kì: Tính base của oxide và hydroxide giảm dần, đồng thời tính acid tăng dần.</p>`
              }
            ],
            quiz: [
              {
                q: 'Hợp chất nào có tính acid mạnh nhất trong dãy chu kì 3?',
                opts: ['H2SiO3', 'H3PO4', 'H2SO4', 'HClO4'],
                ans: 3,
                explain: 'Tính acid của hydroxide (acid có oxygen) tăng dần từ trái sang phải trong chu kì, cao nhất là HClO4.'
              }
            ]
          },
          {
            id: 'l10-2-4',
            title: 'Bài 8: Định luật tuần hoàn và ý nghĩa của bảng tuần hoàn',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '6 phút',
            sections: [
              {
                icon: '⚖️', iconClass: 'icon-green',
                title: 'Định luật tuần hoàn',
                body: `<p>Tính chất của các nguyên tố hóa học, cũng như thành phần và tính chất của các đơn chất và hợp chất của chúng, biến đổi tuần hoàn theo chiều tăng của điện tích hạt nhân.</p>`
              }
            ],
            quiz: [
              {
                q: 'Định luật tuần hoàn hiện đại dựa trên?',
                opts: ['Nguyên tử khối', 'Điện tích hạt nhân', 'Nhiệt độ sôi', 'Khối lượng riêng'],
                ans: 1,
                explain: 'Tính chất các nguyên tố biến đổi tuần hoàn theo chiều tăng của điện tích hạt nhân nguyên tử.'
              }
            ]
          },
          {
            id: 'l10-2-5',
            title: 'Bài 9: Ôn tập chương 2',
            tag: 'Ôn tập · Lớp 10',
            readTime: '10 phút',
            sections: [
              {
                icon: '📌', iconClass: 'icon-blue',
                title: 'Tóm tắt Quy luật Tuần Hoàn',
                body: `<ul><li>Chu kì (trái sang phải): r giảm, tính kim loại giảm, phi kim tăng.</li><li>Nhóm A (trên xuống dưới): r tăng, tính kim loại tăng, phi kim giảm.</li></ul>`
              }
            ],
            quiz: []
          }
        ]
      },
      {
        id: 'c10-3',
        title: 'Chương 3: Liên kết hóa học',
        lessons: [
          {
            id: 'l10-3-1',
            title: 'Bài 10: Quy tắc octet',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '8 phút',
            sections: [
              {
                icon: '🎯', iconClass: 'icon-blue',
                title: 'Quy tắc bát tử',
                body: `<p>Trong quá trình hình thành liên kết hóa học, nguyên tử có xu hướng nhường, nhận hoặc góp chung e để đạt cấu hình e bền vững của khí hiếm có 8e phân lớp ngoài cùng (trừ He có 2e).</p>`
              }
            ],
            quiz: [
              {
                q: 'Nguyên tử O (Z=8) cần cấu hình bao nhiêu e ngoài cùng để đạt octet?',
                opts: ['2', '4', '6', '8'],
                ans: 3,
                explain: 'Để đạt cấu hình khí hiếm Ne có 8e, O (có 6e ngoài cùng) cần nhận thêm 2e vào tạo ra ion O2- hoặc góp chung 2e.'
              }
            ]
          },
          {
            id: 'l10-3-2',
            title: 'Bài 11: Liên kết ion',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '10 phút',
            sections: [
              {
                icon: '🧲', iconClass: 'icon-amber',
                title: 'Liên kết ion và tinh thể ion',
                body: `<p>Hình thành do lực hút tĩnh điện giữa các ion mang điện tích trái dấu. Thường xảy ra giữa kim loại điển hình và phi kim điển hình.</p><p>Hợp chất ion thường ở trạng thái rắn, nhiệt độ nóng chảy, nhiệt độ sôi cao và tan tốt trong nước.</p>`
              }
            ],
            quiz: [
              {
                q: 'Hợp chất nào có liên kết ion?',
                opts: ['H2O', 'CO2', 'NaCl', 'CH4'],
                ans: 2,
                explain: 'NaCl là chất ion, được tạo bởi ion Na+ (kim loại điển hình) và Cl- (phi kim điển hình).'
              }
            ]
          },
          {
            id: 'l10-3-3',
            title: 'Bài 12: Liên kết cộng hóa trị',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '11 phút',
            sections: [
              {
                icon: '🤝', iconClass: 'icon-teal',
                title: 'Liên kết CHT',
                body: `<p>Hình thành bằng việc góp chung một hoặc nhiều cặp electron giữa hai nguyên tử phi kim. Cặp e chung có thể lệch hoặc không lệch về một phía.</p>`
              }
            ],
            quiz: [
              {
                q: 'Liên kết trong phân tử H2 là?',
                opts: ['Ion', 'CHT phân cực', 'CHT không phân cực', 'Kim loại'],
                ans: 2,
                explain: '2 nguyên tử H giống hệt nhau, không có sự chênh lệch độ âm điện, do đó cặp e chung không bị lệch.'
              }
            ]
          },
          {
            id: 'l10-3-4',
            title: 'Bài 13: Liên kết hydrogen và tương tác van der waals',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '8 phút',
            sections: [
              {
                icon: '🌊', iconClass: 'icon-blue',
                title: 'Tương tác yếu',
                body: `<p>Liên kết hydrogen xảy ra giữa H tích điện (+) và (F, O, N) có độ âm điện lớn. Làm tăng đáng kể nhiệt độ sôi của chất lỏng như nước, rượu. Tương tác van der Waals yếu hơn, phụ thuộc khối lượng phân tử và diện tích tiếp xúc.</p>`
              }
            ],
            quiz: [
              {
                q: 'Tại sao nước (H2O) có nhiệt độ sôi cao bất thường so với H2S?',
                opts: ['Phân tử khối lớn hơn', 'Có liên kết ion', 'Có liên kết hydrogen liên phân tử', 'Có tương tác van der waals mạnh'],
                ans: 2,
                explain: 'Liên kết hydrogen giữa các phân tử H2O làm cho chúng hút nhau chặt hơn, cần nhiều năng lượng nhiệt hơn để cắt đứt khi sôi.'
              }
            ]
          },
          {
            id: 'l10-3-5',
            title: 'Bài 14: Ôn tập chương 3',
            tag: 'Ôn tập · Lớp 10',
            readTime: '10 phút',
            sections: [
               {
                icon: '📌', iconClass: 'icon-teal',
                title: 'Tóm tắt Liên Kết',
                body: `<ul><li>Liên kết ion: hút tĩnh điện (kim loại - phi kim).</li><li>Liên kết CHT: dùng chung e (phi kim - phi kim).</li><li>Liên kết yếu: liên phân tử.</li></ul>`
              }             
            ],
            quiz: []
          }
        ]
      },
      {
        id: 'c10-4',
        title: 'Chương 4: Phản ứng Oxi hóa - khử',
        lessons: [
          {
            id: 'l10-4-1',
            title: 'Bài 15: Phản ứng oxi hóa - khử',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '15 phút',
            sections: [
              {
                icon: '⚡', iconClass: 'icon-amber',
                title: '1. Sự Oxi hóa và Sự Khử',
                body: `<p>Chất khử (nhường e) bị oxi hóa. Chất oxi hóa (nhận e) bị khử.</p>`
              },
              {
                icon: '⚖️', iconClass: 'icon-blue',
                title: '2. Cân bằng phương trình',
                body: `<p>Sử dụng phương pháp thăng bằng electron: Tổng số e nhường = Tổng số e nhận.</p>`
              }
            ],
            quiz: [
              {
                q: 'Dấu hiệu nhận biết phản ứng oxi hóa khử?',
                opts: ['Sinh ra khí', 'Có kết tủa', 'Đổi màu', 'Sự thay đổi số oxi hóa'],
                ans: 3,
                explain: 'Định nghĩa: Phản ứng oxh-khử luôn có sự thay đổi số oxi hóa của các nguyên tố tham gia.'
              }
            ]
          },
          {
             id: 'l10-4-2',
             title: 'Bài 16: Ôn tập chương 4',
             tag: 'Ôn tập · Lớp 10',
             readTime: '10 phút',
             sections: [
                 {
                    icon: '📌', iconClass: 'icon-red',
                    title: 'Ôn tập phản ứng O-K',
                    body: `<p>Khử: cho (e), tăng (số oxh). Oxi hóa: nhận (e), giảm (số oxh).</p>`
                 }
             ],
             quiz: []
          }
        ]
      },
      {
        id: 'c10-5',
        title: 'Chương 5: Năng lượng hóa học',
        lessons: [
          {
            id: 'l10-5-1',
            title: 'Bài 17: Biến thiên enthalpy trong các phản ứng hóa học',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '10 phút',
            sections: [
              {
                icon: '🔥', iconClass: 'icon-red',
                title: 'Biến thiên Enthalpy (ΔrH)',
                body: `<p>ΔrH < 0 là phản ứng tỏa nhiệt (vd: đốt cháy). ΔrH > 0 là phản ứng thu nhiệt (vd: nhiệt phân).</p>`
              }
            ],
            quiz: [
              {
                q: 'Phản ứng phân hủy CaCO3 bằng nhiệt có rH = 178 kJ là phản ứng:',
                opts: ['Tỏa nhiệt', 'Thu nhiệt', 'Không đổi nhiệt', 'Làm lạnh hệ'],
                ans: 1,
                explain: 'ΔH dương nghĩa là phản ứng thu nhiệt (cần cung cấp nhiệt liên tục).'
              }
            ]
          },
          {
             id: 'l10-5-2',
             title: 'Bài 18: Ôn tập chương 5',
             tag: 'Ôn tập · Lớp 10',
             readTime: '10 phút',
             sections: [
                 {
                    icon: '📌', iconClass: 'icon-red',
                    title: 'Ôn tập Năng lượng hóa học',
                    body: `<p>Các phương pháp tính biến thiên Enthalpy: Sử dụng nhiệt tạo thành chuẩn hoặc năng lượng liên kết.</p>`
                 }
             ],
             quiz: []
          }          
        ]
      },
      {
        id: 'c10-6',
        title: 'Chương 6: Tốc độ phản ứng',
        lessons: [
          {
            id: 'l10-6-1',
            title: 'Bài 19: Tốc độ phản ứng',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '15 phút',
            sections: [
              {
                icon: '⏱️', iconClass: 'icon-blue',
                title: '1. Các yếu tố ảnh hưởng',
                body: `<p>Có 5 yếu tố ảnh hưởng đến tốc độ: Nồng độ, nhiệt độ, áp suất, diện tích bề mặt, và chất xúc tác. Định luật tác dụng khối lượng: Tốc độ v = k * [A]^a * [B]^b</p>`
              }
            ],
            quiz: [
              {
                q: 'Để củi cháy nhanh hơn ta thường chẻ nhỏ củi. Yếu tố nào đã tác động?',
                opts: ['Nhiệt độ', 'Áp suất', 'Diện tích tiếp xúc', 'Xúc tác'],
                ans: 2,
                explain: 'Chẻ củi làm tăng diện tích tiếp xúc hóa học với O2 trong không khí.'
              }
            ]
          },
          {
             id: 'l10-6-2',
             title: 'Bài 20: Ôn tập chương 6',
             tag: 'Ôn tập · Lớp 10',
             readTime: '10 phút',
             sections: [
                 {
                    icon: '📌', iconClass: 'icon-blue',
                    title: 'Ôn tập Tốc độ',
                    body: `<p>Hệ số nhiệt độ Van t Hoff: tốc độ tăng 2-4 lần khi nhiệt độ tăng 10 độ C.</p>`
                 }
             ],
             quiz: []
          }          
        ]
      },
      {
        id: 'c10-7',
        title: 'Chương 7: Nguyên tố nhóm Halogen',
        lessons: [
          {
            id: 'l10-7-1',
            title: 'Bài 21: Nhóm halogen',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '12 phút',
            sections: [
              {
                icon: '🧪', iconClass: 'icon-green',
                title: 'Tính chất các đơn chất',
                body: `<p>Nhóm VIIA, 7e lớp ngoài cùng. Trạng thái biến đổi từ khí (F2, Cl2) sang lỏng (Br2) sang rắn (I2). Tính oxi hóa mạnh, giảm dần từ F đến I.</p>`
              }
            ],
            quiz: [
              {
                q: 'Halogen nào ở trạng thái lỏng ở đk thường?',
                opts: ['Fluorine', 'Chlorine', 'Bromine', 'Iodine'],
                ans: 2,
                explain: 'Br2 lỏng màu nâu đỏ ở điều kiện thường.'
              }
            ]
          },
          {
            id: 'l10-7-2',
            title: 'Bài 22: Hydrogen halide - Muối halide',
            tag: 'Lý thuyết · Lớp 10',
            readTime: '10 phút',
            sections: [
              {
                icon: '🧪', iconClass: 'icon-teal',
                title: 'Hydrogen Halide',
                body: `<p>Phân tử khí HX (X = F, Cl, Br, I). Khi tan trong nước tạo acid HX. Tính acid tăng dần từ HF (yếu) đến HI (rất mạnh).</p>`
              }
            ],
            quiz: [
              {
                q: 'Axit nào sau đây ăn mòn thủy tinh?',
                opts: ['HCl', 'HBr', 'HI', 'HF'],
                ans: 3,
                explain: 'Acid HF yếu nhưng có tính chất đặc biệt là có khả năng hòa tan SiO2 trong thủy tinh (khắc chữ lên thủy tinh).'
              }
            ]
          },
          {
             id: 'l10-7-3',
             title: 'Bài 23: Ôn tập chương 7',
             tag: 'Ôn tập · Lớp 10',
             readTime: '10 phút',
             sections: [
                 {
                    icon: '📌', iconClass: 'icon-green',
                    title: 'Ôn tập Halogen',
                    body: `<p>Để nhận biết muối halide, dùng AgNO3 tạo kết tủa: AgCl (trắng), AgBr (vàng nhạt), AgI (vàng đậm). AgF tan.</p>`
                 }
             ],
             quiz: []
          }          
        ]
      }

    ]
  },

  /* ══════════ LỚP 11 ══════════ */
  11: {
    label: 'Lớp 11',
    icon: '⚗️',
    chapters: [
      {
        id: 'c11-1',
        title: 'Chương 1: Cân bằng hóa học',
        lessons: [
          {
            id: 'l11-1-1',
            title: 'Bài 1: Khái niệm về cân bằng hóa học',
            tag: 'Lý thuyết · Lớp 11',
            readTime: '10 phút',
            sections: [
              {
                icon: '↔️', iconClass: 'icon-blue',
                title: '1. Phản ứng thuận nghịch',
                body: `
<p>Phản ứng hóa học chia làm 2 loại:</p>
<ul>
  <li><strong>Phản ứng một chiều</strong>: chỉ xảy ra theo một hướng (→)</li>
  <li><strong>Phản ứng thuận nghịch</strong>: xảy ra theo cả hai hướng trong cùng điều kiện, ký hiệu ⇌</li>
</ul>
<div class="ls-formula"><span class="label">Ví dụ — Phản ứng thuận nghịch</span>
N₂(g) + 3H₂(g) ⇌ 2NH₃(g)

Chiều thuận: N₂ + H₂ → NH₃
Chiều nghịch: NH₃ → N₂ + H₂</div>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Trong phản ứng thuận nghịch, cả hai chiều xảy ra <strong>đồng thời</strong>. Hệ không bao giờ phản ứng hoàn toàn.</span>
</div>`
              },
              {
                icon: '⚖️', iconClass: 'icon-teal',
                title: '2. Trạng thái cân bằng',
                body: `
<p>Trạng thái cân bằng hóa học đạt được khi <strong>tốc độ phản ứng thuận = tốc độ phản ứng nghịch</strong>.</p>
<ul>
  <li>Nồng độ chất phản ứng và sản phẩm <strong>không đổi</strong> (nhưng không nhất thiết bằng nhau)</li>
  <li>Cân bằng là <strong>động</strong>: phản ứng vẫn xảy ra nhưng tốc độ hai chiều bằng nhau</li>
  <li>Có thể đạt từ cả hai phía (bắt đầu từ chất đầu hoặc sản phẩm)</li>
</ul>
<div class="ls-callout warn">
  <span class="ls-callout-icon">⚠️</span>
  <span>Cân bằng hóa học là <strong>cân bằng động</strong>, không phải cân bằng tĩnh! Tại cân bằng, v₁ = v₂ ≠ 0.</span>
</div>`
              },
              {
                icon: '🔢', iconClass: 'icon-amber',
                title: '3. Hằng số cân bằng Kc',
                body: `
<p>Cho phản ứng: aA + bB ⇌ cC + dD</p>
<div class="ls-formula"><span class="label">Biểu thức Kc</span>
Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ

Trong đó: [X] là nồng độ mol/L của chất X tại cân bằng</div>
<p><strong>Lưu ý quan trọng:</strong></p>
<ul>
  <li>Chất rắn (s) và chất lỏng nguyên chất (l) <strong>không xuất hiện</strong> trong biểu thức Kc</li>
  <li>Kc chỉ phụ thuộc vào nhiệt độ</li>
  <li>Kc lớn → phản ứng thiên về tạo sản phẩm; Kc nhỏ → phản ứng thiên về chất đầu</li>
</ul>
<div class="ls-formula"><span class="label">Ví dụ</span>
N₂ + 3H₂ ⇌ 2NH₃

Kc = [NH₃]² / ([N₂][H₂]³)</div>`
              },
              {
                icon: '🔄', iconClass: 'icon-green',
                title: '4. Nguyên lý Le Chatelier',
                body: `
<p><strong>Nguyên lý Le Chatelier</strong>: Nếu một hệ cân bằng chịu tác động từ bên ngoài (thay đổi nồng độ, nhiệt độ, áp suất), cân bằng sẽ dịch chuyển theo chiều chống lại sự thay đổi đó.</p>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Tác động</th><th>Chiều dịch chuyển CB</th></tr>
    <tr><td>Tăng nồng độ chất đầu</td><td>Thuận (→)</td></tr>
    <tr><td>Tăng nồng độ sản phẩm</td><td>Nghịch (←)</td></tr>
    <tr><td>Tăng nhiệt độ</td><td>Chiều thu nhiệt (ΔH > 0)</td></tr>
    <tr><td>Tăng áp suất</td><td>Chiều giảm số mol khí</td></tr>
    <tr><td>Thêm chất xúc tác</td><td>Không dịch chuyển (nhanh đạt CB hơn)</td></tr>
  </table>
</div>`
              }
            ],
            quiz: [
              {
                q: 'Phản ứng nào sau đây là phản ứng thuận nghịch?',
                opts: [
                  '2KClO₃ → 2KCl + 3O₂ (to)',
                  'N₂ + 3H₂ ⇌ 2NH₃',
                  'NaOH + HCl → NaCl + H₂O',
                  'Zn + 2HCl → ZnCl₂ + H₂↑'
                ],
                ans: 1,
                explain: 'Ký hiệu ⇌ chỉ phản ứng thuận nghịch. N₂ + 3H₂ ⇌ 2NH₃ là phản ứng tổng hợp amoniac điển hình của Haber.'
              },
              {
                q: 'Tại trạng thái cân bằng hóa học, điều nào sau đây ĐÚNG?',
                opts: [
                  'Phản ứng dừng lại hoàn toàn',
                  'Nồng độ chất đầu bằng nồng độ sản phẩm',
                  'Tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch',
                  'Chỉ còn lại sản phẩm'
                ],
                ans: 2,
                explain: 'Cân bằng động: v₁ = v₂ ≠ 0. Nồng độ không đổi nhưng không nhất thiết bằng nhau.'
              },
              {
                q: 'Cho phản ứng: 2SO₂ + O₂ ⇌ 2SO₃ (ΔH < 0). Để tăng hiệu suất tạo SO₃, ta nên:',
                opts: [
                  'Tăng nhiệt độ',
                  'Giảm áp suất',
                  'Tăng nồng độ SO₂',
                  'Thêm chất xúc tác để dịch chuyển cân bằng thuận'
                ],
                ans: 2,
                explain: 'Tăng nồng độ chất đầu (SO₂) → CB dịch theo chiều thuận → tạo thêm SO₃. Chất xúc tác chỉ giúp đạt CB nhanh hơn, không dịch chuyển CB. Tăng nhiệt độ sẽ dịch theo chiều nghịch (vì ΔH<0).'
              },
              {
                q: 'Kc của phản ứng H₂ + I₂ ⇌ 2HI được tính bằng:',
                opts: ['[HI]²/[H₂][I₂]', '[H₂][I₂]/[HI]²', '[HI]/[H₂][I₂]', '[H₂][I₂]/[HI]'],
                ans: 0,
                explain: 'Kc = [sản phẩm]^hệ số / [chất đầu]^hệ số = [HI]² / ([H₂][I₂])'
              },
              {
                q: 'Hằng số cân bằng Kc phụ thuộc vào yếu tố nào?',
                opts: ['Nồng độ chất đầu', 'Áp suất', 'Nhiệt độ', 'Chất xúc tác'],
                ans: 2,
                explain: 'Kc chỉ phụ thuộc vào nhiệt độ. Thay đổi nồng độ, áp suất hay chất xúc tác không làm thay đổi Kc.'
              }
            ]
          },
          {
            id: 'l11-1-2',
            title: 'Bài 2: Cân bằng trong dung dịch nước',
            tag: 'Lý thuyết · Lớp 11',
            readTime: '11 phút',
            sections: [
              {
                icon: '💧', iconClass: 'icon-blue',
                title: '1. Sự điện li',
                body: `
<p><strong>Sự điện li</strong> là quá trình phân li của các chất tan ra thành ion trong dung dịch.</p>
<ul>
  <li><strong>Chất điện li mạnh</strong>: phân li hoàn toàn (→). Gồm: axit mạnh (HCl, HNO₃, H₂SO₄...), bazơ mạnh (NaOH, KOH...), hầu hết muối tan.</li>
  <li><strong>Chất điện li yếu</strong>: phân li một phần (⇌). Gồm: axit yếu (CH₃COOH, HF...), bazơ yếu (NH₃, Mg(OH)₂...).</li>
</ul>
<div class="ls-formula"><span class="label">Ví dụ</span>
HCl → H⁺ + Cl⁻                      (điện li mạnh)
CH₃COOH ⇌ CH₃COO⁻ + H⁺    (điện li yếu)</div>`
              },
              {
                icon: '🧪', iconClass: 'icon-teal',
                title: '2. Tích số ion của nước — pH',
                body: `
<p>Nước tự điện li theo phương trình: H₂O ⇌ H⁺ + OH⁻</p>
<div class="ls-formula"><span class="label">Tích số ion của nước (25°C)</span>
Kw = [H⁺][OH⁻] = 10⁻¹⁴</div>
<p><strong>pH</strong> là thang đo độ axit/bazơ:</p>
<div class="ls-formula"><span class="label">Công thức pH</span>
pH = −log[H⁺]   →   [H⁺] = 10⁻ᵖᴴ <br/>

Môi trường axit:    pH < 7  ([H⁺] > 10⁻⁷) <br/>
Môi trường trung tính: pH = 7  ([H⁺] = 10⁻⁷) <br/>
Môi trường bazơ:   pH > 7  ([H⁺] < 10⁻⁷)</div>
<h4>pOH</h4>
<div class="ls-formula">pOH = −log[OH⁻]
pH + pOH = 14</div>`
              },
              {
                icon: '⚗️', iconClass: 'icon-amber',
                title: '3. Phản ứng trao đổi ion trong dung dịch',
                body: `
<p>Phản ứng trao đổi ion trong dung dịch chất điện li xảy ra khi có ít nhất một trong các điều kiện:</p>
<ul>
  <li>Tạo thành <strong>chất kết tủa</strong> (↓)</li>
  <li>Tạo thành <strong>chất khí</strong> (↑)</li>
  <li>Tạo thành <strong>chất điện li yếu</strong> (nước, axit yếu...)</li>
</ul>
<div class="ls-formula"><span class="label">Ví dụ — Phương trình ion rút gọn</span>
BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl
Dạng ion rút gọn: Ba²⁺ + SO₄²⁻ → BaSO₄↓</div>`
              }
            ],
            quiz: [
              {
                q: 'Dung dịch HCl 0,01M có pH = ?',
                opts: ['1', '2', '12', '13'],
                ans: 1,
                explain: 'HCl điện li mạnh: HCl → H⁺ + Cl⁻ → [H⁺] = 0,01 = 10⁻². pH = −log(10⁻²) = 2.'
              },
              {
                q: 'Tại 25°C, dung dịch có [OH⁻] = 10⁻³ M thì pH = ?',
                opts: ['3', '11', '4', '10'],
                ans: 1,
                explain: 'pOH = −log(10⁻³) = 3. pH = 14 − pOH = 14 − 3 = 11. Dung dịch có tính bazơ.'
              },
              {
                q: 'Chất nào sau đây là chất điện li mạnh?',
                opts: ['CH₃COOH', 'HF', 'NaOH', 'NH₃'],
                ans: 2,
                explain: 'NaOH là bazơ mạnh, điện li hoàn toàn: NaOH → Na⁺ + OH⁻. CH₃COOH, HF là axit yếu; NH₃ là bazơ yếu.'
              },
              {
                q: 'Phản ứng nào sau đây XẢY RA trong dung dịch?',
                opts: [
                  'NaCl + KNO₃ → KCl + NaNO₃',
                  'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl',
                  'KCl + NaOH → không phản ứng',
                  'HCl + NaNO₃ → không phản ứng'
                ],
                ans: 1,
                explain: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl xảy ra vì tạo kết tủa BaSO₄ không tan. Các phản ứng còn lại không thỏa điều kiện (không có kết tủa, khí, hay chất điện li yếu).'
              },
              {
                q: 'Giá trị Kw = [H⁺][OH⁻] = 10⁻¹⁴ ở 25°C. Nếu [H⁺] = 10⁻⁵ M thì [OH⁻] = ?',
                opts: ['10⁻⁵ M', '10⁻⁹ M', '10⁻¹⁹ M', '10⁻⁴ M'],
                ans: 1,
                explain: '[OH⁻] = Kw / [H⁺] = 10⁻¹⁴ / 10⁻⁵ = 10⁻⁹ M.'
              }
            ]
          },
          {
            id: 'l11-1-3',
            title: 'Bài 3: Ôn tập chương 1',
            tag: 'Ôn tập · Lớp 11',
            readTime: '8 phút',
            sections: [
              {
                icon: '📌', iconClass: 'icon-teal',
                title: 'Tóm tắt kiến thức chương 1',
                body: `
<h4>1. Phản ứng thuận nghịch & Cân bằng hóa học</h4>
<ul>
  <li>Phản ứng thuận nghịch ký hiệu ⇌; không phản ứng hoàn toàn</li>
  <li>Cân bằng động: v₁ = v₂ ≠ 0; nồng độ không đổi</li>
</ul>
<h4>2. Hằng số cân bằng Kc</h4>
<div class="ls-formula">aA + bB ⇌ cC + dD
Kc = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ   (không gồm chất rắn, lỏng nguyên chất)
Kc chỉ phụ thuộc nhiệt độ</div>
<h4>3. Nguyên lý Le Chatelier</h4>
<ul>
  <li>Tăng nồng độ chất đầu → CB dịch thuận</li>
  <li>Tăng nhiệt độ → CB dịch chiều thu nhiệt</li>
  <li>Tăng áp suất → CB dịch chiều giảm mol khí</li>
  <li>Xúc tác → không dịch CB, chỉ đạt CB nhanh hơn</li>
</ul>
<h4>4. Điện li — pH</h4>
<div class="ls-formula">pH = −log[H⁺]     Kw = [H⁺][OH⁻] = 10⁻¹⁴
pH + pOH = 14</div>`
              }
            ],
            quiz: [
              {
                q: 'Cho N₂ + 3H₂ ⇌ 2NH₃ (ΔH = −92 kJ/mol). Biện pháp nào làm TĂNG hiệu suất NH₃?',
                opts: [
                  'Tăng nhiệt độ',
                  'Giảm áp suất',
                  'Tăng nồng độ N₂ và H₂',
                  'Cho thêm xúc tác sắt (Fe)'
                ],
                ans: 2,
                explain: 'Tăng nồng độ chất đầu → CB dịch thuận → tăng NH₃. Tăng nhiệt độ dịch nghịch (ΔH<0). Giảm áp suất dịch nghịch (chiều tăng mol khí). Xúc tác không dịch CB.'
              },
              {
                q: 'Dung dịch HNO₃ 0,001M có pH = ?',
                opts: ['1', '2', '3', '4'],
                ans: 2,
                explain: 'HNO₃ là axit mạnh: [H⁺] = 0,001 = 10⁻³ M. pH = −log(10⁻³) = 3.'
              },
              {
                q: 'Kc > 1 cho phản ứng thuận nghịch aA ⇌ bB có ý nghĩa là:',
                opts: [
                  'Tại cân bằng, nồng độ A > nồng độ B',
                  'Tại cân bằng, sản phẩm B chiếm ưu thế hơn chất đầu A',
                  'Phản ứng chưa đạt cân bằng',
                  'Phản ứng nghịch nhanh hơn phản ứng thuận'
                ],
                ans: 1,
                explain: 'Kc = [B]ᵇ/[A]ᵃ > 1 → tử số > mẫu số → nồng độ sản phẩm cao hơn. CB thiên về phía sản phẩm.'
              }
            ]
          }
        ]
      },
      { id: 'c11-2', title: 'Chương 2: Nitrogen – Sulfur', lessons: [] },
      { id: 'c11-3', title: 'Chương 3: Đại cương về hóa học hữu cơ', lessons: [] },
      { id: 'c11-4', title: 'Chương 4: Hydrocarbon', lessons: [] },
      { id: 'c11-5', title: 'Chương 5: Dẫn xuất Halogen – Alcohol – Phenol', lessons: [] },
      { id: 'c11-6', title: 'Chương 6: Hợp chất Carbonyl – Carboxylic Acid', lessons: [] }
    ]
  },

  /* ══════════ LỚP 12 ══════════ */
  12: {
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
                explain: 'Chất béo = triester của glycerol với acid béo (RCOOH, R là mạch C dài thẳng, không phân nhánh).'
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
                explain: '(RCOO)₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₅(OH)₃. Ba nhóm este phản ứng với 3 mol NaOH tạo 3 mol xà phòng (muối) và 1 mol glycerol.'
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
                explain: 'Xà phòng = muối natri (RCOONa) hoặc kali (RCOOK) của acid béo mạch dài. Glycerol là sản phẩm phụ của quá trình sản xuất.'
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
                explain: 'Cấu trúc lưỡng cực của xà phòng: đuôi R− kỵ nước thấm vào dầu mỡ, đầu −COO⁻ ưa nước hướng ra nước → tạo mixen → nước cuốn trôi vết bẩn.'
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
                explain: 'Xà phòng (RCOONa) tạo kết tủa với Ca²⁺, Mg²⁺ trong nước cứng → giảm tác dụng. Chất giặt rửa tổng hợp không có nhược điểm này.'
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
  <span>Điểm phân biệt quan trọng: Thủy phân axit (<strong>thuận nghịch ⇌</strong>) vs. Xà phòng hóa (<strong>một chiều →</strong>). Este của phenol cần <strong>2 NaOH</strong>.</span>
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
                explain: 'Sản phẩm CH₃COONa (từ CH₃COOH) và C₂H₅OH (từ C₂H₅O−) → X là CH₃COOC₂H₅ = ethyl acetate.'
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
                q: 'Este của phenol C₆H₅OOCCH₃ tác dụng với NaOH (đủ) tạo ra:',
                opts: [
                  'CH₃COONa + C₆H₅OH',
                  'CH₃COONa + C₆H₅ONa + H₂O',
                  'CH₃COOH + C₆H₅ONa',
                  'CH₃OH + C₆H₅COONa'
                ],
                ans: 1,
                explain: 'Este của phenol + 2NaOH: C₆H₅OOCCH₃ + 2NaOH → CH₃COONa + C₆H₅ONa + H₂O. Phenol tạo muối với NaOH.'
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
  }
};

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
}

function switchLessonGrade(grade) {
  LS.grade = grade;
  LS.chapterId = null;
  LS.lessonId = null;
  document.querySelectorAll('.ls-grade-tab').forEach(t => {
    t.classList.toggle('active', +t.dataset.grade === grade);
  });
  renderLessonGrade(grade);
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
    const isOpen = LS.chapterId === ch.id || (ci === 0 && !LS.chapterId);
    return `
    <div class="ls-chapter-group">
      <button class="ls-chapter-btn${isOpen ? ' open' : ''}" onclick="toggleChapter('${ch.id}', this)">
        <span style="font-size:.8rem;opacity:.5">${ci + 1}.</span>
        <span>${ch.title}</span>
        ${hasLessons ? `<span class="ls-chapter-arrow">▶</span>` : `<span class="ls-chapter-arrow" style="opacity:.3">▶</span>`}
      </button>
      <div class="ls-lessons-list${isOpen ? ' open' : ''}" id="ll-${ch.id}">
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
    renderChapterOverview(data.chapters[0]);
  }
}

function toggleChapter(chId, btn) {
  const list = document.getElementById('ll-' + chId);
  if (!list) return;
  const isOpen = list.classList.contains('open');
  list.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
}

function selectLesson(chId, lessonId) {
  LS.chapterId = chId;
  LS.lessonId = lessonId;

  // Update sidebar active states
  document.querySelectorAll('.ls-lesson-btn').forEach(b => b.classList.remove('active'));
  const btns = document.querySelectorAll('.ls-lesson-btn');
  btns.forEach(b => {
    if (b.onclick && b.onclick.toString().includes(lessonId)) b.classList.add('active');
  });
  // Re-render sidebar to update active state properly
  renderLessonGrade(LS.grade);
}

function renderChapterOverview(chapter) {
  const content = document.getElementById('ls-content');
  const data = LESSON_DATA[LS.grade];
  const hasLessons = chapter.lessons && chapter.lessons.length > 0;
  content.innerHTML = `
    <div class="ls-overview">
      <div class="ls-overview-hero">
        <h3>${chapter.title}</h3>
        <p>${data.label} · ${hasLessons ? chapter.lessons.length + ' bài học' : 'Nội dung đang cập nhật'}</p>
      </div>
      ${hasLessons ? `
        <div class="ls-overview-lessons">
          ${chapter.lessons.map((l, i) => `
            <div class="ls-overview-lesson-card" onclick="selectLesson('${chapter.id}','${l.id}')">
              <div class="ls-ov-num">${i + 1}</div>
              <div class="ls-ov-info">
                <strong>${l.title}</strong>
                <span>🕐 ${l.readTime}</span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="ls-empty">
          <div class="ls-empty-icon">🚧</div>
          <h3>Đang cập nhật</h3>
          <p>Nội dung bài học cho chương này đang được biên soạn. Hãy quay lại sau!</p>
        </div>
      `}
    </div>`;
}

function renderLessonContent() {
  const data = LESSON_DATA[LS.grade];
  const chapter = data.chapters.find(c => c.id === LS.chapterId);
  const lesson = chapter?.lessons?.find(l => l.id === LS.lessonId);
  const content = document.getElementById('ls-content');
  if (!lesson) { renderChapterOverview(chapter || data.chapters[0]); return; }

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
