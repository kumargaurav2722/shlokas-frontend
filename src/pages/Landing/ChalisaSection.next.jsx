import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const HIGHLIGHTS = [
  "home.chalisa_highlight_hanuman",
  "home.chalisa_highlight_durga",
  "home.chalisa_highlight_shiv"
];

export default function ChalisaSection() {
  const { language, t } = useLanguage() || {};

  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-8 items-center lg:grid-cols-[1fr,1.1fr]">
        <div className="card-surface rounded-3xl p-8">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
            {t?.("home.chalisa_badge")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-amber-900">
            {t?.("home.chalisa_title")}
          </h2>
          <p className="mt-4 text-muted">
            {t?.("home.chalisa_description")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {HIGHLIGHTS.map((item) => (
              <span
                key={item}
                className="rounded-full border border-amber-200/70 px-3 py-1 text-xs font-medium text-amber-900"
              >
                {t?.(item)}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-surface rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-amber-900">
              {t?.("home.chalisa_collection_title")}
            </h3>
            <p className="mt-2 text-sm text-muted">
              {t?.("home.chalisa_collection_description")}
            </p>
            <Link
              to={withLangPrefix("/chalisas", language)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-800"
            >
              {t?.("home.chalisa_collection_cta")}
            </Link>
          </div>
          <div className="card-surface rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-amber-900">
              {t?.("home.chalisa_support_title")}
            </h3>
            <p className="mt-2 text-sm text-muted">
              {t?.("home.chalisa_support_description")}
            </p>
            <Link
              to={withLangPrefix("/profile", language)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-800"
            >
              {t?.("home.chalisa_support_cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
