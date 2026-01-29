"use client";

import { useEffect, useState } from "react";

type Mode = "medicine" | "icu";

export default function BorisPage() {
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
    <div>
      <h1>Boris AI</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Mode</legend>
          <label>
            <input
              type="radio"
              name="mode"
              value="medicine"
              checked={mode === "medicine"}
              onChange={() => setMode("medicine")}
            />
            Medicine
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="icu"
              checked={mode === "icu"}
              onChange={() => setMode("icu")}
            />
            ICU
          </label>
        </fieldset>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />
        </div>
        <p>
          Educational support only. No patient-specific data, dosing, or medical
          decisions. Always refer to local PM and the responsible physician.
        </p>
        <button type="submit" disabled={loading}>
          {loading ? "Asking..." : "Ask Boris"}
        </button>
      </form>

      {error ? <p>{error}</p> : null}
      {reply ? <pre>{reply}</pre> : null}
    </div>
  );
}
