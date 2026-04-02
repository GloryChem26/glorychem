window.DATA_12 = {
  label: "Lớp 12",
  icon: "🧬",
  chapters: [
    {
      id: "c12-1",
      title: "Chương 1: Ester – Lipid",
      lessons: [
        {
          id: "l12-1-1",
          title: "Bài 1: Ester",
          tag: "Lý thuyết · Lớp 12",
          readTime: "10 phút",
          sections: [
            {
              icon: "🔬",
              iconClass: "icon-blue",
              title: "1. Khái niệm và cấu tạo ester",
              body: `
<p><strong>Ester</strong> là hợp chất hữu cơ có công thức chung RCOOR' (R là H hoặc gốc hydrocarbon, R' là gốc hydrocarbon, R' ≠ H).</p>
<div class="ls-formula"><span class="label">Phản ứng este hóa</span>
RCOOH + R'OH ⇌ RCOOR' + H₂O (xúc tác H₂SO₄ đặc, đun nóng)</div>
<div class="ls-callout info">
  <span class="ls-callout-icon">💡</span>
  <span>Ester đơn giản nhất: methyl formate HCOOCH₃.</span>
</div>`
            },
            {
              icon: "🧪",
              iconClass: "icon-teal",
              title: "2. Tính chất vật lý",
              body: `
<ul>
  <li>Ester thường là chất lỏng hoặc rắn ở điều kiện thường, nhẹ hơn nước, ít tan trong nước.</li>
  <li>Nhiệt độ sôi thấp hơn acid và alcohol cùng phân tử khối do không tạo liên kết hydrogen liên phân tử.</li>
  <li>Nhiều ester có mùi thơm đặc trưng: isoamyl acetate (mùi chuối), ethyl butyrate (mùi dứa), benzyl acetate (mùi hoa nhài).</li>
</ul>`
            },
            {
              icon: "⚗️",
              iconClass: "icon-amber",
              title: "3. Tính chất hóa học",
              body: `
<h4>Thủy phân trong môi trường acid (thuận nghịch)</h4>
<div class="ls-formula">RCOOR' + H₂O ⇌ RCOOH + R'OH</div>
<h4>Thủy phân trong môi trường kiềm (xà phòng hóa, một chiều)</h4>
<div class="ls-formula">RCOOR' + NaOH → RCOONa + R'OH</div>
<h4>Este của phenol</h4>
<div class="ls-formula">RCOOC₆H₅ + 2NaOH → RCOONa + C₆H₅ONa + H₂O</div>`
            },
            {
              icon: "🏭",
              iconClass: "icon-green",
              title: "4. Điều chế và ứng dụng",
              body: `
<p><strong>Điều chế:</strong> Phản ứng este hóa giữa acid carboxylic và alcohol với xúc tác H₂SO₄ đặc.</p>
<p><strong>Ứng dụng:</strong> Dung môi (ethyl acetate), hương liệu (thực phẩm, mỹ phẩm), sản xuất polymer (PET), dược phẩm (aspirin).</p>`
            }
          ],
          quiz: [
            { q: "Công thức tổng quát của ester đơn chức là?", opts: ["RCOOH", "ROR'", "RCOOR'", "RCHO"], ans: 2, explain: "Ester đơn chức có dạng RCOOR' (R có thể là H, R' là gốc hydrocarbon)." },
            { q: "Phản ứng xà phòng hóa ester là phản ứng?", opts: ["Thuận nghịch", "Một chiều", "Cần xúc tác acid", "Không tạo muối"], ans: 1, explain: "Xà phòng hóa dùng NaOH/KOH, phản ứng một chiều tạo muối và alcohol." },
            { q: "Este nào có mùi chuối chín?", opts: ["Ethyl acetate", "Isoamyl acetate", "Methyl butyrate", "Ethyl formate"], ans: 1, explain: "Isoamyl acetate (CH₃COOC₅H₁₁) có mùi chuối." },
            { q: "Khi thủy phân CH₃COOC₂H₅ trong môi trường axit, sản phẩm là?", opts: ["CH₃COONa + C₂H₅OH", "CH₃COOH + C₂H₅OH", "CH₃COOC₂H₅ + H₂O", "CH₃COONa + H₂O"], ans: 1, explain: "Thủy phân trong axit tạo acid và alcohol tương ứng." },
            { q: "Một ester có CTPT C₄H₈O₂, thủy phân cho muối natri butyrat. Công thức của ester là?", opts: ["HCOOC₃H₇", "CH₃COOC₂H₅", "C₂H₅COOCH₃", "C₃H₇COOH"], ans: 2, explain: "C₂H₅COOCH₃ (methyl propionate) thủy phân cho C₂H₅COONa (natri butyrat)." }
          ]
        },
        {
          id: "l12-1-2",
          title: "Bài 2: Lipid (Chất béo)",
          tag: "Lý thuyết · Lớp 12",
          readTime: "9 phút",
          sections: [
            {
              icon: "🫙",
              iconClass: "icon-amber",
              title: "1. Khái niệm lipid và chất béo",
              body: `<p>Lipid là hợp chất hữu cơ có trong tế bào sống, không tan trong nước nhưng tan trong dung môi hữu cơ. Chất béo (triglyceride) là triester của glycerol với acid béo.</p>
<div class="ls-formula">(RCOO)₃C₃H₅ (R là gốc hydrocarbon của acid béo)</div>`
            },
            {
              icon: "🧈",
              iconClass: "icon-teal",
              title: "2. Acid béo và phân loại",
              body: `<p>Acid béo là carboxylic acid đơn chức, mạch C dài (12–24C), không phân nhánh. Acid béo no: palmitic (C₁₅H₃₁COOH), stearic (C₁₇H₃₅COOH). Acid béo không no: oleic (C₁₇H₃₃COOH, 1 nối đôi), linoleic (C₁₇H₃₁COOH, 2 nối đôi).</p>`
            },
            {
              icon: "⚗️",
              iconClass: "icon-green",
              title: "3. Tính chất hóa học",
              body: `
<h4>Phản ứng xà phòng hóa</h4>
<div class="ls-formula">(RCOO)₃C₃H₅ + 3NaOH → 3RCOONa + C₃H₅(OH)₃</div>
<h4>Hydrogen hóa (chất béo lỏng → rắn)</h4>
<div class="ls-formula">Dầu + H₂ (Ni, t°) → bơ thực vật</div>
<h4>Phản ứng oxi hóa (ôi thiu)</h4>
<p>Chất béo không no bị O₂ trong không khí oxi hóa tạo aldehyde, ketone có mùi khó chịu.</p>`
            }
          ],
          quiz: [
            { q: "Chất béo là triester của glycerol với?", opts: ["Acid vô cơ", "Acid béo", "Acid axetic", "Amino acid"], ans: 1, explain: "Chất béo là triester của glycerol và acid béo." },
            { q: "Dầu thực vật lỏng ở nhiệt độ thường vì chứa?", opts: ["Acid béo no", "Acid béo không no", "Glycerol tự do", "Nước"], ans: 1, explain: "Acid béo không no (có nối đôi) làm giảm nhiệt độ nóng chảy." },
            { q: "Phản ứng hydrogen hóa dầu thực vật dùng để?", opts: ["Sản xuất xà phòng", "Sản xuất bơ thực vật", "Điều chế glycerol", "Làm dầu ăn"], ans: 1, explain: "Hydrogen hóa biến dầu lỏng thành chất béo rắn (bơ thực vật)." },
            { q: "Sản phẩm của phản ứng xà phòng hóa tristearin là?", opts: ["C₁₇H₃₅COONa + C₃H₅(OH)₃", "C₁₇H₃₅COOH + C₃H₅(OH)₃", "C₁₇H₃₅COONa + H₂O", "C₁₇H₃₅COOK + C₃H₅(OH)₃"], ans: 0, explain: "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃." },
            { q: "Nguyên nhân dầu mỡ bị ôi là do?", opts: ["Thủy phân", "Hydrogen hóa", "Oxi hóa bởi O₂ không khí", "Este hóa"], ans: 2, explain: "Các nối đôi C=C bị oxi hóa chậm bởi oxi không khí tạo sản phẩm mùi khó chịu." }
          ]
        },
        {
          id: "l12-1-3",
          title: "Bài 3: Xà phòng và chất giặt rửa tổng hợp",
          tag: "Lý thuyết · Lớp 12",
          readTime: "7 phút",
          sections: [
            {
              icon: "🧼",
              iconClass: "icon-blue",
              title: "1. Xà phòng",
              body: `<p>Xà phòng là muối natri hoặc kali của acid béo (RCOONa / RCOOK). Cấu tạo gồm đuôi kỵ nước (R-) và đầu ưa nước (-COO⁻).</p>
<div class="ls-callout info">Cơ chế tẩy rửa: đuôi kỵ nước thâm nhập vào vết bẩn, đầu ưa nước hướng ra nước, tạo mixen và bị cuốn trôi.</div>`
            },
            {
              icon: "🫧",
              iconClass: "icon-teal",
              title: "2. Chất giặt rửa tổng hợp",
              body: `<p>Là muối alkylsulfate (R-OSO₃Na) hoặc alkylbenzenesulfonate (R-C₆H₄-SO₃Na). Ưu điểm: dùng được trong nước cứng (không tạo kết tủa với Ca²⁺, Mg²⁺). Nhược điểm: khó phân hủy sinh học, gây ô nhiễm.</p>`
            }
          ],
          quiz: [
            { q: "Thành phần chính của xà phòng là?", opts: ["Triglyceride", "Muối natri của acid béo", "Acid béo tự do", "Glycerol"], ans: 1, explain: "Xà phòng là muối natri (hoặc kali) của acid béo." },
            { q: "Chất giặt rửa tổng hợp có ưu điểm gì so với xà phòng?", opts: ["Thân thiện môi trường hơn", "Dùng được trong nước cứng", "Rẻ tiền hơn", "Tạo nhiều bọt hơn"], ans: 1, explain: "Chất giặt rửa tổng hợp không tạo kết tủa với Ca²⁺, Mg²⁺." },
            { q: "Cấu trúc lưỡng tính của xà phòng gồm?", opts: ["Đầu kỵ nước và đuôi ưa nước", "Đầu ưa nước và đuôi kỵ nước", "Cả hai đều ưa nước", "Cả hai đều kỵ nước"], ans: 1, explain: "Đầu -COO⁻ ưa nước, đuôi R- kỵ nước." },
            { q: "Xà phòng kém tác dụng trong nước cứng vì?", opts: ["Tạo kết tủa với Ca²⁺, Mg²⁺", "Bị thủy phân", "Tan quá nhiều", "Tạo bọt quá lớn"], ans: 0, explain: "Ion Ca²⁺, Mg²⁺ tạo kết tủa với muối của acid béo." },
            { q: "Phản ứng sản xuất xà phòng từ chất béo gọi là?", opts: ["Este hóa", "Hydrogen hóa", "Xà phòng hóa", "Trùng hợp"], ans: 2, explain: "Xà phòng hóa là phản ứng thủy phân chất béo trong môi trường kiềm." }
          ]
        }
      ]
    },
    {
      id: "c12-2",
      title: "Chương 2: Carbohydrate",
      lessons: [
        {
          id: "l12-2-1",
          title: "Bài 4: Glucose và Fructose",
          tag: "Lý thuyết · Lớp 12",
          readTime: "10 phút",
          sections: [
            {
              icon: "🍇",
              iconClass: "icon-purple",
              title: "1. Cấu tạo và trạng thái tự nhiên",
              body: `<p>Glucose và fructose đều có CTPT C₆H₁₂O₆. Glucose có nhóm –CHO (aldose), fructose có nhóm –CO– (ketose). Trong môi trường kiềm, chúng chuyển hóa qua lại. Glucose có nhiều trong quả nho, mật ong, máu người.</p>`
            },
            {
              icon: "⚗️",
              iconClass: "icon-amber",
              title: "2. Tính chất hóa học",
              body: `
<h4>Tính chất của polyalcohol</h4>
<p>Glucose và fructose hòa tan Cu(OH)₂ tạo phức xanh lam.</p>
<h4>Tính chất của aldehyde (glucose)</h4>
<p>Phản ứng tráng bạc: C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₁O₇NH₄ + 2Ag + 3NH₃ + H₂O</p>
<p>Phản ứng với Cu(OH)₂/OH⁻, đun nóng tạo Cu₂O đỏ gạch.</p>
<h4>Lên men rượu</h4>
<p>C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (men rượu, 30-35°C)</p>`
            }
          ],
          quiz: [
            { q: "Glucose có công thức phân tử là?", opts: ["C₅H₁₀O₅", "C₆H₁₂O₆", "C₁₂H₂₂O₁₁", "(C₆H₁₀O₅)ₙ"], ans: 1, explain: "Glucose là monosaccarit C₆H₁₂O₆." },
            { q: "Phản ứng tráng bạc của glucose chứng tỏ có nhóm?", opts: ["–OH", "–CHO", "–COOH", "–CO–"], ans: 1, explain: "Nhóm –CHO bị oxi hóa bởi AgNO₃/NH₃." },
            { q: "Glucose hòa tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch màu xanh lam do?", opts: ["Nhóm –CHO", "Nhiều nhóm –OH kề nhau", "Liên kết đôi", "Vòng 6 cạnh"], ans: 1, explain: "Các nhóm OH liền kề tạo phức đồng." },
            { q: "Lên men glucose thu được sản phẩm chính là?", opts: ["CH₃COOH", "C₂H₅OH + CO₂", "CH₃CHO", "CO₂ + H₂O"], ans: 1, explain: "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂." },
            { q: "Fructose trong môi trường kiềm có thể chuyển hóa thành?", opts: ["Saccharose", "Glucose", "Tinh bột", "Maltose"], ans: 1, explain: "Fructose chuyển hóa qua lại với glucose trong môi trường kiềm." }
          ]
        },
        {
          id: "l12-2-2",
          title: "Bài 5: Saccharose và Maltose",
          tag: "Lý thuyết · Lớp 12",
          readTime: "8 phút",
          sections: [
            {
              icon: "🍬",
              iconClass: "icon-teal",
              title: "1. Cấu tạo",
              body: `<p>Saccharose (C₁₂H₂₂O₁₁) gồm α-glucose và β-fructose liên kết α-1,2-glycoside, không có nhóm –CHO tự do. Maltose gồm 2 gốc α-glucose liên kết α-1,4-glycoside, có nhóm –CHO hemiacetal.</p>`
            },
            {
              icon: "⚗️",
              iconClass: "icon-amber",
              title: "2. Tính chất",
              body: `<p>Saccharose có tính chất của polyalcohol (hòa tan Cu(OH)₂), bị thủy phân trong môi trường acid hoặc enzyme tạo glucose + fructose. Maltose có tính khử (phản ứng tráng bạc), thủy phân tạo 2 glucose.</p>`
            }
          ],
          quiz: [
            { q: "Saccharose thuộc loại?", opts: ["Monosaccarit", "Disaccarit", "Polisaccarit", "Oligosaccarit"], ans: 1, explain: "Saccharose là disaccarit gồm glucose và fructose." },
            { q: "Thủy phân saccharose trong môi trường axit thu được?", opts: ["Chỉ glucose", "Chỉ fructose", "Glucose và fructose", "Tinh bột"], ans: 2, explain: "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ (gluc) + C₆H₁₂O₆ (fruct)." },
            { q: "Dung dịch saccharose tinh khiết không tráng bạc vì?", opts: ["Không có nhóm –CHO tự do", "Không tan", "Bị thủy phân chậm", "Có vị ngọt"], ans: 0, explain: "Liên kết glycosit che kín nhóm carbonyl." },
            { q: "Maltose có tính khử do?", opts: ["Nhóm –OH hemiacetal tự do", "Liên kết α-1,4", "Phân tử khối lớn", "Có vòng furanose"], ans: 0, explain: "Maltose còn nhóm –OH hemiacetal ở C1 của một gốc glucose." },
            { q: "Saccharose được sản xuất chủ yếu từ?", opts: ["Tinh bột", "Mía, củ cải đường", "Gỗ", "Mật ong"], ans: 1, explain: "Saccharose chiết xuất từ mía, củ cải đường." }
          ]
        },
        {
          id: "l12-2-3",
          title: "Bài 6: Tinh bột và Cellulose",
          tag: "Lý thuyết · Lớp 12",
          readTime: "10 phút",
          sections: [
            {
              icon: "🌾",
              iconClass: "icon-amber",
              title: "1. Tinh bột",
              body: `<p>Tinh bột (C₆H₁₀O₅)ₙ gồm amylose (mạch không nhánh, α-1,4) và amylopectin (mạch nhánh, α-1,4 và α-1,6). Phản ứng thủy phân tạo glucose, phản ứng với I₂ tạo màu xanh tím.</p>`
            },
            {
              icon: "📄",
              iconClass: "icon-blue",
              title: "2. Cellulose",
              body: `<p>Cellulose (C₆H₁₀O₅)ₙ gồm các β-glucose liên kết β-1,4-glycoside, mạch thẳng. Tan trong nước Svayde (Cu(OH)₂/NH₃). Phản ứng với HNO₃ đặc/H₂SO₄ đặc tạo cellulose trinitrat (thuốc súng không khói).</p>`
            }
          ],
          quiz: [
            { q: "Tinh bột và cellulose đều có công thức (C₆H₁₀O₅)ₙ, khác nhau về?", opts: ["Hàm lượng nước", "Cấu trúc liên kết glycosit", "Số mắt xích", "Màu sắc"], ans: 1, explain: "Tinh bột liên kết α-1,4 và α-1,6; cellulose liên kết β-1,4." },
            { q: "Thuốc thử nhận biết tinh bột là?", opts: ["I₂/KI", "AgNO₃/NH₃", "Cu(OH)₂", "Nước brom"], ans: 0, explain: "Tinh bột tạo phức màu xanh tím với iot." },
            { q: "Xenlulozơ trinitrat được dùng làm?", opts: ["Tơ sợi", "Thuốc súng không khói", "Chất dẻo", "Phim ảnh"], ans: 1, explain: "[C₆H₇O₂(ONO₂)₃]ₙ dễ cháy nổ, dùng làm thuốc súng không khói." },
            { q: "Liên kết giữa các mắt xích glucozơ trong xenlulozơ là?", opts: ["α-1,4-glycosit", "β-1,4-glycosit", "α-1,6-glycosit", "β-1,6-glycosit"], ans: 1, explain: "Xenlulozơ có liên kết β-1,4-glycosit." },
            { q: "Thủy phân hoàn toàn tinh bột thu được?", opts: ["Saccarozơ", "Fructozơ", "Glucozơ", "Maltôzơ"], ans: 2, explain: "(C₆H₁₀O₅)ₙ + nH₂O → nC₆H₁₂O₆ (glucozơ)." }
          ]
        }
      ]
    },
    {
      id: "c12-3",
      title: "Chương 3: Hợp chất chứa nitrogen",
      lessons: [
        {
          id: "l12-3-1",
          title: "Bài 8: Amine",
          tag: "Lý thuyết · Lớp 12",
          readTime: "8 phút",
          sections: [
            {
              icon: "🧪",
              iconClass: "icon-blue",
              title: "1. Khái niệm, phân loại, danh pháp",
              body: `<p>Amine là dẫn xuất của NH₃ thay H bằng gốc hydrocarbon. Phân loại theo bậc (số gốc gắn với N): bậc 1,2,3. Tên gốc-chức: methylamine, aniline.</p>`
            },
            {
              icon: "⚗️",
              iconClass: "icon-amber",
              title: "2. Tính chất hóa học",
              body: `<p><strong>Tính bazơ:</strong> RNH₂ + H₂O ⇌ RNH₃⁺ + OH⁻. Alkylamine làm quỳ tím hóa xanh, aniline không làm đổi màu quỳ.<br>
<strong>Phản ứng với HNO₂:</strong> Alkylamine bậc 1 → alcohol + N₂; aniline → muối diazonium (0-5°C).<br>
<strong>Phản ứng thế ở vòng thơm:</strong> Aniline + Br₂ → 2,4,6-tribromoaniline ↓ trắng.</p>`
            }
          ],
          quiz: [
            { q: "Bậc của amine được xác định bằng?", opts: ["Số C liên kết với N", "Số gốc hydrocarbon liên kết với N", "Số H trong phân tử", "Khối lượng phân tử"], ans: 1, explain: "Bậc amine = số gốc hydrocarbon gắn trực tiếp với N." },
            { q: "Aniline có tính bazơ yếu hơn NH₃ vì?", opts: ["Nhóm C₆H₅ đẩy electron", "Nhóm C₆H₅ hút electron", "Aniline không tan", "Có liên kết H nội phân tử"], ans: 1, explain: "Vòng benzen hút electron qua hiệu ứng liên hợp, giảm mật độ e trên N." },
            { q: "Cho methylamine tác dụng với HCl thu được?", opts: ["CH₃NH₃Cl", "CH₃Cl + NH₃", "CH₃NH₂Cl", "CH₃NHCl"], ans: 0, explain: "CH₃NH₂ + HCl → CH₃NH₃Cl (metylamoni clorua)." },
            { q: "Phản ứng của aniline với nước brom tạo kết tủa trắng chứng tỏ?", opts: ["Tính bazơ", "Phản ứng thế dễ dàng vào vòng thơm", "Oxi hóa", "Tạo phức"], ans: 1, explain: "Nhóm –NH₂ kích hoạt vòng, thế Br vào vị trí 2,4,6." },
            { q: "Trong dãy CH₃NH₂, NH₃, C₆H₅NH₂, chất có tính bazơ mạnh nhất là?", opts: ["CH₃NH₂", "NH₃", "C₆H₅NH₂", "Bằng nhau"], ans: 0, explain: "CH₃ nhóm đẩy e làm tăng tính bazơ." }
          ]
        },
        {
          id: "l12-3-2",
          title: "Bài 9: Amino acid và peptide",
          tag: "Lý thuyết · Lớp 12",
          readTime: "8 phút",
          sections: [
            {
              icon: "🧬",
              iconClass: "icon-purple",
              title: "1. Amino acid",
              body: `<p>Amino acid là hợp chất tạp chức chứa –NH₂ và –COOH. Tồn tại chủ yếu ở dạng ion lưỡng cực (zwitterion). Có tính lưỡng tính: tác dụng với axit và bazơ. Phản ứng trùng ngưng tạo polipeptit.</p>`
            },
            {
              icon: "🧩",
              iconClass: "icon-blue",
              title: "2. Peptit",
              body: `<p>Peptit là hợp chất gồm 2–50 gốc α-amino axit liên kết với nhau bằng liên kết peptit –CO–NH–. Tripeptit trở lên có phản ứng màu biuret với Cu(OH)₂/OH⁻ tạo màu tím.</p>`
            }
          ],
          quiz: [
            { q: "Amino axit có tính lưỡng tính vì?", opts: ["Có nhóm –COOH và –NH₂", "Tan trong nước", "Là chất rắn", "Có cấu trúc mạch hở"], ans: 0, explain: "–COOH cho H⁺ (axit), –NH₂ nhận H⁺ (bazơ)." },
            { q: "Glyxin tác dụng với NaOH thu được?", opts: ["H₂N–CH₂–COONa", "ClH₃N–CH₂–COOH", "H₂N–CH₂–COO⁻Na⁺", "Cả A và C"], ans: 3, explain: "H₂N–CH₂–COOH + NaOH → H₂N–CH₂–COONa." },
            { q: "Phản ứng màu biuret dùng để nhận biết?", opts: ["Amino axit", "Đipeptit", "Tripeptit trở lên", "Protein thủy phân"], ans: 2, explain: "Cần từ 2 liên kết peptit trở lên mới cho màu tím." },
            { q: "Dạng tồn tại chủ yếu của amino axit trong dung dịch là?", opts: ["Phân tử trung hòa", "Ion lưỡng cực", "Ion dương", "Ion âm"], ans: 1, explain: "H₂N–R–COOH ⇌ H₃N⁺–R–COO⁻." },
            { q: "Muối mononatri glutamat được dùng làm?", opts: ["Thuốc", "Mì chính (bột ngọt)", "Phân bón", "Chất tẩy rửa"], ans: 1, explain: "Là gia vị tăng vị ngọt cho thức ăn." }
          ]
        },
        {
          id: "l12-3-3",
          title: "Bài 10: Protein và enzyme",
          tag: "Lý thuyết · Lớp 12",
          readTime: "9 phút",
          sections: [
            {
              icon: "🥚",
              iconClass: "icon-teal",
              title: "1. Protein",
              body: `<p>Protein là polipeptit cao phân tử (M lớn). Cấu trúc bậc 1,2,3,4. Tính chất: thủy phân tạo α-amino axit, đông tụ khi đun nóng hoặc gặp axit/bazơ/muối kim loại nặng, phản ứng màu biuret (tím), phản ứng xanthoproteic với HNO₃ đặc (vàng).</p>`
            },
            {
              icon: "🧬",
              iconClass: "icon-green",
              title: "2. Enzyme",
              body: `<p>Enzyme là protein xúc tác sinh học, có tính chọn lọc cao, hoạt động ở điều kiện sinh lý. Ứng dụng trong công nghệ thực phẩm, dược phẩm, kỹ thuật di truyền.</p>`
            }
          ],
          quiz: [
            { q: "Liên kết peptit là liên kết?", opts: ["–CO–NH–", "–CO–O–", "–NH–NH–", "–CO–CH₂–"], ans: 0, explain: "Liên kết giữa –COOH và –NH₂ tạo –CO–NH–." },
            { q: "Protein có phản ứng màu biuret với Cu(OH)₂ tạo màu?", opts: ["Đỏ", "Xanh", "Tím", "Vàng"], ans: 2, explain: "Phức màu tím đặc trưng." },
            { q: "Khi đun nóng protein với axit, sản phẩm cuối cùng là?", opts: ["α-amino axit", "Hỗn hợp peptit", "CO₂ và H₂O", "Amoniac"], ans: 0, explain: "Thủy phân hoàn toàn protein tạo α-amino axit." },
            { q: "Phản ứng của protein với HNO₃ đặc tạo màu vàng gọi là?", opts: ["Biure", "Xanthoproteic", "Tráng bạc", "Este hóa"], ans: 1, explain: "Phản ứng xanthoproteic nhận biết vòng benzen trong protein." },
            { q: "Protein bị đông tụ khi đun nóng do?", opts: ["Phân hủy thành amino axit", "Phá vỡ cấu trúc không gian", "Tạo liên kết peptit mới", "Thủy phân"], ans: 1, explain: "Biến tính, mất cấu trúc bậc cao dẫn đến kết tủa." }
          ]
        }
      ]
    },
    {
      id: "c12-4",
      title: "Chương 4: Polymer",
      lessons: [
        {
          id: "l12-4-1",
          title: "Bài 12: Đại cương về polymer",
          tag: "Lý thuyết · Lớp 12",
          readTime: "8 phút",
          sections: [
            {
              icon: "🧵",
              iconClass: "icon-blue",
              title: "1. Khái niệm và phân loại",
              body: `<p>Polymer là hợp chất phân tử khối lớn gồm nhiều mắt xích. Monomer là phân tử nhỏ tạo nên polymer. Phân loại: thiên nhiên (tinh bột, cao su), tổng hợp (PE, PVC), bán tổng hợp (visco).</p>`
            },
            {
              icon: "⚙️",
              iconClass: "icon-amber",
              title: "2. Phương pháp tổng hợp",
              body: `<p><strong>Trùng hợp:</strong> nCH₂=CH₂ → (–CH₂–CH₂–)ₙ (PE).<br>
<strong>Trùng ngưng:</strong> nH₂N–(CH₂)₆–NH₂ + nHOOC–(CH₂)₄–COOH → nilon-6,6 + 2nH₂O.</p>`
            }
          ],
          quiz: [
            { q: "Polime được tạo từ phản ứng trùng hợp là?", opts: ["Nilon-6,6", "Tơ tằm", "Polietilen", "Xenlulozơ"], ans: 2, explain: "PE từ trùng hợp etilen." },
            { q: "Tơ visco thuộc loại?", opts: ["Tơ thiên nhiên", "Tơ tổng hợp", "Tơ nhân tạo (bán tổng hợp)", "Tơ poliamit"], ans: 2, explain: "Từ xenlulozơ qua xử lý hóa học." },
            { q: "Monome để tổng hợp PVC là?", opts: ["CH₂=CHCl", "CH₂=CH₂", "CH₂=CCl₂", "CH₂=CH–CH₃"], ans: 0, explain: "Vinyl clorua CH₂=CHCl." },
            { q: "Tơ nilon-6,6 được điều chế từ?", opts: ["Axit ađipic + hexametylenđiamin", "Axit ε-aminocaproic", "Caprolactam", "Vinyl xianua"], ans: 0, explain: "Trùng ngưng HOOC-(CH₂)₄-COOH và H₂N-(CH₂)₆-NH₂." },
            { q: "Phản ứng trùng ngưng khác trùng hợp ở điểm?", opts: ["Sản phẩm có M lớn hơn", "Có giải phóng phân tử nhỏ", "Cần xúc tác", "Monome có liên kết đôi"], ans: 1, explain: "Trùng ngưng tách H₂O, NH₃,..." }
          ]
        },
        {
          id: "l12-4-2",
          title: "Bài 13: Vật liệu polymer",
          tag: "Lý thuyết · Lớp 12",
          readTime: "7 phút",
          sections: [
            {
              icon: "🧴",
              iconClass: "icon-green",
              title: "1. Chất dẻo, tơ, cao su, keo dán",
              body: `<p><strong>Chất dẻo:</strong> PE, PVC, PP, PS. <strong>Tơ:</strong> tự nhiên (bông, len), tổng hợp (nilon, capron), nhân tạo (visco). <strong>Cao su:</strong> tự nhiên (polyisoprene), tổng hợp (buna, buna-S). <strong>Keo dán:</strong> epoxy, neoprene, ure-formaldehit.</p>`
            }
          ],
          quiz: [
            { q: "Chất dẻo dùng làm ống nhựa, vỏ dây điện là?", opts: ["PE", "PVC", "PMMA", "PS"], ans: 1, explain: "PVC cứng, bền hóa chất, cách điện tốt." },
            { q: "Tơ visco thuộc loại tơ?", opts: ["Thiên nhiên", "Tổng hợp", "Nhân tạo", "Poliamit"], ans: 2, explain: "Từ xenlulozơ tái sinh." },
            { q: "Monome để tổng hợp cao su buna là?", opts: ["Isopren", "Buta-1,3-đien", "Etilen", "Stiren"], ans: 1, explain: "Trùng hợp buta-1,3-đien." },
            { q: "Lưu hóa cao su nhằm mục đích?", opts: ["Tăng độ dẻo", "Tạo cầu nối disulfua, tăng độ bền và đàn hồi", "Làm trong suốt", "Giảm giá thành"], ans: 1, explain: "Cầu –S–S– nối mạch polime." },
            { q: "Tơ nilon-6 (capron) được tổng hợp từ?", opts: ["Axit ε-aminocaproic", "Caprolactam", "Hexametylenđiamin + axit ađipic", "Vinyl xianua"], ans: 1, explain: "Caprolactam mở vòng trùng hợp." }
          ]
        }
      ]
    },
    {
      id: "c12-5",
      title: "Chương 5: Pin điện và điện phân",
      lessons: [
        {
          id: "l12-5-1",
          title: "Bài 15: Thế điện cực và nguồn điện hóa học",
          tag: "Lý thuyết · Lớp 12",
          readTime: "10 phút",
          sections: [
            {
              icon: "⚡",
              iconClass: "icon-blue",
              title: "1. Cặp oxi hóa – khử và thế điện cực chuẩn",
              body: `<p>Cặp oxi hóa – khử: Mⁿ⁺/M. Thế điện cực chuẩn E° (V) đặc trưng cho tính oxi hóa của dạng oxi hóa và tính khử của dạng khử. Quy ước E°(2H⁺/H₂) = 0 V.</p>
<div class="ls-table-wrap"><table class="ls-table"><tr><th>Cặp</th><th>E° (V)</th></tr><tr><td>Li⁺/Li</td><td>-3,040</td></tr><tr><td>Zn²⁺/Zn</td><td>-0,762</td></tr><tr><td>Cu²⁺/Cu</td><td>+0,340</td></tr><tr><td>Ag⁺/Ag</td><td>+0,799</td></tr></table></div>`
            },
            {
              icon: "🔋",
              iconClass: "icon-amber",
              title: "2. Pin Galvani và sức điện động",
              body: `<p>Pin Galvani gồm hai điện cực khác nhau, anode xảy ra oxi hóa, cathode xảy ra khử. Sức điện động chuẩn: E°<sub>pin</sub> = E°<sub>cathode</sub> – E°<sub>anode</sub>.<br>Ví dụ: Pin Zn-Cu có E°<sub>pin</sub> = 0,340 – (–0,762) = 1,102 V.</p>`
            },
            {
              icon: "☀️",
              iconClass: "icon-green",
              title: "3. Một số loại pin khác",
              body: `<p>Acquy (pin sạc), pin nhiên liệu (hydrogen – oxygen), pin Mặt Trời (quang điện).</p>`
            }
          ],
          quiz: [
            { q: "Trong pin Galvani, cực âm (anode) xảy ra quá trình?", opts: ["Khử", "Oxi hóa", "Trung hòa", "Kết tủa"], ans: 1, explain: "Anode là nơi xảy ra oxi hóa (nhường electron)." },
            { q: "Thế điện cực chuẩn của cặp Zn²⁺/Zn là –0,762 V, của Cu²⁺/Cu là +0,340 V. Sức điện động chuẩn của pin Zn-Cu là?", opts: ["0,422 V", "1,102 V", "0,340 V", "0,762 V"], ans: 1, explain: "E°pin = 0,340 – (–0,762) = 1,102 V." },
            { q: "Dãy điện hóa sắp xếp các cặp oxi hóa – khử theo chiều?", opts: ["Tăng tính khử", "Tăng tính oxi hóa của dạng oxi hóa", "Giảm dần thế điện cực", "Tùy ý"], ans: 1, explain: "E° càng lớn, tính oxi hóa của dạng oxi hóa càng mạnh." },
            { q: "Loại pin nào có thể sạc lại được?", opts: ["Pin khô", "Pin Mặt Trời", "Acquy chì", "Pin nhiên liệu"], ans: 2, explain: "Acquy là pin thứ cấp (sạc được)." },
            { q: "Phản ứng xảy ra trong pin Zn-Cu là?", opts: ["Zn + Cu²⁺ → Zn²⁺ + Cu", "Zn + Cu → Zn²⁺ + Cu²⁺", "Zn²⁺ + Cu → Zn + Cu²⁺", "Zn + Cu²⁺ → Zn²⁺ + Cu²⁺"], ans: 0, explain: "Zn khử Cu²⁺ thành Cu." }
          ]
        },
        {
          id: "l12-5-2",
          title: "Bài 16: Điện phân",
          tag: "Lý thuyết · Lớp 12",
          readTime: "8 phút",
          sections: [
            {
              icon: "⚡",
              iconClass: "icon-amber",
              title: "1. Nguyên tắc và thứ tự điện phân",
              body: `<p>Điện phân là quá trình oxi hóa – khử xảy ra trên bề mặt điện cực khi có dòng điện một chiều. Tại cathode (cực âm): chất oxi hóa mạnh hơn bị khử trước. Tại anode (cực dương): chất khử mạnh hơn bị oxi hóa trước.</p>`
            },
            {
              icon: "🏭",
              iconClass: "icon-blue",
              title: "2. Ứng dụng",
              body: `<p>Sản xuất kim loại (Na, Mg, Al bằng điện phân nóng chảy; Zn, Cu bằng điện phân dung dịch). Tinh chế đồng. Mạ điện.</p>`
            }
          ],
          quiz: [
            { q: "Trong điện phân dung dịch CuSO₄ với điện cực trơ, ở cathode xảy ra?", opts: ["Cu → Cu²⁺ + 2e", "Cu²⁺ + 2e → Cu", "2H₂O → O₂ + 4H⁺ + 4e", "2H⁺ + 2e → H₂"], ans: 1, explain: "Cu²⁺ có tính oxi hóa mạnh hơn H₂O nên bị khử trước." },
            { q: "Để điều chế kim loại Na trong công nghiệp, người ta dùng?", opts: ["Điện phân dung dịch NaCl", "Điện phân NaCl nóng chảy", "Nhiệt phân Na₂CO₃", "Dùng CO khử Na₂O"], ans: 1, explain: "Na là kim loại mạnh, chỉ điều chế bằng điện phân nóng chảy." },
            { q: "Trong điện phân dung dịch NaCl có màng ngăn, sản phẩm ở anode là?", opts: ["Na", "H₂", "Cl₂", "O₂"], ans: 2, explain: "Anion Cl⁻ bị oxi hóa thành Cl₂." },
            { q: "Quá trình mạ điện (ví dụ mạ đồng) dựa trên nguyên tắc?", opts: ["Điện phân với anode tan", "Điện phân nóng chảy", "Nhiệt luyện", "Thủy luyện"], ans: 0, explain: "Anode là kim loại mạ, cathode là vật cần mạ." },
            { q: "Khi điện phân Al₂O₃ nóng chảy (có criolit), sản phẩm ở cathode là?", opts: ["Al", "O₂", "CO₂", "Na"], ans: 0, explain: "Al³⁺ + 3e → Al." }
          ]
        }
      ]
    },
    {
      id: "c12-6",
      title: "Chương 6: Đại cương về kim loại",
      lessons: [
        {
          id: "l12-6-1",
          title: "Bài 18: Cấu tạo và liên kết trong tinh thể kim loại",
          tag: "Lý thuyết · Lớp 12",
          readTime: "6 phút",
          sections: [
            {
              icon: "🔩",
              iconClass: "icon-blue",
              title: "1. Cấu tạo nguyên tử kim loại",
              body: `<p>Nguyên tử kim loại thường có 1,2,3 electron ở lớp ngoài cùng, bán kính lớn, độ âm điện nhỏ, dễ nhường electron.</p>`
            },
            {
              icon: "🔗",
              iconClass: "icon-amber",
              title: "2. Liên kết kim loại",
              body: `<p>Liên kết kim loại là lực hút tĩnh điện giữa các ion dương kim loại và các electron tự do trong mạng tinh thể.</p>`
            }
          ],
          quiz: [
            { q: "Nguyên tử kim loại thường có số electron lớp ngoài cùng là?", opts: ["1–3", "5–7", "4", "8"], ans: 0, explain: "Hầu hết kim loại có 1-3 electron hóa trị." },
            { q: "Trong tinh thể kim loại, các electron tự do đảm nhận vai trò?", opts: ["Tạo liên kết cộng hóa trị", "Liên kết các ion dương", "Tạo phân tử", "Cách điện"], ans: 1, explain: "Electron tự do liên kết các ion dương với nhau." },
            { q: "Kim loại nào sau đây ở thể lỏng ở điều kiện thường?", opts: ["Hg", "Ga", "Cs", "Na"], ans: 0, explain: "Thủy ngân là kim loại lỏng duy nhất." },
            { q: "Liên kết kim loại khác liên kết ion ở điểm?", opts: ["Có electron tự do", "Lực hút tĩnh điện", "Không có điện tích", "Chỉ tồn tại ở nhiệt độ cao"], ans: 0, explain: "Liên kết kim loại có electron tự do, liên kết ion không có." },
            { q: "Nguyên nhân kim loại có tính dẻo là do?", opts: ["Các lớp ion trượt lên nhau", "Electron tự do di chuyển", "Mạng tinh thể bền", "Nhiệt độ nóng chảy thấp"], ans: 0, explain: "Các lớp ion dương có thể trượt mà không phá vỡ liên kết." }
          ]
        },
        {
          id: "l12-6-2",
          title: "Bài 19: Tính chất vật lí và hóa học của kim loại",
          tag: "Lý thuyết · Lớp 12",
          readTime: "9 phút",
          sections: [
            {
              icon: "✨",
              iconClass: "icon-teal",
              title: "1. Tính chất vật lí chung",
              body: `<p>Kim loại có tính dẻo, dẫn điện, dẫn nhiệt, ánh kim. (Ag dẫn điện tốt nhất, Au dẻo nhất, W nóng chảy cao nhất).</p>`
            },
            {
              icon: "🧪",
              iconClass: "icon-green",
              title: "2. Tính chất hóa học chung (tính khử)",
              body: `<p>Kim loại dễ nhường electron: M → Mⁿ⁺ + ne.<br>
- Tác dụng với phi kim: 2Fe + 3Cl₂ → 2FeCl₃.<br>
- Tác dụng với axit: Fe + 2HCl → FeCl₂ + H₂.<br>
- Tác dụng với nước: 2Na + 2H₂O → 2NaOH + H₂.<br>
- Tác dụng với dung dịch muối: Fe + CuSO₄ → FeSO₄ + Cu.</p>`
            }
          ],
          quiz: [
            { q: "Kim loại dẫn điện tốt nhất là?", opts: ["Cu", "Ag", "Au", "Al"], ans: 1, explain: "Bạc (Ag) dẫn điện tốt nhất." },
            { q: "Kim loại nào không phản ứng với dung dịch HCl loãng?", opts: ["Mg", "Fe", "Cu", "Zn"], ans: 2, explain: "Cu đứng sau H trong dãy điện hóa." },
            { q: "Phản ứng của Fe với Cl₂ tạo sản phẩm?", opts: ["FeCl₂", "FeCl₃", "FeCl", "FeCl₄"], ans: 1, explain: "2Fe + 3Cl₂ → 2FeCl₃." },
            { q: "Kim loại nào tác dụng mạnh với nước ở nhiệt độ thường?", opts: ["Mg", "Al", "Na", "Fe"], ans: 2, explain: "Kim loại kiềm (Na, K) phản ứng mãnh liệt với nước." },
            { q: "Tính chất hóa học đặc trưng của kim loại là?", opts: ["Tính oxi hóa", "Tính khử", "Tính bazơ", "Tính axit"], ans: 1, explain: "Kim loại dễ nhường electron → tính khử." }
          ]
        },
        {
          id: "l12-6-3",
          title: "Bài 20: Kim loại trong tự nhiên và phương pháp tách kim loại",
          tag: "Lý thuyết · Lớp 12",
          readTime: "7 phút",
          sections: [
            {
              icon: "⛏️",
              iconClass: "icon-amber",
              title: "1. Trạng thái tự nhiên",
              body: `<p>Hầu hết kim loại tồn tại dưới dạng hợp chất (quặng). Chỉ Au, Ag, Pt tồn tại dạng đơn chất.</p>`
            },
            {
              icon: "🔥",
              iconClass: "icon-red",
              title: "2. Phương pháp điều chế",
              body: `<p><strong>Điện phân nóng chảy:</strong> Kim loại mạnh (Na, K, Mg, Al).<br>
<strong>Nhiệt luyện:</strong> Dùng CO, H₂, C khử oxit kim loại trung bình, yếu (Fe, Zn, Cu).<br>
<strong>Thủy luyện:</strong> Dùng dung dịch thích hợp, sau đó dùng kim loại mạnh hơn khử.<br>
<strong>Điện phân dung dịch:</strong> Điều chế kim loại trung bình, yếu.</p>`
            }
          ],
          quiz: [
            { q: "Nguyên tắc điều chế kim loại là?", opts: ["Oxi hóa ion kim loại", "Khử ion kim loại thành nguyên tử", "Nhiệt phân muối", "Điện phân nóng chảy"], ans: 1, explain: "Mⁿ⁺ + ne → M." },
            { q: "Phương pháp thích hợp để điều chế Fe từ quặng hematite là?", opts: ["Nhiệt luyện", "Thủy luyện", "Điện phân nóng chảy", "Điện phân dung dịch"], ans: 0, explain: "Dùng CO khử Fe₂O₃ ở nhiệt độ cao." },
            { q: "Trong công nghiệp, Al được sản xuất bằng?", opts: ["Điện phân AlCl₃ nóng chảy", "Điện phân Al₂O₃ nóng chảy trong criolit", "Nhiệt luyện", "Thủy luyện"], ans: 1, explain: "Điện phân Al₂O₃ nóng chảy với criolit." },
            { q: "Phương pháp thủy luyện thường dùng để điều chế?", opts: ["Na", "Mg", "Cu", "Al"], ans: 2, explain: "Thủy luyện dùng cho kim loại yếu như Cu, Ag, Au." },
            { q: "Quặng bauxite dùng để sản xuất kim loại nào?", opts: ["Fe", "Al", "Cu", "Zn"], ans: 1, explain: "Bauxite (Al₂O₃.2H₂O) là quặng nhôm." }
          ]
        },
        {
          id: "l12-6-4",
          title: "Bài 22: Sự ăn mòn kim loại",
          tag: "Lý thuyết · Lớp 12",
          readTime: "7 phút",
          sections: [
            {
              icon: "🔧",
              iconClass: "icon-blue",
              title: "1. Khái niệm và phân loại",
              body: `<p>Ăn mòn kim loại là sự phá hủy kim loại do tác dụng hóa học của môi trường. Có hai loại: ăn mòn hóa học (phản ứng trực tiếp, không phát sinh dòng điện) và ăn mòn điện hóa (có hình thành pin điện).</p>`
            },
            {
              icon: "🛡️",
              iconClass: "icon-green",
              title: "2. Chống ăn mòn",
              body: `<p>Phương pháp phủ (sơn, mạ), phương pháp điện hóa (dùng kim loại hy sinh như Zn gắn vào vỏ tàu).</p>`
            }
          ],
          quiz: [
            { q: "Trong ăn mòn điện hóa, ở cathode xảy ra quá trình?", opts: ["Khử", "Oxi hóa", "Hòa tan kim loại", "Tạo khí H₂ luôn"], ans: 0, explain: "Cathode là nơi nhận electron, xảy ra khử." },
            { q: "Để bảo vệ vỏ tàu biển bằng thép, người ta gắn tấm kẽm. Kẽm đóng vai trò?", opts: ["Cathode", "Anode hy sinh", "Chất cách điện", "Lớp phủ"], ans: 1, explain: "Zn có tính khử mạnh hơn Fe, bị ăn mòn trước." },
            { q: "Hiện tượng ăn mòn hóa học xảy ra khi?", opts: ["Để gang ngoài không khí ẩm", "Cho Na vào nước", "Dây sắt nung đỏ trong O₂", "Cho Fe vào CuSO₄"], ans: 2, explain: "Phản ứng trực tiếp giữa Fe và O₂ ở nhiệt độ cao." },
            { q: "Trong không khí ẩm, hợp kim Fe–C bị ăn mòn nhanh hơn Fe tinh khiết vì?", opts: ["Cấu trúc xốp", "Xuất hiện pin điện hóa", "C tác dụng với nước", "Fe tác dụng với C"], ans: 1, explain: "Fe là anode, C là cathode tạo pin ăn mòn." },
            { q: "Phương pháp nào sau đây không phải là chống ăn mòn?", opts: ["Mạ kẽm", "Sơn", "Ngâm trong dầu hỏa", "Làm sạch bề mặt"], ans: 3, explain: "Làm sạch không ngăn cản ăn mòn về lâu dài." }
          ]
        }
      ]
    },
    {
      id: "c12-7",
      title: "Chương 7: Nguyên tố nhóm IA và IIA",
      lessons: [
        {
          id: "l12-7-1",
          title: "Bài 24: Nguyên tố nhóm IA (Kim loại kiềm)",
          tag: "Lý thuyết · Lớp 12",
          readTime: "8 phút",
          sections: [
            {
              icon: "💧",
              iconClass: "icon-blue",
              title: "1. Đặc điểm chung",
              body: `<p>Nhóm IA gồm Li, Na, K, Rb, Cs. Cấu hình ns¹. Tính khử rất mạnh, tác dụng mãnh liệt với nước: 2M + 2H₂O → 2MOH + H₂. Bảo quản trong dầu hỏa.</p>`
            },
            {
              icon: "🧪",
              iconClass: "icon-amber",
              title: "2. Hợp chất quan trọng",
              body: `<p>NaCl (muối ăn, điện phân có màng ngăn → NaOH + Cl₂; không màng ngăn → nước Javel). NaHCO₃ (bột nở), Na₂CO₃ (soda).</p>`
            }
          ],
          quiz: [
            { q: "Kim loại kiềm có cấu hình electron lớp ngoài cùng là?", opts: ["ns¹", "ns²", "ns²np¹", "ns²np²"], ans: 0, explain: "Nhóm IA có 1 electron hóa trị ns¹." },
            { q: "Khi cho Na vào dung dịch CuSO₄, sản phẩm thu được gồm?", opts: ["Cu + Na₂SO₄", "Cu(OH)₂ + Na₂SO₄ + H₂", "CuO + NaOH", "Na₂O + Cu"], ans: 1, explain: "Na phản ứng với nước trước, NaOH tạo kết tủa với Cu²⁺." },
            { q: "NaHCO₃ được dùng làm bột nở vì?", opts: ["Dễ tan", "Có vị ngọt", "Bị phân hủy tạo CO₂ khi đun nóng", "Tác dụng với axit"], ans: 2, explain: "2NaHCO₃ → Na₂CO₃ + CO₂ + H₂O." },
            { q: "Để bảo quản kim loại Na, người ta ngâm trong?", opts: ["Nước", "Dầu hỏa", "Rượu", "Axit HCl"], ans: 1, explain: "Dầu hỏa cách ly không khí và ẩm." },
            { q: "Màu ngọn lửa của ion Na⁺ là?", opts: ["Đỏ tía", "Vàng", "Tím nhạt", "Lục"], ans: 1, explain: "Ion Na⁺ cho màu vàng đặc trưng." }
          ]
        },
        {
          id: "l12-7-2",
          title: "Bài 25: Nguyên tố nhóm IIA (Kim loại kiềm thổ)",
          tag: "Lý thuyết · Lớp 12",
          readTime: "8 phút",
          sections: [
            {
              icon: "🧱",
              iconClass: "icon-teal",
              title: "1. Đặc điểm chung",
              body: `<p>Nhóm IIA: Be, Mg, Ca, Sr, Ba. Cấu hình ns². Tính khử mạnh (yếu hơn IA). Ca, Sr, Ba tác dụng mạnh với nước ở nhiệt độ thường; Mg tác dụng chậm với nước nóng; Be không phản ứng.</p>`
            },
            {
              icon: "🏗️",
              iconClass: "icon-amber",
              title: "2. Hợp chất và nước cứng",
              body: `<p>CaCO₃ (đá vôi), CaO (vôi sống), Ca(OH)₂ (vôi tôi), thạch cao CaSO₄.2H₂O. Nước cứng chứa nhiều Ca²⁺, Mg²⁺. Làm mềm bằng đun sôi (tạm thời) hoặc dùng Na₂CO₃, Na₃PO₄.</p>`
            }
          ],
          quiz: [
            { q: "Kim loại kiềm thổ có tính khử mạnh hơn kim loại kiềm cùng chu kì?", opts: ["Đúng", "Sai", "Không so sánh", "Chỉ Be yếu hơn"], ans: 1, explain: "Kim loại kiềm có tính khử mạnh hơn kiềm thổ cùng chu kì." },
            { q: "Phản ứng dùng để dập tắt đám cháy do Mg gây ra?", opts: ["Nước", "CO₂", "Cát khô", "Khí N₂"], ans: 2, explain: "Mg cháy trong CO₂ và N₂, cát khô cách ly oxi." },
            { q: "Nước cứng tạm thời chứa các ion?", opts: ["Ca²⁺, Mg²⁺, Cl⁻", "Ca²⁺, Mg²⁺, HCO₃⁻", "Ca²⁺, Mg²⁺, SO₄²⁻", "Na⁺, K⁺, HCO₃⁻"], ans: 1, explain: "Do Ca(HCO₃)₂, Mg(HCO₃)₂, đun sôi tạo kết tủa." },
            { q: "Thạch cao nung có công thức là?", opts: ["CaSO₄", "CaSO₄.2H₂O", "CaSO₄.½H₂O", "CaSO₄.H₂O"], ans: 2, explain: "CaSO₄.½H₂O dùng bó bột." },
            { q: "Để làm mềm nước cứng vĩnh cửu (chứa Ca²⁺, Mg²⁺, SO₄²⁻, Cl⁻) có thể dùng?", opts: ["Đun sôi", "Na₂CO₃", "HCl", "Ca(OH)₂"], ans: 1, explain: "Na₂CO₃ tạo kết tủa CaCO₃, MgCO₃." }
          ]
        },
        {
          id: "l12-7-3",
          title: "Bài 26: Nhôm và hợp chất",
          tag: "Lý thuyết · Lớp 12",
          readTime: "8 phút",
          sections: [
            {
              icon: "🥫",
              iconClass: "icon-blue",
              title: "1. Tính chất của nhôm",
              body: `<p>Al có tính khử mạnh, bền do lớp Al₂O₃. Phản ứng với axit, kiềm: 2Al + 2NaOH + 6H₂O → 2Na[Al(OH)₄] + 3H₂. Phản ứng nhiệt nhôm: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe.</p>`
            },
            {
              icon: "🧪",
              iconClass: "icon-amber",
              title: "2. Hợp chất lưỡng tính",
              body: `<p>Al₂O₃ và Al(OH)₃ lưỡng tính: tác dụng với cả axit và bazơ. Al(OH)₃ + 3HCl → AlCl₃ + 3H₂O; Al(OH)₃ + NaOH → Na[Al(OH)₄].</p>`
            }
          ],
          quiz: [
            { q: "Nhôm bền trong không khí và nước là do?", opts: ["Tính khử yếu", "Lớp màng Al₂O₃ bảo vệ", "Thụ động", "Không phản ứng"], ans: 1, explain: "Lớp oxit mỏng, bền ngăn cản tác dụng." },
            { q: "Hợp chất nào của nhôm có tính lưỡng tính?", opts: ["AlCl₃", "Al₂O₃", "Al(NO₃)₃", "Al₂(SO₄)₃"], ans: 1, explain: "Al₂O₃ và Al(OH)₃ đều lưỡng tính." },
            { q: "Phản ứng nhiệt nhôm (Al + Fe₂O₃) dùng để?", opts: ["Điều chế sắt", "Hàn đường ray", "Làm pháo hoa", "Cả A và B"], ans: 3, explain: "Phản ứng tỏa nhiệt lớn, dùng hàn nhiệt nhôm và điều chế Fe." },
            { q: "Cho từ từ NaOH vào AlCl₃, hiện tượng?", opts: ["Kết tủa keo trắng, sau đó tan", "Sủi bọt khí", "Kết tủa xanh", "Không hiện tượng"], ans: 0, explain: "Al³⁺ + 3OH⁻ → Al(OH)₃; Al(OH)₃ + OH⁻ → [Al(OH)₄]⁻." },
            { q: "Criolit trong sản xuất nhôm có vai trò?", opts: ["Tăng nhiệt độ nóng chảy", "Hạ nhiệt độ nóng chảy của Al₂O₃", "Làm chất khử", "Tạo hợp kim"], ans: 1, explain: "Hạ nhiệt độ nóng chảy từ 2050°C xuống ~900°C." }
          ]
        }
      ]
    },
    {
      id: "c12-8",
      title: "Chương 8: Sơ lược về kim loại chuyển tiếp dãy thứ nhất và phức chất",
      lessons: [
        {
          id: "l12-8-1",
          title: "Bài 27: Đại cương về kim loại chuyển tiếp dãy thứ nhất",
          tag: "Lý thuyết · Lớp 12",
          readTime: "7 phút",
          sections: [
            {
              icon: "⚙️",
              iconClass: "icon-blue",
              title: "1. Cấu hình electron",
              body: `<p>Các nguyên tố từ Sc (Z=21) đến Cu (Z=29). Cấu hình [Ar]3d¹⁻¹⁰4s¹⁻². Có nhiều số oxi hóa do electron trên phân lớp 3d và 4s.</p>`
            },
            {
              icon: "🔩",
              iconClass: "icon-amber",
              title: "2. Tính chất vật lí và ứng dụng",
              body: `<p>Khó nóng chảy, cứng, dẫn điện, dẫn nhiệt tốt. Dùng làm thép không gỉ, hợp kim siêu cứng, dây dẫn.</p>`
            }
          ],
          quiz: [
            { q: "Cấu hình electron của nguyên tử Fe (Z=26) là?", opts: ["[Ar]3d⁶4s²", "[Ar]3d⁵4s¹", "[Ar]3d⁸4s²", "[Ar]3d⁷4s¹"], ans: 0, explain: "Fe: 1s²2s²2p⁶3s²3p⁶3d⁶4s²." },
            { q: "Kim loại chuyển tiếp dãy thứ nhất gồm các nguyên tố từ?", opts: ["Sc đến Cu", "Ti đến Zn", "Cr đến Cu", "Mn đến Zn"], ans: 0, explain: "Từ Sc (21) đến Cu (29)." },
            { q: "Đặc điểm chung về số oxi hóa của kim loại chuyển tiếp là?", opts: ["Chỉ có +1", "Chỉ có +2", "Nhiều số oxi hóa khác nhau", "Luôn +3"], ans: 2, explain: "Do electron ở phân lớp 3d và 4s." },
            { q: "Kim loại cứng nhất trong dãy chuyển tiếp thứ nhất là?", opts: ["Fe", "Cr", "Ni", "Cu"], ans: 1, explain: "Crom có độ cứng cao nhất (8,5-9 Mohs)." },
            { q: "Ion Fe³⁺ có cấu hình electron là?", opts: ["[Ar]3d⁵", "[Ar]3d⁶", "[Ar]3d⁴", "[Ar]3d³"], ans: 0, explain: "Fe (3d⁶4s²) mất 3e → 3d⁵." }
          ]
        },
        {
          id: "l12-8-2",
          title: "Bài 28: Sơ lược về phức chất",
          tag: "Lý thuyết · Lớp 12",
          readTime: "7 phút",
          sections: [
            {
              icon: "🧪",
              iconClass: "icon-purple",
              title: "1. Khái niệm và cấu tạo",
              body: `<p>Phức chất là hợp chất chứa nguyên tử trung tâm (ion kim loại) liên kết với các phối tử (phân tử hoặc ion) bằng liên kết cho – nhận. Ví dụ: [Cu(NH₃)₄]²⁺, [Fe(CN)₆]⁴⁻.</p>`
            },
            {
              icon: "📐",
              iconClass: "icon-teal",
              title: "2. Dạng hình học",
              body: `<p>Các dạng phổ biến: tứ diện ([ZnCl₄]²⁻), vuông phẳng ([PtCl₄]²⁻), bát diện ([Fe(H₂O)₆]³⁺).</p>`
            }
          ],
          quiz: [
            { q: "Trong phức chất [Ag(NH₃)₂]⁺, nguyên tử trung tâm là?", opts: ["Ag", "N", "H", "Ag⁺"], ans: 3, explain: "Nguyên tử trung tâm là Ag⁺." },
            { q: "Liên kết giữa nguyên tử trung tâm và phối tử trong phức chất là?", opts: ["Liên kết ion", "Liên kết cộng hóa trị cho – nhận", "Liên kết kim loại", "Liên kết hydrogen"], ans: 1, explain: "Phối tử cho cặp e vào orbital trống của nguyên tử trung tâm." },
            { q: "Phức chất [Cu(H₂O)₆]²⁺ có dạng hình học?", opts: ["Tứ diện", "Vuông phẳng", "Bát diện", "Tháp vuông"], ans: 2, explain: "Số phối trí 6 → bát diện." },
            { q: "Phối tử trong phức chất [Co(NH₃)₆]³⁺ là?", opts: ["Co³⁺", "NH₃", "NH₄⁺", "H₂O"], ans: 1, explain: "Phối tử là phân tử NH₃." },
            { q: "Công thức nào sau đây là phức chất?", opts: ["NaCl", "CuSO₄", "[Cu(NH₃)₄]SO₄", "CH₃COOH"], ans: 2, explain: "Chứa ion phức [Cu(NH₃)₄]²⁺." }
          ]
        },
        {
          id: "l12-8-3",
          title: "Bài 29: Một số tính chất và ứng dụng của phức chất",
          tag: "Lý thuyết · Lớp 12",
          readTime: "6 phút",
          sections: [
            {
              icon: "🎨",
              iconClass: "icon-green",
              title: "1. Dấu hiệu tạo phức",
              body: `<p>Thay đổi màu sắc, xuất hiện kết tủa, hòa tan kết tủa. Ví dụ: CuSO₄ màu xanh, thêm NH₃ dư tạo [Cu(NH₃)₄]²⁺ màu xanh thẫm; AgCl tan trong NH₃ tạo [Ag(NH₃)₂]⁺.</p>`
            },
            {
              icon: "💊",
              iconClass: "icon-red",
              title: "2. Ứng dụng",
              body: `<p>Thuốc thử Tollens ([Ag(NH₃)₂]OH) nhận biết aldehyde; cisplatin chữa ung thư; phức chất trong hemoglobin, chlorophyll, vitamin B₁₂.</p>`
            }
          ],
          quiz: [
            { q: "Hiện tượng khi cho dung dịch NH₃ từ từ vào CuSO₄ là?", opts: ["Kết tủa xanh, tan tạo dung dịch xanh thẫm", "Kết tủa trắng", "Sủi bọt khí", "Không hiện tượng"], ans: 0, explain: "Tạo Cu(OH)₂ xanh, sau đó tan thành [Cu(NH₃)₄]²⁺ xanh thẫm." },
            { q: "Thuốc thử Tollens có công thức phức chất là?", opts: ["[Ag(NH₃)₂]OH", "[Ag(NH₃)₂]Cl", "[Ag(CN)₂]⁻", "[Ag(H₂O)₂]⁺"], ans: 0, explain: "Dung dịch [Ag(NH₃)₂]OH dùng để tráng bạc." },
            { q: "Phản ứng thế phối tử là gì?", opts: ["Thay thế nguyên tử trung tâm", "Thay thế phối tử này bằng phối tử khác", "Phá hủy phức chất", "Tạo kết tủa"], ans: 1, explain: "Ví dụ: [Cu(H₂O)₆]²⁺ + 4Cl⁻ → [CuCl₄]²⁻ + 6H₂O." },
            { q: "Phức chất nào có vai trò vận chuyển oxy trong máu?", opts: ["Chlorophyll", "Hemoglobin", "Vitamin B₁₂", "Cisplatin"], ans: 1, explain: "Hemoglobin chứa Fe²⁺ tạo phức với O₂." },
            { q: "Phức chất được dùng trong điều trị ung thư là?", opts: ["Cisplatin", "Transplatin", "Carboplatin", "Cả A và C"], ans: 3, explain: "Cisplatin và carboplatin là thuốc hóa trị." }
          ]
        }
      ]
    }
  ]
};