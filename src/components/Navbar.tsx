"use client";

import React, { useState } from "react";
import { BookOpen, Target, FileSpreadsheet, Sparkles, Moon, Sun, Search, BookMarked, SunMoon, Radio, Download, X } from "lucide-react";

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
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-[#0B1510]/90 border-b border-emerald-100/90 dark:border-[#1E3A2C] transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab("reader")}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#0F5132] to-[#1B4332] dark:from-[#2D6A4F] dark:to-[#52B788] flex items-center justify-center text-white shadow-md shadow-[#0F5132]/20 group-hover:scale-105 transition-transform">
              <span className="font-arabic text-xl sm:text-2xl font-bold leading-none mt-0.5 sm:mt-1">قلبي</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0F5132] dark:text-[#74C69D]">
                  Qalbi
                </span>
                <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold bg-[#E8F5E9] text-[#0F5132] dark:bg-[#1E3A2C] dark:text-[#95D5B2] border border-[#2D6A4F]/20">
                  Al-Quran
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden xs:block">
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
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Theme Dark/Light Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-[#1E3A2C] border border-slate-200 dark:border-[#2A4D3A] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#2A4D3A] transition-colors shrink-0 shadow-2xs"
              title={darkMode ? "Ganti ke Mode Terang (Light Mode)" : "Ganti ke Mode Gelap (Dark Mode)"}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              )}
            </button>

            {/* Mobile Search Toggle Icon */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="sm:hidden p-2 rounded-xl bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] text-slate-600 dark:text-slate-300 shrink-0"
              title="Cari Surah / Juz"
            >
              {showMobileSearch ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>

            {/* Desktop Search Input */}
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
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#0F5132] to-[#1B4332] text-white hover:opacity-95 transition-all text-xs font-bold shadow-xs active:scale-95 shrink-0"
              title="Install Aplikasi Qalbi (PWA)"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Search Input */}
        {showMobileSearch && (
          <div className="sm:hidden pb-3 pt-1">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Surah, Juz (cth: Yasin, Kahf)..."
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#FAF8F5] dark:bg-[#1E3A2C] border border-emerald-200 dark:border-[#2A4D3A] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] text-slate-800 dark:text-slate-200"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation Bar (7 Tabs Scrollable with Safe Area) */}
      <div className="xl:hidden flex items-center gap-1 overflow-x-auto scrollbar-none bg-white/95 dark:bg-[#12221A]/95 border-t border-slate-200 dark:border-[#1E3A2C] py-2 px-2 fixed bottom-0 left-0 right-0 z-50 shadow-lg backdrop-blur-md pb-safe">
        <button
          onClick={() => setActiveTab("reader")}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl text-[10px] shrink-0 min-w-[56px] transition-colors ${
            activeTab === "reader" ? "text-[#1B4332] dark:text-[#74C69D] bg-emerald-50 dark:bg-[#1E3A2C] font-bold" : "text-slate-500"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Surah</span>
        </button>

        <button
          onClick={() => setActiveTab("odoj")}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl text-[10px] shrink-0 min-w-[56px] transition-colors ${
            activeTab === "odoj" ? "text-[#1B4332] dark:text-[#74C69D] bg-emerald-50 dark:bg-[#1E3A2C] font-bold" : "text-slate-500"
          }`}
        >
          <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>ODOJ</span>
        </button>

        <button
          onClick={() => setActiveTab("adzan")}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl text-[10px] shrink-0 min-w-[56px] transition-colors ${
            activeTab === "adzan" ? "text-[#1B4332] dark:text-[#74C69D] bg-emerald-50 dark:bg-[#1E3A2C] font-bold" : "text-slate-500"
          }`}
        >
          <Radio className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>Adzan</span>
        </button>

        <button
          onClick={() => setActiveTab("dzikir")}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl text-[10px] shrink-0 min-w-[56px] transition-colors ${
            activeTab === "dzikir" ? "text-[#1B4332] dark:text-[#74C69D] bg-emerald-50 dark:bg-[#1E3A2C] font-bold" : "text-slate-500"
          }`}
        >
          <SunMoon className="w-4 h-4 text-indigo-400" />
          <span>Dzikir</span>
        </button>

        <button
          onClick={() => setActiveTab("journal")}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl text-[10px] shrink-0 min-w-[56px] transition-colors ${
            activeTab === "journal" ? "text-[#1B4332] dark:text-[#74C69D] bg-emerald-50 dark:bg-[#1E3A2C] font-bold" : "text-slate-500"
          }`}
        >
          <BookMarked className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>Jurnal</span>
        </button>

        <button
          onClick={() => setActiveTab("tahsin")}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl text-[10px] shrink-0 min-w-[56px] transition-colors ${
            activeTab === "tahsin" ? "text-[#1B4332] dark:text-[#74C69D] bg-emerald-50 dark:bg-[#1E3A2C] font-bold" : "text-slate-500"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Tahsin</span>
        </button>

        <button
          onClick={() => setActiveTab("tajweed")}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl text-[10px] shrink-0 min-w-[56px] transition-colors ${
            activeTab === "tajweed" ? "text-[#1B4332] dark:text-[#74C69D] bg-emerald-50 dark:bg-[#1E3A2C] font-bold" : "text-slate-500"
          }`}
        >
          <Sparkles className="w-4 h-4 text-teal-500" />
          <span>Tajwid</span>
        </button>

        {/* Dedicated Mobile Theme Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl text-[10px] shrink-0 min-w-[58px] transition-all bg-amber-100/80 dark:bg-[#1E3A2C] border border-amber-300/80 dark:border-[#2A4D3A] text-amber-900 dark:text-amber-300 font-bold active:scale-95 shadow-2xs"
          title={darkMode ? "Ganti ke Mode Terang (Light Mode)" : "Ganti ke Mode Gelap (Dark Mode)"}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400 fill-amber-400" /> : <Moon className="w-4 h-4 text-amber-700" />}
          <span>{darkMode ? "Terang" : "Gelap"}</span>
        </button>
      </div>
    </header>
  );
};

