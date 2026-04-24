/* ═══ BẢNG TUẦN HOÀN (PERIODIC TABLE) JS ═══ */

let ptRendered = false;
let atomSceneInfo = null;
let moleculeSceneInfo = null;
let currentMoleculeId = null;
let moleculeMobileUiReady = false;

const MOLECULE_LIBRARY = [
  {
    id: 'h2o',
    name: 'Nước',
    formula: 'H₂O',
    desc: 'Phân tử phân cực mạnh, hình học gấp khúc do hai cặp electron tự do trên oxy.',
    geometry: 'Bent (gấp khúc)',
    angle: '104.5°',
    hybridization: 'sp3 (nguyên tử O)',
    polarity: 'Phân cực',
    centralAtom: 'O',
    atoms: [
      { el: 'O', pos: [0, 0, 0] },
      { el: 'H', pos: [0.96, 0.2, 0] },
      { el: 'H', pos: [-0.26, 0.93, 0] }
    ],
    bonds: [[0, 1], [0, 2]]
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    desc: 'Phân tử tuyến tính, hai liên kết đôi C=O đối xứng nên tổng moment lưỡng cực bằng 0.',
    geometry: 'Linear (thẳng)',
    angle: '180°',
    hybridization: 'sp (nguyên tử C)',
    polarity: 'Không phân cực',
    centralAtom: 'C',
    atoms: [
      { el: 'O', pos: [-1.16, 0, 0] },
      { el: 'C', pos: [0, 0, 0] },
      { el: 'O', pos: [1.16, 0, 0] }
    ],
    bonds: [[1, 0, 2], [1, 2, 2]]
  },
  {
    id: 'ch4',
    name: 'Methane',
    formula: 'CH₄',
    desc: 'Phân tử cơ bản của hydrocarbon, cấu trúc tứ diện đều với bốn liên kết sigma tương đương.',
    geometry: 'Tetrahedral',
    angle: '109.5°',
    hybridization: 'sp3 (nguyên tử C)',
    polarity: 'Không phân cực',
    centralAtom: 'C',
    atoms: [
      { el: 'C', pos: [0, 0, 0] },
      { el: 'H', pos: [0.63, 0.63, 0.63] },
      { el: 'H', pos: [-0.63, -0.63, 0.63] },
      { el: 'H', pos: [-0.63, 0.63, -0.63] },
      { el: 'H', pos: [0.63, -0.63, -0.63] }
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]]
  },
  {
    id: 'nh3',
    name: 'Ammonia',
    formula: 'NH₃',
    desc: 'Phân tử chóp tam giác với một cặp e tự do trên N, là base yếu quan trọng.',
    geometry: 'Trigonal pyramidal',
    angle: '107°',
    hybridization: 'sp3 (nguyên tử N)',
    polarity: 'Phân cực',
    centralAtom: 'N',
    atoms: [
      { el: 'N', pos: [0, 0.15, 0] },
      { el: 'H', pos: [0.94, -0.28, 0] },
      { el: 'H', pos: [-0.47, -0.28, 0.81] },
      { el: 'H', pos: [-0.47, -0.28, -0.81] }
    ],
    bonds: [[0, 1], [0, 2], [0, 3]]
  },
  {
    id: 'so2',
    name: 'Sulfur Dioxide',
    formula: 'SO₂',
    desc: 'Phân tử gấp khúc có cộng hưởng, chất gây mưa acid và ô nhiễm không khí.',
    geometry: 'Bent (gấp khúc)',
    angle: '119°',
    hybridization: 'sp2 (nguyên tử S)',
    polarity: 'Phân cực',
    centralAtom: 'S',
    atoms: [
      { el: 'S', pos: [0, 0, 0] },
      { el: 'O', pos: [1.2, 0.25, 0] },
      { el: 'O', pos: [-0.56, 1.09, 0] }
    ],
    bonds: [[0, 1, 2], [0, 2, 2]]
  },
  {
    id: 'bf3',
    name: 'Boron Trifluoride',
    formula: 'BF₃',
    desc: 'Phân tử phẳng tam giác, thiếu electron ở B nên là acid Lewis điển hình.',
    geometry: 'Trigonal planar',
    angle: '120°',
    hybridization: 'sp2 (nguyên tử B)',
    polarity: 'Không phân cực',
    centralAtom: 'B',
    atoms: [
      { el: 'B', pos: [0, 0, 0] },
      { el: 'F', pos: [1.28, 0, 0] },
      { el: 'F', pos: [-0.64, 1.11, 0] },
      { el: 'F', pos: [-0.64, -1.11, 0] }
    ],
    bonds: [[0, 1], [0, 2], [0, 3]]
  },
  {
    id: 'pcl5',
    name: 'Phosphorus Pentachloride',
    formula: 'PCl₅',
    desc: 'Ví dụ kinh điển của cấu trúc lưỡng tháp tam giác với 5 liên kết quanh nguyên tử trung tâm.',
    geometry: 'Trigonal bipyramidal',
    angle: '90° / 120°',
    hybridization: 'sp3d (nguyên tử P)',
    polarity: 'Không phân cực (dạng khí)',
    centralAtom: 'P',
    atoms: [
      { el: 'P', pos: [0, 0, 0] },
      { el: 'Cl', pos: [1.5, 0, 0] },
      { el: 'Cl', pos: [-0.75, 1.3, 0] },
      { el: 'Cl', pos: [-0.75, -1.3, 0] },
      { el: 'Cl', pos: [0, 0, 1.55] },
      { el: 'Cl', pos: [0, 0, -1.55] }
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5]]
  },
  {
    id: 'sf6',
    name: 'Sulfur Hexafluoride',
    formula: 'SF₆',
    desc: 'Phân tử bát diện đều, khí cách điện rất mạnh dùng trong kỹ thuật điện cao thế.',
    geometry: 'Octahedral',
    angle: '90°',
    hybridization: 'sp3d2 (nguyên tử S)',
    polarity: 'Không phân cực',
    centralAtom: 'S',
    atoms: [
      { el: 'S', pos: [0, 0, 0] },
      { el: 'F', pos: [1.45, 0, 0] },
      { el: 'F', pos: [-1.45, 0, 0] },
      { el: 'F', pos: [0, 1.45, 0] },
      { el: 'F', pos: [0, -1.45, 0] },
      { el: 'F', pos: [0, 0, 1.45] },
      { el: 'F', pos: [0, 0, -1.45] }
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]]
  },
  {
    id: 'c2h4',
    name: 'Ethene',
    formula: 'C₂H₄',
    desc: 'Phân tử có liên kết đôi C=C phẳng, monomer cơ bản của phản ứng trùng hợp tạo polyethylene.',
    geometry: 'Planar around C=C',
    angle: '≈120°',
    hybridization: 'sp2 (hai nguyên tử C)',
    polarity: 'Không phân cực',
    centralAtom: 'C',
    atoms: [
      { el: 'C', pos: [-0.67, 0, 0] },
      { el: 'C', pos: [0.67, 0, 0] },
      { el: 'H', pos: [-1.24, 0.92, 0] },
      { el: 'H', pos: [-1.24, -0.92, 0] },
      { el: 'H', pos: [1.24, 0.92, 0] },
      { el: 'H', pos: [1.24, -0.92, 0] }
    ],
    bonds: [[0, 1, 2], [0, 2], [0, 3], [1, 4], [1, 5]]
  },
  {
    id: 'c2h2',
    name: 'Acetylene',
    formula: 'C₂H₂',
    desc: 'Phân tử tuyến tính với liên kết ba C≡C, nhiên liệu chính trong hàn cắt oxy-acetylene.',
    geometry: 'Linear (thẳng)',
    angle: '180°',
    hybridization: 'sp (hai nguyên tử C)',
    polarity: 'Không phân cực',
    centralAtom: 'C',
    atoms: [
      { el: 'H', pos: [-1.8, 0, 0] },
      { el: 'C', pos: [-0.6, 0, 0] },
      { el: 'C', pos: [0.6, 0, 0] },
      { el: 'H', pos: [1.8, 0, 0] }
    ],
    bonds: [[0, 1], [1, 2, 3], [2, 3]]
  },
  {
    id: 'h2so4',
    name: 'Sulfuric Acid',
    formula: 'H₂SO₄',
    desc: 'Acid mạnh rất quan trọng trong công nghiệp, nguyên tử S ở trung tâm có môi trường gần tứ diện.',
    geometry: 'Tetrahedral around S',
    angle: '≈109.5°',
    hybridization: 'sp3 (xấp xỉ quanh S)',
    polarity: 'Phân cực',
    centralAtom: 'S',
    atoms: [
      { el: 'S', pos: [0, 0, 0] },
      { el: 'O', pos: [1.28, 0, 0] },
      { el: 'O', pos: [-1.28, 0, 0] },
      { el: 'O', pos: [0, 1.2, 0.75] },
      { el: 'O', pos: [0, -1.2, -0.75] },
      { el: 'H', pos: [0, 1.98, 1.2] },
      { el: 'H', pos: [0, -1.98, -1.2] }
    ],
    bonds: [[0, 1, 2], [0, 2, 2], [0, 3], [0, 4], [3, 5], [4, 6]]
  },
  {
    id: 'c6h6',
    name: 'Benzene',
    formula: 'C₆H₆',
    desc: 'Vòng thơm phẳng, hệ pi liên hợp bền đặc trưng cho hóa học hữu cơ aromatic.',
    geometry: 'Hexagonal planar',
    angle: '120°',
    hybridization: 'sp2 (mọi C trong vòng)',
    polarity: 'Không phân cực',
    centralAtom: 'C',
    atoms: [
      { el: 'C', pos: [1.4, 0, 0] },
      { el: 'C', pos: [0.7, 1.21, 0] },
      { el: 'C', pos: [-0.7, 1.21, 0] },
      { el: 'C', pos: [-1.4, 0, 0] },
      { el: 'C', pos: [-0.7, -1.21, 0] },
      { el: 'C', pos: [0.7, -1.21, 0] },
      { el: 'H', pos: [2.48, 0, 0] },
      { el: 'H', pos: [1.24, 2.15, 0] },
      { el: 'H', pos: [-1.24, 2.15, 0] },
      { el: 'H', pos: [-2.48, 0, 0] },
      { el: 'H', pos: [-1.24, -2.15, 0] },
      { el: 'H', pos: [1.24, -2.15, 0] }
    ],
    bonds: [[0, 1, 2], [1, 2], [2, 3, 2], [3, 4], [4, 5, 2], [5, 0], [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]]
  },
  {
    id: 'o2',
    name: 'Oxygen',
    formula: 'O₂',
    desc: 'Phan tu khi can thiet cho ho hap, lien ket doi O=O va co tinh thuan tu.',
    geometry: 'Linear (thang)',
    angle: '180°',
    hybridization: 'sp2 (moi O)',
    polarity: 'Khong phan cuc',
    centralAtom: 'O',
    atoms: [
      { el: 'O', pos: [-0.62, 0, 0] },
      { el: 'O', pos: [0.62, 0, 0] }
    ],
    bonds: [[0, 1, 2]]
  },
  {
    id: 'n2',
    name: 'Nitrogen',
    formula: 'N₂',
    desc: 'Phan tu ben voi lien ket ba N≡N, thanh phan lon nhat cua khi quyen.',
    geometry: 'Linear (thang)',
    angle: '180°',
    hybridization: 'sp (moi N)',
    polarity: 'Khong phan cuc',
    centralAtom: 'N',
    atoms: [
      { el: 'N', pos: [-0.56, 0, 0] },
      { el: 'N', pos: [0.56, 0, 0] }
    ],
    bonds: [[0, 1, 3]]
  },
  {
    id: 'hcl',
    name: 'Hydrogen Chloride',
    formula: 'HCl',
    desc: 'Phan tu phan cuc manh, hoa tan tao acid hydrochloric.',
    geometry: 'Linear (thang)',
    angle: '180°',
    hybridization: 'sp3 (xap xi quanh Cl)',
    polarity: 'Phan cuc',
    centralAtom: 'Cl',
    atoms: [
      { el: 'H', pos: [-0.65, 0, 0] },
      { el: 'Cl', pos: [0.65, 0, 0] }
    ],
    bonds: [[0, 1]]
  },
  {
    id: 'hf',
    name: 'Hydrogen Fluoride',
    formula: 'HF',
    desc: 'Lien ket H-F rat phan cuc, tao lien ket hydro manh giua cac phan tu.',
    geometry: 'Linear (thang)',
    angle: '180°',
    hybridization: 'sp3 (xap xi quanh F)',
    polarity: 'Phan cuc',
    centralAtom: 'F',
    atoms: [
      { el: 'H', pos: [-0.5, 0, 0] },
      { el: 'F', pos: [0.5, 0, 0] }
    ],
    bonds: [[0, 1]]
  },
  {
    id: 'h2',
    name: 'Hydrogen',
    formula: 'H₂',
    desc: 'Phan tu don gian nhat, khi khong mau va la nhien lieu sach tiem nang.',
    geometry: 'Linear (thang)',
    angle: '180°',
    hybridization: '1s',
    polarity: 'Khong phan cuc',
    centralAtom: 'H',
    atoms: [
      { el: 'H', pos: [-0.37, 0, 0] },
      { el: 'H', pos: [0.37, 0, 0] }
    ],
    bonds: [[0, 1]]
  },
  {
    id: 'no2',
    name: 'Nitrogen Dioxide',
    formula: 'NO₂',
    desc: 'Phan tu goc tu do mau nau do, khi o nhiem quan trong trong khoi thai.',
    geometry: 'Bent (gap khuc)',
    angle: '134°',
    hybridization: 'sp2 (xap xi quanh N)',
    polarity: 'Phan cuc',
    centralAtom: 'N',
    atoms: [
      { el: 'N', pos: [0, 0, 0] },
      { el: 'O', pos: [1.15, 0.3, 0] },
      { el: 'O', pos: [-0.76, 0.91, 0] }
    ],
    bonds: [[0, 1, 2], [0, 2]]
  },
  {
    id: 'n2o',
    name: 'Nitrous Oxide',
    formula: 'N₂O',
    desc: 'Khi cuoi co cau truc gan thang, dung trong y te va cong nghiep thuc pham.',
    geometry: 'Linear (thang)',
    angle: '180°',
    hybridization: 'sp (nguyen tu trung tam)',
    polarity: 'Phan cuc yeu',
    centralAtom: 'N',
    atoms: [
      { el: 'N', pos: [-1.12, 0, 0] },
      { el: 'N', pos: [0, 0, 0] },
      { el: 'O', pos: [1.18, 0, 0] }
    ],
    bonds: [[0, 1, 2], [1, 2, 2]]
  },
  {
    id: 'h2s',
    name: 'Hydrogen Sulfide',
    formula: 'H₂S',
    desc: 'Khi mui trung thoi, hinh hoc gap khuc tuong tu nuoc nhung goc nho hon.',
    geometry: 'Bent (gap khuc)',
    angle: '92°',
    hybridization: 'sp3 (nguyen tu S)',
    polarity: 'Phan cuc',
    centralAtom: 'S',
    atoms: [
      { el: 'S', pos: [0, 0, 0] },
      { el: 'H', pos: [0.95, 0.22, 0] },
      { el: 'H', pos: [-0.18, 0.95, 0] }
    ],
    bonds: [[0, 1], [0, 2]]
  },
  {
    id: 'ph3',
    name: 'Phosphine',
    formula: 'PH₃',
    desc: 'Phan tu chop tam giac, tinh base yeu hon NH3 do su lai hoa thap.',
    geometry: 'Trigonal pyramidal',
    angle: '93.5°',
    hybridization: 'sp3 (xap xi quanh P)',
    polarity: 'Phan cuc yeu',
    centralAtom: 'P',
    atoms: [
      { el: 'P', pos: [0, 0.12, 0] },
      { el: 'H', pos: [0.95, -0.28, 0] },
      { el: 'H', pos: [-0.47, -0.28, 0.81] },
      { el: 'H', pos: [-0.47, -0.28, -0.81] }
    ],
    bonds: [[0, 1], [0, 2], [0, 3]]
  },
  {
    id: 'c2h6',
    name: 'Ethane',
    formula: 'C₂H₆',
    desc: 'Alkane don gian voi lien ket sigma C-C, cau truc quanh moi C la tu dien.',
    geometry: 'Tetrahedral around each C',
    angle: '109.5°',
    hybridization: 'sp3 (hai nguyen tu C)',
    polarity: 'Khong phan cuc',
    centralAtom: 'C',
    atoms: [
      { el: 'C', pos: [-0.77, 0, 0] },
      { el: 'C', pos: [0.77, 0, 0] },
      { el: 'H', pos: [-1.25, 0.92, 0.55] },
      { el: 'H', pos: [-1.25, -0.92, 0.55] },
      { el: 'H', pos: [-1.25, 0, -1.05] },
      { el: 'H', pos: [1.25, 0.92, -0.55] },
      { el: 'H', pos: [1.25, -0.92, -0.55] },
      { el: 'H', pos: [1.25, 0, 1.05] }
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [1, 7]]
  },
  {
    id: 'c2h5oh',
    name: 'Ethanol',
    formula: 'C₂H₅OH',
    desc: 'Con thong dung, phan tu huu co co nhom hydroxyl tao lien ket hydro.',
    geometry: 'Tetrahedral + bent at O',
    angle: '109.5° / 104.5°',
    hybridization: 'sp3 (C va O)',
    polarity: 'Phan cuc',
    centralAtom: 'C',
    atoms: [
      { el: 'C', pos: [-1.2, 0, 0] },
      { el: 'C', pos: [0, 0, 0] },
      { el: 'O', pos: [1.35, 0.18, 0] },
      { el: 'H', pos: [1.95, 0.88, 0.2] },
      { el: 'H', pos: [-1.7, 0.95, 0.5] },
      { el: 'H', pos: [-1.7, -0.95, 0.5] },
      { el: 'H', pos: [-1.7, 0, -1.0] },
      { el: 'H', pos: [0.3, 0.95, -0.6] },
      { el: 'H', pos: [0.3, -0.95, -0.6] }
    ],
    bonds: [[0, 1], [1, 2], [2, 3], [0, 4], [0, 5], [0, 6], [1, 7], [1, 8]]
  },
  {
    id: 'ch3oh',
    name: 'Methanol',
    formula: 'CH₃OH',
    desc: 'Con don gian nhat, dung lam dung moi va nguyen lieu tong hop huu co.',
    geometry: 'Tetrahedral + bent at O',
    angle: '109.5° / 104.5°',
    hybridization: 'sp3 (C va O)',
    polarity: 'Phan cuc',
    centralAtom: 'C',
    atoms: [
      { el: 'C', pos: [0, 0, 0] },
      { el: 'O', pos: [1.35, 0.2, 0] },
      { el: 'H', pos: [1.95, 0.9, 0.2] },
      { el: 'H', pos: [-0.45, 0.95, 0.6] },
      { el: 'H', pos: [-0.45, -0.95, 0.6] },
      { el: 'H', pos: [-0.45, 0, -1.05] }
    ],
    bonds: [[0, 1], [1, 2], [0, 3], [0, 4], [0, 5]]
  },
  {
    id: 'ch2o',
    name: 'Formaldehyde',
    formula: 'CH₂O',
    desc: 'Aldehyde nho nhat, carbonyl phang quan trong trong phan ung huu co.',
    geometry: 'Trigonal planar around C',
    angle: '120°',
    hybridization: 'sp2 (nguyen tu C)',
    polarity: 'Phan cuc',
    centralAtom: 'C',
    atoms: [
      { el: 'C', pos: [0, 0, 0] },
      { el: 'O', pos: [1.2, 0, 0] },
      { el: 'H', pos: [-0.62, 0.94, 0] },
      { el: 'H', pos: [-0.62, -0.94, 0] }
    ],
    bonds: [[0, 1, 2], [0, 2], [0, 3]]
  },
  {
    id: 'c3h8',
    name: 'Propane',
    formula: 'C₃H₈',
    desc: 'Nhien lieu khi hoa long pho bien, alkane 3 carbon cau truc no.',
    geometry: 'Tetrahedral around each C',
    angle: '109.5°',
    hybridization: 'sp3 (cac nguyen tu C)',
    polarity: 'Khong phan cuc',
    centralAtom: 'C',
    atoms: [
      { el: 'C', pos: [-1.45, 0, 0] },
      { el: 'C', pos: [0, 0, 0] },
      { el: 'C', pos: [1.45, 0, 0] },
      { el: 'H', pos: [-1.95, 0.95, 0.55] },
      { el: 'H', pos: [-1.95, -0.95, 0.55] },
      { el: 'H', pos: [-1.95, 0, -1.05] },
      { el: 'H', pos: [0, 1.05, -0.75] },
      { el: 'H', pos: [0, -1.05, -0.75] },
      { el: 'H', pos: [1.95, 0.95, 0.55] },
      { el: 'H', pos: [1.95, -0.95, 0.55] },
      { el: 'H', pos: [1.95, 0, -1.05] }
    ],
    bonds: [[0, 1], [1, 2], [0, 3], [0, 4], [0, 5], [1, 6], [1, 7], [2, 8], [2, 9], [2, 10]]
  },
  {
    id: 'h2o2',
    name: 'Hydrogen Peroxide',
    formula: 'H₂O₂',
    desc: 'Chat oxy hoa pho bien, lien ket O-O khien phan tu kem ben hon nuoc.',
    geometry: 'Non-planar (gauche)',
    angle: '94.8° (H-O-O)',
    hybridization: 'sp3 (hai nguyen tu O)',
    polarity: 'Phan cuc',
    centralAtom: 'O',
    atoms: [
      { el: 'H', pos: [-1.45, 0.35, 0.4] },
      { el: 'O', pos: [-0.55, 0, 0] },
      { el: 'O', pos: [0.55, 0, 0] },
      { el: 'H', pos: [1.45, -0.35, -0.4] }
    ],
    bonds: [[0, 1], [1, 2], [2, 3]]
  },
  {
    id: 'ocl2',
    name: 'Dichlorine Monoxide',
    formula: 'OCl₂',
    desc: 'Phan tu goc oxy voi hai chlorine, hinh hoc gap khuc.',
    geometry: 'Bent (gap khuc)',
    angle: '111°',
    hybridization: 'sp3 (nguyen tu O)',
    polarity: 'Phan cuc',
    centralAtom: 'O',
    atoms: [
      { el: 'Cl', pos: [-1.3, 0.35, 0] },
      { el: 'O', pos: [0, 0, 0] },
      { el: 'Cl', pos: [1.18, 0.66, 0] }
    ],
    bonds: [[0, 1], [1, 2]]
  },
  {
    id: 'so3',
    name: 'Sulfur Trioxide',
    formula: 'SO₃',
    desc: 'Phan tu phang tam giac, chat trung gian quan trong de san xuat H2SO4.',
    geometry: 'Trigonal planar',
    angle: '120°',
    hybridization: 'sp2 (nguyen tu S)',
    polarity: 'Khong phan cuc',
    centralAtom: 'S',
    atoms: [
      { el: 'S', pos: [0, 0, 0] },
      { el: 'O', pos: [1.32, 0, 0] },
      { el: 'O', pos: [-0.66, 1.14, 0] },
      { el: 'O', pos: [-0.66, -1.14, 0] }
    ],
    bonds: [[0, 1, 2], [0, 2, 2], [0, 3, 2]]
  },
  {
    id: 'pcl3',
    name: 'Phosphorus Trichloride',
    formula: 'PCl₃',
    desc: 'Phan tu chop tam giac, chat nen tong hop trong hoa hoc huu co.',
    geometry: 'Trigonal pyramidal',
    angle: '100°',
    hybridization: 'sp3 (nguyen tu P)',
    polarity: 'Phan cuc',
    centralAtom: 'P',
    atoms: [
      { el: 'P', pos: [0, 0.15, 0] },
      { el: 'Cl', pos: [1.45, -0.25, 0] },
      { el: 'Cl', pos: [-0.72, -0.25, 1.25] },
      { el: 'Cl', pos: [-0.72, -0.25, -1.25] }
    ],
    bonds: [[0, 1], [0, 2], [0, 3]]
  },
  {
    id: 'ccl4',
    name: 'Carbon Tetrachloride',
    formula: 'CCl₄',
    desc: 'Phan tu tu dien doi xung, dong thoi la dung moi huu co khong phan cuc.',
    geometry: 'Tetrahedral',
    angle: '109.5°',
    hybridization: 'sp3 (nguyen tu C)',
    polarity: 'Khong phan cuc',
    centralAtom: 'C',
    atoms: [
      { el: 'C', pos: [0, 0, 0] },
      { el: 'Cl', pos: [1.25, 1.25, 1.25] },
      { el: 'Cl', pos: [-1.25, -1.25, 1.25] },
      { el: 'Cl', pos: [-1.25, 1.25, -1.25] },
      { el: 'Cl', pos: [1.25, -1.25, -1.25] }
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]]
  },
  {
    id: 'ch3cooh',
    name: 'Acetic Acid',
    formula: 'CH₃COOH',
    desc: 'Thanh phan chinh cua giam, co nhom carboxyl tham gia nhieu phan ung huu co.',
    geometry: 'Mixed tetrahedral and trigonal planar',
    angle: '109.5° / 120°',
    hybridization: 'sp3 (C methyl), sp2 (C carboxyl)',
    polarity: 'Phan cuc',
    centralAtom: 'C',
    atoms: [
      { el: 'C', pos: [-1.25, 0, 0] },
      { el: 'C', pos: [0.1, 0, 0] },
      { el: 'O', pos: [1.18, 0.62, 0] },
      { el: 'O', pos: [1.18, -0.62, 0] },
      { el: 'H', pos: [1.92, -0.4, 0] },
      { el: 'H', pos: [-1.72, 0.92, 0.55] },
      { el: 'H', pos: [-1.72, -0.92, 0.55] },
      { el: 'H', pos: [-1.72, 0, -1.0] }
    ],
    bonds: [[0, 1], [1, 2, 2], [1, 3], [3, 4], [0, 5], [0, 6], [0, 7]]
  }
];

const MOLECULE_ATOM_STYLE = {
  H: { color: 0xf8fafc, radius: 0.23 },
  C: { color: 0x334155, radius: 0.34 },
  O: { color: 0xef4444, radius: 0.33 },
  N: { color: 0x2563eb, radius: 0.33 },
  S: { color: 0xfbbf24, radius: 0.4 },
  P: { color: 0xf97316, radius: 0.38 },
  F: { color: 0x14b8a6, radius: 0.31 },
  Cl: { color: 0x22c55e, radius: 0.4 },
  B: { color: 0x8b5cf6, radius: 0.31 },
  Br: { color: 0xb45309, radius: 0.41 },
  I: { color: 0x7c3aed, radius: 0.43 },
  Si: { color: 0x78716c, radius: 0.36 },
  Na: { color: 0x38bdf8, radius: 0.4 },
  K: { color: 0xa855f7, radius: 0.43 },
  Ca: { color: 0xfb7185, radius: 0.42 },
  Mg: { color: 0x60a5fa, radius: 0.39 }
};

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
  for (let i = 0; i < nucleonCount; i++) {
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
    const orbitCurve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
    const points = orbitCurve.getPoints(64);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
    const orbitMesh = new THREE.Line(orbitGeo, orbitMat);

    // Randomly tilt the orbit
    orbitMesh.rotation.x = Math.random() * Math.PI;
    orbitMesh.rotation.y = Math.random() * Math.PI;
    atomGroup.add(orbitMesh);

    // Add electrons to this shell
    for (let e = 0; e < electronCount; e++) {
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
    if (curDark !== (orbitMat.color.getHex() === 0xffffff)) {
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
    if (!atomSceneInfo || !document.getElementById('atom-3d-container')) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }, { once: true });
}

function lightenColor(color, percent) {
  var num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = (num >> 8 & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
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
    if (btn) {
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
  const fab = document.getElementById('molecule-mobile-fab');
  if (fab) fab.style.display = 'none';
  if (typeof closeMoleculeDrawer === 'function') closeMoleculeDrawer();
}

function backToDiscovery() {
  const selection = document.getElementById('discovery-selection');
  const periodicContent = document.getElementById('periodic-content');
  const moleculeContent = document.getElementById('molecule-content');

  if (selection) {
    selection.style.display = 'grid';
    selection.classList.add('fade-up');
  }
  if (periodicContent) periodicContent.style.display = 'none';
  if (moleculeContent) moleculeContent.style.display = 'none';

  disposeMoleculeScene();

  // FIX: Ẩn nút FAB Mục lục và đóng drawer khi thoát chế độ 3D
  const fab = document.getElementById('molecule-mobile-fab');
  if (fab) fab.style.display = 'none';
  closeMoleculeDrawer();
}

function showMoleculeExplorer() {
  const selection = document.getElementById('discovery-selection');
  const periodicContent = document.getElementById('periodic-content');
  const moleculeContent = document.getElementById('molecule-content');

  if (selection) selection.style.display = 'none';
  if (periodicContent) periodicContent.style.display = 'none';
  if (moleculeContent) {
    moleculeContent.style.display = 'block';
    moleculeContent.classList.add('fade-up');
  }

  if (!currentMoleculeId) currentMoleculeId = MOLECULE_LIBRARY[0].id;

  initMoleculeMobileUI();

  // FIX: Hiện lại nút FAB Mục lục khi vào lại chế độ 3D
  const fab = document.getElementById('molecule-mobile-fab');
  if (fab) fab.style.display = 'flex';

  // Giữ nguyên danh sách nếu đã render để không làm mất kết quả tìm kiếm
  const listEl = document.getElementById('molecule-list');
  if (!listEl || listEl.children.length === 0) {
    renderMoleculeList(MOLECULE_LIBRARY);
  }

  loadMolecule(currentMoleculeId);
}

function filterMoleculeList(keyword) {
  const q = (keyword || '').toLowerCase().trim();
  const filtered = MOLECULE_LIBRARY.filter(m => {
    return m.name.toLowerCase().includes(q) || m.formula.toLowerCase().includes(q);
  });
  renderMoleculeList(filtered);
}

function renderMoleculeList(items) {
  const listEl = document.getElementById('molecule-list');
  if (!listEl) return;
  listEl.innerHTML = '';

  items.forEach(mol => {
    const item = document.createElement('div');
    item.className = 'molecule-item' + (mol.id === currentMoleculeId ? ' active' : '');
    item.dataset.id = mol.id; // FIX: Lưu ID vào DOM để dễ dàng update trạng thái active
    item.innerHTML = `
      <div class="m-name">${mol.name}</div>
      <div class="m-formula">${mol.formula}</div>
    `;
    item.onclick = () => loadMolecule(mol.id);
    listEl.appendChild(item);
  });

  updateMoleculeMobileFabLabel();
}

function loadMolecule(moleculeId) {
  const mol = MOLECULE_LIBRARY.find(m => m.id === moleculeId);
  if (!mol) return;
  currentMoleculeId = moleculeId;

  // FIX: Chỉ update class 'active' thay vì xóa/vẽ lại toàn bộ DOM (Sửa lỗi click trên mobile)
  const listEl = document.getElementById('molecule-list');
  if (listEl) {
    const items = listEl.querySelectorAll('.molecule-item');
    items.forEach(item => {
      if (item.dataset.id === moleculeId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  renderMoleculeInfo(mol);
  render3DMolecule(mol);
  updateMoleculeMobileFabLabel();

  // FIX: Tạo độ trễ nhỏ để người dùng thấy feedback nhấp chuột (nút đổi màu) trước khi menu trượt xuống
  if (window.innerWidth <= 768) {
    setTimeout(() => {
      closeMoleculeDrawer();
    }, 150);
  }
}
function initMoleculeMobileUI() {
  if (moleculeMobileUiReady) return;
  if (window.innerWidth > 768) return;

  const explorer = document.querySelector('#molecule-content .molecule-explorer-wrap');
  const molContent = document.getElementById('molecule-content');
  if (!explorer || !molContent) return;

  // 1. Tạo màn mờ (Backdrop)
  const backdrop = document.createElement('div');
  backdrop.id = 'molecule-drawer-backdrop';
  backdrop.className = 'molecule-drawer-backdrop';
  backdrop.onclick = closeMoleculeDrawer;

  // SỬA Ở ĐÂY: Trả màn mờ về molContent để nó chỉ che không gian 3D, không đè lên mục lục
  molContent.appendChild(backdrop);

  // 2. Tạo nút mục lục (FAB)
  const fab = document.createElement('button');
  fab.id = 'molecule-mobile-fab';
  fab.className = 'molecule-mobile-fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', 'Mở mục lục phân tử');
  fab.innerHTML = '<span class="molecule-fab-icon">🧬</span><span class="molecule-fab-label">Mục lục</span>';
  fab.onclick = toggleMoleculeDrawer;

  // SỬA Ở ĐÂY: Vẫn giữ nút này ở body để nó luôn cố định bám theo màn hình
  document.body.appendChild(fab);

  moleculeMobileUiReady = true;
  updateMoleculeMobileFabLabel();
}

// Trong file periodic.js
function toggleMoleculeDrawer() {
  const sidebar = document.querySelector('#molecule-content .molecule-sidebar');
  const backdrop = document.getElementById('molecule-drawer-backdrop');
  if (!sidebar || !backdrop) return;

  const isOpen = sidebar.classList.contains('popup-open');

  if (isOpen) {
    // Đang mở -> Đóng lại
    sidebar.style.transform = 'translateY(100%)'; // Trượt xuống trước
    backdrop.classList.remove('show');

    // Đợi hiệu ứng trượt xong (300ms) mới dùng display: none để triệt tiêu scroll dư
    setTimeout(() => {
      sidebar.classList.remove('popup-open');
      sidebar.style.display = 'none';
    }, 300);
  } else {
    // Đang đóng -> Mở lên
    sidebar.style.display = 'flex'; // Cho hiển thị trong DOM flow

    // Dùng requestAnimationFrame để ép trình duyệt render display: flex 
    // trước khi chạy hiệu ứng trượt lên
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        sidebar.classList.add('popup-open');
        sidebar.style.transform = 'translateY(0)';
        backdrop.classList.add('show');
      });
    });
  }
}

function closeMoleculeDrawer() {
  const sidebar = document.querySelector('#molecule-content .molecule-sidebar');
  const backdrop = document.getElementById('molecule-drawer-backdrop');
  if (sidebar) sidebar.classList.remove('popup-open');
  if (backdrop) backdrop.classList.remove('show');
}

function updateMoleculeMobileFabLabel() {
  const fab = document.getElementById('molecule-mobile-fab');
  if (!fab) return;
  const mol = MOLECULE_LIBRARY.find(m => m.id === currentMoleculeId);
  const label = fab.querySelector('.molecule-fab-label');
  if (!label) return;
  label.textContent = mol ? mol.formula : 'Mục lục';
}

function renderMoleculeInfo(mol) {
  const nameEl = document.getElementById('molecule-name');
  const formulaEl = document.getElementById('molecule-formula');
  const descEl = document.getElementById('molecule-desc');
  const statsEl = document.getElementById('molecule-stats');
  if (!nameEl || !formulaEl || !descEl || !statsEl) return;

  nameEl.textContent = mol.name;
  formulaEl.textContent = mol.formula;
  descEl.textContent = mol.desc;
  statsEl.innerHTML = `
    <div class="molecule-stat">
      <div class="molecule-stat-label">Hình học phân tử</div>
      <div class="molecule-stat-value">${mol.geometry}</div>
    </div>
    <div class="molecule-stat">
      <div class="molecule-stat-label">Góc liên kết đặc trưng</div>
      <div class="molecule-stat-value">${mol.angle}</div>
    </div>
    <div class="molecule-stat">
      <div class="molecule-stat-label">Lai hóa trung tâm</div>
      <div class="molecule-stat-value">${mol.hybridization}</div>
    </div>
    <div class="molecule-stat">
      <div class="molecule-stat-label">Độ phân cực</div>
      <div class="molecule-stat-value">${mol.polarity}</div>
    </div>
    <div class="molecule-stat">
      <div class="molecule-stat-label">Nguyên tử trung tâm</div>
      <div class="molecule-stat-value">${mol.centralAtom}</div>
    </div>
  `;
}

function disposeMoleculeScene() {
  if (!moleculeSceneInfo) return;
  cancelAnimationFrame(moleculeSceneInfo.reqId);
  window.removeEventListener('resize', moleculeSceneInfo.onResize);
  if (moleculeSceneInfo.controls) moleculeSceneInfo.controls.dispose();
  moleculeSceneInfo.renderer.dispose();
  if (moleculeSceneInfo.container) moleculeSceneInfo.container.innerHTML = '';
  moleculeSceneInfo = null;
}

function render3DMolecule(mol) {
  const container = document.getElementById('molecule-3d-view');
  if (!container) return;
  disposeMoleculeScene();
  container.innerHTML = '';

  if (!window.THREE) {
    container.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-4)">Đang tải engine 3D...</div>';
    return;
  }

  const width = container.clientWidth || 600;
  const height = container.clientHeight || 600;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1000);
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.72);
  const key = new THREE.DirectionalLight(0xffffff, 0.85);
  key.position.set(5, 6, 8);
  const rim = new THREE.DirectionalLight(0xffffff, 0.45);
  rim.position.set(-5, -3, -4);
  scene.add(ambient, key, rim);

  const group = new THREE.Group();
  scene.add(group);

  mol.bonds.forEach(([a, b, order = 1]) => {
    const aPos = new THREE.Vector3(...mol.atoms[a].pos);
    const bPos = new THREE.Vector3(...mol.atoms[b].pos);
    const bondVec = new THREE.Vector3().subVectors(bPos, aPos);
    const mid = new THREE.Vector3().addVectors(aPos, bPos).multiplyScalar(0.5);
    const length = bondVec.length();
    const dir = bondVec.clone().normalize();

    // Tìm vector vuông góc để dịch chuyển các liên kết song song
    let perp = new THREE.Vector3(0, 0, 1);
    if (Math.abs(dir.z) > 0.99) {
      perp.set(0, 1, 0);
    }
    const offsetDir = new THREE.Vector3().crossVectors(dir, perp).normalize();
    const gap = 0.16; // khoảng cách giữa các liên kết đôi/ba

    const offsets = [];
    if (order === 1) {
      offsets.push(0);
    } else if (order === 2) {
      offsets.push(-gap/2, gap/2);
    } else if (order === 3) {
      offsets.push(-gap, 0, gap);
    }

    const cylGeo = new THREE.CylinderGeometry(0.08, 0.08, length, 18);
    const cylMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.3, metalness: 0.15 });

    offsets.forEach(off => {
      const cyl = new THREE.Mesh(cylGeo, cylMat);
      cyl.position.copy(mid).add(offsetDir.clone().multiplyScalar(off));
      cyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      group.add(cyl);
    });
  });

  mol.atoms.forEach(atom => {
    const style = MOLECULE_ATOM_STYLE[atom.el] || { color: 0x64748b, radius: 0.3 };
    const atomColor = atom.el === 'H' && !isDark ? 0xcbd5e1 : style.color;
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(style.radius, 28, 28),
      new THREE.MeshPhongMaterial({
        color: atomColor,
        shininess: 90,
        specular: isDark ? 0xf8fafc : 0x1e293b
      })
    );
    mesh.position.set(atom.pos[0], atom.pos[1], atom.pos[2]);
    group.add(mesh);
  });

  const box = new THREE.Box3().setFromObject(group);
  const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());
  group.position.sub(center);
  camera.position.set(0, 0, Math.max(6, size * 1.25));

  let controls = null;
  if (window.THREE.OrbitControls) {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 2;
    controls.maxDistance = 20;
  }

  let reqId = null;
  const animate = () => {
    reqId = requestAnimationFrame(animate);
    if (controls) controls.update();
    else group.rotation.y += 0.007;
    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    if (!moleculeSceneInfo || moleculeSceneInfo.container !== container) return;
    const w = container.clientWidth || 600;
    const h = container.clientHeight || 600;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  moleculeSceneInfo = { renderer, reqId, container, controls, onResize };
}
