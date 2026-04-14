import { api } from "./api";
import { apiCache, CACHE_KEYS, CACHE_TTL, cacheUtils } from "../utils/cache";

export const searchTexts = async ({ q, type }) => {
  const cacheKey = cacheUtils.generateKey(CACHE_KEYS.SEARCH, { q, type });

  // Use shorter TTL for search results as they can change frequently
  return apiCache.cachedCall(cacheKey, async () => {
    const res = await api.get("/search", {
      params: { query: q, ...(type ? { type } : {}) }
    });
    return res.data?.results || [];
  }, CACHE_TTL.SHORT);
};

// Cache management for search
export const clearSearchCache = () => {
  apiCache.invalidate(CACHE_KEYS.SEARCH);
};

export const searchWithCache = async ({ q, type }, forceRefresh = false) => {
  const cacheKey = cacheUtils.generateKey(CACHE_KEYS.SEARCH, { q, type });

  if (forceRefresh) {
    apiCache.invalidate(cacheKey);
  }

  return apiCache.cachedCall(cacheKey, async () => {
    const res = await api.get("/search", {
      params: { query: q, ...(type ? { type } : {}) }
    });
    return res.data?.results || [];
  }, CACHE_TTL.SHORT);
};
