import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Verse from "../../components/shloka/Verse";
import { getWorks, getSubWorkStats } from "../../services/scripture.service";
import { getTextRoute } from "../../utils/routes";
import useLanguage from "../../hooks/useLanguage";
import { SkeletonList } from "../../components/ui/Skeleton";

const CATEGORY_MAP = {
  gita: { category: "itihasa", work: "Mahabharata", subWork: "Bhagavad Gita" },
  mahabharata: { category: "itihasa", work: "Mahabharata", subWork: "Bhagavad Gita" },
  vedas: { category: "veda" },
  upanishads: { category: "upanishad", work: "Upanishads" },
  puranas: { category: "purana" },
  ramayana: { category: "itihasa", work: "Ramayana" }
};

export default function TextList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t, language } = useLanguage();

  const overviewMap = {
    vedas: {
      title: `${t("scripture.vedas")} ${t("common.overview")}`,
      summary:
        "The four Vedas form the foundation of Vedic wisdom, covering hymns, rituals, and philosophy.",
      featured: {
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
      }
    },
    upanishads: {
      title: `${t("scripture.upanishads")} ${t("common.overview")}`,
      summary:
        "The Upanishads illuminate the inner self, the nature of reality, and the path to liberation.",
      featured: {
        id: "upa-1",
        chapter: 1,
        verse: 1,
        sanskrit: "ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते ।",
        hi: "यह पूर्ण है, वह पूर्ण है।",
        en: "That is whole, this is whole; from the whole, the whole arises.",
        bn: "ওটাই পূর্ণ, এটাও পূর্ণ; পূর্ণ থেকে পূর্ণেরই উদ্ভব।",
        mr: "ते पूर्ण आहे, हेही पूर्ण आहे; पूर्णातूनच पूर्ण उत्पन्न होते.",
        te: "అది సంపూర్ణం, ఇది సంపూర్ణం; సంపూర్ణం నుండి సంపూర్ణమే ఉద్భవిస్తుంది.",
        ta: "அது முழுமை, இது முழுமை; முழுமையிலிருந்து முழுமையே தோன்றுகிறது.",
        kn: "ಅದು ಸಂಪೂರ್ಣ, ಇದು ಕೂಡ ಸಂಪೂರ್ಣ; ಸಂಪೂರ್ಣದಿಂದ ಸಂಪೂರ್ಣವೇ ಉತ್ಪನ್ನವಾಗುತ್ತದೆ."
      }
    },
    puranas: {
      title: `${t("scripture.puranas")} ${t("common.overview")}`,
      summary:
        "Puranas preserve devotional stories, cosmic cycles, and dharmic guidance for daily life.",
      featured: {
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
      }
    },
    gita: {
      title: `${t("scripture.gita")} ${t("common.overview")}`,
      summary:
        "A timeless dialogue on duty, devotion, and inner mastery.",
      featured: {
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
      }
    },
    ramayana: {
      title: `${t("scripture.ramayana")} ${t("common.overview")}`,
      summary:
        "The epic journey of Lord Rama, celebrating dharma, devotion, and courage.",
      featured: {
        id: "ram-1",
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
      }
    },
    mahabharata: {
      title: `${t("scripture.mahabharata")} ${t("common.overview")}`,
      summary:
        "A vast epic of dharma, conflict, and the quest for righteousness.",
      featured: {
        id: "maha-1",
        chapter: 1,
        verse: 1,
        sanskrit: "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।",
        hi: "धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए।",
        en: "On the field of dharma, the armies assembled to battle.",
        bn: "ধর্মক্ষেত্রে সেনারা সমবেত হলো।",
        mr: "धर्मभूमीवर सेना एकत्र झाली.",
        te: "ధర్మక్షేత్రంలో సేనలు సమవేతమయ్యాయి.",
        ta: "தர்மக் களத்தில் படைகள் கூடியன.",
        kn: "ಧರ್ಮಕ್ಷೇತ್ರದಲ್ಲಿ ಸೇನೆಗಳು ಸೇರಿವೆ."
      }
    }
  };

  useEffect(() => {
    let active = true;
    const config = CATEGORY_MAP[category] || {};
    setLoading(true);
    setError("");

    const load = async () => {
      try {
        if (category === "gita" || category === "mahabharata") {
          const label = config.subWork || "Bhagavad Gita";
          const next = [
            {
              label,
              work: config.work || "Mahabharata",
              subWork: config.subWork || "Bhagavad Gita",
              chapterCount: 18,
              verseCount: undefined
            }
          ];
          if (active) setItems(next);
          return;
        }

        if (category === "upanishads") {
          const res = await getSubWorkStats(config.work, config.category);
          const list = res.data || [];
          const next = list.map((row) => ({
            label: row.sub_work,
            work: config.work,
            subWork: row.sub_work,
            chapterCount: row.chapter_count,
            verseCount: row.verse_count
          }));
          if (active) setItems(next);
          return;
        }

        if (category === "ramayana") {
          const [valmikiRes, manasRes] = await Promise.all([
            getSubWorkStats("Ramayana", config.category),
            getSubWorkStats("Ramcharitmanas", config.category)
          ]);
          const valmiki = (valmikiRes.data || []).map((row) => ({
            label: `Valmiki Ramayana – ${row.sub_work}`,
            work: "Ramayana",
            subWork: row.sub_work,
            chapterCount: row.chapter_count,
            verseCount: row.verse_count
          }));
          const manas = (manasRes.data || []).map((row) => ({
            label: `Ramcharitmanas – ${row.sub_work}`,
            work: "Ramcharitmanas",
            subWork: row.sub_work,
            chapterCount: row.chapter_count,
            verseCount: row.verse_count
          }));
          if (active) setItems([...valmiki, ...manas]);
          return;
        }

        if (category === "vedas" || category === "puranas") {
          const res = await getWorks(config.category);
          const rows = res.data || [];
          const grouped = rows.reduce((acc, row) => {
            acc[row.work] = acc[row.work] || [];
            if (row.sub_work) acc[row.work].push(row.sub_work);
            return acc;
          }, {});

          const next = [];
          for (const work of Object.keys(grouped)) {
            const statsRes = await getSubWorkStats(work, config.category);
            const stats = statsRes.data || [];
            stats.forEach((row) => {
              next.push({
                label: `${work} – ${row.sub_work}`,
                work,
                subWork: row.sub_work,
                chapterCount: row.chapter_count,
                verseCount: row.verse_count
              });
            });
          }
          if (active) setItems(next);
          return;
        }

        if (config.work) {
          const res = await getSubWorkStats(config.work, config.category);
          const rows = res.data || [];
          const next = rows.map((row) => ({
            label: row.sub_work || config.work,
            work: config.work,
            subWork: row.sub_work,
            chapterCount: row.chapter_count,
            verseCount: row.verse_count
          }));
          if (active) setItems(next);
          return;
        }

        if (active) setItems([]);
      } catch (err) {
        if (active) {
          setError("Backend not connected yet. Showing cached content.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [category]);

  const overview = overviewMap[category];
  const filteredTexts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(term)
    );
  }, [query, items]);

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-amber-900 mb-3 capitalize">
            {t(`scripture.${category}`) === `scripture.${category}`
              ? category
              : t(`scripture.${category}`)}
          </h2>
          <p className="text-muted mb-6">
            Select a text to explore chapters and verses.
          </p>

          {overview && (
            <div className="card-surface rounded-3xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-amber-900">
                {overview.title}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {overview.summary}
              </p>
              <div className="mt-6">
                <Verse verse={overview.featured} />
              </div>
            </div>
          )}

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              {t("common.view_texts")}: {filteredTexts.length}
            </p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("common.search_texts")}
              className="w-full max-w-xs rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
            />
          </div>

          {error && (
            <p className="mb-6 text-sm text-amber-700">{error}</p>
          )}
          {loading && filteredTexts.length === 0 && (
            <SkeletonList count={6} />
          )}

          {!loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTexts.map((item) => {
                const link = getTextRoute({
                  category,
                  work: item.work,
                  subWork: item.subWork,
                  label: item.label,
                  lang: language
                });

                return (
                  <div
                    key={`${item.work}-${item.subWork}-${item.label}`}
                    onClick={() => navigate(link)}
                    className="card-surface rounded-2xl p-6 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition"
                  >
                    <h3 className="text-lg font-semibold text-amber-900">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {item.chapterCount ? `${item.chapterCount} chapters` : ""}
                      {item.verseCount
                        ? ` • ${item.verseCount} verses`
                        : ""}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          {!loading && filteredTexts.length === 0 && (
            <p className="mt-8 text-sm text-muted">
              Content will appear here once the backend is connected.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
