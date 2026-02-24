import { api } from "./api";

export const getHistory = () => api.get("/history");

export const addHistory = (payload) => api.post("/history", payload);
