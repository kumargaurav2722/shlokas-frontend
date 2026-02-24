import { api } from "./api";

export const getBookmarks = () => api.get("/bookmarks");

export const addBookmark = (payload) => api.post("/bookmarks", payload);

export const removeBookmark = (type, itemId) =>
  api.delete("/bookmarks", { params: { type, itemId } });
