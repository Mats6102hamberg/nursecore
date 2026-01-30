"use client";

import { useLanguage } from "../lib/LanguageContext";
import { useTheme } from "../lib/ThemeContext";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="mb-8 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a href="/" className="text-lg font-semibold tracking-tight">
          NurseCore
        </a>
        <div className="flex items-center gap-2">
          <nav className="flex flex-wrap gap-1.5 text-sm">
            <a
              href="/"
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
            >
              {t.nav.home}
            </a>
            <a
              href="/tools"
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
            >
              {t.nav.tools}
            </a>
            <a
              href="/knowledge"
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
            >
              {t.nav.knowledge}
            </a>
            <a
              href="/calculator"
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
            >
              {t.nav.calculator}
            </a>
            <a
              href="/boris"
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
            >
              {t.nav.boris}
            </a>
          </nav>
          <a
            href="/search"
            className="rounded-full border border-neutral-200 bg-white p-2 text-neutral-500 shadow-sm transition hover:border-neutral-300 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200"
            aria-label={t.nav.search}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-neutral-200 bg-white p-2 text-neutral-500 shadow-sm transition hover:border-neutral-300 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200"
            aria-label={theme === "dark" ? t.nav.lightMode : t.nav.darkMode}
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "sv" : "en")}
            className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
            aria-label="Toggle language"
          >
            {language === "sv" ? "🇸🇪 SV" : "🇬🇧 EN"}
          </button>
        </div>
      </div>
    </header>
  );
}
