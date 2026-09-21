"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { JUZ_LIST } from "../data/juzData";
import {
  Target,
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  Trophy,
  ArrowRight,
  BookOpen,
  Award,
  RefreshCw,
  Heart
} from "lucide-react";

interface ODOJTrackerProps {
  completedJuzList: number[];
  onToggleJuzComplete: (juzNumber: number) => void;
  onReadJuz: (juzNumber: number) => void;
  streakDays: number;
}

export const ODOJTracker: React.FC<ODOJTrackerProps> = ({
  completedJuzList,
  onToggleJuzComplete,
  onReadJuz,
  streakDays,
}) => {
  const totalJuz = 30;
  const progressPercent = Math.round((completedJuzList.length / totalJuz) * 100);

  // Trigger celebration confetti
  const triggerCelebration = (juzNum: number) => {
    onToggleJuzComplete(juzNum);
    
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#1B4332", "#2D6A4F", "#D4AF37", "#52B788"]
    });
  };

  // Find next recommended target Juz
  const nextTargetJuz = JUZ_LIST.find((j) => !completedJuzList.includes(j.juzNumber))?.juzNumber || 1;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="soft-card p-6 md:p-8 bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#0F281E] text-white relative overflow-hidden shadow-xl rounded-3xl">
        <div className="absolute right-0 top-0 opacity-10 font-arabic text-9xl pointer-events-none -mr-8 -mt-8">
          ختمة
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Target One Day One Juz (ODOJ)</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Khatam Al-Quran Dalam 30 Hari</h1>
            <p className="text-emerald-100 text-sm max-w-xl">
              Istiqamah membaca 1 Juz setiap hari untuk menjaga hubungan hati yang erat dengan kalam Allah SWT.
            </p>

            {/* Quick Next Target Action */}
            <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={() => onReadJuz(nextTargetJuz)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1B4332] font-bold text-sm shadow-lg hover:bg-emerald-50 transition-transform active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-[#1B4332]" />
                <span>Baca Target Hari Ini (Juz {nextTargetJuz})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => triggerCelebration(nextTargetJuz)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Tandai Juz {nextTargetJuz} Selesai</span>
              </button>
            </div>
          </div>

          {/* Stats Circle Badge */}
          <div className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 min-w-[200px]">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-emerald-900/40"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={301.59}
                  strokeDashoffset={301.59 - (301.59 * progressPercent) / 100}
                  strokeLinecap="round"
                  className="text-amber-400 transition-all duration-700 ease-out"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold">{progressPercent}%</span>
                <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">Progres</span>
              </div>
            </div>
            <p className="text-xs font-semibold text-emerald-100 mt-2">
              {completedJuzList.length} dari 30 Juz Selesai
            </p>
          </div>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Streak Metric */}
        <div className="soft-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Flame className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Reading Streak</span>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{streakDays} Hari Beruntun</h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Semangat Istiqamah!</p>
          </div>
        </div>

        {/* Target Daily Pace */}
        <div className="soft-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Target Harian</span>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">1 Juz / 20 Halaman</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">~4 halaman / setelah shalat</p>
          </div>
        </div>

        {/* Khatam Badge */}
        <div className="soft-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pencapaian Khatam</span>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {completedJuzList.length === 30 ? "Khatam Sempurna! 🎉" : `${30 - completedJuzList.length} Juz Tersisa`}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Target 1 Bulan Kemenangan</p>
          </div>
        </div>
      </div>

      {/* 30-Day Juz Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-[#1E3A2C]">
          <div>
            <h3 className="text-lg font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Matriks 30 Juz ODOJ</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Klik kartu untuk menandai selesai atau langsung baca.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {JUZ_LIST.map((juz) => {
            const isDone = completedJuzList.includes(juz.juzNumber);
            const isCurrentTarget = nextTargetJuz === juz.juzNumber && !isDone;

            return (
              <div
                key={juz.juzNumber}
                className={`soft-card p-4 flex flex-col items-center justify-between text-center transition-all cursor-pointer relative group ${
                  isDone
                    ? "bg-emerald-50 dark:bg-[#142A1F] border-emerald-400 dark:border-emerald-700"
                    : isCurrentTarget
                    ? "ring-2 ring-amber-400 bg-amber-50/50 dark:bg-[#201D10] border-amber-300"
                    : "hover:border-[#2D6A4F]"
                }`}
                onClick={() => triggerCelebration(juz.juzNumber)}
              >
                {/* Status Badge */}
                {isDone && (
                  <div className="absolute top-2 right-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />
                  </div>
                )}
                {isCurrentTarget && (
                  <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white animate-pulse">
                    Target
                  </span>
                )}

                <div className="w-9 h-9 rounded-xl bg-[#1B4332] dark:bg-[#2D6A4F] text-white font-bold text-xs flex items-center justify-center my-1 shadow-xs">
                  {juz.juzNumber}
                </div>

                <span className="font-arabic text-lg font-bold text-slate-800 dark:text-slate-100 my-1">
                  {juz.nameArabic}
                </span>

                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {juz.startSurahName}
                </p>

                {/* Read Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReadJuz(juz.juzNumber);
                  }}
                  className="mt-3 w-full py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-[#1E3A2C] text-slate-700 dark:text-slate-200 group-hover:bg-[#1B4332] group-hover:text-white transition-colors"
                >
                  Baca Juz
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hadith Quote Footer Card */}
      <div className="soft-card p-6 bg-[#F3EFE6] dark:bg-[#12221A] border-amber-200/60 dark:border-[#1E3A2C] text-center space-y-2">
        <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
        <p className="font-arabic text-xl text-[#1B4332] dark:text-[#74C69D] font-bold">
          خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
        </p>
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 italic">
          "Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya."
        </p>
        <p className="text-[11px] text-slate-400">— HR. Bukhari No. 5027</p>
      </div>
    </div>
  );
};
