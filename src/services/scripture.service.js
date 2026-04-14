import { api } from "./api";
import { apiCache, CACHE_KEYS, CACHE_TTL, cacheUtils } from "../utils/cache";

export const getWorks = (category) => {
  const cacheKey = cacheUtils.generateKey(CACHE_KEYS.WORKS, { category });
  return apiCache.cachedCall(cacheKey, () =>
    api.get("/texts/works", {
      params: category ? { category } : {}
    })
  );
};

export const getSubWorks = (work, category) => {
  const cacheKey = cacheUtils.generateKey(CACHE_KEYS.SUB_WORKS, { work, category });
  return apiCache.cachedCall(cacheKey, () =>
    api.get("/texts/sub-works", {
      params: {
        work,
        ...(category ? { category } : {})
      }
    })
  );
};

export const getSubWorkStats = (work, category) => {
  const cacheKey = cacheUtils.generateKey(`${CACHE_KEYS.SUB_WORKS}_stats`, { work, category });
  return apiCache.cachedCall(cacheKey, () =>
    api.get("/texts/sub-work-stats", {
      params: {
        work,
        ...(category ? { category } : {})
      }
    })
  );
};

export const getChapters = (work, subWork) => {
  const cacheKey = cacheUtils.generateKey(CACHE_KEYS.CHAPTERS, { work, subWork });
  return apiCache.cachedCall(cacheKey, () =>
    api.get("/texts/chapters", {
      params: { work, sub_work: subWork }
    })
  );
};

export const getChapterStats = (work, subWork, category) => {
  const cacheKey = cacheUtils.generateKey(`${CACHE_KEYS.CHAPTERS}_stats`, { work, subWork, category });
  return apiCache.cachedCall(cacheKey, () =>
    api.get("/texts/chapter-stats", {
      params: {
        work,
        sub_work: subWork,
        ...(category ? { category } : {})
      }
    })
  );
};

export const getVerses = (work, subWork, chapter, languages) => {
  const cacheKey = cacheUtils.generateKey(CACHE_KEYS.VERSES, { work, subWork, chapter, languages });
  return apiCache.cachedCall(cacheKey, () =>
    api.get("/texts/verses", {
      params: {
        work,
        sub_work: subWork,
        chapter,
        ...(languages ? { languages } : {})
      }
    })
  );
};

// Cache management functions
export const invalidateScriptureCache = () => {
  // Invalidate all scripture-related cache entries
  apiCache.invalidate(CACHE_KEYS.WORKS);
  apiCache.invalidate(CACHE_KEYS.SUB_WORKS);
  apiCache.invalidate(CACHE_KEYS.CHAPTERS);
  apiCache.invalidate(CACHE_KEYS.VERSES);
};

export const refreshScriptureData = async (work, subWork, chapter) => {
  // Force refresh specific data
  if (work) {
    const worksKey = cacheUtils.generateKey(CACHE_KEYS.WORKS);
    apiCache.invalidate(worksKey);

    if (subWork) {
      const subWorksKey = cacheUtils.generateKey(CACHE_KEYS.SUB_WORKS, { work });
      apiCache.invalidate(subWorksKey);

      if (chapter) {
        const chaptersKey = cacheUtils.generateKey(CACHE_KEYS.CHAPTERS, { work, subWork });
        const versesKey = cacheUtils.generateKey(CACHE_KEYS.VERSES, { work, subWork, chapter });
        apiCache.invalidate(chaptersKey);
        apiCache.invalidate(versesKey);
      }
    }
  }
};
