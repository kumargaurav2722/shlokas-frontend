import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Verse from "../../components/shloka/Verse";
import useLanguage from "../../hooks/useLanguage";

const PURANAS = [
  { id: 1, label: "Bhagavata Purana", summary: "Devotion to Krishna and divine stories." },
  { id: 2, label: "Vishnu Purana", summary: "Cosmology and Vishnu’s avatars." },
  { id: 3, label: "Shiva Purana", summary: "Legends and worship of Lord Shiva." },
  { id: 4, label: "Brahma Purana", summary: "Creation stories and pilgrimage lore." },
  { id: 5, label: "Markandeya Purana", summary: "Devi Mahatmya and dharmic teachings." },
  { id: 6, label: "Padma Purana", summary: "Sacred geography and spiritual practice." }
];

const FEATURED_VERSES = [
  {
    id: "pur-1",
    chapter: 1,
    verse: 2,
    sanskrit: "धर्मः प्रोज्झितकैतवोऽत्र परमो निर्मत्सराणां सताम् ।",
    hi: "यहाँ परम धर्म का वर्णन है।",
    en: "Here, pure devotion is the highest truth.",
    bn: "এখানে বিশুদ্ধ ভক্তিই সর্বোচ্চ সত্য।",
    mr: "येथे शुद्ध भक्ती हेच सर्वोच्च सत्य आहे.",
    te: "ఇక్కడ శుద్ధ భక్తియే అత్యుత్తమ సత్యం.",
    ta: "இங்கே தூய பக்தியே உயர்ந்த சத்தியம்.",
    kn: "ಇಲ್ಲಿ ಶುದ್ಧ ಭಕ್ತಿಯೇ ಪರಮ ಸತ್ಯ."
  },
  {
    id: "pur-2",
    chapter: 2,
    verse: 6,
    sanskrit: "स वै पुंसां परो धर्मो यतो भक्तिरधोक्षजे ।",
    hi: "वही परम धर्म है जिससे भगवान में भक्ति हो।",
    en: "The highest dharma awakens devotion to the Divine.",
    bn: "সর্বোচ্চ ধর্ম ঈশ্বরের প্রতি ভক্তি জাগায়।",
    mr: "सर्वोच्च धर्म देवाप्रती भक्ती जागवतो.",
    te: "అత్యున్నత ధర్మం దైవభక్తిని జగిస్తుంది.",
    ta: "உயர்ந்த தர்மம் இறைபக்தியை எழுப்புகிறது.",
    kn: "ಅತ್ಯುತ್ತಮ ಧರ್ಮ ದೇವಭಕ್ತಿಯನ್ನು ಜಾಗೃತಗೊಳಿಸುತ್ತದೆ."
  }
];

export default function PuranasOverview() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const filteredPuranas = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return PURANAS;
    return PURANAS.filter((purana) =>
      `${purana.label} ${purana.summary}`.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="card-surface rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
              Puranic Stories
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-amber-900">
              {t("scripture.puranas")} {t("common.overview")}
            </h1>
            <p className="mt-3 text-muted">
              Explore devotional stories, dharmic guidance, and cosmic cycles.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/scriptures/puranas"
                  className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {t("common.view_puranas")}
                </Link>
                <Link
                  to="/bhagavata-purana"
                  className="rounded-full px-5 py-2 text-sm font-semibold text-amber-900 border border-amber-200/80 bg-white/70 hover:bg-white"
                >
                  {t("scripture.bhagavata")} {t("common.overview")}
                </Link>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("common.search_puranas")}
                className="w-full sm:max-w-xs rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr,1fr] items-start">
            <div>
              <h2 className="text-2xl font-semibold text-amber-900">
                {t("section.major_puranas")}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Each Purana presents teachings through stories and devotion.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {filteredPuranas.map((purana) => (
                  <button
                    key={purana.id}
                    onClick={() =>
                      navigate(
                        `/scriptures/puranas/${encodeURIComponent(
                          purana.label
                        )}`
                      )
                    }
                    className="card-surface rounded-2xl p-4 text-left hover:-translate-y-1 hover:shadow-xl transition"
                  >
                    <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                      Purana {purana.id}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-amber-900">
                      {purana.label}
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {purana.summary}
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
                  {filteredPuranas.map((purana, index) => (
                    <div key={purana.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="h-3 w-3 rounded-full bg-amber-400" />
                        {index !== filteredPuranas.length - 1 && (
                          <span className="h-full w-px bg-amber-200" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-amber-900">
                          {purana.label}
                        </div>
                        <p className="text-xs text-muted">
                          {purana.summary}
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
                  Devotional highlights to begin with.
                </p>
                <div className="mt-6 space-y-6">
                  {FEATURED_VERSES.map((verse) => (
                    <Verse key={verse.id} verse={verse} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
