# Dynamic Daily Reflections Implementation

This document describes the dynamic Daily Reflections system that makes verses update automatically and provides users with fresh spiritual guidance.

## 📋 Overview

The Daily Reflections system replaces hardcoded verses with a dynamic, intelligent solution that:
- **Updates daily**: Different verses each day based on daily rotation
- **Supports multiple methods**: Daily rotation, random selection, or related verses
- **Intelligent caching**: Reduces API calls while maintaining fresh content
- **Intelligent fallback**: Uses curated verses when API is unavailable
- **Multi-language support**: Fetch reflections in different languages

## 🏗️ Architecture

### Core Components

1. **Service** (`src/services/dailyReflections.service.js`)
   - Fetches reflections from API or generates locally
   - Handles caching with TTL
   - Provides formatting and filtering

2. **Hook** (`src/hooks/useDailyReflections.js`)
   - Manages async state and loading
   - Provides refresh and clear cache functions
   - Integrates with React lifecycle

3. **Components**
   - `SidePanel.jsx` - Updated to show dynamic reflections
   - `DailyReflectionsSection.jsx` - Featured reflections display

4. **Integration**
   - `VersePage.jsx` - Shows related verses based on current viewing
   - Can be added to Landing pages

## 🔄 How It Works

### Reflection Methods

#### 1. **Daily Rotation** (Default)
- Same verses for all users on a specific day
- Changes automatically at midnight
- Provides consistency and ritual
- Uses day-of-year to determine verse

```javascript
// Usage
const { reflections } = useDailyReflections({
  method: "daily",
  count: 3
});
```

#### 2. **Random Selection**
- New verses on every view/refresh
- Provides variety and exploration
- Good for inspiring different perspectives

```javascript
// Usage
const { reflections } = useDailyReflections({
  method: "random",
  count: 3
});
```

#### 3. **Related Verses** (Context-Aware)
- Suggests related verses based on current viewing
- Appears in SidePanel alongside current verse
- Helps users explore deeper themes

```javascript
// Usage
const { reflections } = useDailyReflections({
  method: "related",
  chapter: 2,
  verse: 47
});
```

### Data Source Priority

1. **Backend API** - If `/daily-reflections` endpoint exists
2. **Local Generation** - Fallback to curated verses
3. **Default Reflections** - 6 curated verses from Bhagavad Gita

## 📖 Usage Examples

### Basic Usage in Components

```javascript
import useDailyReflections from '../hooks/useDailyReflections';

function MyComponent() {
  const { reflections, loading, error, refresh } = useDailyReflections({
    count: 3,
    method: "daily"
  });

  if (loading) return <div>Loading reflections...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Today's Reflections</h2>
      <ul>
        {reflections.map((verse) => (
          <li key={verse}>{verse}</li>
        ))}
      </ul>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}
```

### Using the Service Directly

```javascript
import { getDailyReflections } from '../services/dailyReflections.service';

// Get today's reflections
const reflections = await getDailyReflections({
  count: 3,
  method: "daily",
  language: "en"
});

// Get random reflections
const randomReflections = await getDailyReflections({
  count: 5,
  method: "random"
});

// Get related to current verse
const relatedReflections = await getDailyReflections({
  count: 3,
  method: "related",
  chapter: 2,
  verse: 47
});
```

### In Landing Pages

```javascript
import DailyReflectionsSection from './DailyReflectionsSection';

function LandingPage() {
  return (
    <>
      <DailyReflectionsSection method="daily" />
      <DailyReflectionsSection method="random" title="Curated Selections" />
    </>
  );
}
```

### Updated SidePanel Usage

```javascript
<SidePanel
  isDynamic={true}
  reflectionMethod="related"
  chapter={currentChapter}
  verse={currentVerse}
/>
```

## 🎯 Default Reflections

The system includes 6 curated reflections that rotate daily:

1. **Gita 2.47** - Karma Yoga (You have the right to perform your duty...)
2. **Gita 6.5** - Self Upliftment (Lift yourself by your own effort...)
3. **Gita 12.15** - Bhakti (One who is not disturbed by the world...)
4. **Gita 3.30** - Surrender (Surrendering all works unto Me...)
5. **Gita 10.10** - Divine Connection (To those constantly devoted...)
6. **Gita 15.15** - Supreme Knowledge (I am seated in everyone's heart...)

### Adding More Reflections

Edit `DEFAULT_REFLECTIONS` in `src/services/dailyReflections.service.js`:

```javascript
const DEFAULT_REFLECTIONS = [
  {
    work: "Bhagavad Gita",
    chapter: 2,
    verse: 47,
    title: "Karma Yoga",
    sanskrit: "कर्मण्येवाधिकारस्ते...",
    description: "..."
  },
  // Add more...
];
```

## 🔧 Caching Strategy

### TTL Configuration
- **Reflections**: 24 hours (CACHE_TTL.LONG)
- Uses localStorage for persistence across sessions
- Automatically invalidated after TTL expires

### Cache Keys
- `daily_reflections_{method}_{count}` - Base reflections
- `featured_reflection_{language}` - Today's featured verse
- `category_reflections_{category}_{count}` - Category-specific

### Manual Cache Management

```javascript
import { clearReflectionsCache } from '../services/dailyReflections.service';

// Clear all reflection caches
clearReflectionsCache();

// Clear and refresh specific reflections
const { clearCache } = useDailyReflections();
clearCache(); // Clears cache and re-fetches
```

## 🌐 API Integration

### Expected Backend Endpoints

If you have a backend, implement these optional endpoints for full integration:

#### GET `/daily-reflections`
```json
{
  "reflections": [
    "Gita 2.47 – Karma Yoga",
    "Gita 6.5 – Self Upliftment",
    "Gita 12.15 – Bhakti"
  ]
}
```

**Query Parameters:**
- `count` - Number of reflections (default: 3)
- `method` - Selection method: "daily", "random", or "related"
- `chapter` - For "related" method
- `verse` - For "related" method
- `language` - Language code (en, hi, sa, etc.)

#### GET `/daily-reflections/featured`
```json
{
  "reflection": {
    "work": "Bhagavad Gita",
    "chapter": 2,
    "verse": 47,
    "title": "Karma Yoga",
    "description": "..."
  }
}
```

#### GET `/daily-reflections/category/:category`
```json
{
  "reflections": [
    "Gita 2.47 – Karma Yoga",
    "Upanishad 1.1 – Unity",
    "Vedas 3.5 – Creation"
  ]
}
```

## 📊 Comparison: Before vs After

### Before (Hardcoded)
```javascript
const suggestions = [
  "Gita 2.47 – Karma Yoga",
  "Gita 6.5 – Self Upliftment",
  "Gita 12.15 – Bhakti"
];
```

**Problems:**
- Same verses every time
- No variety
- Requires code changes to update
- Poor user experience

### After (Dynamic)
```javascript
<SidePanel isDynamic={true} reflectionMethod="daily" />
```

**Benefits:**
- New verses every day
- Intelligent selection methods
- No code changes needed
- Better user engagement

## 🧪 Testing Dynamic Reflections

### Test Daily Rotation

```javascript
import { getDailyReflections } from '../services/dailyReflections.service';

// Get today's reflections
const today = await getDailyReflections({ method: "daily" });
console.log("Today:", today);

// Simulate next day (modify date in service)
const tomorrow = await getDailyReflections({ method: "daily", forceRefresh: true });
console.log("Tomorrow:", tomorrow);
// Should be different from today if using date-based rotation
```

### Test Random Selection

```javascript
const random1 = await getDailyReflections({ method: "random" });
const random2 = await getDailyReflections({ method: "random" });
console.log("Random 1:", random1);
console.log("Random 2:", random2);
// May or may not be the same due to randomness
```

### Test Caching

```javascript
import { performanceMonitor } from '../utils/performance';

const metrics = performanceMonitor.getMetrics();
console.log("Cache hit rate:", metrics.hitRate, "%");
console.log("API calls saved:", metrics.cacheHits);
```

## 📈 Future Enhancements

### Planned Features
1. **User Preferences** - Users can choose reflection methods
2. **Category Filtering** - Show reflections from specific scriptures
3. **Notifications** - Daily reflection notifications
4. **Scheduling** - Queue reflections for specific dates
5. **Analytics** - Track which reflections are most viewed
6. **AI-Generated Descriptions** - Personalized meditation prompts
7. **Multi-Scripture Support** - Include Vedas, Upanishads, Ramayana, etc.
8. **Theme Matching** - Reflections matching user's emotional/spiritual state

### Performance Optimizations
- Implement partial updates (cache per language)
- Add service worker caching for offline access
- Implement compression for large datasets
- Add prefetching for next day's reflections

## 🔐 Security & Privacy

- All reflections served publicly (no sensitive data)
- Cache stored in localStorage (user's machine only)
- No tracking of reflection views unless explicitly enabled
- API calls made from client-side (no server middleware needed)

## 🚀 Deployment Checklist

- [ ] Test daily rotation logic works correctly
- [ ] Verify API endpoints (if using backend)
- [ ] Check caching is working properly
- [ ] Test on slow networks
- [ ] Verify loading states display correctly
- [ ] Test error states and fallbacks
- [ ] Monitor cache hit rates in production
- [ ] Collect user feedback on reflection variety
- [ ] Set up analytics tracking (optional)

## 📚 Related Files

- Main service: `src/services/dailyReflections.service.js`
- Hook: `src/hooks/useDailyReflections.js`
- Components: `src/components/layout/SidePanel.jsx`, `src/pages/Landing/DailyReflectionsSection.jsx`
- Updated pages: `src/pages/Scriptures/VersePage.jsx`
- Caching system: `src/utils/cache.js`, `src/utils/performance.js`