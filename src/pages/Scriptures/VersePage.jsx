import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import SidePanel from "../../components/layout/SidePanel";
import Verse from "../../components/shloka/Verse";
import VerseSkeleton from "../../components/shloka/VerseSkeleton";
import { getVerses, getWorks, getSubWorks } from "../../services/scripture.service";
import useLanguage from "../../hooks/useLanguage";
import { getChapterRoute, getTextRoute, getVerseRoute, slugify, matchBySlugLoose } from "../../utils/routes";
import { withLangPrefix } from "../../utils/lang";
import { findTopicsForVerse, TOPICS } from "../../utils/topics";
import { logEvent } from "../../services/analytics.service";

const CATEGORY_MAP = {
  gita: { category: "itihasa", work: "Mahabharata", subWork: "Bhagavad Gita" },
  mahabharata: { category: "itihasa", work: "Mahabharata", subWork: "Bhagavad Gita" },
  upanishads: { category: "upanishad", work: "Upanishads" },
  ramayana: { category: "itihasa", work: "Ramayana" },
  vedas: { category: "veda" },
  puranas: { category: "purana" },
};

export default function VersePage({
  categoryOverride,
  textOverride,
  workOverride,
  subWorkOverride,
  chapterOverride,
  focusVerse,
  initialVerses
} = {}) {
  const { category: paramCategory, text: paramText, chapter: paramChapter } = useParams();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [verses, setVerses] = useState(initialVerses || []);
  const [loading, setLoading] = useState(false);
  const { t, language } = useLanguage();
  const [error, setError] = useState("");
  const loggedRef = useRef({ verseId: null, chapterKey: null });

  const category = categoryOverride || paramCategory;
  const text = textOverride || paramText;
  const decodedText = text ? decodeURIComponent(text) : "";
  const config = CATEGORY_MAP[category] || {};
  const categoryKey = config.category || category;
  const [resolvedWork, setResolvedWork] = useState(
    workOverride || config.work || ""
  );
  const [resolvedSubWork, setResolvedSubWork] = useState(
    subWorkOverride || config.subWork || decodedText
  );
  const chapterNumber = Number(chapterOverride ?? paramChapter);
  const verseParam = focusVerse || Number(searchParams.get("verse"));

  useEffect(() => {
    if (workOverride || subWorkOverride || config.work || config.subWork) {
      setResolvedWork(workOverride || config.work || "");
      setResolvedSubWork(subWorkOverride || config.subWork || decodedText);
      return;
    }
    if (!categoryKey || !decodedText) return;

    let active = true;
    const resolve = async () => {
      try {
        const res = await getWorks(categoryKey);
        const rows = res.data || [];
        const entries = rows.map((row) => ({
          work: row.work,
          subWork: row.sub_work,
          label: row.sub_work ? `${row.work} ${row.sub_work}` : row.work
        }));
        const match = entries.find(
          (entry) => slugify(entry.label) === decodedText
        );
        const fallback = entries[0] || {};
        if (active) {
          setResolvedWork(match?.work || fallback.work || decodedText);
          setResolvedSubWork(match?.subWork || fallback.subWork || decodedText);
        }
      } catch {
        if (active) {
          setResolvedWork(decodedText);
          setResolvedSubWork(decodedText);
        }
      }
    };
    resolve();

    return () => {
      active = false;
    };
  }, [
    workOverride,
    subWorkOverride,
    config.work,
    config.subWork,
    categoryKey,
    decodedText
  ]);

  useEffect(() => {
    if (!resolvedWork || !decodedText) return;
    if (subWorkOverride || config.subWork) return;
    let active = true;
    const resolveSub = async () => {
      try {
        const res = await getSubWorks(resolvedWork, categoryKey);
        const list = res.data || [];
        const match = matchBySlugLoose(list, decodedText);
        if (active && match) {
          setResolvedSubWork(match);
        } else if (active && list.length && resolvedSubWork === decodedText) {
          setResolvedSubWork(list[0]);
        }
      } catch {
        // ignore
      }
    };
    resolveSub();
    return () => {
      active = false;
    };
  }, [
    resolvedWork,
    decodedText,
    subWorkOverride,
    config.subWork,
    categoryKey,
    resolvedSubWork
  ]);

  useEffect(() => {
    if (!resolvedWork || !resolvedSubWork || Number.isNaN(chapterNumber)) {
      setError("Missing chapter data.");
      return;
    }

    if (initialVerses && initialVerses.length) {
      return;
    }

    let active = true;
    setLoading(true);
    setError("");

    getVerses(
      resolvedWork,
      resolvedSubWork,
      chapterNumber,
      "Hindi,English,Bengali,Marathi,Telugu,Tamil,Kannada"
    )
      .then((res) => {
        if (active) {
          const next = (res.data || []).map((v) => ({
            ...v,
            title: `${resolvedSubWork} ${v.chapter}:${v.verse}`,
            route: getVerseRoute({
              category,
              work: resolvedWork,
              subWork: resolvedSubWork,
              label: resolvedSubWork,
              chapter: v.chapter,
              verse: v.verse,
              lang: language
            })
          }));
          setVerses(next);
        }
      })
      .catch(() => {
        if (active) setError("Failed to load verses.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [resolvedWork, resolvedSubWork, chapterNumber, initialVerses, category]);

  const filteredVerses = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return verses;
    return verses.filter((v) => {
      const haystack = `${v.verse} ${v.sanskrit || ""} ${v.hi || ""} ${v.en || ""
        } ${v.bn || ""} ${v.mr || ""} ${v.te || ""} ${v.ta || ""} ${v.kn || ""
        }`.toLowerCase();
      return haystack.includes(term);
    });
  }, [query, verses]);

  useEffect(() => {
    if (!verseParam || verses.length === 0) return;
    const el = document.getElementById(`verse-${verseParam}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [verseParam, verses]);

  const suggestions = [
    "Gita 2.47 – Karma Yoga",
    "Gita 6.5 – Self Upliftment",
    "Gita 12.15 – Bhakti"
  ];

  const focusIndex = verseParam
    ? verses.findIndex((v) => v.verse === Number(verseParam))
    : -1;
  const focusVerseData = focusIndex >= 0 ? verses[focusIndex] : null;
  const prevVerse = focusIndex > 0 ? verses[focusIndex - 1] : null;
  const nextVerse = focusIndex >= 0 && focusIndex < verses.length - 1
    ? verses[focusIndex + 1]
    : null;

  useEffect(() => {
    if (focusVerseData?.id && loggedRef.current.verseId !== focusVerseData.id) {
      loggedRef.current.verseId = focusVerseData.id;
      logEvent("verse_view", {
        textId: focusVerseData.id,
        chapter: focusVerseData.chapter,
        verse: focusVerseData.verse,
        language
      }).catch(() => { });
    }
  }, [focusVerseData?.id, focusVerseData?.chapter, focusVerseData?.verse, language]);

  useEffect(() => {
    if (!resolvedWork || !resolvedSubWork || Number.isNaN(chapterNumber)) return;
    if (focusVerseData?.id) return;
    const key = `${resolvedWork}:${resolvedSubWork}:${chapterNumber}`;
    if (loggedRef.current.chapterKey === key) return;
    loggedRef.current.chapterKey = key;
    logEvent("chapter_view", {
      work: resolvedWork,
      subWork: resolvedSubWork,
      chapter: chapterNumber,
      language
    }).catch(() => { });
  }, [resolvedWork, resolvedSubWork, chapterNumber, focusVerseData?.id, language]);

  const topicsForVerse = focusVerseData
    ? findTopicsForVerse(focusVerseData.chapter, focusVerseData.verse)
    : [];

  const chapterRoute = getChapterRoute({
    category,
    work: resolvedWork,
    subWork: resolvedSubWork,
    label: resolvedSubWork,
    chapter: chapterNumber,
    lang: language
  });
  const textRoute = getTextRoute({
    category,
    work: resolvedWork,
    subWork: resolvedSubWork,
    label: resolvedSubWork,
    lang: language
  });

  return (
    <>
      <Navbar />
      <div className="flex">
        <main className="flex-1 p-6">
          <div className="card-surface rounded-3xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-amber-900">
                {resolvedSubWork} • Chapter {chapterNumber}
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <a href={textRoute} className="text-amber-700 hover:underline">
                  {resolvedSubWork || decodedText}
                </a>
                <span className="text-muted">/</span>
                <a href={chapterRoute} className="text-amber-700 hover:underline">
                  Chapter {chapterNumber}
                </a>
              </div>
            </div>

            {(prevVerse || nextVerse) && (
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                {prevVerse && (
                  <a
                    href={getVerseRoute({
                      category,
                      work: resolvedWork,
                      subWork: resolvedSubWork,
                      label: resolvedSubWork,
                      chapter: prevVerse.chapter,
                      verse: prevVerse.verse,
                      lang: language
                    })}
                    className="rounded-full border border-amber-200/70 px-3 py-1 text-amber-800"
                  >
                    ← Prev {prevVerse.chapter}:{prevVerse.verse}
                  </a>
                )}
                {nextVerse && (
                  <a
                    href={getVerseRoute({
                      category,
                      work: resolvedWork,
                      subWork: resolvedSubWork,
                      label: resolvedSubWork,
                      chapter: nextVerse.chapter,
                      verse: nextVerse.verse,
                      lang: language
                    })}
                    className="rounded-full border border-amber-200/70 px-3 py-1 text-amber-800"
                  >
                    Next {nextVerse.chapter}:{nextVerse.verse} →
                  </a>
                )}
                {topicsForVerse.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {topicsForVerse.map((topic) => (
                      <a
                        key={topic}
                        href={withLangPrefix(`/topics/${topic}`, language)}
                        className="rounded-full border border-amber-200/70 px-3 py-1 text-amber-800"
                      >
                        {topic}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {topicsForVerse.length === 0 && (
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
                {TOPICS.slice(0, 6).map((topic) => (
                  <a
                    key={topic}
                    href={withLangPrefix(`/topics/${topic}`, language)}
                    className="hover:text-amber-700"
                  >
                    {topic}
                  </a>
                ))}
              </div>
            )}

            <div className="mb-6 mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                {t("common.featured_verses")}: {filteredVerses.length}
              </p>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("common.search_within_chapter")}
                className="w-full max-w-xs rounded-full border border-amber-200/70 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-saffron)]"
              />
            </div>

            {error && (
              <p className="mb-4 text-sm text-amber-700">{error}</p>
            )}
            {loading && (
              <div className="mb-4 space-y-6">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <VerseSkeleton key={idx} />
                ))}
              </div>
            )}

            {!loading && (
              <div className="space-y-6">
                {filteredVerses.map((verse) => (
                  <Verse key={verse.id} verse={verse} />
                ))}
              </div>
            )}
            {!loading && filteredVerses.length === 0 && (
              <p className="mt-6 text-sm text-muted">
                No matching verses found.
              </p>
            )}
          </div>
        </main>

        <SidePanel suggestions={suggestions} />
      </div>
    </>
  );
}
