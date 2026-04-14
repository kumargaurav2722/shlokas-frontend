import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";
import { getVerseOfDay } from "../../services/verseOfDay.service";
import {
  formatVerseReference,
  normalizeTextRecord
} from "../../utils/text";

export default function HeroSection() {
  const { language, t } = useLanguage() || {};
  const [verse, setVerse] = useState(null);

  useEffect(() => {
    let active = true;
    getVerseOfDay(language)
      .then((res) => {
        if (active) setVerse(res.data || null);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [language]);

  const safeVerse = useMemo(() => normalizeTextRecord(verse), [verse]);

  const sanskrit = safeVerse?.sanskrit || t?.("home.hero_fallback_sanskrit");
  const translation =
    safeVerse?.translation || t?.("home.hero_fallback_translation");
  const label = safeVerse
    ? formatVerseReference({
      work: safeVerse.work,
      subWork: safeVerse.sub_work,
      chapter: safeVerse.chapter,
      verse: safeVerse.verse,
      t
    })
    : t?.("home.hero_fallback_reference");

  return (
    <section className="section-shell animate-fade-up">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 items-center md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-900 shadow-sm">
              {t?.("home.hero_badge")}
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-amber-900 md:text-5xl">
              {t?.("home.hero_title")}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              {t?.("home.hero_description")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-amber-600 hover:to-orange-600"
                to={withLangPrefix("/scriptures", language)}
              >
                {t?.("home.hero_cta_read")}
              </Link>
              <Link
                className="rounded-full border border-amber-300 bg-white/80 px-6 py-3 text-sm font-semibold text-amber-900 hover:bg-white"
                to={withLangPrefix("/chat", language)}
              >
                {t?.("home.hero_cta_ask")}
              </Link>
            </div>
            <div className="mt-8 glow-divider" />
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-amber-900/80">
              <span>{t?.("home.hero_feature_audio")}</span>
              <span>{t?.("home.hero_feature_reflections")}</span>
              <span>{t?.("home.hero_feature_study")}</span>
            </div>
          </div>

          <div className="card-surface gold-shadow rounded-3xl p-6">
            <div className="rounded-2xl bg-white/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-700">
                {t?.("home.verse_of_day")}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-amber-900">
                {sanskrit}
              </h3>
              <p className="mt-4 text-muted">{translation}</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  ॐ
                </span>
                <div>
                  <p className="text-sm font-semibold text-amber-900">
                    {label}
                  </p>
                  <p className="text-xs text-muted">
                    {t?.("home.hero_daily_wisdom")}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-white">
              <p className="text-sm">{t?.("home.hero_journey_title")}</p>
              <p className="text-xs opacity-90">
                {t?.("home.hero_journey_description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
