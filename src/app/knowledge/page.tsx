"use client";

import { useLanguage } from "../../lib/LanguageContext";

export default function KnowledgePage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t.knowledge.title}</h1>
      <ul>
        <li>{t.knowledge.ibdOverview}</li>
        <li>{t.knowledge.liverNotes}</li>
        <li>{t.knowledge.icuChecklist}</li>
      </ul>
    </div>
  );
}
