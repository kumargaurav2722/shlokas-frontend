import { useRouter } from "next/router";
import VersePage from "../../../src/pages/Scriptures/VersePage";
import SeoHead from "../../../src/components/seo/SeoHead";
import { canonicalUrl, getShareImageUrl } from "../../../src/utils/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "../../../src/utils/schema";
import useLanguage from "../../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../../src/utils/lang";

const deslug = (value = "") =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function UpanishadVersePage() {
  const router = useRouter();
  const { language } = useLanguage() || {};
  const textSlug = router.query.text || "";
  const chapter = Number(router.query.chapter);
  const verse = Number(router.query.verse);
  const title = deslug(textSlug);
  const basePath = `/upanishads/${textSlug}/verse-${chapter}-${verse}`;
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(withLangPrefix(basePath, pathLang || language));
  const prefixed = (path) => canonicalUrl(withLangPrefix(path, pathLang || language));
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: prefixed("/") },
    { name: "Upanishads", url: prefixed("/upanishads") },
    { name: title, url: prefixed(`/upanishads/${textSlug}`) },
    { name: `Verse ${chapter}.${verse}`, url: canonical }
  ]);
  const article = buildArticleSchema({
    headline: `${title} Upanishad ${chapter}.${verse}`,
    url: canonical,
    bookName: `${title} Upanishad`,
    bookUrl: prefixed(`/upanishads/${textSlug}`)
  });
  const shareImage = getShareImageUrl({
    work: "Upanishads",
    subWork: title,
    chapter,
    verse,
    lang: pathLang || language,
    title: `${title} Upanishad ${chapter}.${verse}`
  });

  return (
    <>
      <SeoHead
        title={`${title} Upanishad ${chapter}.${verse} – Verse`}
        description={`Read ${title} Upanishad verse ${chapter}.${verse} with meaning.`}
        canonical={canonical}
        image={shareImage}
        ogType="article"
        schema={[article, breadcrumb]}
      />
      <VersePage
        categoryOverride="upanishads"
        textOverride={title}
        workOverride="Upanishads"
        subWorkOverride={title}
        chapterOverride={chapter}
        focusVerse={verse}
      />
    </>
  );
}
