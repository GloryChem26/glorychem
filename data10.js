window.DATA_10 = {
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
              title: 'I. Các loại hạt cấu tạo nên nguyên tử',
              body: `
<p>Năm 1897, J. J. Thomson thực hiện thí nghiệm phóng điện qua không khí loãng đã phát hiện ra chùm tia phát ra từ cực âm — đó chính là các <strong>electron</strong>. Năm 1911, E. Rutherford thực hiện thí nghiệm bắn phá lá vàng mỏng bằng chùm hạt α, kết quả cho thấy nguyên tử có cấu tạo rỗng, ở tâm chứa một <strong>hạt nhân</strong> mang điện tích dương và có kích thước rất nhỏ so với kích thước nguyên tử.</p>
<p>Năm 1918, E. Rutherford phát hiện ra hạt <strong>proton</strong>. Năm 1932, J. Chadwick phát hiện ra hạt <strong>neutron</strong>.</p>
<ul>
  <li><strong>Hạt nhân</strong> (nucleus): ở tâm của nguyên tử, chứa các proton mang điện tích dương và neutron không mang điện.</li>
  <li><strong>Vỏ nguyên tử</strong>: chứa các electron mang điện tích âm, chuyển động rất nhanh xung quanh hạt nhân.</li>
</ul>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Hạt</th><th>Kí hiệu</th><th>Khối lượng (kg)</th><th>Khối lượng (amu)</th><th>Điện tích (C)</th><th>Điện tích tương đối</th></tr>
    <tr><td>Proton</td><td>p</td><td>1,672 × 10⁻²⁷</td><td>≈ 1</td><td>1,602 × 10⁻¹⁹</td><td>+1</td></tr>
    <tr><td>Neutron</td><td>n</td><td>1,675 × 10⁻²⁷</td><td>≈ 1</td><td>0</td><td>0</td></tr>
    <tr><td>Electron</td><td>e</td><td>9,109 × 10⁻³¹</td><td>≈ 0,00055</td><td>−1,602 × 10⁻¹⁹</td><td>−1</td></tr>
  </table>
</div>
<div class="ls-callout warn">
  <span class="ls-callout-icon">⚠️</span>
  <span>Trong nguyên tử, <strong>số proton bằng số electron</strong> nên nguyên tử trung hoà về điện. Khối lượng nguyên tử tập trung hầu hết ở hạt nhân.</span>
</div>`
            },
            {
              icon: '📐', iconClass: 'icon-teal',
              title: 'II. Kích thước và khối lượng của nguyên tử',
              body: `
<h4>1. Kích thước</h4>
<p>Kích thước của nguyên tử là khoảng không gian tạo bởi sự chuyển động của các electron. Nếu coi nguyên tử như một khối cầu thì đường kính của nó chỉ khoảng <strong>10⁻¹⁰ m</strong>. Nguyên tử hydrogen có bán kính khoảng <strong>53 pm</strong> (1 pm = 10⁻¹² m).</p>
<p>Hạt nhân nguyên tử có đường kính khoảng <strong>10⁻² pm</strong>, kích thước nhỏ hơn nhiều so với kích thước nguyên tử.</p>
<h4>2. Khối lượng</h4>
<p>Khối lượng nguyên tử rất nhỏ nên dùng đơn vị <strong>amu</strong> (atomic mass unit — đơn vị khối lượng nguyên tử):</p>
<div class="ls-formula"><span class="label">Định nghĩa</span>1 amu = 1/12 khối lượng nguyên tử carbon-12 = 1,661 × 10⁻²⁷ kg</div>
<p>Ví dụ: Nguyên tử oxygen có khối lượng 2,656 × 10⁻²⁶ kg → khối lượng nguyên tử oxygen ≈ 15,990 amu.</p>
<div class="ls-formula"><span class="label">Số hiệu nguyên tử Z và Số khối A</span>
Z = số đơn vị điện tích hạt nhân = số proton = số electron (nguyên tử trung hòa)
A = Z + N  (N = số neutron)  →  N = A − Z</div>`
            }
          ],
          quiz: [
            {
              q: 'Thí nghiệm nào đã phát hiện ra hạt nhân nguyên tử?',
              opts: ['Thí nghiệm ống tia âm cực của Thomson', 'Thí nghiệm bắn phá lá vàng của Rutherford', 'Thí nghiệm bắn phá beryllium của Chadwick', 'Thí nghiệm quang điện của Einstein'],
              ans: 1,
              explain: 'Năm 1911, Rutherford dùng chùm hạt α bắn phá lá vàng mỏng. Hầu hết hạt α xuyên qua, một số ít bị lệch hướng hoặc bật ngược lại, chứng tỏ nguyên tử có hạt nhân nhỏ, đặc, mang điện dương ở tâm.'
            },
            {
              q: 'Nguyên tử ²⁷₁₃Al có số proton, neutron, electron lần lượt là:',
              opts: ['13, 14, 13', '13, 27, 13', '27, 13, 27', '14, 13, 14'],
              ans: 0,
              explain: 'Z = 13 → proton = electron = 13. N = A − Z = 27 − 13 = 14 neutron.'
            },
            {
              q: 'Khối lượng nguyên tử tập trung chủ yếu ở đâu?',
              opts: ['Lớp vỏ electron', 'Hạt nhân (proton + neutron)', 'Phân bố đều trong nguyên tử', 'Chủ yếu ở electron'],
              ans: 1,
              explain: 'Khối lượng electron rất nhỏ (≈ 0,00055 amu) so với proton và neutron (≈ 1 amu mỗi hạt), nên khối lượng nguyên tử tập trung hầu hết ở hạt nhân.'
            },
            {
              q: 'Đơn vị khối lượng nguyên tử (amu) được định nghĩa là:',
              opts: ['Khối lượng của 1 proton', '1/12 khối lượng nguyên tử ¹²C', 'Khối lượng của 1 electron', '1/16 khối lượng nguyên tử oxygen'],
              ans: 1,
              explain: '1 amu = 1/12 khối lượng nguyên tử carbon-12 = 1,661 × 10⁻²⁷ kg.'
            },
            {
              q: 'Nguyên tử trung hoà về điện vì:',
              opts: ['Số neutron bằng số proton', 'Số proton bằng số electron', 'Không có hạt mang điện', 'Số proton bằng số neutron bằng số electron'],
              ans: 1,
              explain: 'Proton mang điện +1 và electron mang điện −1. Vì số proton = số electron nên tổng điện tích = 0, nguyên tử trung hoà điện.'
            }
          ]
        },
        {
          id: 'l10-1-2',
          title: 'Bài 2: Nguyên tố hoá học',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '7 phút',
          sections: [
            {
              icon: '🏷️', iconClass: 'icon-teal',
              title: 'I. Nguyên tố hoá học',
              body: `
<p><strong>Nguyên tố hoá học</strong> là tập hợp các nguyên tử có cùng số đơn vị điện tích hạt nhân. Trong nguyên tử, số đơn vị điện tích hạt nhân bằng số electron ở vỏ nguyên tử. Các electron trong nguyên tử quyết định tính chất hoá học của nguyên tử, nên các nguyên tử của cùng một nguyên tố hoá học có tính chất hoá học giống nhau.</p>
<p>Ví dụ: Tất cả nguyên tử có cùng số đơn vị điện tích hạt nhân là 6 đều thuộc nguyên tố carbon dù chúng có thể có số neutron khác nhau.</p>
<p>Hiện nay, con người đã biết <strong>118 nguyên tố hoá học</strong>, trong đó có 94 nguyên tố tồn tại trong tự nhiên và 24 nguyên tố được tạo ra trong phòng thí nghiệm.</p>
<h4>Kí hiệu nguyên tử</h4>
<div class="ls-formula"><span class="label">Kí hiệu</span>ᴬ_Z X     (X là kí hiệu nguyên tố; A ở trên, Z ở dưới bên trái)
Ví dụ: ⁴He → Z = 2 (helium), A = 4, N = 4 − 2 = 2</div>`
            },
            {
              icon: '🔄', iconClass: 'icon-purple',
              title: 'II. Đồng vị',
              body: `
<p><strong>Đồng vị</strong> là những nguyên tử có cùng số đơn vị điện tích hạt nhân (cùng số proton) nhưng có số neutron khác nhau. Những nguyên tử như thế gọi là các đồng vị (cùng vị trí trong bảng tuần hoàn các nguyên tố hoá học) của một nguyên tố hoá học.</p>
<p>Các đồng vị khác nhau về số neutron nên khác nhau về khối lượng của hạt nhân nguyên tử, đồng thời khác nhau về một số tính chất vật lí.</p>
<div class="ls-formula"><span class="label">Ví dụ — Đồng vị của Hydrogen</span>
¹₁H  (Protium)   → N = 0   (phổ biến nhất)
²₁H  (Deuterium) → N = 1   (bền)
³₁H  (Tritium)   → N = 2   (phóng xạ)</div>
<div class="ls-formula"><span class="label">Ví dụ — Đồng vị của Chlorine</span>
³⁵₁₇Cl → chiếm 75,77%
³⁷₁₇Cl → chiếm 24,23%</div>`
            },
            {
              icon: '📊', iconClass: 'icon-amber',
              title: 'III. Nguyên tử khối và nguyên tử khối trung bình',
              body: `
<h4>1. Nguyên tử khối</h4>
<p>Nguyên tử khối là khối lượng tương đối của nguyên tử. Nguyên tử khối của một nguyên tử cho biết khối lượng của nguyên tử đó nặng gấp bao nhiêu lần đơn vị khối lượng nguyên tử.</p>
<p>Ví dụ: Nguyên tử của nguyên tố potassium (K) có Z = 19; số neutron = 20 nên nguyên tử khối của K là A = 19 + 20 = 39.</p>
<h4>2. Nguyên tử khối trung bình</h4>
<p>Hầu hết các nguyên tố trong tự nhiên là hỗn hợp của nhiều đồng vị, mỗi đồng vị có tỉ lệ phần trăm số nguyên tử xác định. Nguyên tử khối của một nguyên tố là nguyên tử khối trung bình (kí hiệu là Ā) của hỗn hợp các đồng vị của nguyên tố đó.</p>
<div class="ls-formula"><span class="label">Công thức</span>Ā = (a₁·A₁ + a₂·A₂ + ... + aₙ·Aₙ) / 100
Trong đó: aᵢ là % đồng vị i, Aᵢ là số khối đồng vị i</div>
<div class="ls-formula"><span class="label">Ví dụ — Chlorine</span>
Ā = (75,77 × 35 + 24,23 × 37) / 100 = 35,48 ≈ 35,5</div>`
            }
          ],
          quiz: [
            {
              q: 'Nguyên tố hoá học là tập hợp những nguyên tử có cùng:',
              opts: ['Số neutron', 'Số khối', 'Số đơn vị điện tích hạt nhân (số proton)', 'Nguyên tử khối'],
              ans: 2,
              explain: 'Nguyên tố hoá học là tập hợp các nguyên tử có cùng số đơn vị điện tích hạt nhân (số proton). Đây là đặc trưng duy nhất xác định loại nguyên tố.'
            },
            {
              q: 'Chlorine có 2 đồng vị: ³⁵Cl (75,77%) và ³⁷Cl (24,23%). Nguyên tử khối trung bình của Cl là:',
              opts: ['35,48', '36,00', '35,50', '36,48'],
              ans: 0,
              explain: 'Ā = (75,77 × 35 + 24,23 × 37) / 100 = (2651,95 + 896,51) / 100 = 3548,46 / 100 ≈ 35,48.'
            },
            {
              q: 'Các đồng vị ¹H, ²H, ³H của nguyên tố hydrogen có đặc điểm chung nào?',
              opts: ['Cùng số neutron', 'Cùng số khối', 'Cùng số proton (Z = 1)', 'Cùng khối lượng nguyên tử'],
              ans: 2,
              explain: 'Các đồng vị của cùng một nguyên tố đều có cùng số proton (Z = 1 đối với hydrogen). Chúng khác nhau về số neutron: 0, 1, 2.'
            },
            {
              q: 'Nguyên tử ⁵⁶₂₆Fe có số proton, neutron và electron lần lượt là:',
              opts: ['26, 30, 26', '26, 56, 26', '30, 26, 30', '56, 26, 56'],
              ans: 0,
              explain: 'Z = 26 → proton = 26, electron = 26. N = A − Z = 56 − 26 = 30 neutron.'
            },
            {
              q: 'Boron có nguyên tử khối trung bình = 10,81. Hai đồng vị là ¹⁰B và ¹¹B. Phần trăm đồng vị ¹⁰B xấp xỉ:',
              opts: ['19%', '81%', '50%', '10%'],
              ans: 0,
              explain: 'Gọi x% là %¹⁰B → (10x + 11(100−x))/100 = 10,81 → 10x + 1100 − 11x = 1081 → x = 19. Vậy ¹⁰B chiếm 19%.'
            }
          ]
        },
        {
          id: 'l10-1-3',
          title: 'Bài 3: Cấu trúc lớp vỏ electron nguyên tử',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '12 phút',
          sections: [
            {
              icon: '🌀', iconClass: 'icon-blue',
              title: 'I. Chuyển động của electron trong nguyên tử — Orbital nguyên tử',
              body: `
<p>Theo mô hình hiện đại, trong nguyên tử, electron chuyển động rất nhanh, không theo quỹ đạo xác định. Tuy nhiên, người ta có thể xác định được vùng không gian xung quanh hạt nhân mà ở đó xác suất có mặt (xác suất tìm thấy) electron là lớn nhất (khoảng 90%). Vùng không gian xung quanh hạt nhân tìm thấy electron có thể hình dung như một đám mây electron, được gọi là <strong>orbital nguyên tử</strong> (kí hiệu là AO).</p>
<ul>
  <li><strong>Orbital s</strong>: có dạng hình cầu.</li>
  <li><strong>Orbital p</strong>: có dạng hình số 8 nổi, gồm AO pₓ, AO p_y, AO p_z định hướng theo ba trục x, y, z.</li>
</ul>
<p>Mỗi AO được biểu diễn bằng một ô vuông, gọi là <strong>ô orbital</strong>. Trong 1 orbital chỉ chứa tối đa 2 electron có chiều tự quay ngược nhau (<em>nguyên lí loại trừ Pauli</em>).</p>
<div class="ls-callout info">
  <span class="ls-callout-icon">📌</span>
  <span>1 electron độc thân biểu diễn bằng 1 mũi tên đi lên (↑); 2 electron được biểu diễn bằng 2 mũi tên ngược chiều nhau (↑↓).</span>
</div>`
            },
            {
              icon: '📋', iconClass: 'icon-teal',
              title: 'II. Lớp và phân lớp electron',
              body: `
<h4>1. Lớp electron</h4>
<p>Trong nguyên tử, các electron sắp xếp thành từng lớp và phân lớp theo năng lượng từ thấp đến cao. Những electron ở lớp gần hạt nhân bị hút mạnh hơn về phía hạt nhân, vì thế có năng lượng thấp hơn so với những electron ở lớp xa hạt nhân. Người ta đánh số thứ tự lớp từ trong ra ngoài:</p>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Số thứ tự lớp (n)</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr>
    <tr><td>Tên lớp</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td></tr>
  </table>
</div>
<h4>2. Phân lớp electron</h4>
<p>Các phân lớp trong mỗi lớp electron được kí hiệu bằng các chữ cái viết thường, theo thứ tự: s, p, d, f. Số phân lớp trong mỗi lớp bằng số thứ tự của lớp (n ≤ 4).</p>
<ul>
  <li>Lớp K (n = 1): có 1 phân lớp → 1s</li>
  <li>Lớp L (n = 2): có 2 phân lớp → 2s, 2p</li>
  <li>Lớp M (n = 3): có 3 phân lớp → 3s, 3p, 3d</li>
  <li>Lớp N (n = 4): có 4 phân lớp → 4s, 4p, 4d, 4f</li>
</ul>
<h4>3. Số lượng orbital trong một phân lớp, trong một lớp</h4>
<div class="ls-callout info">
  <span class="ls-callout-icon">📌</span>
  <span>Phân lớp s: 1 AO | Phân lớp p: 3 AO | Phân lớp d: 5 AO | Phân lớp f: 7 AO. Trong lớp electron thứ n có <strong>n² AO</strong> (n ≤ 4).</span>
</div>
<p>Số electron tối đa trong một phân lớp: s = 2, p = 6, d = 10, f = 14. Số electron tối đa trong lớp thứ n là <strong>2n²</strong> electron.</p>`
            },
            {
              icon: '✍️', iconClass: 'icon-amber',
              title: 'III. Cấu hình electron của nguyên tử',
              body: `
<p>Cấu hình electron của nguyên tử biểu diễn sự phân bố electron trên các phân lớp thuộc các lớp khác nhau. Các electron trong nguyên tử ở trạng thái cơ bản lần lượt chiếm các orbital có mức năng lượng từ thấp đến cao (<em>nguyên lí vững bền</em>). Trong cùng một phân lớp, các electron sẽ phân bố trên các orbital sao cho số electron độc thân là tối đa và các electron này có chiều tự quay giống nhau (<em>quy tắc Hund</em>).</p>
<h4>Các bước viết cấu hình electron</h4>
<p>Bước 1: Xác định số electron trong nguyên tử. Bước 2: Viết thứ tự các lớp và phân lớp electron theo chiều tăng của năng lượng: 1s 2s 2p 3s 3p 4s 3d 4p... Bước 3: Điền các electron vào các phân lớp theo nguyên lí vững bền cho đến electron cuối cùng.</p>
<div class="ls-formula"><span class="label">Ví dụ — O (Z = 8)</span>
Điền: 1s²2s²2p⁴
Cấu hình: 1s²2s²2p⁴ hoặc [He]2s²2p⁴ hoặc (2, 6)</div>
<div class="ls-formula"><span class="label">Ví dụ — K (Z = 19)</span>
Điền: 1s²2s²2p⁶3s²3p⁶4s¹
Cấu hình: 1s²2s²2p⁶3s²3p⁶4s¹ hoặc [Ar]4s¹ hoặc (2, 8, 8, 1)</div>
<h4>Đặc điểm của lớp electron ngoài cùng</h4>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Số electron lớp ngoài cùng</th><th>1, 2, 3</th><th>4</th><th>5, 6, 7</th><th>8 (He: 2)</th></tr>
    <tr><td>Loại nguyên tố</td><td>Kim loại (thường)</td><td>Kim loại hoặc phi kim</td><td>Phi kim (thường)</td><td>Khí hiếm</td></tr>
  </table>
</div>`
            }
          ],
          quiz: [
            {
              q: 'Trong lớp electron thứ 3 (lớp M), số orbital nguyên tử tối đa là:',
              opts: ['4', '9', '16', '3'],
              ans: 1,
              explain: 'Lớp thứ n có n² orbital. Lớp M có n = 3 → 3² = 9 orbital (1 orbital 3s + 3 orbital 3p + 5 orbital 3d).'
            },
            {
              q: 'Cấu hình electron của nguyên tử Ca (Z = 20) là:',
              opts: ['1s²2s²2p⁶3s²3p⁶4s²', '1s²2s²2p⁶3s²3p⁸', '1s²2s²2p⁶3s²3p⁶3d²', '1s²2s²2p⁶3s²3d⁸4s²'],
              ans: 0,
              explain: 'Ca có 20e: 1s²(2) 2s²(4) 2p⁶(10) 3s²(12) 3p⁶(18) 4s²(20). Cấu hình: 1s²2s²2p⁶3s²3p⁶4s².'
            },
            {
              q: 'Nguyên tử có cấu hình electron lớp ngoài cùng là 3s²3p⁵ thuộc loại nguyên tố nào?',
              opts: ['Kim loại kiềm', 'Kim loại kiềm thổ', 'Phi kim (halogen)', 'Khí hiếm'],
              ans: 2,
              explain: 'Lớp ngoài cùng có 7 electron (3s²3p⁵). Nguyên tử có 5, 6, 7 electron lớp ngoài cùng thường là phi kim. Đây là Cl (Z = 17).'
            },
            {
              q: 'Theo quy tắc Hund, trong phân lớp 2p có 3 electron, cách phân bố đúng là:',
              opts: ['Cả 3 electron vào 1 orbital', '2 electron vào 1 orbital, 1 electron vào orbital khác', '3 electron, mỗi electron vào 1 orbital, spin cùng chiều', 'Không thể xác định'],
              ans: 2,
              explain: 'Quy tắc Hund: Trong cùng một phân lớp, electron điền vào các orbital trống trước, rồi ghép đôi sau; các electron độc thân có chiều tự quay giống nhau.'
            },
            {
              q: 'Nguyên tử X có cấu hình electron 1s²2s²2p⁶3s²3p⁶. Đây là:',
              opts: ['Kim loại kiềm', 'Phi kim', 'Khí hiếm', 'Kim loại chuyển tiếp'],
              ans: 2,
              explain: 'Lớp ngoài cùng 3s²3p⁶ có 8 electron → cấu hình bền của khí hiếm. Đây là Argon (Ar, Z = 18).'
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
              title: 'Hệ thống hoá kiến thức chương 1',
              body: `
<h4>1. Thành phần nguyên tử</h4>
<ul>
  <li>Nguyên tử gồm <strong>hạt nhân</strong> (proton, neutron) và <strong>vỏ electron</strong></li>
  <li>Proton: điện tích +1, khối lượng ≈ 1 amu</li>
  <li>Neutron: không mang điện, khối lượng ≈ 1 amu</li>
  <li>Electron: điện tích −1, khối lượng ≈ 0,00055 amu (≈ 0)</li>
  <li>Nguyên tử trung hoà điện: số proton = số electron</li>
</ul>
<h4>2. Số hiệu nguyên tử Z và Số khối A</h4>
<div class="ls-formula">Z = số proton = số electron (nguyên tử trung hòa)
A = Z + N  →  N = A − Z
Kí hiệu nguyên tử: ᴬ_Z X</div>
<h4>3. Nguyên tố hoá học và đồng vị</h4>
<ul>
  <li>Nguyên tố hoá học: tập hợp các nguyên tử cùng Z</li>
  <li>Đồng vị: cùng Z, khác N → khác A</li>
  <li>Nguyên tử khối trung bình: Ā = Σ(aᵢ × Aᵢ) / 100</li>
</ul>
<h4>4. Cấu hình electron</h4>
<ul>
  <li>Thứ tự phân lớp theo năng lượng: 1s 2s 2p 3s 3p 4s 3d 4p...</li>
  <li>Số e tối đa: s(2), p(6), d(10), f(14); lớp thứ n chứa tối đa 2n² electron</li>
  <li>Nguyên lí vững bền (Aufbau), nguyên lí Pauli, quy tắc Hund</li>
</ul>
<div class="ls-callout success">
  <span class="ls-callout-icon">🎯</span>
  <span>Electron lớp ngoài cùng quyết định tính chất hoá học: 1-3e (kim loại), 5-7e (phi kim), 8e hoặc He 2e (khí hiếm).</span>
</div>`
            }
          ],
          quiz: [
            {
              q: 'Nguyên tử ³²S có số proton, neutron, electron lần lượt là:',
              opts: ['16, 16, 16', '16, 32, 16', '32, 16, 32', '16, 14, 16'],
              ans: 0,
              explain: 'S: Z = 16 → proton = 16, electron = 16. N = A − Z = 32 − 16 = 16 neutron.'
            },
            {
              q: 'Cấu hình electron của Na (Z = 11) là:',
              opts: ['1s²2s²2p⁶3s¹', '1s²2s²2p⁵3s²', '1s²2s²2p⁶3p¹', '1s²2s²2p⁷'],
              ans: 0,
              explain: 'Na có 11e. Điền: 1s²(2) 2s²(4) 2p⁶(10) 3s¹(11). Cấu hình: 1s²2s²2p⁶3s¹.'
            },
            {
              q: 'Silicon có 2 đồng vị bền là ²⁸Si (92,23%) và ³⁰Si (3,10%), ngoài ra còn ²⁹Si (4,67%). Nguyên tử khối trung bình của Si gần bằng:',
              opts: ['28,09', '29,00', '28,50', '28,00'],
              ans: 0,
              explain: 'Ā = (92,23×28 + 4,67×29 + 3,10×30)/100 = (2582,44 + 135,43 + 93)/100 ≈ 28,11 ≈ 28,09.'
            },
            {
              q: 'Ion X²⁺ có cấu hình electron 1s²2s²2p⁶. Nguyên tử X có tổng số electron là:',
              opts: ['10', '12', '8', '11'],
              ans: 1,
              explain: 'X²⁺ mất 2e so với X trung hòa. X²⁺ có 10e → X có 10 + 2 = 12e. X là Magnesium (Mg).'
            },
            {
              q: 'Nguyên tử nào dưới đây có số neutron bằng số proton?',
              opts: ['⁴⁰₁₈Ar', '¹²₆C', '³⁵₁₇Cl', '²³₁₁Na'],
              ans: 1,
              explain: '¹²₆C: Z = 6, N = 12 − 6 = 6. Số neutron = số proton = 6. Các nguyên tử còn lại: Ar(22n ≠ 18p), Cl(18n ≠ 17p), Na(12n ≠ 11p).'
            }
          ]
        }
      ]
    },
    {
      id: 'c10-2',
      title: 'Chương 2: Bảng tuần hoàn các nguyên tố hoá học và định luật tuần hoàn',
      lessons: [
        {
          id: 'l10-2-1',
          title: 'Bài 5: Cấu tạo của bảng tuần hoàn các nguyên tố hoá học',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '10 phút',
          sections: [
            {
              icon: '📜', iconClass: 'icon-blue',
              title: 'I. Lịch sử phát minh bảng tuần hoàn',
              body: `
<p>Năm 1869, D. I. Mendeleev (người Nga) và J. L. Meyer (người Đức) đều sắp xếp các nguyên tố theo chiều tăng khối lượng nguyên tử vào các hàng và cột. Mendeleev đã dành chỗ trống cho các nguyên tố khi đó chưa được tìm ra và dự đoán tính chất của chúng.</p>
<p>Hiện nay, với những hiểu biết về cấu tạo nguyên tử, bảng tuần hoàn các nguyên tố hoá học hiện đại sắp xếp <strong>118 nguyên tố theo chiều tăng của điện tích hạt nhân nguyên tử</strong>.</p>`
            },
            {
              icon: '📐', iconClass: 'icon-teal',
              title: 'II. Nguyên tắc sắp xếp và cấu tạo của bảng tuần hoàn',
              body: `
<p>Bảng tuần hoàn chứa 118 nguyên tố được sắp xếp theo ba nguyên tắc:</p>
<ul>
  <li>Các nguyên tố được sắp xếp theo chiều tăng dần <strong>điện tích hạt nhân nguyên tử</strong>.</li>
  <li>Các nguyên tố có cùng số lớp electron trong nguyên tử được xếp thành <strong>một hàng</strong> (chu kì).</li>
  <li>Các nguyên tố có cùng số <strong>electron hoá trị</strong> trong nguyên tử được xếp thành <strong>một cột</strong> (nhóm).</li>
</ul>
<h4>1. Ô nguyên tố</h4>
<p>Trong bảng tuần hoàn, mỗi nguyên tố được xếp vào một ô, gọi là ô nguyên tố. Số thứ tự của ô là số hiệu nguyên tử của nguyên tố đó. Mỗi ô nguyên tố có các thông tin: số hiệu nguyên tử, kí hiệu nguyên tố, tên nguyên tố, nguyên tử khối trung bình.</p>
<h4>2. Chu kì</h4>
<p>Chu kì là dãy các nguyên tố mà nguyên tử của chúng có cùng số lớp electron, được xếp theo chiều điện tích hạt nhân tăng dần. Số thứ tự của chu kì bằng số lớp electron của nguyên tử các nguyên tố trong chu kì. Bảng tuần hoàn hiện nay có <strong>7 chu kì</strong>.</p>
<ul>
  <li>Chu kì nhỏ: chu kì 1 (2 nguyên tố: H, He), chu kì 2 (8 nguyên tố: Li → Ne), chu kì 3 (8 nguyên tố: Na → Ar).</li>
  <li>Chu kì lớn: chu kì 4 (18 nt: K → Kr), chu kì 5 (18 nt: Rb → Xe), chu kì 6 (32 nt: Cs → Rn), chu kì 7 (32 nt: Fr → Og).</li>
</ul>
<h4>3. Nhóm nguyên tố</h4>
<p>Nhóm nguyên tố gồm các nguyên tố mà nguyên tử của chúng có cấu hình electron tương tự nhau, do đó có tính chất hoá học gần giống nhau và được xếp thành một cột. Bảng tuần hoàn hiện nay có <strong>18 cột</strong>, chia thành 8 nhóm A (IA đến VIIIA) và 8 nhóm B (IB đến VIIIB).</p>
<p>Nguyên tử các nguyên tố trong cùng một nhóm A có số electron hoá trị bằng nhau và bằng số thứ tự của nhóm (trừ He). Nhóm A gồm các nguyên tố s và p (trừ He). Nhóm B gồm các nguyên tố d và f (kim loại chuyển tiếp).</p>
<h4>4. Phân loại nguyên tố</h4>
<p>Theo cấu hình electron: nguyên tố s, p, d, f. Theo tính chất hoá học: nhóm IA, IIA, IIIA là kim loại (trừ H và B); nhóm VA, VIA, VIIA thường là phi kim; nhóm VIIIA là khí hiếm; nhóm B là kim loại chuyển tiếp.</p>`
            }
          ],
          quiz: [
            {
              q: 'Nguyên tắc nào SAI khi sắp xếp nguyên tố vào bảng tuần hoàn?',
              opts: [
                'Các nguyên tố xếp theo chiều tăng dần của điện tích hạt nhân',
                'Các nguyên tố có cùng số lớp electron xếp thành một hàng',
                'Các nguyên tố có cùng số electron hoá trị xếp thành một cột',
                'Các nguyên tố xếp theo chiều tăng dần nguyên tử khối'
              ],
              ans: 3,
              explain: 'Bảng tuần hoàn hiện đại sắp xếp theo chiều tăng của ĐIỆN TÍCH HẠT NHÂN (số proton), không phải theo nguyên tử khối như bảng của Mendeleev năm 1869.'
            },
            {
              q: 'Nguyên tố A thuộc chu kì 3, nhóm IIA. Số electron lớp ngoài cùng và số lớp electron của A lần lượt là:',
              opts: ['3 và 2', '2 và 3', '2 và 2', '3 và 3'],
              ans: 1,
              explain: 'Nhóm IIA → số electron hoá trị = 2 (số electron lớp ngoài cùng = 2). Chu kì 3 → số lớp electron = 3. Đây là Magnesium (Mg, Z = 12).'
            },
            {
              q: 'Bảng tuần hoàn hiện đại có bao nhiêu chu kì nhỏ?',
              opts: ['2', '3', '4', '7'],
              ans: 1,
              explain: 'Chu kì nhỏ là chu kì 1, 2, 3. Chu kì lớn là chu kì 4, 5, 6, 7.'
            },
            {
              q: 'Nguyên tố nào thuộc nhóm VIIA (nhóm halogen)?',
              opts: ['Oxygen (O)', 'Sulfur (S)', 'Chlorine (Cl)', 'Nitrogen (N)'],
              ans: 2,
              explain: 'Nhóm VIIA (halogen) gồm F, Cl, Br, I, At — các nguyên tố có 7 electron hoá trị.'
            },
            {
              q: 'Nguyên tố ₁₉K (potassium) thuộc chu kì nào và nhóm nào?',
              opts: ['Chu kì 3, nhóm IA', 'Chu kì 4, nhóm IA', 'Chu kì 4, nhóm IIA', 'Chu kì 3, nhóm IIA'],
              ans: 1,
              explain: 'K: cấu hình 1s²2s²2p⁶3s²3p⁶4s¹. Electron cuối điền vào lớp 4 → chu kì 4. 1 electron hoá trị ở phân lớp s → nhóm IA.'
            }
          ]
        },
        {
          id: 'l10-2-2',
          title: 'Bài 6: Xu hướng biến đổi một số tính chất của nguyên tử các nguyên tố trong một chu kì và trong một nhóm',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '12 phút',
          sections: [
            {
              icon: '📏', iconClass: 'icon-purple',
              title: 'I. Bán kính nguyên tử',
              body: `
<p>Bán kính nguyên tử phụ thuộc vào lực hút giữa hạt nhân với các electron lớp ngoài cùng. Bán kính giảm là do lực hút tăng và ngược lại, bán kính tăng là do lực hút giảm.</p>
<p>Xu hướng biến đổi bán kính nguyên tử:</p>
<ul>
  <li>Trong một <strong>chu kì</strong>, theo chiều tăng dần của điện tích hạt nhân, <strong>bán kính nguyên tử giảm</strong>.</li>
  <li>Trong một <strong>nhóm A</strong>, theo chiều tăng dần của điện tích hạt nhân, <strong>bán kính nguyên tử tăng</strong>.</li>
</ul>`
            },
            {
              icon: '⚡', iconClass: 'icon-amber',
              title: 'II. Năng lượng ion hoá thứ nhất',
              body: `
<p>Năng lượng ion hoá thứ nhất của nguyên tử là năng lượng tối thiểu cần thiết để tách electron thứ nhất ra khỏi nguyên tử ở thể khí, ở trạng thái cơ bản: X(g) → X⁺(g) + e. Năng lượng ion hoá thứ nhất kí hiệu là I₁, đơn vị là kJ/mol.</p>
<ul>
  <li>Trong một <strong>chu kì</strong>, năng lượng ion hoá thứ nhất có xu hướng <strong>tăng</strong> theo chiều tăng dần của điện tích hạt nhân.</li>
  <li>Trong một <strong>nhóm A</strong>, năng lượng ion hoá thứ nhất có xu hướng <strong>giảm</strong> theo chiều tăng dần của điện tích hạt nhân.</li>
</ul>`
            },
            {
              icon: '🧲', iconClass: 'icon-blue',
              title: 'III. Độ âm điện',
              body: `
<p>Độ âm điện của nguyên tử (χ) là đại lượng đặc trưng cho khả năng hút electron của nguyên tử một nguyên tố hoá học khi tạo thành liên kết hoá học. Nguyên tử có độ âm điện nhỏ dễ nhường electron, nguyên tử có độ âm điện lớn dễ nhận electron. Giá trị độ âm điện theo thang Pauling (1932).</p>
<ul>
  <li>Trong một <strong>chu kì</strong>, <strong>độ âm điện tăng</strong> từ trái qua phải.</li>
  <li>Trong một <strong>nhóm A</strong>, <strong>độ âm điện giảm</strong> từ trên xuống dưới.</li>
</ul>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Trong một chu kì, khi số electron lớp ngoài cùng tăng, điện tích hạt nhân tăng thì lực hút giữa hạt nhân với các electron lớp ngoài cùng tăng, dẫn đến khả năng hút electron tăng nên độ âm điện tăng.</span>
</div>`
            },
            {
              icon: '⚗️', iconClass: 'icon-red',
              title: 'IV. Tính kim loại và tính phi kim',
              body: `
<p><strong>Tính kim loại</strong> là tính chất của một nguyên tố mà nguyên tử của nó dễ nhường electron để trở thành ion dương. Nguyên tử của nguyên tố nào càng dễ nhường electron để trở thành ion dương, tính kim loại của nguyên tố đó càng mạnh.</p>
<p><strong>Tính phi kim</strong> là tính chất của một nguyên tố mà nguyên tử của nó dễ nhận electron để trở thành ion âm. Nguyên tử của nguyên tố nào càng dễ nhận electron để trở thành ion âm, tính phi kim của nguyên tố đó càng mạnh.</p>
<ul>
  <li>Trong một <strong>chu kì</strong>, theo chiều tăng dần của điện tích hạt nhân, <strong>tính kim loại giảm dần và tính phi kim tăng dần</strong>.</li>
  <li>Trong một <strong>nhóm A</strong>, theo chiều tăng dần của điện tích hạt nhân, <strong>tính kim loại tăng dần và tính phi kim giảm dần</strong>.</li>
</ul>`
            }
          ],
          quiz: [
            {
              q: 'Trong một chu kì, theo chiều tăng dần của điện tích hạt nhân, bán kính nguyên tử biến đổi như thế nào?',
              opts: ['Tăng dần', 'Giảm dần', 'Không thay đổi', 'Tăng rồi giảm'],
              ans: 1,
              explain: 'Trong một chu kì, khi Z tăng, số lớp electron giữ nguyên nhưng điện tích hạt nhân tăng → lực hút với electron lớp ngoài cùng tăng → bán kính nguyên tử giảm.'
            },
            {
              q: 'Trong nhóm IA, từ Li đến Cs, tính kim loại biến đổi theo chiều nào?',
              opts: ['Giảm dần', 'Tăng dần', 'Không đổi', 'Tăng rồi giảm'],
              ans: 1,
              explain: 'Trong một nhóm A, khi Z tăng, số lớp electron tăng → bán kính tăng → lực hút với electron lớp ngoài cùng giảm → dễ nhường electron hơn → tính kim loại tăng.'
            },
            {
              q: 'Sắp xếp các nguyên tố Na, Mg, Al, Si theo chiều tăng dần của độ âm điện?',
              opts: ['Na < Mg < Al < Si', 'Si < Al < Mg < Na', 'Al < Na < Si < Mg', 'Mg < Al < Na < Si'],
              ans: 0,
              explain: 'Na, Mg, Al, Si thuộc chu kì 3. Trong cùng chu kì, độ âm điện tăng theo chiều tăng Z → Na (0,93) < Mg (1,31) < Al (1,61) < Si (1,90).'
            },
            {
              q: 'Nguyên tố nào có năng lượng ion hoá thứ nhất lớn nhất trong số F, O, N, C?',
              opts: ['C', 'N', 'O', 'F'],
              ans: 3,
              explain: 'F có điện tích hạt nhân lớn nhất (Z = 9) trong số các nguyên tố đã cho → lực hút electron mạnh nhất → năng lượng để tách electron lớn nhất. (Lưu ý: N đôi khi bất thường hơn O do phân lớp 2p nửa đầy bền).'
            },
            {
              q: 'Cho các nguyên tố: K (Z=19), Ca (Z=20), Br (Z=35), Se (Z=34). Nguyên tố có tính phi kim mạnh nhất là:',
              opts: ['K', 'Ca', 'Br', 'Se'],
              ans: 2,
              explain: 'K và Ca là kim loại. Br (nhóm VIIA, chu kì 4) và Se (nhóm VIA, chu kì 4) là phi kim. Trong cùng chu kì, Br (nhóm VIIA) có số electron hoá trị nhiều hơn Se (nhóm VIA) → tính phi kim mạnh hơn.'
            }
          ]
        },
        {
          id: 'l10-2-3',
          title: 'Bài 7: Xu hướng biến đổi thành phần và một số tính chất của hợp chất trong một chu kì',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '8 phút',
          sections: [
            {
              icon: '🧪', iconClass: 'icon-red',
              title: 'I. Thành phần của các oxide và hydroxide',
              body: `
<p>Hoá trị cao nhất của các nguyên tố nhóm A trong hợp chất với oxygen tăng từ I đến VII khi đi từ trái qua phải trong một chu kì (trừ chu kì 1 và nguyên tố fluorine ở chu kì 2), do đó thành phần của các oxide và hydroxide có sự lặp lại theo chu kì.</p>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Nhóm</th><th>IA</th><th>IIA</th><th>IIIA</th><th>IVA</th><th>VA</th><th>VIA</th><th>VIIA</th></tr>
    <tr><td>Oxide (chu kì 3)</td><td>Na₂O</td><td>MgO</td><td>Al₂O₃</td><td>SiO₂</td><td>P₂O₅</td><td>SO₃</td><td>Cl₂O₇</td></tr>
    <tr><td>Hydroxide (chu kì 3)</td><td>NaOH</td><td>Mg(OH)₂</td><td>Al(OH)₃</td><td>H₂SiO₃</td><td>H₃PO₄</td><td>H₂SO₄</td><td>HClO₄</td></tr>
  </table>
</div>`
            },
            {
              icon: '⚡', iconClass: 'icon-teal',
              title: 'II. Tính chất của oxide và hydroxide',
              body: `
<p>Khi tan vào nước, các oxide kim loại điển hình (nhóm IA) tạo hydroxide có tính base mạnh, hydroxide ứng với hoá trị cao nhất của các nguyên tố nhóm VIIA (trừ fluorine) thể hiện tính acid mạnh.</p>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Hydroxide</th><th>NaOH</th><th>Mg(OH)₂</th><th>Al(OH)₃</th><th>H₂SiO₃</th><th>H₃PO₄</th><th>H₂SO₄</th><th>HClO₄</th></tr>
    <tr><td>Tính chất</td><td>Base mạnh</td><td>Base yếu</td><td>Hydroxide lưỡng tính</td><td>Acid yếu</td><td>Acid trung bình</td><td>Acid mạnh</td><td>Acid rất mạnh</td></tr>
  </table>
</div>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Trong một chu kì, theo chiều tăng dần của Z: <strong>tính base của oxide và hydroxide giảm dần</strong>, đồng thời <strong>tính acid tăng dần</strong>.</span>
</div>`
            }
          ],
          quiz: [
            {
              q: 'Trong chu kì 3, hydroxide nào có tính base mạnh nhất?',
              opts: ['Mg(OH)₂', 'Al(OH)₃', 'NaOH', 'H₂SiO₃'],
              ans: 2,
              explain: 'Trong chu kì 3, theo chiều Z tăng tính base giảm. Na (nhóm IA) có tính kim loại mạnh nhất → NaOH có tính base mạnh nhất trong chu kì 3.'
            },
            {
              q: 'Công thức oxide cao nhất của Sulfur (S, nhóm VIA) là:',
              opts: ['SO', 'SO₂', 'SO₃', 'S₂O₃'],
              ans: 2,
              explain: 'Nhóm VIA → hoá trị cao nhất với oxygen là VI. Công thức oxide: SO₃ (S có hoá trị VI với 3 nguyên tử O: 3 × (−2) + (+6) = 0).'
            },
            {
              q: 'Trong chu kì 3, acid nào có tính acid mạnh nhất?',
              opts: ['H₂SiO₃', 'H₃PO₄', 'H₂SO₄', 'HClO₄'],
              ans: 3,
              explain: 'Trong chu kì 3, tính acid của hydroxide (acid có oxygen) tăng dần từ trái sang phải. Cl (nhóm VIIA) cho HClO₄ có tính acid rất mạnh, mạnh nhất trong chu kì 3.'
            },
            {
              q: 'Al(OH)₃ được gọi là hydroxide lưỡng tính vì:',
              opts: ['Nó chỉ có tính acid', 'Nó chỉ có tính base', 'Nó vừa có tính acid vừa có tính base', 'Nó không tan trong nước'],
              ans: 2,
              explain: 'Al(OH)₃ vừa phản ứng với acid mạnh (tính base) vừa phản ứng với base mạnh (tính acid), gọi là hydroxide lưỡng tính.'
            },
            {
              q: 'Sắp xếp các hydroxide sau theo chiều tăng dần tính base: NaOH, Mg(OH)₂, Al(OH)₃',
              opts: ['NaOH < Mg(OH)₂ < Al(OH)₃', 'Al(OH)₃ < Mg(OH)₂ < NaOH', 'Mg(OH)₂ < NaOH < Al(OH)₃', 'Al(OH)₃ < NaOH < Mg(OH)₂'],
              ans: 1,
              explain: 'Trong chu kì 3, tính base giảm theo chiều Z tăng → Al(OH)₃ (lưỡng tính) < Mg(OH)₂ (base yếu) < NaOH (base mạnh).'
            }
          ]
        },
        {
          id: 'l10-2-4',
          title: 'Bài 8: Định luật tuần hoàn. Ý nghĩa của bảng tuần hoàn các nguyên tố hoá học',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '6 phút',
          sections: [
            {
              icon: '⚖️', iconClass: 'icon-green',
              title: 'I. Định luật tuần hoàn',
              body: `
<p>Nội dung của định luật tuần hoàn: <em>"Tính chất của các nguyên tố và đơn chất, cũng như thành phần và tính chất của các hợp chất tạo nên từ các nguyên tố đó biến đổi tuần hoàn theo chiều tăng của điện tích hạt nhân nguyên tử"</em>.</p>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Dựa trên xu hướng biến đổi tính chất của các nguyên tố hoá học khi sắp xếp theo chiều tăng dần điện tích hạt nhân, D. I. Mendeleev đã đưa ra hai quyết định quan trọng: dành chỗ trống cho các nguyên tố chưa được tìm ra và dự đoán tính chất của chúng (ví dụ: nguyên tố gallium và germanium).</span>
</div>`
            },
            {
              icon: '🗺️', iconClass: 'icon-blue',
              title: 'II. Ý nghĩa của bảng tuần hoàn',
              body: `
<p>Vị trí của nguyên tố trong bảng tuần hoàn các nguyên tố hoá học cho biết cấu hình electron nguyên tử, cấu hình electron nguyên tử quyết định tính chất của các nguyên tố. Vì vậy, có thể dự đoán được tính chất hoá học của các nguyên tố khi biết vị trí của nó trong bảng tuần hoàn các nguyên tố hoá học hay cấu hình electron của nó.</p>
<div class="ls-formula"><span class="label">Mối liên hệ</span>Cấu hình electron ⟺ Vị trí trong bảng tuần hoàn ⟹ Tính chất của nguyên tố</div>
<p><strong>Ví dụ:</strong> Nguyên tố Sulfur (S) ở ô số 16, nhóm VIA, chu kì 3:</p>
<ul>
  <li>Nguyên tử S có: 16 proton, 16 electron (do số proton = số electron = Z).</li>
  <li>3 lớp electron (do số lớp electron bằng số thứ tự chu kì).</li>
  <li>6 electron lớp ngoài cùng (do số electron lớp ngoài cùng bằng số thứ tự nhóm A).</li>
</ul>`
            }
          ],
          quiz: [
            {
              q: 'Định luật tuần hoàn hiện đại dựa trên cơ sở nào?',
              opts: ['Nguyên tử khối tăng dần', 'Điện tích hạt nhân tăng dần', 'Nhiệt độ nóng chảy tăng dần', 'Số lớp electron tăng dần'],
              ans: 1,
              explain: 'Tính chất các nguyên tố biến đổi tuần hoàn theo chiều tăng của ĐIỆN TÍCH HẠT NHÂN nguyên tử (không phải nguyên tử khối như bảng Mendeleev năm 1869).'
            },
            {
              q: 'Nguyên tố X ở ô số 17, nhóm VIIA, chu kì 3. Điều nào SAI?',
              opts: ['X có 17 proton', 'X có 3 lớp electron', 'X có 7 electron lớp ngoài cùng', 'X là kim loại'],
              ans: 3,
              explain: 'Ô số 17 → Z = 17 (17 proton, đúng). Chu kì 3 → 3 lớp electron (đúng). Nhóm VIIA → 7 electron hoá trị (đúng). Nhóm VIIA là halogen (phi kim), không phải kim loại.'
            },
            {
              q: 'Hai nguyên tố X (Z = 20) và Y (Z = 38) có tính chất hoá học gần giống nhau vì:',
              opts: ['Cùng chu kì', 'Cùng nhóm A', 'Cùng số electron', 'Cùng số khối'],
              ans: 1,
              explain: 'X (Ca, Z=20): [Ar]4s² và Y (Sr, Z=38): [Kr]5s². Cả hai đều thuộc nhóm IIA → có cùng số electron hoá trị (2) → có tính chất hoá học gần giống nhau.'
            },
            {
              q: 'Nguyên tố có cấu hình electron [Ne]3s²3p³ thuộc nhóm nào?',
              opts: ['IIA', 'IIIA', 'IVA', 'VA'],
              ans: 3,
              explain: '3s²3p³ có 5 electron hoá trị ở lớp ngoài cùng → thuộc nhóm VA. Đây là Phosphorus (P, Z = 15).'
            },
            {
              q: 'Theo định luật tuần hoàn, tính chất của nguyên tố Selenium (Se, nhóm VIA, chu kì 4) gần giống nhất với nguyên tố nào?',
              opts: ['Chlorine (Cl, nhóm VIIA, chu kì 3)', 'Oxygen (O, nhóm VIA, chu kì 2)', 'Potassium (K, nhóm IA, chu kì 4)', 'Bromine (Br, nhóm VIIA, chu kì 4)'],
              ans: 1,
              explain: 'Các nguyên tố cùng nhóm A có tính chất hoá học gần giống nhau. Se (nhóm VIA, chu kì 4) gần giống O (nhóm VIA, chu kì 2) và S (nhóm VIA, chu kì 3).'
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
              title: 'Tóm tắt quy luật tuần hoàn',
              body: `
<h4>Biến đổi trong một chu kì (trái → phải, Z tăng)</h4>
<ul>
  <li>Bán kính nguyên tử: <strong>giảm</strong></li>
  <li>Năng lượng ion hoá thứ nhất: <strong>tăng</strong> (có ngoại lệ)</li>
  <li>Độ âm điện: <strong>tăng</strong></li>
  <li>Tính kim loại: <strong>giảm</strong></li>
  <li>Tính phi kim: <strong>tăng</strong></li>
  <li>Tính base của hydroxide: <strong>giảm</strong></li>
  <li>Tính acid của hydroxide: <strong>tăng</strong></li>
</ul>
<h4>Biến đổi trong một nhóm A (trên → dưới, Z tăng)</h4>
<ul>
  <li>Bán kính nguyên tử: <strong>tăng</strong></li>
  <li>Năng lượng ion hoá thứ nhất: <strong>giảm</strong></li>
  <li>Độ âm điện: <strong>giảm</strong></li>
  <li>Tính kim loại: <strong>tăng</strong></li>
  <li>Tính phi kim: <strong>giảm</strong></li>
</ul>
<div class="ls-callout success">
  <span class="ls-callout-icon">🎯</span>
  <span><strong>Định luật tuần hoàn:</strong> Tính chất các nguyên tố, đơn chất và hợp chất biến đổi tuần hoàn theo chiều tăng của điện tích hạt nhân nguyên tử.</span>
</div>`
            }
          ],
          quiz: [
            {
              q: 'So sánh bán kính nguyên tử: Na, Mg, Al (cùng chu kì 3)?',
              opts: ['Na > Mg > Al', 'Al > Mg > Na', 'Mg > Na > Al', 'Na > Al > Mg'],
              ans: 0,
              explain: 'Trong chu kì 3, bán kính giảm theo chiều Z tăng: Na (Z=11) > Mg (Z=12) > Al (Z=13).'
            },
            {
              q: 'Nguyên tố nào trong nhóm IA có tính kim loại mạnh nhất?',
              opts: ['Li', 'Na', 'K', 'Cs'],
              ans: 3,
              explain: 'Trong nhóm IA, tính kim loại tăng từ trên xuống dưới. Cs (Z=55, chu kì 6) có tính kim loại mạnh nhất trong nhóm IA (trong số các nguyên tố bền).'
            },
            {
              q: 'Oxide cao nhất của Nitrogen (N, nhóm VA) là:',
              opts: ['NO', 'N₂O₃', 'N₂O₅', 'NO₂'],
              ans: 2,
              explain: 'Nhóm VA → hoá trị cao nhất là V. Oxide cao nhất: N₂O₅ (2N × V + 5O × (−II) = 0 → 2 × 5 = 10 = 5 × 2).'
            },
            {
              q: 'Hai nguyên tố A (nhóm IIA, chu kì 2) và B (nhóm VIIA, chu kì 3). Đó là cặp nguyên tố nào?',
              opts: ['Be và Cl', 'Mg và F', 'Be và F', 'Ca và Cl'],
              ans: 0,
              explain: 'Nhóm IIA chu kì 2 → 2 lớp electron, 2e hoá trị → Be (Z=4). Nhóm VIIA chu kì 3 → 3 lớp electron, 7e hoá trị → Cl (Z=17).'
            },
            {
              q: 'Từ vị trí của nguyên tố trong bảng tuần hoàn, ta có thể dự đoán được tất cả đặc điểm nào sau đây?',
              opts: [
                'Chỉ số lớp electron và số electron hoá trị',
                'Cấu hình electron, tính chất hoá học cơ bản và thành phần oxide cao nhất',
                'Chỉ tính kim loại hay phi kim',
                'Chỉ nguyên tử khối'
              ],
              ans: 1,
              explain: 'Từ vị trí trong bảng tuần hoàn (chu kì, nhóm), ta có thể dự đoán: số lớp electron, số electron hoá trị, cấu hình electron lớp ngoài cùng, tính chất hoá học và công thức oxide cao nhất.'
            }
          ]
        }
      ]
    },
    {
      id: 'c10-3',
      title: 'Chương 3: Liên kết hoá học',
      lessons: [
        {
          id: 'l10-3-1',
          title: 'Bài 10: Quy tắc octet',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '8 phút',
          sections: [
            {
              icon: '🎯', iconClass: 'icon-blue',
              title: 'I. Khái niệm liên kết hoá học',
              body: `
<p>Theo thuyết cấu tạo hoá học, sự liên kết giữa các nguyên tử tạo thành phân tử hay tinh thể được giải thích bằng sự giảm năng lượng khi các nguyên tử kết hợp lại với nhau. Khi tạo liên kết hoá học thì nguyên tử có xu hướng đạt tới cấu hình electron bền vững của khí hiếm.</p>
<p><strong>Liên kết hoá học</strong> là sự kết hợp giữa các nguyên tử tạo thành phân tử hay tinh thể bền vững hơn. Trong các phản ứng hoá học, chỉ có các electron thuộc lớp ngoài cùng và phân lớp sát lớp ngoài cùng tham gia vào quá trình tạo thành liên kết (electron hoá trị).</p>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Nhóm</th><th>IA</th><th>IIA</th><th>IIIA</th><th>IVA</th><th>VA</th><th>VIA</th><th>VIIA</th><th>VIIIA</th></tr>
    <tr><td>Số e hoá trị</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr>
  </table>
</div>`
            },
            {
              icon: '⭕', iconClass: 'icon-teal',
              title: 'II. Quy tắc octet',
              body: `
<p>Khi hình thành liên kết hoá học, các nguyên tử có xu hướng nhường, nhận hoặc góp chung electron để đạt cấu hình electron bền vững của khí hiếm có <strong>8 electron ở lớp ngoài cùng</strong> (hoặc 2 electron với helium).</p>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Quy tắc octet áp dụng cho các nguyên tố nhóm A. Tuy nhiên, quy tắc này không phải lúc nào cũng đúng với tất cả các nguyên tử (ví dụ: BF₃ chỉ có 6e quanh B, PCl₅ có 10e quanh P).</span>
</div>
<p>Ví dụ: Nguyên tử Na (Z = 11) có 1e ở lớp ngoài cùng → nhường 1e để đạt cấu hình của Ne. Nguyên tử Cl (Z = 17) có 7e ở lớp ngoài cùng → nhận thêm 1e để đạt cấu hình của Ar. Nguyên tử O có 6e lớp ngoài cùng → góp chung 2e hoặc nhận 2e để đạt cấu hình của Ne.</p>`
            }
          ],
          quiz: [
            {
              q: 'Theo quy tắc octet, nguyên tử nào sau đây đạt được cấu hình bền của khí hiếm khi nhường 2 electron?',
              opts: ['Na (Z = 11)', 'Cl (Z = 17)', 'Mg (Z = 12)', 'O (Z = 8)'],
              ans: 2,
              explain: 'Mg (Z = 12): 1s²2s²2p⁶3s² → nhường 2e ở lớp 3s → còn 1s²2s²2p⁶, đạt cấu hình của Ne. Mg²⁺ bền.'
            },
            {
              q: 'Nguyên tử Fluorine (F, Z = 9) cần bao nhiêu electron để đạt cấu hình khí hiếm?',
              opts: ['1 (nhận)', '1 (nhường)', '7 (nhường)', '2 (nhận)'],
              ans: 0,
              explain: 'F có cấu hình 1s²2s²2p⁵ (7e lớp ngoài cùng). Cần nhận thêm 1e để đạt cấu hình Ne (1s²2s²2p⁶). F tạo ion F⁻.'
            },
            {
              q: 'Trong phản ứng hoá học, nguyên tử có xu hướng đạt cấu hình bền của khí hiếm. Cấu hình bền này có bao nhiêu electron lớp ngoài cùng (trừ He)?',
              opts: ['2', '4', '6', '8'],
              ans: 3,
              explain: 'Quy tắc octet: 8 electron ở lớp ngoài cùng (trừ He có 2e). Đây là cấu hình bền vững của các khí hiếm (Ne, Ar, Kr, Xe, Rn).'
            },
            {
              q: 'Nguyên tử C (Z = 6) cần tham gia bao nhiêu liên kết cộng hoá trị để đạt cấu hình octet?',
              opts: ['1', '2', '3', '4'],
              ans: 3,
              explain: 'C có 4e lớp ngoài cùng (2s²2p²). Cần thêm 4e để đạt 8e → góp chung 4 cặp e → tạo 4 liên kết cộng hoá trị. C thường tạo 4 liên kết (ví dụ: CH₄, CCl₄).'
            },
            {
              q: 'Quy tắc octet được ứng dụng chủ yếu cho các nguyên tố thuộc nhóm nào?',
              opts: ['Nhóm B (kim loại chuyển tiếp)', 'Nhóm A', 'Chỉ các khí hiếm nhóm VIIIA', 'Chỉ các kim loại kiềm'],
              ans: 1,
              explain: 'Quy tắc octet áp dụng chủ yếu cho các nguyên tố nhóm A, vì chúng chỉ có electron ở phân lớp s và p lớp ngoài cùng tham gia liên kết.'
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
              icon: '⚡', iconClass: 'icon-amber',
              title: 'I. Sự tạo thành ion',
              body: `
<p>Nguyên tử có thể nhường hoặc nhận electron để tạo thành <strong>ion</strong>. Ion là nguyên tử hoặc nhóm nguyên tử mang điện tích:</p>
<ul>
  <li><strong>Cation</strong> (+): nguyên tử kim loại nhường electron → mang điện tích dương. Ví dụ: Na → Na⁺ + 1e; Mg → Mg²⁺ + 2e.</li>
  <li><strong>Anion</strong> (−): nguyên tử phi kim nhận electron → mang điện tích âm. Ví dụ: Cl + 1e → Cl⁻; O + 2e → O²⁻.</li>
  <li><strong>Ion đa nguyên tử</strong> (ion phức tạp): OH⁻, NO₃⁻, SO₄²⁻, PO₄³⁻, HCO₃⁻, NH₄⁺...</li>
</ul>`
            },
            {
              icon: '🧲', iconClass: 'icon-blue',
              title: 'II. Sự tạo thành liên kết ion',
              body: `
<p><strong>Liên kết ion</strong> được tạo thành do lực hút tĩnh điện giữa các ion mang điện tích trái dấu. Liên kết ion thường xảy ra giữa kim loại điển hình (nhóm IA, IIA) và phi kim điển hình (nhóm VIA, VIIA).</p>
<div class="ls-formula"><span class="label">Ví dụ — NaCl</span>
Na → Na⁺ + 1e   (Na nhường 1e)
Cl + 1e → Cl⁻   (Cl nhận 1e)
Na⁺ + Cl⁻ → NaCl   (lực hút tĩnh điện)</div>
<p>Hiệu độ âm điện giữa hai nguyên tử: khi hiệu độ âm điện ≥ 1,7 thì liên kết thường được xem là liên kết ion.</p>`
            },
            {
              icon: '🏛️', iconClass: 'icon-teal',
              title: 'III. Tinh thể ion',
              body: `
<p>Các ion dương và ion âm sắp xếp xen kẽ theo một trật tự nhất định trong không gian tạo nên <strong>tinh thể ion</strong>. Ví dụ: Trong tinh thể NaCl, mỗi ion Na⁺ được bao quanh bởi 6 ion Cl⁻ và ngược lại.</p>
<p>Do các ion được sắp xếp theo mạng lưới tinh thể, lực hút tĩnh điện giữa các ion trái dấu rất lớn nên <strong>hợp chất ion</strong> thường có những tính chất sau:</p>
<ul>
  <li>Ở trạng thái rắn trong điều kiện thường (dạng tinh thể ion).</li>
  <li>Nhiệt độ nóng chảy và nhiệt độ sôi cao.</li>
  <li>Tan nhiều trong nước; khi tan hoặc khi nóng chảy dẫn điện được.</li>
</ul>`
            }
          ],
          quiz: [
            {
              q: 'Liên kết ion được hình thành do:',
              opts: ['Hai nguyên tử góp chung electron', 'Lực hút tĩnh điện giữa các ion mang điện tích trái dấu', 'Sự xen phủ các orbital nguyên tử', 'Lực hút Van der Waals giữa các phân tử'],
              ans: 1,
              explain: 'Liên kết ion hình thành do lực hút tĩnh điện (Coulomb) giữa ion dương (cation) và ion âm (anion), không phải dùng chung electron.'
            },
            {
              q: 'Hợp chất nào có liên kết ion?',
              opts: ['H₂O', 'CO₂', 'NaCl', 'CH₄'],
              ans: 2,
              explain: 'NaCl là hợp chất ion, được tạo bởi ion Na⁺ (kim loại điển hình nhường e) và Cl⁻ (phi kim điển hình nhận e). H₂O, CO₂, CH₄ có liên kết cộng hoá trị.'
            },
            {
              q: 'Ion Ca²⁺ có cấu hình electron là:',
              opts: ['1s²2s²2p⁶3s²3p⁶4s²', '1s²2s²2p⁶3s²3p⁶', '1s²2s²2p⁶3s²3p⁶4s²3d⁰', '1s²2s²2p⁶3s²3p⁴'],
              ans: 1,
              explain: 'Ca (Z=20): 1s²2s²2p⁶3s²3p⁶4s². Ca²⁺ mất 2e ở 4s → cấu hình: 1s²2s²2p⁶3s²3p⁶ (giống Ar).'
            },
            {
              q: 'Vì sao hợp chất ion thường có nhiệt độ nóng chảy cao?',
              opts: [
                'Vì phân tử khối lớn',
                'Vì có liên kết cộng hoá trị bên trong',
                'Vì lực hút tĩnh điện giữa các ion trái dấu trong mạng tinh thể rất mạnh',
                'Vì có liên kết hydrogen giữa các phân tử'
              ],
              ans: 2,
              explain: 'Trong tinh thể ion, các ion được giữ chặt bởi lực hút tĩnh điện mạnh (lực Coulomb) giữa ion dương và ion âm theo mọi hướng → cần nhiều năng lượng để phá vỡ mạng tinh thể → nhiệt độ nóng chảy cao.'
            },
            {
              q: 'Phát biểu nào SAI về hợp chất ion?',
              opts: [
                'Ở trạng thái rắn không dẫn điện',
                'Khi nóng chảy dẫn điện',
                'Thường tan tốt trong nước',
                'Tan trong dung môi hữu cơ không phân cực như benzene'
              ],
              ans: 3,
              explain: 'Hợp chất ion không tan trong dung môi hữu cơ không phân cực (như benzene, hexane). Chúng tan tốt trong dung môi phân cực (như nước) theo nguyên tắc "đồng cực tan lẫn nhau".'
            }
          ]
        },
        {
          id: 'l10-3-3',
          title: 'Bài 12: Liên kết cộng hoá trị',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '11 phút',
          sections: [
            {
              icon: '🤝', iconClass: 'icon-teal',
              title: 'I. Sự tạo thành liên kết cộng hoá trị',
              body: `
<p><strong>Liên kết cộng hoá trị</strong> là liên kết được tạo thành bởi một hay nhiều cặp electron dùng chung giữa hai nguyên tử. Mỗi cặp electron dùng chung tạo nên một liên kết.</p>
<ul>
  <li><strong>Liên kết đơn</strong>: 1 cặp electron dùng chung. Ví dụ: H–H, H–Cl, H–F.</li>
  <li><strong>Liên kết đôi</strong>: 2 cặp electron dùng chung. Ví dụ: O=O, C=O trong CO₂.</li>
  <li><strong>Liên kết ba</strong>: 3 cặp electron dùng chung. Ví dụ: N≡N trong N₂.</li>
</ul>
<p><strong>Liên kết cho – nhận</strong> (liên kết phối trí): Là liên kết cộng hoá trị mà cặp electron dùng chung chỉ do một nguyên tử đóng góp. Ví dụ: NH₃ cho cặp e vào BF₃.</p>`
            },
            {
              icon: '📊', iconClass: 'icon-amber',
              title: 'II. Độ âm điện và liên kết hoá học',
              body: `
<p>Dựa vào hiệu độ âm điện (Δχ) giữa hai nguyên tử, có thể phân loại liên kết:</p>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Hiệu độ âm điện (Δχ)</th><th>Loại liên kết</th><th>Ví dụ</th></tr>
    <tr><td>0 ≤ Δχ < 0,4</td><td>CHT không phân cực</td><td>H₂, Cl₂, N₂</td></tr>
    <tr><td>0,4 ≤ Δχ < 1,7</td><td>CHT phân cực</td><td>HCl, H₂O, NH₃</td></tr>
    <tr><td>Δχ ≥ 1,7</td><td>Liên kết ion</td><td>NaCl, MgO, CaF₂</td></tr>
  </table>
</div>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Trong liên kết CHT phân cực, cặp electron chung bị lệch về phía nguyên tử có độ âm điện lớn hơn. Ví dụ: trong H–Cl, cặp e lệch về Cl (χ = 3,16) hơn H (χ = 2,20).</span>
</div>`
            },
            {
              icon: '🔬', iconClass: 'icon-purple',
              title: 'III. Mô tả liên kết CHT bằng sự xen phủ AO và năng lượng liên kết',
              body: `
<p>Liên kết cộng hoá trị được mô tả bằng sự <strong>xen phủ</strong> của các AO. Có hai loại liên kết:</p>
<ul>
  <li><strong>Liên kết σ (sigma)</strong>: hình thành do sự xen phủ trục (theo trục liên kết). Đây là loại liên kết cơ bản nhất và bền nhất. Mỗi liên kết đơn là 1 liên kết σ.</li>
  <li><strong>Liên kết π (pi)</strong>: hình thành do sự xen phủ bên (song song với trục liên kết). Liên kết đôi có 1σ + 1π; liên kết ba có 1σ + 2π.</li>
</ul>
<p><strong>Năng lượng liên kết</strong> (Eb) cộng hoá trị là năng lượng cần thiết để phá vỡ liên kết đó trong phân tử khí tạo thành các nguyên tử khí. Năng lượng liên kết càng lớn thì liên kết càng bền.</p>`
            }
          ],
          quiz: [
            {
              q: 'Phân tử N₂ có liên kết gì giữa hai nguyên tử nitrogen?',
              opts: ['Liên kết đơn N–N', 'Liên kết đôi N=N', 'Liên kết ba N≡N', 'Liên kết ion'],
              ans: 2,
              explain: 'N có 5e lớp ngoài cùng, cần thêm 3e để đạt octet. Hai N góp chung 3 cặp e → liên kết ba N≡N (1σ + 2π). Đây là lý do N₂ rất bền.'
            },
            {
              q: 'Phân loại liên kết trong phân tử HCl, biết χH = 2,20 và χCl = 3,16:',
              opts: ['CHT không phân cực', 'CHT phân cực', 'Liên kết ion', 'Liên kết hydrogen'],
              ans: 1,
              explain: 'Δχ = 3,16 − 2,20 = 0,96. 0,4 ≤ 0,96 < 1,7 → Liên kết cộng hoá trị phân cực. Cặp electron dùng chung bị lệch về phía Cl.'
            },
            {
              q: 'Phân tử CO₂ có bao nhiêu liên kết σ và π?',
              opts: ['2σ và 0π', '2σ và 2π', '1σ và 2π', '0σ và 4π'],
              ans: 1,
              explain: 'CO₂: O=C=O. Mỗi liên kết đôi C=O gồm 1σ + 1π. Có 2 liên kết đôi → tổng cộng 2σ + 2π.'
            },
            {
              q: 'Liên kết nào bền nhất trong số các liên kết sau?',
              opts: ['C–C (Eb = 347 kJ/mol)', 'C=C (Eb = 612 kJ/mol)', 'C≡C (Eb = 838 kJ/mol)', 'Tất cả như nhau'],
              ans: 2,
              explain: 'Năng lượng liên kết càng lớn thì liên kết càng bền. C≡C có Eb = 838 kJ/mol lớn nhất → bền nhất.'
            },
            {
              q: 'Trong liên kết cho–nhận của ion NH₄⁺, nguồn gốc cặp electron dùng chung là từ:',
              opts: ['H cung cấp cho N', 'N cung cấp cho H⁺', 'Cả N và H cùng góp', 'Không có cặp electron dùng chung'],
              ans: 1,
              explain: 'NH₃ + H⁺ → NH₄⁺. N trong NH₃ còn một cặp electron chưa dùng (lone pair), N cho cặp electron này vào liên kết với H⁺ → liên kết cho–nhận N → H⁺.'
            }
          ]
        },
        {
          id: 'l10-3-4',
          title: 'Bài 13: Liên kết hydrogen và tương tác van der Waals',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '8 phút',
          sections: [
            {
              icon: '💧', iconClass: 'icon-blue',
              title: 'I. Liên kết hydrogen',
              body: `
<p><strong>Liên kết hydrogen</strong> là loại liên kết yếu được hình thành giữa nguyên tử H (đã liên kết với nguyên tố có độ âm điện lớn như <strong>N, O, F</strong>) với một nguyên tử khác có độ âm điện lớn (N, O, F) còn cặp electron chưa liên kết.</p>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Liên kết hydrogen được kí hiệu bằng dấu ba chấm: X–H···Y (X, Y là N, O hoặc F). Đây là liên kết yếu hơn liên kết cộng hoá trị nhiều lần.</span>
</div>
<p><strong>Ảnh hưởng của liên kết hydrogen tới tính chất vật lí của nước:</strong></p>
<ul>
  <li>Nhiệt độ sôi của HF (+19,5°C) và H₂O (+100°C) cao bất thường so với HCl (−84,9°C), H₂S (−60,7°C) do tạo liên kết hydrogen liên phân tử bền.</li>
  <li>Nước có nhiệt độ sôi cao, nhiệt hoá hơi lớn, có sức căng bề mặt lớn... do liên kết hydrogen mạnh giữa các phân tử H₂O.</li>
</ul>`
            },
            {
              icon: '🌫️', iconClass: 'icon-teal',
              title: 'II. Tương tác van der Waals',
              body: `
<p><strong>Tương tác van der Waals</strong> là lực hút yếu giữa các phân tử trung hoà điện. Tương tác này xuất hiện do sự phân bố không đồng đều tạm thời của electron trong phân tử, tạo ra các lưỡng cực tạm thời và lưỡng cực cảm ứng.</p>
<p><strong>Ảnh hưởng đến nhiệt độ nóng chảy, nhiệt độ sôi:</strong></p>
<ul>
  <li>Tương tác van der Waals tăng khi khối lượng phân tử tăng và diện tích tiếp xúc bề mặt phân tử tăng.</li>
  <li>Ví dụ: Nhiệt độ sôi của các halogen tăng từ F₂ (−188°C) đến I₂ (+185°C) do tương tác van der Waals tăng khi khối lượng phân tử tăng.</li>
  <li>Ví dụ: Nhiệt độ sôi tăng từ HCl (−84,9°C) < HBr (−66,7°C) < HI (−35,8°C) do tương tác van der Waals tăng.</li>
</ul>`
            }
          ],
          quiz: [
            {
              q: 'Tại sao nhiệt độ sôi của H₂O (100°C) cao hơn nhiều so với H₂S (−60,7°C) dù O và S cùng nhóm VIA?',
              opts: [
                'Vì phân tử H₂O có khối lượng lớn hơn',
                'Vì H₂O có liên kết hydrogen liên phân tử bền hơn H₂S',
                'Vì H₂O có liên kết cộng hoá trị mạnh hơn',
                'Vì H₂O có nhiều nguyên tử hơn'
              ],
              ans: 1,
              explain: 'O có độ âm điện lớn (3,44) → H trong H₂O bị phân cực mạnh → tạo liên kết hydrogen O–H···O rất bền giữa các phân tử H₂O. S có độ âm điện nhỏ hơn → H₂S không tạo được liên kết hydrogen như vậy.'
            },
            {
              q: 'Liên kết hydrogen được hình thành khi nguyên tử H liên kết với nguyên tố nào?',
              opts: ['Bất kì nguyên tố nào', 'Chỉ N, O, F (độ âm điện lớn)', 'Chỉ các kim loại', 'Chỉ carbon'],
              ans: 1,
              explain: 'Liên kết hydrogen chỉ hình thành khi H liên kết với nguyên tử có độ âm điện rất lớn là N, O, F. Lúc đó H mang điện tích dương đủ lớn để hút nguyên tử N, O, F khác.'
            },
            {
              q: 'Tại sao nhiệt độ sôi của các đơn chất halogen tăng theo thứ tự F₂ < Cl₂ < Br₂ < I₂?',
              opts: [
                'Do liên kết hydrogen tăng dần',
                'Do liên kết ion tăng dần',
                'Do tương tác van der Waals tăng dần khi khối lượng phân tử tăng',
                'Do năng lượng liên kết X–X tăng dần'
              ],
              ans: 2,
              explain: 'Các đơn chất halogen là phân tử đối xứng, không phân cực, không tạo liên kết hydrogen. Nhiệt độ sôi tăng do tương tác van der Waals (lực London) tăng khi khối lượng phân tử và kích thước phân tử tăng.'
            },
            {
              q: 'Chất nào sau đây tạo được liên kết hydrogen với nước?',
              opts: ['CH₄', 'CCl₄', 'C₂H₅OH (ethanol)', 'C₆H₆ (benzene)'],
              ans: 2,
              explain: 'C₂H₅OH có nhóm –OH (O có độ âm điện lớn liên kết với H) → tạo liên kết hydrogen với H₂O. CH₄, CCl₄, C₆H₆ không có nguyên tử H liên kết với N, O, F.'
            },
            {
              q: 'Tương tác van der Waals khác liên kết cộng hoá trị ở điểm cơ bản nào?',
              opts: [
                'Tương tác van der Waals mạnh hơn',
                'Liên kết CHT là liên kết yếu, van der Waals là liên kết mạnh',
                'Tương tác van der Waals là lực hút yếu giữa các phân tử, CHT là liên kết mạnh trong phân tử',
                'Không có sự khác biệt'
              ],
              ans: 2,
              explain: 'Tương tác van der Waals (liên phân tử) rất yếu so với liên kết cộng hoá trị (nội phân tử). Van der Waals là lực hút tạm thời giữa các phân tử trung hoà điện.'
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
              title: 'Tóm tắt Liên kết hoá học',
              body: `
<h4>1. Quy tắc octet</h4>
<p>Khi tạo liên kết, nguyên tử có xu hướng nhường, nhận hoặc góp chung e để đạt cấu hình 8e lớp ngoài cùng (hoặc 2e với He).</p>
<h4>2. Liên kết ion</h4>
<ul>
  <li>Lực hút tĩnh điện giữa cation và anion</li>
  <li>Thường giữa kim loại điển hình (IA, IIA) và phi kim điển hình (VIA, VIIA)</li>
  <li>Hợp chất ion: rắn, nhiệt độ nóng chảy cao, tan trong nước, dẫn điện khi nóng chảy hay tan trong nước</li>
</ul>
<h4>3. Liên kết cộng hoá trị</h4>
<ul>
  <li>Dùng chung cặp electron giữa 2 nguyên tử (thường là phi kim – phi kim)</li>
  <li>Phân loại theo Δχ: không phân cực (Δχ < 0,4), phân cực (0,4 ≤ Δχ < 1,7), ion (Δχ ≥ 1,7)</li>
  <li>Liên kết σ (xen phủ trục) và liên kết π (xen phủ bên)</li>
</ul>
<h4>4. Liên kết yếu liên phân tử</h4>
<div class="ls-formula">Liên kết hydrogen: X–H···Y (X, Y là N, O, F) — mạnh hơn van der Waals
Tương tác van der Waals: giữa các phân tử trung hoà — yếu nhất</div>`
            }
          ],
          quiz: [
            {
              q: 'Sắp xếp các liên kết sau theo chiều giảm dần độ bền: Liên kết CHT, Liên kết hydrogen, Liên kết ion, Tương tác van der Waals',
              opts: [
                'Liên kết ion > CHT > Hydrogen > van der Waals',
                'CHT > ion > Hydrogen > van der Waals',
                'Hydrogen > CHT > ion > van der Waals',
                'van der Waals > Hydrogen > CHT > ion'
              ],
              ans: 0,
              explain: 'Độ bền giảm dần: Liên kết ion (và CHT) rất mạnh (hàng trăm kJ/mol) > Liên kết hydrogen (5–40 kJ/mol) > Tương tác van der Waals (< 5 kJ/mol).'
            },
            {
              q: 'Phân tử nào có liên kết cộng hoá trị không phân cực?',
              opts: ['HCl', 'H₂O', 'Cl₂', 'NH₃'],
              ans: 2,
              explain: 'Cl₂: hai nguyên tử giống hệt nhau, Δχ = 0 → liên kết CHT không phân cực. Các phân tử còn lại đều có Δχ > 0 → liên kết phân cực.'
            },
            {
              q: 'Trong phân tử H₂O, loại liên kết giữa O và H là gì? (χH = 2,20; χO = 3,44)',
              opts: ['Ion', 'CHT không phân cực', 'CHT phân cực', 'Liên kết hydrogen'],
              ans: 2,
              explain: 'Δχ(O–H) = 3,44 − 2,20 = 1,24. 0,4 ≤ 1,24 < 1,7 → Liên kết cộng hoá trị phân cực. Liên kết hydrogen là liên kết giữa các PHÂN TỬ H₂O với nhau.'
            },
            {
              q: 'Tại sao ethanolamine (HOCH₂CH₂NH₂) có nhiệt độ sôi cao hơn ethane (C₂H₆)?',
              opts: [
                'Ethanolamine có khối lượng phân tử lớn hơn nhiều',
                'Ethanolamine có liên kết hydrogen liên phân tử (O–H và N–H), còn ethane không có',
                'Ethane có tương tác van der Waals lớn hơn',
                'Ethanolamine có liên kết ion'
              ],
              ans: 1,
              explain: 'Ethanolamine có nhóm –OH và –NH₂ → tạo liên kết hydrogen liên phân tử. Ethane (C₂H₆) chỉ có liên kết C–H và C–C, không tạo liên kết hydrogen → nhiệt độ sôi thấp hơn nhiều.'
            },
            {
              q: 'Hợp chất nào dẫn điện được khi ở trạng thái nóng chảy?',
              opts: ['C₆H₁₂O₆ (glucose)', 'NaCl (muối ăn)', 'SiO₂ (thạch anh)', 'Tất cả đều không'],
              ans: 1,
              explain: 'NaCl là hợp chất ion. Khi nóng chảy, các ion Na⁺ và Cl⁻ tự do di chuyển → dẫn điện. Glucose và SiO₂ không phải hợp chất ion, không dẫn điện khi nóng chảy.'
            }
          ]
        }
      ]
    },
    {
      id: 'c10-4',
      title: 'Chương 4: Phản ứng oxi hoá – khử',
      lessons: [
        {
          id: 'l10-4-1',
          title: 'Bài 15: Phản ứng oxi hoá – khử',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '15 phút',
          sections: [
            {
              icon: '🔢', iconClass: 'icon-blue',
              title: 'I. Số oxi hoá',
              body: `
<p><strong>Số oxi hoá</strong> của một nguyên tử trong phân tử là điện tích của nguyên tử đó nếu coi tất cả các cặp electron liên kết đều được chuyển hoàn toàn về nguyên tử có độ âm điện lớn hơn. Một số quy tắc xác định số oxi hoá:</p>
<ul>
  <li>Số oxi hoá của nguyên tử trong đơn chất bằng <strong>0</strong>. Ví dụ: O₂, H₂, Fe, Na.</li>
  <li>Trong hợp chất, số oxi hoá của H thường là <strong>+1</strong> (trừ NaH, CaH₂... là −1); của O thường là <strong>−2</strong> (trừ OF₂ là +2, H₂O₂ là −1).</li>
  <li>Số oxi hoá của kim loại kiềm (IA) trong hợp chất là <strong>+1</strong>; kim loại kiềm thổ (IIA) là <strong>+2</strong>; Al là <strong>+3</strong>.</li>
  <li>Trong một phân tử trung hoà, tổng số oxi hoá của tất cả nguyên tử <strong>bằng 0</strong>. Trong ion, tổng số oxi hoá bằng điện tích của ion.</li>
</ul>`
            },
            {
              icon: '⚡', iconClass: 'icon-amber',
              title: 'II. Chất oxi hoá, chất khử, phản ứng oxi hoá – khử',
              body: `
<p>Phản ứng <strong>oxi hoá – khử</strong> là phản ứng hoá học trong đó có sự chuyển dịch electron giữa các chất phản ứng, hay nói cách khác là có sự thay đổi số oxi hoá của một số nguyên tử trong phân tử.</p>
<ul>
  <li><strong>Chất khử</strong>: là chất <strong>nhường electron</strong> (số oxi hoá <strong>tăng</strong> sau phản ứng). Chất khử bị oxi hoá.</li>
  <li><strong>Chất oxi hoá</strong>: là chất <strong>nhận electron</strong> (số oxi hoá <strong>giảm</strong> sau phản ứng). Chất oxi hoá bị khử.</li>
  <li><strong>Quá trình oxi hoá</strong> (sự oxi hoá): là quá trình nhường electron.</li>
  <li><strong>Quá trình khử</strong> (sự khử): là quá trình nhận electron.</li>
</ul>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Mẹo nhớ: <strong>"Khử cho – Ô nhận"</strong> (Chất khử nhường e, chất oxi hoá nhận e). Hoặc: "Khử tăng – Ô giảm" (Số oxi hoá của chất khử tăng, của chất oxi hoá giảm).</span>
</div>`
            },
            {
              icon: '⚖️', iconClass: 'icon-teal',
              title: 'III. Lập phương trình hoá học của phản ứng oxi hoá – khử (phương pháp thăng bằng electron)',
              body: `
<p>Nguyên tắc: <strong>Tổng số electron do chất khử nhường = Tổng số electron chất oxi hoá nhận.</strong></p>
<h4>Các bước cân bằng:</h4>
<p>Bước 1: Xác định số oxi hoá của các nguyên tố để tìm chất khử và chất oxi hoá. Bước 2: Viết quá trình oxi hoá và quá trình khử (số e nhường/nhận). Bước 3: Tìm hệ số thích hợp sao cho tổng số e nhường = tổng số e nhận. Bước 4: Đặt hệ số vào phương trình và kiểm tra sự cân bằng.</p>
<div class="ls-formula"><span class="label">Ví dụ — Fe + CuSO₄</span>
Fe⁰ → Fe²⁺ + 2e    (chất khử, nhường 2e)
Cu²⁺ + 2e → Cu⁰    (chất oxi hoá, nhận 2e)
Phương trình: Fe + CuSO₄ → FeSO₄ + Cu</div>
<div class="ls-formula"><span class="label">Ví dụ — Cu + HNO₃ đặc</span>
Cu⁰ → Cu²⁺ + 2e         × 1
N⁺⁵ + 1e → N⁺⁴          × 2
Cu + 4HNO₃(đặc) → Cu(NO₃)₂ + 2NO₂ + 2H₂O</div>`
            },
            {
              icon: '🌍', iconClass: 'icon-green',
              title: 'IV. Phản ứng oxi hoá – khử trong thực tiễn',
              body: `
<p>Phản ứng oxi hoá – khử đóng vai trò quan trọng trong đời sống và sản xuất:</p>
<ul>
  <li><strong>Sự hô hấp</strong>: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O (phản ứng oxi hoá sinh học).</li>
  <li><strong>Sự quang hợp</strong>: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (phản ứng khử CO₂).</li>
  <li><strong>Sự cháy nhiên liệu</strong>: Phản ứng oxi hoá mạnh, toả nhiều nhiệt.</li>
  <li><strong>Sự ăn mòn kim loại</strong>: Kim loại bị oxi hoá (mất electron).</li>
  <li><strong>Sản xuất hoá chất</strong>: Sản xuất H₂SO₄, NH₃, HNO₃, luyện kim...</li>
  <li><strong>Pin điện hoá và điện phân</strong>: Biến đổi hoá năng ↔ điện năng.</li>
</ul>`
            }
          ],
          quiz: [
            {
              q: 'Số oxi hoá của Manganese (Mn) trong KMnO₄ là:',
              opts: ['+2', '+4', '+6', '+7'],
              ans: 3,
              explain: 'KMnO₄: K (+1) + Mn (x) + 4×O (−2) = 0 → 1 + x − 8 = 0 → x = +7.'
            },
            {
              q: 'Trong phản ứng: Fe + CuSO₄ → FeSO₄ + Cu, chất khử là:',
              opts: ['Fe', 'Cu²⁺', 'Fe²⁺', 'SO₄²⁻'],
              ans: 0,
              explain: 'Fe⁰ → Fe²⁺ + 2e: Fe nhường electron → Fe là chất khử (bị oxi hoá). Cu²⁺ + 2e → Cu⁰: Cu²⁺ là chất oxi hoá (bị khử).'
            },
            {
              q: 'Phản ứng nào sau đây KHÔNG phải là phản ứng oxi hoá – khử?',
              opts: [
                '2H₂ + O₂ → 2H₂O',
                'Mg + 2HCl → MgCl₂ + H₂',
                'NaOH + HCl → NaCl + H₂O',
                'Zn + CuSO₄ → ZnSO₄ + Cu'
              ],
              ans: 2,
              explain: 'Phản ứng trung hoà NaOH + HCl → NaCl + H₂O không có sự thay đổi số oxi hoá của nguyên tố nào (Na: +1→+1, O: −2→−2, H: +1→+1, Cl: −1→−1) → không phải phản ứng oxi hoá – khử.'
            },
            {
              q: 'Trong phản ứng: 2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂ + 8H₂O, chất nào vừa là chất oxi hoá vừa bị oxi hoá?',
              opts: ['KMnO₄', 'HCl', 'MnCl₂', 'Cl₂'],
              ans: 1,
              explain: 'HCl: một phần Cl⁻ (−1) bị oxi hoá thành Cl₂ (0) → HCl là chất khử (bị oxi hoá). KMnO₄: Mn⁷⁺ → Mn²⁺ (nhận 5e) → KMnO₄ là chất oxi hoá. Câu hỏi hỏi "vừa là chất oxi hoá vừa bị oxi hoá" → không có trong ví dụ này. Đây là câu dễ nhầm.'
            },
            {
              q: 'Cân bằng phản ứng: Al + HNO₃ (loãng) → Al(NO₃)₃ + N₂O + H₂O. Hệ số tối giản của Al và N₂O lần lượt là:',
              opts: ['8 và 3', '4 và 3', '8 và 4', '3 và 8'],
              ans: 0,
              explain: 'Al⁰ → Al³⁺ + 3e (×8). 2N⁵⁺ + 8e → N₂O (×3). Tổng e nhường = 24, tổng e nhận = 24. Hệ số Al = 8, N₂O = 3. Phương trình: 8Al + 30HNO₃ → 8Al(NO₃)₃ + 3N₂O + 15H₂O.'
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
              title: 'Trọng tâm kiến thức chương 4',
              body: `
<h4>Số oxi hoá — Quy tắc quan trọng</h4>
<ul>
  <li>Đơn chất: số oxi hoá = 0</li>
  <li>Trong hợp chất: H thường +1 (trừ NaH: −1), O thường −2 (trừ OF₂: +2, H₂O₂: −1)</li>
  <li>Kim loại kiềm: +1; kiềm thổ: +2; Al: +3</li>
  <li>Tổng số oxi hoá trong phân tử = 0; trong ion = điện tích ion</li>
</ul>
<h4>Phản ứng oxi hoá – khử</h4>
<div class="ls-formula">Chất khử: nhường e → số oxh TĂNG (bị oxi hoá)
Chất oxi hoá: nhận e → số oxh GIẢM (bị khử)
Bảo toàn electron: Σ e nhường = Σ e nhận</div>
<div class="ls-callout success">
  <span class="ls-callout-icon">🎯</span>
  <span>Phương pháp thăng bằng electron: Xác định số oxh thay đổi → viết quá trình oxi hoá và khử → tìm hệ số để e nhường = e nhận → đặt hệ số và cân bằng nguyên tố còn lại.</span>
</div>`
            }
          ],
          quiz: [
            {
              q: 'Số oxi hoá của Chromium (Cr) trong Cr₂O₇²⁻ là:',
              opts: ['+3', '+4', '+6', '+7'],
              ans: 2,
              explain: 'Cr₂O₇²⁻: 2x + 7×(−2) = −2 → 2x − 14 = −2 → 2x = 12 → x = +6.'
            },
            {
              q: 'Phản ứng oxi hoá – khử xảy ra do sự:',
              opts: ['Trao đổi ion giữa các chất', 'Chuyển dịch electron giữa các chất', 'Hòa tan các chất', 'Kết tủa các chất'],
              ans: 1,
              explain: 'Bản chất của phản ứng oxi hoá – khử là sự chuyển dịch (nhường/nhận) electron giữa các chất phản ứng, dẫn đến thay đổi số oxi hoá.'
            },
            {
              q: 'Trong phản ứng: 3Cu + 8HNO₃ (loãng) → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O, số mol HNO₃ đóng vai trò chất oxi hoá trên 1 mol Cu là:',
              opts: ['8/3', '2/3', '1', '8'],
              ans: 1,
              explain: 'Chỉ N⁵⁺ (trong HNO₃) nhận e → chất oxi hoá. Có 2 mol NO tạo thành → 2 mol HNO₃ là chất oxi hoá. 3 mol Cu → 2/3 mol HNO₃ đóng vai trò oxi hoá trên 1 mol Cu.'
            },
            {
              q: 'Cho phản ứng: MnO₂ + 4HCl → MnCl₂ + Cl₂ + 2H₂O. Phát biểu nào đúng?',
              opts: [
                'MnO₂ là chất khử',
                'HCl vừa là chất khử vừa là môi trường',
                'Cl₂ vừa là chất oxi hoá vừa là chất khử',
                'Mn không thay đổi số oxi hoá'
              ],
              ans: 1,
              explain: 'Mn⁴⁺ (MnO₂) + 2e → Mn²⁺ (MnCl₂): MnO₂ là chất oxi hoá. Cl⁻ (HCl) → Cl₂ (2Cl⁻ → Cl₂ + 2e): HCl là chất khử. 2HCl còn lại tạo MnCl₂ và H₂O → đóng vai trò môi trường.'
            },
            {
              q: 'Trong phản ứng oxi hoá – khử, phát biểu nào sau đây ĐÚNG?',
              opts: [
                'Chất oxi hoá nhường electron',
                'Chất khử nhận electron',
                'Quá trình khử là quá trình nhận electron',
                'Số oxi hoá của chất oxi hoá tăng'
              ],
              ans: 2,
              explain: 'Quá trình khử (sự khử) là quá trình nhận electron (số oxi hoá giảm). Chất oxi hoá nhận electron (không phải nhường), chất khử nhường electron. Số oxi hoá của chất oxi hoá giảm (không phải tăng).'
            }
          ]
        }
      ]
    },
    {
      id: 'c10-5',
      title: 'Chương 5: Năng lượng hoá học',
      lessons: [
        {
          id: 'l10-5-1',
          title: 'Bài 17: Biến thiên enthalpy trong các phản ứng hoá học',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '10 phút',
          sections: [
            {
              icon: '🔥', iconClass: 'icon-red',
              title: 'I. Phản ứng toả nhiệt, phản ứng thu nhiệt',
              body: `
<p>Dựa trên sự trao đổi năng lượng (nhiệt) với môi trường, phản ứng hoá học được chia làm 2 loại:</p>
<ul>
  <li><strong>Phản ứng toả nhiệt</strong>: giải phóng năng lượng dưới dạng nhiệt ra môi trường (hệ giảm năng lượng). Ví dụ: phản ứng cháy, phản ứng hô hấp tế bào.</li>
  <li><strong>Phản ứng thu nhiệt</strong>: hấp thụ năng lượng dưới dạng nhiệt từ môi trường (hệ tăng năng lượng). Ví dụ: phản ứng nhiệt phân, quang hợp.</li>
</ul>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Theo quan điểm năng lượng: Trong phản ứng hoá học, năng lượng cần để phá vỡ liên kết của chất đầu và năng lượng toả ra khi tạo thành liên kết của sản phẩm khác nhau, dẫn đến hệ toả nhiệt hay thu nhiệt.</span>
</div>`
            },
            {
              icon: '📊', iconClass: 'icon-blue',
              title: 'II. Biến thiên enthalpy của phản ứng',
              body: `
<p>Biến thiên enthalpy của phản ứng (kí hiệu: <strong>ΔᵣH</strong>) là nhiệt toả ra hay thu vào của phản ứng ở điều kiện áp suất không đổi.</p>
<p><strong>Điều kiện chuẩn</strong>: Áp suất 1 bar (cho chất khí), nồng độ 1 mol/L (cho chất tan trong dung dịch) và thường ở <strong>25°C (298 K)</strong>. Biến thiên enthalpy chuẩn kí hiệu là ΔᵣH°₂₉₈.</p>
<ul>
  <li>Nếu <strong>ΔᵣH°₂₉₈ < 0</strong>: Phản ứng <strong>toả nhiệt</strong> (hệ giải phóng nhiệt ra môi trường).</li>
  <li>Nếu <strong>ΔᵣH°₂₉₈ > 0</strong>: Phản ứng <strong>thu nhiệt</strong> (hệ hấp thụ nhiệt từ môi trường).</li>
</ul>
<div class="ls-formula"><span class="label">Phương trình nhiệt hoá học (ví dụ)</span>
C(s) + O₂(g) → CO₂(g)   ΔᵣH°₂₉₈ = −393,5 kJ  (Toả nhiệt)
CaCO₃(s) → CaO(s) + CO₂(g)   ΔᵣH°₂₉₈ = +178,5 kJ (Thu nhiệt)</div>`
            },
            {
              icon: '🔢', iconClass: 'icon-teal',
              title: 'III. Tính biến thiên enthalpy theo nhiệt tạo thành và theo năng lượng liên kết',
              body: `
<h4>1. Theo nhiệt tạo thành chuẩn</h4>
<p><strong>Nhiệt tạo thành chuẩn</strong> (ΔfH°₂₉₈) của một chất là biến thiên enthalpy chuẩn của phản ứng tạo thành 1 mol chất đó từ các đơn chất bền nhất ở điều kiện chuẩn.</p>
<div class="ls-formula"><span class="label">Công thức Hess</span>
ΔᵣH°₂₉₈(pư) = Σ ΔfH°₂₉₈(sản phẩm) − Σ ΔfH°₂₉₈(chất đầu)</div>
<h4>2. Theo năng lượng liên kết</h4>
<div class="ls-formula"><span class="label">Công thức</span>
ΔᵣH°₂₉₈ = Σ Eb(liên kết bị phá vỡ) − Σ Eb(liên kết được tạo thành)
Trong đó Eb là năng lượng liên kết cộng hoá trị (kJ/mol)</div>`
            }
          ],
          quiz: [
            {
              q: 'Phản ứng nào sau đây là phản ứng toả nhiệt?',
              opts: ['Nhiệt phân CaCO₃', 'Hòa tan NH₄Cl vào nước (thu nhiệt)', 'Đốt cháy methane (CH₄)', 'Quang hợp của cây xanh'],
              ans: 2,
              explain: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −890 kJ. Tất cả phản ứng cháy đều toả nhiệt. Các phản ứng còn lại đều thu nhiệt (cần cung cấp năng lượng).'
            },
            {
              q: 'Điều kiện chuẩn trong nhiệt hoá học thường được chọn ở áp suất và nhiệt độ nào?',
              opts: ['1 atm và 0°C', '1 bar và 25°C (298 K)', '1 atm và 100°C', '1 bar và 0°C'],
              ans: 1,
              explain: 'Điều kiện chuẩn: áp suất 1 bar (≈ 100 kPa) với chất khí; nồng độ 1 mol/L với chất tan trong dung dịch; nhiệt độ thường chọn 25°C (298 K).'
            },
            {
              q: 'Cho phản ứng: N₂(g) + O₂(g) → 2NO(g), ΔᵣH°₂₉₈ = +180,5 kJ. Phát biểu nào đúng?',
              opts: [
                'Phản ứng toả nhiệt, hệ giải phóng 180,5 kJ',
                'Phản ứng thu nhiệt, cần cung cấp 180,5 kJ để tạo 2 mol NO',
                'Phản ứng không trao đổi nhiệt',
                'ΔH > 0 chứng tỏ phản ứng tự xảy ra thuận lợi'
              ],
              ans: 1,
              explain: 'ΔH = +180,5 kJ > 0 → phản ứng thu nhiệt (hệ hấp thụ 180,5 kJ từ môi trường để tạo ra 2 mol NO từ N₂ và O₂). Đây là lý do tia sét tạo ra NO trong khí quyển.'
            },
            {
              q: 'Nhiệt tạo thành chuẩn (ΔfH°₂₉₈) của một đơn chất bền (H₂, C graphite, O₂...) có giá trị là:',
              opts: ['+1 kJ/mol', '−1 kJ/mol', '0 kJ/mol', 'Khác nhau cho mỗi đơn chất'],
              ans: 2,
              explain: 'Theo định nghĩa, nhiệt tạo thành chuẩn của bất kì đơn chất nào ở trạng thái bền nhất đều bằng 0, vì không cần phản ứng nào để "tạo thành" đơn chất từ chính nó.'
            },
            {
              q: 'Cho biết năng lượng liên kết: Eb(H–H) = 436 kJ/mol; Eb(Cl–Cl) = 243 kJ/mol; Eb(H–Cl) = 432 kJ/mol. Tính ΔᵣH°₂₉₈ của phản ứng H₂(g) + Cl₂(g) → 2HCl(g):',
              opts: ['−185 kJ', '+185 kJ', '−432 kJ', '+432 kJ'],
              ans: 0,
              explain: 'ΔH = [Eb(H–H) + Eb(Cl–Cl)] − [2 × Eb(H–Cl)] = (436 + 243) − (2 × 432) = 679 − 864 = −185 kJ. Phản ứng toả 185 kJ.'
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
              title: 'Tổng kết Năng lượng hoá học',
              body: `
<h4>Phản ứng toả nhiệt và thu nhiệt</h4>
<ul>
  <li>Toả nhiệt: ΔH < 0 (hệ giải phóng nhiệt ra môi trường)</li>
  <li>Thu nhiệt: ΔH > 0 (hệ hấp thụ nhiệt từ môi trường)</li>
</ul>
<h4>Phương trình nhiệt hoá học</h4>
<p>Phương trình hoá học + trạng thái chất + giá trị ΔᵣH°₂₉₈.</p>
<h4>Tính ΔᵣH theo nhiệt tạo thành</h4>
<div class="ls-formula">ΔᵣH°₂₉₈ = Σ ΔfH°₂₉₈(sp) − Σ ΔfH°₂₉₈(cd)
ΔfH°₂₉₈ của đơn chất bền = 0</div>
<h4>Tính ΔᵣH theo năng lượng liên kết</h4>
<div class="ls-formula">ΔᵣH°₂₉₈ = Σ Eb(liên kết bị phá vỡ) − Σ Eb(liên kết được tạo thành)</div>
<div class="ls-callout success">
  <span class="ls-callout-icon">🎯</span>
  <span>Ý nghĩa thực tiễn: Biết giá trị ΔH giúp tính được lượng nhiệt toả ra/thu vào trong phản ứng, từ đó ứng dụng trong công nghiệp, đời sống (nhiên liệu, pin, nổ...).</span>
</div>`
            }
          ],
          quiz: [
            {
              q: 'Đại lượng nào đặc trưng cho lượng nhiệt trao đổi của phản ứng ở áp suất không đổi?',
              opts: ['Nhiệt độ (T)', 'Biến thiên enthalpy (ΔH)', 'Áp suất (P)', 'Thể tích (V)'],
              ans: 1,
              explain: 'Biến thiên enthalpy ΔH đặc trưng cho nhiệt lượng trao đổi của hệ với môi trường ở áp suất không đổi. ΔH < 0: toả nhiệt; ΔH > 0: thu nhiệt.'
            },
            {
              q: 'Cho: ΔfH°₂₉₈(CO₂) = −393,5 kJ/mol; ΔfH°₂₉₈(H₂O, l) = −285,8 kJ/mol; ΔfH°₂₉₈(CH₄) = −74,8 kJ/mol. Tính ΔᵣH°₂₉₈ của phản ứng: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)',
              opts: ['−890,3 kJ', '+890,3 kJ', '−604,5 kJ', '+604,5 kJ'],
              ans: 0,
              explain: 'ΔH = [ΔfH°(CO₂) + 2×ΔfH°(H₂O)] − [ΔfH°(CH₄) + 2×ΔfH°(O₂)] = [−393,5 + 2×(−285,8)] − [−74,8 + 0] = −965,1 − (−74,8) = −890,3 kJ.'
            },
            {
              q: 'Phản ứng phân hủy Cu(OH)₂: Cu(OH)₂(s) → CuO(s) + H₂O(l) cần đun nóng liên tục. Kết luận nào đúng?',
              opts: ['ΔH < 0, toả nhiệt', 'ΔH > 0, thu nhiệt', 'ΔH = 0, không trao đổi nhiệt', 'Không thể biết từ thông tin đã cho'],
              ans: 1,
              explain: 'Cần đun nóng liên tục = hệ hấp thụ nhiệt từ môi trường → phản ứng thu nhiệt → ΔH > 0.'
            },
            {
              q: 'Biết Eb(N≡N) = 945 kJ/mol; Eb(H–H) = 436 kJ/mol; Eb(N–H) = 391 kJ/mol. ΔᵣH của N₂ + 3H₂ → 2NH₃ là:',
              opts: ['−92 kJ', '+92 kJ', '−2349 kJ', '+2349 kJ'],
              ans: 0,
              explain: 'ΔH = [Eb(N≡N) + 3×Eb(H–H)] − [2×3×Eb(N–H)] = [945 + 3×436] − [6×391] = [945 + 1308] − 2346 = 2253 − 2346 = −93 kJ ≈ −92 kJ.'
            },
            {
              q: 'Phương trình nhiệt hoá học cần ghi thêm thông tin gì so với phương trình hoá học thông thường?',
              opts: [
                'Chỉ cần ghi điều kiện phản ứng',
                'Trạng thái của các chất và giá trị ΔᵣH°₂₉₈',
                'Chỉ cần ghi giá trị ΔH',
                'Nhiệt độ và áp suất thực hiện phản ứng'
              ],
              ans: 1,
              explain: 'Phương trình nhiệt hoá học cần ghi thêm: (1) trạng thái của các chất (s, l, g, aq) vì ΔH phụ thuộc vào trạng thái; và (2) giá trị ΔᵣH°₂₉₈ (kJ).'
            }
          ]
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
              title: 'I. Tốc độ phản ứng hoá học',
              body: `
<p>Tốc độ phản ứng là đại lượng đặc trưng cho tính nhanh hay chậm của một phản ứng hoá học. Tốc độ trung bình (<strong>v̄</strong>) của phản ứng được tính bằng độ biến thiên nồng độ (ΔC) của chất phản ứng hoặc sản phẩm trong một đơn vị thời gian (Δt).</p>
<div class="ls-formula"><span class="label">Tốc độ trung bình</span>v̄ = |ΔC| / Δt   (mol/L·s hoặc mol/L·min)</div>
<p>Đối với phản ứng: aA + bB → cC + dD:</p>
<div class="ls-formula"><span class="label">Biểu thức tốc độ tức thời (định luật tác dụng khối lượng)</span>v = k × [A]ᵃ × [B]ᵇ
Trong đó k là hằng số tốc độ phản ứng, chỉ phụ thuộc vào bản chất phản ứng và nhiệt độ
(Chú ý: biểu thức này chỉ đúng cho phản ứng đơn giản, không tuỳ ý áp dụng)</div>`
            },
            {
              icon: '📈', iconClass: 'icon-teal',
              title: 'II. Các yếu tố ảnh hưởng đến tốc độ phản ứng',
              body: `
<ol>
  <li><strong>Nồng độ</strong>: Tăng nồng độ chất phản ứng → tăng số va chạm hiệu quả → tăng tốc độ phản ứng.</li>
  <li><strong>Áp suất</strong>: Đối với chất khí, tăng áp suất → tăng nồng độ chất khí → tăng tốc độ phản ứng.</li>
  <li><strong>Nhiệt độ</strong>: Tăng nhiệt độ → tăng động năng của các hạt → tăng số va chạm hiệu quả → tăng tốc độ phản ứng. <strong>Hệ số nhiệt độ Van't Hoff (γ)</strong> cho biết tốc độ phản ứng tăng bao nhiêu lần khi nhiệt độ tăng thêm 10°C: v₂/v₁ = γ^((T₂−T₁)/10), với γ thường từ 2 đến 4.</li>
  <li><strong>Diện tích bề mặt</strong>: Đối với chất rắn, tăng diện tích tiếp xúc (nghiền nhỏ) → tăng tốc độ phản ứng.</li>
  <li><strong>Chất xúc tác</strong>: Làm tăng tốc độ phản ứng (hạ thấp năng lượng hoạt hoá) nhưng không bị tiêu hao sau phản ứng và không làm thay đổi sản phẩm.</li>
</ol>`
            },
            {
              icon: '🌍', iconClass: 'icon-green',
              title: 'III. Một số ứng dụng của việc thay đổi tốc độ phản ứng',
              body: `
<ul>
  <li><strong>Công nghiệp</strong>: Dùng chất xúc tác (Fe cho tổng hợp NH₃, V₂O₅ cho tổng hợp H₂SO₄, Pt cho nhiều phản ứng), tăng nhiệt độ và nồng độ để tăng tốc độ phản ứng và năng suất.</li>
  <li><strong>Bảo quản thực phẩm</strong>: Làm lạnh (giảm nhiệt độ) để giảm tốc độ phân huỷ, oxy hoá thực phẩm.</li>
  <li><strong>Y học và sinh học</strong>: Enzyme là chất xúc tác sinh học, giúp các phản ứng xảy ra nhanh chóng ở nhiệt độ cơ thể.</li>
  <li><strong>Sản xuất rượu bia, thức ăn lên men</strong>: Kiểm soát nhiệt độ và chủng vi sinh vật (enzyme) để điều chỉnh tốc độ lên men.</li>
</ul>`
            }
          ],
          quiz: [
            {
              q: 'Tốc độ phản ứng hoá học là:',
              opts: [
                'Thời gian để phản ứng kết thúc',
                'Độ biến thiên nồng độ của một chất trong một đơn vị thời gian',
                'Khối lượng chất phản ứng bị tiêu thụ',
                'Số mol chất sản phẩm tạo ra'
              ],
              ans: 1,
              explain: 'Tốc độ phản ứng đo lường sự thay đổi nồng độ (mol/L) của chất phản ứng (giảm) hoặc sản phẩm (tăng) trong một đơn vị thời gian (s, min).'
            },
            {
              q: 'Yếu tố nào sau đây KHÔNG làm thay đổi hằng số tốc độ phản ứng k?',
              opts: ['Nhiệt độ', 'Nồng độ chất phản ứng', 'Bản chất của phản ứng', 'Chất xúc tác'],
              ans: 1,
              explain: 'Hằng số tốc độ k chỉ phụ thuộc vào bản chất phản ứng và nhiệt độ (cũng bị ảnh hưởng bởi chất xúc tác). Nồng độ KHÔNG ảnh hưởng đến k (nồng độ ảnh hưởng đến tốc độ v qua phương trình v = k[A]ᵃ[B]ᵇ).'
            },
            {
              q: 'Nếu hệ số nhiệt độ Van\'t Hoff γ = 3, khi tăng nhiệt độ từ 20°C lên 50°C, tốc độ phản ứng tăng lên bao nhiêu lần?',
              opts: ['3 lần', '9 lần', '27 lần', '81 lần'],
              ans: 2,
              explain: 'Tăng 30°C = 3 lần tăng 10°C. Tốc độ tăng = γ^(ΔT/10) = 3^(30/10) = 3³ = 27 lần.'
            },
            {
              q: 'Để làm thịt nhanh chín hơn khi nấu nướng, người ta thường thái nhỏ thịt. Yếu tố nào đã được áp dụng?',
              opts: ['Nhiệt độ', 'Nồng độ', 'Diện tích tiếp xúc bề mặt', 'Chất xúc tác'],
              ans: 2,
              explain: 'Thái nhỏ thịt giúp tăng diện tích tiếp xúc giữa thịt với nhiệt và các chất trong quá trình nấu → phản ứng hoá học (biến tính protein, phân huỷ) xảy ra nhanh hơn → thịt chín nhanh hơn.'
            },
            {
              q: 'Chất xúc tác làm tăng tốc độ phản ứng bằng cách nào?',
              opts: [
                'Tăng nồng độ chất phản ứng',
                'Tăng nhiệt độ phản ứng',
                'Hạ thấp năng lượng hoạt hoá của phản ứng',
                'Tăng số va chạm giữa các phân tử'
              ],
              ans: 2,
              explain: 'Chất xúc tác làm tăng tốc độ phản ứng bằng cách tạo ra con đường phản ứng mới có năng lượng hoạt hoá (Ea) thấp hơn, do đó nhiều hạt có đủ năng lượng để phản ứng hơn.'
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
              title: 'Tổng kết Tốc độ phản ứng',
              body: `
<h4>Khái niệm và công thức</h4>
<div class="ls-formula">Tốc độ trung bình: v̄ = |ΔC| / Δt
Tốc độ tức thời (phản ứng đơn giản): v = k × [A]ᵃ × [B]ᵇ
k: hằng số tốc độ (phụ thuộc bản chất phản ứng và nhiệt độ)</div>
<h4>5 yếu tố ảnh hưởng</h4>
<ul>
  <li>Nồng độ: tăng nồng độ → tăng tốc độ</li>
  <li>Áp suất: tăng p (khí) → tăng tốc độ</li>
  <li>Nhiệt độ: tăng T → tăng tốc độ (v₂/v₁ = γ^(ΔT/10))</li>
  <li>Diện tích bề mặt: tăng S → tăng tốc độ (chất rắn)</li>
  <li>Chất xúc tác: giảm Ea → tăng tốc độ</li>
</ul>
<div class="ls-callout success">
  <span class="ls-callout-icon">🎯</span>
  <span>Ứng dụng thực tiễn: Công nghiệp dùng xúc tác và tăng nồng độ/nhiệt độ. Bảo quản thực phẩm dùng làm lạnh (giảm T).</span>
</div>`
            }
          ],
          quiz: [
            {
              q: 'Nồng độ ban đầu của N₂ và H₂ trong bình phản ứng: [N₂] = 0,01 mol/L; [H₂] = 0,03 mol/L. Sau 20 giây, nồng độ N₂ còn 0,008 mol/L. Tốc độ trung bình của phản ứng N₂ + 3H₂ → 2NH₃ tính theo N₂ là:',
              opts: ['1 × 10⁻⁴ mol/L·s', '2 × 10⁻⁴ mol/L·s', '3 × 10⁻⁴ mol/L·s', '1 × 10⁻³ mol/L·s'],
              ans: 0,
              explain: 'ΔC(N₂) = 0,01 − 0,008 = 0,002 mol/L; Δt = 20 s. v̄ = 0,002 / 20 = 1 × 10⁻⁴ mol/L·s.'
            },
            {
              q: 'Phản ứng A → B có hệ số nhiệt độ γ = 2. Ở 30°C, v = 1 mol/L·s. Ở 70°C, tốc độ phản ứng là:',
              opts: ['4 mol/L·s', '8 mol/L·s', '16 mol/L·s', '2 mol/L·s'],
              ans: 2,
              explain: 'Tăng từ 30°C lên 70°C: ΔT = 40°C = 4 lần 10°C. v₇₀/v₃₀ = 2⁴ = 16. v₇₀ = 1 × 16 = 16 mol/L·s.'
            },
            {
              q: 'Trong sản xuất amoniac (N₂ + 3H₂ ⇌ 2NH₃), người ta dùng Fe làm xúc tác. Vai trò của Fe là:',
              opts: [
                'Tăng hiệu suất tạo NH₃',
                'Làm cho phản ứng đạt cân bằng nhanh hơn mà không làm thay đổi vị trí cân bằng',
                'Làm thay đổi chiều phản ứng',
                'Tăng nồng độ NH₃ ở cân bằng'
              ],
              ans: 1,
              explain: 'Chất xúc tác Fe giúp phản ứng đạt trạng thái cân bằng nhanh hơn bằng cách giảm Ea cho cả hai chiều phản ứng, nhưng không làm thay đổi thành phần hỗn hợp tại cân bằng (hằng số cân bằng Kc không đổi).'
            },
            {
              q: 'Biểu thức tốc độ v = k[A]²[B] ứng với phản ứng nào có bậc phản ứng tổng quát là 3?',
              opts: [
                'A + B → Sản phẩm',
                '2A + B → Sản phẩm (phản ứng đơn giản)',
                'A₂ + B → Sản phẩm (phản ứng đơn giản)',
                'Tất cả đều đúng'
              ],
              ans: 1,
              explain: 'Với phản ứng đơn giản 2A + B → sp, bậc phản ứng theo A là 2, theo B là 1, tổng bậc = 3 → v = k[A]²[B].'
            },
            {
              q: 'Tốc độ phản ứng KHÔNG phụ thuộc vào yếu tố nào sau đây?',
              opts: ['Nhiệt độ', 'Bản chất các chất phản ứng', 'Màu sắc của chất phản ứng', 'Nồng độ các chất phản ứng'],
              ans: 2,
              explain: 'Màu sắc của chất phản ứng không ảnh hưởng đến tốc độ phản ứng hoá học. Tốc độ phụ thuộc vào: bản chất chất phản ứng, nồng độ, nhiệt độ, áp suất (chất khí), diện tích bề mặt, chất xúc tác.'
            }
          ]
        }
      ]
    },
    {
      id: 'c10-7',
      title: 'Chương 7: Nguyên tố nhóm halogen',
      lessons: [
        {
          id: 'l10-7-1',
          title: 'Bài 21: Nhóm halogen',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '12 phút',
          sections: [
            {
              icon: '🌊', iconClass: 'icon-teal',
              title: 'I. Trạng thái tự nhiên',
              body: `
<p>Nhóm VIIA trong bảng tuần hoàn các nguyên tố hoá học còn gọi là nhóm halogen, gồm sáu nguyên tố: <strong>fluorine (F), chlorine (Cl), bromine (Br), iodine (I), astatine (At) và tennessine (Ts)</strong>. Bốn nguyên tố F, Cl, Br và I tồn tại trong tự nhiên; còn At và Ts là các nguyên tố phóng xạ.</p>
<p>Trong tự nhiên, halogen chỉ tồn tại ở dạng hợp chất, phần lớn ở dạng muối halide, phổ biến như calcium fluoride, sodium chloride. Trong cơ thể người, nguyên tố chlorine có trong máu và dịch vị dạ dày (dạng ion Cl⁻), nguyên tố iodine có ở tuyến giáp (dạng hợp chất hữu cơ).</p>`
            },
            {
              icon: '⚛️', iconClass: 'icon-blue',
              title: 'II. Cấu tạo nguyên tử và phân tử',
              body: `
<p>Nguyên tử halogen có <strong>7 electron ở lớp ngoài cùng</strong> (cấu hình ns²np⁵), dễ nhận thêm 1 electron để đạt cấu hình electron bền của khí hiếm gần nhất:</p>
<div class="ls-formula">ns²np⁵ + 1e → ns²np⁶</div>
<p>Do vậy, số oxi hoá đặc trưng của các halogen trong hợp chất là <strong>−1</strong>. Tuy nhiên, khi liên kết với các nguyên tố có độ âm điện lớn, các halogen (trừ F) có thể có các số oxi hoá dương: +1, +3, +5, +7 (fluorine luôn có số oxi hoá −1 trong mọi hợp chất do độ âm điện lớn nhất).</p>
<p>Các đơn chất halogen tồn tại dưới dạng phân tử gồm 2 nguyên tử (X₂): F₂, Cl₂, Br₂, I₂. Liên kết trong phân tử X₂ là liên kết cộng hoá trị không phân cực.</p>`
            },
            {
              icon: '🌡️', iconClass: 'icon-purple',
              title: 'III. Tính chất vật lí',
              body: `
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Đơn chất</th><th>Trạng thái</th><th>Màu sắc</th><th>t°nóng chảy (°C)</th><th>t°sôi (°C)</th><th>Độ tan (mol/L)</th></tr>
    <tr><td>F₂</td><td>Khí</td><td>Vàng nhạt</td><td>−219,6</td><td>−188,1</td><td>—</td></tr>
    <tr><td>Cl₂</td><td>Khí</td><td>Vàng lục</td><td>−101,0</td><td>−34,1</td><td>0,091</td></tr>
    <tr><td>Br₂</td><td>Lỏng</td><td>Nâu đỏ</td><td>−7,3</td><td>59,2</td><td>0,21</td></tr>
    <tr><td>I₂</td><td>Rắn</td><td>Tím đen</td><td>113,6</td><td>185,5</td><td>0,0013</td></tr>
  </table>
</div>
<p>Nhiệt độ nóng chảy và nhiệt độ sôi tăng từ F₂ đến I₂ do tương tác van der Waals giữa các phân tử tăng khi khối lượng phân tử tăng. Ở điều kiện thường, các halogen ít tan trong nước nhưng tan nhiều trong dung môi hữu cơ như alcohol, benzene. I₂ có tính thăng hoa (chuyển trực tiếp từ rắn sang hơi ở áp suất thường).</p>`
            },
            {
              icon: '💥', iconClass: 'icon-red',
              title: 'IV. Tính chất hoá học',
              body: `
<p>Halogen là các phi kim điển hình, có tính <strong>oxi hoá mạnh</strong>, giảm dần từ F đến I.</p>
<h4>1. Tác dụng với kim loại → muối halide</h4>
<div class="ls-formula">2Na + Cl₂ →(t°)→ 2NaCl
2Fe + 3Cl₂ →(t°)→ 2FeCl₃</div>
<h4>2. Tác dụng với hydrogen → hydrogen halide</h4>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Phản ứng</th><th>Điều kiện</th><th>Đặc điểm</th></tr>
    <tr><td>H₂ + F₂ → 2HF</td><td>Phản ứng ngay ở nhiệt độ phòng và trong bóng tối</td><td>Nổ mạnh</td></tr>
    <tr><td>H₂ + Cl₂ → 2HCl</td><td>Ánh sáng hoặc t°</td><td>Gây nổ</td></tr>
    <tr><td>H₂ + Br₂ → 2HBr</td><td>~200°C, xúc tác Pt</td><td>Không gây nổ</td></tr>
    <tr><td>H₂ + I₂ ⇌ 2HI</td><td>~300°C, xúc tác Pt</td><td>Thuận nghịch</td></tr>
  </table>
</div>
<h4>3. Tác dụng với nước</h4>
<div class="ls-formula">Cl₂ + H₂O ⇌ HCl + HClO  (chlorine tự oxi hoá − tự khử)
F₂ phản ứng mãnh liệt với nước: 2F₂ + 2H₂O → 4HF + O₂</div>
<h4>4. Tác dụng với dung dịch kiềm</h4>
<div class="ls-formula">Cl₂ + 2NaOH → NaCl + NaClO + H₂O  (nước Javel)
3Cl₂ + 6KOH →(t°)→ 5KCl + KClO₃ + 3H₂O</div>`
            }
          ],
          quiz: [
            {
              q: 'Nguyên tố nào có tính oxi hoá mạnh nhất trong nhóm halogen?',
              opts: ['Iodine (I)', 'Bromine (Br)', 'Chlorine (Cl)', 'Fluorine (F)'],
              ans: 3,
              explain: 'Fluorine có độ âm điện lớn nhất (3,98 theo Pauling), bán kính nguyên tử nhỏ nhất trong nhóm halogen → lực hút electron lớn nhất → tính oxi hoá mạnh nhất.'
            },
            {
              q: 'Trong bảng 21.2, trạng thái và màu sắc của Bromine (Br₂) ở điều kiện thường là:',
              opts: ['Khí, màu vàng lục', 'Lỏng, màu nâu đỏ', 'Rắn, màu tím đen', 'Khí, màu vàng nhạt'],
              ans: 1,
              explain: 'Theo bảng 21.2, Br₂ ở điều kiện thường là chất lỏng màu nâu đỏ, dễ bay hơi và có tính độc cao.'
            },
            {
              q: 'Khi chlorine tan vào nước, phản ứng xảy ra là:',
              opts: [
                'Cl₂ + H₂O → HClO₂ + HCl',
                'Cl₂ + H₂O ⇌ HCl + HClO',
                'Cl₂ + H₂O → HCl + H₂',
                'Cl₂ + H₂O → 2HCl + O₂'
              ],
              ans: 1,
              explain: 'Cl₂ + H₂O ⇌ HCl + HClO (nước chlorine). HClO là hypochlorous acid, có tính oxi hoá mạnh → có tính tẩy màu và khử trùng, dùng trong xử lý nước sinh hoạt.'
            },
            {
              q: 'Tại sao nhiệt độ sôi tăng theo thứ tự F₂ < Cl₂ < Br₂ < I₂?',
              opts: [
                'Vì liên kết X–X ngày càng bền hơn',
                'Vì tương tác van der Waals tăng khi khối lượng phân tử tăng',
                'Vì liên kết hydrogen tăng dần từ F₂ đến I₂',
                'Vì độ âm điện giảm dần từ F đến I'
              ],
              ans: 1,
              explain: 'Các đơn chất halogen X₂ là phân tử không phân cực, không tạo liên kết hydrogen. Nhiệt độ sôi tăng do tương tác van der Waals (lực London) tăng khi khối lượng phân tử và kích thước phân tử tăng.'
            },
            {
              q: 'Phản ứng của chlorine với dung dịch NaOH ở nhiệt độ thường tạo ra sản phẩm gì?',
              opts: [
                'NaCl và NaClO₃',
                'NaCl và NaClO (nước Javel)',
                'NaCl và NaClO₄',
                'Chỉ tạo ra NaCl'
              ],
              ans: 1,
              explain: 'Cl₂ + 2NaOH (thường) → NaCl + NaClO + H₂O. Hỗn hợp NaCl và NaClO (sodium hypochlorite) là thành phần của nước Javel, dùng tẩy trắng và khử trùng.'
            }
          ]
        },
        {
          id: 'l10-7-2',
          title: 'Bài 22: Hydrogen halide. Muối halide',
          tag: 'Lý thuyết · Lớp 10',
          readTime: '10 phút',
          sections: [
            {
              icon: '⚗️', iconClass: 'icon-blue',
              title: 'I. Hydrogen halide',
              body: `
<p>Phân tử hydrogen halide (HX) gồm một liên kết cộng hoá trị phân cực. Các phân tử HX là phân tử phân cực. Một số đặc điểm quan trọng:</p>
<div class="ls-table-wrap">
  <table class="ls-table">
    <tr><th>Hợp chất</th><th>Tên gọi</th><th>Độ dài liên kết (pm)</th><th>Năng lượng liên kết (kJ/mol)</th><th>t°sôi (°C)</th></tr>
    <tr><td>HF</td><td>Hydrogen fluoride</td><td>92</td><td>569</td><td>+19,5</td></tr>
    <tr><td>HCl</td><td>Hydrogen chloride</td><td>127</td><td>432</td><td>−84,9</td></tr>
    <tr><td>HBr</td><td>Hydrogen bromide</td><td>141</td><td>366</td><td>−66,7</td></tr>
    <tr><td>HI</td><td>Hydrogen iodide</td><td>160</td><td>299</td><td>−35,8</td></tr>
  </table>
</div>
<p>HF lỏng có nhiệt độ sôi cao bất thường (+19,5°C) là do phân tử HF phân cực mạnh, có khả năng tạo liên kết hydrogen: H–F···H–F···H–F. Từ HCl đến HI, nhiệt độ sôi tăng do tương tác van der Waals tăng khi khối lượng phân tử tăng.</p>`
            },
            {
              icon: '🔬', iconClass: 'icon-teal',
              title: 'II. Hydrohalic acid',
              body: `
<h4>1. Tính acid</h4>
<p>Trong dãy hydrohalic acid, <strong>tính acid tăng từ hydrofluoric acid (yếu) đến hydroiodic acid (rất mạnh)</strong>: HF (yếu) < HCl (mạnh) < HBr (mạnh) < HI (rất mạnh). Điều này do năng lượng liên kết H–X giảm dần từ HF đến HI → HX ngày càng dễ phân li H⁺.</p>
<p>HF còn có tính chất đặc biệt: ăn mòn thuỷ tinh do phản ứng: SiO₂ + 4HF → SiF₄ + 2H₂O. Ứng dụng: dùng khắc chữ lên thuỷ tinh, điện phân nóng chảy sản xuất fluorine.</p>
<h4>2. Tính chất hoá học của HCl (hydrochloric acid)</h4>
<p>Hydrochloric acid (HCl) là acid mạnh, được dùng rộng rãi trong sản xuất (loại bỏ gỉ sét trên bề mặt kim loại trước khi chuyển sang các công đoạn sản xuất tiếp theo).</p>`
            },
            {
              icon: '🧪', iconClass: 'icon-amber',
              title: 'III. Muối halide',
              body: `
<h4>1. Tính tan</h4>
<p>Hầu hết các muối halide đều dễ tan trong nước, trừ một số muối không tan như: <strong>AgCl (trắng), AgBr (vàng nhạt), AgI (vàng đậm)</strong> và một số muối ít tan như PbCl₂, PbBr₂.</p>
<h4>2. Tính chất hoá học</h4>
<p><strong>a) Phản ứng trao đổi — Nhận biết ion halide</strong></p>
<p>Dùng dung dịch AgNO₃ để nhận biết ion halide: F⁻ không có hiện tượng (AgF tan); Cl⁻ → AgCl↓ trắng; Br⁻ → AgBr↓ vàng nhạt; I⁻ → AgI↓ vàng đậm.</p>
<p><strong>b) Tính khử của ion halide</strong></p>
<p>Sodium bromide khử được sulfuric acid đặc thành sulfur dioxide; còn sodium iodide có thể khử sulfuric acid đặc thành hydrogen sulfide:</p>
<div class="ls-formula">2NaBr + 2H₂SO₄ (đặc) → Na₂SO₄ + Br₂ + SO₂ + 2H₂O
8NaI + 5H₂SO₄ (đặc) → 4Na₂SO₄ + 4I₂ + H₂S + 4H₂O</div>
<p>Tính khử của ion halide: Cl⁻ < Br⁻ < I⁻ (tăng dần theo kích thước ion tăng).</p>`
            }
          ],
          quiz: [
            {
              q: 'Acid nào trong dãy hydrohalic acid là acid YẾU?',
              opts: ['HCl', 'HBr', 'HI', 'HF'],
              ans: 3,
              explain: 'HF là acid yếu duy nhất trong dãy hydrohalic acid do liên kết H–F rất bền (Eb = 569 kJ/mol) và có liên kết hydrogen liên phân tử mạnh, làm cho HF khó phân li trong nước hơn HCl, HBr, HI.'
            },
            {
              q: 'Dùng thuốc thử nào để nhận biết ion Cl⁻, Br⁻, I⁻ trong dung dịch?',
              opts: ['BaCl₂', 'AgNO₃', 'NaOH', 'H₂SO₄ loãng'],
              ans: 1,
              explain: 'Dung dịch AgNO₃: Cl⁻ → AgCl↓ trắng; Br⁻ → AgBr↓ vàng nhạt; I⁻ → AgI↓ vàng đậm. Đây là phản ứng trao đổi ion đặc trưng để nhận biết ion halide.'
            },
            {
              q: 'Tại sao HF (t°sôi = +19,5°C) có nhiệt độ sôi cao bất thường so với HCl (−84,9°C), HBr (−66,7°C) và HI (−35,8°C)?',
              opts: [
                'Vì liên kết H–F bền hơn liên kết H–Cl',
                'Vì HF tạo liên kết hydrogen liên phân tử H–F···H–F rất bền',
                'Vì HF có phân tử khối lớn hơn HCl',
                'Vì F có độ âm điện nhỏ hơn Cl'
              ],
              ans: 1,
              explain: 'HF phân cực mạnh (F là nguyên tử có độ âm điện lớn nhất) → H mang điện tích dương đủ lớn để tạo liên kết hydrogen O–H···F (hay F–H···F) mạnh giữa các phân tử HF → cần nhiều năng lượng để phá vỡ liên kết này khi sôi → nhiệt độ sôi cao bất thường.'
            },
            {
              q: 'Kết tủa AgBr có màu gì khi nhỏ AgNO₃ vào dung dịch NaBr?',
              opts: ['Trắng', 'Vàng nhạt', 'Vàng đậm', 'Đen'],
              ans: 1,
              explain: 'AgBr↓ có màu vàng nhạt. Để phân biệt: AgCl (trắng) < AgBr (vàng nhạt) < AgI (vàng đậm).'
            },
            {
              q: 'So sánh tính khử của các ion: F⁻, Cl⁻, Br⁻, I⁻?',
              opts: ['F⁻ > Cl⁻ > Br⁻ > I⁻', 'I⁻ > Br⁻ > Cl⁻ > F⁻', 'Cl⁻ > Br⁻ > I⁻ > F⁻', 'Tất cả như nhau'],
              ans: 1,
              explain: 'Tính khử của ion halide tăng dần từ F⁻ đến I⁻. Kích thước ion tăng từ F⁻ đến I⁻ → electron lớp ngoài cùng bị hút yếu hơn → dễ nhường electron hơn → tính khử tăng. F⁻ hầu như không có tính khử.'
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
              title: 'Tổng kết nhóm Halogen',
              body: `
<h4>Vị trí và cấu tạo</h4>
<ul>
  <li>Nhóm VIIA: F, Cl, Br, I, At (Ts phóng xạ)</li>
  <li>Cấu hình lớp ngoài cùng: ns²np⁵ (7e hoá trị)</li>
  <li>Đơn chất: phân tử X₂, liên kết CHT không phân cực</li>
</ul>
<h4>Tính chất vật lí (từ F₂ → I₂)</h4>
<div class="ls-formula">Trạng thái: khí → khí → lỏng → rắn
Màu sắc: vàng nhạt → vàng lục → nâu đỏ → tím đen
Nhiệt độ sôi: tăng (do tương tác van der Waals tăng)
I₂: có tính thăng hoa</div>
<h4>Tính chất hoá học</h4>
<ul>
  <li>Tính oxi hoá: F > Cl > Br > I</li>
  <li>Phản ứng với kim loại → muối halide</li>
  <li>Phản ứng với H₂: F₂ (nổ mạnh) > Cl₂ (gây nổ) > Br₂ < I₂ (thuận nghịch)</li>
  <li>Cl₂ + H₂O ⇌ HCl + HClO (tự oxi hoá – tự khử)</li>
</ul>
<h4>Hydrohalic acid và muối halide</h4>
<div class="ls-formula">Tính acid: HF (yếu) < HCl < HBr < HI (rất mạnh)
HF đặc biệt: ăn mòn thuỷ tinh (SiO₂ + 4HF → SiF₄ + 2H₂O)
Tính khử ion halide: F⁻ < Cl⁻ < Br⁻ < I⁻
Nhận biết bằng AgNO₃: Cl⁻ (trắng) − Br⁻ (vàng nhạt) − I⁻ (vàng đậm)</div>`
            }
          ],
          quiz: [
            {
              q: 'Dãy sắp xếp đúng các hydrohalic acid theo chiều tăng dần tính acid là:',
              opts: ['HCl < HBr < HI < HF', 'HF < HCl < HBr < HI', 'HI < HBr < HCl < HF', 'HF < HI < HBr < HCl'],
              ans: 1,
              explain: 'Năng lượng liên kết H–X giảm dần từ HF đến HI (569 > 432 > 366 > 299 kJ/mol) → khả năng phân li H⁺ tăng dần → tính acid tăng dần: HF (yếu) < HCl < HBr < HI (rất mạnh).'
            },
            {
              q: 'Thành phần chính của nước Javel là:',
              opts: ['NaCl và NaClO', 'NaCl và NaClO₃', 'KCl và KClO', 'CaCl₂ và Ca(ClO)₂'],
              ans: 0,
              explain: 'Nước Javel được tạo ra bằng phản ứng Cl₂ + 2NaOH → NaCl + NaClO + H₂O. Thành phần gồm: NaCl (sodium chloride) và NaClO (sodium hypochlorite) — chất có tính tẩy trắng và khử trùng.'
            },
            {
              q: 'Khi đổ dung dịch AgNO₃ vào dung dịch muối nào sau đây sẽ KHÔNG thấy kết tủa?',
              opts: ['NaF', 'NaCl', 'NaBr', 'NaI'],
              ans: 0,
              explain: 'AgF tan trong nước (không tạo kết tủa). Còn AgCl (trắng), AgBr (vàng nhạt), AgI (vàng đậm) đều là kết tủa ít tan.'
            },
            {
              q: 'Halogen nào thể hiện tính tự oxi hoá – tự khử khi tác dụng với nước?',
              opts: ['F₂', 'Cl₂', 'Br₂', 'I₂'],
              ans: 1,
              explain: 'Cl₂ + H₂O ⇌ HCl + HClO: Cl₂ (số oxh = 0) vừa bị oxi hoá (+1 trong HClO) vừa bị khử (−1 trong HCl) → tự oxi hoá − tự khử. F₂ phản ứng mãnh liệt tạo HF + O₂, không phải tự oxi hoá – tự khử.'
            },
            {
              q: 'Biết rằng E°(F₂/F⁻) > E°(Cl₂/Cl⁻) > E°(Br₂/Br⁻) > E°(I₂/I⁻). Phản ứng nào sau đây KHÔNG xảy ra?',
              opts: ['Cl₂ + 2NaBr → 2NaCl + Br₂', 'Br₂ + 2NaI → 2NaBr + I₂', 'F₂ + 2NaCl → 2NaF + Cl₂', 'I₂ + 2NaCl → 2NaI + Cl₂'],
              ans: 3,
              explain: 'Halogen có tính oxi hoá mạnh hơn mới đẩy được halogen yếu hơn ra khỏi dung dịch muối. I₂ có tính oxi hoá yếu hơn Cl₂ nên I₂ không đẩy được Cl⁻ thành Cl₂.'
            }
          ]
        }
      ]
    }
  ]
};
