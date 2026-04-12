import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;

  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
};

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, setTheme, toggleTheme };
}
