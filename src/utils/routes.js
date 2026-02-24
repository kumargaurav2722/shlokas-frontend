import { withLangPrefix } from "./lang";

export const slugify = (text = "") =>
  text
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

const isGita = (work, subWork, category) =>
  category === "gita" ||
  (work === "Mahabharata" && subWork === "Bhagavad Gita");

const isUpanishad = (category, work) =>
  category === "upanishads" || category === "upanishad" || work === "Upanishads";

const mapCategorySlug = (category, work, subWork) => {
  if (category === "vedas" || category === "veda") return "vedas";
  if (category === "puranas" || category === "purana") return "puranas";
  if (category === "upanishads" || category === "upanishad") return "upanishads";
  if (category === "ramayana") return "ramayana";
  if (category === "mahabharata") return "mahabharata";
  if (category === "itihasa") {
    if (work === "Ramayana") return "ramayana";
    if (work === "Mahabharata" && subWork !== "Bhagavad Gita") return "mahabharata";
  }
  return category || "scriptures";
};

export const getTextRoute = ({ category, work, subWork, label, lang } = {}) => {
  if (isGita(work, subWork, category)) return withLangPrefix("/bhagavad-gita", lang);
  if (isUpanishad(category, work)) {
    const textSlug = slugify(subWork || label || work || "upanishads");
    return withLangPrefix(`/upanishads/${textSlug}`, lang);
  }
  const categorySlug = mapCategorySlug(category, work, subWork);
  const textSlug = slugify(label || subWork || work || "text");
  return withLangPrefix(`/scriptures/${categorySlug}/${textSlug}`, lang);
};

export const getChapterRoute = ({ category, work, subWork, label, chapter, lang } = {}) => {
  if (!chapter && chapter !== 0) return getTextRoute({ category, work, subWork, label, lang });
  if (isGita(work, subWork, category)) return withLangPrefix(`/bhagavad-gita/chapter-${chapter}`, lang);
  if (isUpanishad(category, work)) {
    const textSlug = slugify(subWork || label || work || "upanishads");
    return withLangPrefix(`/upanishads/${textSlug}/chapter-${chapter}`, lang);
  }
  const categorySlug = mapCategorySlug(category, work, subWork);
  const textSlug = slugify(label || subWork || work || "text");
  return withLangPrefix(`/scriptures/${categorySlug}/${textSlug}/chapter-${chapter}`, lang);
};

export const getVerseRoute = ({ category, work, subWork, label, chapter, verse, lang } = {}) => {
  if (isGita(work, subWork, category)) {
    return withLangPrefix(`/bhagavad-gita/chapter-${chapter}/verse-${verse}`, lang);
  }
  if (isUpanishad(category, work)) {
    const textSlug = slugify(subWork || label || work || "upanishads");
    return withLangPrefix(`/upanishads/${textSlug}/verse-${chapter}-${verse}`, lang);
  }
  const categorySlug = mapCategorySlug(category, work, subWork);
  const textSlug = slugify(label || subWork || work || "text");
  return withLangPrefix(`/scriptures/${categorySlug}/${textSlug}/chapter-${chapter}/verse-${verse}`, lang);
};

export const matchBySlug = (items = [], slug) =>
  items.find((item) => slugify(item) === slug);

export const matchBySlugLoose = (items = [], slug) =>
  items.find((item) => {
    const itemSlug = slugify(item);
    return slug === itemSlug || slug.endsWith(itemSlug) || slug.includes(itemSlug);
  });
