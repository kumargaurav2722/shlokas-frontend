/**
 * Comprehensive caching utility for client-side data storage
 * Supports localStorage, sessionStorage, and in-memory caching
 * Includes TTL (Time To Live) and cache invalidation strategies
 */

import { MonitoredApiCache, performanceMonitor } from "./performance";

class Cache {
  constructor(storage = 'localStorage', prefix = 'shlokas_cache_') {
    this.storage = storage;
    this.prefix = prefix;
    this.memoryCache = new Map();
  }

  // Get storage object based on type
  getStorage() {
    switch (this.storage) {
      case 'localStorage':
        return typeof window !== 'undefined' ? window.localStorage : null;
      case 'sessionStorage':
        return typeof window !== 'undefined' ? window.sessionStorage : null;
      case 'memory':
        return null; // Use memoryCache instead
      default:
        return null;
    }
  }

  // Generate cache key with prefix
  getKey(key) {
    return `${this.prefix}${key}`;
  }

  // Check if data is expired
  isExpired(data, ttl) {
    if (!ttl || !data.timestamp) return false;
    return Date.now() - data.timestamp > ttl;
  }

  // Set cache data
  set(key, data, ttl = null) {
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl
    };

    if (this.storage === 'memory') {
      this.memoryCache.set(key, cacheData);
    } else {
      const storage = this.getStorage();
      if (storage) {
        try {
          storage.setItem(this.getKey(key), JSON.stringify(cacheData));
        } catch (error) {
          console.warn('Cache set failed:', error);
        }
      }
    }
  }

  // Get cache data
  get(key, ttl = null) {
    let cacheData = null;

    if (this.storage === 'memory') {
      cacheData = this.memoryCache.get(key);
    } else {
      const storage = this.getStorage();
      if (storage) {
        try {
          const stored = storage.getItem(this.getKey(key));
          cacheData = stored ? JSON.parse(stored) : null;
        } catch (error) {
          console.warn('Cache get failed:', error);
        }
      }
    }

    if (!cacheData) return null;

    // Check if expired
    if (this.isExpired(cacheData, ttl || cacheData.ttl)) {
      this.delete(key);
      return null;
    }

    return cacheData.data;
  }

  // Delete cache entry
  delete(key) {
    if (this.storage === 'memory') {
      this.memoryCache.delete(key);
    } else {
      const storage = this.getStorage();
      if (storage) {
        storage.removeItem(this.getKey(key));
      }
    }
  }

  // Clear all cache entries with this prefix
  clear() {
    if (this.storage === 'memory') {
      this.memoryCache.clear();
    } else {
      const storage = this.getStorage();
      if (storage) {
        const keys = Object.keys(storage);
        keys.forEach(key => {
          if (key.startsWith(this.prefix)) {
            storage.removeItem(key);
          }
        });
      }
    }
  }

  // Get cache size (approximate)
  size() {
    if (this.storage === 'memory') {
      return this.memoryCache.size;
    } else {
      const storage = this.getStorage();
      if (storage) {
        const keys = Object.keys(storage);
        return keys.filter(key => key.startsWith(this.prefix)).length;
      }
    }
    return 0;
  }
}

// Create cache instances for different storage types
export const localCache = new Cache('localStorage');
export const sessionCache = new Cache('sessionStorage');
export const memoryCache = new Cache('memory');

// Default TTL values (in milliseconds)
export const CACHE_TTL = {
  SHORT: 5 * 60 * 1000,      // 5 minutes
  MEDIUM: 30 * 60 * 1000,    // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
  AUDIO: 7 * 24 * 60 * 60 * 1000, // 7 days (for audio URLs)
};

// Cache keys for different data types
export const CACHE_KEYS = {
  WORKS: 'works',
  SUB_WORKS: 'sub_works',
  CHAPTERS: 'chapters',
  VERSES: 'verses',
  SEARCH: 'search',
  BOOKMARKS: 'bookmarks',
  USER_PROFILE: 'user_profile',
  VERSE_OF_DAY: 'verse_of_day',
  AUDIO_URL: 'audio_url',
};

// Enhanced API caching wrapper
export class ApiCache {
  constructor(cache = localCache) {
    this.cache = cache;
  }

  // Cached API call with automatic cache management
  async cachedCall(key, apiCall, ttl = CACHE_TTL.MEDIUM, forceRefresh = false) {
    // Return cached data if available and not forcing refresh
    if (!forceRefresh) {
      const cached = this.cache.get(key, ttl);
      if (cached !== null) {
        return cached;
      }
    }

    try {
      // Make API call
      const response = await apiCall();

      // Cache the response data
      const data = response.data || response;
      this.cache.set(key, data, ttl);

      return data;
    } catch (error) {
      // If API call fails, try to return stale cached data
      const staleData = this.cache.get(key);
      if (staleData !== null) {
        console.warn(`API call failed, returning stale cached data for ${key}`);
        return staleData;
      }
      throw error;
    }
  }

  // Invalidate specific cache entry
  invalidate(key) {
    this.cache.delete(key);
  }

  // Clear all cached API data
  clear() {
    this.cache.clear();
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size(),
      storage: this.cache.storage,
    };
  }
}

// Create API cache instance
export const apiCache = new MonitoredApiCache(localCache, performanceMonitor);
export const cacheUtils = {
  // Generate cache key from parameters
  generateKey: (baseKey, params = {}) => {
    const paramString = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|');
    return paramString ? `${baseKey}_${paramString}` : baseKey;
  },

  // Check if data should be refetched based on time
  shouldRefetch: (lastFetchTime, maxAge = CACHE_TTL.MEDIUM) => {
    return Date.now() - lastFetchTime > maxAge;
  },

  // Compress data for storage (simple implementation)
  compress: (data) => {
    return JSON.stringify(data);
  },

  // Decompress data from storage
  decompress: (compressedData) => {
    try {
      return JSON.parse(compressedData);
    } catch {
      return null;
    }
  },
};