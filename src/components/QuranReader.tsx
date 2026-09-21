"use client";

import React, { useState, useEffect, useRef } from "react";
import { SURAHS, fetchSurahVerses, Ayah, Surah, applyTajweedHighlights } from "../data/quranData";
import { JUZ_LIST } from "../data/juzData";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Bookmark,
  PlusCircle,
  Copy,
  Check,
  Type,
  Sparkles,
  Bot,
  Send,
  X,
  HelpCircle,
  Lightbulb,
  Heart
} from "lucide-react";

interface QuranReaderProps {
  surahNumber: number;
  juzNumber?: number;
  onSelectSurah: (num: number) => void;
  onBackToSurahList?: () => void;
  onAddTahsinNote: (surahNumber: number, surahName: string, ayahNumber: number) => void;
  onMarkLastRead: (surahNumber: number, ayahNumber: number) => void;
  lastReadSurah?: number;
  lastReadAyah?: number;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  surahNumber,
  juzNumber,
  onSelectSurah,
  onBackToSurahList,
  onAddTahsinNote,
  onMarkLastRead,
  lastReadSurah,
  lastReadAyah,
}) => {
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [arabicFontSize, setArabicFontSize] = useState<number>(32);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);
  const [showTajweedColors, setShowTajweedColors] = useState<boolean>(true);

  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  const [selectedAiAyah, setSelectedAiAyah] = useState<Ayah | null>(null);
  const [aiQuestion, setAiQuestion] = useState<string>("");
  const [aiResponses, setAiResponses] = useState<Array<{ sender: "user" | "ai"; text: string }>>([]);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingAllRef = useRef<boolean>(false);
  const versesRef = useRef<Ayah[]>([]);

  useEffect(() => {
    versesRef.current = verses;
  }, [verses]);

  // Load Surah & Verses
  useEffect(() => {
    const meta = SURAHS.find((s) => s.number === surahNumber) || SURAHS[0];
    setCurrentSurah(meta);
    setLoading(true);

    fetchSurahVerses(surahNumber).then((data) => {
      setVerses(data);
      setLoading(false);
    });

    if (audioRef.current) {
      audioRef.current.pause();
    }
    isPlayingAllRef.current = false;
    setIsPlayingAll(false);
    setPlayingAyah(null);
  }, [surahNumber]);

  // Core Verse Audio Player Function
  const playVerseAudio = (ayahNum: number, autoContinue: boolean = false) => {
    const currentVerses = versesRef.current;
    const targetAyah = currentVerses.find((v) => v.number === ayahNum);
    if (!targetAyah) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const url = targetAyah.audioUrl || `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${targetAyah.globalNumber || 1}.mp3`;

    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingAyah(ayahNum);

    const element = document.getElementById(`ayah-${ayahNum}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    audio.play().catch((err) => console.error("Audio playback error:", err));

    audio.onended = () => {
      if (isPlayingAllRef.current && ayahNum < currentVerses.length) {
        playVerseAudio(ayahNum + 1, true);
      } else {
        setPlayingAyah(null);
        setIsPlayingAll(false);
        isPlayingAllRef.current = false;
      }
    };
  };

  const handleToggleAyahAudio = (ayahNum: number) => {
    if (playingAyah === ayahNum) {
      audioRef.current?.pause();
      setPlayingAyah(null);
      isPlayingAllRef.current = false;
      setIsPlayingAll(false);
    } else {
      isPlayingAllRef.current = false;
      setIsPlayingAll(false);
      playVerseAudio(ayahNum, false);
    }
  };

  const handleTogglePlayAll = () => {
    if (isPlayingAll) {
      audioRef.current?.pause();
      isPlayingAllRef.current = false;
      setIsPlayingAll(false);
      setPlayingAyah(null);
    } else {
      isPlayingAllRef.current = true;
      setIsPlayingAll(true);
      playVerseAudio(1, true);
    }
  };

  const handleCopyAyah = (ayah: Ayah) => {
    const textToCopy = `${ayah.text}\n\n"${ayah.translationId}" (QS. ${currentSurah?.transliteration}: ${ayah.number})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayah.number);
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  // Open Qalbi AI Drawer for Ayah
  const handleOpenAiDrawer = (ayah: Ayah) => {
    setSelectedAiAyah(ayah);
    setAiResponses([
      {
        sender: "ai",
        text: `Assalamu'alaikum! Saya Qalbi AI. Berikut adalah tadabbur mendalam untuk QS. ${currentSurah?.transliteration} ayat ${ayah.number}:\n\n✨ **Hikmah Utama**: Ayat ini mengajarkan ketenangan jiwa dan pengakuan atas keagungan Allah SWT.\n\n💡 **Amalan Harian**: Resapi maknanya dalam shalat Anda dan amalkan pesan kedamaian dalam setiap langkah hari ini.`
      }
    ]);
  };

  // Send Question to Qalbi AI
  const handleSendAiQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || !selectedAiAyah) return;

    const userText = aiQuestion.trim();
    setAiQuestion("");
    setAiResponses((prev) => [...prev, { sender: "user", text: userText }]);
    setAiLoading(true);

    setTimeout(() => {
      setAiResponses((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Mengenai pertanyaan Anda "${userText}" pada QS. ${currentSurah?.transliteration} ayat ${selectedAiAyah.number}:\n\nBerdasarkan petunjuk Al-Quran dan para ahli Tafsir, ayat ini menegaskan bahwa setiap ujian dan karunia adalah sarana mendekatkan diri kepada Allah. Tetaplah istiqamah dan berdoalah memohon petunjuk-Nya.`
        }
      ]);
      setAiLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Reader Controls Bar */}
      <div className="soft-card p-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-20 z-30 shadow-md backdrop-blur-md bg-white/95 dark:bg-[#12221A]/95 border border-emerald-100 dark:border-[#1E3A2C]">
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
          {onBackToSurahList && (
            <button
              onClick={onBackToSurahList}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EAF4EE] dark:bg-[#1E3A2C] text-[#0F5132] dark:text-[#74C69D] hover:bg-[#D8F3DC] font-bold text-xs transition-colors border border-emerald-200/80 dark:border-[#2A4D3A]"
              title="Kembali ke Indeks Surah / Juz"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Daftar Surah</span>
            </button>
          )}

          <button
            onClick={() => onSelectSurah(Math.max(1, surahNumber - 1))}
            disabled={surahNumber === 1}
            className="p-2 rounded-xl border border-slate-200 dark:border-[#1E3A2C] disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-[#1E3A2C] transition-colors"
            title="Surah Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>

          <select
            value={surahNumber}
            onChange={(e) => onSelectSurah(Number(e.target.value))}
            className="bg-[#F4FDF8] dark:bg-[#1E3A2C] border border-slate-200 dark:border-[#2A4D3A] rounded-xl px-3 py-2 font-semibold text-sm text-[#0F5132] dark:text-[#74C69D] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
          >
            {SURAHS.map((s) => (
              <option key={s.number} value={s.number}>
                {s.number}. {s.transliteration} ({s.name})
              </option>
            ))}
          </select>

          <button
            onClick={() => onSelectSurah(Math.min(114, surahNumber + 1))}
            disabled={surahNumber === 114}
            className="p-2 rounded-xl border border-slate-200 dark:border-[#1E3A2C] disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-[#1E3A2C] transition-colors"
            title="Surah Selanjutnya"
          >
            <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>
        </div>

        {/* Reader Display Toggles */}
        <div className="flex items-center gap-2 flex-wrap justify-center text-xs font-medium">
          {/* Font Size Adjuster */}
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] dark:bg-[#1E3A2C] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2A4D3A]">
            <Type className="w-3.5 h-3.5 text-slate-500" />
            <button
              onClick={() => setArabicFontSize(Math.max(22, arabicFontSize - 4))}
              className="w-5 h-5 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#2A4D3A] rounded"
            >
              -
            </button>
            <span className="w-6 text-center font-semibold text-slate-700 dark:text-slate-200">{arabicFontSize}</span>
            <button
              onClick={() => setArabicFontSize(Math.min(48, arabicFontSize + 4))}
              className="w-5 h-5 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#2A4D3A] rounded"
            >
              +
            </button>
          </div>

          {/* Tajweed Toggle */}
          <button
            onClick={() => setShowTajweedColors(!showTajweedColors)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${showTajweedColors
              ? "bg-teal-600 text-white font-bold border-teal-700 shadow-xs"
              : "bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#2A4D3A]"
              }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Warna Tajwid {showTajweedColors ? "ON" : "OFF"}</span>
          </button>

          {/* Translation Toggle */}
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`px-3 py-1.5 rounded-xl border transition-all ${showTranslation
              ? "bg-[#1B4332] text-white font-bold border-[#1B4332] dark:bg-[#2D6A4F]"
              : "bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#2A4D3A]"
              }`}
          >
            Terjemahan
          </button>

          {/* Transliteration Toggle */}
          <button
            onClick={() => setShowTransliteration(!showTransliteration)}
            className={`px-3 py-1.5 rounded-xl border transition-all ${showTransliteration
              ? "bg-[#1B4332] text-white font-bold border-[#1B4332] dark:bg-[#2D6A4F]"
              : "bg-[#FAF8F5] dark:bg-[#1E3A2C] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#2A4D3A]"
              }`}
          >
            Latin
          </button>
        </div>
      </div>

      {/* Surah Header Card */}
      {currentSurah && (
        <div className="soft-card p-6 text-center relative overflow-hidden bg-gradient-to-b from-[#1B4332] to-[#2D6A4F] text-white rounded-2xl shadow-lg">
          <div className="absolute right-0 top-0 opacity-10 font-arabic text-9xl pointer-events-none -mr-10 -mt-6">
            {currentSurah.name}
          </div>
          <div className="relative z-10 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-emerald-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              {currentSurah.type} • Juz {currentSurah.juzStart}
            </span>
            <h1 className="text-3xl font-bold tracking-tight">{currentSurah.transliteration}</h1>
            <p className="text-emerald-100 text-sm font-medium">"{currentSurah.translationId}"</p>
            <p className="text-xs text-emerald-200/80">
              Surah ke-{currentSurah.number} • {currentSurah.totalAyahs} Ayat
            </p>

            {/* Play Full Surah Button */}
            <div className="pt-2">
              <button
                onClick={handleTogglePlayAll}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1B4332] font-bold text-xs shadow-md hover:bg-emerald-50 transition-transform active:scale-95"
              >
                {isPlayingAll ? (
                  <>
                    <Pause className="w-4 h-4 fill-[#1B4332]" />
                    <span>Jeda Audio Surah</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-[#1B4332]" />
                    <span>Putar Seluruh Surah Berturut-turut</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bismillah Header (Except Surah 9 At-Tawbah) */}
      {surahNumber !== 9 && (
        <div className="text-center py-6">
          <span className="font-arabic text-3xl font-bold text-[#1B4332] dark:text-[#74C69D] tracking-wide">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </span>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="soft-card p-6 animate-pulse space-y-4">
              <div className="h-6 bg-slate-200 dark:bg-[#1E3A2C] rounded w-1/4"></div>
              <div className="h-12 bg-slate-200 dark:bg-[#1E3A2C] rounded w-3/4 ml-auto"></div>
              <div className="h-4 bg-slate-200 dark:bg-[#1E3A2C] rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        /* Ayah Cards List */
        <div className="space-y-4">
          {verses.map((ayah) => {
            const isPlayingThis = playingAyah === ayah.number;
            const isLastReadThis = lastReadSurah === surahNumber && lastReadAyah === ayah.number;

            return (
              <div
                key={ayah.number}
                id={`ayah-${ayah.number}`}
                className={`soft-card p-6 space-y-4 transition-all ${isPlayingThis ? "ring-2 ring-emerald-500 bg-emerald-50/40 dark:bg-[#162D22] shadow-md" : ""
                  } ${isLastReadThis ? "ring-2 ring-amber-500 bg-amber-50/20 dark:bg-[#252010]" : ""}`}
              >
                {/* Ayah Header Row (Actions & Number) */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E3A2C]">
                  {/* Ayah Number Badge */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1B4332] dark:bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      {ayah.number}
                    </div>
                    {isLastReadThis && (
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-300">
                        Terakhir Dibaca
                      </span>
                    )}
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Ask Qalbi AI Button */}
                    <button
                      onClick={() => handleOpenAiDrawer(ayah)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Ask Qalbi AI</span>
                    </button>

                    {/* Audio Play */}
                    <button
                      onClick={() => handleToggleAyahAudio(ayah.number)}
                      className={`p-2 rounded-xl transition-colors ${isPlayingThis
                        ? "bg-emerald-600 text-white"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E3A2C]"
                        }`}
                      title="Putar Audio Ayat"
                    >
                      {isPlayingThis ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    {/* Copy Ayah */}
                    <button
                      onClick={() => handleCopyAyah(ayah)}
                      className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E3A2C] transition-colors"
                      title="Salin Ayat & Terjemahan"
                    >
                      {copiedAyah === ayah.number ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>

                    {/* Add Tahsin Note */}
                    <button
                      onClick={() => onAddTahsinNote(surahNumber, currentSurah?.transliteration || "", ayah.number)}
                      className="p-2 rounded-xl text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                      title="Tambah Catatan Tahsin Ayat Ini"
                    >
                      <PlusCircle className="w-4 h-4" />
                    </button>

                    {/* Mark Last Read */}
                    <button
                      onClick={() => onMarkLastRead(surahNumber, ayah.number)}
                      className={`p-2 rounded-xl transition-colors ${isLastReadThis
                        ? "text-amber-500 fill-amber-500"
                        : "text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-[#1E3A2C]"
                        }`}
                      title="Tandai Terakhir Dibaca"
                    >
                      <Bookmark className={`w-4 h-4 ${isLastReadThis ? "fill-amber-500" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Arabic Text Display (with Tajweed highlights toggle) */}
                {showTajweedColors ? (
                  <div
                    className="text-right font-arabic text-slate-800 dark:text-slate-100 leading-relaxed font-semibold tracking-wide py-2"
                    style={{ fontSize: `${arabicFontSize}px` }}
                    dangerouslySetInnerHTML={{
                      __html: ayah.tajweedText || applyTajweedHighlights(ayah.text)
                    }}
                  />
                ) : (
                  <div
                    className="text-right font-arabic text-slate-800 dark:text-slate-100 leading-relaxed font-semibold tracking-wide py-2"
                    style={{ fontSize: `${arabicFontSize}px` }}
                  >
                    {ayah.text}
                  </div>
                )}

                {/* Transliteration (Latin) */}
                {showTransliteration && ayah.transliteration && (
                  <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300 italic">
                    {ayah.transliteration}
                  </p>
                )}

                {/* Indonesian Translation */}
                {showTranslation && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-dashed border-slate-200 dark:border-[#1E3A2C]">
                    {ayah.translationId}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={() => onSelectSurah(Math.max(1, surahNumber - 1))}
          disabled={surahNumber === 1}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#1E3A2C] font-semibold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1E3A2C] disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Surah Sebelumnya</span>
        </button>

        <button
          onClick={() => onSelectSurah(Math.min(114, surahNumber + 1))}
          disabled={surahNumber === 114}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B4332] text-white dark:bg-[#2D6A4F] font-semibold text-xs hover:bg-[#2D6A4F] disabled:opacity-30 transition-colors shadow-xs"
        >
          <span>Surah Selanjutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Qalbi AI Floating Drawer / Modal */}
      {selectedAiAyah && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[85vh] flex flex-col">

            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1E3A2C]">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1B4332] dark:text-[#74C69D]">
                    Qalbi AI Tadabbur Companion
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    QS. {currentSurah?.transliteration} : Ayat {selectedAiAyah.number}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAiAyah(null)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E3A2C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Ayah Box */}
            <div className="bg-[#FAF8F5] dark:bg-[#1E3A2C]/50 p-4 rounded-2xl border border-slate-200/80 dark:border-[#2A4D3A] space-y-2">
              <p className="font-arabic text-xl font-bold text-right text-[#1B4332] dark:text-[#74C69D]">
                {selectedAiAyah.text}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic font-medium">
                "{selectedAiAyah.translationId}"
              </p>
            </div>

            {/* Chat Responses Feed */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {aiResponses.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl ${msg.sender === "user"
                    ? "bg-[#1B4332] text-white ml-8"
                    : "bg-[#F0EBE1] dark:bg-[#1E3A2C] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#2A4D3A] mr-4"
                    }`}
                >
                  <p className="whitespace-pre-line leading-relaxed font-medium">{msg.text}</p>
                </div>
              ))}

              {aiLoading && (
                <div className="p-3 bg-[#F0EBE1] dark:bg-[#1E3A2C] rounded-2xl w-fit flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                  <span>Qalbi AI sedang merenungi jawaban...</span>
                </div>
              )}
            </div>

            {/* Ask Question Input */}
            <form onSubmit={handleSendAiQuestion} className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-[#1E3A2C]">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Tanyakan hikmah, asbabun nuzul, atau perasaan Anda..."
                className="flex-1 p-3 rounded-2xl border border-slate-200 dark:border-[#2A4D3A] bg-[#FAF8F5] dark:bg-[#1E3A2C] text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
              />
              <button
                type="submit"
                className="p-3 rounded-2xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};
