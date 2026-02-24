import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Verse from "../../components/shloka/Verse";
import useLanguage from "../../hooks/useLanguage";

const VEDAS = [
  {
    id: 1,
    label: "Rigveda",
    summary: "Hymns praising cosmic order and the divine."
  },
  {
    id: 2,
    label: "Yajurveda",
    summary: "Ritual formulas and ceremonial guidance."
  },
  {
    id: 3,
    label: "Samaveda",
    summary: "Melodic chants for sacred recitation."
  },
  {
    id: 4,
    label: "Atharvaveda",
    summary: "Daily life prayers, healing, and protection."
  }
];

const FEATURED_VERSES = [
  {
    id: "veda-1",
    chapter: 1,
    verse: 1,
    sanskrit: "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ।",
    hi: "हम अग्नि देव का स्तवन करते हैं।",
    en: "We praise Agni, the priest of the sacrifice.",
    bn: "যজ্ঞের পুরোহিত অগ্নিকে আমরা স্তব করি।",
    mr: "यज्ञाचे पुरोहित अग्नीचे आम्ही स्तवन करतो.",
    te: "యజ్ఞపు పురోహితుడైన అగ్ని దేవుని మేము స్తుతిస్తాము.",
    ta: "யாகத்தின் புரோகிதரான அக்னியை நாம் போற்றுகிறோம்.",
    kn: "ಯಜ್ಞದ ಪುರೋಹಿತ ಅಗ್ನಿಯನ್ನು ನಾವು ಸ್ತುತಿಸುತ್ತೇವೆ."
  },
  {
    id: "veda-2",
    chapter: 3,
    verse: 62,
    sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं ।",
    hi: "हम सविता के दिव्य प्रकाश का ध्यान करते हैं।",
    en: "We meditate on the divine light of Savitar.",
    bn: "আমরা সবিতার দিব্য আলোয় ধ্যান করি।",
    mr: "आम्ही सविताच्या दिव्य प्रकाशाचे ध्यान करतो.",
    te: "సవితృ దేవుని దివ్య ప్రకాశంపై ధ్యానం చేస్తాము.",
    ta: "சவிதாவின் தெய்வ ஒளியை நாங்கள் தியானிக்கிறோம்.",
    kn: "ಸವಿತನ ದಿವ್ಯ ಪ್ರಕಾಶವನ್ನು ನಾವು ಧ್ಯಾನಿಸುತ್ತೇವೆ."
  }
];

export default function VedasOverview() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const filteredVedas = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return VEDAS;
    return VEDAS.filter((veda) =>
      `${veda.label} ${veda.summary}`.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="card-surface rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
              Foundations
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-amber-900">
              {t("scripture.vedas")} {t("common.overview")}
            </h1>
            <p className="mt-3 text-muted">
              The four Vedas are the spiritual foundation of Sanatana Dharma.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/scriptures/vedas"
                  className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {t("common.view_vedas")}
                </Link>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("common.search_vedas")}
                className="w-full sm:max-w-xs rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr,1fr] items-start">
            <div>
              <h2 className="text-2xl font-semibold text-amber-900">
                {t("section.four_vedas")}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Each Veda focuses on a different aspect of spiritual life.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {filteredVedas.map((veda) => (
                  <button
                    key={veda.id}
                    onClick={() =>
                      navigate(
                        `/scriptures/vedas/${encodeURIComponent(veda.label)}`
                      )
                    }
                    className="card-surface rounded-2xl p-4 text-left hover:-translate-y-1 hover:shadow-xl transition"
                  >
                    <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                      Veda {veda.id}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-amber-900">
                      {veda.label}
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {veda.summary}
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
                  {filteredVedas.map((veda, index) => (
                    <div key={veda.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="h-3 w-3 rounded-full bg-amber-400" />
                        {index !== filteredVedas.length - 1 && (
                          <span className="h-full w-px bg-amber-200" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-amber-900">
                          {veda.label}
                        </div>
                        <p className="text-xs text-muted">
                          {veda.summary}
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
                  Curated hymns to set the tone.
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
