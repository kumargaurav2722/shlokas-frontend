import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const HIGHLIGHTS = [
  "Hanuman Chalisa",
  "Durga Chalisa",
  "Shiv Chalisa"
];

export default function ChalisaSection() {
  const { language } = useLanguage();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1fr,1.1fr] items-center">
        <div className="card-surface rounded-3xl p-8">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
            Devotional
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-amber-900">
            Chalisas and Stotras Library
          </h2>
          <p className="mt-4 text-muted">
            Chant daily with text and downloadable PDF formats, all organized
            by deity and tradition.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {HIGHLIGHTS.map((item) => (
              <span
                key={item}
                className="rounded-full border border-amber-200/70 px-3 py-1 text-xs font-medium text-amber-900"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-surface rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-amber-900">
              Full Chalisa Collection
            </h3>
            <p className="mt-2 text-sm text-muted">
              Explore all chalisas with text and PDF options ready for download.
            </p>
            <Link
              to={withLangPrefix("/chalisas", language)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-800"
            >
              View Chalisas →
            </Link>
          </div>
          <div className="card-surface rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-amber-900">
              Chanting Support
            </h3>
            <p className="mt-2 text-sm text-muted">
              Listen alongside the text and keep your favorites bookmarked.
            </p>
            <Link
              to={withLangPrefix("/profile", language)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-800"
            >
              Open Profile →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
