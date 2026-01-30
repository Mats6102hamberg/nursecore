"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { useAuth } from "../../lib/AuthContext";

type Note = {
  id: string;
  content: string;
  createdAt: string;
};

const STORAGE_KEY = "nursecore_notes_guest";

export default function NotesPage() {
  const { t, language } = useLanguage();
  const { user, userData, addNote: addAuthNote, deleteNote: deleteAuthNote } = useAuth();
  const [guestNotes, setGuestNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  // Load guest notes from localStorage (for non-logged in users)
  useEffect(() => {
    if (!user) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setGuestNotes(parsed);
          }
        } catch {
          // Ignore invalid data
        }
      }
    }
  }, [user]);

  // Save guest notes to localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(guestNotes));
    }
  }, [guestNotes, user]);

  // Get notes based on login status
  const notes = user ? (userData?.notes || []) : guestNotes;

  function handleAddNote(event: React.FormEvent) {
    event.preventDefault();
    if (!newNote.trim()) return;

    if (user) {
      addAuthNote(newNote.trim());
    } else {
      const note: Note = {
        id: crypto.randomUUID(),
        content: newNote.trim(),
        createdAt: new Date().toISOString(),
      };
      setGuestNotes((prev) => [note, ...prev]);
    }
    setNewNote("");
  }

  function handleDeleteNote(id: string) {
    if (user) {
      deleteAuthNote(id);
    } else {
      setGuestNotes((prev) => prev.filter((note) => note.id !== id));
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(language === "sv" ? "sv-SE" : "en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const texts = {
    sv: {
      loginPrompt: "Logga in för att spara anteckningar permanent",
      loginLink: "Logga in →",
      guestMode: "Gästläge – anteckningar sparas endast i denna webbläsare",
      loggedInAs: "Inloggad som",
    },
    en: {
      loginPrompt: "Log in to save notes permanently",
      loginLink: "Log in →",
      guestMode: "Guest mode – notes are only saved in this browser",
      loggedInAs: "Logged in as",
    },
  };

  const localT = texts[language];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          {t.notes.title}
        </h1>
        {user ? (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            ✓ {localT.loggedInAs} {user.name}
          </p>
        ) : (
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {localT.guestMode}
          </p>
        )}
      </div>

      {/* Login prompt for guests */}
      {!user && (
        <div className="rounded-xl bg-blue-50 p-4 flex items-center justify-between dark:bg-blue-900/30">
          <p className="text-sm text-blue-800 dark:text-blue-200">{localT.loginPrompt}</p>
          <a
            href="/profil"
            className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          >
            {localT.loginLink}
          </a>
        </div>
      )}

      <form onSubmit={handleAddNote} className="flex flex-col gap-3 sm:flex-row">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder={t.notes.newNotePlaceholder}
          rows={2}
          className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />
        <button
          type="submit"
          disabled={!newNote.trim()}
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 sm:self-end"
        >
          {t.notes.addNote}
        </button>
      </form>

      {notes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center dark:border-neutral-700 dark:bg-neutral-800/50">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.notes.noNotes}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="whitespace-pre-wrap text-sm text-neutral-700 dark:text-neutral-300">
                  {note.content}
                </p>
                <button
                  type="button"
                  onClick={() => handleDeleteNote(note.id)}
                  className="shrink-0 text-xs text-neutral-400 hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400"
                >
                  {t.notes.delete}
                </button>
              </div>
              <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
                {formatDate(note.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
