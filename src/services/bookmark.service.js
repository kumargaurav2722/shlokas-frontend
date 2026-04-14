import { api } from "./api";
import { apiCache, CACHE_KEYS, CACHE_TTL } from "../utils/cache";

export const getBookmarks = () => {
  return apiCache.cachedCall(CACHE_KEYS.BOOKMARKS, () =>
    api.get("/bookmarks")
  , CACHE_TTL.MEDIUM);
};

export const addBookmark = async (payload) => {
  const result = await api.post("/bookmarks", payload);
  // Invalidate bookmarks cache after adding
  apiCache.invalidate(CACHE_KEYS.BOOKMARKS);
  return result;
};

export const removeBookmark = async (type, itemId) => {
  const result = await api.delete("/bookmarks", { params: { type, itemId } });
  // Invalidate bookmarks cache after removing
  apiCache.invalidate(CACHE_KEYS.BOOKMARKS);
  return result;
};

// Cache management for bookmarks
export const clearBookmarksCache = () => {
  apiCache.invalidate(CACHE_KEYS.BOOKMARKS);
};

export const refreshBookmarks = async () => {
  apiCache.invalidate(CACHE_KEYS.BOOKMARKS);
  return getBookmarks();
};
