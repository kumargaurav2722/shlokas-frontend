import { useEffect, useMemo, useState } from "react";
import AudioPlayer from "../../components/AudioPlayer";
import useLanguage from "../../hooks/useLanguage";
import { getVerses } from "../../services/scripture.service";
import { normalizeTextRecord } from "../../utils/text";

const SUPPORTED_VERSE_LANGS = ["en", "hi", "bn", "mr", "te", "ta", "kn"];

export default function PopularShlokas() {
  const { language, t, options } = useLanguage() || {};
  const [overrideLang, setOverrideLang] = useState("");
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  const activeLang =
    overrideLang || (language && SUPPORTED_VERSE_LANGS.includes(language)
      ? language
      : "en");

  useEffect(() => {
    let active = true;
    getVerses(
      "Mahabharata",
      "Bhagavad Gita",
      2,
      "Hindi,English,Bengali,Marathi,Telugu,Tamil,Kannada"
    )
      .then((res) => {
        if (!active) return;
        const match = (res.data || []).find((item) => Number(item.verse) === 47);
        setVerse(match ? normalizeTextRecord(match) : null);
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
  }, []);

  const shloka = useMemo(() => {
    if (!verse) return null;

    return {
      id: verse.id,
      sanskrit: verse.sanskrit,
      translations: {
        en: verse.en,
        hi: verse.hi,
        bn: verse.bn,
        mr: verse.mr,
        te: verse.te,
        ta: verse.ta,
        kn: verse.kn
      }
    };
  }, [verse]);

  const getLangLabel = (code) =>
    options?.find((item) => item.value === code)?.label || code.toUpperCase();

  return (
    <section
      className="animate-fade-up px-6 py-20"
      style={{ animationDelay: "120ms" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
            {t?.("home.highlight_badge")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-amber-900">
            {t?.("home.highlight_title")}
          </h2>
          <p className="mt-3 text-muted">
            {t?.("home.highlight_description")}
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card-surface rounded-3xl p-8">
            <p className="text-xl leading-relaxed text-amber-900">
              {loading ? t?.("home.loading") : shloka?.sanskrit || ""}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SUPPORTED_VERSE_LANGS.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setOverrideLang(lang)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    activeLang === lang
                      ? "border-transparent bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "border-amber-200 bg-white/70 text-amber-900"
                  }`}
                >
                  {getLangLabel(lang)}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">
              {loading
                ? t?.("home.loading")
                : shloka?.translations?.[activeLang] || shloka?.translations?.en || ""}
            </p>
            {shloka?.id ? (
              <div className="mt-8 flex flex-wrap gap-3">
                <AudioPlayer textId={shloka.id} language="sanskrit" />
                <AudioPlayer textId={shloka.id} language="hi" />
                <AudioPlayer textId={shloka.id} language="en" />
              </div>
            ) : null}
          </div>

          <div className="card-surface flex flex-col justify-between rounded-3xl p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
                {t?.("home.highlight_ritual_badge")}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-amber-900">
                {t?.("home.highlight_ritual_title")}
              </h3>
              <p className="mt-3 text-muted">
                {t?.("home.highlight_ritual_description")}
              </p>
            </div>
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-white">
              <p className="text-sm">{t?.("home.highlight_ritual_cta")}</p>
              <p className="text-xs opacity-90">
                {t?.("home.highlight_ritual_subtitle")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
