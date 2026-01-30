"use client";

import { useLanguage } from "../lib/LanguageContext";

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="mb-8 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-lg font-semibold tracking-tight">NurseCore</div>
        <div className="flex items-center gap-3">
          <nav className="flex flex-wrap gap-2 text-sm">
            <a
              href="/"
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
            >
              {t.nav.home}
            </a>
            <a
              href="/tools"
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
            >
              {t.nav.tools}
            </a>
            <a
              href="/knowledge"
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
            >
              {t.nav.knowledge}
            </a>
            <a
              href="/notes"
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
            >
              {t.nav.notes}
            </a>
            <a
              href="/boris"
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
            >
              {t.nav.boris}
            </a>
          </nav>
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "sv" : "en")}
            className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
            aria-label="Toggle language"
          >
            {language === "en" ? "🇸🇪 SV" : "🇬🇧 EN"}
          </button>
        </div>
      </div>
    </header>
  );
}
