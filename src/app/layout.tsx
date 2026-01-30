import "./globals.css";
import { LanguageProvider } from "../lib/LanguageContext";
import { ThemeProvider } from "../lib/ThemeContext";
import { AuthProvider } from "../lib/AuthContext";
import { Header } from "./Header";

export const metadata = {
  title: "NurseCore",
  description: "Klinisk verktygslåda för sjuksköterskor",
  manifest: "/manifest.json",
  themeColor: "#171717",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icon-192.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "NurseCore",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-100 text-neutral-900 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 dark:text-neutral-100">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-5 py-6 sm:px-6">
                <Header />
                <main className="flex-1">{children}</main>
              </div>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
