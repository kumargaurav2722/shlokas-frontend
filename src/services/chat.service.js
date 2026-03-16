import { api } from "./api";

export const askScripture = (question, scope = null, language = "English") => {
  const params = { question, language };
  if (scope) params.scope = scope;
  return api.post("/chat/", null, { params });
};
