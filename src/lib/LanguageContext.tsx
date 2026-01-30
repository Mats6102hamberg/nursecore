"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language, type Translations } from "./translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "nursecore_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "sv") {
      setLanguageState(stored);
    }
    setMounted(true);
  }, []);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  const t = translations[language];

  // Avoid hydration mismatch by rendering children only after mount
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "en", setLanguage, t: translations.en }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
