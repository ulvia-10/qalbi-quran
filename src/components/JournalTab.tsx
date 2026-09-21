"use client";

import React, { useState } from "react";
import { JournalEntry, MutabaahTask } from "../data/journalData";
import {
  BookMarked,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Heart,
  CheckSquare,
  Square,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Moon,
  Sun,
  Flame,
  Award
} from "lucide-react";

interface JournalTabProps {
  entries: JournalEntry[];
  onAddEntry: (entry: Omit<JournalEntry, "id" | "createdAt">) => void;
  onDeleteEntry: (id: string) => void;
  mutabaahList: MutabaahTask[];
  onToggleMutabaah: (id: string) => void;
  onAddMutabaahTask?: (label: string, category: MutabaahTask["category"]) => void;
  onResetMutabaah?: () => void;
}

export const JournalTab: React.FC<JournalTabProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry,
  mutabaahList,
  onToggleMutabaah,
  onAddMutabaahTask,
  onResetMutabaah,
}) => {
  const [showAddJournalModal, setShowAddJournalModal] = useState<boolean>(false);
  const [showAddHabitModal, setShowAddHabitModal] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterMood, setFilterMood] = useState<string>("all");

  // Habit Form State
  const [newHabitLabel, setNewHabitLabel] = useState<string>("");
  const [newHabitCategory, setNewHabitCategory] = useState<MutabaahTask["category"]>("Shalat Sunnah");

  // Journal Form State
  const [title, setTitle] = useState<string>("");
  const [surahOrJuz, setSurahOrJuz] = useState<string>("Surah Al-Fatihah");
  const [pagesRead, setPagesRead] = useState<number>(5);
  const [durationMinutes, setDurationMinutes] = useState<number>(15);
  const [mood, setMood] = useState<JournalEntry["mood"]>("Tentram");
  const [reflectionText, setReflectionText] = useState<string>("");
  const [favoriteAyah, setFavoriteAyah] = useState<string>("");

  const completedCount = mutabaahList.filter((m) => m.completed).length;
  const totalTasks = mutabaahList.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const filteredMutabaah = mutabaahList.filter((item) => {
    if (filterCategory === "all") return true;
    return item.category === filterCategory;
  });

  const filteredJournalEntries = entries.filter((item) => {
    if (filterMood === "all") return true;
    return item.mood === filterMood;
  });

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !reflectionText.trim()) return;

    onAddEntry({
      date: new Date().toISOString().split("T")[0],
      title,
      surahOrJuz,
      pagesRead,
      durationMinutes,
      mood,
      reflectionText,
      favoriteAyah: favoriteAyah.trim() || undefined,
    });

    setTitle("");
    setReflectionText("");
    setFavoriteAyah("");
    setShowAddJournalModal(false);
  };

  const handleHabitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitLabel.trim()) return;

    if (onAddMutabaahTask) {
      onAddMutabaahTask(newHabitLabel.trim(), newHabitCategory);
    }
    setNewHabitLabel("");
    setShowAddHabitModal(false);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-2 sm:px-0">
      {/* Header Banner */}
      <div className="soft-card p-6 sm:p-8 bg-gradient-to-r from-white via-[#F4FDF8] to-[#E8F5EE] dark:from-[#12221A] dark:via-[#1B3528] dark:to-[#0F2018] border border-emerald-200/80 dark:border-[#1E3A2C] rounded-3xl relative overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#D8F3DC] dark:bg-[#1E3A2C] px-3 py-1 rounded-full text-xs font-bold text-[#1B4332] dark:text-[#74C69D] border border-[#2D6A4F]/20">
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Tracker Amalan & Shalat Yaumiyah</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] dark:text-[#74C69D] tracking-tight">
              To-Do List Shalat & Amalan Harian
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Pantau shalat 5 waktu tepat waktu, shalat Tahajud, Dhuha, tilawah ODOJ, dan kebiasaan baik harian Anda.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
              <button
                onClick={() => setShowAddHabitModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white dark:bg-[#2D6A4F] dark:hover:bg-[#52B788] font-bold text-xs shadow-md transition-transform active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Amalan Custom</span>
              </button>

              <button
                onClick={() => setShowAddJournalModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] text-slate-700 dark:text-slate-200 font-bold text-xs shadow-xs hover:bg-slate-50 transition-colors"
              >
                <BookMarked className="w-4 h-4 text-emerald-600" />
                <span>Tulis Jurnal Reflection</span>
              </button>
            </div>
          </div>

          {/* Daily Completion Score Badge */}
          <div className="bg-white dark:bg-[#12221A] p-5 rounded-2xl border border-slate-200 dark:border-[#1E3A2C] text-center min-w-[200px] shadow-sm">
            <div className="flex items-center justify-center gap-2 text-[#1B4332] dark:text-[#74C69D] mb-1">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider">Skor Amalan Hari Ini</span>
            </div>
            <span className="text-3xl font-black text-[#1B4332] dark:text-[#74C69D]">{completionPercentage}%</span>
            <div className="w-full bg-slate-100 dark:bg-[#1E3A2C] h-2.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-emerald-600 dark:bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-2">
              {completedCount} dari {totalTasks} Target Selesai
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Span): Interactive To-Do List Tracker */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Category Filter Pills & Reset Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-[#1E3A2C]">
            <h3 className="text-base font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Daftar Amalan & Shalat Yaumiyah</span>
            </h3>

            {onResetMutabaah && (
              <button
                onClick={onResetMutabaah}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 font-semibold transition-colors self-start sm:self-auto"
                title="Reset checklist untuk hari baru"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Hari Ini</span>
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold pb-1">
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                filterCategory === "all"
                  ? "bg-[#1B4332] text-white font-bold"
                  : "bg-white dark:bg-[#12221A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3A2C]"
              }`}
            >
              Semua ({mutabaahList.length})
            </button>
            <button
              onClick={() => setFilterCategory("Shalat Fardhu")}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                filterCategory === "Shalat Fardhu"
                  ? "bg-[#1B4332] text-white font-bold"
                  : "bg-white dark:bg-[#12221A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3A2C]"
              }`}
            >
              Shalat 5 Waktu
            </button>
            <button
              onClick={() => setFilterCategory("Shalat Sunnah")}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                filterCategory === "Shalat Sunnah"
                  ? "bg-[#1B4332] text-white font-bold"
                  : "bg-white dark:bg-[#12221A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3A2C]"
              }`}
            >
              Tahajud & Sunnah
            </button>
            <button
              onClick={() => setFilterCategory("Tilawah & Dzikir")}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                filterCategory === "Tilawah & Dzikir"
                  ? "bg-[#1B4332] text-white font-bold"
                  : "bg-white dark:bg-[#12221A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3A2C]"
              }`}
            >
              Tilawah & Dzikir
            </button>
            <button
              onClick={() => setFilterCategory("Amalan Kebaikan")}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                filterCategory === "Amalan Kebaikan"
                  ? "bg-[#1B4332] text-white font-bold"
                  : "bg-white dark:bg-[#12221A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3A2C]"
              }`}
            >
              Kebaikan
            </button>
          </div>

          {/* Interactive To-Do Cards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredMutabaah.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleMutabaah(item.id)}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  item.completed
                    ? "bg-emerald-50/70 dark:bg-[#162D22] border-emerald-300 dark:border-emerald-800 shadow-2xs"
                    : "bg-white dark:bg-[#12221A] border-slate-200/90 dark:border-[#1E3A2C] hover:border-[#2D6A4F]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0" />
                  )}
                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        item.completed
                          ? "line-through text-slate-400 dark:text-slate-500"
                          : "text-slate-800 dark:text-slate-100"
                      }`}
                    >
                      {item.label}
                    </h4>
                    {item.timeSlot && (
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block mt-0.5">
                        🕒 {item.timeSlot}
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-[9px] px-2 py-0.5 rounded-md font-bold bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-500 border border-slate-200 dark:border-[#2A4D3A] shrink-0">
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 Span): Jurnal Reflection Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-[#1E3A2C]">
            <h3 className="text-base font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Jurnal Reflection ({filteredJournalEntries.length})</span>
            </h3>
          </div>

          <div className="space-y-3">
            {filteredJournalEntries.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="soft-card p-4 space-y-2 bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400">{entry.date}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    ❤️ {entry.mood}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{entry.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                  "{entry.reflectionText}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Custom Habit Modal */}
      {showAddHabitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-600" />
              <span>Tambah Amalan Custom Baru</span>
            </h3>

            <form onSubmit={handleHabitSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Nama Amalan / Kebiasaan</label>
                <input
                  type="text"
                  value={newHabitLabel}
                  onChange={(e) => setNewHabitLabel(e.target.value)}
                  placeholder="Contoh: Puasa Sunnah Senin Kamis, Belajar Tajwid 15 Menit..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Kategori Amalan</label>
                <select
                  value={newHabitCategory}
                  onChange={(e) => setNewHabitCategory(e.target.value as MutabaahTask["category"])}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200"
                >
                  <option value="Shalat Fardhu">Shalat 5 Waktu Tepat Waktu</option>
                  <option value="Shalat Sunnah">Shalat Sunnah (Tahajud, Dhuha, Rawatib)</option>
                  <option value="Tilawah & Dzikir">Tilawah & Dzikir Harian</option>
                  <option value="Amalan Kebaikan">Amalan Kebaikan & Sedekah</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddHabitModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1E3A2C]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1B4332] text-white font-bold hover:bg-[#2D6A4F] shadow-sm"
                >
                  Tambah Amalan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Journal Modal */}
      {showAddJournalModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-amber-500" />
              <span>Tulis Jurnal & Refleksi Tilawah</span>
            </h3>

            <form onSubmit={handleJournalSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Judul Catatan / Momen</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Tadabbur Surah Yasin Saat Subuh..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">Surah / Juz</label>
                  <input
                    type="text"
                    value={surahOrJuz}
                    onChange={(e) => setSurahOrJuz(e.target.value)}
                    placeholder="QS. Al-Kahf"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">Halaman</label>
                  <input
                    type="number"
                    min="1"
                    value={pagesRead}
                    onChange={(e) => setPagesRead(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">Durasi (Menit)</label>
                  <input
                    type="number"
                    min="1"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Pesan / Refleksi Tadabbur</label>
                <textarea
                  rows={3}
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Tuliskan hikmah, pesan mendalam, atau doa yang terlintas saat membaca..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddJournalModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1E3A2C]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1B4332] text-white font-bold hover:bg-[#2D6A4F] shadow-sm"
                >
                  Simpan Jurnal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
