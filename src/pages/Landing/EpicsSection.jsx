import { Link } from "react-router-dom";
import { withLangPrefix } from "../../utils/lang";
import useLanguage from "../../hooks/useLanguage";

const EPICS = [
  {
    title: "Ramayana",
    description:
      "Follow Lord Rama’s journey with chapter-wise navigation and translations.",
    to: "/scriptures/ramayana"
  },
  {
    title: "Mahabharata",
    description:
      "Explore the grand epic and its teachings beyond the battlefield.",
    to: "/scriptures/mahabharata"
  }
];

export default function EpicsSection() {
  const { language } = useLanguage();
  return (
    <section className="px-6 py-20 section-shell">
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1.1fr,1fr] items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
            Sacred Epics
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-amber-900">
            Walk through Ramayana and Mahabharata
          </h2>
          <p className="mt-4 text-muted">
            Experience the timeless epics with guided reading, verse-by-verse
            clarity, and devotional audio.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={withLangPrefix("/scriptures/ramayana", language)}
              className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Explore Ramayana
            </Link>
            <Link
              to={withLangPrefix("/scriptures/mahabharata", language)}
              className="rounded-full px-5 py-2 text-sm font-semibold text-amber-900 border border-amber-200/80 bg-white/70 hover:bg-white"
            >
              Visit Mahabharata
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {EPICS.map((epic) => (
            <div key={epic.title} className="card-surface rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-amber-900">
                {epic.title}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {epic.description}
              </p>
              <Link
                to={withLangPrefix(epic.to, language)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-800"
              >
                Start Reading →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
