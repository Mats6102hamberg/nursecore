import "./globals.css";

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
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-5 py-6 sm:px-6">
          <header className="mb-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-lg font-semibold tracking-tight">
                NurseCore
              </div>
              <nav className="flex flex-wrap gap-2 text-sm">
                <a
                  href="/"
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
                >
                  Home
                </a>
                <a
                  href="/tools"
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
                >
                  Tools
                </a>
                <a
                  href="/knowledge"
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
                >
                  Knowledge
                </a>
                <a
                  href="/notes"
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
                >
                  Notes
                </a>
                <a
                  href="/boris"
                  className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
                >
                  Boris
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
