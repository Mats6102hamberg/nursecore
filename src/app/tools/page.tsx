"use client";

import { useEffect, useState } from "react";
import tools from "../../data/tools.json";
import { useLanguage } from "../../lib/LanguageContext";

type Tool = {
  id: string;
  title: string;
  category: "medicine" | "icu";
  shortDescription: string;
  content: string;
};

const PREFILL_KEY = "nursecore_boris_prefill";
const PREFILL_MODE_KEY = "nursecore_boris_prefill_mode";
const RECENTS_KEY = "nursecore_recent_tools";

function groupByCategory(items: Tool[]) {
  const grouped = new Map<Tool["category"], Tool[]>();
  for (const tool of items) {
    const existing = grouped.get(tool.category) ?? [];
    existing.push(tool);
    grouped.set(tool.category, existing);
  }
  return Array.from(grouped.entries());
}

export default function ToolsPage() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [recentTools, setRecentTools] = useState<string[]>([]);
  const groupedTools = groupByCategory(tools as Tool[]);

  const CATEGORY_LABELS: Record<Tool["category"], string> = {
    medicine: t.tools.categoryMedicine,
    icu: t.tools.categoryIcu,
  };

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("nursecore_favorites")
        : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed.filter((id) => typeof id === "string"));
        }
      } catch {
        // Ignore invalid stored data.
      }
    }
  }, []);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(RECENTS_KEY) : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setRecentTools(parsed.filter((id) => typeof id === "string"));
        }
      } catch {
        // Ignore invalid stored data.
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(RECENTS_KEY, JSON.stringify(recentTools));
  }, [recentTools]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("nursecore_favorites", JSON.stringify(favorites));
  }, [favorites]);

  function markRecentlyUsed(id: string) {
    setRecentTools((current) => {
      const next = [id, ...current.filter((item) => item !== id)];
      return next.slice(0, 5);
    });
  }

  function toggleTool(id: string) {
    setExpanded((current) => {
      const next = !current[id];
      if (next) {
        markRecentlyUsed(id);
      }
      return { ...current, [id]: next };
    });
  }

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function isFavorite(id: string) {
    return favorites.includes(id);
  }

  function handleCopy(content: string) {
    if (!navigator?.clipboard) return;
    void navigator.clipboard.writeText(content);
  }

  function handleSendToBorisWithId(
    content: string,
    mode: Tool["category"],
    id: string,
  ) {
    localStorage.setItem(PREFILL_KEY, content);
    localStorage.setItem(PREFILL_MODE_KEY, mode);
    markRecentlyUsed(id);
    window.location.href = "/boris";
  }

  function openToolFromRecents(id: string) {
    setFavoritesOnly(false);
    setExpanded((current) => ({ ...current, [id]: true }));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
          {t.tools.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 sm:text-base">
          {t.tools.description}
        </p>
      </div>

      <div className="sticky top-0 z-10 rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700">
            <input
              type="checkbox"
              checked={favoritesOnly}
              onChange={(event) => setFavoritesOnly(event.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-neutral-900"
            />
            {t.tools.showFavoritesOnly}
          </label>
          <div className="text-sm text-neutral-500">
            {t.tools.favorites}: {favorites.length} / {t.tools.total}:{" "}
            {tools.length}
          </div>
        </div>
        {favoritesOnly && favorites.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-600">{t.tools.noFavorites}</p>
        ) : null}
        <section className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
          <h2 className="text-sm font-semibold text-neutral-700">
            {t.tools.recentlyUsed}
          </h2>
          {recentTools.length === 0 ? (
            <p className="mt-2 text-sm text-neutral-600">{t.tools.noRecent}</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {recentTools.map((id) => {
                const tool = (tools as Tool[]).find((item) => item.id === id);
                if (!tool) return null;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => openToolFromRecents(id)}
                      className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 py-2 text-left text-sm text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
                    >
                      <span className="font-medium">{tool.title}</span>
                      <span className="ml-3 rounded-full border border-neutral-200 px-2 py-0.5 text-xs text-neutral-500">
                        {CATEGORY_LABELS[tool.category]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {groupedTools.map(([category, items]) => (
        <section key={category} className="space-y-3">
          <div className="flex items-center gap-3 border-b border-neutral-200 pb-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              {CATEGORY_LABELS[category]}
            </h2>
            <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-neutral-500">
              {category}
            </span>
          </div>
          <div className="space-y-4">
            {items
              .filter((tool) => (favoritesOnly ? isFavorite(tool.id) : true))
              .sort((a, b) => {
                const aFav = isFavorite(a.id) ? 1 : 0;
                const bFav = isFavorite(b.id) ? 1 : 0;
                if (aFav === bFav) return 0;
                return bFav - aFav;
              })
              .map((tool) => {
                const isOpen = Boolean(expanded[tool.id]);
                return (
                  <div
                    key={tool.id}
                    onClick={() => toggleTool(tool.id)}
                    className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <strong className="text-base font-semibold text-neutral-900">
                          {tool.title}
                        </strong>
                        <div className="mt-1 text-sm text-neutral-600">
                          {tool.shortDescription}
                        </div>
                      </div>
                      <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs text-neutral-500">
                        {CATEGORY_LABELS[tool.category]}
                      </span>
                    </div>
                    {isOpen ? (
                      <p className="mt-3 text-sm text-neutral-700">
                        {tool.content}
                      </p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavorite(tool.id);
                        }}
                        aria-pressed={isFavorite(tool.id)}
                        className="min-h-[44px] rounded-full border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
                      >
                        {isFavorite(tool.id) ? "★" : "☆"}
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleCopy(tool.content);
                          setCopied((current) => ({
                            ...current,
                            [tool.id]: true,
                          }));
                          window.setTimeout(() => {
                            setCopied((current) => ({
                              ...current,
                              [tool.id]: false,
                            }));
                          }, 1500);
                        }}
                        className="min-h-[44px] rounded-full border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
                      >
                        {copied[tool.id] ? t.tools.copied : t.tools.copy}
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleSendToBorisWithId(
                            tool.content,
                            tool.category,
                            tool.id,
                          );
                        }}
                        className="min-h-[44px] rounded-full bg-neutral-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800"
                      >
                        {t.tools.sendToBoris}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
