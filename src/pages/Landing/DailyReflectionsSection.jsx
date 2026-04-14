import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useDailyReflections from "../../hooks/useDailyReflections";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

/**
 * DailyReflectionsSection component
 * Displays featured daily reflections with beautiful presentation
 * Supports daily rotation, random selection, and custom methods
 */
export default function DailyReflectionsSection({
  method = "random",
  title = null,
  description = null,
  count = 5,
  showLinks = true,
  className = ""
}) {
  const { language } = useLanguage();
  const { reflections, loading, error, refresh } = useDailyReflections({
    count,
    method,
    autoFetch: true
  });

  const defaultTitle = method === "daily" ? "Today's Reflections" : "Curated Reflections";
  const defaultDescription = method === "daily"
    ? "Start your day with verses that inspire and guide your spiritual practice."
    : "Explore verses selected for profound wisdom and daily application.";

  const getReflectionTitle = (reflection) => {
    if (typeof reflection === "string") return reflection;
    return reflection?.title || reflection?.name || "";
  };

  const parseVerseRef = (suggestion) => {
    const text = getReflectionTitle(suggestion);
    const match = typeof text === "string" ? text.match(/(\d+)\.(\d+)/) : null;
    if (match) {
      return {
        chapter: match[1],
        verse: match[2],
        work: text.split(" ")[0],
        label: text
      };
    }
    return null;
  };

  if (error) {
    return (
      <section className={`px-6 py-20 ${className}`}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center text-red-600">
            <p>Failed to load daily reflections</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`px-6 py-20 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-900 shadow-sm mb-4">
            <span>ॐ</span>
            <span>{method === "daily" ? "Daily" : "Featured"}</span>
          </div>
          <h2 className="text-3xl font-semibold text-amber-900">
            {title || defaultTitle}
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            {description || defaultDescription}
          </p>
        </div>

        {/* Reflections Grid */}
        <div className={`grid gap-6 ${count >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          {loading ? (
            // Loading skeletons
            <>
              {Array.from({ length: count }).map((_, i) => (
                <div
                  key={i}
                  className="card-surface rounded-2xl p-6 animate-pulse"
                >
                  <div className="h-4 bg-amber-200 rounded w-3/4 mb-4" />
                  <div className="h-8 bg-amber-100 rounded w-full mb-3" />
                  <div className="h-4 bg-amber-50 rounded w-full mb-2" />
                  <div className="h-4 bg-amber-50 rounded w-5/6" />
                </div>
              ))}
            </>
          ) : (
            // Reflections cards
            reflections.map((reflection, idx) => {
              const verseRef = parseVerseRef(reflection);
              const to = verseRef
                ? withLangPrefix(
                    `/bhagavad-gita/${verseRef.chapter}/${verseRef.verse}`,
                    language
                  )
                : "#";

              const title = typeof reflection === "string"
              ? reflection
              : reflection?.title || reflection?.name || "Verse";

            return (
                <div
                  key={`${title}-${idx}`}
                  className="card-surface rounded-2xl p-6 gold-shadow hover:shadow-lg transition flex flex-col"
                >
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-700 font-semibold">
                      {verseRef?.work || "Verse"}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-amber-900 line-clamp-2">
                      {verseRef?.chapter}.{verseRef?.verse}
                    </h3>
                    <p className="mt-4 text-sm text-amber-900/70 leading-relaxed line-clamp-3">
                      {title}
                    </p>
                  </div>

                  {showLinks && verseRef && (
                    <Link
                      to={to}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-900 transition"
                    >
                      Read Full →
                    </Link>
                  )}
                </div>
              );
            })
          )}
        </div>

        {!loading && !error && reflections.length === 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            No reflections are available at this time.
          </div>
        )}

        {/* Refresh button */}
        {!loading && method !== "daily" && (
          <div className="mt-8 text-center">
            <button
              onClick={refresh}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-300 bg-white/80 text-amber-900 font-semibold hover:bg-white transition"
            >
              <span>Refresh Reflections</span>
              <span>↻</span>
            </button>
          </div>
        )}

        {/* Action buttons */}
        {showLinks && (
          <div className="mt-12 text-center">
            <Link
              to={withLangPrefix("/verse-of-the-day", language)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              Explore All Verses →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}