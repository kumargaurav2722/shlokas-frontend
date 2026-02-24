import { SUPPORTED_LANGS, stripLangPrefix, withLangPrefix } from "./lang";

const resolveEnv = (key) => {
  if (typeof process !== "undefined" && process?.env?.[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.[key]) {
    return import.meta.env[key];
  }
  if (typeof window !== "undefined" && window.__ENV__?.[key]) {
    return window.__ENV__[key];
  }
  return "";
};

export const getSiteUrl = () =>
  resolveEnv("VITE_SITE_URL") ||
  resolveEnv("NEXT_PUBLIC_SITE_URL") ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

export const getApiBase = () =>
  resolveEnv("VITE_API_BASE") ||
  resolveEnv("NEXT_PUBLIC_API_BASE") ||
  "http://127.0.0.1:8000";

export const getAudioBase = () =>
  resolveEnv("VITE_AUDIO_CDN_BASE") ||
  resolveEnv("NEXT_PUBLIC_AUDIO_CDN_BASE") ||
  getApiBase();

export const canonicalUrl = (path = "/") => `${getSiteUrl()}${path}`;

export const buildHreflangs = (path = "/") => {
  const cleanPath = stripLangPrefix(path.split("?")[0] || "/");
  const entries = SUPPORTED_LANGS.map((lang) => ({
    lang,
    href: canonicalUrl(withLangPrefix(cleanPath, lang))
  }));
  entries.push({ lang: "x-default", href: canonicalUrl(cleanPath) });
  return entries;
};

export const getShareImageUrl = ({
  textId,
  work,
  subWork,
  chapter,
  verse,
  lang,
  title
} = {}) => {
  const apiBase =
    resolveEnv("VITE_SHARE_CDN_BASE") ||
    resolveEnv("NEXT_PUBLIC_SHARE_CDN_BASE") ||
    getApiBase();
  const params = new URLSearchParams();
  if (textId) params.set("text_id", textId);
  if (!textId && work) params.set("work", work);
  if (!textId && subWork) params.set("sub_work", subWork);
  if (!textId && typeof chapter !== "undefined") params.set("chapter", chapter);
  if (!textId && typeof verse !== "undefined") params.set("verse", verse);
  if (lang) params.set("lang", lang);
  if (title) params.set("title", title);
  const query = params.toString();
  return `${apiBase}/share/verse${query ? `?${query}` : ""}`;
};

export const getAudioFileUrl = ({ textId, language }) => {
  if (!textId || !language) return "";
  const apiBase = getAudioBase();
  const params = new URLSearchParams({ language });
  return `${apiBase}/audio/${textId}/file?${params.toString()}`;
};
