"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../src/components/Navbar";
import { SurahList } from "../src/components/SurahList";
import { JuzList } from "../src/components/JuzList";
import { QuranReader } from "../src/components/QuranReader";
import { ODOJTracker } from "../src/components/ODOJTracker";
import { TahsinNotes } from "../src/components/TahsinNotes";
import { TajweedGuide } from "../src/components/TajweedGuide";
import { JournalTab } from "../src/components/JournalTab";
import { DzikirTab } from "../src/components/DzikirTab";
import { AdzanMurottalTab } from "../src/components/AdzanMurottalTab";
import { DailyReflection } from "../src/components/DailyReflection";
import { PersonalTahsinNote, INITIAL_TAHSIN_NOTES } from "../src/data/tajweedData";
import { JournalEntry, MutabaahTask, INITIAL_JOURNAL_ENTRIES, INITIAL_MUTABAAH_CHECKLIST } from "../src/data/journalData";
import { SAMPLE_PRAYER_TIMES, PrayerTime, fetchStrictPrayerTimes, ADZAN_AUDIO_SOURCES } from "../src/data/adzanData";
import {
  BookOpen,
  Layers,
  HeartHandshake,
  Clock,
  Target,
  CheckSquare,
  Sparkles,
  ArrowRight,
  Radio,
  MapPin,
  Play,
  Pause,
  Square,
  CheckCircle2,
  Award,
  Flame,
  Plus
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"reader" | "odoj" | "tahsin" | "tajweed" | "journal" | "dzikir" | "adzan">("reader");
  const [readerViewMode, setReaderViewMode] = useState<"surah" | "juz" | "reading">("surah");

  // Selection states
  const [activeSurah, setActiveSurah] = useState<number>(1);
  const [activeJuz, setActiveJuz] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Strict Location Prayer Times
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(SAMPLE_PRAYER_TIMES);
  const [userLocation, setUserLocation] = useState<string>("Lokasi GPS Real-time");
  const [locationLoading, setLocationLoading] = useState<boolean>(true);

  // Home Adzan Audio Player
  const [homePlayingAdzan, setHomePlayingAdzan] = useState<boolean>(false);
  const homeAdzanAudioRef = useRef<HTMLAudioElement | null>(null);

  // Persistent States
  const [completedJuzList, setCompletedJuzList] = useState<number[]>([1, 30]);
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState<number[]>([1, 18, 36, 67, 112]);
  const [tahsinNotes, setTahsinNotes] = useState<PersonalTahsinNote[]>(INITIAL_TAHSIN_NOTES);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(INITIAL_JOURNAL_ENTRIES);
  const [mutabaahChecklist, setMutabaahChecklist] = useState<MutabaahTask[]>(INITIAL_MUTABAAH_CHECKLIST);

  const [lastRead, setLastRead] = useState<{ surahNumber: number; ayahNumber: number }>({
    surahNumber: 1,
    ayahNumber: 1,
  });
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Strict GPS Geolocation Detection on Mount
  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const data = await fetchStrictPrayerTimes(lat, lng);
          setPrayerTimes(data.timings);
          setUserLocation(data.locationName);
          setLocationLoading(false);
        },
        async (err) => {
          console.warn("GPS permission denied/unavailable, using default Jakarta times:", err);
          // Fallback to Jakarta coordinates
          const data = await fetchStrictPrayerTimes(-6.2088, 106.8456);
          setPrayerTimes(data.timings);
          setUserLocation("Jakarta (WIB)");
          setLocationLoading(false);
        },
        { timeout: 10000 }
      );
    } else {
      setLocationLoading(false);
    }
  }, []);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedCompletedJuz = localStorage.getItem("qalbi_completed_juz");
      if (savedCompletedJuz) setCompletedJuzList(JSON.parse(savedCompletedJuz));

      const savedBookmarks = localStorage.getItem("qalbi_bookmarks");
      if (savedBookmarks) setBookmarkedSurahs(JSON.parse(savedBookmarks));

      const savedNotes = localStorage.getItem("qalbi_tahsin_notes");
      if (savedNotes) setTahsinNotes(JSON.parse(savedNotes));

      const savedJournals = localStorage.getItem("qalbi_journal_entries");
      if (savedJournals) setJournalEntries(JSON.parse(savedJournals));

      const savedMutabaah = localStorage.getItem("qalbi_mutabaah_checklist");
      if (savedMutabaah) setMutabaahChecklist(JSON.parse(savedMutabaah));

      const savedLastRead = localStorage.getItem("qalbi_last_read");
      if (savedLastRead) setLastRead(JSON.parse(savedLastRead));

      const savedDark = localStorage.getItem("qalbi_dark_mode");
      if (savedDark) setDarkMode(JSON.parse(savedDark));
    } catch (err) {
      console.error("Failed to load state from localStorage:", err);
    }
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("qalbi_dark_mode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Play Home Adzan Audio
  const handleToggleHomeAdzan = () => {
    if (homePlayingAdzan) {
      homeAdzanAudioRef.current?.pause();
      setHomePlayingAdzan(false);
    } else {
      const audio = new Audio(ADZAN_AUDIO_SOURCES[0].url);
      homeAdzanAudioRef.current = audio;
      audio.play().then(() => setHomePlayingAdzan(true)).catch(() => {
        const fallbackAudio = new Audio(ADZAN_AUDIO_SOURCES[0].fallbackUrl);
        homeAdzanAudioRef.current = fallbackAudio;
        fallbackAudio.play().then(() => setHomePlayingAdzan(true)).catch(console.error);
        fallbackAudio.onended = () => setHomePlayingAdzan(false);
      });
      audio.onended = () => setHomePlayingAdzan(false);
    }
  };

  // Handlers
  const handleToggleJuzComplete = (juzNum: number) => {
    const updated = completedJuzList.includes(juzNum)
      ? completedJuzList.filter((j) => j !== juzNum)
      : [...completedJuzList, juzNum];
    setCompletedJuzList(updated);
    localStorage.setItem("qalbi_completed_juz", JSON.stringify(updated));
  };

  const handleToggleBookmark = (surahNum: number) => {
    const updated = bookmarkedSurahs.includes(surahNum)
      ? bookmarkedSurahs.filter((s) => s !== surahNum)
      : [...bookmarkedSurahs, surahNum];
    setBookmarkedSurahs(updated);
    localStorage.setItem("qalbi_bookmarks", JSON.stringify(updated));
  };

  const handleMarkLastRead = (surahNum: number, ayahNum: number) => {
    const obj = { surahNumber: surahNum, ayahNumber: ayahNum };
    setLastRead(obj);
    localStorage.setItem("qalbi_last_read", JSON.stringify(obj));
  };

  const handleSelectSurah = (surahNum: number) => {
    setActiveSurah(surahNum);
    setReaderViewMode("reading");
    setActiveTab("reader");
  };

  const handleSelectJuz = (juzNum: number, startSurahNum: number) => {
    setActiveJuz(juzNum);
    setActiveSurah(startSurahNum);
    setReaderViewMode("reading");
    setActiveTab("reader");
  };

  const handleAddTahsinNote = (note: Omit<PersonalTahsinNote, "id" | "createdAt">) => {
    const newNote: PersonalTahsinNote = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newNote, ...tahsinNotes];
    setTahsinNotes(updated);
    localStorage.setItem("qalbi_tahsin_notes", JSON.stringify(updated));
  };

  const handleDeleteTahsinNote = (id: string) => {
    const updated = tahsinNotes.filter((n) => n.id !== id);
    setTahsinNotes(updated);
    localStorage.setItem("qalbi_tahsin_notes", JSON.stringify(updated));
  };

  const handleUpdateNoteStatus = (id: string, newStatus: PersonalTahsinNote["status"]) => {
    const updated = tahsinNotes.map((n) => (n.id === id ? { ...n, status: newStatus } : n));
    setTahsinNotes(updated);
    localStorage.setItem("qalbi_tahsin_notes", JSON.stringify(updated));
  };

  // Journal & Mutaba'ah Handlers
  const handleAddJournalEntry = (entry: Omit<JournalEntry, "id" | "createdAt">) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: `j-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem("qalbi_journal_entries", JSON.stringify(updated));
  };

  const handleDeleteJournalEntry = (id: string) => {
    const updated = journalEntries.filter((j) => j.id !== id);
    setJournalEntries(updated);
    localStorage.setItem("qalbi_journal_entries", JSON.stringify(updated));
  };

  const handleToggleMutabaah = (id: string) => {
    const updated = mutabaahChecklist.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m));
    setMutabaahChecklist(updated);
    localStorage.setItem("qalbi_mutabaah_checklist", JSON.stringify(updated));
  };

  const handleAddMutabaahTask = (label: string, category: MutabaahTask["category"]) => {
    const newTask: MutabaahTask = {
      id: `m-custom-${Date.now()}`,
      label,
      category,
      completed: false,
    };
    const updated = [...mutabaahChecklist, newTask];
    setMutabaahChecklist(updated);
    localStorage.setItem("qalbi_mutabaah_checklist", JSON.stringify(updated));
  };

  const handleResetMutabaah = () => {
    const updated = mutabaahChecklist.map((m) => ({ ...m, completed: false }));
    setMutabaahChecklist(updated);
    localStorage.setItem("qalbi_mutabaah_checklist", JSON.stringify(updated));
  };

  const mutabaahCompleted = mutabaahChecklist.filter((m) => m.completed).length;
  const mutabaahTotal = mutabaahChecklist.length;
  const mutabaahPercent = mutabaahTotal > 0 ? Math.round((mutabaahCompleted / mutabaahTotal) * 100) : 0;
  const nextPrayer = prayerTimes.find((p) => p.isNext) || prayerTimes[2];

  return (
    <div className="min-h-screen bg-islamic-pattern flex flex-col font-sans pb-24 md:pb-12 text-slate-800 dark:text-slate-100">
      {/* Navbar Shell */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        completedJuzCount={completedJuzList.length}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Framer Motion Animated Home Dashboard Widgets */}
        {activeTab === "reader" && readerViewMode !== "reading" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Daily Quran Reflection Quote */}
            <DailyReflection />

            {/* Grid 1: Strict GPS Location Adzan & Prayer Schedule Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Card 1: Strict Location Prayer Schedule (2 Span) */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="soft-card p-6 bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] space-y-4 lg:col-span-2 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#1E3A2C]">
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <h3 className="text-base font-bold text-[#1B4332] dark:text-[#74C69D]">
                        Jadwal Shalat Tepat Waktu (Strict Location)
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>{locationLoading ? "Mendeteksi koordinat GPS..." : userLocation}</span>
                    </p>
                  </div>

                  {/* Adzan Quick Play Button */}
                  <button
                    onClick={handleToggleHomeAdzan}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 ${
                      homePlayingAdzan
                        ? "bg-amber-600 text-white"
                        : "bg-[#1B4332] hover:bg-[#2D6A4F] text-white dark:bg-[#2D6A4F]"
                    }`}
                  >
                    {homePlayingAdzan ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{homePlayingAdzan ? "Hentikan Adzan" : "Putar Adzan Makkah"}</span>
                  </button>
                </div>

                {/* 6 Prayer Times Horizontal Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {prayerTimes.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.03 }}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        item.isNext
                          ? "bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300"
                          : "bg-[#FAF8F5] dark:bg-[#1E3A2C]/40 border-slate-200 dark:border-[#2A4D3A] text-slate-800 dark:text-slate-100"
                      }`}
                    >
                      <span className="font-arabic text-lg font-bold block">{item.nameArabic}</span>
                      <p className={`text-xs font-bold ${item.isNext ? "text-emerald-100" : "text-slate-500"}`}>
                        {item.name}
                      </p>
                      <span className={`text-sm font-extrabold mt-1 block ${item.isNext ? "text-amber-200" : "text-[#1B4332] dark:text-[#74C69D]"}`}>
                        {item.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Card 2: Interactive To-Do List Worship Tracker (1 Span) */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="soft-card p-6 bg-white dark:bg-[#12221A] border border-slate-200 dark:border-[#1E3A2C] space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E3A2C]">
                  <div className="flex items-center gap-2 text-[#1B4332] dark:text-[#74C69D]">
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold">To-Do List Amalan</h3>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-300">
                    {mutabaahPercent}% Selesai
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-[#1E3A2C] h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-emerald-600 dark:bg-emerald-400 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${mutabaahPercent}%` }}
                    transition={{ duration: 0.6 }}
                  ></motion.div>
                </div>

                {/* Quick 4 Featured Worship Habits */}
                <div className="space-y-2">
                  {mutabaahChecklist.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleToggleMutabaah(item.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer text-xs font-bold transition-all ${
                        item.completed
                          ? "bg-emerald-50 dark:bg-[#162D22] border-emerald-300 dark:border-emerald-800 text-slate-400 line-through"
                          : "bg-[#FAF8F5] dark:bg-[#1E3A2C]/40 border-slate-200 dark:border-[#2A4D3A] text-slate-800 dark:text-slate-100 hover:border-[#2D6A4F]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 shrink-0" />
                        )}
                        <span>{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab("journal")}
                  className="w-full py-2 text-center text-xs font-bold text-[#1B4332] dark:text-[#74C69D] hover:underline flex items-center justify-center gap-1"
                >
                  <span>Lihat Seluruh Checklist Amalan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>

            </div>
          </motion.div>
        )}

        {/* READER TAB */}
        {activeTab === "reader" && (
          <div className="space-y-6">
            {/* View Mode Switcher (Surahs vs 30 Juz) */}
            <div className="flex items-center gap-2 bg-[#F0EBE1] dark:bg-[#12221A] p-1.5 rounded-2xl w-fit border border-slate-200 dark:border-[#1E3A2C]">
              <button
                onClick={() => setReaderViewMode("surah")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  readerViewMode === "surah"
                    ? "bg-white dark:bg-[#1B4332] text-[#1B4332] dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Indeks Surah (114)</span>
              </button>

              <button
                onClick={() => setReaderViewMode("juz")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  readerViewMode === "juz"
                    ? "bg-white dark:bg-[#1B4332] text-[#1B4332] dark:text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Indeks Juz (30)</span>
              </button>
            </div>

            {/* Render Surah List */}
            {readerViewMode === "surah" && (
              <SurahList
                onSelectSurah={handleSelectSurah}
                searchQuery={searchQuery}
                bookmarkedSurahs={bookmarkedSurahs}
                onToggleBookmark={handleToggleBookmark}
                lastReadSurah={lastRead.surahNumber}
              />
            )}

            {/* Render 30 Juz List */}
            {readerViewMode === "juz" && (
              <JuzList
                onSelectJuz={handleSelectJuz}
                completedJuzList={completedJuzList}
                onToggleJuzComplete={handleToggleJuzComplete}
              />
            )}

            {/* Render Quran Verse Reader */}
            {readerViewMode === "reading" && (
              <QuranReader
                surahNumber={activeSurah}
                juzNumber={activeJuz}
                onSelectSurah={setActiveSurah}
                onBackToSurahList={() => setReaderViewMode("surah")}
                onAddTahsinNote={(surahNum, surahName, ayahNum) => {
                  handleAddTahsinNote({
                    surahNumber: surahNum,
                    surahName: surahName,
                    ayahNumber: ayahNum,
                    noteText: `Perhatikan pelafalan & tajwid pada QS. ${surahName} ayat ${ayahNum}`,
                    ruleCategory: "Makharijul Huruf",
                    status: "Needs Practice",
                  });
                  setActiveTab("tahsin");
                }}
                onMarkLastRead={handleMarkLastRead}
                lastReadSurah={lastRead.surahNumber}
                lastReadAyah={lastRead.ayahNumber}
              />
            )}
          </div>
        )}

        {/* ONE DAY ONE JUZ (ODOJ) TAB */}
        {activeTab === "odoj" && (
          <ODOJTracker
            completedJuzList={completedJuzList}
            onToggleJuzComplete={handleToggleJuzComplete}
            onReadJuz={(juzNum) => {
              handleSelectJuz(juzNum, 1);
            }}
            streakDays={7}
          />
        )}

        {/* ADZAN & MUROTTAL TAB */}
        {activeTab === "adzan" && <AdzanMurottalTab />}

        {/* DZIKIR PAGI & PETANG TAB */}
        {activeTab === "dzikir" && <DzikirTab />}

        {/* JOURNAL & WORSHIP TRACKER TAB */}
        {activeTab === "journal" && (
          <JournalTab
            entries={journalEntries}
            onAddEntry={handleAddJournalEntry}
            onDeleteEntry={handleDeleteJournalEntry}
            mutabaahList={mutabaahChecklist}
            onToggleMutabaah={handleToggleMutabaah}
            onAddMutabaahTask={handleAddMutabaahTask}
            onResetMutabaah={handleResetMutabaah}
          />
        )}

        {/* TAHSIN NOTES TAB */}
        {activeTab === "tahsin" && (
          <TahsinNotes
            notes={tahsinNotes}
            onAddNote={handleAddTahsinNote}
            onDeleteNote={handleDeleteTahsinNote}
            onUpdateStatus={handleUpdateNoteStatus}
            onJumpToAyah={(surahNum, ayahNum) => {
              setActiveSurah(surahNum);
              setReaderViewMode("reading");
              setActiveTab("reader");
            }}
          />
        )}

        {/* TAJWEED GUIDE TAB */}
        {activeTab === "tajweed" && <TajweedGuide />}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-[#1E3A2C] mt-auto py-6 bg-white/50 dark:bg-[#0B1510]/50 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
        <p className="font-semibold text-[#1B4332] dark:text-[#74C69D] flex items-center justify-center gap-1">
          <span>Qalbi (قلبي) Al-Quran</span> • <HeartHandshake className="w-3.5 h-3.5 text-amber-500" /> <span>Clean & Soft Islamic App</span>
        </p>
        <p>Dirancang dengan ketenangan hati untuk menemani tilawah harian Anda</p>
      </footer>
    </div>
  );
}
