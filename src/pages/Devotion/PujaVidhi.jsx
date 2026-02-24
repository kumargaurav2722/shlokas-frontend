import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { getPujaVidhis } from "../../services/devotion.service";

const PUJA_VIDHIS = [
  {
    id: "ganesh",
    title: "Ganesh Puja",
    description: "Sankalp, avahan, and complete arati sequence.",
    deity: "Ganesh",
    type: "Puja",
    tags: ["ganesh", "prosperity", "auspicious"],
    textUrl: "",
    pdfUrl: ""
  },
  {
    id: "lakshmi",
    title: "Lakshmi Puja",
    description: "Prosperity-focused puja steps and mantras.",
    deity: "Lakshmi",
    type: "Puja",
    tags: ["lakshmi", "prosperity", "wealth"],
    textUrl: "",
    pdfUrl: ""
  },
  {
    id: "satyanarayan",
    title: "Satyanarayan Katha",
    description: "Full vidhi with katha and prasad guidance.",
    deity: "Vishnu",
    type: "Katha",
    tags: ["satyanarayan", "katha", "vow"],
    textUrl: "",
    pdfUrl: ""
  }
];

const ActionButton = ({ href, label }) =>
  href ? (
    <a
      href={href}
      className="rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
    >
      {label}
    </a>
  ) : (
    <button
      disabled
      className="rounded-full px-4 py-2 text-xs font-semibold text-amber-900 border border-amber-200/70 bg-white/60 opacity-70"
    >
      {label}
    </button>
  );

export default function PujaVidhi() {
  const [query, setQuery] = useState("");
  const [selectedDeity, setSelectedDeity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [items, setItems] = useState(PUJA_VIDHIS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    const timeout = setTimeout(async () => {
      try {
        const data = await getPujaVidhis({
          q: query || undefined,
          deity: selectedDeity || undefined,
          type: selectedType || undefined
        });
        if (active) {
          const fallback = !query && !selectedDeity && !selectedType;
          setItems(data.length ? data : fallback ? PUJA_VIDHIS : []);
        }
      } catch (err) {
        if (active) {
          setError("Backend not connected yet. Showing local data.");
          setItems(PUJA_VIDHIS);
        }
      } finally {
        if (active) setLoading(false);
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [query, selectedDeity, selectedType]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const base = items;
    if (!term && !selectedDeity && !selectedType) return base;
    return items.filter((item) => {
      const haystack = `${item.title} ${item.description} ${
        item.tags?.join(" ") || ""
      }`.toLowerCase();
      const matchesTerm = haystack.includes(term);
      const matchesDeity = selectedDeity
        ? item.deity?.toLowerCase() === selectedDeity.toLowerCase()
        : true;
      const matchesType = selectedType
        ? item.type?.toLowerCase() === selectedType.toLowerCase()
        : true;
      return matchesTerm && matchesDeity && matchesType;
    });
  }, [query, items, selectedDeity, selectedType]);

  const deityOptions = useMemo(() => {
    const set = new Set(items.map((item) => item.deity).filter(Boolean));
    return Array.from(set);
  }, [items]);

  const typeOptions = useMemo(() => {
    const set = new Set(items.map((item) => item.type).filter(Boolean));
    return Array.from(set);
  }, [items]);

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
              Ritual Guidance
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-amber-900">
              Dharmik Puja Vidhi
            </h1>
            <p className="mt-3 text-muted">
              Backend-ready list with text and PDF formats for each puja.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-amber-900">
                Browse Puja Vidhi
              </h2>
              <p className="text-sm text-muted">
                Search by deity or ritual purpose.
              </p>
              {error && (
                <p className="mt-2 text-xs text-amber-700">{error}</p>
              )}
            </div>
            <div className="flex w-full flex-col gap-3 sm:max-w-xl sm:flex-row sm:items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search puja vidhi..."
                className="w-full rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
              />
              <select
                value={selectedDeity}
                onChange={(e) => setSelectedDeity(e.target.value)}
                className="rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm"
              >
                <option value="">All Deities</option>
                {deityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm"
              >
                <option value="">All Ritual Types</option>
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedDeity && (
              <button
                onClick={() => setSelectedDeity("")}
                className="rounded-full border border-amber-200/70 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900"
              >
                Deity: {selectedDeity} ✕
              </button>
            )}
            {selectedType && (
              <button
                onClick={() => setSelectedType("")}
                className="rounded-full border border-amber-200/70 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900"
              >
                Type: {selectedType} ✕
              </button>
            )}
            {(selectedDeity || selectedType || query) && (
              <button
                onClick={() => {
                  setQuery("");
                  setSelectedDeity("");
                  setSelectedType("");
                }}
                className="rounded-full border border-amber-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-amber-900"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article key={item.id} className="card-surface rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.deity && (
                    <span className="rounded-full border border-amber-200/70 px-2 py-1 text-[0.7rem] font-semibold text-amber-800">
                      {item.deity}
                    </span>
                  )}
                  {item.type && (
                    <span className="rounded-full border border-amber-200/70 px-2 py-1 text-[0.7rem] font-semibold text-amber-800">
                      {item.type}
                    </span>
                  )}
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-amber-200/70 px-2 py-1 text-[0.7rem] font-semibold text-amber-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ActionButton href={item.textUrl} label="Read Text" />
                  <ActionButton href={item.pdfUrl} label="Download PDF" />
                </div>
              </article>
            ))}
          </div>
          {loading && (
            <p className="mt-8 text-sm text-muted">
              Loading puja vidhi...
            </p>
          )}
          {!loading && filtered.length === 0 && (
            <p className="mt-8 text-sm text-muted">
              No matching puja found. Try a different keyword.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
