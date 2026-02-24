import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";
import { getVerseOfDay } from "../../services/verseOfDay.service";

export default function HeroSection() {
  const { language } = useLanguage();
  const [verse, setVerse] = useState(null);

  useEffect(() => {
    let active = true;
    getVerseOfDay(language)
      .then((res) => {
        if (active) setVerse(res.data || null);
      })
      .catch(() => { });
    return () => { active = false; };
  }, [language]);

  const sanskrit = verse?.sanskrit || "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन";
  const translation = verse?.translation || "You have the right to perform your duty, but not to the fruits of your actions.";
  const label = verse
    ? `${verse.sub_work || verse.work} ${verse.chapter}.${verse.verse}`
    : "Bhagavad Gita 2.47";

  return (
    <section className="section-shell animate-fade-up">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-900 shadow-sm">
              Sacred Wisdom
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl font-semibold leading-tight text-amber-900">
              Timeless Shlokas, modern guidance for everyday life.
            </h1>
            <p className="mt-4 text-lg text-muted max-w-xl">
              Listen, read, and reflect on the Bhagavad Gita, Vedas, and Upanishads
              through a calm, devotional experience in your language.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                to={withLangPrefix("/scriptures", language)}
              >
                Start Reading
              </Link>
              <Link
                className="rounded-full px-6 py-3 text-sm font-semibold text-amber-900 border border-amber-300 bg-white/80 hover:bg-white"
                to={withLangPrefix("/chat", language)}
              >
                Ask the Gita
              </Link>
            </div>
            <div className="mt-8 glow-divider" />
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-amber-900/80">
              <span>Audio in multiple languages</span>
              <span>Daily reflections</span>
              <span>Guided study paths</span>
            </div>
          </div>

          <div className="card-surface rounded-3xl p-6 gold-shadow">
            <div className="rounded-2xl bg-white/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-amber-700">
                Verse of the Day
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-amber-900">
                {sanskrit}
              </h3>
              <p className="mt-4 text-muted">
                {translation}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  ॐ
                </span>
                <div>
                  <p className="text-sm font-semibold text-amber-900">
                    {label}
                  </p>
                  <p className="text-xs text-muted">Daily Wisdom</p>
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-white">
              <p className="text-sm">Start a 7‑day guided journey</p>
              <p className="text-xs opacity-90">
                curated for calm, clarity, and purpose
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
