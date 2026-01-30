"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "../../../lib/LanguageContext";

type Mode = "medicine" | "icu";

type Message = {
  role: "user" | "boris";
  content: string;
};


export default function BorisStudiePage() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>("medicine");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = "nursecore_boris_prefill";
    const modeKey = "nursecore_boris_prefill_mode";
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (stored) {
      setInput(stored);
      localStorage.removeItem(key);
    }
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem(modeKey) : null;
    if (storedMode === "medicine" || storedMode === "icu") {
      setMode(storedMode);
      localStorage.removeItem(modeKey);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/boris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, mode, history: messages }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "boris", content: data?.error ?? "Request failed." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "boris", content: data?.reply ?? "No response." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "boris", content: "Request failed." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          {t.boris.studyTitle}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{t.boris.disclaimerStudy}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <fieldset className="flex gap-4">
          <legend className="sr-only">{t.boris.mode}</legend>
          <label className="inline-flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
            <input
              type="radio"
              name="mode"
              value="medicine"
              checked={mode === "medicine"}
              onChange={() => setMode("medicine")}
              className="h-4 w-4 border-neutral-300 text-neutral-900 dark:border-neutral-600"
            />
            {t.boris.medicine}
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
            <input
              type="radio"
              name="mode"
              value="icu"
              checked={mode === "icu"}
              onChange={() => setMode("icu")}
              className="h-4 w-4 border-neutral-300 text-neutral-900 dark:border-neutral-600"
            />
            {t.boris.icu}
          </label>
        </fieldset>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={clearChat}
            className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            {t.boris.clearChat}
          </button>
        )}
      </div>

      {messages.length === 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t.boris.quickSuggestions}
          </p>
          <div className="flex flex-wrap gap-2">
            {(mode === "medicine"
              ? [t.boris.qMed1, t.boris.qMed2, t.boris.qMed3, t.boris.qMed4]
              : [t.boris.qIcu1, t.boris.qIcu2, t.boris.qIcu3, t.boris.qIcu4]
            ).map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => setInput(question)}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1 ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {msg.role === "user" ? t.boris.you : "Boris"}
              </span>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "bg-white text-neutral-700 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700"
                }`}
              >
                {msg.role === "boris" ? (
                  <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-headings:mt-3 prose-headings:mb-2 prose-a:text-blue-600 dark:prose-a:text-blue-400">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex flex-col gap-1 items-start">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Boris</span>
              <div className="bg-white text-neutral-700 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700 rounded-2xl px-4 py-3 text-sm">
                {t.boris.thinking}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          required
          rows={2}
          placeholder={t.boris.placeholder}
          className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 sm:self-end dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          {t.boris.askBoris}
        </button>
      </form>
    </div>
  );
}
