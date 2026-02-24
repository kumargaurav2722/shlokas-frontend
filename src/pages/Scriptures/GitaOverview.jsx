import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Verse from "../../components/shloka/Verse";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const CHAPTERS = [
  { id: 1, label: "Arjuna Vishada Yoga", summary: "Arjuna's dilemma and despondency." },
  { id: 2, label: "Sankhya Yoga", summary: "The yoga of knowledge and duty." },
  { id: 3, label: "Karma Yoga", summary: "Path of selfless action." },
  { id: 4, label: "Jnana Karma Sanyasa", summary: "Wisdom through action." },
  { id: 5, label: "Karma Sanyasa", summary: "Renunciation and inner peace." },
  { id: 6, label: "Dhyana Yoga", summary: "Meditation and self-control." },
  { id: 7, label: "Jnana Vijnana", summary: "Knowledge of the Absolute." },
  { id: 8, label: "Aksara Brahma", summary: "The imperishable Brahman." },
  { id: 9, label: "Raja Vidya", summary: "The royal knowledge and secret." },
  { id: 10, label: "Vibhuti Yoga", summary: "Divine glories and manifestations." },
  { id: 11, label: "Visvarupa Darshana", summary: "Vision of the universal form." },
  { id: 12, label: "Bhakti Yoga", summary: "Path of devotion." },
  { id: 13, label: "Kshetra Kshetrajna", summary: "Field and knower of the field." },
  { id: 14, label: "Gunatraya Vibhaga", summary: "The three qualities of nature." },
  { id: 15, label: "Purushottama", summary: "The supreme divine person." },
  { id: 16, label: "Daivasura Sampad", summary: "Divine and demoniac natures." },
  { id: 17, label: "Shraddhatraya", summary: "Three types of faith." },
  { id: 18, label: "Moksha Sanyasa", summary: "Liberation through surrender." }
];

const FEATURED = {
  id: "gita-47",
  chapter: 2,
  verse: 47,
  sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।",
  hi: "तुम्हारा अधिकार केवल कर्म करने में है।",
  en: "You have the right to perform your duty, not to the results.",
  bn: "তোমার অধিকার শুধু কর্মে, ফলের উপর নয়।",
  mr: "तुला फक्त कर्म करण्याचा अधिकार आहे, फळांवर नाही.",
  te: "నీకు హక్కు కేవలం కర్మ చేయడమే, ఫలాలపై కాదు.",
  ta: "உனக்கு உரியது செயல்படுவது மட்டுமே, பலன்கள் அல்ல.",
  kn: "ನಿನಗೆ ಹಕ್ಕು ಕರ್ಮ ಮಾಡುವುದರಲ್ಲಿ ಮಾತ್ರ, ಫಲಗಳ ಮೇಲೆ ಅಲ್ಲ."
};

export default function GitaOverview() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [query, setQuery] = useState("");

  const filteredChapters = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return CHAPTERS;
    return CHAPTERS.filter((chapter) =>
      `${chapter.label} ${chapter.summary}`.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="card-surface rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
              Core Scripture
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-amber-900">
              {t("scripture.gita")} {t("common.overview")}
            </h1>
            <p className="mt-3 text-muted">
              Scan key chapters, then jump into featured verses with
              translations and audio.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Link
                  to={withLangPrefix("/bhagavad-gita", language)}
                  className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {t("common.view_chapters")}
                </Link>
                <Link
                  to={withLangPrefix("/bhagavad-gita", language)}
                  className="rounded-full px-5 py-2 text-sm font-semibold text-amber-900 border border-amber-200/80 bg-white/70 hover:bg-white"
                >
                  {t("common.explore_collections")}
                </Link>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("common.search_chapters")}
                className="w-full sm:max-w-xs rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr,1fr] items-start">
            <div>
              <h2 className="text-2xl font-semibold text-amber-900">
                {t("section.chapters_themes")}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Each chapter carries a distinct focus on dharma, devotion, or
                wisdom.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {filteredChapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() =>
                      navigate(
                        withLangPrefix(`/bhagavad-gita/chapter-${chapter.id}`, language)
                      )
                    }
                    className="card-surface rounded-2xl p-4 text-left hover:-translate-y-1 hover:shadow-xl transition"
                  >
                    <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                      Chapter {chapter.id}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-amber-900">
                      {chapter.label}
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {chapter.summary}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <aside className="card-surface rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-900">
                  {t("common.timeline")}
                </h3>
                <div className="mt-4 space-y-4">
                  {filteredChapters.slice(0, 6).map((chapter, index) => (
                    <div key={chapter.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="h-3 w-3 rounded-full bg-amber-400" />
                        {index !== 5 && (
                          <span className="h-full w-px bg-amber-200" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-amber-900">
                          Chapter {chapter.id}
                        </div>
                        <p className="text-xs text-muted">
                          {chapter.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="card-surface rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-amber-900">
                  {t("common.featured_verses")}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Curated highlights for quick inspiration.
                </p>
                <div className="mt-4">
                  <Verse verse={FEATURED} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
