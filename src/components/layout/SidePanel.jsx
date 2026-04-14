import { Link } from "react-router-dom";
import useDailyReflections from "../../hooks/useDailyReflections";

export default function SidePanel({
  suggestions = [],
  chapter = null,
  verse = null,
  isDynamic = true,
  reflectionMethod = "daily"
}) {
  // Use hook for dynamic reflections if enabled
  const { reflections, loading, error } = useDailyReflections({
    count: 3,
    method: reflectionMethod,
    chapter,
    verse,
    autoFetch: isDynamic
  });

  // Use dynamic reflections if available, otherwise fallback to props
  const displaySuggestions = isDynamic && reflections.length > 0 ? reflections : suggestions;

  // Parse verse reference from suggestion string (e.g., "Gita 2.47 – Karma Yoga" -> {chapter: 2, verse: 47})
  const parseVerseRef = (suggestion) => {
    const match = suggestion.match(/(\d+)\.(\d+)/);
    if (match) {
      return {
        chapter: match[1],
        verse: match[2],
        label: suggestion
      };
    }
    return null;
  };

  return (
    <aside className="hidden w-80 shrink-0 border-l border-amber-100/70 bg-gradient-to-b from-amber-50/70 to-white lg:block">
      <div className="sticky top-20 p-6">
        <div className="rounded-2xl border border-amber-100 bg-white/80 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 text-amber-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
              ॐ
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Daily Reflections
            </h3>
          </div>

          <p className="mt-3 text-sm text-amber-900/70">
            Suggested verses to contemplate today.
          </p>

          {loading && isDynamic && (
            <div className="mt-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border border-amber-100 bg-white px-4 py-3 h-12 animate-pulse"
                />
              ))}
            </div>
          )}

          {error && isDynamic && (
            <div className="mt-4 text-xs text-red-600 bg-red-50 p-3 rounded-lg">
              Failed to load reflections
            </div>
          )}

          {!loading && (
            <ul className="mt-4 space-y-3">
              {displaySuggestions.map((item) => {
                const verseRef = parseVerseRef(item);
                if (verseRef) {
                  return (
                    <li key={item}>
                      <Link
                        to={`/bhagavad-gita/${verseRef.chapter}/${verseRef.verse}`}
                        className="block rounded-xl border border-amber-100 bg-white px-4 py-3 text-sm text-amber-900 shadow-sm hover:shadow-md hover:bg-amber-50 transition"
                      >
                        {verseRef.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li
                    key={item}
                    className="rounded-xl border border-amber-100 bg-white px-4 py-3 text-sm text-amber-900 shadow-sm hover:shadow-md transition"
                  >
                    {item}
                  </li>
                );
              })}
              {displaySuggestions.length === 0 && (
                <li className="rounded-xl border border-amber-100 bg-white px-4 py-3 text-sm text-amber-900/70">
                  No suggestions yet.
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}
