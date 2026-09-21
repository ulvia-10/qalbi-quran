export interface Ayah {
  number: number; // Ayah number within Surah
  globalNumber?: number; // Ayah number in entire Quran (1 to 6236)
  text: string; // Arabic text Uthmani
  transliteration?: string;
  translationId: string; // Indonesian translation
  translationEn?: string; // English translation
  juz: number;
  page?: number;
  tajweedText?: string; // HTML string with Tajweed color markers
  audioUrl?: string;
}

export interface Surah {
  number: number;
  name: string; // Arabic name
  transliteration: string;
  translationId: string;
  translationEn: string;
  type: 'Makkiyah' | 'Madaniyah';
  totalAyahs: number;
  juzStart: number;
  revelationOrder: number;
  verses?: Ayah[];
}

export const SURAHS: Surah[] = [
  { number: 1, name: "الفاتحة", transliteration: "Al-Fatihah", translationId: "Pembukaan", translationEn: "The Opening", type: "Makkiyah", totalAyahs: 7, juzStart: 1, revelationOrder: 5 },
  { number: 2, name: "البقرة", transliteration: "Al-Baqarah", translationId: "Sapi Betina", translationEn: "The Cow", type: "Madaniyah", totalAyahs: 286, juzStart: 1, revelationOrder: 87 },
  { number: 3, name: "آل عمران", transliteration: "Ali 'Imran", translationId: "Keluarga 'Imran", translationEn: "Family of Imran", type: "Madaniyah", totalAyahs: 200, juzStart: 3, revelationOrder: 89 },
  { number: 4, name: "النساء", transliteration: "An-Nisa'", translationId: "Wanita", translationEn: "The Women", type: "Madaniyah", totalAyahs: 176, juzStart: 4, revelationOrder: 92 },
  { number: 5, name: "المائدة", transliteration: "Al-Ma'idah", translationId: "Hidangan", translationEn: "The Table Spread", type: "Madaniyah", totalAyahs: 120, juzStart: 6, revelationOrder: 112 },
  { number: 6, name: "الأنعام", transliteration: "Al-An'am", translationId: "Binatang Ternak", translationEn: "The Cattle", type: "Makkiyah", totalAyahs: 165, juzStart: 7, revelationOrder: 55 },
  { number: 7, name: "الأعراف", transliteration: "Al-A'raf", translationId: "Tempat Tertinggi", translationEn: "The Heights", type: "Makkiyah", totalAyahs: 206, juzStart: 8, revelationOrder: 39 },
  { number: 8, name: "الأنفال", transliteration: "Al-Anfal", translationId: "Rampasan Perang", translationEn: "The Spoils of War", type: "Madaniyah", totalAyahs: 75, juzStart: 9, revelationOrder: 88 },
  { number: 9, name: "التوبة", transliteration: "At-Tawbah", translationId: "Pengampunan", translationEn: "The Repentance", type: "Madaniyah", totalAyahs: 129, juzStart: 10, revelationOrder: 113 },
  { number: 10, name: "يونس", transliteration: "Yunus", translationId: "Nabi Yunus", translationEn: "Jonah", type: "Makkiyah", totalAyahs: 109, juzStart: 11, revelationOrder: 51 },
  { number: 11, name: "هود", transliteration: "Hud", translationId: "Nabi Hud", translationEn: "Hud", type: "Makkiyah", totalAyahs: 123, juzStart: 11, revelationOrder: 52 },
  { number: 12, name: "يوسف", transliteration: "Yusuf", translationId: "Nabi Yusuf", translationEn: "Joseph", type: "Makkiyah", totalAyahs: 111, juzStart: 12, revelationOrder: 53 },
  { number: 13, name: "الرعد", transliteration: "Ar-Ra'd", translationId: "Guruh", translationEn: "The Thunder", type: "Madaniyah", totalAyahs: 43, juzStart: 13, revelationOrder: 96 },
  { number: 14, name: "إبراهيم", transliteration: "Ibrahim", translationId: "Nabi Ibrahim", translationEn: "Abraham", type: "Makkiyah", totalAyahs: 52, juzStart: 13, revelationOrder: 72 },
  { number: 15, name: "الحجر", transliteration: "Al-Hijr", translationId: "Bukit Hijr", translationEn: "The Rocky Tract", type: "Makkiyah", totalAyahs: 99, juzStart: 14, revelationOrder: 54 },
  { number: 16, name: "النحل", transliteration: "An-Nahl", translationId: "Lebah", translationEn: "The Bee", type: "Makkiyah", totalAyahs: 128, juzStart: 14, revelationOrder: 70 },
  { number: 17, name: "الإسراء", transliteration: "Al-Isra'", translationId: "Perjalanan Malam", translationEn: "The Night Journey", type: "Makkiyah", totalAyahs: 111, juzStart: 15, revelationOrder: 50 },
  { number: 18, name: "الكهف", transliteration: "Al-Kahf", translationId: "Gua", translationEn: "The Cave", type: "Makkiyah", totalAyahs: 110, juzStart: 15, revelationOrder: 69 },
  { number: 19, name: "مريم", transliteration: "Maryam", translationId: "Maryam", translationEn: "Mary", type: "Makkiyah", totalAyahs: 98, juzStart: 16, revelationOrder: 44 },
  { number: 20, name: "طه", transliteration: "Taha", translationId: "Taha", translationEn: "Ta-Ha", type: "Makkiyah", totalAyahs: 135, juzStart: 16, revelationOrder: 45 },
  { number: 21, name: "الأنبياء", transliteration: "Al-Anbiya'", translationId: "Para Nabi", translationEn: "The Prophets", type: "Makkiyah", totalAyahs: 112, juzStart: 17, revelationOrder: 73 },
  { number: 22, name: "الحج", transliteration: "Al-Hajj", translationId: "Haji", translationEn: "The Pilgrimage", type: "Madaniyah", totalAyahs: 78, juzStart: 17, revelationOrder: 103 },
  { number: 23, name: "المؤمنون", transliteration: "Al-Mu'minun", translationId: "Orang-Orang Mukmin", translationEn: "The Believers", type: "Makkiyah", totalAyahs: 118, juzStart: 18, revelationOrder: 74 },
  { number: 24, name: "النور", transliteration: "An-Nur", translationId: "Cahaya", translationEn: "The Light", type: "Madaniyah", totalAyahs: 64, juzStart: 18, revelationOrder: 102 },
  { number: 25, name: "الفرقان", transliteration: "Al-Furqan", translationId: "Pembeda", translationEn: "The Criterian", type: "Makkiyah", totalAyahs: 77, juzStart: 18, revelationOrder: 42 },
  { number: 26, name: "الشعراء", transliteration: "Ash-Shu'ara'", translationId: "Para Penyair", translationEn: "The Poets", type: "Makkiyah", totalAyahs: 227, juzStart: 19, revelationOrder: 47 },
  { number: 27, name: "النمل", transliteration: "An-Naml", translationId: "Semut", translationEn: "The Ant", type: "Makkiyah", totalAyahs: 93, juzStart: 19, revelationOrder: 48 },
  { number: 28, name: "القصص", transliteration: "Al-Qasas", translationId: "Kisah-Kisah", translationEn: "The Stories", type: "Makkiyah", totalAyahs: 88, juzStart: 20, revelationOrder: 49 },
  { number: 29, name: "العنكبوت", transliteration: "Al-'Ankabut", translationId: "Laba-Laba", translationEn: "The Spider", type: "Makkiyah", totalAyahs: 69, juzStart: 20, revelationOrder: 85 },
  { number: 30, name: "الروم", transliteration: "Ar-Rum", translationId: "Bangsa Romawi", translationEn: "The Romans", type: "Makkiyah", totalAyahs: 60, juzStart: 21, revelationOrder: 84 },
  { number: 31, name: "لقمان", transliteration: "Luqman", translationId: "Luqman", translationEn: "Luqman", type: "Makkiyah", totalAyahs: 34, juzStart: 21, revelationOrder: 57 },
  { number: 32, name: "Sajdah", transliteration: "As-Sajdah", translationId: "Sujud", translationEn: "The Prostration", type: "Makkiyah", totalAyahs: 30, juzStart: 21, revelationOrder: 75 },
  { number: 36, name: "يس", transliteration: "Yasin", translationId: "Yasin", translationEn: "Ya-Sin", type: "Makkiyah", totalAyahs: 83, juzStart: 22, revelationOrder: 41 },
  { number: 55, name: "الرحمن", transliteration: "Ar-Rahman", translationId: "Yang Maha Pemurah", translationEn: "The Beneficent", type: "Madaniyah", totalAyahs: 78, juzStart: 27, revelationOrder: 97 },
  { number: 56, name: "الواقعة", transliteration: "Al-Waqi'ah", translationId: "Hari Kiamat", translationEn: "The Inevitable", type: "Makkiyah", totalAyahs: 96, juzStart: 27, revelationOrder: 46 },
  { number: 67, name: "الملك", transliteration: "Al-Mulk", translationId: "Kerajaan", translationEn: "The Sovereignty", type: "Makkiyah", totalAyahs: 30, juzStart: 29, revelationOrder: 77 },
  { number: 78, name: "النبأ", transliteration: "An-Naba'", translationId: "Berita Besar", translationEn: "The Tidings", type: "Makkiyah", totalAyahs: 40, juzStart: 30, revelationOrder: 80 },
  { number: 112, name: "الإخلاص", transliteration: "Al-Ikhlas", translationId: "Ikhlas", translationEn: "The Sincerity", type: "Makkiyah", totalAyahs: 4, juzStart: 30, revelationOrder: 22 },
  { number: 113, name: "الفلق", transliteration: "Al-Falaq", translationId: "Waktu Subuh", translationEn: "The Daybreak", type: "Makkiyah", totalAyahs: 5, juzStart: 30, revelationOrder: 20 },
  { number: 114, name: "الناس", transliteration: "An-Nas", translationId: "Manusia", translationEn: "Mankind", type: "Makkiyah", totalAyahs: 6, juzStart: 30, revelationOrder: 21 },
];

// Helper to highlight Tajweed rules in Arabic text
export function applyTajweedHighlights(text: string): string {
  if (!text) return text;
  let html = text;

  // 1. Highlight Qalqalah (ق ط ب ج د with sukun / waqaf end)
  html = html.replace(/([قطبجد]ْ)/g, '<span class="tajweed-qalqalah">$1</span>');
  
  // 2. Highlight Ghunnah Muschaddadah (نّ or مّ)
  html = html.replace(/([نم]َّ)/g, '<span class="tajweed-bighunnah">$1</span>');

  // 3. Highlight Mad (آ , ٰ , ٓ)
  html = html.replace(/([آٰٓ])/g, '<span class="tajweed-mad">$1</span>');

  // 4. Highlight Tanwin & Nun Sukun
  html = html.replace(/(نْ|[ًٌٍ])/g, '<span class="tajweed-ikhfa">$1</span>');

  return html;
}

// Offline rich sample verses for instant render (Al-Fatihah, Al-Ikhlas)
export const SAMPLE_VERSES: Record<number, Ayah[]> = {
  1: [
    {
      number: 1,
      globalNumber: 1,
      text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      transliteration: "Bismillāhir-raḥmānir-raḥīm",
      translationId: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang.",
      translationEn: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
      juz: 1,
      page: 1,
      tajweedText: 'بِسْمِ <span class="tajweed-izhar">ٱللَّهِ</span> <span class="tajweed-mad">ٱلرَّحْمَٰنِ</span> <span class="tajweed-mad">ٱلرَّحِيمِ</span>',
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3"
    },
    {
      number: 2,
      globalNumber: 2,
      text: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
      transliteration: "Al-ḥamdu lillāhi rabbil-‘ālamīn",
      translationId: "Segala puji bagi Allah, Tuhan seluruh alam.",
      translationEn: "[All] praise is [due] to Allah, Lord of the worlds.",
      juz: 1,
      page: 1,
      tajweedText: 'ٱلْحَمْدُ لِلَّهِ رَبِّ <span class="tajweed-mad">ٱلْعَٰلَمِينَ</span>',
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3"
    },
    {
      number: 3,
      globalNumber: 3,
      text: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      transliteration: "Ar-raḥmānir-raḥīm",
      translationId: "Yang Maha Pengasih lagi Maha Penyayang.",
      translationEn: "The Entirely Merciful, the Especially Merciful.",
      juz: 1,
      page: 1,
      tajweedText: '<span class="tajweed-mad">ٱلرَّحْمَٰنِ</span> <span class="tajweed-mad">ٱلرَّحِيمِ</span>',
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3"
    },
    {
      number: 4,
      globalNumber: 4,
      text: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
      transliteration: "Māliki yaumid-dīn",
      translationId: "Pemilik hari pembalasan.",
      translationEn: "Sovereign of the Day of Recompense.",
      juz: 1,
      page: 1,
      tajweedText: '<span class="tajweed-mad">مَٰلِكِ</span> يَوْمِ <span class="tajweed-mad">ٱلدِّينِ</span>',
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3"
    },
    {
      number: 5,
      globalNumber: 5,
      text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      transliteration: "Iyyāka na‘budu wa iyyāka nasta‘īn",
      translationId: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.",
      translationEn: "It is You we worship and You we ask for help.",
      juz: 1,
      page: 1,
      tajweedText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ <span class="tajweed-mad">نَسْتَعِينُ</span>',
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3"
    },
    {
      number: 6,
      globalNumber: 6,
      text: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
      transliteration: "Ihdinaṣ-ṣirāṭal-mustaqīm",
      translationId: "Tunjukilah kami jalan yang lurus.",
      translationEn: "Guide us to the straight path.",
      juz: 1,
      page: 1,
      tajweedText: 'ٱهْدِنَا <span class="tajweed-mad">ٱلصِّرَٰطَ</span> <span class="tajweed-mad">ٱلْمُسْتَقِيمَ</span>',
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3"
    },
    {
      number: 7,
      globalNumber: 7,
      text: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
      transliteration: "Ṣirāṭallażīna an‘amta ‘alaihim ġairil-maġḍūbi ‘alaihim wa laḍ-ḍāāāllīn",
      translationId: "(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",
      translationEn: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
      juz: 1,
      page: 1,
      tajweedText: '<span class="tajweed-mad">صِرَٰطَ</span> ٱلَّذِينَ <span class="tajweed-izhar">أَنْعَمْتَ</span> عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا <span class="tajweed-mad">ٱلضَّآلِّينَ</span>',
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3"
    }
  ],
  112: [
    {
      number: 1,
      globalNumber: 6222,
      text: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
      transliteration: "Qul huwallāhu aḥad",
      translationId: "Katakanlah (Muhammad), \"Dialah Allah, Yang Maha Esa.\"",
      translationEn: "Say, \"He is Allah, [who is] One,",
      juz: 30,
      page: 604,
      tajweedText: 'قُلْ هُوَ ٱللَّهُ <span class="tajweed-qalqalah">أَحَدٌ</span>',
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3"
    },
    {
      number: 2,
      globalNumber: 6223,
      text: "ٱللَّهُ ٱلصَّمَدُ",
      transliteration: "Allāhuṣ-ṣamad",
      translationId: "Allah tempat meminta segala sesuatu.",
      translationEn: "Allah, the Eternal Refuge.",
      juz: 30,
      page: 604,
      tajweedText: 'ٱللَّهُ <span class="tajweed-qalqalah">ٱلصَّمَدُ</span>',
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3"
    },
    {
      number: 3,
      globalNumber: 6224,
      text: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      transliteration: "Lam yalid wa lam yūlad",
      translationId: "(Allah) tidak beranak dan tidak pula diperanakkan,",
      translationEn: "He neither begets nor is born,",
      juz: 30,
      page: 604,
      tajweedText: '<span class="tajweed-izhar">لَمْ</span> <span class="tajweed-qalqalah">يَلِدْ</span> <span class="tajweed-izhar">وَلَمْ</span> <span class="tajweed-qalqalah">يُولَدْ</span>',
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3"
    },
    {
      number: 4,
      globalNumber: 6225,
      text: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ",
      transliteration: "Wa lam yakul lahū kufuwan aḥad",
      translationId: "dan tidak ada sesuatu pun yang setara dengan Dia.\"",
      translationEn: "Nor is there to Him any equivalent.\"",
      juz: 30,
      page: 604,
      tajweedText: '<span class="tajweed-izhar">وَلَمْ</span> <span class="tajweed-bilaghunnah">يَكُن لَّهُۥ</span> كُفُوًا <span class="tajweed-qalqalah">أَحَدٌ</span>',
      audioUrl: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3"
    }
  ]
};

// API Fetch helper for dynamically fetching any Surah or Juz verses
export async function fetchSurahVerses(surahNumber: number): Promise<Ayah[]> {
  if (SAMPLE_VERSES[surahNumber]) {
    return SAMPLE_VERSES[surahNumber];
  }
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,id.indonesian,ar.alafasy`);
    const data = await res.json();
    if (data.code === 200 && data.data.length >= 3) {
      const arabicVerses = data.data[0].ayahs;
      const indoVerses = data.data[1].ayahs;
      const audioVerses = data.data[2].ayahs;

      return arabicVerses.map((a: any, idx: number) => ({
        number: a.numberInSurah,
        globalNumber: a.number,
        text: a.text,
        transliteration: `Ayah ${a.numberInSurah}`,
        translationId: indoVerses[idx]?.text || "",
        translationEn: `Verse ${a.numberInSurah}`,
        juz: a.juz,
        page: a.page,
        tajweedText: applyTajweedHighlights(a.text),
        audioUrl: audioVerses[idx]?.audio || `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${a.number}.mp3`
      }));
    }
  } catch (err) {
    console.error("Failed to fetch verses from API:", err);
  }
  return [];
}
