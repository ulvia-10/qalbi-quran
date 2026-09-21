"use client";

import React from "react";
import { JUZ_LIST, JuzInfo } from "../data/juzData";
import { Layers, ArrowRight, CheckCircle, Clock } from "lucide-react";

interface JuzListProps {
  onSelectJuz: (juzNumber: number, surahNumber: number) => void;
  completedJuzList: number[];
  onToggleJuzComplete: (juzNumber: number) => void;
}

export const JuzList: React.FC<JuzListProps> = ({
  onSelectJuz,
  completedJuzList,
  onToggleJuzComplete,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#1E3A2C]">
        <div>
          <h2 className="text-xl font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
            <Layers className="w-5 h-5" />
            <span>30 Juz Al-Quran</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Setiap Juz berisi ~20 halaman (Target 1 Hari 1 Juz)
          </p>
        </div>

        <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-[#12221A] px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-[#1E3A2C] self-start sm:self-auto">
          Progress ODOJ: <span className="font-bold">{completedJuzList.length} / 30 Juz Selesai</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {JUZ_LIST.map((juz) => {
          const isCompleted = completedJuzList.includes(juz.juzNumber);

          return (
            <div
              key={juz.juzNumber}
              className={`soft-card p-5 flex flex-col justify-between transition-all group ${
                isCompleted ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-[#142A1F]" : ""
              }`}
            >
              <div>
                {/* Header: Juz badge & Arabic phrase */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#1B4332] dark:bg-[#2D6A4F] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      Juz {juz.juzNumber}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {juz.nameTransliteration}
                      </span>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">
                        ~{juz.totalPages} Halaman
                      </p>
                    </div>
                  </div>

                  <span className="font-arabic text-2xl font-bold text-[#1B4332] dark:text-[#74C69D]">
                    {juz.nameArabic}
                  </span>
                </div>

                {/* Boundaries */}
                <div className="bg-[#FAF8F5] dark:bg-[#1E3A2C]/60 p-3 rounded-xl border border-slate-200/70 dark:border-[#2A4D3A] text-xs space-y-1 mb-4">
                  <div className="flex justify-between text-slate-700 dark:text-slate-200">
                    <span className="text-slate-500 dark:text-slate-400">Mulai:</span>
                    <span className="font-medium">{juz.startSurahName} ayat {juz.startAyah}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 dark:text-slate-200">
                    <span className="text-slate-500 dark:text-slate-400">Selesai:</span>
                    <span className="font-medium">{juz.endSurahName} ayat {juz.endAyah}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#1E3A2C]">
                <button
                  onClick={() => onToggleJuzComplete(juz.juzNumber)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isCompleted
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                      : "bg-slate-100 text-slate-600 dark:bg-[#1E3A2C] dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Khatam</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Tandai Selesai</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onSelectJuz(juz.juzNumber, juz.startSurahNumber)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#1B4332] hover:bg-[#2D6A4F] text-white dark:bg-[#2D6A4F] dark:hover:bg-[#52B788] transition-colors shadow-xs"
                >
                  <span>Baca Juz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
