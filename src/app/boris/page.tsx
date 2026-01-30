"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";

type Mode = "medicine" | "icu";

export default function BorisPage() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<Mode>("medicine");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const key = "nursecore_boris_prefill";
    const modeKey = "nursecore_boris_prefill_mode";
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (stored) {
      setMessage(stored);
      localStorage.removeItem(key);
    }
    const storedMode =
      typeof window !== "undefined" ? localStorage.getItem(modeKey) : null;
    if (storedMode === "medicine" || storedMode === "icu") {
      setMode(storedMode);
      localStorage.removeItem(modeKey);
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setReply("");
    setLoading(true);
    try {
      const response = await fetch("/api/boris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, mode }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error ?? "Request failed.");
      } else {
        setReply(data?.reply ?? "");
      }
    } catch {
      setError("Request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
          {t.boris.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-600">{t.boris.disclaimer}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-neutral-700">
            {t.boris.mode}
          </legend>
          <div className="flex gap-4">
            <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="radio"
                name="mode"
                value="medicine"
                checked={mode === "medicine"}
                onChange={() => setMode("medicine")}
                className="h-4 w-4 border-neutral-300 text-neutral-900"
              />
              {t.boris.medicine}
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="radio"
                name="mode"
                value="icu"
                checked={mode === "icu"}
                onChange={() => setMode("icu")}
                className="h-4 w-4 border-neutral-300 text-neutral-900"
              />
              {t.boris.icu}
            </label>
          </div>
        </fieldset>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-neutral-700"
          >
            {t.boris.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            placeholder={t.boris.placeholder}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-start"
        >
          {loading ? t.boris.asking : t.boris.askBoris}
        </button>
      </form>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {reply ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-neutral-700">
            {t.boris.borisReplies}
          </h2>
          <div className="whitespace-pre-wrap text-sm text-neutral-700">
            {reply}
          </div>
        </div>
      ) : null}
    </div>
  );
}
