"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "../../../lib/LanguageContext";

type Message = {
  role: "user" | "boris";
  content: string;
};

const QUICK_QUESTIONS = [
  "Patienten försämras – ABCDE?",
  "Hur skriver jag SBAR snabbt?",
  "Anhöriga är missnöjda, tips?",
  "Jag hinner inte med allt",
  "När ska jag eskalera?",
];

export default function BorisJobbPage() {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify({ message: userMessage, mode: "work", history: messages }),
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
          {t.boris.workTitle}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{t.boris.disclaimerWork}</p>
      </div>

      {messages.length > 0 && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={clearChat}
            className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            {t.boris.clearChat}
          </button>
        </div>
      )}

      {messages.length === 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Snabba frågor:
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((question) => (
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
                <div className="whitespace-pre-wrap">{msg.content}</div>
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
