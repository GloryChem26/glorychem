const AR_QUESTION_BANK = {
  "atomic": [
    { "q": "Hạt mang điện trong nguyên tử gồm:", "opts": ["Proton và neutron", "Electron và neutron", "Proton và electron", "Chỉ có proton"], "ans": 2, "explain": "Proton mang điện tích (+) và electron mang điện tích (-). Neutron không mang điện." },
    { "q": "Lớp electron thứ n có tối đa bao nhiêu orbital?", "opts": ["n", "2n", "n²", "2n²"], "ans": 2, "explain": "Số orbital tối đa trong lớp n là n²." },
    { "q": "Nguyên tử khối trung bình của Chlorine là 35,5. Cl có 2 đồng vị là ³⁵Cl và ³⁷Cl. Phần trăm số nguyên tử của ³⁵Cl là:", "opts": ["25%", "75%", "50%", "80%"], "ans": 1, "explain": "Ā = (35x + 37(100-x))/100 = 35.5 => x = 75%." },
    { "q": "Cấu hình electron của nguyên tử Na (Z=11) là:", "opts": ["1s²2s²2p⁶3s¹", "1s²2s²2p⁶3s²", "1s²2s²2p⁵3s²", "1s²2s²2p⁶3p¹"], "ans": 0, "explain": "Na có 11 electron: 1s² 2s² 2p⁶ 3s¹." },
    { "q": "Nguyên tố có Z=19 thuộc nhóm nào trong bảng tuần hoàn?", "opts": ["IA", "IIA", "VIA", "VIIA"], "ans": 0, "explain": "Z=19 là K: [Ar]4s¹. Lớp ngoài cùng có 1e => nhóm IA." }
  ],
  "periodic": [
    { "q": "Trong bảng tuần hoàn, các nguyên tố được sắp xếp theo chiều tăng dần của:", "opts": ["Nguyên tử khối", "Số khối", "Điện tích hạt nhân", "Số neutron"], "ans": 2, "explain": "Nguyên tắc sắp xếp hiện đại là theo chiều tăng dần điện tích hạt nhân (số hiệu nguyên tử Z)." },
    { "q": "Nguyên tố X ở chu kì 3, nhóm VA. Số electron lớp ngoài cùng của X là:", "opts": ["3", "5", "15", "8"], "ans": 1, "explain": "Số thứ tự nhóm A = số electron lớp ngoài cùng." },
    { "q": "Độ âm điện biến đổi như thế nào trong một chu kì từ trái sang phải?", "opts": ["Tăng dần", "Giảm dần", "Không đổi", "Tăng rồi giảm"], "ans": 0, "explain": "Trong một chu kì, độ âm điện tăng dần theo chiều tăng của điện tích hạt nhân." },
    { "q": "Bán kính nguyên tử của Na so với Mg (cùng chu kì 3) như thế nào?", "opts": ["Na < Mg", "Na > Mg", "Na = Mg", "Không so sánh được"], "ans": 1, "explain": "Trong cùng chu kì, đi từ trái sang phải bán kính nguyên tử giảm dần => Na > Mg." },
    { "q": "Nguyên tố Halogen có tính phi kim mạnh nhất là:", "opts": ["Chlorine", "Fluorine", "Bromine", "Iodine"], "ans": 1, "explain": "Fluorine là phi kim mạnh nhất trong bảng tuần hoàn." }
  ],
  "chemical-bonds": [
    { "q": "Liên kết trong phân tử NaCl là liên kết:", "opts": ["Cộng hóa trị phân cực", "Cộng hóa trị không phân cực", "Ion", "Cho nhận"], "ans": 2, "explain": "NaCl được tạo thành từ kim loại điển hình (Na) và phi kim điển hình (Cl) => Liên kết ion." },
    { "q": "Phân tử N₂ có bao nhiêu liên kết cộng hóa trị giữa 2 nguyên tử Nitrogen?", "opts": ["1 liên kết đơn", "1 liên kết đôi", "1 liên kết ba", "2 liên kết đơn"], "ans": 2, "explain": "Mỗi nguyên tử N có 5e lớp ngoài cùng, cần thêm 3e => Góp chung 3 cặp e tạo liên kết ba (N≡N)." },
    { "q": "Đặc điểm của liên kết cộng hóa trị phân cực là cặp electron dùng chung:", "opts": ["Bị lệch về phía nguyên tử có độ âm điện lớn hơn", "Bị lệch về phía nguyên tử có độ âm điện nhỏ hơn", "Nằm chính giữa 2 nguyên tử", "Chuyển hẳn sang một nguyên tử"], "ans": 0, "explain": "Trong liên kết CHT phân cực, cặp e bị hút về phía nguyên tử có độ âm điện lớn hơn." },
    { "q": "Liên kết hydrogen được hình thành giữa nguyên tử H với các nguyên tử:", "opts": ["N, O, F", "C, H, O", "P, S, Cl", "Cả 3 loại trên"], "ans": 0, "explain": "H liên kết với các nguyên tố có độ âm điện lớn và còn cặp e tự do như N, O, F." },
    { "q": "Phân tử CO₂ có hình dạng gì?", "opts": ["Đường thẳng", "Góc V", "Tam giác đều", "Tứ diện"], "ans": 0, "explain": "CO₂ (O=C=O) có cấu trúc thẳng do nguyên tử C ở trạng thái lai hóa sp." }
  ],
  "redox": [
    { "q": "Sự oxi hóa là quá trình:", "opts": ["Nhường electron", "Nhận electron", "Làm giảm số oxi hóa", "Kết hợp với hydrogen"], "ans": 0, "explain": "Khử cho (nhường e - tăng số oxh) ; O nhận (nhận e - giảm số oxh). Sự oxi hóa là quá trình nhường e." },
    { "q": "Chất khử là chất:", "opts": ["Nhường electron", "Nhận electron", "Bị oxi hóa", "Cả A và C đều đúng"], "ans": 3, "explain": "Chất khử là chất nhường e => số oxh tăng => bị oxi hóa." },
    { "q": "Trong phản ứng: Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag. Cu đóng vai trò là:", "opts": ["Chất oxi hóa", "Chất khử", "Môi trường", "Chất bị khử"], "ans": 1, "explain": "Cu (0) → Cu (+2) + 2e. Cu nhường e nên là chất khử." },
    { "q": "Số oxi hóa của Lưu huỳnh (S) trong H₂SO₄ là:", "opts": ["+2", "+4", "+6", "-2"], "ans": 2, "explain": "2(+1) + x + 4(-2) = 0 => x = +6." },
    { "q": "Trong phản ứng oxi hóa - khử, tổng số electron nhường:", "opts": ["Lớn hơn tổng số electron nhận", "Nhỏ hơn tổng số electron nhận", "Bằng tổng số electron nhận", "Không phụ thuộc vào số electron nhận"], "ans": 2, "explain": "Theo định luật bảo toàn electron, tổng số e nhường phải bằng tổng số e nhận." }
  ],
  "organic": [
    { "q": "Thành phần nguyên tố bắt buộc phải có trong hợp chất hữu cơ là:", "opts": ["Hydrogen", "Carbon", "Oxygen", "Nitrogen"], "ans": 1, "explain": "Hợp chất hữu cơ là hợp chất của Carbon (trừ CO, CO₂, muối carbonat, cyanua...)." },
    { "q": "Liên kết hóa học chủ yếu trong hợp chất hữu cơ là:", "opts": ["Liên kết ion", "Liên kết cộng hóa trị", "Liên kết hydrogen", "Liên kết kim loại"], "ans": 1, "explain": "Do C là phi kim trung bình, các nguyên tố khác (H, O, N) cũng là phi kim nên chủ yếu tạo liên kết cộng hóa trị." },
    { "q": "Hydrocarbon là hợp chất hữu cơ chỉ chứa 2 nguyên tố:", "opts": ["C và O", "C và H", "C và N", "H và O"], "ans": 1, "explain": "Tên gọi HYDRO-CARBON đã chỉ rõ thành phần gồm Hydro và Carbon." },
    { "q": "Đặc điểm cấu tạo electron của nguyên tử Carbon trong hợp chất hữu cơ là:", "opts": ["Luôn có hóa trị IV", "Luôn có hóa trị II", "Có hóa trị thay đổi từ II đến IV", "Không có hóa trị cố định"], "ans": 0, "explain": "Trong hợp chất hữu cơ, Carbon luôn thể hiện hóa trị IV." },
    { "q": "Phản ứng đặc trưng của Alkane là:", "opts": ["Phản ứng cộng", "Phản ứng thế", "Phản ứng trùng hợp", "Phản ứng oxy hóa"], "ans": 1, "explain": "Alkane (Hydrocarbon no) chỉ chứa liên kết đơn bền vững nên ưu tiên phản ứng thế." }
  ],
  "thermo": [
    { "q": "Phản ứng tỏa nhiệt là phản ứng:", "opts": ["Giải phóng năng lượng dưới dạng nhiệt", "Hấp thụ năng lượng dưới dạng nhiệt", "Làm giảm nhiệt độ môi trường", "Có biến thiên enthalpy dương (ΔH > 0)"], "ans": 0, "explain": "Phản ứng tỏa nhiệt (Exothermic) giải phóng nhiệt ra môi trường, ΔH < 0." },
    { "q": "Biến thiên enthalpy chuẩn của phản ứng được xác định ở điều kiện:", "opts": ["25°C (298K) và 1 bar", "0°C và 1 atm", "100°C và 1 bar", "Tùy ý người làm thí nghiệm"], "ans": 0, "explain": "Điều kiện chuẩn: 1 bar (chất khí), nồng độ 1 mol/L (dung dịch) và thường chọn nhiệt độ 298K (25°C)." },
    { "q": "Phản ứng có ΔᵣH⁰₂₉₈ > 0 là phản ứng:", "opts": ["Tỏa nhiệt", "Thu nhiệt", "Tự phát", "Không xảy ra"], "ans": 1, "explain": "ΔH dương nghĩa là hệ nhận nhiệt từ môi trường => Phản ứng thu nhiệt (Endothermic)." },
    { "q": "Nhiệt tạo thành chuẩn của các đơn chất ở trạng thái bền vững nhất bằng:", "opts": ["100 kJ/mol", "1 kJ/mol", "0 kJ/mol", "-100 kJ/mol"], "ans": 2, "explain": "Theo quy ước, nhiệt tạo thành chuẩn ΔfH⁰₂₉₈ của các đơn chất bền ở điều kiện chuẩn bằng 0." },
    { "q": "Phản ứng nung vôi: CaCO₃(s) → CaO(s) + CO₂(g) là phản ứng:", "opts": ["Tỏa nhiệt", "Thu nhiệt", "Oxi hóa khử", "Trao đổi"], "ans": 1, "explain": "Quá trình phân hủy nhiệt CaCO₃ cần cung cấp nhiệt liên tục => Thu nhiệt." }
  ],
  "speed": [
    { "q": "Tốc độ phản ứng là đại lượng đặc trưng cho:", "opts": ["Độ mạnh của phản ứng", "Năng lượng của phản ứng", "Sự nhanh hay chậm của phản ứng", "Thể tích của phản ứng"], "ans": 2, "explain": "Tốc độ phản ứng xác định độ biến thiên nồng độ chất phản ứng hoặc sản phẩm trong một đơn vị thời gian." },
    { "q": "Yếu tố nào sau đây KHÔNG làm tăng tốc độ phản ứng?", "opts": ["Tăng nhiệt độ", "Tăng nồng độ chất phản ứng", "Sử dụng chất xúc tác", "Tăng thể tích bình chứa"], "ans": 3, "explain": "Tăng thể tích bình (trong khi số mol không đổi) làm giảm nồng độ/áp suất => Giảm tốc độ phản ứng." },
    { "q": "Chất xúc tác làm tăng tốc độ phản ứng bằng cách:", "opts": ["Làm tăng nhiệt độ", "Làm giảm năng lượng hoạt hóa", "Làm tăng năng lượng của các phân tử", "Thay đổi biến thiên enthalpy"], "ans": 1, "explain": "Chất xúc tác tạo ra một lộ trình phản ứng mới có năng lượng hoạt hóa (Ea) thấp hơn." },
    { "q": "Khi nghiền nhỏ một chất rắn, yếu tố nào ảnh hưởng đến tốc độ phản ứng?", "opts": ["Nhiệt độ", "Áp suất", "Diện tích bề mặt tiếp xúc", "Chất xúc tác"], "ans": 2, "explain": "Nghiền nhỏ giúp tăng diện tích tiếp xúc, làm tăng số va chạm hiệu quả giữa các phân tử." },
    { "q": "Khi tăng nhiệt độ lên thêm 10 độ, tốc độ phản ứng tăng 2-4 lần. Đây là quy tắc của:", "opts": ["Hess", "Van't Hoff", "Le Chatelier", "Lomonosov"], "ans": 1, "explain": "Đây là nội dung quy tắc kinh nghiệm Van't Hoff về sự ảnh hưởng của nhiệt độ đến tốc độ phản ứng." }
  ],
  "equilib": [
    { "q": "Trạng thái cân bằng hóa học là trạng thái mà:", "opts": ["Phản ứng dừng lại hoàn toàn", "Nồng độ các chất bằng nhau", "Tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch", "Chỉ còn các chất sản phẩm"], "ans": 2, "explain": "Cân bằng hóa học là cân bằng động, phản ứng vẫn xảy ra nhưng với tốc độ v_thuận = v_nghịch." },
    { "q": "Yếu tố nào sau đây tác động làm chuyển dịch cân bằng hóa học?", "opts": ["Nhiệt độ", "Nồng độ", "Áp suất (đối với hệ có chất khí)", "Cả 3 yếu tố trên"], "ans": 3, "explain": "Theo nguyên lí Le Chatelier: nồng độ, nhiệt độ và áp suất ảnh hưởng đến cân bằng. Chất xúc tác KHÔNG làm chuyển dịch cân bằng." },
    { "q": "Cho phản ứng: N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH < 0. Để tăng hiệu suất tạo NH₃, ta nên:", "opts": ["Giảm áp suất", "Tăng nhiệt độ", "Tăng áp suất", "Dùng chất xúc tác"], "ans": 2, "explain": "ΔH < 0 (tỏa nhiệt) => Giảm nhiệt độ sẽ chuyển dịch theo chiều thuận. Tổng hệ số khí trái (4) > phải (2) => Tăng áp suất chuyển dịch theo chiều thuận (tạo NH₃)." },
    { "q": "Hằng số cân bằng Kc của một phản ứng chỉ phụ thuộc vào:", "opts": ["Nồng độ chất đầu", "Nhiệt độ", "Áp suất", "Chất xúc tác"], "ans": 1, "explain": "Hằng số Kc chỉ phụ thuộc vào bản chất phản ứng và nhiệt độ." },
    { "q": "Nguyên lí Le Chatelier nói về sự chuyển dịch cân bằng khi:", "opts": ["Thay đổi nồng độ", "Thay đổi áp suất", "Thay đổi nhiệt độ", "Tất cả các thay đổi trên"], "ans": 3, "explain": "Nguyên lí Le Chatelier mô tả xu hướng chống lại sự thay đổi các điều kiện bên ngoài của hệ đang cân bằng." }
  ],
  "halogens": [
    { "q": "Chlorine tác dụng với dung dịch NaOH ở nhiệt độ thường tạo ra:", "opts": ["NaCl và NaClO", "NaCl và NaClO₃", "NaClO và NaClO₂", "Chỉ NaCl"], "ans": 0, "explain": "Cl₂ + 2NaOH → NaCl + NaClO + H₂O (Nước Gia-ven)." },
    { "q": "Tính oxy hóa của các đơn chất Halogen biến đổi theo thứ tự:", "opts": ["F₂ > Cl₂ > Br₂ > I₂", "I₂ > Br₂ > Cl₂ > F₂", "Cl₂ > F₂ > Br₂ > I₂", "F₂ < Cl₂ < Br₂ < I₂"], "ans": 0, "explain": "Trong nhóm Halogen, tính oxy hóa giảm dần từ F₂ đến I₂ theo sự giảm độ âm điện và tăng bán kính." },
    { "q": "Thuốc thử dùng để nhận biết ion Halide (Cl⁻, Br⁻, I⁻) là:", "opts": ["Quỳ tím", "Dung dịch AgNO₃", "Dung dịch BaCl₂", "Dung dịch NaOH"], "ans": 1, "explain": "AgNO₃ tạo kết tủa trắng với Cl⁻ (AgCl), vàng nhạt với Br⁻ (AgBr), vàng đậm với I⁻ (AgI)." },
    { "q": "Axit Halogenhydric nào có tính axit mạnh nhất?", "opts": ["HF", "HCl", "HBr", "HI"], "ans": 3, "explain": "Tính axit tăng dần từ HF (axit yếu) đến HI (axit rất mạnh) do độ bền liên kết H-X giảm dần." },
    { "q": "Hiện tượng thăng hoa là đặc tính vật lý đặc trưng của đơn chất Halogen nào?", "opts": ["F₂", "Cl₂", "Br₂", "I₂"], "ans": 3, "explain": "Iodine (I₂) có thể chuyển từ trạng thái rắn sang hơi mà không qua trạng thái lỏng (thăng hoa)." }
  ],
  "nitrogen": [
    { "q": "Trong phòng thí nghiệm, Nitrogen được điều chế bằng cách đun nóng dung dịch nào?", "opts": ["NH₄Cl và NaNO₂", "NH₃ và O₂", "HNO₃ và Cu", "KNO₃"], "ans": 0, "explain": "NH₄Cl + NaNO₂ (đun nóng) → N₂ ↑ + NaCl + 2H₂O." },
    { "q": "Tính chất hóa học đặc trưng của Ammonia (NH₃) là:", "opts": ["Tính oxi hóa mạnh", "Tính base yếu và tính khử", "Tính base mạnh", "Tính axit yếu"], "ans": 1, "explain": "NH₃ có cặp e tự do trên N => base yếu. Số oxh của N là -3 (thấp nhất) => tính khử." },
    { "q": "Axit Nitric (HNO₃) là một chất:", "opts": ["Oxi hóa mạnh", "Khử mạnh", "Base yếu", "Lưỡng tính"], "ans": 0, "explain": "Số oxi hóa của N trong HNO₃ là +5 (cao nhất) => Oxi hóa rất mạnh, tác dụng với hầu hết kim loại." },
    { "q": "Sản phẩm chính của phản ứng giữa Cu và HNO₃ loãng là khí:", "opts": ["NO₂", "NO", "N₂O", "H₂"], "ans": 1, "explain": "3Cu + 8HNO₃ (loãng) → 3Cu(NO₃)₂ + 2NO ↑ + 4H₂O." },
    { "q": "Hiện tượng 'mưa axit' chủ yếu gây ra bởi khí NOₓ và khí nào?", "opts": ["CO₂", "CH₄", "SO₂", "NH₃"], "ans": 2, "explain": "NOₓ và SO₂ khi gặp nước mưa tạo thành HNO₃ và H₂SO₄ gây ra hiện tượng mưa axit." }
  ],
  "sulfur": [
    { "q": "Lưu huỳnh (S) thể hiện tính chất gì khi tác dụng với Kim loại và Hydrogen?", "opts": ["Tính khử", "Tính oxi hóa", "Vừa khử vừa oxi hóa", "Không thể hiện"], "ans": 1, "explain": "S (0) → S (-2). S đóng vai trò chất oxi hóa khi tác dụng với chất khử mạnh hơn như kim loại/H₂." },
    { "q": "Axit Sunfuric đặc (H₂SO₄ đặc) có đặc tính nổi bật là:", "opts": ["Tính base", "Tính khử", "Tính háo nước và oxi hóa mạnh", "Axit yếu"], "ans": 2, "explain": "H₂SO₄ đặc cực kỳ háo nước (lấy nước từ các hợp chất hữu cơ) và là chất oxi hóa rất mạnh." },
    { "q": "Để pha loãng axit H₂SO₄ đặc, cách làm nào AN TOÀN nhất?", "opts": ["Rót nhanh nước vào axit", "Rót axit vào nước và khuấy đều", "Rót cùng lúc cả hai", "Đổ nước vào axit"], "ans": 1, "explain": "Luôn rót axit vào nước một cách chậm rãi, vì quá trình hòa tan tỏa nhiệt rất mạnh, đổ nước vào axit sẽ làm axit bắn tung tóe gây bỏng." },
    { "q": "Khí SO₂ là một chất ô nhiễm không khí phổ biến. SO₂ có tính chất:", "opts": ["Chỉ có tính khử", "Chỉ có tính oxi hóa", "Vừa có tính khử vừa có tính oxi hóa", "Không có tính khử và oxi hóa"], "ans": 2, "explain": "S trong SO₂ có số oxh +4 (trung gian) => có thể tăng lên +6 (khử) hoặc giảm xuống 0, -2 (oxi hóa)." },
    { "q": "Muối Sulfate tan nhiều trong nước nhất là:", "opts": ["BaSO₄", "PbSO₄", "CaSO₄", "MgSO₄"], "ans": 3, "explain": "BaSO₄ kết tủa trắng, PbSO₄ kết tủa, CaSO₄ ít tan. MgSO₄ tan tốt trong nước." }
  ]
};

console.log("⚡ AR_QUESTION_BANK initialized from question.js with", Object.keys(AR_QUESTION_BANK).length, "topics.");
