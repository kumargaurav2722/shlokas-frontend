import { useEffect, useState } from "react";
import DailyReflectionsSection from "./Landing/DailyReflectionsSection";

/**
 * Example demonstrating how to use Dynamic Daily Reflections
 * This file shows different ways to integrate reflections into your app
 */

// Example 1: Using the section component directly
export function DailyReflectionsExample() {
  return (
    <div>
      {/* Daily rotation - same verses for all users each day */}
      <DailyReflectionsSection
        method="daily"
        title="Today's Reflections"
        description="Start your day with verses that inspire and guide your spiritual practice."
      />

      {/* Random selection - new verses on each view */}
      <DailyReflectionsSection
        method="random"
        title="Curated Selections"
        description="Explore different verses for inspiration and reflection."
      />
    </div>
  );
}

// Example 2: Using the hook directly in a component
export function ReflectionsWithHook() {
  const useDailyReflections = require("../hooks/useDailyReflections").default;
  const { reflections, loading, error, refresh } = useDailyReflections({
    count: 5,
    method: "random"
  });

  if (loading) return <div>Loading spiritual wisdom...</div>;
  if (error) return <div className="error">Failed to load reflections</div>;

  return (
    <div>
      <h2>Today's Guidance</h2>
      <ul>
        {reflections.map((reflection) => (
          <li key={reflection}>{reflection}</li>
        ))}
      </ul>
      <button onClick={refresh}>Get Different Verses</button>
    </div>
  );
}

// Example 3: Using the service directly
export function ReflectionsWithService() {
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { getDailyReflections } = require("../services/dailyReflections.service");
      setLoading(true);
      try {
        // Get today's featured reflection
        const data = await getDailyReflections({
          count: 3,
          method: "daily"
        });
        setReflections(data);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <div>
      <h3>Featured Verses</h3>
      {loading && <p>Loading...</p>}
      {reflections.map((ref) => (
        <div key={ref} style={{ marginBottom: "1rem" }}>
          {ref}
        </div>
      ))}
    </div>
  );
}

// Example 4: Integration with Landing page
export function EnhancedLandingPage() {
  return (
    <>
      <div className="hero-section">
        {/* Your hero content */}
      </div>

      {/* Add Daily Reflections prominently */}
      <DailyReflectionsSection
        method="daily"
        count={3}
        showLinks={true}
      />

      <div className="other-sections">
        {/* Your other content */}
      </div>
    </>
  );
}

// Example 5: Context-aware reflections in verse view
export function VersePaneWithDynamicReflections() {
  const currentChapter = 2;
  const currentVerse = 47;

  return (
    <div>
      {/* This is already handled in SidePanel.jsx */}
      {/* Showing related verses to current page */}
      {/* Pass isDynamic={true} and reflectionMethod="related" */}
      <p>
        SidePanel will automatically show verses related to{" "}
        {currentChapter}.{currentVerse}
      </p>
    </div>
  );
}