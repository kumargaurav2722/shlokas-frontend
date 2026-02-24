import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const CATEGORIES = [
  {
    titleKey: "scripture.vedas",
    subtitleKey: "landing.category_desc",
    to: "/scriptures/vedas"
  },
  {
    titleKey: "scripture.upanishads",
    subtitleKey: "landing.category_desc",
    to: "/upanishads"
  },
  {
    titleKey: "scripture.puranas",
    subtitleKey: "landing.category_desc",
    to: "/scriptures/puranas"
  },
  {
    titleKey: "scripture.gita",
    subtitleKey: "landing.category_desc",
    to: "/bhagavad-gita"
  },
  {
    titleKey: "scripture.ramayana",
    subtitleKey: "landing.category_desc",
    to: "/scriptures/ramayana"
  },
  {
    titleKey: "scripture.mahabharata",
    subtitleKey: "landing.category_desc",
    to: "/scriptures/mahabharata"
  }
];

export default function Categories() {
  const { t, language } = useLanguage();

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
            {t("landing.explore")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-amber-900">
            {t("landing.scriptures_traditions")}
          </h2>
          <p className="mt-3 text-muted">
            {t("landing.choose_tradition")}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((item) => (
            <div
              key={item.to}
              className="card-surface rounded-3xl p-6 flex flex-col gap-4"
            >
              <div className="h-16 rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100" />
              <div>
                <h3 className="text-lg font-semibold text-amber-900">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {t(item.subtitleKey)}
                </p>
              </div>
              <Link
                to={withLangPrefix(item.to, language)}
                className="text-sm font-semibold text-amber-800"
              >
                {t("landing.begin_journey")}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
