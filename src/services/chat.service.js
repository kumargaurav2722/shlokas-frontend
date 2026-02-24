import { api } from "./api";

export const askScripture = (question, scope = null) => {
  const params = { question };
  if (scope) params.scope = scope;
  return api.post("/chat/", null, { params });
};
