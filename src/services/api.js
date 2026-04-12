import axios from "axios";

const DEFAULT_PUBLIC_API_BASE =
  "https://shlokas-apishlokas-backend-apishlokas.onrender.com";

const resolveBaseUrl = () => {
  if (typeof process !== "undefined" && process?.env?.NEXT_PUBLIC_API_BASE) {
    return process.env.NEXT_PUBLIC_API_BASE;
  }
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE) {
    return import.meta.env.VITE_API_BASE;
  }
  if (typeof window !== "undefined" && window.__ENV__?.VITE_API_BASE) {
    return window.__ENV__.VITE_API_BASE;
  }
  return DEFAULT_PUBLIC_API_BASE;
};

export const api = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: 60000,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
