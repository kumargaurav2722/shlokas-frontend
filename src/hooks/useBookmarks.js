import { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";

export default function useBookmarks() {
  return useContext(BookmarkContext);
}
