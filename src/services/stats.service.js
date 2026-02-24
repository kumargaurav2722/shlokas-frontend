import { api } from "./api";

export const getTrending = (limit = 5) =>
  api.get("/stats/trending", { params: { limit } });
