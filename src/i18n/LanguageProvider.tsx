"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  getLocaleMeta,
  type LocaleCode,
  LOCALES,
} from "./config";
import { getDictionary, t as lookup } from "./dictionaries";
import type { Dictionary } from "./types";

type LanguageContextValue = {
  locale: LocaleCode;
  dir: "ltr" | "rtl";
  dictionary: Dictionary;
  setLocale: (code: LocaleCode) => void;
  t: (path: string) => string;
  locales: typeof LOCALES;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocaleCode(value: string): value is LocaleCode {
  return LOCALES.some((l) => l.code === value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && isLocaleCode(stored)) {
        setLocaleState(stored);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  const meta = getLocaleMeta(locale);
  const dictionary = useMemo(() => getDictionary(locale), [locale]);

  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    root.lang = locale === "prs" ? "fa-AF" : locale;
    root.dir = meta.dir;
  }, [locale, meta.dir, ready]);

  const t = useCallback((path: string) => lookup(dictionary, path), [dictionary]);

  const value = useMemo(
    () => ({
      locale,
      dir: meta.dir,
      dictionary,
      setLocale,
      t,
      locales: LOCALES,
    }),
    [locale, meta.dir, dictionary, setLocale, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within LanguageProvider");
  }
  return ctx;
}
