import { api } from "./api";

const withBaseUrl = (value) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return `${api.defaults.baseURL}${value}`;
  return value;
};

const normalizeItem = (item) => ({
  id: item.id ?? item.slug ?? item._id ?? item.name,
  title: item.title ?? item.name ?? "Untitled",
  description: item.description ?? item.summary ?? "",
  deity: item.deity ?? item.deity_name ?? "",
  type: item.type ?? item.ritual_type ?? "",
  tags: item.tags ?? item.keywords ?? [],
  textUrl: withBaseUrl(item.text_url ?? item.textUrl ?? ""),
  pdfUrl: withBaseUrl(item.pdf_url ?? item.pdfUrl ?? "")
});

const normalizeList = (data) => {
  const list = Array.isArray(data) ? data : data?.items ?? data?.data ?? [];
  return list.map(normalizeItem);
};

export const getChalisas = async (params = {}) => {
  const payload = { ...params };
  if (params.q && !params.query) payload.query = params.q;
  const res = await api.get("/devotion/chalisas", { params: payload });
  return normalizeList(res.data);
};

export const getPujaVidhis = async (params = {}) => {
  const payload = { ...params };
  if (params.q && !params.query) payload.query = params.q;
  const res = await api.get("/devotion/puja-vidhi", { params: payload });
  return normalizeList(res.data);
};
