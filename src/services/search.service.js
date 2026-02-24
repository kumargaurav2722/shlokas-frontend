import { api } from "./api";

export const searchTexts = async ({ q, type }) => {
  const res = await api.get("/search", {
    params: { query: q, ...(type ? { type } : {}) }
  });
  return res.data?.results || [];
};
