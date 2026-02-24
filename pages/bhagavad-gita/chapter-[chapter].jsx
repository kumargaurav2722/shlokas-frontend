import { useRouter } from "next/router";
import VersePage from "../../src/pages/Scriptures/VersePage";
import SeoHead from "../../src/components/seo/SeoHead";
import { canonicalUrl } from "../../src/utils/seo";
import { buildBreadcrumbSchema, buildArticleSchema } from "../../src/utils/schema";
import useLanguage from "../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../src/utils/lang";

export default function BhagavadGitaChapter() {
  const router = useRouter();
  const { language } = useLanguage() || {};
  const chapter = Number(router.query.chapter);
  const title = `Bhagavad Gita Chapter ${chapter}`;
  const basePath = `/bhagavad-gita/chapter-${chapter}`;
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(withLangPrefix(basePath, pathLang || language));
  const prefixed = (path) => canonicalUrl(withLangPrefix(path, pathLang || language));
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: prefixed("/") },
    { name: "Bhagavad Gita", url: prefixed("/bhagavad-gita") },
    { name: `Chapter ${chapter}`, url: canonical }
  ]);
  const article = buildArticleSchema({
    headline: title,
    url: canonical,
    bookName: "Bhagavad Gita",
    bookUrl: prefixed("/bhagavad-gita")
  });

  return (
    <>
      <SeoHead
        title={`${title} – Verses and Meaning`}
        description={`Read Bhagavad Gita Chapter ${chapter} with verses and explanations.`}
        canonical={canonical}
        schema={[article, breadcrumb]}
      />
      <VersePage
        categoryOverride="gita"
        textOverride="Bhagavad Gita"
        workOverride="Mahabharata"
        subWorkOverride="Bhagavad Gita"
        chapterOverride={chapter}
      />
    </>
  );
}
