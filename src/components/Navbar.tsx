"use client";

import React from "react";
import { BookOpen, Target, FileSpreadsheet, Sparkles, Moon, Sun, Search, BookMarked, SunMoon, Radio, Download } from "lucide-react";

interface NavbarProps {
  activeTab: "reader" | "odoj" | "tahsin" | "tajweed" | "journal" | "dzikir" | "adzan";
  setActiveTab: (tab: "reader" | "odoj" | "tahsin" | "tajweed" | "journal" | "dzikir" | "adzan") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  completedJuzCount: number;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  completedJuzCount,
  darkMode,
  setDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-[#0B1510]/90 border-b border-emerald-100/90 dark:border-[#1E3A2C] transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab("reader")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0F5132] to-[#1B4332] dark:from-[#2D6A4F] dark:to-[#52B788] flex items-center justify-center text-white shadow-md shadow-[#0F5132]/20 group-hover:scale-105 transition-transform">
              <span className="font-arabic text-2xl font-bold leading-none mt-1">قلبي</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#0F5132] dark:text-[#74C69D]">
                  Qalbi
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#E8F5E9] text-[#0F5132] dark:bg-[#1E3A2C] dark:text-[#95D5B2] border border-[#2D6A4F]/20">
                  Al-Quran
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Peace for your heart & voice
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#EAF4EE] dark:bg-[#12221A] p-1.5 rounded-2xl border border-emerald-200/60 dark:border-[#1E3A2C]">
            <button
              onClick={() => setActiveTab("reader")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "reader"
                  ? "bg-white dark:bg-[#1B4332] text-[#1B4332] dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#1B4332]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Baca Quran</span>
            </button>

            <button
              onClick={() => setActiveTab("odoj")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "odoj"
                  ? "bg-white dark:bg-[#1B4332] text-[#1B4332] dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#1B4332]"
              }`}
            >
              <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>ODOJ</span>
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                {completedJuzCount}/30
              </span>
            </button>

            <button
              onClick={() => setActiveTab("adzan")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "adzan"
                  ? "bg-white dark:bg-[#1B4332] text-[#1B4332] dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#1B4332]"
              }`}
            >
              <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Adzan & Murottal</span>
            </button>

            <button
              onClick={() => setActiveTab("dzikir")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "dzikir"
                  ? "bg-white dark:bg-[#1B4332] text-[#1B4332] dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#1B4332]"
              }`}
            >
              <SunMoon className="w-4 h-4 text-amber-500" />
              <span>Dzikir</span>
            </button>

            <button
              onClick={() => setActiveTab("journal")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "journal"
                  ? "bg-white dark:bg-[#1B4332] text-[#1B4332] dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#1B4332]"
              }`}
            >
              <BookMarked className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Jurnal</span>
            </button>

            <button
              onClick={() => setActiveTab("tahsin")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "tahsin"
                  ? "bg-white dark:bg-[#1B4332] text-[#1B4332] dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#1B4332]"
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Tahsin</span>
            </button>

            <button
              onClick={() => setActiveTab("tajweed")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "tajweed"
                  ? "bg-white dark:bg-[#1B4332] text-[#1B4332] dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-[#1B4332]"
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Tajwid</span>
            </button>
          </nav>

          {/* Right Controls: Search, Theme & PWA Install Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Surah, Juz (cth: Yasin)..."
                className="w-32 lg:w-48 pl-9 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-all font-medium"
              />
            </div>

            {/* Install PWA Button */}
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-pwa-install"));
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#0F5132] to-[#1B4332] text-white hover:opacity-95 transition-all text-xs font-bold shadow-xs active:scale-95 shrink-0"
              title="Install Aplikasi Qalbi (PWA)"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Install App</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1E3A2C] transition-colors"
              title={darkMode ? "Switch to Light Theme" : "Switch to Ambient Dark Theme"}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="xl:hidden flex items-center justify-around bg-white/95 dark:bg-[#12221A]/95 border-t border-slate-200 dark:border-[#1E3A2C] py-2 px-1 fixed bottom-0 left-0 right-0 z-50 shadow-lg backdrop-blur-md">
        <button
          onClick={() => setActiveTab("reader")}
          className={`flex flex-col items-center gap-1 p-1 rounded-lg text-[10px] ${
            activeTab === "reader" ? "text-[#1B4332] dark:text-[#74C69D] font-bold" : "text-slate-500"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Surah</span>
        </button>

        <button
          onClick={() => setActiveTab("odoj")}
          className={`flex flex-col items-center gap-1 p-1 rounded-lg text-[10px] ${
            activeTab === "odoj" ? "text-[#1B4332] dark:text-[#74C69D] font-bold" : "text-slate-500"
          }`}
        >
          <Target className="w-4 h-4" />
          <span>ODOJ</span>
        </button>

        <button
          onClick={() => setActiveTab("adzan")}
          className={`flex flex-col items-center gap-1 p-1 rounded-lg text-[10px] ${
            activeTab === "adzan" ? "text-[#1B4332] dark:text-[#74C69D] font-bold" : "text-slate-500"
          }`}
        >
          <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>Adzan</span>
        </button>

        <button
          onClick={() => setActiveTab("dzikir")}
          className={`flex flex-col items-center gap-1 p-1 rounded-lg text-[10px] ${
            activeTab === "dzikir" ? "text-[#1B4332] dark:text-[#74C69D] font-bold" : "text-slate-500"
          }`}
        >
          <SunMoon className="w-4 h-4" />
          <span>Dzikir</span>
        </button>

        <button
          onClick={() => setActiveTab("journal")}
          className={`flex flex-col items-center gap-1 p-1 rounded-lg text-[10px] ${
            activeTab === "journal" ? "text-[#1B4332] dark:text-[#74C69D] font-bold" : "text-slate-500"
          }`}
        >
          <BookMarked className="w-4 h-4" />
          <span>Jurnal</span>
        </button>

        <button
          onClick={() => setActiveTab("tahsin")}
          className={`flex flex-col items-center gap-1 p-1 rounded-lg text-[10px] ${
            activeTab === "tahsin" ? "text-[#1B4332] dark:text-[#74C69D] font-bold" : "text-slate-500"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Tahsin</span>
        </button>
      </div>
    </header>
  );
};
