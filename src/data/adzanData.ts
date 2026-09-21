export interface PrayerTime {
  name: string;
  nameArabic: string;
  time: string;
  isNext?: boolean;
}

export const SAMPLE_PRAYER_TIMES: PrayerTime[] = [
  { name: "Subuh", nameArabic: "الفجر", time: "04:38" },
  { name: "Terbit", nameArabic: "الشروق", time: "05:52" },
  { name: "Dzuhur", nameArabic: "الظهر", time: "11:58", isNext: true },
  { name: "Ashar", nameArabic: "العصر", time: "15:12" },
  { name: "Maghrib", nameArabic: "المغرب", time: "18:02" },
  { name: "Isya", nameArabic: "العشاء", time: "19:11" },
];

export interface Reciter {
  id: string;
  name: string;
  style: string;
  subfolder: string;
  avatar: string;
}

export const RECITERS: Reciter[] = [
  { id: "alafasy", name: "Mishary Rashid Alafasy", style: "Murattal Syahdu", subfolder: "ar.alafasy", avatar: "🎙️ Sheikh Alafasy" },
  { id: "abdulbaset", name: "AbdulBaset AbdulSamad", style: "Mujawwad Klasik", subfolder: "ar.abdulbasitmurattal", avatar: "🎙️ Sheikh AbdulBaset" },
  { id: "minshawi", name: "Siddiq Al-Minshawi", style: "Khusyu' Tartil", subfolder: "ar.minshawi", avatar: "🎙️ Sheikh Minshawi" },
  { id: "sudais", name: "Abdur-Rahman As-Sudais", style: "Imam Masjidil Haram", subfolder: "ar.abdurrahmansudais", avatar: "🎙️ Sheikh Sudais" },
];

export const ADZAN_AUDIO_SOURCES = [
  { id: "adzan-mecca", name: "Adzan Merdu Masjidil Haram Makkah", url: "https://www.islamcan.com/audio/adhan/azan1.mp3", fallbackUrl: "https://cdn.aladhan.com/audio/adhans/makkah.mp3" },
  { id: "adzan-madinah", name: "Adzan Syahdu Masjid Nabawi Madinah", url: "https://www.islamcan.com/audio/adhan/azan2.mp3", fallbackUrl: "https://cdn.aladhan.com/audio/adhans/madinah.mp3" },
  { id: "adzan-aqsa", name: "Adzan Merdu Masjid Al-Aqsa", url: "https://www.islamcan.com/audio/adhan/azan3.mp3", fallbackUrl: "https://cdn.aladhan.com/audio/adhans/makkah.mp3" }
];

export const DOA_SETELAH_ADZAN = {
  arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
  transliteration: "Allāhumma rabba hāżihid-da'watit-tāmmati waṣ-ṣalātil-qā'imati āti muḥammadanil-wasīlata wal-faḍīlata wab'aṡhu maqāmam maḥmūdanil-lażī wa'adtah.",
  translation: "Ya Allah, Rabb pemilik panggilan yang sempurna ini dan shalat yang akan didirikan, berikanlah kepada Nabi Muhammad wasilah (kedudukan tinggi) dan keutamaan, serta bangkitkanlah beliau di tempat terpuji yang telah Engkau janjikan."
};

// Strict Location-Based Prayer Times Fetcher (Aladhan API with Kemenag Indonesia Method 20)
export async function fetchStrictPrayerTimes(lat: number, lng: number): Promise<{ timings: PrayerTime[]; locationName: string }> {
  try {
    const res = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=20`);
    const data = await res.json();
    if (data.code === 200 && data.data?.timings) {
      const t = data.data.timings;
      const list: PrayerTime[] = [
        { name: "Subuh", nameArabic: "الفجر", time: t.Fajr },
        { name: "Terbit", nameArabic: "الشروق", time: t.Sunrise },
        { name: "Dzuhur", nameArabic: "الظهر", time: t.Dhuhr },
        { name: "Ashar", nameArabic: "العصر", time: t.Asr },
        { name: "Maghrib", nameArabic: "المغرب", time: t.Maghrib },
        { name: "Isya", nameArabic: "العشاء", time: t.Isha },
      ];

      // Determine next prayer based on current time
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      let nextIndex = 0;
      for (let i = 0; i < list.length; i++) {
        const [h, m] = list[i].time.split(":").map(Number);
        const prayerMinutes = h * 60 + m;
        if (prayerMinutes > currentMinutes) {
          nextIndex = i;
          break;
        }
      }
      list[nextIndex].isNext = true;

      const metaCity = data.data.meta?.timezone || "Lokasi Anda (GPS)";
      return { timings: list, locationName: metaCity.replace("_", " ").split("/").pop() || "GPS Real-time" };
    }
  } catch (err) {
    console.error("Failed to fetch strict prayer times by location:", err);
  }

  return { timings: SAMPLE_PRAYER_TIMES, locationName: "Jakarta (WIB)" };
}
