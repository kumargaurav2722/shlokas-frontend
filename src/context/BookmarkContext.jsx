import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "../hooks/useAuth";
import { addBookmark, getBookmarks, removeBookmark } from "../services/bookmark.service";

export const BookmarkContext = createContext(null);

export function BookmarkProvider({ children }) {
  const { token } = useAuth() || {};
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBookmarks = useCallback(async () => {
    if (!token) {
      setBookmarks([]);
      return;
    }
    setLoading(true);
    try {
      const res = await getBookmarks();
      setBookmarks(res.data || []);
    } catch {
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const isBookmarked = useCallback(
    (itemId) => bookmarks.some((b) => b.itemId === itemId),
    [bookmarks]
  );

  const toggleBookmark = useCallback(async (payload) => {
    const exists = isBookmarked(payload.itemId);
    if (exists) {
      setBookmarks((prev) =>
        prev.filter((b) => !(b.itemId === payload.itemId && b.type === payload.type))
      );
      try {
        await removeBookmark(payload.type, payload.itemId);
      } catch {
        await loadBookmarks();
      }
    } else {
      const optimistic = {
        id: `optimistic-${payload.itemId}`,
        ...payload,
        createdAt: new Date().toISOString()
      };
      setBookmarks((prev) => [optimistic, ...prev]);
      try {
        await addBookmark(payload);
        await loadBookmarks();
      } catch {
        await loadBookmarks();
      }
    }
  }, [isBookmarked, loadBookmarks]);

  const value = useMemo(
    () => ({ bookmarks, loading, refresh: loadBookmarks, isBookmarked, toggleBookmark }),
    [bookmarks, loading, loadBookmarks, isBookmarked, toggleBookmark]
  );

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}
