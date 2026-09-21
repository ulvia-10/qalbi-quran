export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  surahOrJuz: string;
  pagesRead: number;
  durationMinutes: number;
  mood: 'Tentram' | 'Tersentuh' | 'Semangat' | 'Syukur' | 'Fokus';
  reflectionText: string;
  favoriteAyah?: string;
  createdAt: string;
}

export interface MutabaahTask {
  id: string;
  label: string;
  category: 'Shalat Fardhu' | 'Shalat Sunnah' | 'Tilawah & Dzikir' | 'Amalan Kebaikan';
  completed: boolean;
  timeSlot?: string;
}

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "j-1",
    date: new Date().toISOString().split("T")[0],
    title: "Tadabbur Surah Ar-Rahman",
    surahOrJuz: "Surah Ar-Rahman (Juz 27)",
    pagesRead: 3,
    durationMinutes: 20,
    mood: "Syukur",
    reflectionText: "Merenungi pengulangan ayat 'Fabiayyi ala-i rabbikuma tukadzziban' membuat hati begitu tersentuh akan limpahan nikmat Allah yang tak terhitung.",
    favoriteAyah: "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
    createdAt: new Date().toISOString().split("T")[0]
  },
  {
    id: "j-2",
    date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
    title: "Tilawah Subuh Juz 30",
    surahOrJuz: "Juz 30 (An-Naba - An-Nas)",
    pagesRead: 20,
    durationMinutes: 45,
    mood: "Tentram",
    reflectionText: "Alhamdulillah menyelesaikan Juz 30 hari ini. Bacaan terasa lebih tertata setelah memperhatikan hukum Qalqalah Kubra.",
    favoriteAyah: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    createdAt: new Date(Date.now() - 86400000).toISOString().split("T")[0]
  }
];

export const INITIAL_MUTABAAH_CHECKLIST: MutabaahTask[] = [
  // --- SHALAT FARDHU TEPAT WAKTU ---
  { id: "m-subuh", label: "Shalat Subuh Tepat Waktu / Berjamaah", category: "Shalat Fardhu", completed: true, timeSlot: "04:38" },
  { id: "m-dzuhur", label: "Shalat Dzuhur Tepat Waktu", category: "Shalat Fardhu", completed: true, timeSlot: "11:58" },
  { id: "m-ashar", label: "Shalat Ashar Tepat Waktu", category: "Shalat Fardhu", completed: false, timeSlot: "15:12" },
  { id: "m-maghrib", label: "Shalat Maghrib Tepat Waktu", category: "Shalat Fardhu", completed: false, timeSlot: "18:02" },
  { id: "m-isya", label: "Shalat Isya Tepat Waktu", category: "Shalat Fardhu", completed: false, timeSlot: "19:11" },

  // --- SHALAT SUNNAH ---
  { id: "m-tahajud", label: "Shalat Tahajud & Qiyamullail", category: "Shalat Sunnah", completed: true, timeSlot: "Sepertiga Malam" },
  { id: "m-dhuha", label: "Shalat Dhuha (2 - 8 Rakaat)", category: "Shalat Sunnah", completed: true, timeSlot: "07:30" },
  { id: "m-rawatib", label: "Shalat Sunnah Rawatib (Qabliyah / Ba'diyah)", category: "Shalat Sunnah", completed: false },
  { id: "m-witir", label: "Shalat Witir Penutup Malam", category: "Shalat Sunnah", completed: false },

  // --- TILAWAH & DZIKIR ---
  { id: "m-odoj", label: "Tilawah 1 Juz Harian (ODOJ)", category: "Tilawah & Dzikir", completed: true },
  { id: "m-dzikir-pagi", label: "Dzikir Pagi Al-Ma'tsurat", category: "Tilawah & Dzikir", completed: true },
  { id: "m-dzikir-petang", label: "Dzikir Petang Al-Ma'tsurat", category: "Tilawah & Dzikir", completed: false },
  { id: "m-almulk", label: "Membaca Surah Al-Mulk Sebelum Tidur", category: "Tilawah & Dzikir", completed: false },

  // --- AMALAN KEBAIKAN ---
  { id: "m-sedekah", label: "Sedekah Subuh / Infaq Harian", category: "Amalan Kebaikan", completed: true },
  { id: "m-murojaah", label: "Muroja'ah Hafalan 1 Halaman", category: "Amalan Kebaikan", completed: false }
];
