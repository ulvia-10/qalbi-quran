"use client";

import React, { useState } from "react";
import { SURAHS, Surah } from "../data/quranData";
import { BookOpen, Bookmark, Sparkles, Compass, CheckCircle2 } from "lucide-react";

interface SurahListProps {
  onSelectSurah: (surahNumber: number) => void;
  searchQuery: string;
  bookmarkedSurahs: number[];
  onToggleBookmark: (surahNumber: number) => void;
  lastReadSurah?: number;
}

export const SurahList: React.FC<SurahListProps> = ({
  onSelectSurah,
  searchQuery,
  bookmarkedSurahs,
  onToggleBookmark,
  lastReadSurah,
}) => {
  const [filterType, setFilterType] = useState<"all" | "makkiyah" | "madaniyah" | "bookmarks">("all");

  const filteredSurahs = SURAHS.filter((surah) => {
    const matchesSearch =
      surah.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.translationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.name.includes(searchQuery) ||
      surah.number.toString() === searchQuery.trim();

    if (!matchesSearch) return false;

    if (filterType === "makkiyah") return surah.type === "Makkiyah";
    if (filterType === "madaniyah") return surah.type === "Madaniyah";
    if (filterType === "bookmarks") return bookmarkedSurahs.includes(surah.number);
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Sub-header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#1E3A2C]">
        <div>
          <h2 className="text-xl font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span>Daftar Surah Al-Quran</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Menampilkan {filteredSurahs.length} dari 114 Surah
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-medium">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              filterType === "all"
                ? "bg-[#1B4332] text-white font-semibold shadow-sm"
                : "bg-white dark:bg-[#12221A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3A2C]"
            }`}
          >
            Semua (114)
          </button>
          <button
            onClick={() => setFilterType("makkiyah")}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              filterType === "makkiyah"
                ? "bg-[#1B4332] text-white font-semibold shadow-sm"
                : "bg-white dark:bg-[#12221A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3A2C]"
            }`}
          >
            Makkiyah
          </button>
          <button
            onClick={() => setFilterType("madaniyah")}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              filterType === "madaniyah"
                ? "bg-[#1B4332] text-white font-semibold shadow-sm"
                : "bg-white dark:bg-[#12221A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3A2C]"
            }`}
          >
            Madaniyah
          </button>
          <button
            onClick={() => setFilterType("bookmarks")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              filterType === "bookmarks"
                ? "bg-amber-600 text-white font-semibold shadow-sm"
                : "bg-white dark:bg-[#12221A] text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Tersimpan ({bookmarkedSurahs.length})</span>
          </button>
        </div>
      </div>

      {/* Surah Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredSurahs.map((surah) => {
          const isBookmarked = bookmarkedSurahs.includes(surah.number);
          const isLastRead = lastReadSurah === surah.number;

          return (
            <div
              key={surah.number}
              onClick={() => onSelectSurah(surah.number)}
              className={`soft-card p-3.5 sm:p-4 flex items-center justify-between cursor-pointer group hover:border-[#2D6A4F] relative overflow-hidden transition-all gap-2 ${
                isLastRead ? "ring-2 ring-[#2D6A4F] dark:ring-[#52B788] bg-emerald-50/40 dark:bg-[#162D22]" : ""
              }`}
            >
              {isLastRead && (
                <div className="absolute top-0 right-0 bg-[#2D6A4F] text-white text-[9px] sm:text-[10px] px-2 py-0.5 rounded-bl-lg font-medium flex items-center gap-1 z-10">
                  <CheckCircle2 className="w-3 h-3" /> Terakhir Dibaca
                </div>
              )}

              <div className="flex items-center gap-3 min-w-0">
                {/* Surah Number Badge */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FAF8F5] dark:bg-[#1E3A2C] border border-[#E2E8F0] dark:border-[#2A4D3A] flex items-center justify-center font-bold text-xs sm:text-sm text-[#1B4332] dark:text-[#74C69D] group-hover:bg-[#1B4332] group-hover:text-white transition-colors shadow-xs shrink-0">
                  {surah.number}
                </div>

                {/* Surah Info */}
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 group-hover:text-[#1B4332] dark:group-hover:text-[#74C69D] transition-colors truncate">
                    {surah.transliteration}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {surah.translationId} • <span className="font-medium text-slate-600 dark:text-slate-300">{surah.totalAyahs} Ayat</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1E3A2C] text-slate-600 dark:text-slate-300 font-medium">
                      {surah.type}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500">
                      Juz {surah.juzStart}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Arabic Name & Bookmark */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="font-arabic text-xl sm:text-2xl font-bold text-[#1B4332] dark:text-[#74C69D] tracking-wide">
                  {surah.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(surah.number);
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isBookmarked
                      ? "text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                      : "text-slate-300 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-[#1E3A2C]"
                  }`}
                  title={isBookmarked ? "Hapus dari bookmark" : "Simpan ke bookmark"}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-500" : ""}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="text-center py-16 soft-card">
          <Compass className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Tidak ditemukan Surah yang cocok dengan "{searchQuery}"
          </p>
          <p className="text-xs text-slate-400 mt-1">Coba gunakan nama Surah lain atau ubah filter.</p>
        </div>
      )}
    </div>
  );
};
