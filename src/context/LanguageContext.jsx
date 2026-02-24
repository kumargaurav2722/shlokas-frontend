import { createContext, useEffect, useMemo, useState } from "react";
import { LANG_OPTIONS, getTranslation } from "../i18n/translations";
import { getBrowserLanguage, getPathLanguage, normalizeLanguage, SUPPORTED_LANGS } from "../utils/lang";

const STORAGE_KEY = "preferred_language";

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const getStoredLanguage = () => {
    if (typeof window === "undefined") return "en";
    const pathLang = getPathLanguage(window.location.pathname);
    if (pathLang) return pathLang;
    const stored = localStorage.getItem(STORAGE_KEY);
    const isSupported = LANG_OPTIONS.some((opt) => opt.value === stored);
    return isSupported ? stored : "en";
  };

  const [language, setLanguage] = useState(getStoredLanguage);
  const [pathOverride, setPathOverride] = useState(false);

  const updateLanguage = (next) => {
    const normalized = normalizeLanguage(next) || "en";
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, normalized);
    }
    setLanguage(normalized);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pathLang = getPathLanguage(window.location.pathname);
    if (pathLang) {
      setPathOverride(true);
      if (pathLang !== language) setLanguage(pathLang);
      return;
    }
    setPathOverride(false);
    const stored = localStorage.getItem(STORAGE_KEY);
    const isSupported = LANG_OPTIONS.some((opt) => opt.value === stored);
    if (stored && isSupported && stored !== language) {
      setLanguage(stored);
      return;
    }
    const browserLang = getBrowserLanguage();
    if (browserLang && browserLang !== language) {
      setLanguage(browserLang);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pathLang = getPathLanguage(window.location.pathname);
    if (pathLang && pathLang !== language && SUPPORTED_LANGS.includes(pathLang)) {
      setPathOverride(true);
      setLanguage(pathLang);
    } else if (!pathLang) {
      setPathOverride(false);
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: updateLanguage,
      t: (key) => getTranslation(language, key),
      options: LANG_OPTIONS,
      pathOverride
    }),
    [language, pathOverride]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
