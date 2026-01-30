"use client";

import { useLanguage } from "../../lib/LanguageContext";

export default function NotesPage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t.notes.title}</h1>
      <p>{t.notes.placeholder}</p>
    </div>
  );
}
