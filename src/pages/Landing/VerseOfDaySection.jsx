import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import useAuth from "../../hooks/useAuth";
import { getVerseOfDay, markVerseOfDaySeen } from "../../services/verseOfDay.service";
import { getVerseRoute } from "../../utils/routes";
import { SkeletonCard } from "../../components/ui/Skeleton";
import AudioSchema from "../../components/seo/AudioSchema";

export default function VerseOfDaySection() {
  const { language, t } = useLanguage() || {};
  const { token } = useAuth() || {};
  const navigate = useNavigate();
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getVerseOfDay(language)
      .then((res) => {
        if (!active) return;
        setVerse(res.data || null);
      })
      .catch(() => {
        if (active) setVerse(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [language]);

  useEffect(() => {
    if (!token || !verse?.id) return;
    markVerseOfDaySeen().catch(() => {});
  }, [token, verse?.id]);

  const verseRoute = useMemo(() => {
    if (!verse) return "";
    return getVerseRoute({
      category: verse.category,
      work: verse.work,
      subWork: verse.sub_work,
      label: verse.sub_work || verse.work,
      chapter: verse.chapter,
      verse: verse.verse,
      lang: language
    });
  }, [verse, language]);

  if (loading) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
                {t?.("home.verse_of_day") || "Verse of the Day"}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-amber-900">
                Loading...
              </h2>
            </div>
          </div>
          <div className="mt-8">
            <SkeletonCard lines={4} />
          </div>
        </div>
      </section>
    );
  }

  if (!verse) return null;

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <AudioSchema
          verse={{
            ...verse,
            route: verseRoute,
            title: `${verse.work} ${verse.chapter}:${verse.verse}`
          }}
          language={language || "en"}
        />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
              {t?.("home.verse_of_day") || "Verse of the Day"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-amber-900">
              {verse.work} {verse.sub_work ? `• ${verse.sub_work}` : ""}
            </h2>
          </div>
          <button
            onClick={() => verseRoute && navigate(verseRoute)}
            className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            {t?.("home.read_full") || "Read Full Verse"}
          </button>
        </div>

        <div className="mt-8 card-surface rounded-3xl p-8">
          <div className="flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-3 py-1 font-semibold text-amber-800">
              AudioObject SEO
            </span>
          </div>
          <div className="text-sm text-muted">
            Chapter {verse.chapter} • Verse {verse.verse}
          </div>
          <p className="mt-4 text-xl leading-relaxed text-amber-900">
            {verse.sanskrit}
          </p>
          {verse.translation && (
            <p className="mt-4 text-sm text-muted">
              {verse.translation}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
