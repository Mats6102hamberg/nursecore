"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";

type Note = {
  id: string;
  content: string;
  createdAt: number;
};

const STORAGE_KEY = "nursecore_notes";

export default function NotesPage() {
  const { t } = useLanguage();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setNotes(parsed);
        }
      } catch {
        // Ignore invalid data
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function addNote(event: React.FormEvent) {
    event.preventDefault();
    if (!newNote.trim()) return;

    const note: Note = {
      id: crypto.randomUUID(),
      content: newNote.trim(),
      createdAt: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
    setNewNote("");
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function formatDate(timestamp: number) {
    return new Date(timestamp).toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
          {t.notes.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-500">{t.notes.saved}</p>
      </div>

      <form onSubmit={addNote} className="flex flex-col gap-3 sm:flex-row">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder={t.notes.newNotePlaceholder}
          rows={2}
          className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
        />
        <button
          type="submit"
          disabled={!newNote.trim()}
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 sm:self-end"
        >
          {t.notes.addNote}
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="text-sm text-neutral-500">{t.notes.noNotes}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="whitespace-pre-wrap text-sm text-neutral-700">
                  {note.content}
                </p>
                <button
                  type="button"
                  onClick={() => deleteNote(note.id)}
                  className="shrink-0 text-xs text-neutral-400 hover:text-red-500"
                >
                  {t.notes.delete}
                </button>
              </div>
              <p className="mt-2 text-xs text-neutral-400">
                {formatDate(note.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
