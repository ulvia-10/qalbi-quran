"use client";

import React, { useState } from "react";
import { Sparkles, Heart, Share2, Check, RefreshCw } from "lucide-react";

const DAILY_REFLECTIONS = [
  {
    arabic: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
    translation: "Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.",
    source: "QS. Ar-Ra'd [13]: 28"
  },
  {
    arabic: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
    translation: "Sesungguhnya bersama kesulitan ada kemudahan.",
    source: "QS. Al-Insyirah [94]: 6"
  },
  {
    arabic: "وَٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ",
    translation: "Jadikanlah sabar dan shalat sebagai penolongmu.",
    source: "QS. Al-Baqarah [2]: 45"
  },
  {
    arabic: "فَٱذْكُرُونِيٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِي وَلَا تَكْفُرُونِ",
    translation: "Maka ingatlah kepada-Ku, Aku pun akan ingat kepadamu. Bersyukurlah kepada-Ku, dan janganlah kamu ingkar.",
    source: "QS. Al-Baqarah [2]: 152"
  }
];

export const DailyReflection: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const reflection = DAILY_REFLECTIONS[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % DAILY_REFLECTIONS.length);
  };

  const handleCopy = () => {
    const text = `${reflection.arabic}\n\n"${reflection.translation}" (${reflection.source})\n— Di-share via Qalbi Al-Quran`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="soft-card p-6 bg-gradient-to-r from-white via-[#F4FDF8] to-[#E8F5EE] dark:from-[#12221A] dark:via-[#1B3528] dark:to-[#0F2018] border border-emerald-200/80 dark:border-[#1E3A2C] shadow-sm rounded-2xl relative overflow-hidden">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#1B4332] text-white dark:bg-[#2D6A4F] flex items-center justify-center shadow-xs">
            <Heart className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1B4332] dark:text-[#74C69D] uppercase tracking-wider">
              Tadabbur & Refleksi Harian
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200/50 dark:hover:bg-[#1E3A2C] transition-colors"
            title="Ganti Ayat Refleksi"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-200/50 dark:hover:bg-[#1E3A2C] transition-colors"
            title="Salin Refleksi"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2 text-center md:text-left">
        <p className="font-arabic text-2xl font-bold text-[#1B4332] dark:text-[#74C69D] leading-relaxed">
          {reflection.arabic}
        </p>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 italic">
          "{reflection.translation}"
        </p>
        <p className="text-xs text-slate-400 font-medium">— {reflection.source}</p>
      </div>
    </div>
  );
};
