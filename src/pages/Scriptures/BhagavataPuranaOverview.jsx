import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Verse from "../../components/shloka/Verse";
import useLanguage from "../../hooks/useLanguage";

const CANTOS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  label: `Skandha ${i + 1}`,
  summary:
    i === 1
      ? "Cosmic questions and the essence of bhakti."
      : i === 10
      ? "Krishna’s divine pastimes in Vrindavan."
      : i === 12
      ? "Teachings for Kali Yuga and closing wisdom."
      : "Stories of sages, kings, and devotion."
}));

const FEATURED_VERSES = [
  {
    id: "bhag-1",
    chapter: 1,
    verse: 2,
    sanskrit: "धर्मः प्रोज्झितकैतवोऽत्र परमो निर्मत्सराणां सताम् ।",
    hi: "यहाँ कपट-धर्म का त्याग कर निर्मल भक्तों का परम धर्म है।",
    en: "Here, false religion is rejected; pure devotion is supreme.",
    bn: "এখানে কপট ধর্ম পরিত্যক্ত; বিশুদ্ধ ভক্তিই শ্রেষ্ঠ।",
    mr: "येथे कपटी धर्म त्यागला आहे; शुद्ध भक्तीच सर्वोच्च आहे.",
    te: "ఇక్కడ కపట ధర్మం త్యజించబడింది; శుద్ధ భక్తియే శ్రేష్ఠం.",
    ta: "இங்கே பொய்யான மதம் நீக்கப்படுகிறது; தூய பக்தியே உயர்ந்தது.",
    kn: "ಇಲ್ಲಿ ಕಪಟ ಧರ್ಮ ತ್ಯಜಿಸಲಾಗಿದೆ; ಶುದ್ಧ ಭಕ್ತಿಯೇ ಪರಮ."
  },
  {
    id: "bhag-2",
    chapter: 10,
    verse: 14,
    sanskrit: "जन्तवः कियते सर्वे त्रयः पुंसः शतं शतम् ।",
    hi: "सभी जीव अनेक रूपों में विचरते हैं।",
    en: "All beings wander through countless forms.",
    bn: "সব জীব অসংখ্য রূপে বিচরণ করে।",
    mr: "सर्व जीव अनेक रूपांत विचरतात.",
    te: "సర్వ జీవులు అనేక రూపాల్లో సంచరిస్తారు.",
    ta: "அனைத்து உயிர்கள் பல வடிவங்களில் சுற்றுகின்றன.",
    kn: "ಎಲ್ಲ ಜೀವಿಗಳು ಅನೇಕ ರೂಪಗಳಲ್ಲಿ ಸಂಚರಿಸುತ್ತವೆ."
  }
];

export default function BhagavataPuranaOverview() {
  const navigate = useNavigate();
  const textParam = encodeURIComponent("Bhagavata Purana");
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const filteredCantos = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return CANTOS;
    return CANTOS.filter((canto) =>
      `${canto.label} ${canto.summary}`.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="card-surface rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
              Puranic Wisdom
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-amber-900">
              {t("scripture.bhagavata")} {t("common.overview")}
            </h1>
            <p className="mt-3 text-muted">
              Explore the twelve skandhas with devotional highlights and
              featured verses.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/scriptures/puranas/${textParam}`}
                  className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {t("common.view_skandhas")}
                </Link>
                <Link
                  to="/scriptures/puranas"
                  className="rounded-full px-5 py-2 text-sm font-semibold text-amber-900 border border-amber-200/80 bg-white/70 hover:bg-white"
                >
                  {t("common.view_puranas")}
                </Link>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("common.search_skandhas")}
                className="w-full sm:max-w-xs rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr,1fr] items-start">
            <div>
              <h2 className="text-2xl font-semibold text-amber-900">
                {t("section.skandhas_themes")}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Each skandha dives into devotion, dharma, and divine stories.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {filteredCantos.map((canto) => (
                  <button
                    key={canto.id}
                    onClick={() =>
                      navigate(
                        `/scriptures/puranas/${textParam}/${canto.id}`
                      )
                    }
                    className="card-surface rounded-2xl p-4 text-left hover:-translate-y-1 hover:shadow-xl transition"
                  >
                    <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                      Skandha {canto.id}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-amber-900">
                      {canto.label}
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {canto.summary}
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
                  {filteredCantos.slice(0, 6).map((canto, index) => (
                    <div key={canto.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="h-3 w-3 rounded-full bg-amber-400" />
                        {index !== Math.min(5, filteredCantos.length - 1) && (
                          <span className="h-full w-px bg-amber-200" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-amber-900">
                          {canto.label}
                        </div>
                        <p className="text-xs text-muted">
                          {canto.summary}
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
                  Highlights to inspire devotion.
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
