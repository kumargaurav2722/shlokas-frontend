/**
 * Performance monitoring utility for caching system
 * Tracks cache hits, misses, API calls, and performance metrics
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      cacheHits: 0,
      cacheMisses: 0,
      apiCalls: 0,
      cacheSize: 0,
      loadTimes: [],
      lastReset: Date.now(),
    };
    this.enabled = typeof window !== 'undefined' && window.localStorage;
  }

  // Track cache hit
  recordCacheHit(key) {
    if (!this.enabled) return;
    this.metrics.cacheHits++;
    console.debug(`Cache HIT: ${key}`);
  }

  // Track cache miss
  recordCacheMiss(key) {
    if (!this.enabled) return;
    this.metrics.cacheMisses++;
    console.debug(`Cache MISS: ${key}`);
  }

  // Track API call
  recordApiCall(endpoint) {
    if (!this.enabled) return;
    this.metrics.apiCalls++;
    console.debug(`API CALL: ${endpoint}`);
  }

  // Track load time
  recordLoadTime(time, operation) {
    if (!this.enabled) return;
    this.metrics.loadTimes.push({ time, operation, timestamp: Date.now() });
    // Keep only last 100 measurements
    if (this.metrics.loadTimes.length > 100) {
      this.metrics.loadTimes.shift();
    }
  }

  // Update cache size
  updateCacheSize(size) {
    this.metrics.cacheSize = size;
  }

  // Get current metrics
  getMetrics() {
    const totalRequests = this.metrics.cacheHits + this.metrics.cacheMisses;
    const hitRate = totalRequests > 0 ? (this.metrics.cacheHits / totalRequests) * 100 : 0;

    const avgLoadTime = this.metrics.loadTimes.length > 0
      ? this.metrics.loadTimes.reduce((sum, item) => sum + item.time, 0) / this.metrics.loadTimes.length
      : 0;

    return {
      ...this.metrics,
      hitRate: Math.round(hitRate * 100) / 100,
      avgLoadTime: Math.round(avgLoadTime * 100) / 100,
      totalRequests,
    };
  }

  // Reset metrics
  reset() {
    this.metrics = {
      cacheHits: 0,
      cacheMisses: 0,
      apiCalls: 0,
      cacheSize: 0,
      loadTimes: [],
      lastReset: Date.now(),
    };
  }

  // Export metrics for analysis
  exportMetrics() {
    return {
      ...this.getMetrics(),
      exportedAt: Date.now(),
      sessionDuration: Date.now() - this.metrics.lastReset,
    };
  }

  // Log performance summary
  logSummary() {
    if (!this.enabled) return;

    const metrics = this.getMetrics();
    console.group('🚀 Cache Performance Summary');
    console.log(`Cache Hit Rate: ${metrics.hitRate}%`);
    console.log(`Total Requests: ${metrics.totalRequests}`);
    console.log(`Cache Hits: ${metrics.cacheHits}`);
    console.log(`Cache Misses: ${metrics.cacheMisses}`);
    console.log(`API Calls: ${metrics.apiCalls}`);
    console.log(`Cache Size: ${metrics.cacheSize} entries`);
    console.log(`Avg Load Time: ${metrics.avgLoadTime}ms`);
    console.groupEnd();
  }
}

// Create global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Enhanced ApiCache with performance monitoring
export class MonitoredApiCache {
  constructor(cache, monitor = performanceMonitor) {
    this.cache = cache;
    this.monitor = monitor;
  }

  async cachedCall(key, apiCall, ttl = null, forceRefresh = false) {
    const startTime = Date.now();

    // Check cache first
    if (!forceRefresh) {
      const cached = this.cache.get(key, ttl);
      if (cached !== null) {
        this.monitor.recordCacheHit(key);
        this.monitor.recordLoadTime(Date.now() - startTime, `cache_hit_${key}`);
        return cached;
      }
    }

    // Cache miss - make API call
    this.monitor.recordCacheMiss(key);

    try {
      const response = await apiCall();
      const data = response.data || response;

      // Cache the response
      this.cache.set(key, data, ttl);

      // Update cache size
      this.monitor.updateCacheSize(this.cache.size());

      this.monitor.recordApiCall(key);
      this.monitor.recordLoadTime(Date.now() - startTime, `api_call_${key}`);

      return data;
    } catch (error) {
      // Try to return stale data on error
      const staleData = this.cache.get(key);
      if (staleData !== null) {
        console.warn(`API call failed, returning stale cached data for ${key}`);
        this.monitor.recordLoadTime(Date.now() - startTime, `stale_data_${key}`);
        return staleData;
      }
      throw error;
    }
  }

  invalidate(key) {
    this.cache.delete(key);
    this.monitor.updateCacheSize(this.cache.size());
  }

  clear() {
    this.cache.clear();
    this.monitor.updateCacheSize(0);
  }

  getStats() {
    return {
      ...this.cache.getStats(),
      performance: this.monitor.getMetrics(),
    };
  }
}