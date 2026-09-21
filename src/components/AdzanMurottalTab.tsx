"use client";

import React, { useState, useRef } from "react";
import { SAMPLE_PRAYER_TIMES, RECITERS, ADZAN_AUDIO_SOURCES, DOA_SETELAH_ADZAN } from "../data/adzanData";
import { SURAHS } from "../data/quranData";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Clock,
  Sparkles,
  Compass,
  Radio,
  Music,
  CheckCircle,
  Heart,
  AlertCircle
} from "lucide-react";

export const AdzanMurottalTab: React.FC = () => {
  // Audio state
  const [playingAdzan, setPlayingAdzan] = useState<boolean>(false);
  const [selectedAdzanSource, setSelectedAdzanSource] = useState<string>(ADZAN_AUDIO_SOURCES[0].url);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Murottal State
  const [selectedReciter, setSelectedReciter] = useState<string>("alafasy");
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [playingMurottal, setPlayingMurottal] = useState<boolean>(false);

  const adzanAudioRef = useRef<HTMLAudioElement | null>(null);
  const murottalAudioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle Adzan Audio Playback with Automatic Fallback
  const handleToggleAdzan = () => {
    setAudioError(null);

    if (playingAdzan) {
      adzanAudioRef.current?.pause();
      setPlayingAdzan(false);
      return;
    }

    if (murottalAudioRef.current) {
      murottalAudioRef.current.pause();
      setPlayingMurottal(false);
    }

    const currentAdzanObj = ADZAN_AUDIO_SOURCES.find((s) => s.url === selectedAdzanSource) || ADZAN_AUDIO_SOURCES[0];

    const audio = new Audio(currentAdzanObj.url);
    adzanAudioRef.current = audio;

    audio.play().then(() => {
      setPlayingAdzan(true);
    }).catch((err) => {
      console.warn("Primary Adzan stream failed, trying fallback...", err);
      // Try fallback URL
      if (currentAdzanObj.fallbackUrl) {
        const fallbackAudio = new Audio(currentAdzanObj.fallbackUrl);
        adzanAudioRef.current = fallbackAudio;
        fallbackAudio.play().then(() => {
          setPlayingAdzan(true);
        }).catch((e) => {
          console.error("All Adzan streams failed:", e);
          setAudioError("Gagal memutar audio Adzan. Silakan periksa koneksi internet Anda.");
          setPlayingAdzan(false);
        });

        fallbackAudio.onended = () => {
          setPlayingAdzan(false);
        };
      } else {
        setAudioError("Gagal memutar audio Adzan.");
        setPlayingAdzan(false);
      }
    });

    audio.onended = () => {
      setPlayingAdzan(false);
    };
  };

  // Toggle Murottal Audio Playback
  const handleToggleMurottal = () => {
    setAudioError(null);

    if (playingMurottal) {
      murottalAudioRef.current?.pause();
      setPlayingMurottal(false);
      return;
    }

    if (adzanAudioRef.current) {
      adzanAudioRef.current.pause();
      setPlayingAdzan(false);
    }

    const reciterObj = RECITERS.find((r) => r.id === selectedReciter) || RECITERS[0];
    const url = `https://cdn.islamic.network/quran/audio/128/${reciterObj.subfolder}/${selectedSurah === 1 ? 1 : 7}.mp3`;

    const audio = new Audio(url);
    murottalAudioRef.current = audio;

    audio.play().then(() => {
      setPlayingMurottal(true);
    }).catch((err) => {
      console.error("Murottal play error:", err);
      setAudioError("Gagal memutar Murottal.");
      setPlayingMurottal(false);
    });

    audio.onended = () => {
      setPlayingMurottal(false);
    };
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-2 sm:px-0">
      {/* Top Banner */}
      <div className="soft-card p-6 sm:p-8 bg-gradient-to-r from-white via-[#F4FDF8] to-[#E8F5EE] dark:from-[#12221A] dark:via-[#1B3528] dark:to-[#0F2018] border border-emerald-200/80 dark:border-[#1E3A2C] rounded-3xl relative overflow-hidden shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#D8F3DC] dark:bg-[#1E3A2C] px-3 py-1 rounded-full text-xs font-bold text-[#1B4332] dark:text-[#74C69D]">
              <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Adzan Merdu & Murottal Al-Quran</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] dark:text-[#74C69D]">
              Jadwal Shalat & Pelantun Al-Quran
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Dengarkan lantunan Adzan Makkah & Madinah dan lantunan Murottal merdu dari para Qari pilihan dunia.
            </p>
          </div>

          {/* Audio Equalizer Subtle Wave Animation when playing */}
          {(playingAdzan || playingMurottal) && (
            <div className="flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-950/80 px-4 py-3 rounded-2xl border border-emerald-300 dark:border-emerald-800">
              <span className="w-1.5 h-6 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-8 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-4 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-bounce delay-200"></span>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 ml-2">
                {playingAdzan ? "Memutar Adzan..." : "Memutar Murottal..."}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Audio Error Alert */}
      {audioError && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{audioError}</span>
        </div>
      )}

      {/* Grid: Prayer Times Schedule & Adzan Player */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Jadwal Shalat Timeline */}
        <div className="soft-card p-6 space-y-4 lg:col-span-1 bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E3A2C]">
            <h3 className="text-base font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Jadwal Shalat Hari Ini</span>
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              WIB (Jakarta)
            </span>
          </div>

          <div className="space-y-2">
            {SAMPLE_PRAYER_TIMES.map((item) => (
              <div
                key={item.name}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  item.isNext
                    ? "bg-emerald-50/80 dark:bg-[#162D22] border-emerald-400 dark:border-emerald-700 ring-2 ring-emerald-400/30"
                    : "bg-[#FAF8F5] dark:bg-[#1E3A2C]/40 border-slate-200 dark:border-[#2A4D3A]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-arabic text-xl font-bold text-[#1B4332] dark:text-[#74C69D]">
                    {item.nameArabic}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{item.name}</h4>
                    {item.isNext && (
                      <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        Mendatang
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-sm font-extrabold text-[#1B4332] dark:text-[#74C69D] bg-white dark:bg-[#12221A] px-3 py-1 rounded-lg border border-slate-200 dark:border-[#2A4D3A]">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Adzan & Murottal Interactive Audio Deck */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Adzan Audio Card */}
          <div className="soft-card p-6 bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#1E3A2C]">
              <h3 className="text-base font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-amber-500" />
                <span>Pelantun Adzan Merdu</span>
              </h3>

              {/* Source Selector */}
              <select
                value={selectedAdzanSource}
                onChange={(e) => setSelectedAdzanSource(e.target.value)}
                className="bg-[#FAF8F5] dark:bg-[#1E3A2C] border border-slate-200 dark:border-[#2A4D3A] rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                {ADZAN_AUDIO_SOURCES.map((s) => (
                  <option key={s.id} value={s.url}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF8F5] dark:bg-[#1E3A2C]/40 p-4 rounded-2xl border border-slate-100 dark:border-[#2A4D3A]">
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {ADZAN_AUDIO_SOURCES.find(s => s.url === selectedAdzanSource)?.name || "Adzan Makkah Mukarramah"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Putar suara Adzan merdu untuk menyambut waktu shalat</p>
              </div>

              <button
                onClick={handleToggleAdzan}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs shadow-md transition-transform active:scale-95 ${
                  playingAdzan
                    ? "bg-amber-600 text-white"
                    : "bg-[#1B4332] hover:bg-[#2D6A4F] text-white dark:bg-[#2D6A4F]"
                }`}
              >
                {playingAdzan ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{playingAdzan ? "Hentikan Adzan" : "Putar Audio Adzan"}</span>
              </button>
            </div>

            {/* Doa Setelah Adzan */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-[#142A1F] border border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
              <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-400 tracking-wider">
                Doa Setelah Adzan:
              </span>
              <p className="font-arabic text-xl font-bold text-[#1B4332] dark:text-[#74C69D] leading-relaxed text-right">
                {DOA_SETELAH_ADZAN.arabic}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                "{DOA_SETELAH_ADZAN.translation}"
              </p>
            </div>
          </div>

          {/* Murottal Quran Qari Player Card */}
          <div className="soft-card p-6 bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E3A2C]">
              <h3 className="text-base font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-2">
                <Music className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Murottal Al-Quran Para Qari Dunia</span>
              </h3>
            </div>

            {/* Qari Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {RECITERS.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedReciter(r.id)}
                  className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                    selectedReciter === r.id
                      ? "bg-[#1B4332] text-white border-[#1B4332] shadow-sm font-bold"
                      : "bg-[#FAF8F5] dark:bg-[#1E3A2C]/40 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#2A4D3A]"
                  }`}
                >
                  <p className="text-xs font-bold line-clamp-1">{r.name}</p>
                  <span className="text-[10px] opacity-80 block mt-0.5">{r.style}</span>
                </div>
              ))}
            </div>

            {/* Select Surah to Play */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF8F5] dark:bg-[#1E3A2C]/40 p-4 rounded-2xl border border-slate-100 dark:border-[#2A4D3A]">
              <div className="w-full sm:w-auto">
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Pilih Surah Murottal:
                </label>
                <select
                  value={selectedSurah}
                  onChange={(e) => setSelectedSurah(Number(e.target.value))}
                  className="w-full sm:w-60 bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#2A4D3A] rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200"
                >
                  {SURAHS.map((s) => (
                    <option key={s.number} value={s.number}>
                      {s.number}. {s.transliteration} ({s.name})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleToggleMurottal}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs shadow-md transition-transform active:scale-95 ${
                  playingMurottal
                    ? "bg-teal-600 text-white"
                    : "bg-[#1B4332] hover:bg-[#2D6A4F] text-white dark:bg-[#2D6A4F]"
                }`}
              >
                {playingMurottal ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{playingMurottal ? "Jeda Murottal" : "Putar Murottal Qari"}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
