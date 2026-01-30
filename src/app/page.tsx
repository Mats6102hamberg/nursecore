"use client";

import { useState } from "react";
import { useLanguage } from "../lib/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    { q: t.home.faq1q, a: t.home.faq1a },
    { q: t.home.faq2q, a: t.home.faq2a },
    { q: t.home.faq3q, a: t.home.faq3a },
    { q: t.home.faq4q, a: t.home.faq4a },
    { q: t.home.faq5q, a: t.home.faq5a },
    { q: t.home.faq6q, a: t.home.faq6a },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-8 sm:py-12">
      <header className="flex flex-col gap-4">
        <div className="inline-flex w-fit items-center rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-400">
          {t.home.badge}
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
            {t.home.title}
          </h1>
          <p className="max-w-2xl text-base text-neutral-600 dark:text-neutral-400 sm:text-lg">
            {t.home.description}
          </p>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href="/tools"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {t.home.toolsTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{t.home.toolsDesc}</p>
          </div>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {t.home.toolsLink}
          </span>
        </a>
        <a
          href="/boris/studie"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {t.home.borisStudyTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {t.home.borisStudyDesc}
            </p>
          </div>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {t.home.borisStudyLink}
          </span>
        </a>
        <a
          href="/boris/jobb"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {t.home.borisWorkTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {t.home.borisWorkDesc}
            </p>
          </div>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {t.home.borisWorkLink}
          </span>
        </a>

        {/* New clinical tools section */}
        <a
          href="/news2"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-red-900/50 dark:from-red-950/30 dark:to-neutral-800"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🚨</span>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {t.home.news2Title}
              </h2>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {t.home.news2Desc}
            </p>
          </div>
          <span className="text-sm font-medium text-red-700 dark:text-red-400">
            {t.home.news2Link}
          </span>
        </a>
        <a
          href="/sbar"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-blue-900/50 dark:from-blue-950/30 dark:to-neutral-800"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📋</span>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {t.home.sbarTitle}
              </h2>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {t.home.sbarDesc}
            </p>
          </div>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
            {t.home.sbarLink}
          </span>
        </a>
        <a
          href="/labb"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-purple-900/50 dark:from-purple-950/30 dark:to-neutral-800"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🔬</span>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {t.home.labbTitle}
              </h2>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {t.home.labbDesc}
            </p>
          </div>
          <span className="text-sm font-medium text-purple-700 dark:text-purple-400">
            {t.home.labbLink}
          </span>
        </a>

        <a
          href="/notes"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {t.home.notesTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{t.home.notesDesc}</p>
          </div>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {t.home.notesLink}
          </span>
        </a>
        <a
          href="/knowledge"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {t.home.knowledgeTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {t.home.knowledgeDesc}
            </p>
          </div>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {t.home.knowledgeLink}
          </span>
        </a>
      </section>

      {/* FAQ Section */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          {t.home.faqTitle}
        </h2>
        <div className="flex flex-col gap-2">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-neutral-200 bg-white overflow-hidden dark:border-neutral-700 dark:bg-neutral-800"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {item.q}
                </span>
                <svg
                  className={`w-5 h-5 text-neutral-500 transition-transform ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === index && (
                <div className="px-5 pb-4 text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="/boris/jobb"
          className="inline-flex items-center rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          {t.home.borisCta}
        </a>
      </div>
    </div>
  );
}
