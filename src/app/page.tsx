"use client";

import { useLanguage } from "../lib/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-8 sm:py-12">
      <header className="flex flex-col gap-4">
        <div className="inline-flex w-fit items-center rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          {t.home.badge}
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            {t.home.title}
          </h1>
          <p className="max-w-2xl text-base text-neutral-600 sm:text-lg">
            {t.home.description}
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <a
          href="/tools"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              {t.home.toolsTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600">{t.home.toolsDesc}</p>
          </div>
          <span className="text-sm font-medium text-neutral-900">
            {t.home.toolsLink}
          </span>
        </a>
        <a
          href="/boris"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              {t.home.borisTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600">{t.home.borisDesc}</p>
          </div>
          <span className="text-sm font-medium text-neutral-900">
            {t.home.borisLink}
          </span>
        </a>
        <a
          href="/notes"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              {t.home.notesTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600">{t.home.notesDesc}</p>
          </div>
          <span className="text-sm font-medium text-neutral-900">
            {t.home.notesLink}
          </span>
        </a>
        <a
          href="/knowledge"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              {t.home.knowledgeTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              {t.home.knowledgeDesc}
            </p>
          </div>
          <span className="text-sm font-medium text-neutral-900">
            {t.home.knowledgeLink}
          </span>
        </a>
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="/boris"
          className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          {t.home.borisCta}
        </a>
      </div>
    </div>
  );
}
