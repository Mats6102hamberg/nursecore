"use client";

import { useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { KNOWLEDGE_CONTENT } from "../../data/knowledge-content";

export default function KnowledgePage() {
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<"ibd" | "liver" | "icu">("ibd");

  const content = KNOWLEDGE_CONTENT[language];

  const tabs = [
    { id: "ibd" as const, label: t.knowledge.ibd },
    { id: "liver" as const, label: t.knowledge.liver },
    { id: "icu" as const, label: t.knowledge.icu },
  ];

  function toggleSection(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function expandAll() {
    const allIds = content[activeTab].reduce(
      (acc, section) => ({ ...acc, [section.id]: true }),
      {}
    );
    setExpanded((prev) => ({ ...prev, ...allIds }));
  }

  function collapseAll() {
    const allIds = content[activeTab].reduce(
      (acc, section) => ({ ...acc, [section.id]: false }),
      {}
    );
    setExpanded((prev) => ({ ...prev, ...allIds }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          {t.knowledge.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{t.knowledge.subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-700 pb-3">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                activeTab === tab.id
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 text-sm">
          <button
            onClick={expandAll}
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            {t.knowledge.showAll}
          </button>
          <span className="text-neutral-300 dark:text-neutral-600">|</span>
          <button
            onClick={collapseAll}
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            {t.knowledge.hideAll}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {content[activeTab].map((section) => (
          <div
            key={section.id}
            className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {section.title}
              </span>
              <span className="text-neutral-400 text-xl dark:text-neutral-500">
                {expanded[section.id] ? "−" : "+"}
              </span>
            </button>
            {expanded[section.id] && (
              <div className="border-t border-neutral-100 dark:border-neutral-700 p-4 text-sm text-neutral-700 dark:text-neutral-300">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
