"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import tools from "../../data/tools.json";

type Tool = {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  content: string;
};

// Knowledge content for search
const KNOWLEDGE_ITEMS = [
  { id: "ibd", title: "IBD", category: "knowledge", keywords: "ibd crohn ulcerös kolit inflammatorisk tarmsjukdom" },
  { id: "liver", title: "Lever", category: "knowledge", keywords: "lever cirros hepatit encefalopati ascites" },
  { id: "icu", title: "IVA", category: "knowledge", keywords: "iva intensivvård abcde ventilator sepsis" },
];

export default function SearchPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return { tools: [], knowledge: [] };

    const q = query.toLowerCase();

    const matchedTools = (tools as Tool[]).filter(
      (tool) =>
        tool.title.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.content.toLowerCase().includes(q)
    );

    const matchedKnowledge = KNOWLEDGE_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );

    return { tools: matchedTools, knowledge: matchedKnowledge };
  }, [query]);

  const hasResults = results.tools.length > 0 || results.knowledge.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          {t.search.title}
        </h1>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search.placeholder}
          autoFocus
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pl-10 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-600"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      {query.trim() && !hasResults && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t.search.noResults}
        </p>
      )}

      {results.tools.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            {t.search.tools} ({results.tools.length})
          </h2>
          <div className="flex flex-col gap-2">
            {results.tools.map((tool) => (
              <a
                key={tool.id}
                href={`/tools#${tool.id}`}
                className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                      {tool.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                      {tool.shortDescription}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs text-neutral-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-400">
                    {tool.category}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {results.knowledge.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            {t.search.knowledge} ({results.knowledge.length})
          </h2>
          <div className="flex flex-col gap-2">
            {results.knowledge.map((item) => (
              <a
                key={item.id}
                href={`/knowledge?tab=${item.id}`}
                className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800"
              >
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  {item.title}
                </h3>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
