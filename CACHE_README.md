# Client-Side Caching Implementation

This document describes the comprehensive client-side caching system implemented to improve application performance, reduce API calls, and provide a smoother user experience.

## 🚀 Overview

The caching system provides:
- **Multiple storage types**: localStorage, sessionStorage, and in-memory caching
- **TTL (Time To Live)** support with automatic expiration
- **Performance monitoring** with hit/miss tracking
- **Cache invalidation** strategies
- **Stale-while-revalidate** pattern for resilience

## 📁 Architecture

### Core Components

1. **`src/utils/cache.js`** - Main caching utilities and classes
2. **`src/utils/performance.js`** - Performance monitoring and metrics
3. **`src/hooks/useCache.js`** - React hook for cache management
4. **`src/components/CacheStatus.jsx`** - Development cache status component

### Storage Types

- **localStorage**: Persistent across browser sessions (default)
- **sessionStorage**: Cleared when browser tab closes
- **memory**: In-memory storage for session-based data

## ⚙️ Configuration

### TTL Settings

```javascript
import { CACHE_TTL } from '../utils/cache';

CACHE_TTL.SHORT   // 5 minutes  - Search results, verse of day
CACHE_TTL.MEDIUM  // 30 minutes - Bookmarks, user data
CACHE_TTL.LONG    // 24 hours   - Static content
CACHE_TTL.AUDIO   // 7 days     - Audio URLs
```

### Cache Keys

```javascript
import { CACHE_KEYS } from '../utils/cache';

CACHE_KEYS.WORKS      // Scripture works
CACHE_KEYS.SUB_WORKS  // Sub-works (books)
CACHE_KEYS.CHAPTERS   // Chapters
CACHE_KEYS.VERSES     // Verses
CACHE_KEYS.SEARCH     // Search results
CACHE_KEYS.BOOKMARKS  // User bookmarks
CACHE_KEYS.AUDIO_URL  // Audio file URLs
```

## 🔧 Usage

### Basic Caching

```javascript
import { apiCache, CACHE_KEYS, CACHE_TTL, cacheUtils } from '../utils/cache';

// Cache API response
const data = await apiCache.cachedCall(
  cacheUtils.generateKey(CACHE_KEYS.WORKS, { category: 'veda' }),
  () => api.get('/works', { params: { category: 'veda' } }),
  CACHE_TTL.LONG
);
```

### Cache Management Hook

```javascript
import useCache from '../hooks/useCache';

function MyComponent() {
  const {
    clearAllCaches,
    clearBookmarks,
    clearSearch,
    getCacheStats
  } = useCache();

  const handleRefresh = () => {
    clearBookmarks(); // Clear bookmark cache
  };

  return (
    <button onClick={handleRefresh}>Refresh Bookmarks</button>
  );
}
```

### Manual Cache Operations

```javascript
import { localCache, sessionCache, memoryCache } from '../utils/cache';

// Store data
localCache.set('user_prefs', { theme: 'dark' }, CACHE_TTL.LONG);

// Retrieve data
const prefs = localCache.get('user_prefs');

// Delete specific entry
localCache.delete('user_prefs');

// Clear all entries
localCache.clear();
```

## 📊 Performance Monitoring

The system tracks:
- **Cache hit rate**: Percentage of requests served from cache
- **API call reduction**: Number of API calls avoided
- **Load times**: Average response times
- **Cache size**: Number of cached entries

### Viewing Metrics

```javascript
import { performanceMonitor } from '../utils/performance';

const metrics = performanceMonitor.getMetrics();
console.log(`Hit Rate: ${metrics.hitRate}%`);
console.log(`API Calls Saved: ${metrics.cacheHits}`);
```

### Development Cache Status

Add the `CacheStatus` component to view real-time cache statistics:

```javascript
import CacheStatus from '../components/CacheStatus';

// In development mode
<CacheStatus isVisible={process.env.NODE_ENV === 'development'} />
```

## 🔄 Cache Invalidation Strategies

### Automatic Invalidation
- **TTL expiration**: Data automatically expires based on TTL
- **Write operations**: Cache invalidated after mutations (add/remove bookmarks)

### Manual Invalidation
```javascript
import { invalidateScriptureCache, clearBookmarksCache } from '../services/scripture.service';

// Invalidate all scripture data
invalidateScriptureCache();

// Clear bookmark cache
clearBookmarksCache();
```

### Force Refresh
```javascript
import { refreshVerseOfDay } from '../services/verseOfDay.service';

// Force refresh verse of day
await refreshVerseOfDay('sanskrit');
```

## 🛡️ Error Handling & Resilience

### Stale Data Fallback
If API calls fail, the system returns stale cached data when available:

```javascript
try {
  const freshData = await apiCache.cachedCall(key, apiCall);
  return freshData;
} catch (error) {
  // Returns stale data if available, throws error if not
  throw error;
}
```

### Storage Quotas
The system gracefully handles localStorage/sessionStorage quota limits:
- Falls back to in-memory caching if storage is full
- Logs warnings for debugging

## 🧪 Testing

### Cache Hit/Miss Testing

```javascript
// Test cache miss (first call)
const data1 = await getVerses('gita', 'bhagavad-gita', 1, ['sanskrit']);
// Should be cache miss

// Test cache hit (second call with same params)
const data2 = await getVerses('gita', 'bhagavad-gita', 1, ['sanskrit']);
// Should be cache hit
```

### TTL Testing

```javascript
import { CACHE_TTL } from '../utils/cache';

// Set short TTL for testing
localCache.set('test_key', 'test_data', 1000); // 1 second

// Wait 2 seconds
setTimeout(() => {
  const data = localCache.get('test_key'); // Should be null
}, 2000);
```

### Performance Validation

```javascript
import { performanceMonitor } from '../utils/performance';

// Before optimization
performanceMonitor.reset();

// Perform operations
await loadScriptures();
await searchVerses('krishna');

// Check metrics
const metrics = performanceMonitor.getMetrics();
console.log(`Cache hit rate: ${metrics.hitRate}%`);
```

## 📈 Expected Performance Improvements

### Metrics to Track
- **API Call Reduction**: 60-80% reduction in redundant API calls
- **Load Time Improvement**: 50-90% faster for cached data
- **Bandwidth Savings**: Significant reduction in data transfer
- **User Experience**: Instant loading for frequently accessed content

### Real-World Scenarios
- **Scripture browsing**: Chapters and verses load instantly after first visit
- **Search**: Repeated searches return results immediately
- **Bookmarks**: Bookmark list loads instantly
- **Audio**: Audio URLs cached for 7 days
- **Verse of Day**: Daily content cached appropriately

## 🔧 Maintenance

### Cache Size Management
- Monitor cache size in production
- Implement cache size limits if needed
- Clear old/unused cache entries

### Version Compatibility
- Cache keys include version identifiers when needed
- Invalidate all caches on major version updates

### Monitoring & Alerts
- Log cache performance metrics
- Alert on low hit rates (< 50%)
- Monitor storage quota usage

## 🚀 Future Enhancements

### Potential Improvements
- **React Query Integration**: Add TanStack Query for advanced features
- **Service Worker Caching**: Cache API responses offline
- **Cache Compression**: Compress large cache entries
- **Background Sync**: Sync cache with server changes
- **Cache Warming**: Pre-load frequently accessed data

### Advanced Features
- **Cache dependencies**: Invalidate related caches automatically
- **Cache prioritization**: Keep important data when storage is full
- **Cache analytics**: Detailed usage patterns and optimization suggestions