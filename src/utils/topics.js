export const TOPICS = [
  "karma",
  "bhakti",
  "meditation",
  "fear",
  "anxiety",
  "anger",
  "detachment",
  "success",
  "failure",
  "death",
  "self-realization",
  "devotion"
];

export const TOPIC_VERSE_MAP = {
  karma: ["2-47", "3-19", "18-46"],
  bhakti: ["9-22", "12-6", "12-20"],
  meditation: ["6-5", "6-10", "6-26"],
  fear: ["4-10", "2-56", "18-30"],
  anxiety: ["2-14", "2-48", "6-32"],
  anger: ["2-63", "16-21", "5-26"],
  detachment: ["2-47", "5-10", "12-19"],
  success: ["2-50", "3-8", "18-45"],
  failure: ["2-47", "6-5", "18-66"],
  death: ["2-20", "2-27", "8-6"],
  "self-realization": ["2-20", "6-29", "13-22"],
  devotion: ["9-26", "12-13", "18-66"]
};

export const findTopicsForVerse = (chapter, verse) => {
  const key = `${chapter}-${verse}`;
  return TOPICS.filter((topic) =>
    (TOPIC_VERSE_MAP[topic] || []).includes(key)
  );
};
