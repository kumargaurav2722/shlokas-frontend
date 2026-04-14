import { api } from "./api";
import { apiCache, CACHE_TTL, cacheUtils } from "../utils/cache";

/**
 * Daily Reflections Service - API-First + Random Selection
 * Fetches verses from backend API
 * Uses hardcoded data only as ultimate fallback
 * Default method: RANDOM (verses change randomly each time)
 */

// Minimal fallback reflections (only if API completely fails)
const FALLBACK_REFLECTIONS = [
  "Gita 2.47 – Karma Yoga",
  "Gita 6.5 – Self Upliftment",
  "Gita 12.15 – Bhakti",
  "Gita 3.30 – Surrender",
  "Gita 10.10 – Divine Connection",
  "Gita 15.15 – Supreme Knowledge"
];

/**
 * Get random items from array
 */
const getRandomFromArray = (array, count = 3) => {
  if (!array || array.length === 0) return [];
  
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Fetch daily reflections from API with RANDOM selection
 * PRIMARY: Fetch from backend API
 * FALLBACK: Use hardcoded fallback list randomly
 * 
 * @param {Object} options - Configuration options
 *   - count: Number of reflections (default: 3)
 *   - method: 'random' (default), 'daily', or 'related'
 *   - chapter: For 'related' method
 *   - verse: For 'related' method
 *   - language: Language preference
 *   - forceRefresh: Skip cache for random method
 * @returns {Array} Array of reflection strings
 */
export const getDailyReflections = async (options = {}) => {
  const {
    count = 3,
    method = "random", // ⭐ DEFAULT IS RANDOM
    chapter = null,
    verse = null,
    language = null,
    forceRefresh = true // Always refresh random for variety
  } = options;

  // For random method, never use cache to ensure variety
  const useCache = method !== "random";
  const cacheKey = cacheUtils.generateKey("daily_reflections", { count, method, chapter, verse });

  // Check cache ONLY for daily/related methods
  if (useCache && !forceRefresh) {
    const cached = apiCache.cache.get(cacheKey, CACHE_TTL.LONG);
    if (cached) {
      console.debug(`Using cached reflections (method=${method})`);
      return cached;
    }
  }

  try {
    // 🌐 PRIMARY: Fetch from API
    console.debug(`📡 Fetching from API: method=${method}, count=${count}`);
    
    const res = await api.get("/daily-reflections", {
      params: {
        count,
        method,
        chapter,
        verse,
        language
      }
    });

    const reflections = res.data?.reflections || res.data?.shlokas || res.data;

    if (!Array.isArray(reflections)) {
      throw new Error("Invalid API response format");
    }

    if (reflections.length === 0) {
      console.debug("✅ API returned an empty shloka list");
      return [];
    }

    console.debug(`✅ API returned ${reflections.length} reflections`);

    const result = method === "random"
      ? getRandomFromArray(reflections, count)
      : reflections.slice(0, Math.min(count, reflections.length));

    if (useCache) {
      apiCache.cache.set(cacheKey, result, CACHE_TTL.LONG);
    }

    return result;
  } catch (error) {
    console.warn(`⚠️ API request failed: ${error.message}`);
  }

  // 📦 FALLBACK: Use hardcoded fallback list only when API fails
  console.debug("🔄 Using fallback reflections because API failed");
  const fallbackResult = getRandomFromArray(FALLBACK_REFLECTIONS, count);
  
  if (useCache) {
    apiCache.cache.set(cacheKey, fallbackResult, CACHE_TTL.SHORT);
  }
  
  return fallbackResult;
};

/**
 * Get featured reflection with random selection
 * @param {string} language - Language preference
 * @returns {string} Random reflection string
 */
export const getTodaysFeaturedReflection = async (language = null) => {
  try {
    console.debug(`📡 Fetching featured reflection from API`);
    
    const res = await api.get("/daily-reflections/featured", {
      params: language ? { language } : {}
    });
    
    let reflections = res.data?.reflections || [];
    
    if (reflections.length > 0) {
      const random = reflections[Math.floor(Math.random() * reflections.length)];
      console.debug(`✅ Got featured reflection from API`);
      return random;
    }
  } catch (error) {
    console.warn(`⚠️ Featured reflection API failed: ${error.message}`);
  }

  // Fallback: return random from fallback list
  const random = FALLBACK_REFLECTIONS[Math.floor(Math.random() * FALLBACK_REFLECTIONS.length)];
  console.debug("🔄 Using fallback featured reflection");
  return random;
};

/**
 * Get reflections for a specific category with random selection
 * @param {string} category - Scripture category
 * @param {Object} options - Configuration options
 * @returns {Array} Array of random reflection strings from category
 */
export const getCategoryReflections = async (category, options = {}) => {
  const { count = 3, language = null } = options;

  try {
    console.debug(`📡 Fetching ${category} reflections from API`);
    
    const res = await api.get(`/daily-reflections/category/${category}`, {
      params: {
        count,
        language
      }
    });

    let reflections = res.data?.reflections || [];
    
    if (reflections.length > 0) {
      const randomized = getRandomFromArray(reflections, count);
      console.debug(`✅ Got ${randomized.length} reflections from category API`);
      return randomized;
    }
  } catch (error) {
    console.warn(`⚠️ Category API failed for ${category}: ${error.message}`);
  }

  // Fallback: return random from fallback list
  console.debug(`🔄 Using fallback reflections for category ${category}`);
  return getRandomFromArray(FALLBACK_REFLECTIONS, count);
};

/**
 * Clear all reflection caches
 */
export const clearReflectionsCache = () => {
  apiCache.invalidate("daily_reflections");
  apiCache.invalidate("featured_reflection");
  console.debug("🗑️ Cleared reflection caches");
};

/**
 * Get all fallback reflections
 * @returns {Array} Array of fallback reflection strings
 */
export const getAllReflections = () => {
  return FALLBACK_REFLECTIONS;
};

/**
 * Add custom reflection (backend would handle persistence)
 */
export const addCustomReflection = (reflection) => {
  console.debug("Adding custom reflection (requires backend support)");
  return reflection;
};

