"use client";

import { useLanguage } from "../../lib/LanguageContext";

export default function BorisPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          {t.boris.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {t.boris.disclaimerStudy}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="/boris/studie"
          className="group flex min-h-[140px] flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {t.boris.studyTitle}
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
              {t.boris.workTitle}
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {t.home.borisWorkDesc}
            </p>
          </div>
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {t.home.borisWorkLink}
          </span>
        </a>
      </div>
    </div>
  );
}
