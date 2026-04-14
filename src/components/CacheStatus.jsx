import { useState } from "react";
import useCache from "../hooks/useCache";
import { performanceMonitor } from "../utils/performance";

/**
 * CacheStatus component for development and debugging
 * Shows cache statistics and provides cache management controls
 */
export default function CacheStatus({ isVisible = false }) {
  const [showDetails, setShowDetails] = useState(false);
  const {
    clearAllCaches,
    clearBookmarks,
    clearSearch,
    clearVerseOfDay,
    clearScriptures,
    getCacheStats,
  } = useCache();

  if (!isVisible) return null;

  const stats = getCacheStats();
  const performance = performanceMonitor.getMetrics();

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">Cache Status</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>

      <div className="text-xs text-gray-600 mb-3">
        <div>Storage: {stats.storage}</div>
        <div>Entries: {stats.size}</div>
        <div className="mt-1">
          <div>Hit Rate: {performance.hitRate}%</div>
          <div>Avg Load: {performance.avgLoadTime}ms</div>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-2 mb-3">
          <div className="text-xs bg-gray-50 p-2 rounded">
            <div className="grid grid-cols-2 gap-1">
              <div>Hits: {performance.cacheHits}</div>
              <div>Misses: {performance.cacheMisses}</div>
              <div>API Calls: {performance.apiCalls}</div>
              <div>Total: {performance.totalRequests}</div>
            </div>
          </div>

          <button
            onClick={clearAllCaches}
            className="w-full px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
          >
            Clear All Caches
          </button>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={clearBookmarks}
              className="px-2 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600"
            >
              Clear Bookmarks
            </button>
            <button
              onClick={clearSearch}
              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Clear Search
            </button>
            <button
              onClick={clearVerseOfDay}
              className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
            >
              Clear Verse of Day
            </button>
            <button
              onClick={clearScriptures}
              className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
            >
              Clear Scriptures
            </button>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500">
        Cache TTL: 5min-24h depending on data type
      </div>
    </div>
  );
}