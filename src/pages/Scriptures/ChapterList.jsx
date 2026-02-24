import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Verse from "../../components/shloka/Verse";
import { getWorks, getSubWorks, getChapterStats } from "../../services/scripture.service";
import useLanguage from "../../hooks/useLanguage";
import { getChapterRoute, getTextRoute, matchBySlug, matchBySlugLoose, slugify } from "../../utils/routes";
import { SkeletonList } from "../../components/ui/Skeleton";

const CATEGORY_MAP = {
  gita: { category: "itihasa", work: "Mahabharata", subWork: "Bhagavad Gita" },
  mahabharata: { category: "itihasa", work: "Mahabharata", subWork: "Bhagavad Gita" },
  vedas: { category: "veda" },
  upanishads: { category: "upanishad", work: "Upanishads" },
  puranas: { category: "purana" },
  ramayana: { category: "itihasa", work: "Ramayana" }
};

export default function ChapterList({
  categoryOverride,
  workOverride,
  subWorkOverride,
  titleOverride
} = {}) {
  const { category: paramCategory, text: paramText } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const category = categoryOverride || paramCategory;
  const textSlug = paramText ? decodeURIComponent(paramText) : "";
  const config = CATEGORY_MAP[category] || {};
  const categoryKey = config.category || category;

  const [work, setWork] = useState(workOverride || config.work || "");
  const [subWorks, setSubWorks] = useState([]);
  const [selectedSubWork, setSelectedSubWork] = useState(
    subWorkOverride || config.subWork || ""
  );
  const [query, setQuery] = useState("");
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    const load = async () => {
      try {
        if (workOverride || config.work) {
          const resolvedWork = workOverride || config.work;
          const res = await getSubWorks(resolvedWork, categoryKey);
          const list = res.data || [];
          if (!active) return;
          setWork(resolvedWork);
          setSubWorks(list);

          if (subWorkOverride) {
            setSelectedSubWork(subWorkOverride);
            return;
          }

          if (textSlug) {
            const match = matchBySlugLoose(list, textSlug);
            if (match) {
              setSelectedSubWork(match);
              return;
            }
          }

          if (list.length && !selectedSubWork) {
            setSelectedSubWork(list[0]);
          }
          return;
        }

        const res = await getWorks(categoryKey);
        const rows = res.data || [];
        const entries = rows.map((row) => ({
          work: row.work,
          subWork: row.sub_work,
          label: row.sub_work ? `${row.work} ${row.sub_work}` : row.work
        }));
        if (!active) return;
        const match = entries.find((entry) => slugify(entry.label) === textSlug);
        const resolvedWork = match?.work || entries[0]?.work || "";
        const resolvedSubWork = match?.subWork || entries[0]?.subWork || "";
        const workSubWorks = entries
          .filter((entry) => entry.work === resolvedWork)
          .map((entry) => entry.subWork)
          .filter(Boolean);

        setWork(resolvedWork);
        setSubWorks(workSubWorks);
        setSelectedSubWork(resolvedSubWork || workSubWorks[0] || "");
      } catch (err) {
        if (active) setError("Unable to load sub-sections.");
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [categoryKey, config.work, textSlug, workOverride, subWorkOverride]);

  useEffect(() => {
    let active = true;
    if (!work || !selectedSubWork) return;
    setLoading(true);
    setError("");

    const load = async () => {
      try {
        const res = await getChapterStats(work, selectedSubWork, categoryKey);
        if (active) setChapters(res.data || []);
      } catch (err) {
        if (active) setError("Unable to load chapters.");
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [work, selectedSubWork, categoryKey]);

  const filteredChapters = useMemo(() => {
    const term = query.trim();
    if (!term) return chapters;
    return chapters.filter((ch) => ch.chapter.toString().includes(term));
  }, [chapters, query]);

  const featuredVerse = {
    id: `${category}-${textSlug}-featured`,
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
  };

  const handleSubWorkChange = (value) => {
    setSelectedSubWork(value);
    const nextRoute = getTextRoute({
      category,
      work,
      subWork: value,
      label: value ? `${work} ${value}` : work,
      lang: language
    });
    navigate(nextRoute);
  };

  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-semibold text-amber-900 mb-2">
            {titleOverride || textSlug || work} – Chapters
          </h2>
          <p className="text-muted mb-8">
            Choose a chapter to explore its verses.
          </p>

          <div className="card-surface rounded-3xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-amber-900">
              {t("common.featured_verses")}
            </h3>
            <p className="mt-2 text-sm text-muted">
              A highlighted verse from this text.
            </p>
            <div className="mt-6">
              <Verse verse={featuredVerse} />
            </div>
          </div>

          {subWorks.length > 1 && (
            <div className="mb-6">
              <label className="text-sm text-muted">Select Section</label>
              <select
                value={selectedSubWork}
                onChange={(e) => handleSubWorkChange(e.target.value)}
                className="mt-2 rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm"
              >
                {subWorks.map((sw) => (
                  <option key={sw} value={sw}>
                    {sw}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              {t("common.view_chapters")}: {filteredChapters.length}
            </p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("common.search_chapters")}
              className="w-full max-w-xs rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
            />
          </div>

          {error && (
            <p className="mb-6 text-sm text-amber-700">{error}</p>
          )}
          {loading && filteredChapters.length === 0 && (
            <SkeletonList count={6} />
          )}

          {!loading && (
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {filteredChapters.map((ch) => {
                const link = getChapterRoute({
                  category,
                  work,
                  subWork: selectedSubWork,
                  label: selectedSubWork ? `${work} ${selectedSubWork}` : work,
                  chapter: ch.chapter,
                  lang: language
                });

                return (
                  <div
                    key={ch.chapter}
                    onClick={() => navigate(link)}
                    className="card-surface rounded-xl p-4 text-center cursor-pointer hover:-translate-y-1 hover:shadow-xl transition"
                  >
                    <span className="text-sm font-semibold text-amber-900">
                      {ch.chapter}
                    </span>
                    <div className="mt-1 text-[0.7rem] text-muted">
                      {ch.verse_count} verses
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {!loading && filteredChapters.length === 0 && (
            <p className="mt-6 text-sm text-muted">
              No matching chapters found.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
