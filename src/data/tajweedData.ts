export interface TajweedRule {
  id: string;
  category: string;
  title: string;
  arabicName: string;
  description: string;
  letters: string[];
  howToRead: string;
  exampleArabic: string;
  exampleTransliteration: string;
  exampleSurah: string;
  colorTag: string; // CSS color code
}

export const TAJWEED_RULES: TajweedRule[] = [
  // --- 1. HUKUM NUN MATI (نْ) & TANWIN (ً ٍ ٌ) ---
  {
    id: "izhar-halqi",
    category: "Hukum Nun Mati & Tanwin",
    title: "Izhar Halqi",
    arabicName: "إظهار حلقي",
    description: "Membaca huruf Nun sukun (نْ) atau Tanwin secara jelas dan terang tanpa didengungkan ketika bertemu salah satu dari 6 huruf tenggorokan (halq).",
    letters: ["ء", "هـ", "ع", "ح", "غ", "خ"],
    howToRead: "Dibaca jelas dan tegas tanpa ditahan atau didengungkan sama sekali.",
    exampleArabic: "مَنْ ءَامَنَ ، عُذَابٌ أَلِيمٌ",
    exampleTransliteration: "Man aamana, 'Adhaabun aliim",
    exampleSurah: "Al-Baqarah: 62",
    colorTag: "#10B981"
  },
  {
    id: "idgham-bighunnah",
    category: "Hukum Nun Mati & Tanwin",
    title: "Idgham Bighunnah",
    arabicName: "إدغام بغنة",
    description: "Memasukkan/peleburan bunyi Nun sukun atau Tanwin ke dalam 4 huruf berikutnya dengan disertai dengung (1.5 - 2 harakat).",
    letters: ["ي", "ن", "م", "و"],
    howToRead: "Suara Nun lebur ke huruf berikutnya disertai dengung halus dari pangkal hidung (khaysyum).",
    exampleArabic: "مَن يَقُولُ ، خَيْرًا يَرَهُ",
    exampleTransliteration: "May-yaquulu, Khayray-yarah",
    exampleSurah: "Al-Baqarah: 8",
    colorTag: "#3B82F6"
  },
  {
    id: "idgham-bilaghunnah",
    category: "Hukum Nun Mati & Tanwin",
    title: "Idgham Bilaghunnah",
    arabicName: "إدغام بلا غنة",
    description: "Memasukkan bunyi Nun sukun atau Tanwin ke dalam huruf Lam (ل) atau Ra (ر) secara sempurna TANPA dengung.",
    letters: ["ل", "ر"],
    howToRead: "Suara Nun/tanwin hilang sepenuhnya lebur ke huruf Lam/Ra tanpa tahanan dengung.",
    exampleArabic: "مِن رَّبِّهِمْ ، هُدًى لِّلْمُتَّقِينَ",
    exampleTransliteration: "Mir-rabbihim, Hudal-lilmuttaqiin",
    exampleSurah: "Al-Baqarah: 5",
    colorTag: "#6366F1"
  },
  {
    id: "iqlab",
    category: "Hukum Nun Mati & Tanwin",
    title: "Iqlab",
    arabicName: "إقلاب",
    description: "Mengubah suara Nun sukun atau Tanwin menjadi suara Mim (م) tersembunyi disertai dengung saat bertemu huruf Ba (ب).",
    letters: ["ب"],
    howToRead: "Kedua bibir dirapatkan secara lembut menyuarakan Mim dengung 2 harakat.",
    exampleArabic: "مِن بَعْدِ ، سَمِيعٌ بَصِيرٌ",
    exampleTransliteration: "Mim-ba'di, Samii'um-basiir",
    exampleSurah: "Al-Baqarah: 27",
    colorTag: "#8B5CF6"
  },
  {
    id: "ikhfa-haqiqi",
    category: "Hukum Nun Mati & Tanwin",
    title: "Ikhfa' Haqiqi",
    arabicName: "إخفاء حقيقي",
    description: "Menyamarkan bunyi Nun sukun atau Tanwin antara Izhar dan Idgham disertai dengung sewaktu bertemu 15 huruf Ikhfa.",
    letters: ["ت", "ث", "ج", "د", "ذ", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ف", "ق", "ك"],
    howToRead: "Suara disamarkan mengarah ke bentuk makhraj huruf berikutnya sambil mendengung.",
    exampleArabic: "مِن دُونِ ، كَأْسًا دِهَاقًا",
    exampleTransliteration: "Min-duuni, Ka'san dihaaqaa",
    exampleSurah: "An-Naba: 34",
    colorTag: "#EC4899"
  },

  // --- 2. HUKUM MIM MATI (مْ) ---
  {
    id: "ikhfa-syafawi",
    category: "Hukum Mim Mati",
    title: "Ikhfa' Syafawi",
    arabicName: "إخفاء شفوي",
    description: "Menyamarkan bacaan Mim mati (مْ) ketika bertemu dengan huruf Ba (ب) disertai dengung di bibir.",
    letters: ["ب"],
    howToRead: "Bibir dirapatkan lembut menyamarkan Mim disertai dengung 2 harakat.",
    exampleArabic: "تَرْمِيهِم بِحِجَارَةٍ",
    exampleTransliteration: "Tarmiihim bi-hijaarah",
    exampleSurah: "Al-Fil: 4",
    colorTag: "#D97706"
  },
  {
    id: "idgham-mutamatsilain",
    category: "Hukum Mim Mati",
    title: "Idgham Syafawi / Mutamatsilain",
    arabicName: "إدغام شفي / متماثلين",
    description: "Memasukkan bunyi Mim mati (مْ) ke dalam huruf Mim berharakat (م) di depannya disertai dengung.",
    letters: ["م"],
    howToRead: "Memasukkan Mim mati ke Mim berikutnya secara utuh dengan dengung 2 harakat.",
    exampleArabic: "لَهُم مَّا يَشَاءُونَ",
    exampleTransliteration: "Lahum-maa yashaa'uun",
    exampleSurah: "Qaf: 35",
    colorTag: "#2563EB"
  },
  {
    id: "izhar-syafawi",
    category: "Hukum Mim Mati",
    title: "Izhar Syafawi",
    arabicName: "إظهار شفوي",
    description: "Membaca Mim mati (مْ) secara jelas di bibir tanpa dengung ketika bertemu dengan seluruh huruf hijaiyah KECUALI Ba (ب) dan Mim (م).",
    letters: ["Semua huruf kecuali ب & م"],
    howToRead: "Dibaca jelas di bibir tanpa ditahan atau mendengung. Sangat ditekankan pada huruf Waw (و) dan Fa (ف).",
    exampleArabic: "أَلَمْ تَرَ ، أَنْعَمْتَ عَلَيْهِمْ",
    exampleTransliteration: "Alam tara, An'amta 'alaihim",
    exampleSurah: "Al-Fil: 1",
    colorTag: "#059669"
  },

  // --- 3. HUKUM MIM & NUN MUSCHADDADAH (غنة مشددة) ---
  {
    id: "ghunnah-muschaddadah",
    category: "Ghunnah Muschaddadah",
    title: "Ghunnah Muschaddadah",
    arabicName: "غنة مشددة",
    description: "Wajib mendengungkan setiap huruf Mim tasydid (مّ) atau Nun tasydid (نّ) sepanjang 2 harakat penuh.",
    letters: ["نّ", "مّ"],
    howToRead: "Menahan dan mendengungkan suara di rongga hidung selama 2 ketukan harakat.",
    exampleArabic: "إِنَّ ٱللَّهَ ، ثُمَّ كَلَّا",
    exampleTransliteration: "Inna-llaha, Thumma kallaa",
    exampleSurah: "An-Naba: 4",
    colorTag: "#7C3AED"
  },

  // --- 4. HUKUM RA' (ر) ---
  {
    id: "ra-tafkhim",
    category: "Hukum Ra'",
    title: "Ra' Tafkhim (Tebal / Mufakhkhamah)",
    arabicName: "تفخيم الراء",
    description: "Membaca huruf Ra' secara tebal/penggemukan suara dengan mengumpulkan gema di langit-langit mulut.",
    letters: ["رَ", "رُ", "رْ setelah Fathah/Dhammah"],
    howToRead: "Mulut agak membulat menyuarakan Ra' tebal bertenga.",
    exampleArabic: "رَبَّنَا ، رُزِقْنَا ، مَرْيَمَ",
    exampleTransliteration: "Rabbanaa, Ruziqnaa, Maryam",
    exampleSurah: "Al-Baqarah: 201",
    colorTag: "#DC2626"
  },
  {
    id: "ra-tarqiq",
    category: "Hukum Ra'",
    title: "Ra' Tarqiq (Tipis / Muraqqaqah)",
    arabicName: "ترقيق الراء",
    description: "Membaca huruf Ra' secara tipis dan ringan tanpa gema membulat.",
    letters: ["رِ", "رْ setelah Kasrah asli"],
    howToRead: "Bibir tertarik sedikit ke samping menyuarakan Ra' yang tipis dan jernih.",
    exampleArabic: "رِجَالٌ ، فِرْعَوْنَ ، بِرٌّ",
    exampleTransliteration: "Rijaalun, Fir'auna, Birr",
    exampleSurah: "Al-Baqarah: 44",
    colorTag: "#0D9488"
  },

  // --- 5. HUKUM MAD (PANJANG) ---
  {
    id: "mad-thabii",
    category: "Hukum Mad (Panjang)",
    title: "Mad Thabi'i (Mad Asli)",
    arabicName: "مد طبيعي",
    description: "Memanjangkan bacaan sebanyak 2 harakat ketika terdapat Alif setelah Fathah, Ya sukun setelah Kasrah, atau Waw sukun setelah Dhammah.",
    letters: ["ا setelah Fathah", "يْ setelah Kasrah", "وْ setelah Dhammah"],
    howToRead: "Dibaca sedang sepanjang 2 ketukan / 1 alif secara konsisten.",
    exampleArabic: "قَالَ ، قِيلَ ، يَقُولُ",
    exampleTransliteration: "Qaala, Qiila, Yaquulu",
    exampleSurah: "Al-Fatihah: 2",
    colorTag: "#0284C7"
  },
  {
    id: "mad-wajib-muttasil",
    category: "Hukum Mad (Panjang)",
    title: "Mad Wajib Muttasil",
    arabicName: "مد واجب متصل",
    description: "Terjadi apabila Mad Thabi'i bertemu dengan huruf Hamzah (ء) dalam SATU KATA yang sama.",
    letters: ["Hamzah dalam 1 kata"],
    howToRead: "Wajib dipanjangkan 4 sampai 5 harakat (atau 6 harakat saat berhenti).",
    exampleArabic: "جَآءَ ، ٱلسَّمَآءِ ، سُوٓءَ",
    exampleTransliteration: "Jaaa'a, As-samaaa'i, Suuu'a",
    exampleSurah: "An-Naba: 14",
    colorTag: "#E11D48"
  },
  {
    id: "mad-jaiz-munfasil",
    category: "Hukum Mad (Panjang)",
    title: "Mad Jaiz Munfasil",
    arabicName: "مد جائز منفصل",
    description: "Terjadi apabila Mad Thabi'i di akhir satu kata bertemu dengan Hamzah (ء) di AWAL KATA BERIKUTNYA.",
    letters: ["Hamzah di kata berbeda"],
    howToRead: "Boleh dipanjangkan 2, 4, atau 5 harakat.",
    exampleArabic: "يَٰٓأَيُّهَا ، إِنَّآ أَعْطَيْنَٰكَ",
    exampleTransliteration: "Yaaa-ayyuhaa, Innaaa a'thainaak",
    exampleSurah: "Al-Kausar: 1",
    colorTag: "#C026D3"
  },
  {
    id: "mad-aridh-lissukun",
    category: "Hukum Mad (Panjang)",
    title: "Mad 'Aridh Lissukun",
    arabicName: "مد عارض للسكون",
    description: "Terjadi apabila Mad Thabi'i berada sebelum huruf hidup di AKHIR AYAT yang dihentikan (waqaf).",
    letters: ["Waqaf di akhir ayat"],
    howToRead: "Boleh dipanjangkan 2, 4, atau 6 harakat (disarankan konsisten 4 atau 6 harakat).",
    exampleArabic: "ٱلْعَٰلَمِينَ (Waqaf) ، ٱلرَّحِيمِ",
    exampleTransliteration: "Al-'Aalamiin, Ar-Rahiim",
    exampleSurah: "Al-Fatihah: 2-3",
    colorTag: "#16A34A"
  },
  {
    id: "mad-badal",
    category: "Hukum Mad (Panjang)",
    title: "Mad Badal",
    arabicName: "مد بدل",
    description: "Apabila Hamzah mendahului huruf Mad dalam satu kata (pengganti dari dua hamzah).",
    letters: ["ءَامَ ، أُوتِيَ"],
    howToRead: "Dipanjangkan 2 harakat seperti Mad Thabi'i.",
    exampleArabic: "ءَامَنُوا۟ ، إِيمَٰنًا",
    exampleTransliteration: "Aamanuu, Iimaanaa",
    exampleSurah: "Al-Baqarah: 9",
    colorTag: "#4F46E5"
  },
  {
    id: "mad-iwadh",
    category: "Hukum Mad (Panjang)",
    title: "Mad 'Iwadh",
    arabicName: "مد عوض",
    description: "Penggantian tanwin Fathatain (ً) di akhir kata saat waqaf/berhenti menjadi bacaan Mad panjang.",
    letters: ["ً pada waqaf"],
    howToRead: "Tanwin dibaca panjang 2 harakat dengan bunyi 'aa', bukan 'an'.",
    exampleArabic: "عَلِيمًا حَكِيمًا (Waqaf -> Hakiimaa)",
    exampleTransliteration: "Hakiiman -> Hakiimaa",
    exampleSurah: "An-Nisa: 170",
    colorTag: "#0891B2"
  },
  {
    id: "mad-lin",
    category: "Hukum Mad (Panjang)",
    title: "Mad Lin / Leen",
    arabicName: "مد لين",
    description: "Apabila Waw sukun (وْ) atau Ya sukun (يْ) didahului huruf berharakat Fathah, lalu berhenti pada waqaf.",
    letters: ["وْ / يْ setelah Fathah"],
    howToRead: "Dibaca lembut dan dapat dipanjangkan 2, 4, atau 6 harakat saat berhenti.",
    exampleArabic: "خَوْفٌ (Waqaf -> Khauf) ، قُرَيْشٍ",
    exampleTransliteration: "Min khauf, Quraysh",
    exampleSurah: "Quraysh: 4",
    colorTag: "#B45309"
  },
  {
    id: "mad-silah",
    category: "Hukum Mad (Panjang)",
    title: "Mad Silah (Qashirah & Towilah)",
    arabicName: "مد صلة (قصيرة وطويلة)",
    description: "Mad pada Ha Dhamir (ـهُ / ـهِ) kata ganti yang berada di antara dua huruf berharakat.",
    letters: ["ـهُ / ـهِ antara huruf hidup"],
    howToRead: "Qashirah: 2 harakat. Towilah (bila bertemu hamzah): 4 - 5 harakat.",
    exampleArabic: "إِنَّهُۥ كَانَ (Qashirah) ، عِندَهُۥٓ إِلَّا (Towilah)",
    exampleTransliteration: "Innahuu kaana, 'Indahuuu illaa",
    exampleSurah: "Al-Baqarah: 255",
    colorTag: "#9333EA"
  },

  // --- 6. HUKUM QALQALAH (PANTULAN) ---
  {
    id: "qalqalah-sugra",
    category: "Qalqalah (Pantulan)",
    title: "Qalqalah Sugra (Kecil)",
    arabicName: "قلقلة صغرى",
    description: "Memantulkan suara huruf Qalqalah (ق, ط, ب, ج, د) yang berharakat sukun ASLI di tengah kata.",
    letters: ["ق", "ط", "ب", "ج", "د"],
    howToRead: "Pantulan ringan dan halus tanpa jeda berlebihan.",
    exampleArabic: "يَقْطَعُونَ ، يَدْخُلُونَ",
    exampleTransliteration: "Yaq-tha'uun, Yad-khuluun",
    exampleSurah: "Al-Baqarah: 27",
    colorTag: "#EA580C"
  },
  {
    id: "qalqalah-kubra",
    category: "Qalqalah (Pantulan)",
    title: "Qalqalah Kubra (Besar)",
    arabicName: "قلقلة كبرى",
    description: "Memantulkan suara huruf Qalqalah di AKHIR AYAT / KATA yang dihentikan (waqaf).",
    letters: ["ق", "ط", "ب", "ج", "د (di waqaf)"],
    howToRead: "Pantulan lebih kuat dan jelas setelah mematikan suaranya.",
    exampleArabic: "ٱلْفَلَقِ (Waqaf) ، ٱلْوَقُودِ",
    exampleTransliteration: "Al-Falaq, Al-Waquud",
    exampleSurah: "Al-Falaq: 1",
    colorTag: "#D97706"
  },

  // --- 7. HUKUM LAM JALALAH (ALLAH) ---
  {
    id: "lam-tafkhim",
    category: "Hukum Lam Jalalah",
    title: "Lam Jalalah Tafkhim (Tebal)",
    arabicName: "لام الجلالة المفخمة",
    description: "Membaca Lafadz Allah (ٱللَّه) secara tebal membulat ketika didahului harakat Fathah atau Dhammah.",
    letters: ["ٱللَّه setelah Fathah/Dhammah"],
    howToRead: "Suara dibaca tebal menggelegar di langit-langit mulut (Al-Laah).",
    exampleArabic: "قُلْ هُوَ ٱللَّهُ ، نَصْرُ ٱللَّهِ",
    exampleTransliteration: "Qul Huwal-laah, Nasrul-laah",
    exampleSurah: "Al-Ikhlas: 1",
    colorTag: "#15803D"
  },
  {
    id: "lam-tarqiq",
    category: "Hukum Lam Jalalah",
    title: "Lam Jalalah Tarqiq (Tipis)",
    arabicName: "لام الجلالة المرققة",
    description: "Membaca Lafadz Allah (ٱللَّه) secara tipis dan ringan ketika didahului harakat Kasrah.",
    letters: ["ٱللَّه setelah Kasrah"],
    howToRead: "Suara dibaca tipis dan jernih tanpa membulatkan bibir (Bil-laahi).",
    exampleArabic: "بِسْمِ ٱللَّهِ ، بِٱللَّهِ",
    exampleTransliteration: "Bismil-laahi, Bil-laahi",
    exampleSurah: "Al-Fatihah: 1",
    colorTag: "#0369A1"
  },

  // --- 8. MAKHARIJUL HURUF & SIFAT HURUF ---
  {
    id: "makhraj-halq",
    category: "Makharijul Huruf",
    title: "Al-Halq (Tenggorokan)",
    arabicName: "الحلق",
    description: "Tempat keluar huruf dari area tenggorokan (Pangkal, Tengah, dan Ujung tenggorokan).",
    letters: ["ء", "هـ", "ع", "ح", "غ", "خ"],
    howToRead: "Sesuaikan artikulasi sesuai kedalaman tenggorokan.",
    exampleArabic: "ٱلْحَمْدُ ، خَبِيرٌ",
    exampleTransliteration: "Al-Hamdu, Khabiir",
    exampleSurah: "Al-Fatihah: 2",
    colorTag: "#0F766E"
  },
  {
    id: "makhraj-lisan",
    category: "Makharijul Huruf",
    title: "Al-Lisan (Lidah)",
    arabicName: "اللسان",
    description: "Tempat keluar huruf terbanyak yang melibatkan bagian lidah (pangkal, tengah, tepi, dan ujung lidah).",
    letters: ["ق", "ك", "ج", "ش", "ي", "ض", "ل", "ن", "ر", "ط", "د", "ت", "ص", "ز", "س", "ظ", "ذ", "ث"],
    howToRead: "Gunakan posisi lidah yang tepat bersentuhan dengan gigi/langit-langit.",
    exampleArabic: "ٱلصِّرَٰطَ ، ٱلظَّٰلِمِينَ",
    exampleTransliteration: "As-Siraat, Az-Zaalimiin",
    exampleSurah: "Al-Fatihah: 6",
    colorTag: "#65A30D"
  },
  {
    id: "makhraj-syafatain",
    category: "Makharijul Huruf",
    title: "Asy-Syafatain (Dua Bibir)",
    arabicName: "الشفتان",
    description: "Tempat keluar huruf dari artikulasi dua bibir (bibir atas dan bibir bawah).",
    letters: ["ف", "و", "ب", "م"],
    howToRead: "Dirapatkan (Ba, Mim), membulat (Waw), atau gigi atas menyentuh bibir bawah (Fa).",
    exampleArabic: "بِسْمِ ، وَٱلْعَصْرِ",
    exampleTransliteration: "Bismi, Wal-'Asr",
    exampleSurah: "Al-'Asr: 1",
    colorTag: "#9333EA"
  }
];

export interface PersonalTahsinNote {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  noteText: string;
  ruleCategory: string;
  status: 'Needs Practice' | 'Improving' | 'Mastered';
  createdAt: string;
}

export const INITIAL_TAHSIN_NOTES: PersonalTahsinNote[] = [
  {
    id: "note-1",
    surahNumber: 1,
    surahName: "Al-Fatihah",
    ayahNumber: 7,
    noteText: "Perhatikan pengucapan Ghairil-maghdhubi ('غ' dan 'ض'). Jangan sampai tertukar dengan Dal atau Zai.",
    ruleCategory: "Makharijul Huruf",
    status: "Improving",
    createdAt: "2026-09-15"
  },
  {
    id: "note-2",
    surahNumber: 78,
    surahName: "An-Naba'",
    ayahNumber: 1,
    noteText: "Ghunnah pada 'Amma yatasā'alūn (عمّ) harus ditahan penuh 2 harakat.",
    ruleCategory: "Ghunnah Muschaddadah",
    status: "Needs Practice",
    createdAt: "2026-09-16"
  },
  {
    id: "note-3",
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    ayahNumber: 1,
    noteText: "Qalqalah Kubra pada kata 'Aḥad' dan 'Aṣ-ṣamad' di akhir ayat dipantulkan tegas.",
    ruleCategory: "Qalqalah (Pantulan)",
    status: "Mastered",
    createdAt: "2026-09-17"
  }
];
