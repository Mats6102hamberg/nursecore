import "./globals.css";
import { LanguageProvider } from "../lib/LanguageContext";
import { Header } from "./Header";

export const metadata = {
  title: "NurseCore",
  description: "Private clinical toolkit",
  manifest: "/manifest.webmanifest",
  themeColor: "#ffffff",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "NurseCore",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-100 text-neutral-900">
        <LanguageProvider>
          <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-5 py-6 sm:px-6">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
