window.DATA_11 = {
  label: 'Lớp 11',
  icon: '⚗️',
  chapters: [
    // ==================== CHƯƠNG 1: CÂN BẰNG HÓA HỌC (giữ nguyên nội dung đã có) ====================
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
              body: `<p>Phản ứng hóa học chia làm 2 loại:</p>
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
              body: `<p>Trạng thái cân bằng hóa học đạt được khi <strong>tốc độ phản ứng thuận = tốc độ phản ứng nghịch</strong>.</p>
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
              body: `<p>Cho phản ứng: aA + bB ⇌ cC + dD</p>
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
              body: `<p><strong>Nguyên lý Le Chatelier</strong>: Nếu một hệ cân bằng chịu tác động từ bên ngoài (thay đổi nồng độ, nhiệt độ, áp suất), cân bằng sẽ dịch chuyển theo chiều chống lại sự thay đổi đó.</p>
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
            { q: 'Phản ứng nào sau đây là phản ứng thuận nghịch?', opts: ['2KClO₃ → 2KCl + 3O₂ (to)', 'N₂ + 3H₂ ⇌ 2NH₃', 'NaOH + HCl → NaCl + H₂O', 'Zn + 2HCl → ZnCl₂ + H₂↑'], ans: 1, explain: 'Ký hiệu ⇌ chỉ phản ứng thuận nghịch. N₂ + 3H₂ ⇌ 2NH₃ là phản ứng tổng hợp amoniac điển hình của Haber.' },
            { q: 'Tại trạng thái cân bằng hóa học, điều nào sau đây ĐÚNG?', opts: ['Phản ứng dừng lại hoàn toàn', 'Nồng độ chất đầu bằng nồng độ sản phẩm', 'Tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch', 'Chỉ còn lại sản phẩm'], ans: 2, explain: 'Cân bằng động: v₁ = v₂ ≠ 0. Nồng độ không đổi nhưng không nhất thiết bằng nhau.' },
            { q: 'Cho phản ứng: 2SO₂ + O₂ ⇌ 2SO₃ (ΔH < 0). Để tăng hiệu suất tạo SO₃, ta nên:', opts: ['Tăng nhiệt độ', 'Giảm áp suất', 'Tăng nồng độ SO₂', 'Thêm chất xúc tác để dịch chuyển cân bằng thuận'], ans: 2, explain: 'Tăng nồng độ chất đầu (SO₂) → CB dịch theo chiều thuận → tạo thêm SO₃. Chất xúc tác chỉ giúp đạt CB nhanh hơn, không dịch chuyển CB.' },
            { q: 'Kc của phản ứng H₂ + I₂ ⇌ 2HI được tính bằng:', opts: ['[HI]²/[H₂][I₂]', '[H₂][I₂]/[HI]²', '[HI]/[H₂][I₂]', '[H₂][I₂]/[HI]'], ans: 0, explain: 'Kc = [sản phẩm]^hệ số / [chất đầu]^hệ số = [HI]² / ([H₂][I₂])' },
            { q: 'Hằng số cân bằng Kc phụ thuộc vào yếu tố nào?', opts: ['Nồng độ chất đầu', 'Áp suất', 'Nhiệt độ', 'Chất xúc tác'], ans: 2, explain: 'Kc chỉ phụ thuộc vào nhiệt độ. Thay đổi nồng độ, áp suất hay chất xúc tác không làm thay đổi Kc.' }
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
              body: `<p><strong>Sự điện li</strong> là quá trình phân li của các chất tan ra thành ion trong dung dịch.</p>
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
              body: `<p>Nước tự điện li theo phương trình: H₂O ⇌ H⁺ + OH⁻</p>
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
              body: `<p>Phản ứng trao đổi ion trong dung dịch chất điện li xảy ra khi có ít nhất một trong các điều kiện:</p>
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
            { q: 'Dung dịch HCl 0,01M có pH = ?', opts: ['1', '2', '12', '13'], ans: 1, explain: 'HCl điện li mạnh: HCl → H⁺ + Cl⁻ → [H⁺] = 0,01 = 10⁻². pH = −log(10⁻²) = 2.' },
            { q: 'Tại 25°C, dung dịch có [OH⁻] = 10⁻³ M thì pH = ?', opts: ['3', '11', '4', '10'], ans: 1, explain: 'pOH = −log(10⁻³) = 3. pH = 14 − pOH = 14 − 3 = 11. Dung dịch có tính bazơ.' },
            { q: 'Chất nào sau đây là chất điện li mạnh?', opts: ['CH₃COOH', 'HF', 'NaOH', 'NH₃'], ans: 2, explain: 'NaOH là bazơ mạnh, điện li hoàn toàn: NaOH → Na⁺ + OH⁻. CH₃COOH, HF là axit yếu; NH₃ là bazơ yếu.' },
            { q: 'Phản ứng nào sau đây XẢY RA trong dung dịch?', opts: ['NaCl + KNO₃ → KCl + NaNO₃', 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl', 'KCl + NaOH → không phản ứng', 'HCl + NaNO₃ → không phản ứng'], ans: 1, explain: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl xảy ra vì tạo kết tủa BaSO₄ không tan.' },
            { q: 'Giá trị Kw = [H⁺][OH⁻] = 10⁻¹⁴ ở 25°C. Nếu [H⁺] = 10⁻⁵ M thì [OH⁻] = ?', opts: ['10⁻⁵ M', '10⁻⁹ M', '10⁻¹⁹ M', '10⁻⁴ M'], ans: 1, explain: '[OH⁻] = Kw / [H⁺] = 10⁻¹⁴ / 10⁻⁵ = 10⁻⁹ M.' }
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
              body: `<h4>1. Phản ứng thuận nghịch & Cân bằng hóa học</h4>
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
            { q: 'Cho N₂ + 3H₂ ⇌ 2NH₃ (ΔH = −92 kJ/mol). Biện pháp nào làm TĂNG hiệu suất NH₃?', opts: ['Tăng nhiệt độ', 'Giảm áp suất', 'Tăng nồng độ N₂ và H₂', 'Cho thêm xúc tác sắt (Fe)'], ans: 2, explain: 'Tăng nồng độ chất đầu → CB dịch thuận → tăng NH₃. Tăng nhiệt độ dịch nghịch (ΔH<0). Giảm áp suất dịch nghịch (chiều tăng mol khí).' },
            { q: 'Dung dịch HNO₃ 0,001M có pH = ?', opts: ['1', '2', '3', '4'], ans: 2, explain: 'HNO₃ là axit mạnh: [H⁺] = 0,001 = 10⁻³ M. pH = −log(10⁻³) = 3.' },
            { q: 'Kc > 1 cho phản ứng thuận nghịch aA ⇌ bB có ý nghĩa là:', opts: ['Tại cân bằng, nồng độ A > nồng độ B', 'Tại cân bằng, sản phẩm B chiếm ưu thế hơn chất đầu A', 'Phản ứng chưa đạt cân bằng', 'Phản ứng nghịch nhanh hơn phản ứng thuận'], ans: 1, explain: 'Kc = [B]ᵇ/[A]ᵃ > 1 → tử số > mẫu số → nồng độ sản phẩm cao hơn.' }
          ]
        }
      ]
    },
    // ==================== CHƯƠNG 2: NITROGEN – SULFUR ====================
    {
      id: 'c11-2',
      title: 'Chương 2: Nitrogen – Sulfur',
      icon: '🌿',
      lessons: [
        // Bài 1: Nitrogen
        {
          id: 'l11-2-1',
          title: 'Bài 4: Đơn chất Nitrogen',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '12 phút',
          sections: [
            {
              icon: '🌍', iconClass: 'icon-blue',
              title: '1. Trạng thái tự nhiên và cấu tạo',
              body: `<p><strong>Trạng thái tự nhiên:</strong> Trong khí quyển, nitrogen chiếm 78,1% thể tích. Trong vỏ Trái Đất, tồn tại dưới dạng muối nitrat (diêm tiêu Chile). Nitrogen là thành phần của protein, nucleic acid.</p>
<p><strong>Cấu tạo phân tử:</strong> N≡N, liên kết ba bền vững, năng lượng liên kết lớn (945 kJ/mol). Công thức electron: :N≡N: → phân tử không phân cực.</p>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Liên kết ba rất bền làm nitrogen trơ về mặt hóa học ở nhiệt độ thường.</span>
</div>`
            },
            {
              icon: '❄️', iconClass: 'icon-teal',
              title: '2. Tính chất vật lí',
              body: `<p>Nitrogen là chất khí không màu, không mùi, không vị, hóa lỏng ở -196°C, rất ít tan trong nước. Không duy trì sự cháy và hô hấp.</p>
<p><strong>Ứng dụng:</strong> Khí N₂ dùng để bảo quản thực phẩm, N₂ lỏng dùng bảo quản mẫu vật y tế, làm lạnh nhanh.</p>`
            },
            {
              icon: '⚡', iconClass: 'icon-amber',
              title: '3. Tính chất hóa học',
              body: `<p>Ở nhiệt độ thường N₂ khá trơ. Ở nhiệt độ cao, N₂ hoạt động hơn, thể hiện cả tính oxi hóa và tính khử.</p>
<ul>
  <li><strong>Tính oxi hóa:</strong> Tác dụng với H₂ (xúc tác Fe, t°, p) → NH₃: N₂ + 3H₂ ⇌ 2NH₃ (ΔH = -92 kJ).</li>
  <li><strong>Tính khử:</strong> Tác dụng với O₂ (t° rất cao hoặc tia lửa điện) → NO: N₂ + O₂ → 2NO (ΔH = +180,6 kJ). Trong tự nhiên, phản ứng này xảy ra khi có sấm sét, cung cấp đạm cho đất.</li>
</ul>
<div class="ls-formula">Quá trình tạo đạm từ nước mưa: N₂ → NO → NO₂ → HNO₃ → NO₃⁻</div>`
            }
          ],
          quiz: [
            { q: 'Ở điều kiện thường, đơn chất nitrogen có tính chất hóa học như thế nào?', opts: ['Rất hoạt động', 'Khá trơ', 'Phản ứng mạnh với kim loại', 'Phản ứng mạnh với oxi'], ans: 1, explain: 'Do liên kết ba bền, N₂ trơ ở nhiệt độ thường.' },
            { q: 'Trong phản ứng N₂ + 3H₂ ⇌ 2NH₃, nitrogen thể hiện tính chất gì?', opts: ['Tính khử', 'Tính oxi hóa', 'Tính base', 'Tính acid'], ans: 1, explain: 'Số oxi hóa của N giảm từ 0 xuống -3 → N₂ là chất oxi hóa.' },
            { q: 'Trong tự nhiên, quá trình nào cung cấp đạm nitrate cho đất từ nitrogen?', opts: ['Phản ứng N₂ với H₂', 'Phản ứng N₂ với O₂ khi có sấm sét', 'Phản ứng N₂ với kim loại', 'Phản ứng N₂ với nước'], ans: 1, explain: 'Sấm sét tạo NO, sau đó chuyển thành HNO₃ rồi NO₃⁻.' },
            { q: 'Nguyên nhân chính làm nitrogen khó hóa lỏng và ít tan trong nước là do:', opts: ['Phân tử khối nhỏ', 'Liên kết ba bền', 'Tương tác van der Waals yếu', 'Phân tử phân cực'], ans: 2, explain: 'Giữa các phân tử N₂ chỉ có lực van der Waals yếu, không có liên kết hydro.' },
            { q: 'Ứng dụng nào sau đây KHÔNG phải của nitrogen?', opts: ['Bảo quản thực phẩm', 'Làm lạnh nhanh trong y tế', 'Sản xuất phân đạm (NH₃)', 'Sản xuất pin mặt trời'], ans: 3, explain: 'Nitrogen dùng để tổng hợp NH₃, bảo quản, làm lạnh, không dùng sản xuất pin mặt trời.' }
          ]
        },
        // Bài 2: Ammonia và muối ammonium
        {
          id: 'l11-2-2',
          title: 'Bài 5: Ammonia và Muối Ammonium',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '14 phút',
          sections: [
            {
              icon: '🧪', iconClass: 'icon-blue',
              title: '1. Cấu tạo và tính chất vật lí của NH₃',
              body: `<p><strong>Cấu tạo:</strong> Phân tử NH₃ có dạng chóp tam giác, góc HNH ≈ 107°, liên kết N–H phân cực, còn một cặp electron chưa liên kết trên N.</p>
<p><strong>Tính chất vật lí:</strong> Khí không màu, mùi khai, nhẹ hơn không khí, tan rất nhiều trong nước (1 lít nước hòa tan 700 lít NH₃). NH₃ dễ hóa lỏng (-33,3°C).</p>
<div class="ls-callout info">Do tạo liên kết hydro với nước nên NH₃ tan tốt.</div>`
            },
            {
              icon: '🧴', iconClass: 'icon-teal',
              title: '2. Tính chất hóa học của NH₃',
              body: `<ul>
  <li><strong>Tính base yếu:</strong> NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ (quỳ tím → xanh). Tác dụng với axit: NH₃ + HCl → NH₄Cl (khói trắng).</li>
  <li><strong>Tính khử mạnh:</strong> 
    <ul><li>Cháy trong O₂: 4NH₃ + 3O₂ → 2N₂ + 6H₂O</li>
    <li>Oxi hóa có xúc tác: 4NH₃ + 5O₂ → 4NO + 6H₂O (sản xuất HNO₃)</li></ul>
  </li>
</ul>
<div class="ls-formula">NH₃ đóng vai trò chất khử do N có số oxi hóa -3 (thấp nhất).</div>`
            },
            {
              icon: '🧂', iconClass: 'icon-amber',
              title: '3. Muối ammonium',
              body: `<p>Muối ammonium là chất điện li mạnh, dễ tan, kém bền nhiệt.</p>
<ul>
  <li><strong>Tác dụng với kiềm:</strong> NH₄⁺ + OH⁻ → NH₃↑ + H₂O (nhận biết ion NH₄⁺).</li>
  <li><strong>Phản ứng nhiệt phân:</strong> NH₄Cl → NH₃ + HCl; NH₄NO₃ → N₂O + 2H₂O; NH₄NO₂ → N₂ + 2H₂O.</li>
</ul>
<p><strong>Ứng dụng:</strong> Làm phân bón (NH₄NO₃, (NH₄)₂SO₄), thuốc nổ (NH₄NO₃).</p>`
            }
          ],
          quiz: [
            { q: 'Dung dịch NH₃ 0,1M làm quỳ tím chuyển màu gì?', opts: ['Đỏ', 'Xanh', 'Tím', 'Vàng'], ans: 1, explain: 'NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ → môi trường base → quỳ xanh.' },
            { q: 'Trong phản ứng 4NH₃ + 5O₂ → 4NO + 6H₂O, NH₃ thể hiện tính chất gì?', opts: ['Tính base', 'Tính oxi hóa', 'Tính khử', 'Tính acid'], ans: 2, explain: 'Số oxi hóa của N tăng từ -3 lên +2 → NH₃ là chất khử.' },
            { q: 'Hiện tượng xảy ra khi cho dung dịch NH₃ đặc vào dung dịch CuSO₄ là:', opts: ['Kết tủa xanh, tan dần', 'Kết tủa đỏ nâu', 'Sủi bọt khí', 'Không hiện tượng'], ans: 0, explain: 'Ban đầu tạo Cu(OH)₂ xanh, sau đó tan trong NH₃ dư tạo phức [Cu(NH₃)₄]²⁺ xanh thẫm.' },
            { q: 'Để nhận biết ion NH₄⁺ trong dung dịch, ta dùng thuốc thử:', opts: ['Dung dịch AgNO₃', 'Dung dịch NaOH, đun nhẹ', 'Dung dịch BaCl₂', 'Quỳ tím'], ans: 1, explain: 'NH₄⁺ + OH⁻ → NH₃↑ (mùi khai) → nhận biết.' },
            { q: 'Muối ammonium nào sau đây được dùng làm chất nổ?', opts: ['NH₄Cl', '(NH₄)₂SO₄', 'NH₄NO₃', 'NH₄HCO₃'], ans: 2, explain: 'NH₄NO₃ bị phân hủy nhanh tạo N₂, O₂, H₂O, tỏa nhiệt mạnh → gây nổ.' }
          ]
        },
        // Bài 3: Một số hợp chất của nitrogen với oxygen (NOx, HNO₃)
        {
          id: 'l11-2-3',
          title: 'Bài 6: Một số hợp chất của nitrogen với oxygen',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '13 phút',
          sections: [
            {
              icon: '🌫️', iconClass: 'icon-blue',
              title: '1. Các oxide của nitrogen (NOx)',
              body: `<p><strong>NO (nitrogen monoxide):</strong> Khí không màu, hóa nâu trong không khí (do tạo NO₂).</p>
<p><strong>NO₂ (nitrogen dioxide):</strong> Khí nâu đỏ, độc, là nguyên nhân chính gây mưa acid.</p>
<p><strong>Nguồn phát thải NOx:</strong> Nhiệt độ cao (động cơ đốt trong, nhà máy nhiệt điện), nitrogen trong nhiên liệu, sấm sét.</p>
<div class="ls-callout warn">NOx gây viêm đường hô hấp, mưa acid, phá hủy tầng ozone.</div>`
            },
            {
              icon: '☔', iconClass: 'icon-teal',
              title: '2. Mưa acid',
              body: `<p>Nước mưa bình thường có pH ≈ 5,6 do CO₂ hòa tan. Mưa acid có pH < 5,6, chủ yếu do SO₂ và NOx chuyển hóa thành H₂SO₄, HNO₃.</p>
<div class="ls-formula">2NO₂ + O₂ + 2H₂O → 4HNO₃</div>
<p><strong>Tác hại:</strong> Phá hủy thực vật, ăn mòn công trình, ảnh hưởng sức khỏe.</p>`
            },
            {
              icon: '🧪', iconClass: 'icon-amber',
              title: '3. Nitric acid (HNO₃)',
              body: `<ul>
  <li><strong>Cấu tạo:</strong> N có số oxi hóa +5 (cao nhất).</li>
  <li><strong>Tính acid mạnh:</strong> HNO₃ → H⁺ + NO₃⁻ (phân li hoàn toàn).</li>
  <li><strong>Tính oxi hóa mạnh:</strong> 
    <ul><li>Với kim loại (trừ Au, Pt): giải phóng NO₂ (đặc) hoặc NO, N₂O, N₂ (loãng).</li>
    <li>Với phi kim: C + 4HNO₃ → CO₂ + 4NO₂ + 2H₂O.</li>
    <li>Thụ động hóa Al, Fe, Cr trong HNO₃ đặc nguội.</li></ul>
  </li>
</ul>
<p><strong>Ứng dụng:</strong> Sản xuất phân bón, thuốc nổ (TNT), chất oxi hóa.</p>`
            }
          ],
          quiz: [
            { q: 'Khí NO₂ có màu gì?', opts: ['Không màu', 'Trắng', 'Nâu đỏ', 'Xanh lục'], ans: 2, explain: 'NO₂ là khí màu nâu đỏ đặc trưng.' },
            { q: 'Nguyên nhân chính gây mưa acid là do các khí:', opts: ['CO₂ và CH₄', 'SO₂ và NOx', 'CO và O₃', 'H₂S và NH₃'], ans: 1, explain: 'SO₂ và NOx chuyển hóa thành H₂SO₄, HNO₃ trong nước mưa.' },
            { q: 'Khi cho mảnh đồng vào dung dịch HNO₃ đặc, nóng, hiện tượng quan sát được là:', opts: ['Có khí không màu thoát ra', 'Dung dịch chuyển xanh, khí nâu đỏ', 'Không hiện tượng', 'Có kết tủa đen'], ans: 1, explain: 'Cu + 4HNO₃ đặc → Cu(NO₃)₂ (xanh) + 2NO₂ (nâu đỏ) + 2H₂O.' },
            { q: 'Kim loại nào sau đây bị thụ động hóa trong HNO₃ đặc nguội?', opts: ['Cu', 'Ag', 'Fe', 'Zn'], ans: 2, explain: 'Al, Fe, Cr bị thụ động do tạo màng oxit bảo vệ.' },
            { q: 'Trong phản ứng của HNO₃ với kim loại, số oxi hóa của N thay đổi như thế nào?', opts: ['Từ +5 xuống thấp hơn', 'Từ +5 lên +7', 'Không đổi', 'Từ +3 lên +5'], ans: 0, explain: 'HNO₃ là chất oxi hóa, N(+5) bị khử xuống các số oxi hóa thấp hơn.' }
          ]
        },
        // Bài 4: Sulfur và sulfur dioxide
        {
          id: 'l11-2-4',
          title: 'Bài 7: Sulfur và Sulfur Dioxide',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '12 phút',
          sections: [
            {
              icon: '🟡', iconClass: 'icon-blue',
              title: '1. Sulfur (S)',
              body: `<p><strong>Trạng thái tự nhiên:</strong> Dạng đơn chất (vùng núi lửa) và hợp chất (sulfide, sulfate).</p>
<p><strong>Cấu tạo:</strong> Phân tử S₈ dạng vòng. S có số oxi hóa từ -2 đến +6.</p>
<p><strong>Tính chất vật lí:</strong> Chất rắn vàng, không tan trong nước, tan trong CS₂, nóng chảy ở 113°C.</p>
<p><strong>Tính chất hóa học:</strong> Vừa có tính oxi hóa vừa có tính khử.</p>
<ul>
  <li>Tính oxi hóa: S + H₂ → H₂S; S + Fe → FeS.</li>
  <li>Tính khử: S + O₂ → SO₂; S + F₂ → SF₆.</li>
</ul>`
            },
            {
              icon: '💨', iconClass: 'icon-teal',
              title: '2. Sulfur dioxide (SO₂)',
              body: `<p><strong>Tính chất vật lí:</strong> Khí không màu, mùi hắc, nặng hơn không khí, tan nhiều trong nước, độc.</p>
<p><strong>Tính chất hóa học:</strong> Là oxide acid, vừa có tính oxi hóa vừa có tính khử.</p>
<ul>
  <li>Tính khử (chủ yếu): 2SO₂ + O₂ ⇌ 2SO₃ (xúc tác V₂O₅, t°).</li>
  <li>Tính oxi hóa: SO₂ + 2H₂S → 3S + 2H₂O.</li>
  <li>Làm mất màu dung dịch Br₂, KMnO₄.</li>
</ul>
<p><strong>Ứng dụng:</strong> Sản xuất H₂SO₄, tẩy trắng bột giấy, diệt nấm mốc.</p>
<div class="ls-callout warn">SO₂ là nguyên nhân chính gây mưa acid, viêm đường hô hấp.</div>`
            }
          ],
          quiz: [
            { q: 'Sulfur thể hiện tính oxi hóa khi tác dụng với chất nào sau đây?', opts: ['O₂', 'F₂', 'H₂', 'HNO₃ đặc nóng'], ans: 2, explain: 'S + H₂ → H₂S, S nhận electron (từ 0 xuống -2) → tính oxi hóa.' },
            { q: 'SO₂ vừa có tính oxi hóa vừa có tính khử vì trong phân tử S có số oxi hóa:', opts: ['+4 (trung gian)', '-2 (thấp nhất)', '0', '+6 (cao nhất)'], ans: 0, explain: 'Số oxi hóa +4 có thể tăng lên +6 (khử) hoặc giảm xuống 0, -2 (oxi hóa).' },
            { q: 'Phản ứng được dùng để sản xuất H₂SO₄ trong công nghiệp từ SO₂ là:', opts: ['SO₂ + H₂O → H₂SO₃', '2SO₂ + O₂ → 2SO₃', 'SO₂ + Br₂ + 2H₂O → H₂SO₄ + 2HBr', 'SO₂ + 2H₂S → 3S + 2H₂O'], ans: 1, explain: 'SO₂ bị oxi hóa thành SO₃, sau đó SO₃ + H₂O → H₂SO₄.' },
            { q: 'Thuốc thử để nhận biết khí SO₂ là:', opts: ['Dung dịch Ca(OH)₂', 'Dung dịch Br₂', 'Dung dịch AgNO₃', 'Quỳ tím ẩm'], ans: 1, explain: 'SO₂ làm mất màu dung dịch Br₂ do tính khử.' },
            { q: 'Khi đốt cháy S trong không khí, sản phẩm chính là:', opts: ['SO₃', 'SO₂', 'H₂S', 'S₈'], ans: 1, explain: 'S + O₂ → SO₂ (lưu huỳnh đioxit).' }
          ]
        },
        // Bài 5: Sulfuric acid và muối sulfate
        {
          id: 'l11-2-5',
          title: 'Bài 8: Sulfuric Acid và Muối Sulfate',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '15 phút',
          sections: [
            {
              icon: '⚠️', iconClass: 'icon-blue',
              title: '1. Tính chất vật lí và an toàn',
              body: `<p>H₂SO₄ là chất lỏng sánh như dầu, không màu, nặng gấp 2 lần nước (d=1,84 g/mL). Tan vô hạn trong nước, tỏa nhiệt mạnh.</p>
<div class="ls-callout warn">Khi pha loãng, <strong>phải rót acid vào nước</strong> (không làm ngược lại) để tránh acid bắn ra gây bỏng.</div>
<p><strong>Tính háo nước:</strong> Hút mạnh nước từ các hợp chất, làm than hóa đường, giấy, vải.</p>
<p><strong>An toàn:</strong> Đeo kính, găng tay, áo thí nghiệm; nếu bị bỏng → rửa nước lạnh, trung hòa NaHCO₃ loãng, đến cơ sở y tế.</p>`
            },
            {
              icon: '⚗️', iconClass: 'icon-teal',
              title: '2. Tính chất hóa học',
              body: `<ul>
  <li><strong>Dung dịch H₂SO₄ loãng:</strong> Có tính acid mạnh (làm quỳ đỏ, tác dụng với kim loại trước H, oxit base, base, muối carbonat).</li>
  <li><strong>H₂SO₄ đặc, nóng:</strong> Tính oxi hóa mạnh. Oxi hóa hầu hết kim loại (kể cả Cu, Ag) lên số oxi hóa cao, giải phóng SO₂; thụ động hóa Al, Fe, Cr trong nguội.
    <div class="ls-formula">Cu + 2H₂SO₄ đặc → CuSO₄ + SO₂↑ + 2H₂O</div>
  </li>
  <li><strong>Tính háo nước:</strong> C₁₂H₂₂O₁₁ → 12C + 11H₂O (than hóa).</li>
</ul>`
            },
            {
              icon: '🏭', iconClass: 'icon-amber',
              title: '3. Sản xuất và ứng dụng',
              body: `<p><strong>Phương pháp tiếp xúc:</strong></p>
<ul>
  <li>Đốt S hoặc quặng pyrite: S + O₂ → SO₂</li>
  <li>Oxi hóa SO₂ thành SO₃: 2SO₂ + O₂ ⇌ 2SO₃ (xúc tác V₂O₅, 450°C)</li>
  <li>Hấp thụ SO₃ vào H₂SO₄ đặc thành oleum, sau đó pha loãng: H₂SO₄.nSO₃ + H₂O → (n+1)H₂SO₄</li>
</ul>
<p><strong>Ứng dụng:</strong> Sản xuất phân bón, pin ắc quy, chất tẩy rửa, xử lý nước thải.</p>
<p><strong>Muối sulfate:</strong> BaSO₄ (trắng, không tan) dùng nhận biết SO₄²⁻. CaSO₄.2H₂O (thạch cao), CuSO₄.5H₂O (xanh, diệt nấm).</p>`
            }
          ],
          quiz: [
            { q: 'Khi pha loãng H₂SO₄ đặc, thao tác đúng là:', opts: ['Rót nước vào acid', 'Rót acid vào nước', 'Đổ nhanh cả hai', 'Đun nóng trước khi trộn'], ans: 1, explain: 'Acid tỏa nhiệt mạnh, rót acid vào nước để tránh sôi bắn.' },
            { q: 'Dung dịch H₂SO₄ loãng không tác dụng với kim loại nào sau đây?', opts: ['Mg', 'Zn', 'Fe', 'Cu'], ans: 3, explain: 'Cu đứng sau H trong dãy điện hóa, không phản ứng với acid loãng.' },
            { q: 'Sản phẩm khử thường gặp khi cho H₂SO₄ đặc nóng tác dụng với kim loại là:', opts: ['H₂', 'SO₂', 'S', 'H₂S'], ans: 1, explain: 'H₂SO₄ đặc bị khử thành SO₂ (mùi hắc).' },
            { q: 'Thuốc thử để nhận biết ion SO₄²⁻ trong dung dịch là:', opts: ['Dung dịch AgNO₃', 'Dung dịch BaCl₂', 'Quỳ tím', 'Dung dịch NaOH'], ans: 1, explain: 'Ba²⁺ + SO₄²⁻ → BaSO₄↓ trắng, không tan trong acid.' },
            { q: 'Trong công nghiệp sản xuất H₂SO₄ bằng phương pháp tiếp xúc, giai đoạn quan trọng nhất là:', opts: ['Đốt S', 'Oxi hóa SO₂ thành SO₃', 'Hấp thụ SO₃ vào nước', 'Làm sạch khí'], ans: 1, explain: 'Phản ứng 2SO₂ + O₂ ⇌ 2SO₃ có xúc tác, hiệu suất phụ thuộc nhiều vào điều kiện.' }
          ]
        }
      ]
    },
    // ==================== CHƯƠNG 3: ĐẠI CƯƠNG VỀ HÓA HỌC HỮU CƠ ====================
    {
      id: 'c11-3',
      title: 'Chương 3: Đại cương về hóa học hữu cơ',
      icon: '🧬',
      lessons: [
        // Bài 1: Hợp chất hữu cơ và hóa học hữu cơ
        {
          id: 'l11-3-1',
          title: 'Bài 9: Hợp chất hữu cơ và hóa học hữu cơ',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '10 phút',
          sections: [
            {
              icon: '🌱', iconClass: 'icon-blue',
              title: '1. Khái niệm và đặc điểm',
              body: `<p><strong>Hợp chất hữu cơ</strong> là hợp chất của carbon (trừ CO, CO₂, muối carbonate, cyanide, carbide).</p>
<p><strong>Đặc điểm chung:</strong></p>
<ul>
  <li>Thành phần nhất thiết có C, thường có H, O, N, halogen, S, P.</li>
  <li>Liên kết hóa học chủ yếu là liên kết cộng hóa trị.</li>
  <li>Nhiệt độ nóng chảy, nhiệt độ sôi thấp, dễ bay hơi.</li>
  <li>Thường không tan hoặc ít tan trong nước, tan trong dung môi hữu cơ.</li>
  <li>Dễ cháy, phản ứng xảy ra chậm, không hoàn toàn, theo nhiều hướng.</li>
</ul>`
            },
            {
              icon: '🔖', iconClass: 'icon-teal',
              title: '2. Phân loại',
              body: `<ul>
  <li><strong>Hydrocarbon:</strong> Chỉ gồm C và H (alkane, alkene, alkyne, arene).</li>
  <li><strong>Dẫn xuất của hydrocarbon:</strong> Thay thế H bằng nhóm chức (dẫn xuất halogen, alcohol, aldehyde, ketone, carboxylic acid, ester, amine...).</li>
</ul>`
            },
            {
              icon: '🔬', iconClass: 'icon-amber',
              title: '3. Nhóm chức và phổ IR',
              body: `<p><strong>Nhóm chức</strong> là nguyên tử hoặc nhóm nguyên tử gây ra tính chất hóa học đặc trưng.</p>
<p>Ví dụ: –OH (alcohol), –CHO (aldehyde), –COOH (carboxylic acid), –NH₂ (amine).</p>
<p><strong>Phổ hồng ngoại (IR):</strong> Dựa vào số sóng hấp thụ đặc trưng (cm⁻¹) để xác định nhóm chức. O–H: 3200-3600, C=O: 1700-1750, C–O: 1000-1300.</p>`
            }
          ],
          quiz: [
            { q: 'Chất nào sau đây KHÔNG phải hợp chất hữu cơ?', opts: ['CH₄', 'C₂H₅OH', 'CO₂', 'C₆H₁₂O₆'], ans: 2, explain: 'CO₂ là hợp chất vô cơ (oxide carbon).' },
            { q: 'Đặc điểm nào sau đây là đúng cho hầu hết hợp chất hữu cơ?', opts: ['Tan nhiều trong nước', 'Liên kết ion', 'Phản ứng xảy ra nhanh', 'Nhiệt độ sôi thấp'], ans: 3, explain: 'HCHC thường có nhiệt độ sôi thấp do liên kết cộng hóa trị và lực liên phân tử yếu.' },
            { q: 'Nhóm chức của alcohol là:', opts: ['–OH liên kết với C no', '–OH liên kết với vòng benzene', '–O–', '–CHO'], ans: 0, explain: 'Alcohol có nhóm –OH gắn với carbon no (sp³).' },
            { q: 'Phổ IR thường được dùng để:', opts: ['Xác định phân tử khối', 'Xác định nhóm chức', 'Xác định nhiệt độ sôi', 'Xác định cấu trúc tinh thể'], ans: 1, explain: 'Mỗi nhóm chức hấp thụ bức xạ hồng ngoại ở số sóng đặc trưng.' },
            { q: 'Hợp chất chỉ chứa carbon và hydrogen được gọi là:', opts: ['Dẫn xuất halogen', 'Hydrocarbon', 'Alcohol', 'Aldehyde'], ans: 1, explain: 'Hydrocarbon là hợp chất hữu cơ chỉ gồm C và H.' }
          ]
        },
        // Bài 2: Phương pháp tách và tinh chế hợp chất hữu cơ
        {
          id: 'l11-3-2',
          title: 'Bài 10: Phương pháp tách biệt và tinh chế hợp chất hữu cơ',
          tag: 'Thực hành · Lớp 11',
          readTime: '12 phút',
          sections: [
            {
              icon: '🌡️', iconClass: 'icon-blue',
              title: '1. Phương pháp chưng cất',
              body: `<p><strong>Nguyên tắc:</strong> Dựa vào sự khác nhau về nhiệt độ sôi của các chất trong hỗn hợp.</p>
<ul>
  <li><strong>Chưng cất thường:</strong> Tách chất lỏng có nhiệt độ sôi chênh lệch lớn (tách ethanol khỏi nước).</li>
  <li><strong>Chưng cất phân đoạn:</strong> Tách hỗn hợp các chất lỏng có nhiệt độ sôi gần nhau (chưng cất dầu mỏ).</li>
  <li><strong>Chưng cất lôi cuốn hơi nước:</strong> Tách chất hữu cơ không tan trong nước, nhiệt độ sôi cao.</li>
</ul>`
            },
            {
              icon: '🧴', iconClass: 'icon-teal',
              title: '2. Phương pháp chiết',
              body: `<p><strong>Nguyên tắc:</strong> Dựa vào độ tan khác nhau của chất trong hai dung môi không trộn lẫn.</p>
<p><strong>Chiết lỏng – lỏng:</strong> Dùng phễu chiết để tách chất hữu cơ khỏi nước bằng dung môi hữu cơ (ether, hexane).</p>
<p><strong>Chiết lỏng – rắn:</strong> Dùng dung môi hòa tan chất hữu cơ từ hỗn hợp rắn (ngâm rượu thuốc, tách tinh dầu).</p>`
            },
            {
              icon: '❄️', iconClass: 'icon-amber',
              title: '3. Phương pháp kết tinh và sắc kí',
              body: `<p><strong>Kết tinh:</strong> Dựa vào độ tan khác nhau theo nhiệt độ. Hòa tan ở nhiệt độ cao, làm lạnh → tinh thể chất tan kết tinh, tạp chất ở lại dung dịch.</p>
<p><strong>Sắc kí cột:</strong> Dựa vào khả năng hấp phụ khác nhau của các chất trên pha tĩnh (silica gel, Al₂O₃). Pha động (dung môi) chảy qua cột, các chất được tách ra theo từng phân đoạn.</p>`
            }
          ],
          quiz: [
            { q: 'Để tách ethanol ra khỏi hỗn hợp với nước, người ta dùng phương pháp:', opts: ['Chiết', 'Chưng cất', 'Kết tinh', 'Sắc kí'], ans: 1, explain: 'Ethanol và nước có nhiệt độ sôi khác nhau (78,3°C và 100°C) nên chưng cất thường.' },
            { q: 'Trong phễu chiết, dung môi chiết thường có khối lượng riêng:', opts: ['Lớn hơn nước', 'Nhỏ hơn nước', 'Bằng nước', 'Bất kỳ'], ans: 1, explain: 'Thường dùng dung môi nhẹ hơn nước (ether, hexane) để ở lớp trên, dễ tách.' },
            { q: 'Phương pháp kết tinh dùng để tinh chế chất rắn dựa trên:', opts: ['Sự thăng hoa', 'Sự khác nhau về nhiệt độ sôi', 'Sự thay đổi độ tan theo nhiệt độ', 'Sự hấp phụ'], ans: 2, explain: 'Hòa tan nóng, làm lạnh → chất tan kết tinh, tạp chất tan.' },
            { q: 'Sắc kí cột tách các chất dựa vào:', opts: ['Khối lượng riêng', 'Tốc độ bay hơi', 'Khả năng hấp phụ khác nhau', 'Nhiệt độ nóng chảy'], ans: 2, explain: 'Các chất bị hấp phụ khác nhau trên pha tĩnh, di chuyển với tốc độ khác nhau.' },
            { q: 'Phương pháp nào thường dùng để tách tinh dầu từ vỏ bưởi (chất lỏng không tan trong nước, dễ bay hơi)?', opts: ['Chưng cất lôi cuốn hơi nước', 'Chiết lỏng – rắn', 'Kết tinh', 'Sắc kí cột'], ans: 0, explain: 'Chưng cất lôi cuốn hơi nước tách tinh dầu khỏi nguyên liệu thực vật.' }
          ]
        },
        // Bài 3: Công thức phân tử hợp chất hữu cơ
        {
          id: 'l11-3-3',
          title: 'Bài 11: Công thức phân tử hợp chất hữu cơ',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '9 phút',
          sections: [
            {
              icon: '📊', iconClass: 'icon-blue',
              title: '1. Công thức đơn giản nhất',
              body: `<p>Cho biết tỉ lệ tối giản về số nguyên tử các nguyên tố trong phân tử.</p>
<div class="ls-formula">x : y : z = (m_C/12) : (m_H/1) : (m_O/16) = p : q : r (số nguyên tối giản)</div>
<p>Công thức đơn giản nhất: C<sub>p</sub>H<sub>q</sub>O<sub>r</sub></p>`
            },
            {
              icon: '⚖️', iconClass: 'icon-teal',
              title: '2. Xác định phân tử khối bằng phổ khối lượng (MS)',
              body: `<p>Trên phổ khối lượng, peak có giá trị m/z lớn nhất (thường) ứng với ion phân tử [M⁺], giá trị đó chính là phân tử khối.</p>
<p>Ví dụ: Ethanol có peak m/z = 46 → M = 46 g/mol.</p>`
            },
            {
              icon: '🔢', iconClass: 'icon-amber',
              title: '3. Lập công thức phân tử',
              body: `<p>Từ công thức đơn giản nhất C<sub>p</sub>H<sub>q</sub>O<sub>r</sub> và phân tử khối M, ta có:</p>
<div class="ls-formula">(C<sub>p</sub>H<sub>q</sub>O<sub>r</sub>)<sub>n</sub> = M → n = M / (12p + q + 16r)</div>
<p>Ví dụ: Camphor có CTĐGN C₁₀H₁₆O, M=152 → n=152/(120+16+16)=1 → CTPT C₁₀H₁₆O.</p>`
            }
          ],
          quiz: [
            { q: 'Công thức đơn giản nhất cho biết:', opts: ['Số lượng nguyên tử mỗi nguyên tố', 'Tỉ lệ tối giản các nguyên tử', 'Cấu trúc phân tử', 'Khối lượng phân tử'], ans: 1, explain: 'CTĐGN chỉ cho biết tỉ lệ số nguyên tử ở dạng tối giản.' },
            { q: 'Trên phổ khối lượng, giá trị m/z của peak ion phân tử [M⁺] bằng:', opts: ['Phân tử khối', 'Nguyên tử khối', 'Số khối của đồng vị', 'Năng lượng liên kết'], ans: 0, explain: 'Ion phân tử [M⁺] có m/z đúng bằng phân tử khối.' },
            { q: 'Một chất có CTĐGN là CH₂O và phân tử khối 60. CTPT của chất là:', opts: ['CH₂O', 'C₂H₄O₂', 'C₃H₆O₃', 'C₄H₈O₄'], ans: 1, explain: 'M = 12+2+16=30; n = 60/30 = 2 → C₂H₄O₂.' },
            { q: 'Phân tích nguyên tố cho thấy một hợp chất có %C = 40%, %H = 6,67%, còn lại O. Công thức đơn giản nhất là:', opts: ['CH₂O', 'C₂H₄O', 'CH₃O', 'C₃H₆O₂'], ans: 0, explain: 'Tỉ lệ C:H:O = (40/12):(6,67/1):(53,33/16)=3,33:6,67:3,33=1:2:1 → CH₂O.' },
            { q: 'Phổ khối lượng của một chất cho peak M⁺ = 92. Biết chất này chỉ gồm C và H, công thức phân tử có thể là:', opts: ['C₆H₆', 'C₇H₈', 'C₈H₁₀', 'C₇H₁₆'], ans: 1, explain: 'C₇H₈ có M = 12*7+8 = 92.' }
          ]
        },
        // Bài 4: Cấu tạo phân tử hợp chất hữu cơ
        {
          id: 'l11-3-4',
          title: 'Bài 12: Cấu tạo phân tử hợp chất hữu cơ',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '11 phút',
          sections: [
            {
              icon: '🔗', iconClass: 'icon-blue',
              title: '1. Thuyết cấu tạo hóa học',
              body: `<p><strong>Nội dung:</strong></p>
<ul>
  <li>Các nguyên tử liên kết với nhau theo đúng hóa trị và theo một thứ tự nhất định (cấu tạo hóa học).</li>
  <li>Carbon có hóa trị IV, các nguyên tử carbon có thể liên kết trực tiếp tạo thành mạch (hở, nhánh, vòng).</li>
  <li>Tính chất phụ thuộc vào thành phần và cấu tạo hóa học; các nhóm nguyên tử ảnh hưởng lẫn nhau.</li>
</ul>`
            },
            {
              icon: '✍️', iconClass: 'icon-teal',
              title: '2. Công thức cấu tạo',
              body: `<p>Biểu diễn thứ tự liên kết giữa các nguyên tử. Có hai dạng:</p>
<ul>
  <li><strong>Công thức cấu tạo đầy đủ:</strong> viết tất cả các liên kết.</li>
  <li><strong>Công thức cấu tạo thu gọn:</strong> nhóm các nguyên tử cùng liên kết với một C thành nhóm (CH₃, CH₂...).</li>
  <li><strong>Công thức khung phân tử:</strong> mỗi đầu gấp khúc là C, không viết H (chỉ dùng cho mạch C).</li>
</ul>`
            },
            {
              icon: '🧩', iconClass: 'icon-amber',
              title: '3. Đồng phân và đồng đẳng',
              body: `<ul>
  <li><strong>Đồng phân:</strong> Cùng CTPT, khác CTCT → khác tính chất. Gồm đồng phân mạch C, vị trí nhóm chức, loại nhóm chức.</li>
  <li><strong>Đồng phân hình học (cis-trans):</strong> Xảy ra khi liên kết đôi C=C, mỗi C mang hai nhóm thế khác nhau.</li>
  <li><strong>Đồng đẳng:</strong> Hơn kém nhau một hay nhiều nhóm CH₂, có tính chất hóa học tương tự.</li>
</ul>`
            }
          ],
          quiz: [
            { q: 'Theo thuyết cấu tạo hóa học, trong phân tử chất hữu cơ, carbon có hóa trị:', opts: ['II', 'III', 'IV', 'I'], ans: 2, explain: 'Carbon luôn có hóa trị IV.' },
            { q: 'Cặp chất nào sau đây là đồng phân của nhau?', opts: ['CH₃CH₂OH và CH₃OCH₃', 'CH₄ và C₂H₆', 'CH₃COOH và C₂H₅OH', 'C₂H₄ và C₃H₆'], ans: 0, explain: 'Cùng CTPT C₂H₆O nhưng CTCT khác nhau (alcohol và ether).' },
            { q: 'Điều kiện để có đồng phân hình học ở alkene là:', opts: ['Mỗi C của liên kết đôi liên kết với hai nguyên tử hoặc nhóm nguyên tử khác nhau', 'Có nhóm thế alkyl', 'Mạch carbon phân nhánh', 'Có vòng benzene'], ans: 0, explain: 'Các nhóm thế trên mỗi C của liên kết đôi phải khác nhau.' },
            { q: 'Dãy chất nào sau đây là dãy đồng đẳng của nhau?', opts: ['CH₄, C₂H₄, C₃H₆', 'C₂H₂, C₃H₄, C₄H₆', 'CH₃OH, C₂H₅OH, C₃H₇OH', 'C₆H₆, C₇H₈, C₈H₁₀'], ans: 2, explain: 'Các alcohol no, đơn chức hơn kém CH₂.' },
            { q: 'Công thức cấu tạo thu gọn của butan-2-ol là:', opts: ['CH₃CH(OH)CH₂CH₃', 'CH₃CH₂CH₂CH₂OH', '(CH₃)₃COH', 'CH₃OCH₂CH₃'], ans: 0, explain: 'Butan-2-ol có OH ở C số 2, mạch 4C.' }
          ]
        }
      ]
    },
    // ==================== CHƯƠNG 4: HYDROCARBON ====================
    {
      id: 'c11-4',
      title: 'Chương 4: Hydrocarbon',
      icon: '⛽',
      lessons: [
        // Bài 1: Alkane
        {
          id: 'l11-4-1',
          title: 'Bài 13: Alkane',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '15 phút',
          sections: [
            {
              icon: '🛢️', iconClass: 'icon-blue',
              title: '1. Khái niệm, danh pháp',
              body: `<p><strong>Alkane</strong> là hydrocarbon no, mạch hở, chỉ chứa liên kết đơn. Công thức chung: C<sub>n</sub>H<sub>2n+2</sub> (n≥1).</p>
<p><strong>Danh pháp thay thế:</strong> Tên mạch chính + "ane". Mạch nhánh (alkyl) được chỉ vị trí và tên.</p>
<p>Ví dụ: CH₃–CH(CH₃)–CH₃: 2-methylpropane.</p>
<p><strong>Gốc alkyl:</strong> C<sub>n</sub>H<sub>2n+1</sub> (methyl, ethyl, propyl, butyl...).</p>`
            },
            {
              icon: '📊', iconClass: 'icon-teal',
              title: '2. Tính chất vật lí',
              body: `<p>Trạng thái: C₁–C₄ và neopentane (khí); C₅–C₁₇ (lỏng); ≥C₁₈ (rắn).</p>
<p>Nhiệt độ sôi, nhiệt độ nóng chảy tăng theo phân tử khối. Alkane không tan trong nước, nhẹ hơn nước.</p>`
            },
            {
              icon: '🔥', iconClass: 'icon-amber',
              title: '3. Tính chất hóa học',
              body: `<ul>
  <li><strong>Phản ứng thế halogen:</strong> CH₄ + Cl₂ → CH₃Cl + HCl (ánh sáng).</li>
  <li><strong>Phản ứng cracking:</strong> Bẻ gãy mạch C–C ở nhiệt độ cao, xúc tác, tạo alkane nhỏ + alkene.</li>
  <li><strong>Phản ứng reforming:</strong> Chuyển mạch thẳng thành mạch nhánh hoặc vòng, tăng chỉ số octane.</li>
  <li><strong>Phản ứng cháy:</strong> C<sub>n</sub>H<sub>2n+2</sub> + (3n+1)/2 O₂ → nCO₂ + (n+1)H₂O, tỏa nhiệt.</li>
</ul>`
            },
            {
              icon: '🌍', iconClass: 'icon-green',
              title: '4. Ứng dụng và ô nhiễm',
              body: `<p>Làm nhiên liệu (LPG, xăng, dầu diesel), dung môi, sản xuất hydrogen, phân bón.</p>
<p><strong>Ô nhiễm không khí:</strong> Khí thải động cơ chứa CO, NOx, SOx, bụi mịn. Biện pháp: sử dụng nhiên liệu sạch (E5, biodiesel), xe điện, tiết kiệm năng lượng.</p>`
            }
          ],
          quiz: [
            { q: 'Công thức chung của alkane là:', opts: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₋₆'], ans: 1, explain: 'Alkane no, mạch hở có dạng CₙH₂ₙ₊₂.' },
            { q: 'Sản phẩm chính của phản ứng clo hóa methane (ánh sáng) là:', opts: ['CH₃Cl', 'CH₂Cl₂', 'CHCl₃', 'CCl₄'], ans: 0, explain: 'Phản ứng thế lần lượt, nhưng sản phẩm chính ở điều kiện thường là CH₃Cl.' },
            { q: 'Phản ứng cracking dùng để:', opts: ['Tăng chỉ số octane', 'Tạo alkane mạch nhánh', 'Bẻ gãy alkane lớn thành nhỏ', 'Tạo vòng benzene'], ans: 2, explain: 'Cracking bẻ gãy mạch C–C tạo hydrocarbon nhỏ hơn.' },
            { q: 'Alkane ở thể khí điều kiện thường là các chất có số C từ:', opts: ['1 đến 4', '5 đến 17', '18 trở lên', '1 đến 10'], ans: 0, explain: 'C₁–C₄ và neopentane ở thể khí.' },
            { q: 'Biện pháp nào giúp giảm ô nhiễm từ khí thải phương tiện giao thông?', opts: ['Dùng xăng pha chì', 'Tăng hàm lượng sulfur', 'Sử dụng xăng E5', 'Tăng nhiệt độ động cơ'], ans: 2, explain: 'E5 chứa 5% ethanol, cháy sạch hơn, giảm phát thải.' }
          ]
        },
        // Bài 2: Hydrocarbon không no (alkene, alkyne)
        {
          id: 'l11-4-2',
          title: 'Bài 14: Hydrocarbon không no – Alkene, Alkyne',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '16 phút',
          sections: [
            {
              icon: '🔄', iconClass: 'icon-blue',
              title: '1. Đồng phân, danh pháp',
              body: `<p><strong>Alkene:</strong> CₙH₂ₙ (n≥2), có 1 liên kết đôi C=C. <strong>Alkyne:</strong> CₙH₂ₙ₋₂ (n≥2), có 1 liên kết ba C≡C.</p>
<p>Danh pháp: chọn mạch chính chứa liên kết bội, đánh số gần liên kết bội nhất. Đuôi "ene" hoặc "yne".</p>
<p>Ví dụ: CH₂=CH–CH₃: propene; CH≡C–CH₃: propyne.</p>
<p><strong>Đồng phân hình học:</strong> cis- khi hai nhóm thế lớn cùng phía, trans- khi khác phía (chỉ alkene).</p>`
            },
            {
              icon: '⚡', iconClass: 'icon-teal',
              title: '2. Tính chất hóa học',
              body: `<ul>
  <li><strong>Phản ứng cộng:</strong> Cộng H₂ (Ni, t°), Br₂ (mất màu dung dịch brom), HX (tuân theo quy tắc Markovnikov: H cộng vào C nhiều H hơn), H₂O (có xúc tác acid).</li>
  <li><strong>Phản ứng trùng hợp:</strong> nCH₂=CH₂ → (-CH₂–CH₂-)ₙ (PE).</li>
  <li><strong>Phản ứng oxi hóa:</strong> Làm mất màu dung dịch KMnO₄ (oxi hóa không hoàn toàn).</li>
  <li><strong>Phản ứng thế H linh động của alkyne-1:</strong> HC≡CH + 2AgNO₃ + 2NH₃ → AgC≡CAg↓ vàng + 2NH₄NO₃.</li>
</ul>`
            },
            {
              icon: '🧪', iconClass: 'icon-amber',
              title: '3. Điều chế và ứng dụng',
              body: `<p><strong>Điều chế:</strong> Cracking alkane (C₂H₄), dehydrate alcohol (C₂H₅OH → C₂H₄), từ CaC₂ (C₂H₂).</p>
<p><strong>Ứng dụng:</strong> Sản xuất polymer (PE, PP, PVC), ethanol, ethylene glycol, đèn xì oxy-acetylene, kích thích quả chín (ethylene).</p>`
            }
          ],
          quiz: [
            { q: 'Công thức tổng quát của alkene là:', opts: ['CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₋₆'], ans: 1, explain: 'Alkene mạch hở, 1 liên kết đôi: CₙH₂ₙ (n≥2).' },
            { q: 'Khi cho propene cộng HBr (theo Markovnikov), sản phẩm chính là:', opts: ['CH₃CH₂CH₂Br', 'CH₃CHBrCH₃', 'CH₂BrCH₂CH₃', 'CH₃CH=CHBr'], ans: 1, explain: 'H cộng vào C nhiều H hơn (C₁), Br cộng vào C ít H hơn (C₂) → 2-bromopropane.' },
            { q: 'Thuốc thử dùng để phân biệt ethane và ethylene là:', opts: ['Dung dịch AgNO₃/NH₃', 'Dung dịch brom', 'Dung dịch NaOH', 'Quỳ tím'], ans: 1, explain: 'Ethylene làm mất màu dung dịch brom, ethane thì không.' },
            { q: 'Phản ứng đặc trưng để nhận biết alkyne có liên kết ba đầu mạch là:', opts: ['Phản ứng với AgNO₃/NH₃', 'Phản ứng cộng H₂', 'Phản ứng trùng hợp', 'Phản ứng cháy'], ans: 0, explain: 'Alkyne-1 tạo kết tủa vàng với AgNO₃/NH₃.' },
            { q: 'Sản phẩm của phản ứng trùng hợp ethylene là:', opts: ['PVC', 'PE', 'PP', 'PS'], ans: 1, explain: 'PE (polyethylene) từ ethylene.' }
          ]
        },
        // Bài 3: Arene (Hydrocarbon thơm)
        {
          id: 'l11-4-3',
          title: 'Bài 15: Arene (Hydrocarbon thơm)',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '13 phút',
          sections: [
            {
              icon: '🪷', iconClass: 'icon-blue',
              title: '1. Cấu tạo và danh pháp',
              body: `<p><strong>Benzene:</strong> C₆H₆, vòng 6 cạnh đều, các nguyên tử C đều ở trạng thái lai hóa sp², tạo hệ liên hợp π (thơm).</p>
<p><strong>Đồng đẳng:</strong> CₙH₂ₙ₋₆ (n≥6). Toluene C₆H₅CH₃, xylene C₆H₄(CH₃)₂.</p>
<p>Danh pháp: thế vị trí (ortho- 1,2; meta- 1,3; para- 1,4).</p>`
            },
            {
              icon: '⚗️', iconClass: 'icon-teal',
              title: '2. Tính chất hóa học',
              body: `<ul>
  <li><strong>Phản ứng thế (ưu tiên ở vị trí ortho/para nếu có nhóm đẩy e như alkyl):</strong>
    <ul><li>Halogen hóa: C₆H₆ + Br₂ (FeBr₃) → C₆H₅Br + HBr</li>
    <li>Nitro hóa: C₆H₆ + HNO₃ (H₂SO₄ đặc) → C₆H₅NO₂ + H₂O</li></ul>
  </li>
  <li><strong>Phản ứng cộng:</strong> C₆H₆ + 3Cl₂ (ánh sáng) → C₆H₆Cl₆ (hexachloran, 666). Cộng H₂ (Ni, t°, p) → cyclohexane.</li>
  <li><strong>Phản ứng oxi hóa:</strong> Alkylbenzene bị KMnO₄ oxi hóa nhóm alkyl thành –COOH (benzoic acid).</li>
</ul>`
            },
            {
              icon: '🏭', iconClass: 'icon-amber',
              title: '3. Ứng dụng và điều chế',
              body: `<p>Benzene, toluene, xylene là nguyên liệu tổng hợp nhựa, tơ sợi, thuốc nổ (TNT), dược phẩm, phẩm nhuộm.</p>
<p><strong>Điều chế:</strong> Reforming alkane (C₆–C₈) trong dầu mỏ.</p>
<div class="ls-callout warn">Benzene là chất độc, gây ung thư. Tránh tiếp xúc trực tiếp.</div>`
            }
          ],
          quiz: [
            { q: 'Công thức phân tử của benzene là:', opts: ['C₆H₁₂', 'C₆H₆', 'C₆H₁₀', 'C₆H₈'], ans: 1, explain: 'Benzene C₆H₆.' },
            { q: 'Phản ứng nitro hóa benzene cần dùng hỗn hợp:', opts: ['HNO₃ loãng', 'HNO₃ đặc + H₂SO₄ đặc', 'HNO₃ + HCl', 'HNO₃ + H₂O'], ans: 1, explain: 'H₂SO₄ đặc đóng vai trò xúc tác và hút nước.' },
            { q: 'Khi cho toluene tác dụng với Br₂ (FeBr₃), sản phẩm chính là:', opts: ['o-bromotoluene và p-bromotoluene', 'm-bromotoluene', 'benzyl bromide', 'bromobenzene'], ans: 0, explain: 'Nhóm –CH₃ đẩy electron, định hướng thế vào vị trí ortho và para.' },
            { q: 'Phản ứng của benzene với Cl₂ có chiếu sáng tạo sản phẩm:', opts: ['C₆H₅Cl', 'C₆H₄Cl₂', 'C₆H₆Cl₆', 'C₆H₅Cl₃'], ans: 2, explain: 'Cộng 3 phân tử Cl₂ tạo hexachlorocyclohexane (666).' },
            { q: 'TNT (thuốc nổ) được điều chế từ toluene qua phản ứng:', opts: ['Cộng H₂', 'Nitro hóa', 'Halogen hóa', 'Oxi hóa'], ans: 1, explain: 'Toluene + HNO₃ đặc/H₂SO₄ đặc → 2,4,6-trinitrotoluene (TNT).' }
          ]
        }
      ]
    },
    // ==================== CHƯƠNG 5: DẪN XUẤT HALOGEN – ALCOHOL – PHENOL ====================
    {
      id: 'c11-5',
      title: 'Chương 5: Dẫn xuất Halogen – Alcohol – Phenol',
      icon: '🧴',
      lessons: [
        // Bài 1: Dẫn xuất halogen
        {
          id: 'l11-5-1',
          title: 'Bài 16: Dẫn xuất halogen',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '10 phút',
          sections: [
            {
              icon: '🧪', iconClass: 'icon-blue',
              title: '1. Khái niệm, danh pháp',
              body: `<p>Dẫn xuất halogen là hợp chất hữu cơ trong đó nguyên tử H được thay bằng halogen (F, Cl, Br, I). Công thức tổng quát: R–X (X là halogen).</p>
<p>Danh pháp thay thế: halogeno + tên hydrocarbon. Ví dụ: CH₃Cl (chloromethane), CH₂=CHCl (chloroethene).</p>`
            },
            {
              icon: '🧊', iconClass: 'icon-teal',
              title: '2. Tính chất vật lí và cấu tạo',
              body: `<p>Liên kết C–X phân cực về phía halogen. Năng lượng liên kết giảm dần từ C–F đến C–I. Nhiệt độ sôi cao hơn hydrocarbon tương ứng, không tan trong nước, tan trong dung môi hữu cơ.</p>`
            },
            {
              icon: '⚗️', iconClass: 'icon-amber',
              title: '3. Tính chất hóa học',
              body: `<ul>
  <li><strong>Phản ứng thế nguyên tử halogen (thủy phân):</strong> R–X + NaOH → R–OH + NaX (đun sôi).</li>
  <li><strong>Phản ứng tách HX (dehydrohalogen):</strong> R–CH₂–CH₂X + NaOH (alcohol) → R–CH=CH₂ + NaX + H₂O. Tuân theo quy tắc Zaitsev: tách H ở C bậc cao hơn.</li>
</ul>
<p><strong>Ứng dụng:</strong> Dung môi, chất làm lạnh (CFC), sản xuất polymer (PVC, Teflon).</p>
<div class="ls-callout warn">CFC phá hủy tầng ozone, hiện đã bị cấm.</div>`
            }
          ],
          quiz: [
            { q: 'Dẫn xuất halogen có công thức CH₃CH₂Cl có tên thay thế là:', opts: ['Chloroethane', 'Ethyl chloride', '1-chloroethane', 'Chloromethane'], ans: 0, explain: 'Tên thay thế: chloro + ethane.' },
            { q: 'Phản ứng thủy phân bromoethane trong dung dịch NaOH tạo sản phẩm:', opts: ['Ethene', 'Ethanol', 'Ethane', 'Bromoethene'], ans: 1, explain: 'C₂H₅Br + NaOH → C₂H₅OH + NaBr.' },
            { q: 'Quy tắc Zaitsev trong phản ứng tách HX phát biểu rằng:', opts: ['H tách cùng với X ở C bậc thấp hơn', 'H tách ưu tiên ở C bậc cao hơn', 'X tách trước', 'Phản ứng xảy ra không định hướng'], ans: 1, explain: 'Tạo alkene có nhiều nhánh hơn (bền hơn).' },
            { q: 'Chất nào sau đây thường được dùng làm chất làm lạnh nhưng gây hại tầng ozone?', opts: ['CFC', 'HFC', 'NH₃', 'CO₂'], ans: 0, explain: 'CFC chứa Cl, phá hủy ozone.' },
            { q: 'Liên kết C–X phân cực nhất khi X là:', opts: ['F', 'Cl', 'Br', 'I'], ans: 0, explain: 'Độ âm điện F lớn nhất, liên kết C–F phân cực mạnh nhất.' }
          ]
        },
        // Bài 2: Alcohol
        {
          id: 'l11-5-2',
          title: 'Bài 17: Alcohol',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '13 phút',
          sections: [
            {
              icon: '🍺', iconClass: 'icon-blue',
              title: '1. Phân loại, danh pháp',
              body: `<p>Alcohol là hợp chất hữu cơ có nhóm –OH liên kết với C no. Công thức no, đơn chức: CₙH₂ₙ₊₁OH (n≥1).</p>
<p><strong>Bậc alcohol:</strong> bậc của C mang OH.</p>
<p>Danh pháp thay thế: tên hydrocarbon + "ol". Ví dụ: CH₃OH (methanol), CH₃CH₂OH (ethanol), CH₃CH(OH)CH₃ (propan-2-ol).</p>`
            },
            {
              icon: '🌡️', iconClass: 'icon-teal',
              title: '2. Tính chất vật lí',
              body: `<p>Các alcohol có nhiệt độ sôi cao hơn hydrocarbon và dẫn xuất halogen cùng phân tử khối do có liên kết hydro liên phân tử. Tan tốt trong nước (nhất là mạch ngắn).</p>`
            },
            {
              icon: '🔥', iconClass: 'icon-amber',
              title: '3. Tính chất hóa học',
              body: `<ul>
  <li><strong>Phản ứng với kim loại kiềm:</strong> 2ROH + 2Na → 2RONa + H₂.</li>
  <li><strong>Phản ứng tạo ether:</strong> 2ROH (H₂SO₄ đặc, 140°C) → R–O–R + H₂O.</li>
  <li><strong>Phản ứng tách nước tạo alkene:</strong> ROH (H₂SO₄ đặc, 180°C) → alkene + H₂O (tuân theo quy tắc Zaitsev).</li>
  <li><strong>Phản ứng oxi hóa:</strong> Alcohol bậc I → aldehyde; bậc II → ketone; bậc III không bị oxi hóa (với CuO, t°).</li>
</ul>
<p><strong>Polyalcohol (glycerol, ethylene glycol)</strong> phản ứng với Cu(OH)₂ tạo phức xanh lam.</p>`
            },
            {
              icon: '🚗', iconClass: 'icon-green',
              title: '4. Ứng dụng và điều chế',
              body: `<p>Ethanol: đồ uống, nhiên liệu (xăng E5), dung môi, sản xuất hóa chất. Methanol: sản xuất formaldehyde. Glycerol: mỹ phẩm, thực phẩm.</p>
<p>Điều chế: hydrat hóa alkene (C₂H₄ + H₂O → C₂H₅OH), lên men tinh bột.</p>
<div class="ls-callout warn">Lạm dụng rượu, bia gây hại gan, thần kinh, không lái xe.</div>`
            }
          ],
          quiz: [
            { q: 'Alcohol nào sau đây là alcohol bậc II?', opts: ['CH₃OH', 'CH₃CH₂OH', 'CH₃CH(OH)CH₃', '(CH₃)₃COH'], ans: 2, explain: 'C mang OH liên kết với hai nhóm alkyl.' },
            { q: 'Phản ứng của ethanol với CuO đun nóng tạo sản phẩm:', opts: ['CH₃COOH', 'CH₃CHO', 'C₂H₄', 'C₂H₅OC₂H₅'], ans: 1, explain: 'Alcohol bậc I bị oxi hóa thành aldehyde.' },
            { q: 'Glycerol phản ứng với Cu(OH)₂ tạo dung dịch màu:', opts: ['Đỏ nâu', 'Xanh lam', 'Tím', 'Vàng'], ans: 1, explain: 'Tạo phức glycerat đồng màu xanh lam đặc trưng.' },
            { q: 'Xăng E5 có nghĩa là:', opts: ['5% ethanol, 95% xăng', '5% xăng, 95% ethanol', '5% methanol', '95% ethanol'], ans: 0, explain: 'E5: 5% ethanol sinh học, 95% xăng.' },
            { q: 'Điều chế ethanol trong công nghiệp chủ yếu bằng phương pháp:', opts: ['Lên men tinh bột', 'Hydrat hóa ethylene', 'Thủy phân dẫn xuất halogen', 'Oxi hóa methane'], ans: 1, explain: 'C₂H₄ + H₂O → C₂H₅OH (xúc tác H₃PO₄, t°, p).' }
          ]
        },
        // Bài 3: Phenol
        {
          id: 'l11-5-3',
          title: 'Bài 18: Phenol',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '11 phút',
          sections: [
            {
              icon: '🧴', iconClass: 'icon-blue',
              title: '1. Cấu tạo, tính chất vật lí',
              body: `<p>Phenol: C₆H₅OH, nhóm –OH liên kết trực tiếp với vòng benzene. Chất rắn không màu, ít tan trong nước lạnh, tan nhiều khi đun nóng. Độc, gây bỏng da.</p>`
            },
            {
              icon: '⚗️', iconClass: 'icon-teal',
              title: '2. Tính chất hóa học',
              body: `<ul>
  <li><strong>Tính acid yếu:</strong> C₆H₅OH + NaOH → C₆H₅ONa + H₂O (phenol tan trong NaOH, nhưng không phản ứng với Na₂CO₃ giải phóng CO₂).</li>
  <li><strong>Phản ứng thế vòng thơm:</strong> 
    <ul><li>Với Br₂ (nước): C₆H₅OH + 3Br₂ → C₆H₂Br₃OH↓ (trắng) + 3HBr (phản ứng dễ hơn benzene).</li>
    <li>Với HNO₃ đặc: tạo 2,4,6-trinitrophenol (picric acid, màu vàng, dùng làm thuốc nổ).</li></ul>
  </li>
</ul>`
            },
            {
              icon: '🏭', iconClass: 'icon-amber',
              title: '3. Ứng dụng và điều chế',
              body: `<p>Phenol dùng sản xuất nhựa phenol-formaldehyde (bakelite), bisphenol A (polycarbonate), phẩm nhuộm, thuốc sát trùng, chất diệt cỏ.</p>
<p>Điều chế từ cumene (isopropylbenzene) qua oxi hóa rồi thủy phân: cumene + O₂ → cumene hydroperoxide → phenol + acetone.</p>`
            }
          ],
          quiz: [
            { q: 'Phenol có tính acid yếu vì:', opts: ['Nhóm –OH phân cực mạnh', 'Vòng benzene hút electron làm O–H phân cực hơn', 'Có liên kết hydro', 'Tan trong nước'], ans: 1, explain: 'Vòng benzene hút electron, làm mật độ electron trên O giảm, H linh động hơn.' },
            { q: 'Khi cho phenol tác dụng với nước bromine, hiện tượng là:', opts: ['Dung dịch mất màu, kết tủa trắng', 'Sủi bọt khí', 'Dung dịch chuyển xanh', 'Không hiện tượng'], ans: 0, explain: 'Tạo kết tủa 2,4,6-tribromophenol trắng.' },
            { q: 'Chất nào sau đây phản ứng được với dung dịch NaOH?', opts: ['C₂H₅OH', 'C₆H₅OH', 'CH₃OCH₃', 'C₆H₆'], ans: 1, explain: 'Phenol là acid yếu, phản ứng với NaOH tạo phenolat.' },
            { q: 'Picric acid (2,4,6-trinitrophenol) được dùng làm:', opts: ['Thuốc nhuộm', 'Chất diệt nấm', 'Thuốc nổ', 'Dung môi'], ans: 2, explain: 'Picric acid là chất nổ mạnh.' },
            { q: 'Phương pháp hiện đại để sản xuất phenol trong công nghiệp là từ:', opts: ['Nhựa than đá', 'Benzen + Cl₂', 'Cumene', 'Toluene'], ans: 2, explain: 'Quy trình cumene (oxi hóa cumene) chiếm hơn 90% sản lượng phenol.' }
          ]
        }
      ]
    },
    // ==================== CHƯƠNG 6: HỢP CHẤT CARBONYL – CARBOXYLIC ACID ====================
    {
      id: 'c11-6',
      title: 'Chương 6: Hợp chất Carbonyl – Carboxylic Acid',
      icon: '🍋',
      lessons: [
        // Bài 1: Hợp chất carbonyl (aldehyde, ketone)
        {
          id: 'l11-6-1',
          title: 'Bài 19: Hợp chất Carbonyl',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '14 phút',
          sections: [
            {
              icon: '🔑', iconClass: 'icon-blue',
              title: '1. Định nghĩa, danh pháp',
              body: `<p><strong>Aldehyde:</strong> có nhóm –CHO (R–CHO). <strong>Ketone:</strong> có nhóm C=O liên kết với hai gốc hydrocarbon (R–CO–R').</p>
<p>Danh pháp thay thế: aldehyde: tên hydrocarbon + "al" (methanal, ethanal). Ketone: tên hydrocarbon + "one" (propanone, butanone).</p>
<p>Một số tên thông thường: formaldehyde (HCHO), acetaldehyde (CH₃CHO), acetone (CH₃COCH₃).</p>`
            },
            {
              icon: '🌡️', iconClass: 'icon-teal',
              title: '2. Tính chất vật lí',
              body: `<p>Các hợp chất carbonyl có nhiệt độ sôi cao hơn hydrocarbon nhưng thấp hơn alcohol (do không có liên kết hydro liên phân tử). Các chất mạch ngắn tan tốt trong nước.</p>`
            },
            {
              icon: '🔬', iconClass: 'icon-amber',
              title: '3. Tính chất hóa học',
              body: `<ul>
  <li><strong>Phản ứng khử (cộng H₂):</strong> Aldehyde → alcohol bậc I; ketone → alcohol bậc II (xúc tác Ni, t°).</li>
  <li><strong>Phản ứng oxi hóa aldehyde (đặc trưng):</strong>
    <ul><li>Với thuốc thử Tollens [Ag(NH₃)₂]OH: tạo Ag bám (tráng gương). RCHO + 2[Ag(NH₃)₂]OH → RCOONH₄ + 2Ag + 3NH₃ + H₂O.</li>
    <li>Với Cu(OH)₂/NaOH, đun nóng: tạo kết tủa đỏ gạch Cu₂O.</li>
    <li>Với nước bromine: RCHO + Br₂ + H₂O → RCOOH + 2HBr.</li></ul>
  </li>
  <li><strong>Phản ứng cộng HCN (vào C=O):</strong> tạo cyanohydrin.</li>
  <li><strong>Phản ứng iodoform:</strong> Các hợp chất có nhóm CH₃–C=O phản ứng với I₂/NaOH tạo kết tủa vàng CHI₃ (iodoform).</li>
</ul>`
            },
            {
              icon: '🏭', iconClass: 'icon-green',
              title: '4. Ứng dụng và điều chế',
              body: `<p>Formaldehyde: sản xuất nhựa, keo dán, bảo quản mẫu. Acetaldehyde: sản xuất acetic acid. Acetone: dung môi, sản xuất bisphenol A.</p>
<p>Điều chế: oxi hóa ethylene (C₂H₄ + O₂ → CH₃CHO), oxi hóa cumene (điều chế acetone cùng phenol).</p>`
            }
          ],
          quiz: [
            { q: 'Thuốc thử Tollens dùng để nhận biết nhóm chức:', opts: ['–OH', '–CHO', '–COOH', '–NH₂'], ans: 1, explain: 'Aldehyde bị oxi hóa bởi [Ag(NH₃)₂]OH tạo Ag.' },
            { q: 'Chất nào sau đây có phản ứng tráng gương?', opts: ['CH₃COCH₃', 'CH₃CH₂CHO', 'CH₃CH₂OH', 'CH₃COOH'], ans: 1, explain: 'Aldehyde (propanal) có phản ứng tráng gương.' },
            { q: 'Khi oxi hóa ethanol bằng CuO đun nóng, sản phẩm thu được là:', opts: ['CH₃CHO', 'CH₃COOH', 'C₂H₄', 'C₂H₅OC₂H₅'], ans: 0, explain: 'Alcohol bậc I bị oxi hóa thành aldehyde.' },
            { q: 'Phản ứng iodoform dùng để nhận biết hợp chất có nhóm:', opts: ['–CHO', '–COOH', 'CH₃–C=O (methyl ketone)', '–OH'], ans: 2, explain: 'Các methyl ketone (CH₃–CO–R) tạo iodoform kết tủa vàng.' },
            { q: 'Sản phẩm chính của phản ứng cộng HCN vào acetaldehyde (CH₃CHO) là:', opts: ['CH₃CH(OH)CN', 'CH₃CH₂CH(CN)OH', 'CH₃CH₂CN', 'CH₃COCN'], ans: 0, explain: 'Cộng HCN vào nhóm C=O tạo cyanohydrin.' }
          ]
        },
        // Bài 2: Carboxylic acid
        {
          id: 'l11-6-2',
          title: 'Bài 20: Carboxylic Acid',
          tag: 'Lý thuyết · Lớp 11',
          readTime: '13 phút',
          sections: [
            {
              icon: '🍋', iconClass: 'icon-blue',
              title: '1. Khái niệm, danh pháp',
              body: `<p>Carboxylic acid là hợp chất hữu cơ có nhóm –COOH (carboxyl). Công thức no, đơn chức: CₙH₂ₙ₊₁COOH (n≥0).</p>
<p>Danh pháp thay thế: tên hydrocarbon + "oic acid". Ví dụ: HCOOH (methanoic acid), CH₃COOH (ethanoic acid), C₆H₅COOH (benzoic acid). Tên thường: formic acid, acetic acid, oxalic acid, citric acid.</p>`
            },
            {
              icon: '🧊', iconClass: 'icon-teal',
              title: '2. Tính chất vật lí',
              body: `<p>Carboxylic acid có nhiệt độ sôi cao nhất trong các hợp chất cùng phân tử khối do tạo liên kết hydro dimer bền. Các acid mạch ngắn tan vô hạn trong nước.</p>`
            },
            {
              icon: '⚗️', iconClass: 'icon-amber',
              title: '3. Tính chất hóa học',
              body: `<ul>
  <li><strong>Tính acid yếu:</strong> Phân li không hoàn toàn: RCOOH ⇌ RCOO⁻ + H⁺. Có đầy đủ tính acid: làm quỳ đỏ, tác dụng với kim loại (trước H), oxide base, base, muối carbonat giải phóng CO₂.</li>
  <li><strong>Phản ứng ester hóa:</strong> RCOOH + R'OH ⇌ RCOOR' + H₂O (xúc tác H₂SO₄ đặc, thuận nghịch). Ester có mùi thơm (trái cây, hoa).</li>
</ul>`
            },
            {
              icon: '🏭', iconClass: 'icon-green',
              title: '4. Điều chế và ứng dụng',
              body: `<p>Điều chế: lên men giấm (C₂H₅OH → CH₃COOH), oxi hóa alkane (butane → acetic acid), oxi hóa aldehyde.</p>
<p>Ứng dụng: sản xuất dược phẩm (aspirin), phẩm nhuộm, chất bảo quản (benzoic acid, sorbic acid), sản xuất ester làm hương liệu, polymer (PET từ terephthalic acid).</p>`
            }
          ],
          quiz: [
            { q: 'Công thức tổng quát của carboxylic acid no, đơn chức, mạch hở là:', opts: ['CₙH₂ₙ₊₁O₂', 'CₙH₂ₙ₊₂O₂', 'CₙH₂ₙ₋₂O₂', 'CₙH₂ₙ₊₁COOH'], ans: 3, explain: 'CₙH₂ₙ₊₁COOH với n≥0.' },
            { q: 'Dung dịch acetic acid phản ứng với Na₂CO₃ giải phóng khí:', opts: ['H₂', 'CO₂', 'SO₂', 'O₂'], ans: 1, explain: '2CH₃COOH + Na₂CO₃ → 2CH₃COONa + CO₂ + H₂O.' },
            { q: 'Phản ứng ester hóa giữa acetic acid và isoamyl alcohol tạo sản phẩm có mùi:', opts: ['Chuối chín', 'Dứa', 'Táo', 'Không mùi'], ans: 0, explain: 'Isoamyl acetate (isopentyl acetate) có mùi chuối chín đặc trưng.' },
            { q: 'Chất nào sau đây có tính acid mạnh nhất?', opts: ['CH₃OH', 'C₆H₅OH', 'CH₃COOH', 'C₂H₅OH'], ans: 2, explain: 'Acid acetic (pKa ≈ 4,76) mạnh hơn phenol (pKa ≈ 10) và alcohol.' },
            { q: 'Điều chế acetic acid trong công nghiệp bằng phương pháp nào sau đây?', opts: ['Oxi hóa butane', 'Lên men rượu vang', 'Hydrat hóa ethylene', 'Cracking alkane'], ans: 0, explain: 'Phương pháp oxi hóa alkane (butane) bằng O₂ xúc tác.' }
          ]
        }
      ]
    }
  ]
};