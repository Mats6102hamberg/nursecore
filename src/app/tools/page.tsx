"use client";

import { useEffect, useState } from "react";
import tools from "../../data/tools.json";

type Tool = {
  id: string;
  title: string;
  category: "medicine" | "icu";
  shortDescription: string;
  content: string;
};

const CATEGORY_LABELS: Record<Tool["category"], string> = {
  medicine: "Medicine",
  icu: "ICU",
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [recentTools, setRecentTools] = useState<string[]>([]);
  const groupedTools = groupByCategory(tools as Tool[]);

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
    <div style={{ padding: "16px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Tools</h1>
      <nav style={{ marginBottom: "12px" }}>
        <a href="/">Home</a> | <a href="/tools">Tools</a> |{" "}
        <a href="/knowledge">Knowledge</a> | <a href="/notes">Notes</a> |{" "}
        <a href="/boris">Boris</a>
      </nav>
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#ffffff",
          padding: "12px 0",
          borderBottom: "1px solid #e5e5e5",
          zIndex: 1,
        }}
      >
        <div>
          <label
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <input
              type="checkbox"
              checked={favoritesOnly}
              onChange={(event) => setFavoritesOnly(event.target.checked)}
            />
            Show favorites only
          </label>
        </div>
        <div style={{ marginTop: 6 }}>
          Favorites: {favorites.length} / Total: {tools.length}
        </div>
        {favoritesOnly && favorites.length === 0 ? (
          <p style={{ marginTop: 8 }}>
            No favorites yet. Star a tool to add it here.
          </p>
        ) : null}
        <section style={{ marginTop: 12 }}>
          <h2 style={{ margin: "8px 0" }}>Recently used</h2>
          {recentTools.length === 0 ? (
            <p>No recent tools yet.</p>
          ) : (
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {recentTools.map((id) => {
                const tool = (tools as Tool[]).find((item) => item.id === id);
                if (!tool) return null;
                return (
                  <li key={id} style={{ marginBottom: 6 }}>
                    <button
                      type="button"
                      onClick={() => openToolFromRecents(id)}
                      style={{
                        minHeight: 44,
                        padding: "8px 12px",
                      }}
                    >
                      {tool.title} ({CATEGORY_LABELS[tool.category]})
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {groupedTools.map(([category, items]) => (
        <section key={category} style={{ marginTop: "16px" }}>
          <h2 style={{ margin: "16px 0 8px" }}>
            {CATEGORY_LABELS[category]}
          </h2>
          <div>
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
                    style={{
                      border: "1px solid #e5e5e5",
                      borderRadius: 6,
                      padding: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <strong>{tool.title}</strong>
                    <div style={{ marginTop: 4 }}>{tool.shortDescription}</div>
                    {isOpen ? (
                      <p style={{ marginTop: 8, wordBreak: "break-word" }}>
                        {tool.content}
                      </p>
                    ) : null}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavorite(tool.id);
                        }}
                        aria-pressed={isFavorite(tool.id)}
                        style={{ minHeight: 44, padding: "8px 12px" }}
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
                        style={{ minHeight: 44, padding: "8px 12px" }}
                      >
                        {copied[tool.id] ? "Copied!" : "Copy"}
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
                        style={{ minHeight: 44, padding: "8px 12px" }}
                      >
                        Send to Boris
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
