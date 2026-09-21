"use client";

import React, { useState } from "react";
import { PersonalTahsinNote, INITIAL_TAHSIN_NOTES } from "../data/tajweedData";
import { SURAHS } from "../data/quranData";
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  BookOpen,
  Filter,
  Sparkles
} from "lucide-react";

interface TahsinNotesProps {
  notes: PersonalTahsinNote[];
  onAddNote: (note: Omit<PersonalTahsinNote, "id" | "createdAt">) => void;
  onDeleteNote: (id: string) => void;
  onUpdateStatus: (id: string, newStatus: PersonalTahsinNote["status"]) => void;
  onJumpToAyah: (surahNumber: number, ayahNumber: number) => void;
}

export const TahsinNotes: React.FC<TahsinNotesProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  onUpdateStatus,
  onJumpToAyah,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form State
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [ayahNumber, setAyahNumber] = useState<number>(1);
  const [ruleCategory, setRuleCategory] = useState<string>("Makharijul Huruf");
  const [noteText, setNoteText] = useState<string>("");
  const [status, setStatus] = useState<PersonalTahsinNote["status"]>("Needs Practice");

  const filteredNotes = notes.filter((n) => {
    if (filterStatus === "all") return true;
    return n.status === filterStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const surahObj = SURAHS.find((s) => s.number === selectedSurah);

    onAddNote({
      surahNumber: selectedSurah,
      surahName: surahObj?.transliteration || `Surah ${selectedSurah}`,
      ayahNumber,
      noteText,
      ruleCategory,
      status,
    });

    setNoteText("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#1E3A2C]">
        <div>
          <h2 className="text-xl font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>Catatan Tahsin & Pelafalan Ayat</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Jurnal evaluasi tajweed personal untuk memperbaiki makhraj & madaad
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white dark:bg-[#2D6A4F] dark:hover:bg-[#52B788] font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Catatan Baru</span>
        </button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filterStatus === "all"
              ? "bg-[#1B4332] text-white font-semibold"
              : "bg-white dark:bg-[#12221A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1E3A2C]"
          }`}
        >
          Semua ({notes.length})
        </button>
        <button
          onClick={() => setFilterStatus("Needs Practice")}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filterStatus === "Needs Practice"
              ? "bg-amber-600 text-white font-semibold"
              : "bg-white dark:bg-[#12221A] text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40"
          }`}
        >
          Perlu Latihan ({notes.filter((n) => n.status === "Needs Practice").length})
        </button>
        <button
          onClick={() => setFilterStatus("Improving")}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filterStatus === "Improving"
              ? "bg-blue-600 text-white font-semibold"
              : "bg-white dark:bg-[#12221A] text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40"
          }`}
        >
          Meningkat ({notes.filter((n) => n.status === "Improving").length})
        </button>
        <button
          onClick={() => setFilterStatus("Mastered")}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filterStatus === "Mastered"
              ? "bg-emerald-600 text-white font-semibold"
              : "bg-white dark:bg-[#12221A] text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40"
          }`}
        >
          Lancar/Mumtaz ({notes.filter((n) => n.status === "Mastered").length})
        </button>
      </div>

      {/* Notes Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="soft-card p-5 space-y-3 flex flex-col justify-between hover:border-[#2D6A4F] transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#1B4332] dark:text-[#74C69D] bg-emerald-50 dark:bg-[#1E3A2C] px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-[#2A4D3A]">
                  {note.surahName} : Ayat {note.ayahNumber}
                </span>

                <span
                  className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    note.status === "Mastered"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300"
                      : note.status === "Improving"
                      ? "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300"
                      : "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300"
                  }`}
                >
                  {note.status === "Mastered" ? "Mumtaz / Lancar" : note.status === "Improving" ? "Progres Baik" : "Perlu Latihan"}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Kategori: {note.ruleCategory}
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed bg-[#FAF8F5] dark:bg-[#1E3A2C]/40 p-3 rounded-xl border border-slate-100 dark:border-[#2A4D3A]">
                "{note.noteText}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#1E3A2C] text-xs">
              <button
                onClick={() => onJumpToAyah(note.surahNumber, note.ayahNumber)}
                className="flex items-center gap-1 font-semibold text-[#1B4332] dark:text-[#74C69D] hover:underline"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Buka Ayat di Reader</span>
              </button>

              <div className="flex items-center gap-2">
                <select
                  value={note.status}
                  onChange={(e) => onUpdateStatus(note.id, e.target.value as PersonalTahsinNote["status"])}
                  className="bg-[#FAF8F5] dark:bg-[#1E3A2C] border border-slate-200 dark:border-[#2A4D3A] rounded-lg px-2 py-1 text-[11px] text-slate-700 dark:text-slate-200"
                >
                  <option value="Needs Practice">Perlu Latihan</option>
                  <option value="Improving">Meningkat</option>
                  <option value="Mastered">Mumtaz</option>
                </select>

                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Hapus Catatan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-16 soft-card">
          <FileSpreadsheet className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Belum ada catatan tahsin terdaftar.</p>
          <p className="text-xs text-slate-400 mt-1">Klik "Tambah Catatan Baru" di atas untuk menambahkan evaluasi bacaan Anda.</p>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Tambah Catatan Tahsin Baru</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">Surah</label>
                  <select
                    value={selectedSurah}
                    onChange={(e) => setSelectedSurah(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200"
                  >
                    {SURAHS.map((s) => (
                      <option key={s.number} value={s.number}>
                        {s.number}. {s.transliteration}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 mb-1">Nomor Ayat</label>
                  <input
                    type="number"
                    min="1"
                    max="286"
                    value={ayahNumber}
                    onChange={(e) => setAyahNumber(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Kategori Hukum / Pelafalan</label>
                <select
                  value={ruleCategory}
                  onChange={(e) => setRuleCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200"
                >
                  <option value="Makharijul Huruf">Makharijul Huruf (Tempat Keluar Huruf)</option>
                  <option value="Hukum Nun Mati & Tanwin">Hukum Nun Mati & Tanwin</option>
                  <option value="Hukum Mim Mati">Hukum Mim Mati</option>
                  <option value="Hukum Mad (Panjang)">Hukum Mad (Panjang)</option>
                  <option value="Qalqalah">Qalqalah (Pantulan)</option>
                  <option value="Ghunnah Muschaddadah">Ghunnah Muschaddadah</option>
                  <option value="Sifat Huruf">Sifat-Sifat Huruf</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Isi Catatan & Evaluasi Pelafalan</label>
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Contoh: Perhatikan panjang Mad Wajib Muttasil 5 harakat pada kata As-Sama'..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 mb-1">Status Latihan</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PersonalTahsinNote["status"])}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200"
                >
                  <option value="Needs Practice">Perlu Latihan Lagi</option>
                  <option value="Improving">Sudah Meningkat</option>
                  <option value="Mastered">Mumtaz / Lancar</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1E3A2C]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1B4332] text-white font-bold hover:bg-[#2D6A4F] shadow-sm"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
