"use client";

import { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "../../../lib/LanguageContext";

type Message = {
  role: "user" | "boris";
  content: string;
  image?: string; // Base64 image for display
};

type Shift = "day" | "evening" | "night" | null;

export default function BorisJobbPage() {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [shift, setShift] = useState<Shift>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleImageSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      alert("Bilden är för stor. Max 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if ((!input.trim() && !selectedImage) || loading) return;

    const userMessage = input.trim();
    const imageToSend = selectedImage;

    setInput("");
    clearImage();

    setMessages((prev) => [...prev, {
      role: "user",
      content: userMessage || "📷 Bild skickad",
      image: imageToSend || undefined
    }]);
    setLoading(true);

    try {
      const response = await fetch("/api/boris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          mode: "work",
          history: messages,
          shift,
          image: imageToSend
        }),
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

  const shiftOptions: { value: Shift; label: string }[] = [
    { value: null, label: t.boris.shiftNone },
    { value: "day", label: t.boris.shiftDay },
    { value: "evening", label: t.boris.shiftEvening },
    { value: "night", label: t.boris.shiftNight },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          {t.boris.workTitle}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{t.boris.disclaimerWork}</p>
      </div>

      {/* Shift selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">{t.boris.shift}:</span>
          <div className="flex gap-1">
            {shiftOptions.map((option) => (
              <button
                key={option.value ?? "none"}
                type="button"
                onClick={() => setShift(option.value)}
                className={`rounded-full px-3 py-1 text-sm transition ${
                  shift === option.value
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
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
            {t.boris.quickQuestionsWork}
          </p>
          <div className="flex flex-wrap gap-2">
            {[t.boris.qWork1, t.boris.qWork2, t.boris.qWork3, t.boris.qWork4, t.boris.qWork5].map((question) => (
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
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Uppladdad bild"
                    className="max-w-full max-h-48 rounded-lg mb-2"
                  />
                )}
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

      {/* Image preview */}
      {imagePreview && (
        <div className="flex items-start gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/50">
          <img
            src={imagePreview}
            alt="Förhandsvisning"
            className="max-h-24 rounded-lg"
          />
          <div className="flex-1">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Bild vald</p>
            <button
              type="button"
              onClick={clearImage}
              className="text-sm text-red-600 hover:text-red-700 dark:text-red-400"
            >
              Ta bort
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-2">
          {/* Image upload button */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            ref={fileInputRef}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-neutral-200 bg-white text-neutral-500 cursor-pointer transition hover:border-neutral-300 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200 shrink-0"
            title="Ladda upp bild"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </label>

          {/* Text input */}
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={2}
            placeholder={selectedImage ? "Beskriv vad du vill veta om bilden..." : t.boris.placeholder}
            className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || (!input.trim() && !selectedImage)}
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 sm:self-end"
        >
          {selectedImage ? "📷 Skicka med bild" : t.boris.askBoris}
        </button>
      </form>
    </div>
  );
}
