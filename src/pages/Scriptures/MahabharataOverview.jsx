import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Verse from "../../components/shloka/Verse";
import useLanguage from "../../hooks/useLanguage";

const PARVAS = [
  { id: 1, label: "Adi Parva", summary: "Origins of the Kuru dynasty." },
  { id: 2, label: "Sabha Parva", summary: "The royal court and the dice game." },
  { id: 3, label: "Vana Parva", summary: "Exile in the forest." },
  { id: 4, label: "Virata Parva", summary: "Disguised life in Virata’s kingdom." },
  { id: 5, label: "Udyoga Parva", summary: "Preparations for war." },
  { id: 6, label: "Bhishma Parva", summary: "The Bhagavad Gita and the battle begins." },
  { id: 7, label: "Drona Parva", summary: "The war intensifies." },
  { id: 8, label: "Karna Parva", summary: "Karna’s valour in battle." },
  { id: 9, label: "Shalya Parva", summary: "The war reaches its climax." },
  { id: 10, label: "Sauptika Parva", summary: "Night raid and aftermath." },
  { id: 11, label: "Stri Parva", summary: "Lamentations after the war." },
  { id: 12, label: "Shanti Parva", summary: "Teachings on dharma and governance." },
  { id: 13, label: "Anushasana Parva", summary: "Ethics, duties, and conduct." },
  { id: 14, label: "Ashvamedhika Parva", summary: "The horse sacrifice." },
  { id: 15, label: "Ashramavasika Parva", summary: "Retirement to the forest." },
  { id: 16, label: "Mausala Parva", summary: "The end of the Yadava clan." },
  { id: 17, label: "Mahaprasthanika Parva", summary: "The great journey." },
  { id: 18, label: "Svargarohana Parva", summary: "Ascent to heaven." }
];

const FEATURED_VERSES = [
  {
    id: "maha-1",
    chapter: 1,
    verse: 1,
    sanskrit: "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।",
    hi: "धर्मभूमि कुरुक्षेत्र में युद्ध के लिए एकत्र हुए।",
    en: "On the field of dharma, the armies assembled.",
    bn: "ধর্মক্ষেত্রে সেনারা সমবেত হলো।",
    mr: "धर्मभूमीवर सेना एकत्र झाली.",
    te: "ధర్మక్షేత్రంలో సేనలు సమవేతమయ్యాయి.",
    ta: "தர்மக் களத்தில் படைகள் கூடியன.",
    kn: "ಧರ್ಮಕ್ಷೇತ್ರದಲ್ಲಿ ಸೇನೆಗಳು ಸೇರಿವೆ."
  },
  {
    id: "maha-2",
    chapter: 2,
    verse: 11,
    sanskrit: "अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे ।",
    hi: "तुम शोक करने योग्य नहीं, फिर भी शोक कर रहे हो।",
    en: "You grieve for what is not worthy of grief.",
    bn: "যে বিষয়ে শোক করা উচিত নয়, তুমি সেই বিষয়ে শোক করছ।",
    mr: "शोक करण्यास अयोग्य गोष्टींसाठी तू शोक करतोस.",
    te: "శోకించడానికి అర్హం కాని విషయాల కోసం నీవు శోకిస్తున్నావు.",
    ta: "துக்கப்படத் தகாதவற்றிற்காக நீ துக்கப்படுகிறாய்.",
    kn: "ಶೋಕಿಸಬಾರದ ವಿಷಯಗಳಿಗೆ ನೀನು ಶೋಕಿಸುತ್ತಿದ್ದೀ."
  }
];

export default function MahabharataOverview() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const filteredParvas = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return PARVAS;
    return PARVAS.filter((parva) =>
      `${parva.label} ${parva.summary}`.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="card-surface rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
              Grand Epic
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-amber-900">
              {t("scripture.mahabharata")} {t("common.overview")}
            </h1>
            <p className="mt-3 text-muted">
              Navigate the eighteen parvas and explore the epic’s teachings.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/scriptures/mahabharata"
                  className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {t("common.view_mahabharata")}
                </Link>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("common.search_parvas")}
                className="w-full sm:max-w-xs rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr,1fr] items-start">
            <div>
              <h2 className="text-2xl font-semibold text-amber-900">
                {t("section.parvas_themes")}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Each parva captures a phase of the Mahabharata journey.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {filteredParvas.map((parva) => (
                  <button
                    key={parva.id}
                    onClick={() =>
                      navigate(
                        `/scriptures/mahabharata/${encodeURIComponent(
                          parva.label
                        )}`
                      )
                    }
                    className="card-surface rounded-2xl p-4 text-left hover:-translate-y-1 hover:shadow-xl transition"
                  >
                    <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                      Parva {parva.id}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-amber-900">
                      {parva.label}
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {parva.summary}
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
                  {filteredParvas.map((parva, index) => (
                    <div key={parva.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="h-3 w-3 rounded-full bg-amber-400" />
                        {index !== filteredParvas.length - 1 && (
                          <span className="h-full w-px bg-amber-200" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-amber-900">
                          {parva.label}
                        </div>
                        <p className="text-xs text-muted">
                          {parva.summary}
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
                  Key verses to frame the epic.
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
