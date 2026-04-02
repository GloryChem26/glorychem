window.DATA_11 = {
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
  };
