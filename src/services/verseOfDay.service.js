import { api } from "./api";

export const getVerseOfDay = (lang) =>
  api.get("/verse-of-day", {
    params: lang ? { lang } : {}
  });

export const markVerseOfDaySeen = () => api.post("/verse-of-day/seen");
