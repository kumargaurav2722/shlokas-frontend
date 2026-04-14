import { Link } from "react-router-dom";
import { withLangPrefix } from "../../utils/lang";
import useLanguage from "../../hooks/useLanguage";

const EPICS = [
  {
    titleKey: "scripture.ramayana",
    descriptionKey: "home.epic_ramayana_description",
    to: "/scriptures/ramayana"
  },
  {
    titleKey: "scripture.mahabharata",
    descriptionKey: "home.epic_mahabharata_description",
    to: "/scriptures/mahabharata"
  }
];

export default function EpicsSection() {
  const { language, t } = useLanguage() || {};

  return (
    <section className="section-shell px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 items-center lg:grid-cols-[1.1fr,1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
            {t?.("home.epics_badge")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-amber-900">
            {t?.("home.epics_title")}
          </h2>
          <p className="mt-4 text-muted">
            {t?.("home.epics_description")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={withLangPrefix("/scriptures/ramayana", language)}
              className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:from-amber-600 hover:to-orange-600"
            >
              {t?.("home.epics_primary_cta")}
            </Link>
            <Link
              to={withLangPrefix("/scriptures/mahabharata", language)}
              className="rounded-full border border-amber-200/80 bg-white/70 px-5 py-2 text-sm font-semibold text-amber-900 hover:bg-white"
            >
              {t?.("home.epics_secondary_cta")}
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {EPICS.map((epic) => (
            <div key={epic.to} className="card-surface rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-amber-900">
                {t?.(epic.titleKey)}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {t?.(epic.descriptionKey)}
              </p>
              <Link
                to={withLangPrefix(epic.to, language)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-800"
              >
                {t?.("home.start_reading_inline")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
