export const SUPPORTED_LANGS = ["en", "hi", "bn", "mr", "te", "ta", "kn"];

export const normalizeLanguage = (lang = "") => {
  if (!lang) return "";
  const lower = lang.toLowerCase();
  const base = lower.split("-")[0];
  return SUPPORTED_LANGS.includes(base) ? base : "";
};

export const getPathLanguage = (path = "") => {
  const parts = path.split("/").filter(Boolean);
  if (!parts.length) return "";
  return SUPPORTED_LANGS.includes(parts[0]) ? parts[0] : "";
};

export const stripLangPrefix = (path = "") => {
  const parts = path.split("/").filter(Boolean);
  if (parts.length && SUPPORTED_LANGS.includes(parts[0])) {
    return `/${parts.slice(1).join("/")}` || "/";
  }
  return path || "/";
};

export const withLangPrefix = (path = "/", lang = "") => {
  if (!lang || !SUPPORTED_LANGS.includes(lang)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const stripped = stripLangPrefix(normalized);
  if (stripped === "/") return `/${lang}`;
  return `/${lang}${stripped}`;
};

export const getBrowserLanguage = () => {
  if (typeof window === "undefined") return "";
  const languages = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  for (const entry of languages) {
    const normalized = normalizeLanguage(entry);
    if (normalized) return normalized;
  }
  return "";
};
