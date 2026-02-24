import { useRouter } from "next/router";
import VersePage from "../../../../src/pages/Scriptures/VersePage";
import SeoHead from "../../../../src/components/seo/SeoHead";
import { canonicalUrl } from "../../../../src/utils/seo";
import { buildBreadcrumbSchema, buildArticleSchema } from "../../../../src/utils/schema";
import useLanguage from "../../../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../../../src/utils/lang";

export default function ScriptureChapterPage() {
  const router = useRouter();
  const { language } = useLanguage() || {};
  const { category = "scriptures", text = "", chapter } = router.query;
  const chapterNumber = Number(chapter);
  const textTitle = text.toString().split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  const basePath = `/scriptures/${category}/${text}/chapter-${chapterNumber}`;
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(withLangPrefix(basePath, pathLang || language));
  const prefixed = (path) => canonicalUrl(withLangPrefix(path, pathLang || language));
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: prefixed("/") },
    { name: category, url: prefixed(`/scriptures/${category}`) },
    { name: textTitle || text, url: prefixed(`/scriptures/${category}/${text}`) },
    { name: `Chapter ${chapterNumber}`, url: canonical }
  ]);
  const article = buildArticleSchema({
    headline: `${textTitle || text} Chapter ${chapterNumber}`,
    url: canonical,
    bookName: textTitle || text,
    bookUrl: prefixed(`/scriptures/${category}/${text}`)
  });

  return (
    <>
      <SeoHead
        title={`${textTitle || text} Chapter ${chapterNumber}`}
        description={`Read ${textTitle || text} Chapter ${chapterNumber} with verses and meaning.`}
        canonical={canonical}
        schema={[article, breadcrumb]}
      />
      <VersePage />
    </>
  );
}
