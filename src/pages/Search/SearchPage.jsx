import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { searchTexts } from "../../services/search.service";
import { getVerseRoute, getTextRoute } from "../../utils/routes";
import useLanguage from "../../hooks/useLanguage";

const TYPE_OPTIONS = [
  { value: "", label: "All Types" },
  { value: "shloka", label: "Shloka" },
  { value: "verse", label: "Verse" },
  { value: "text", label: "Text" },
  { value: "chalisa", label: "Chalisa" },
  { value: "puja", label: "Puja Vidhi" }
];

export default function SearchPage() {
  const { language } = useLanguage() || {};
  const [params, setParams] = useSearchParams();
  const initialQuery = params.get("q") || "";
  const initialType = params.get("type") || "";

  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(initialType);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runSearch = async (q, t) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await searchTexts({
        q: q.trim(),
        type: t || undefined
      });
      setResults(data);
    } catch (err) {
      setError("Search is unavailable right now. Try again later.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      runSearch(query, type);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams();
    if (query.trim()) next.set("q", query.trim());
    if (type) next.set("type", type);
    setParams(next, { replace: true });
    runSearch(query, type);
  };

  const displayed = useMemo(
    () =>
      results.map((item) => {
        if (item.path) return item;
        if (item.type === "verse" && item.meta) {
          const route = getVerseRoute({
            category: item.meta.category,
            work: item.meta.work,
            subWork: item.meta.sub_work,
            label: item.meta.sub_work ? `${item.meta.work} ${item.meta.sub_work}` : item.meta.work,
            chapter: item.meta.chapter,
            verse: item.meta.verse,
            lang: language
          });
          return { ...item, path: route };
        }
        if (item.type === "text" && item.meta) {
          const route = getTextRoute({
            category: item.meta.category,
            work: item.meta.work,
            subWork: item.meta.sub_work,
            label: item.meta.sub_work ? `${item.meta.work} ${item.meta.sub_work}` : item.meta.work,
            lang: language
          });
          return { ...item, path: route };
        }
        return item;
      }),
    [results]
  );

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
              Global Search
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-amber-900">
              Search Shlokas, Verses, Texts, and Rituals
            </h1>
            <p className="mt-3 text-muted">
              Type a keyword to search across the entire spiritual library.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for shlokas, verses, or texts..."
              className="w-full rounded-full border border-amber-200/70 bg-white/80 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-full border border-amber-200/70 bg-white/80 px-4 py-3 text-sm"
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Search
            </button>
          </form>

          {error && (
            <p className="mt-6 text-sm text-amber-700 text-center">
              {error}
            </p>
          )}

          {loading && (
            <p className="mt-6 text-sm text-muted text-center">
              Searching...
            </p>
          )}

          {!loading && displayed.length === 0 && query.trim() && (
            <p className="mt-6 text-sm text-muted text-center">
              No results found. Try a different keyword.
            </p>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayed.map((item) => (
              <article key={item.id} className="card-surface rounded-2xl p-6">
                <div className="text-xs uppercase tracking-[0.3em] text-amber-700">
                  {item.type}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-amber-900">
                  {item.title}
                </h3>
                {item.snippet && (
                  <p className="mt-2 text-sm text-muted">
                    {item.snippet}
                  </p>
                )}
                {item.path && (
                  <div className="mt-4">
                    {item.path.startsWith("/") ? (
                      <Link
                        to={item.path}
                        className="text-sm font-semibold text-amber-800"
                      >
                        Open →
                      </Link>
                    ) : (
                      <a
                        href={item.path}
                        className="text-sm font-semibold text-amber-800"
                      >
                        Open →
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
