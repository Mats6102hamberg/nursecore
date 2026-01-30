"use client";

import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { useLanguage } from "../../lib/LanguageContext";

export default function ProfilPage() {
  const { user, userData, isLoading, login, register, logout } = useAuth();
  const { language } = useLanguage();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const texts = {
    sv: {
      title: "Din profil",
      subtitle: "Logga in för att spara dina anteckningar och inställningar",
      loginTitle: "Logga in",
      registerTitle: "Skapa konto",
      name: "Namn",
      namePlaceholder: "Ditt namn",
      pin: "PIN-kod (4 siffror)",
      pinPlaceholder: "••••",
      loginBtn: "Logga in",
      registerBtn: "Skapa konto",
      switchToRegister: "Har du inget konto? Skapa ett",
      switchToLogin: "Har du redan konto? Logga in",
      errorLogin: "Fel namn eller PIN-kod",
      errorRegister: "Namnet är redan taget",
      errorPinLength: "PIN-koden måste vara minst 4 tecken",
      loggedInAs: "Inloggad som",
      memberSince: "Medlem sedan",
      logoutBtn: "Logga ut",
      stats: "Din statistik",
      notesCount: "Anteckningar",
      favoritesCount: "Favoriter",
      dataInfo: "Din data",
      dataInfoText: "All data sparas lokalt i din webbläsare. Den finns kvar även om du stänger sidan, men försvinner om du rensar webbläsardata.",
      notLoggedIn: "Inte inloggad",
      notLoggedInText: "Logga in eller skapa konto för att spara anteckningar, favoriter och Boris-historik.",
      benefits: "Fördelar med konto",
      benefit1: "Anteckningar sparas permanent",
      benefit2: "Favorit-verktyg kommer ihåg",
      benefit3: "Boris minns tidigare konversationer",
      benefit4: "Personliga inställningar",
    },
    en: {
      title: "Your Profile",
      subtitle: "Log in to save your notes and settings",
      loginTitle: "Log in",
      registerTitle: "Create account",
      name: "Name",
      namePlaceholder: "Your name",
      pin: "PIN code (4 digits)",
      pinPlaceholder: "••••",
      loginBtn: "Log in",
      registerBtn: "Create account",
      switchToRegister: "No account? Create one",
      switchToLogin: "Already have an account? Log in",
      errorLogin: "Wrong name or PIN",
      errorRegister: "Name is already taken",
      errorPinLength: "PIN must be at least 4 characters",
      loggedInAs: "Logged in as",
      memberSince: "Member since",
      logoutBtn: "Log out",
      stats: "Your statistics",
      notesCount: "Notes",
      favoritesCount: "Favorites",
      dataInfo: "Your data",
      dataInfoText: "All data is saved locally in your browser. It persists even if you close the page, but will be lost if you clear browser data.",
      notLoggedIn: "Not logged in",
      notLoggedInText: "Log in or create an account to save notes, favorites, and Boris history.",
      benefits: "Benefits of an account",
      benefit1: "Notes saved permanently",
      benefit2: "Favorite tools remembered",
      benefit3: "Boris remembers past conversations",
      benefit4: "Personal settings",
    },
  };

  const t = texts[language];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-neutral-500">Laddar...</div>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (pin.length < 4) {
      setError(t.errorPinLength);
      return;
    }

    if (isRegister) {
      const success = register(name.trim(), pin);
      if (!success) setError(t.errorRegister);
    } else {
      const success = login(name.trim(), pin);
      if (!success) setError(t.errorLogin);
    }
  }

  // Logged in view
  if (user) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
            {t.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            {t.loggedInAs} <strong>{user.name}</strong>
          </p>
        </div>

        {/* Profile card */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                {user.name}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t.memberSince} {new Date(user.createdAt).toLocaleDateString(language === "sv" ? "sv-SE" : "en-US")}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-900">
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {userData?.notes.length || 0}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.notesCount}</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-900">
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {userData?.favorites.length || 0}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.favoritesCount}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full rounded-full border border-red-200 bg-white px-6 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:bg-neutral-800 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            {t.logoutBtn}
          </button>
        </div>

        {/* Data info */}
        <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
          <p className="font-medium mb-1">{t.dataInfo}</p>
          <p>{t.dataInfoText}</p>
        </div>
      </div>
    );
  }

  // Login/Register view
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-3xl">
          {t.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {t.subtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Login form */}
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            {isRegister ? t.registerTitle : t.loginTitle}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                {t.name}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                placeholder={t.namePlaceholder}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                {t.pin}
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                placeholder={t.pinPlaceholder}
                required
                minLength={4}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              {isRegister ? t.registerBtn : t.loginBtn}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="mt-4 w-full text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            {isRegister ? t.switchToLogin : t.switchToRegister}
          </button>
        </div>

        {/* Benefits */}
        <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-800/50">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            {t.benefits}
          </h3>
          <ul className="space-y-3">
            {[t.benefit1, t.benefit2, t.benefit3, t.benefit4].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
