import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Verse from "../../components/shloka/Verse";
import useLanguage from "../../hooks/useLanguage";

const UPANISHADS = [
  { id: 1, label: "Isha Upanishad", summary: "Seeing the One in all." },
  { id: 2, label: "Kena Upanishad", summary: "Who moves the mind and senses." },
  { id: 3, label: "Katha Upanishad", summary: "Nachiketa’s dialogue on the Self." },
  { id: 4, label: "Prashna Upanishad", summary: "Six seekers ask six profound questions." },
  { id: 5, label: "Mundaka Upanishad", summary: "Knowledge that liberates." },
  { id: 6, label: "Mandukya Upanishad", summary: "The syllable Om and consciousness." },
  { id: 7, label: "Taittiriya Upanishad", summary: "Bliss and the layers of being." },
  { id: 8, label: "Aitareya Upanishad", summary: "Creation and the inner Self." },
  { id: 9, label: "Chandogya Upanishad", summary: "Meditations on the Absolute." },
  { id: 10, label: "Brihadaranyaka Upanishad", summary: "Expansive dialogues on Brahman." }
];

const FEATURED_VERSES = [
  {
    id: "upa-1",
    chapter: 1,
    verse: 1,
    sanskrit: "ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।",
    hi: "यह सम्पूर्ण जगत ईश्वर से आवृत है।",
    en: "All this, whatever exists in the universe, is pervaded by the Lord.",
    bn: "এই বিশ্বে যা কিছু আছে, সবই ঈশ্বর দ্বারা পূর্ণ।",
    mr: "या जगात जे काही आहे ते सर्व ईश्वराने व्यापलेले आहे.",
    te: "ఈ విశ్వంలో ఉన్నదంతా ఈశ్వరుడి వల్ల వ్యాప్తమై ఉంది.",
    ta: "இந்த உலகில் உள்ள அனைத்தும் இறைவனால் நிறைந்துள்ளது.",
    kn: "ಈ ವಿಶ್ವದಲ್ಲಿರುವ ಎಲ್ಲವೂ ದೇವರಿಂದ ವ್ಯಾಪಿಸಿದೆ."
  },
  {
    id: "upa-2",
    chapter: 2,
    verse: 3,
    sanskrit: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।",
    hi: "उठो, जागो और श्रेष्ठ ज्ञान प्राप्त करो।",
    en: "Arise, awake, and learn from the wise.",
    bn: "উঠো, জাগো, জ্ঞানীদের থেকে শেখো।",
    mr: "उठा, जागे व्हा आणि ज्ञानींकडून शिका.",
    te: "లేచి, జాగృతం అయ్యి, జ్ఞానుల నుండి నేర్చుకోండి.",
    ta: "எழுந்து, விழித்து, ஞானிகளிடமிருந்து கற்றுக்கொள்.",
    kn: "ಎದ್ದು, ಜಾಗೃತರಾಗಿರಿ ಮತ್ತು ಜ್ಞಾನಿಗಳಿಂದ ಕಲಿಯಿರಿ."
  }
];

export default function UpanishadsOverview() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  const filteredUpanishads = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return UPANISHADS;
    return UPANISHADS.filter((upanishad) =>
      `${upanishad.label} ${upanishad.summary}`.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="card-surface rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
              Inner Wisdom
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-amber-900">
              {t("scripture.upanishads")} {t("common.overview")}
            </h1>
            <p className="mt-3 text-muted">
              Meditative teachings that reveal the Self and ultimate reality.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/scriptures/upanishads"
                  className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {t("common.view_upanishads")}
                </Link>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("common.search_upanishads")}
                className="w-full sm:max-w-xs rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr,1fr] items-start">
            <div>
              <h2 className="text-2xl font-semibold text-amber-900">
                {t("section.major_upanishads")}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Choose an Upanishad to begin a contemplative journey.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {filteredUpanishads.map((upanishad) => (
                  <button
                    key={upanishad.id}
                    onClick={() =>
                      navigate(
                        `/scriptures/upanishads/${encodeURIComponent(
                          upanishad.label
                        )}`
                      )
                    }
                    className="card-surface rounded-2xl p-4 text-left hover:-translate-y-1 hover:shadow-xl transition"
                  >
                    <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                      Upanishad {upanishad.id}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-amber-900">
                      {upanishad.label}
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {upanishad.summary}
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
                  {filteredUpanishads.map((upanishad, index) => (
                    <div key={upanishad.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="h-3 w-3 rounded-full bg-amber-400" />
                        {index !== filteredUpanishads.length - 1 && (
                          <span className="h-full w-px bg-amber-200" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-amber-900">
                          {upanishad.label}
                        </div>
                        <p className="text-xs text-muted">
                          {upanishad.summary}
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
                  Contemplative passages to reflect upon.
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
