import { useRouter } from "next/router";
import VersePage from "../../../src/pages/Scriptures/VersePage";
import SeoHead from "../../../src/components/seo/SeoHead";
import { canonicalUrl, getShareImageUrl } from "../../../src/utils/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "../../../src/utils/schema";
import useLanguage from "../../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../../src/utils/lang";

export default function BhagavadGitaVerse() {
  const router = useRouter();
  const { language } = useLanguage() || {};
  const chapter = Number(router.query.chapter);
  const verse = Number(router.query.verse);
  const title = `Bhagavad Gita ${chapter}.${verse}`;
  const basePath = `/bhagavad-gita/chapter-${chapter}/verse-${verse}`;
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(withLangPrefix(basePath, pathLang || language));
  const prefixed = (path) => canonicalUrl(withLangPrefix(path, pathLang || language));
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: prefixed("/") },
    { name: "Bhagavad Gita", url: prefixed("/bhagavad-gita") },
    { name: `Chapter ${chapter}`, url: prefixed(`/bhagavad-gita/chapter-${chapter}`) },
    { name: `Verse ${verse}`, url: canonical }
  ]);
  const article = buildArticleSchema({
    headline: title,
    url: canonical,
    bookName: "Bhagavad Gita",
    bookUrl: prefixed("/bhagavad-gita")
  });
  const shareImage = getShareImageUrl({
    work: "Mahabharata",
    subWork: "Bhagavad Gita",
    chapter,
    verse,
    lang: pathLang || language,
    title
  });

  return (
    <>
      <SeoHead
        title={`${title} – Karma Yoga Shloka Meaning`}
        description={`Read Bhagavad Gita Chapter ${chapter} Verse ${verse} with meaning and explanation.`}
        canonical={canonical}
        image={shareImage}
        ogType="article"
        schema={[article, breadcrumb]}
      />
      <VersePage
        categoryOverride="gita"
        textOverride="Bhagavad Gita"
        workOverride="Mahabharata"
        subWorkOverride="Bhagavad Gita"
        chapterOverride={chapter}
        focusVerse={verse}
      />
    </>
  );
}
