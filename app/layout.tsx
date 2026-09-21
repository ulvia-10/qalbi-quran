import type { Metadata, Viewport } from "next";
import { Amiri, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PWAInstallBanner } from "@/src/components/PWAInstallBanner";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#1B4332",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Qalbi (قلبي) - Clean & Soft Islamic Al-Quran App",
  description: "Read Al-Quran by Surah & Juz, track One Day One Juz target, learn Tajweed rules, and log personal Tahsin notes in a serene soft Islamic theme.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Qalbi",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${amiri.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('[Qalbi PWA] SW registered with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('[Qalbi PWA] SW registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-[#F4F9F5] text-[#0A291C] font-sans dark:bg-[#0B1510] dark:text-[#E2E8F0] selection:bg-[#2D6A4F] selection:text-white transition-colors duration-300">
        {children}
        <PWAInstallBanner />
      </body>
    </html>
  );
}
