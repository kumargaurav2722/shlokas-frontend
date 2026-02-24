import { api } from "./api";

export const logEvent = (eventType, metadata = {}) =>
  api.post("/analytics/event", { eventType, metadata });

export const getAnalyticsSummary = () => api.get("/analytics/summary");
