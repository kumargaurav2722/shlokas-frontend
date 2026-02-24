import { api } from "./api";

export const getMe = () => api.get("/users/me");

export const updateMe = (payload) => api.put("/users/me", payload);
