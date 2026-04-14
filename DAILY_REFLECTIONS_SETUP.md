# Dynamic Daily Reflections - Implementation Guide

## 🎯 Quick Start

The Dynamic Daily Reflections system is now fully integrated into your application. Here's what changed:

### Changes Made

1. **New Service**: `src/services/dailyReflections.service.js`
   - Handles fetching/generating dynamic reflections
   - Provides caching with 24-hour TTL
   - Supports multiple selection methods

2. **New Hook**: `src/hooks/useDailyReflections.js`
   - React hook for managing reflection state
   - Handles loading, error, and refresh

3. **New Components**:
   - `src/pages/Landing/DailyReflectionsSection.jsx` - Featured reflections display
   - `src/pages/Landing/DailyReflectionsExample.jsx` - Usage examples

4. **Updated Components**:
   - `src/components/layout/SidePanel.jsx` - Now shows dynamic Daily Reflections
   - `src/pages/Scriptures/VersePage.jsx` - Uses dynamic reflections in sidebar

## 🚀 Integration Points

### 1. SidePanel - Already Integrated ✅

The SidePanel component now automatically displays dynamic Daily Reflections:

```javascript
// In VersePage.jsx - Already updated
<SidePanel
  isDynamic={true}
  reflectionMethod="related"
  chapter={sidePanelChapter}
  verse={sidePanelVerse}
/>
```

**Result**: Users see related verses while reading, with content that changes based on viewing context.

### 2. Landing Page - Ready to Add

Add to your Landing page for prominent display:

```javascript
import DailyReflectionsSection from "./Landing/DailyReflectionsSection";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      
      {/* Add this */}
      <DailyReflectionsSection method="daily" count={3} />
      
      <PopularShlokas />
      {/* ... rest of page */}
    </>
  );
}
```

### 3. Custom Components - Use the Hook

In any component, use the hook:

```javascript
import useDailyReflections from "../hooks/useDailyReflections";

function MyComponent() {
  const { reflections, loading, error, refresh } = useDailyReflections({
    count: 3,
    method: "daily"
  });

  if (loading) return <Skeleton />;
  if (error) return <Error message={error} />;

  return (
    <div>
      {reflections.map((verse) => (
        <VersCard key={verse} verse={verse} />
      ))}
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}
```

## 📊 Reflection Methods

### Daily Rotation (Default)
- **What**: Same verses for all users each day
- **When**: Changes at midnight
- **Use Case**: Email digest, homepage featured content
- **Configuration**:
  ```javascript
  method: "daily"
  ```

### Random Selection
- **What**: Different verses each time
- **When**: Every view/refresh
- **Use Case**: Inspiration widget, explore feature
- **Configuration**:
  ```javascript
  method: "random"
  ```

### Related Verses
- **What**: Verses related to current page content
- **When**: Context-dependent
- **Use Case**: Reading companion, learning aids
- **Configuration**:
  ```javascript
  method: "related"
  chapter: 2
  verse: 47
  ```

## 🔄 How Daily Rotation Works

The system uses the day of the year to select verses:

```javascript
// Example calendar:
Dec 31, 2025 (day 365): Reflection 6
Jan 1, 2026 (day 1):    Reflection 1
Jan 2, 2026 (day 2):    Reflection 2
Jan 3, 2026 (day 3):    Reflection 3
...
Jan 7, 2026 (day 7):    Reflection 1 (cycles back)
```

**Benefits**:
- Users see the same verse on a given day (ritual)
- Verses are distributed throughout the year
- New verse daily for users

## 💾 Caching Details

### What Gets Cached
- Reflection selections (formatted strings)
- API responses (if backend available)
- Featured reflections

### Cache Duration
- **Default**: 24 hours (CACHE_TTL.LONG)
- **Storage**: localStorage (persists across tabs)
- **Invalidation**: Automatic after 24 hours or manual clear

### View Cache Status

Add debug component in development:

```javascript
import { CacheStatus } from "../components/CacheStatus";

// In dev environment
<CacheStatus isVisible={process.env.NODE_ENV === 'development'} />
```

## 🌐 Optional Backend Integration

If you have a backend API, implement these endpoints:

### GET `/daily-reflections`
```bash
curl "http://api.example.com/daily-reflections?method=daily&count=3&language=en"
```

Returns:
```json
{
  "reflections": [
    "Gita 2.47 – Karma Yoga",
    "Gita 6.5 – Self Upliftment",
    "Gita 12.15 – Bhakti"
  ]
}
```

### GET `/daily-reflections/featured`
```bash
curl "http://api.example.com/daily-reflections/featured?language=en"
```

Returns:
```json
{
  "reflection": {
    "work": "Bhagavad Gita",
    "chapter": 2,
    "verse": 47,
    "title": "Karma Yoga",
    "description": "You have the right to perform your duty..."
  }
}
```

## 📝 Configuration Options

### Using the Hook

```javascript
useDailyReflections({
  count: 3,              // Number of reflections to return
  method: "daily",       // "daily", "random", or "related"
  chapter: 2,            // For "related" method (optional)
  verse: 47,             // For "related" method (optional)
  language: "en",        // Language code (optional)
  autoFetch: true        // Auto-fetch on mount (default: true)
});
```

### Using the Component

```javascript
<DailyReflectionsSection
  method="daily"              // Selection method
  title="Today's Guidance"    // Custom title
  description="..."           // Custom description
  count={3}                   // Number to display
  showLinks={true}            // Show "Read Full" links
  className="custom-class"    // Additional CSS classes
/>
```

## 🧪 Testing

### Test Different Reflection Methods

```javascript
// Test in browser console
import { getDailyReflections } from './src/services/dailyReflections.service';

// Daily
const daily = await getDailyReflections({ method: "daily" });
console.log("Daily:", daily);

// Random
const random = await getDailyReflections({ method: "random" });
console.log("Random:", random);

// Related
const related = await getDailyReflections({
  method: "related",
  chapter: 2,
  verse: 47
});
console.log("Related:", related);
```

### Verify Caching

```javascript
import { performanceMonitor } from './src/utils/performance';

const metrics = performanceMonitor.getMetrics();
console.log({
  cacheHits: metrics.cacheHits,
  cacheMisses: metrics.cacheMisses,
  hitRate: metrics.hitRate,
  totalRequests: metrics.totalRequests
});
```

## ⚙️ Configuration

### Changing Default Reflections

Edit `src/services/dailyReflections.service.js`:

```javascript
const DEFAULT_REFLECTIONS = [
  {
    work: "Bhagavad Gita",
    chapter: 2,
    verse: 47,
    title: "Karma Yoga",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    description: "You have the right to perform your duty..."
  },
  // Add more verses here
];
```

### Changing Cache Duration

In `src/services/dailyReflections.service.js`:

```javascript
// Change from CACHE_TTL.LONG (24 hours) to something else
apiCache.cache.set(cacheKey, formattedReflections, CACHE_TTL.SHORT); // 5 minutes
```

### Changing Display Count

Pass `count` prop to component or hook:

```javascript
// Show 5 reflections instead of 3
<DailyReflectionsSection count={5} />

// Or in hook
const { reflections } = useDailyReflections({ count: 5 });
```

## 📍 File Structure

```
src/
├── services/
│   └── dailyReflections.service.js    # Core service
├── hooks/
│   └── useDailyReflections.js         # React hook
├── pages/Landing/
│   ├── DailyReflectionsSection.jsx    # Featured display component
│   └── DailyReflectionsExample.jsx    # Usage examples
├── components/layout/
│   └── SidePanel.jsx                  # Updated with dynamic reflections
└── pages/Scriptures/
    └── VersePage.jsx                  # Updated to use dynamic reflections
```

## 🐛 Troubleshooting

### Reflections not updating?
- Check cache: Open DevTools → Application → LocalStorage
- Clear cache: `clearReflectionsCache()`
- Check method: Daily should change at midnight

### API errors?
- The system falls back to local generation automatically
- Check browser console for error details
- Verify API endpoint exists (optional)

### Performance issues?
- Check cache hit rate: `performanceMonitor.getMetrics()`
- Verify localStorage isn't full
- Reduce reflection count if needed

## 🎨 Styling

Components use Tailwind CSS classes. To customize:

```javascript
// DailyReflectionsSection
<DailyReflectionsSection
  className="bg-blue-50"  // Custom background
/>

// SidePanel (edit component directly)
// Change card-surface, gold-shadow, etc. in tailwind config
```

## 📚 Next Steps

1. ✅ Dynamic Daily Reflections are active
2. **Optional**: Implement backend API endpoints for full control
3. **Optional**: Add user preferences for reflection methods
4. **Optional**: Set up analytics tracking
5. **Optional**: Create notification system for daily verses

## 🚀 Going Live

Checklist before deployment:

- [ ] Test daily rotation logic (verify changes every day)
- [ ] Test all reflection methods (daily, random, related)
- [ ] Verify caching works properly
- [ ] Test on slow network (3G/4G)
- [ ] Verify loading states and error states
- [ ] Check cache hit rates
- [ ] Monitor for console errors
- [ ] Gather user feedback