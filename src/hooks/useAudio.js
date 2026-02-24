import { useState } from "react";

const STORAGE_KEY = "audio_preferences";
const DEFAULT_PREFS = { rate: 1 };

export default function useAudio() {
  const [prefs, setPrefs] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(STORAGE_KEY)) ||
        DEFAULT_PREFS
      );
    } catch {
      return DEFAULT_PREFS;
    }
  });

  const updatePrefs = (next) => {
    const merged = { ...prefs, ...next };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    setPrefs(merged);
  };

  return { prefs, updatePrefs };
}
