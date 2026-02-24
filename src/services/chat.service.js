import { api } from "./api";

export const askScripture = (question) =>
  api.post("/chat/", null, {
    params: { question }
  });
