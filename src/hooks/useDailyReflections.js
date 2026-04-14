import { useEffect, useState, useCallback } from "react";
import { getDailyReflections, clearReflectionsCache } from "../services/dailyReflections.service";

/**
 * Hook for managing dynamic daily reflections
 * Fetches and caches reflection data
 */
export default function useDailyReflections(options = {}) {
  const {
    count = 5,
    method = "random", // 'daily', 'random', 'related'
    chapter = null,
    verse = null,
    language = null,
    autoFetch = true
  } = options;

  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reflections
  const fetchReflections = useCallback(
    async (forceRefresh = false) => {
      setLoading(true);
      setError(null);

      try {
        const data = await getDailyReflections({
          count,
          method,
          chapter,
          verse,
          language,
          forceRefresh
        });

        setReflections(data || []);
      } catch (err) {
        setError(err?.message || "Failed to fetch reflections");
        setReflections([]);
      } finally {
        setLoading(false);
      }
    },
    [count, method, chapter, verse, language]
  );

  // Auto-fetch on mount or when dependencies change
  useEffect(() => {
    if (autoFetch) {
      fetchReflections();
    }
  }, [autoFetch, fetchReflections]);

  // Refresh reflections
  const refresh = useCallback(() => {
    fetchReflections(true);
  }, [fetchReflections]);

  // Clear cache and refetch
  const clearCache = useCallback(() => {
    clearReflectionsCache();
    fetchReflections(true);
  }, [fetchReflections]);

  return {
    reflections,
    loading,
    error,
    refresh,
    clearCache,
    isReady: !loading && reflections.length > 0
  };
}