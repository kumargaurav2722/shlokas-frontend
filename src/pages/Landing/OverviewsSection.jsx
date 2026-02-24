import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const SECTIONS = [
  {
    labelKey: "section.four_vedas",
    to: "/scriptures/vedas"
  },
  {
    labelKey: "section.major_upanishads",
    to: "/upanishads"
  },
  {
    labelKey: "section.major_puranas",
    to: "/scriptures/puranas"
  },
  {
    labelKey: "section.kandas_chapters",
    to: "/scriptures/ramayana"
  },
  {
    labelKey: "section.parvas_themes",
    to: "/scriptures/mahabharata"
  },
  {
    labelKey: "section.chapters_themes",
    to: "/bhagavad-gita"
  }
];

export default function OverviewsSection() {
  const { t, language } = useLanguage();

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((item) => (
            <Link
              key={item.to}
              to={withLangPrefix(item.to, language)}
              className="card-surface rounded-2xl p-6 text-amber-900 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-amber-700">
                {t("common.explore_collections")}
              </span>
              <h3 className="mt-3 text-lg font-semibold">
                {t(item.labelKey)}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {t("landing.category_desc")}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
