"use client";

import React, { useState, useEffect } from "react";
import { Download, Smartphone, X, WifiOff, Sparkles, CheckCircle2, Monitor } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if running in standalone mode (installed PWA)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // 2. Online / Offline status
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 3. Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iosDevice);

    // 4. Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 5. App installed listener
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowBanner(false);
      setShowModal(false);
    };
    window.addEventListener("appinstalled", handleAppInstalled);

    // 6. Custom trigger event listener from Navbar button
    const handleCustomTrigger = () => {
      setShowModal(true);
    };
    window.addEventListener("open-pwa-install", handleCustomTrigger);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("open-pwa-install", handleCustomTrigger);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsInstalled(true);
        setShowBanner(false);
        setShowModal(false);
      }
      setDeferredPrompt(null);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Network Status Badge */}
      {!isOnline && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <WifiOff className="w-4 h-4" />
          <span>Mode Offline Aktif - Qalbi Siap Digunakan Tanpa Kuota</span>
        </div>
      )}

      {/* Floating Bottom PWA Banner */}
      {showBanner && !isInstalled && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 bg-white dark:bg-[#12221A] border border-emerald-200 dark:border-[#1E3A2C] p-4 rounded-2xl shadow-2xl space-y-3 transition-all">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F5132] to-[#1B4332] p-0.5 shadow-md flex items-center justify-center shrink-0">
                <img
                  src="/icon-192.png"
                  alt="Qalbi Icon"
                  className="w-full h-full object-cover rounded-[10px]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F5132] dark:text-[#74C69D] flex items-center gap-1.5">
                  <span>Install Aplikasi Qalbi</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                  Pasang di HP/Laptop untuk akses Al-Quran offline & lancar tanpa browser.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowBanner(false)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              title="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleInstallClick}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-[#0F5132] hover:bg-[#1B4332] text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span>Install Qalbi Sekarang</span>
            </button>

            <button
              onClick={() => setShowBanner(false)}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Nanti
            </button>
          </div>
        </div>
      )}

      {/* Full PWA Installation Guide Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#12221A] border border-emerald-200 dark:border-[#1E3A2C] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-left relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F5132] to-[#1B4332] flex items-center justify-center text-white shadow-md">
                <Download className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F5132] dark:text-[#74C69D]">
                  Cara Install Aplikasi Qalbi (PWA)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dapat dipasang di Android, iOS iPhone/iPad, Windows, dan macOS
                </p>
              </div>
            </div>

            {/* Direct Prompt trigger button if browser supported */}
            {deferredPrompt ? (
              <button
                onClick={handleInstallClick}
                className="w-full py-3 bg-[#0F5132] hover:bg-[#1B4332] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4 text-emerald-300" />
                <span>Klik untuk Install Langsung ke Layar Utama</span>
              </button>
            ) : isIOS ? (
              /* iOS Safari instructions */
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 bg-[#F4FDF8] dark:bg-[#1E3A2C]/50 p-4 rounded-xl border border-emerald-200/80 dark:border-[#2A4D3A]">
                <div className="flex items-center gap-2 text-[#0F5132] dark:text-[#74C69D] font-bold">
                  <Smartphone className="w-4 h-4" />
                  <span>Petunjuk iPhone / iPad (Safari):</span>
                </div>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-[#0F5132] dark:text-[#74C69D]">1.</span>
                  <span>Tekan tombol <strong>Share / Bagikan</strong> (ikon kotak dengan panah ke atas) di bagian bawah browser Safari.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-[#0F5132] dark:text-[#74C69D]">2.</span>
                  <span>Gulir ke bawah dan pilih <strong>"Add to Home Screen" / "Tambah ke Layar Utama"</strong>.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-[#0F5132] dark:text-[#74C69D]">3.</span>
                  <span>Tekan <strong>Add / Tambah</strong> di sudut kanan atas.</span>
                </p>
              </div>
            ) : (
              /* Desktop / General instructions */
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2.5 bg-[#F4FDF8] dark:bg-[#1E3A2C]/50 p-4 rounded-xl border border-emerald-200/80 dark:border-[#2A4D3A]">
                <div className="flex items-center gap-2 text-[#0F5132] dark:text-[#74C69D] font-bold">
                  <Monitor className="w-4 h-4" />
                  <span>Petunjuk Browser Desktop (Chrome / Edge):</span>
                </div>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-[#0F5132] dark:text-[#74C69D]">1.</span>
                  <span>Perhatikan <strong>Address Bar (bilah alamat URL)</strong> di bagian atas browser Anda.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-[#0F5132] dark:text-[#74C69D]">2.</span>
                  <span>Klik ikon <strong>Install App (Komputer dengan panah bawah)</strong> di sebelah kanan bilah URL.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-[#0F5132] dark:text-[#74C69D]">3.</span>
                  <span>Atau buka menu titik tiga di kanan atas browser &gt; <strong>Simpan dan Bagikan &gt; Install Qalbi</strong>.</span>
                </p>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2 bg-[#EAF4EE] dark:bg-[#1E3A2C] text-[#0F5132] dark:text-[#74C69D] font-bold rounded-xl text-xs hover:bg-[#D8F3DC] transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};
