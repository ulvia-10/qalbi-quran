"use client";

import React, { useState } from "react";
import { DZIKIR_LIST, DzikirItem } from "../data/dzikirData";
import {
  Sun,
  Moon,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  HeartHandshake,
  Volume2,
  BookOpen
} from "lucide-react";

export const DzikirTab: React.FC = () => {
  const [category, setCategory] = useState<'pagi' | 'petang' | 'shalat'>('pagi');
  const [counts, setCounts] = useState<Record<string, number>>({});

  const filteredDzikir = DZIKIR_LIST.filter((d) => d.category === category);

  const handleIncrement = (id: string, maxTarget: number) => {
    setCounts((prev) => {
      const current = prev[id] || 0;
      if (current >= maxTarget) return prev;
      return { ...prev, [id]: current + 1 };
    });
  };

  const handleReset = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleResetCategory = () => {
    const updated = { ...counts };
    filteredDzikir.forEach((item) => {
      updated[item.id] = 0;
    });
    setCounts(updated);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-2 sm:px-0">
      {/* Top Banner */}
      <div className="soft-card p-6 sm:p-8 bg-gradient-to-r from-white via-[#F4FDF8] to-[#E8F5EE] dark:from-[#12221A] dark:via-[#1B3528] dark:to-[#0F2018] border border-emerald-200/80 dark:border-[#1E3A2C] rounded-3xl relative overflow-hidden shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-[#D8F3DC] dark:bg-[#1E3A2C] px-3 py-1 rounded-full text-xs font-bold text-[#1B4332] dark:text-[#74C69D]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Al-Ma'tsurat & Dzikir Harian</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] dark:text-[#74C69D]">
            Dzikir Pagi & Petang
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg">
            Benteng perlindungan diri dengan dzikir yang diajarkan Rasulullah SAW.
          </p>
        </div>

        {/* Category Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-[#12221A] p-1.5 rounded-2xl border border-slate-200 dark:border-[#1E3A2C] shadow-xs">
          <button
            onClick={() => setCategory('pagi')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              category === 'pagi'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#1B4332]'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-400" />
            <span>Pagi</span>
          </button>

          <button
            onClick={() => setCategory('petang')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              category === 'petang'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#1B4332]'
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
            <span>Petang</span>
          </button>

          <button
            onClick={() => setCategory('shalat')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              category === 'shalat'
                ? 'bg-[#1B4332] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#1B4332]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>Shalat</span>
          </button>
        </div>
      </div>

      {/* Action Subbar */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Menampilkan Dzikir {category === 'pagi' ? 'Pagi Hari (Subuh - Dhuha)' : category === 'petang' ? 'Petang Hari (Asar - Maghrib)' : 'Setelah Shalat Fardhu'}
        </span>

        <button
          onClick={handleResetCategory}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Hitungan</span>
        </button>
      </div>

      {/* Dzikir Cards List */}
      <div className="space-y-6">
        {filteredDzikir.map((item) => {
          const currentCount = counts[item.id] || 0;
          const isFinished = currentCount >= item.repeatCount;
          const progress = Math.round((currentCount / item.repeatCount) * 100);

          return (
            <div
              key={item.id}
              className={`soft-card p-6 space-y-4 bg-white dark:bg-[#12221A] border transition-all ${
                isFinished
                  ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-[#142A1F]"
                  : "border-slate-200 dark:border-[#1E3A2C]"
              }`}
            >
              {/* Header Row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-[#1B4332] dark:bg-[#2D6A4F] text-white font-bold text-xs flex items-center justify-center">
                    {item.repeatCount}x
                  </span>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{item.title}</h3>
                </div>

                {isFinished ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Selesai</span>
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-400">
                    Target: {item.repeatCount} Kali
                  </span>
                )}
              </div>

              {/* Arabic Text Display */}
              <div className="text-right font-arabic text-2xl sm:text-3xl font-bold text-[#1B4332] dark:text-[#74C69D] leading-relaxed py-2">
                {item.arabic}
              </div>

              {/* Transliteration & Translation */}
              <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 italic">
                {item.transliteration}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-dashed border-slate-200 dark:border-[#1E3A2C]">
                {item.translation}
              </p>

              {/* Virtue Note */}
              <div className="bg-[#F4FDF8] dark:bg-[#1E3A2C]/60 p-3 rounded-xl text-xs text-slate-600 dark:text-slate-400 font-medium border border-emerald-100/80 dark:border-[#2A4D3A]">
                💡 <span className="font-bold text-slate-700 dark:text-slate-200">Keutamaan: </span>
                {item.fadilah}
              </div>

              {/* Counter Action Button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => handleReset(item.id)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E3A2C]"
                  title="Reset counter ayat ini"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleIncrement(item.id, item.repeatCount)}
                  disabled={isFinished}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-extrabold transition-all shadow-md active:scale-95 ${
                    isFinished
                      ? "bg-emerald-600 text-white cursor-default opacity-90"
                      : "bg-[#1B4332] hover:bg-[#2D6A4F] text-white dark:bg-[#2D6A4F] dark:hover:bg-[#52B788]"
                  }`}
                >
                  <span>{isFinished ? "Alhamdulillah Selesai" : `Hitung Dzikir (${currentCount} / ${item.repeatCount})`}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
