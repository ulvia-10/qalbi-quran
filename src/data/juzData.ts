export interface JuzInfo {
  juzNumber: number;
  nameArabic: string;
  nameTransliteration: string;
  startSurahNumber: number;
  startSurahName: string;
  startAyah: number;
  endSurahNumber: number;
  endSurahName: string;
  endAyah: number;
  totalPages: number;
}

export const JUZ_LIST: JuzInfo[] = [
  { juzNumber: 1, nameArabic: "آلم", nameTransliteration: "Alif Lam Mim", startSurahNumber: 1, startSurahName: "Al-Fatihah", startAyah: 1, endSurahNumber: 2, endSurahName: "Al-Baqarah", endAyah: 141, totalPages: 21 },
  { juzNumber: 2, nameArabic: "سَيَقُولُ", nameTransliteration: "Sayaqulu", startSurahNumber: 2, startSurahName: "Al-Baqarah", startAyah: 142, endSurahNumber: 2, endSurahName: "Al-Baqarah", endAyah: 252, totalPages: 21 },
  { juzNumber: 3, nameArabic: "تِلْكَ الرُّسُلُ", nameTransliteration: "Tilka ar-Rusul", startSurahNumber: 2, startSurahName: "Al-Baqarah", startAyah: 253, endSurahNumber: 3, endSurahName: "Ali 'Imran", endAyah: 92, totalPages: 20 },
  { juzNumber: 4, nameArabic: "لَنْ تَنَالُوا", nameTransliteration: "Lan Tanalu", startSurahNumber: 3, startSurahName: "Ali 'Imran", startAyah: 93, endSurahNumber: 4, endSurahName: "An-Nisa'", endAyah: 23, totalPages: 20 },
  { juzNumber: 5, nameArabic: "وَالْمُحْصَنَاتُ", nameTransliteration: "Wal-Muhsanat", startSurahNumber: 4, startSurahName: "An-Nisa'", startAyah: 24, endSurahNumber: 4, endSurahName: "An-Nisa'", endAyah: 147, totalPages: 20 },
  { juzNumber: 6, nameArabic: "لَا يُحِبُّ اللَّهُ", nameTransliteration: "La Yuhibbullahu", startSurahNumber: 4, startSurahName: "An-Nisa'", startAyah: 148, endSurahNumber: 5, endSurahName: "Al-Ma'idah", endAyah: 81, totalPages: 20 },
  { juzNumber: 7, nameArabic: "وَإِذَا سَمِعُوا", nameTransliteration: "Wa Idha Sami'u", startSurahNumber: 5, startSurahName: "Al-Ma'idah", startAyah: 82, endSurahNumber: 6, endSurahName: "Al-An'am", endAyah: 110, totalPages: 20 },
  { juzNumber: 8, nameArabic: "وَلَوْ أَنَّنَا", nameTransliteration: "Wa Law Annana", startSurahNumber: 6, startSurahName: "Al-An'am", startAyah: 111, endSurahNumber: 7, endSurahName: "Al-A'raf", endAyah: 87, totalPages: 20 },
  { juzNumber: 9, nameArabic: "قَالَ الْمَلَأُ", nameTransliteration: "Qal al-Mala'u", startSurahNumber: 7, startSurahName: "Al-A'raf", startAyah: 88, endSurahNumber: 8, endSurahName: "Al-Anfal", endAyah: 40, totalPages: 20 },
  { juzNumber: 10, nameArabic: "وَاعْلَمُوا", nameTransliteration: "Wa'lamu", startSurahNumber: 8, startSurahName: "Al-Anfal", startAyah: 41, endSurahNumber: 9, endSurahName: "At-Tawbah", endAyah: 92, totalPages: 20 },
  { juzNumber: 11, nameArabic: "يَعْتَذِرُونَ", nameTransliteration: "Ya'tadhirun", startSurahNumber: 9, startSurahName: "At-Tawbah", startAyah: 93, endSurahNumber: 11, endSurahName: "Hud", endAyah: 5, totalPages: 20 },
  { juzNumber: 12, nameArabic: "وَمَا مِنْ دَابَّةٍ", nameTransliteration: "Wa Ma Min Dabbatin", startSurahNumber: 11, startSurahName: "Hud", startAyah: 6, endSurahNumber: 12, endSurahName: "Yusuf", endAyah: 52, totalPages: 20 },
  { juzNumber: 13, nameArabic: "وَمَا أُبَرِّئُ", nameTransliteration: "Wa Ma Ubarri'u", startSurahNumber: 12, startSurahName: "Yusuf", startAyah: 53, endSurahNumber: 14, endSurahName: "Ibrahim", endAyah: 52, totalPages: 20 },
  { juzNumber: 14, nameArabic: "رُبَمَا", nameTransliteration: "Rubama", startSurahNumber: 15, startSurahName: "Al-Hijr", startAyah: 1, endSurahNumber: 16, endSurahName: "An-Nahl", endAyah: 128, totalPages: 20 },
  { juzNumber: 15, nameArabic: "سُبْحَانَ الَّذِي", nameTransliteration: "Subhanalladhi", startSurahNumber: 17, startSurahName: "Al-Isra'", startAyah: 1, endSurahNumber: 18, endSurahName: "Al-Kahf", endAyah: 74, totalPages: 20 },
  { juzNumber: 16, nameArabic: "قَالَ أَلَمْ", nameTransliteration: "Qala Alam", startSurahNumber: 18, startSurahName: "Al-Kahf", startAyah: 75, endSurahNumber: 20, endSurahName: "Taha", endAyah: 135, totalPages: 20 },
  { juzNumber: 17, nameArabic: "اقْتَرَبَ لِلنَّاسِ", nameTransliteration: "Iqtaraba lin-Nas", startSurahNumber: 21, startSurahName: "Al-Anbiya'", startAyah: 1, endSurahNumber: 22, endSurahName: "Al-Hajj", endAyah: 78, totalPages: 20 },
  { juzNumber: 18, nameArabic: "قَدْ أَفْلَحَ", nameTransliteration: "Qad Aflaha", startSurahNumber: 23, startSurahName: "Al-Mu'minun", startAyah: 1, endSurahNumber: 25, endSurahName: "Al-Furqan", endAyah: 20, totalPages: 20 },
  { juzNumber: 19, nameArabic: "وَقَالَ الَّذِينَ", nameTransliteration: "Wa Qalalladhina", startSurahNumber: 25, startSurahName: "Al-Furqan", startAyah: 21, endSurahNumber: 27, endSurahName: "An-Naml", endAyah: 55, totalPages: 20 },
  { juzNumber: 20, nameArabic: "أَمَّنْ خَلَقَ", nameTransliteration: "Amman Khalaqa", startSurahNumber: 27, startSurahName: "An-Naml", startAyah: 56, endSurahNumber: 29, endSurahName: "Al-'Ankabut", endAyah: 45, totalPages: 20 },
  { juzNumber: 21, nameArabic: "أُتْلُ مَا أُوحِيَ", nameTransliteration: "Utlu Ma Uhiya", startSurahNumber: 29, startSurahName: "Al-'Ankabut", startAyah: 46, endSurahNumber: 33, endSurahName: "Al-Ahzab", endAyah: 30, totalPages: 20 },
  { juzNumber: 22, nameArabic: "وَمَنْ يَقْنُتْ", nameTransliteration: "Wa Man Yaqnut", startSurahNumber: 33, startSurahName: "Al-Ahzab", startAyah: 31, endSurahNumber: 36, endSurahName: "Yasin", endAyah: 27, totalPages: 20 },
  { juzNumber: 23, nameArabic: "وَمَالِيَ", nameTransliteration: "Wa Maliya", startSurahNumber: 36, startSurahName: "Yasin", startAyah: 28, endSurahNumber: 39, endSurahName: "Az-Zumar", endAyah: 31, totalPages: 20 },
  { juzNumber: 24, nameArabic: "فَمَنْ أَظْلَمُ", nameTransliteration: "Faman Azlamu", startSurahNumber: 39, startSurahName: "Az-Zumar", startAyah: 32, endSurahNumber: 41, endSurahName: "Fussilat", endAyah: 46, totalPages: 20 },
  { juzNumber: 25, nameArabic: "إِلَيْهِ يُرَدُّ", nameTransliteration: "Ilaihi Yuraddu", startSurahNumber: 41, startSurahName: "Fussilat", startAyah: 47, endSurahNumber: 45, endSurahName: "Al-Jathiyah", endAyah: 37, totalPages: 20 },
  { juzNumber: 26, nameArabic: "حم", nameTransliteration: "Ha Mim", startSurahNumber: 46, startSurahName: "Al-Ahqaf", startAyah: 1, endSurahNumber: 51, endSurahName: "Adh-Dhariyat", endAyah: 30, totalPages: 20 },
  { juzNumber: 27, nameArabic: "قَالَ فَمَا خَطْبُكُمْ", nameTransliteration: "Qala Fama Khatbukum", startSurahNumber: 51, startSurahName: "Adh-Dhariyat", startAyah: 31, endSurahNumber: 57, endSurahName: "Al-Hadid", endAyah: 29, totalPages: 20 },
  { juzNumber: 28, nameArabic: "قَدْ سَمِعَ اللَّهُ", nameTransliteration: "Qad Sami'allahu", startSurahNumber: 58, startSurahName: "Al-Mujadilah", startAyah: 1, endSurahNumber: 66, endSurahName: "At-Tahrim", endAyah: 12, totalPages: 20 },
  { juzNumber: 29, nameArabic: "تَبَارَكَ الَّذِي", nameTransliteration: "Tabarakalladhi", startSurahNumber: 67, startSurahName: "Al-Mulk", startAyah: 1, endSurahNumber: 77, endSurahName: "Al-Mursalat", endAyah: 50, totalPages: 20 },
  { juzNumber: 30, nameArabic: "عَمَّ يَتَسَاءَلُونَ", nameTransliteration: "'Amma Yatasā'alūn", startSurahNumber: 78, startSurahName: "An-Naba'", startAyah: 1, endSurahNumber: 114, endSurahName: "An-Nas", endAyah: 6, totalPages: 23 },
];
