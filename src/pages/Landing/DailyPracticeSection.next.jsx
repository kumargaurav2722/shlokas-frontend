import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const PRACTICES = [
  {
    titleKey: "home.practice_daily_shloka_title",
    descriptionKey: "home.practice_daily_shloka_description"
  },
  {
    titleKey: "home.practice_audio_title",
    descriptionKey: "home.practice_audio_description"
  },
  {
    titleKey: "home.practice_bookmarks_title",
    descriptionKey: "home.practice_bookmarks_description"
  }
];

export default function DailyPracticeSection() {
  const { language, t } = useLanguage() || {};

  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 items-center lg:grid-cols-[1fr,1.1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
            {t?.("home.daily_practice_badge")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-amber-900">
            {t?.("home.daily_practice_title")}
          </h2>
          <p className="mt-4 text-muted">
            {t?.("home.daily_practice_description")}
          </p>
          <Link
            to={withLangPrefix("/profile", language)}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-800"
          >
            {t?.("home.daily_practice_cta")}
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PRACTICES.map((item) => (
            <div key={item.titleKey} className="card-surface rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-amber-900">
                {t?.(item.titleKey)}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {t?.(item.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
