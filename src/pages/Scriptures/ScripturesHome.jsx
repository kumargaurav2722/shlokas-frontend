import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const SECTIONS = [
  {
    titleKey: "scripture.vedas",
    summary:
      "Hymns, rituals, and philosophy that form the foundation of Vedic wisdom.",
    overview: "/scriptures/vedas"
  },
  {
    titleKey: "scripture.upanishads",
    summary:
      "The profound teachings that illuminate the Self and ultimate reality.",
    overview: "/upanishads"
  },
  {
    titleKey: "scripture.puranas",
    summary:
      "Devotional stories, cosmology, and dharma preserved across the ages.",
    overview: "/scriptures/puranas"
  },
  {
    titleKey: "scripture.gita",
    summary:
      "A timeless dialogue on duty, devotion, and inner mastery.",
    overview: "/bhagavad-gita"
  },
  {
    titleKey: "scripture.ramayana",
    summary:
      "The epic journey of Lord Rama, celebrating dharma and devotion.",
    overview: "/scriptures/ramayana"
  },
  {
    titleKey: "scripture.mahabharata",
    summary:
      "A vast epic exploring righteousness, conflict, and destiny.",
    overview: "/scriptures/mahabharata"
  }
];

export default function ScripturesHome() {
  const { t, language } = useLanguage();

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
              {t("home.scriptures")}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-amber-900">
              {t("home.choose_path")}
            </h1>
            <p className="mt-3 text-muted">{t("home.subtitle")}</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.map((item) => (
              <article
                key={item.overview}
                className="card-surface rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-amber-900">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.summary}</p>
                <Link
                  to={withLangPrefix(item.overview, language)}
                  className="mt-4 inline-flex text-sm font-semibold text-amber-800"
                >
                  {t("home.begin_journey")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
