export interface DzikirItem {
  id: string;
  category: 'pagi' | 'petang' | 'shalat';
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  repeatCount: number;
  fadilah: string;
}

export const DZIKIR_LIST: DzikirItem[] = [
  // ==================== DZIKIR PAGI LENGKAP ====================
  {
    id: "pagi-1",
    category: "pagi",
    title: "1. Membaca Ayat Kursi",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allāhu lā ilāha illā huwal-ḥayyul-qayyūm, lā ta'khużuhū sinatuw wa lā naūm...",
    translation: "Allah, tidak ada tuhan selain Dia Yang Mahahidup lagi terus-menerus mengurus (makhluk-Nya)...",
    repeatCount: 1,
    fadilah: "Siapa yang membacanya di pagi hari, ia akan dilindungi dari gangguan jin hingga sore hari (HR. An-Nasa'i)."
  },
  {
    id: "pagi-2",
    category: "pagi",
    title: "2. Membaca Surat Al-Ikhlas, Al-Falaq, An-Nas",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ... (3x)\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... (3x)\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ... (3x)",
    transliteration: "Qul huwallāhu aḥad... Qul a'ūżu birabbil-falaq... Qul a'ūżu birabbin-nās...",
    translation: "Membaca Surah Al-Ikhlas, Al-Falaq, dan An-Nas masing-masing sebanyak 3 kali.",
    repeatCount: 3,
    fadilah: "Siapa membacanya 3x saat pagi dan petang, akan dicukupkan dari segala sesuatu (HR. Abu Daud & Tirmidzi)."
  },
  {
    id: "pagi-3",
    category: "pagi",
    title: "3. Asbahna wa Asbahal-Mulku Lillah",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ ، وَالْحَمْدُ لِلَّهِ ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ . رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ",
    transliteration: "Aṣbaḥnā wa aṣbaḥal-mulku lillāhi wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā syarīka lah...",
    translation: "Kami telah memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah...",
    repeatCount: 1,
    fadilah: "Doa menyambut pagi hari memohon kebaikan hari ini dan perlindungan dari keburukannya (HR. Muslim)."
  },
  {
    id: "pagi-4",
    category: "pagi",
    title: "4. Allahumma Bika Asbahna",
    arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا ، وَبِكَ أَمْسَيْنَا ، وَبِكَ نَحْيَا ، وَبِكَ نَمُوتُ ، وَإِلَيْكَ النُّشُورُ",
    transliteration: "Allāhumma bika aṣbaḥnā, wa bika amsainā, wa bika naḥyā, wa bika namūtu, wa ilaikan-nusyūr.",
    translation: "Ya Allah, dengan rahmat-Mu kami memasuki waktu pagi, dengan-Mu kami memasuki waktu petang, dengan-Mu kami hidup dan mati, dan kepada-Mu tempat kebangkitan.",
    repeatCount: 1,
    fadilah: "Dzikir penyerahan diri di pagi hari (HR. Abu Daud & Tirmidzi)."
  },
  {
    id: "pagi-5",
    category: "pagi",
    title: "5. Sayyidul Istighfar",
    arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allāhumma anta rabbī lā ilāha illā anta khalaqtanī wa anā 'abduka...",
    translation: "Ya Allah, Engkau adalah Rabbku, tidak ada tuhan selain Engkau. Engkau yang menciptakanku dan aku adalah hamba-Mu...",
    repeatCount: 1,
    fadilah: "Barangsiapa membacanya di pagi hari dengan meyakininya lalu meninggal sebelum petang, ia termasuk penghuni surga (HR. Bukhari)."
  },
  {
    id: "pagi-6",
    category: "pagi",
    title: "6. Doa Kesehatan & Perlindungan (3x)",
    arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي ، اللَّهُمَّ عَافِنِي فِي سَمْعِي ، اللَّهُمَّ عَافِنِي فِي بَصَرِي ، لَا إِلَهَ إِلَّا أَنْتَ . اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ ، لَا إِلَهَ إِلَّا أَنْتَ",
    transliteration: "Allāhumma 'āfinī fī badanī, Allāhumma 'āfinī fī sam'ī, Allāhumma 'āfinī fī baṣarī...",
    translation: "Ya Allah, selamatkanlah badanku, pendengaranku, dan penglihatanku. Ya Allah, aku berlindung dari kekufuran, kefakiran, dan siksa kubur...",
    repeatCount: 3,
    fadilah: "Memohon kesehatan jasmani, pendengaran, penglihatan, serta perlindungan kubur (HR. Abu Daud)."
  },
  {
    id: "pagi-7",
    category: "pagi",
    title: "7. Doa Keafiatan Dunia & Akhirat",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
    transliteration: "Allāhumma innī as'alukal-'afwa wal-'āfiyata fid-dunyā wal-ākhirah...",
    translation: "Ya Allah, sesungguhnya aku memohon ampunan dan keselamatan di dunia dan akhirat, pada agamaku, duniaku, keluargaku, dan hartaku...",
    repeatCount: 1,
    fadilah: "Doa perlindungan komprehensif yang tidak pernah ditinggalkan Rasulullah SAW setiap pagi dan petang (HR. Abu Daud)."
  },
  {
    id: "pagi-8",
    category: "pagi",
    title: "8. Perlindungan Dari Bahaya (Bismillahilladzi... 3x)",
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillāhillażī lā yaḍurru ma'asmihī syai'un fil-arḍi wa lā fis-samā'i wa huwas-samī'ul-'alīm.",
    translation: "Dengan nama Allah yang bila disebut, segala sesuatu di bumi dan di langit tidak akan berbahaya, Dialah Yang Maha Mendengar lagi Maha Mengetahui.",
    repeatCount: 3,
    fadilah: "Dibaca 3x: Tidak ada sesuatu pun yang akan memudaratkannya hingga petang (HR. Abu Daud & Tirmidzi)."
  },
  {
    id: "pagi-9",
    category: "pagi",
    title: "9. Radhitu Billahi Rabba (3x)",
    arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
    transliteration: "Raḍītu billāhi rabbaw wa bil-islāmi dīnaw wa bi muḥammadin ṣallallāhu 'alaihi wa sallama nabiyyā.",
    translation: "Aku ridha Allah sebagai Rabbku, Islam sebagai agamaku, dan Muhammad SAW sebagai Nabiku.",
    repeatCount: 3,
    fadilah: "Siapa yang membacanya 3x, Allah berhak meridhainya pada hari kiamat (HR. Ahmad & Tirmidzi)."
  },
  {
    id: "pagi-10",
    category: "pagi",
    title: "10. Ya Hayyu Ya Qayyum",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ ، أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    transliteration: "Yā ḥayyu yā qayyūmu biraḥmatika astagīṡu, aṣliḥ lī syānī kullahū wa lā takilnī ilā nafsī ṭarfata 'ain.",
    translation: "Wahai Yang Mahahidup lagi Maha Berdiri Sendiri, dengan rahmat-Mu aku memohon pertolongan. Perbaikilah urusanku seluruhnya dan jangan serahkan aku pada diriku sendiri walau sekejap mata.",
    repeatCount: 1,
    fadilah: "Memohon perbaikan seluruh urusan hidup dan pertolongan Allah (HR. An-Nasa'i & Al-Hakim)."
  },
  {
    id: "pagi-11",
    category: "pagi",
    title: "11. Subhanallahi wa Bihamdihi (100x)",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "Subḥānallāhi wa biḥamdih.",
    translation: "Maha Suci Allah dan dengan memuji-Nya.",
    repeatCount: 100,
    fadilah: "Barangsiapa membacanya 100x sehari, dosa-dosanya diampuni walaupun sebanyak buih di lautan (HR. Bukhari & Muslim)."
  },

  // ==================== DZIKIR PETANG LENGKAP ====================
  {
    id: "petang-1",
    category: "petang",
    title: "1. Membaca Ayat Kursi Petang",
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...",
    transliteration: "Allāhu lā ilāha illā huwal-ḥayyul-qayyūm...",
    translation: "Membaca Ayat Kursi saat petang menjelang malam.",
    repeatCount: 1,
    fadilah: "Siapa yang membacanya di petang hari, ia dilindungi dari gangguan jin hingga pagi hari (HR. An-Nasa'i)."
  },
  {
    id: "petang-2",
    category: "petang",
    title: "2. Membaca Al-Ikhlas, Al-Falaq, An-Nas (3x)",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ... (3x)\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... (3x)\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ... (3x)",
    transliteration: "Qul huwallāhu aḥad... Qul a'ūżu birabbil-falaq... Qul a'ūżu birabbin-nās...",
    translation: "Membaca 3 Qul masing-masing 3 kali di waktu petang.",
    repeatCount: 3,
    fadilah: "Mencukupkan dari segala keburukan dan marabahaya malam hari (HR. Abu Daud)."
  },
  {
    id: "petang-3",
    category: "petang",
    title: "3. Amsaina wa Amsal-Mulku Lillah",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ ، وَالْحَمْدُ لِلَّهِ ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ . رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا",
    transliteration: "Amsainā wa amsal-mulku lillāhi wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā syarīka lah...",
    translation: "Kami memasuki waktu petang dan kerajaan hanya milik Allah...",
    repeatCount: 1,
    fadilah: "Dzikir kepasrahan menyambut malam hari (HR. Muslim)."
  },
  {
    id: "petang-4",
    category: "petang",
    title: "4. Allahumma Bika Amsaina",
    arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا ، وَبِكَ أَصْبَحْنَا ، وَبِكَ نَحْيَا ، وَبِكَ نَمُوتُ ، وَإِلَيْكَ الْمَصِيرُ",
    transliteration: "Allāhumma bika amsainā, wa bika aṣbaḥnā, wa bika naḥyā, wa bika namūtu, wa ilaikal-maṣīr.",
    translation: "Ya Allah, dengan rahmat-Mu kami memasuki waktu petang, dengan-Mu kami hidup dan mati, dan kepada-Mu tempat kembali.",
    repeatCount: 1,
    fadilah: "Penyerahan jiwa dan raga di waktu malam (HR. Tirmidzi)."
  },
  {
    id: "petang-5",
    category: "petang",
    title: "5. A'udzu Bikalimatillahit-Tammati... (3x)",
    arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    transliteration: "A'ūżu bikalimātillāhit-tāmmāti min syarri mā khalaq.",
    translation: "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang diciptakan-Nya.",
    repeatCount: 3,
    fadilah: "Tidak ada racun, bisa, atau sengatan yang akan memudaratkannya pada malam itu (HR. Muslim)."
  },
  {
    id: "petang-6",
    category: "petang",
    title: "6. Shalawat atas Nabi (10x)",
    arabic: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    transliteration: "Allāhumma ṣalli wa sallim 'alā nabiyyinā Muḥammad.",
    translation: "Ya Allah, limpahkanlah shalawat dan salam kepada Nabi kami Muhammad.",
    repeatCount: 10,
    fadilah: "Barangsiapa bershalawat kepadaku 10x di pagi dan petang hari, ia akan mendapat syafaatku kelak pada hari kiamat (HR. At-Thabrani)."
  },

  // ==================== DZIKIR SETELAH SHALAT ====================
  {
    id: "shalat-1",
    category: "shalat",
    title: "Istighfar & Doa Keselamatan",
    arabic: "أَسْتَغْفِرُ اللَّهَ (3x) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
    transliteration: "Astaghfirullāh (3x), Allāhumma antas-salāmu wa minkas-salām, tabārakta yā żal-jalāli wal-ikrām.",
    translation: "Aku memohon ampun kepada Allah (3x). Ya Allah, Engkau Mahasejahtera dan dari-Mululah kesejahteraan...",
    repeatCount: 1,
    fadilah: "Dibaca langsung setelah salam shalat fardhu (HR. Muslim)."
  },
  {
    id: "shalat-2",
    category: "shalat",
    title: "Tasbih, Tahmid, Takbir (33x)",
    arabic: "سُبْحَانَ اللَّهِ (33x) ، الْحَمْدُ لِلَّهِ (33x) ، اللَّهُ أَكْبَرُ (33x)",
    transliteration: "Subḥānallāh (33x), Al-ḥamdulillāh (33x), Allāhu akbar (33x).",
    translation: "Maha Suci Allah (33x), Segala puji bagi Allah (33x), Allah Maha Besar (33x).",
    repeatCount: 33,
    fadilah: "Pengampun dosa sebanyak buih di lautan bila disempurnakan dengan Laa ilaha illallah (HR. Muslim)."
  }
];
