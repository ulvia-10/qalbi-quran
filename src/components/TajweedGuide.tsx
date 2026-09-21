"use client";

import React, { useState } from "react";
import { TAJWEED_RULES, TajweedRule } from "../data/tajweedData";
import { Sparkles, BookOpen, Search, Info, CheckCircle2 } from "lucide-react";

export const TajweedGuide: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = Array.from(new Set(TAJWEED_RULES.map((r) => r.category)));

  const filteredRules = TAJWEED_RULES.filter((rule) => {
    const matchesSearch =
      rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.arabicName.includes(searchQuery) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.exampleTransliteration.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === "all") return true;
    return rule.category === selectedCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-[#1E3A2C]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>Panduan Hukum Bacaan Tajwid Lengkap</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Menampilkan {filteredRules.length} hukum tajwid (Nun Mati, Mim Mati, Mad, Ra', Qalqalah, Lam Jalalah, Makhraj)
          </p>
        </div>

        {/* Search Bar for Tajweed Rules */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Hukum (cth: Mad, Ra, Iqlab)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-slate-800 dark:text-slate-200 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Category Pills Filter (Horizontal Scrollable for Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
            selectedCategory === "all"
              ? "bg-[#1B4332] text-white shadow-sm"
              : "bg-white dark:bg-[#12221A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3A2C] hover:bg-slate-50"
          }`}
        >
          Semua Hukum ({TAJWEED_RULES.length})
        </button>

        {categories.map((cat) => {
          const count = TAJWEED_RULES.filter((r) => r.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#1B4332] text-white shadow-sm font-bold"
                  : "bg-white dark:bg-[#12221A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3A2C] hover:bg-slate-50"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Rules Cards Grid (Fully Responsive: 1 col on mobile, 2 col on tablet/desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="soft-card p-5 sm:p-6 space-y-4 relative overflow-hidden border-t-4 transition-all hover:shadow-lg"
            style={{ borderTopColor: rule.colorTag }}
          >
            {/* Title & Arabic Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E3A2C] text-slate-600 dark:text-slate-300">
                  {rule.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-2">
                  <span>{rule.title}</span>
                </h3>
              </div>
              <span className="font-arabic text-2xl sm:text-3xl font-bold text-[#1B4332] dark:text-[#74C69D] shrink-0">
                {rule.arabicName}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {rule.description}
            </p>

            {/* Letters Badge Box */}
            <div className="bg-[#FAF8F5] dark:bg-[#1E3A2C]/60 p-3 rounded-xl border border-slate-200/60 dark:border-[#2A4D3A] space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                Huruf-Huruf Hukum:
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {rule.letters.map((letter, idx) => (
                  <span
                    key={idx}
                    className="font-arabic text-base sm:text-lg font-bold px-2 py-1 rounded-xl bg-white dark:bg-[#12221A] text-[#1B4332] dark:text-[#74C69D] border border-slate-200 dark:border-[#2A4D3A] shadow-2xs"
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            {/* How to Read */}
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-emerald-50/40 dark:bg-[#162D22] p-2.5 rounded-xl border border-emerald-100 dark:border-[#2A4D3A]">
              <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-700 dark:text-slate-200">Cara Membaca: </span>
                <span>{rule.howToRead}</span>
              </div>
            </div>

            {/* Example Box */}
            <div className="p-3.5 rounded-xl bg-[#F0EBE1] dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider">
                  Contoh: {rule.exampleSurah}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-200 font-semibold mt-0.5">
                  {rule.exampleTransliteration}
                </p>
              </div>

              <span className="font-arabic text-xl sm:text-2xl font-bold text-[#1B4332] dark:text-[#74C69D] text-right">
                {rule.exampleArabic}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredRules.length === 0 && (
        <div className="text-center py-16 soft-card">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Tidak ditemukan hukum tajwid yang cocok dengan "{searchQuery}"
          </p>
          <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci lain seperti "Mad", "Ra", atau "Izhar".</p>
        </div>
      )}
    </div>
  );
};
