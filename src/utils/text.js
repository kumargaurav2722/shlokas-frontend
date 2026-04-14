const decoder =
  typeof TextDecoder !== "undefined"
    ? new TextDecoder("utf-8")
    : null;

const MOJIBAKE_PATTERN = /(?:Ã.|Â.|â.|à.|�)/;

const SCRIPTURE_NAME_KEYS = {
  "Bhagavad Gita": "scripture.gita",
  "Mahabharata": "scripture.mahabharata",
  "Ramayana": "scripture.ramayana",
  "Vedas": "scripture.vedas",
  "Upanishads": "scripture.upanishads",
  "Puranas": "scripture.puranas",
  "Bhagavata Purana": "scripture.bhagavata"
};

const textScore = (value) => {
  const unicodeCount = Array.from(value).filter((char) => char.charCodeAt(0) > 127).length;
  const suspiciousCount = (value.match(/[ÃÂâà�]/g) || []).length;
  const indicBonus = /[\u0900-\u0D7F]/u.test(value) ? 6 : 0;
  return unicodeCount + indicBonus - suspiciousCount * 3;
};

export const normalizeUtf8Text = (value) => {
  if (typeof value !== "string" || !value) return value ?? "";

  const normalized = value.normalize("NFC");
  if (!decoder || !MOJIBAKE_PATTERN.test(normalized)) {
    return normalized;
  }

  try {
    const bytes = Uint8Array.from(normalized, (char) => char.charCodeAt(0) & 0xff);
    const repaired = decoder.decode(bytes).normalize("NFC");
    return textScore(repaired) > textScore(normalized) ? repaired : normalized;
  } catch {
    return normalized;
  }
};

export const normalizeTextRecord = (record) => {
  if (!record || typeof record !== "object") return record;

  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key,
      typeof value === "string" ? normalizeUtf8Text(value) : value
    ])
  );
};

export const getLocalizedScriptureName = (name, t) => {
  if (!name) return "";
  const key = SCRIPTURE_NAME_KEYS[name];
  return key && t ? t(key) : normalizeUtf8Text(name);
};

export const formatVerseReference = ({ work, subWork, chapter, verse, t }) => {
  const label = getLocalizedScriptureName(subWork || work, t);
  if (!label || chapter == null || verse == null) return label;
  return `${label} ${chapter}.${verse}`;
};

export const formatChapterVerse = ({ chapter, verse, t }) => {
  const chapterLabel = t?.("home.chapter_label") || "Chapter";
  const verseLabel = t?.("home.verse_label") || "Verse";
  return `${chapterLabel} ${chapter} / ${verseLabel} ${verse}`;
};
