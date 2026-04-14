import { api } from "./api";
import { apiCache, CACHE_KEYS, CACHE_TTL, cacheUtils } from "../utils/cache";

export const getVerseOfDay = (lang) => {
  const cacheKey = cacheUtils.generateKey(CACHE_KEYS.VERSE_OF_DAY, { lang });

  // Verse of day changes daily, so use short TTL
  return apiCache.cachedCall(cacheKey, () =>
    api.get("/verse-of-day", {
      params: lang ? { lang } : {}
    })
  , CACHE_TTL.SHORT);
};

export const markVerseOfDaySeen = () => api.post("/verse-of-day/seen");

// Cache management for verse of day
export const clearVerseOfDayCache = () => {
  apiCache.invalidate(CACHE_KEYS.VERSE_OF_DAY);
};

export const refreshVerseOfDay = async (lang) => {
  const cacheKey = cacheUtils.generateKey(CACHE_KEYS.VERSE_OF_DAY, { lang });
  apiCache.invalidate(cacheKey);

  return getVerseOfDay(lang);
};
