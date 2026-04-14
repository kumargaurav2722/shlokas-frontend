import { useCallback } from "react";
import { apiCache, CACHE_KEYS } from "../utils/cache";
import { clearBookmarksCache } from "../services/bookmark.service";
import { clearSearchCache } from "../services/search.service";
import { clearVerseOfDayCache } from "../services/verseOfDay.service";
import { invalidateScriptureCache } from "../services/scripture.service";

/**
 * Hook for managing application cache
 * Provides utilities for cache invalidation, clearing, and statistics
 */
export default function useCache() {
  // Clear all application caches
  const clearAllCaches = useCallback(() => {
    apiCache.clear();
  }, []);

  // Clear specific cache types
  const clearBookmarks = useCallback(() => {
    clearBookmarksCache();
  }, []);

  const clearSearch = useCallback(() => {
    clearSearchCache();
  }, []);

  const clearVerseOfDay = useCallback(() => {
    clearVerseOfDayCache();
  }, []);

  const clearScriptures = useCallback(() => {
    invalidateScriptureCache();
  }, []);

  // Get cache statistics
  const getCacheStats = useCallback(() => {
    return apiCache.getStats();
  }, []);

  // Invalidate specific cache entries
  const invalidateCache = useCallback((key) => {
    apiCache.invalidate(key);
  }, []);

  // Force refresh data (invalidate and refetch)
  const forceRefresh = useCallback(async (service, ...args) => {
    // This would need to be implemented per service
    // For now, just invalidate relevant caches
    switch (service) {
      case 'bookmarks':
        clearBookmarks();
        break;
      case 'search':
        clearSearch();
        break;
      case 'verseOfDay':
        clearVerseOfDay();
        break;
      case 'scriptures':
        clearScriptures();
        break;
      default:
        break;
    }
  }, [clearBookmarks, clearSearch, clearVerseOfDay, clearScriptures]);

  return {
    clearAllCaches,
    clearBookmarks,
    clearSearch,
    clearVerseOfDay,
    clearScriptures,
    getCacheStats,
    invalidateCache,
    forceRefresh,
  };
}