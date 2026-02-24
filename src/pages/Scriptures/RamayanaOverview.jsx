import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Verse from "../../components/shloka/Verse";
import useLanguage from "../../hooks/useLanguage";
import { getTextRoute } from "../../utils/routes";
import { withLangPrefix } from "../../utils/lang";

const KANDAS = [
  {
    id: 1,
    label: "Bala Kanda",
    subWork: "Bala Kanda",
    summary: "The childhood and early life of Lord Rama."
  },
  {
    id: 2,
    label: "Ayodhya Kanda",
    subWork: "Ayodhya Kanda",
    summary: "Rama’s exile and the turning point of the epic."
  },
  {
    id: 3,
    label: "Aranya Kanda",
    subWork: "Aranya Kanda",
    summary: "Forest adventures and the abduction of Sita."
  },
  {
    id: 4,
    label: "Kishkindha Kanda",
    subWork: "Kishkindha Kanda",
    summary: "Alliance with Sugriva and Hanuman’s devotion."
  },
  {
    id: 5,
    label: "Sundara Kanda",
    subWork: "Sundara Kanda",
    summary: "Hanuman’s journey to Lanka and courage."
  },
  {
    id: 6,
    label: "Yuddha Kanda",
    subWork: "Yuddha Kanda",
    summary: "The epic battle and victory of dharma."
  }
];

const FEATURED = {
  id: "ramayan-featured",
  chapter: 1,
  verse: 1,
  sanskrit: "तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम् ।",
  hi: "तप और स्वाध्याय में रत, श्रेष्ठ तपस्वी।",
  en: "Engaged in austerity and study, the foremost among the wise.",
  bn: "তপ ও অধ্যয়নে নিবেদিত, জ্ঞানীদের মধ্যে শ্রেষ্ঠ।",
  mr: "तप आणि अध्ययनात रत, ज्ञानींमध्ये श्रेष्ठ.",
  te: "తపస్సు మరియు అధ్యయనంలో నిమగ్నుడు, జ్ఞానులలో శ్రేష్ఠుడు.",
  ta: "தபம் மற்றும் படிப்பில் நிமிர்ந்த, ஞானிகளில் சிறந்தவன்.",
  kn: "ತಪಸ್ಸು ಮತ್ತು ಅಧ್ಯಯನದಲ್ಲಿ ನಿಭಾಯಿಸಿದ, ಜ್ಞಾನಿಗಳಲ್ಲಿ ಶ್ರೇಷ್ಠನು."
};

export default function RamayanaOverview() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [query, setQuery] = useState("");

  const filteredKandas = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return KANDAS;
    return KANDAS.filter((kanda) =>
      `${kanda.label} ${kanda.summary}`.toLowerCase().includes(term)
    );
  }, [query]);

  const baseRoute = "/scriptures/ramayana";

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="card-surface rounded-3xl p-8">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
              Sacred Epic
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-amber-900">
              {t("scripture.ramayana")} {t("common.overview")}
            </h1>
            <p className="mt-3 text-muted">
              Begin with an overview of the kandas, then jump into featured
              verses with translations and audio.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-3">
                <Link
                  to={withLangPrefix(baseRoute, language)}
                  className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {t("common.view_texts")}
                </Link>
                <Link
                  to={withLangPrefix(baseRoute, language)}
                  className="rounded-full px-5 py-2 text-sm font-semibold text-amber-900 border border-amber-200/80 bg-white/70 hover:bg-white"
                >
                  {t("common.explore_collections")}
                </Link>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("common.search_kandas")}
                className="w-full sm:max-w-xs rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr,1fr] items-start">
            <div>
              <h2 className="text-2xl font-semibold text-amber-900">
                {t("section.kandas_chapters")}
              </h2>
              <p className="mt-2 text-sm text-muted">
                Select a kanda to browse its chapters and verses from the backend.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {filteredKandas.map((kanda) => (
                  <button
                    key={kanda.id}
                    onClick={() =>
                      navigate(
                        getTextRoute({
                          category: "ramayana",
                          work: "Ramayana",
                          subWork: kanda.subWork,
                          label: `Ramayana ${kanda.subWork}`,
                          lang: language
                        })
                      )
                    }
                    className="card-surface rounded-2xl p-4 text-left hover:-translate-y-1 hover:shadow-xl transition"
                  >
                    <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                      Kanda {kanda.id}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-amber-900">
                      {kanda.label}
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {kanda.summary}
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
                  {filteredKandas.map((kanda, index) => (
                    <div key={kanda.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="h-3 w-3 rounded-full bg-amber-400" />
                        {index !== filteredKandas.length - 1 && (
                          <span className="h-full w-px bg-amber-200" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-amber-900">
                          {kanda.label}
                        </div>
                        <p className="text-xs text-muted">
                          {kanda.summary}
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
