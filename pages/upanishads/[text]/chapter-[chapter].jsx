import { useRouter } from "next/router";
import VersePage from "../../../src/pages/Scriptures/VersePage";
import SeoHead from "../../../src/components/seo/SeoHead";
import { canonicalUrl } from "../../../src/utils/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "../../../src/utils/schema";
import useLanguage from "../../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../../src/utils/lang";

const deslug = (value = "") =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function UpanishadChapterPage() {
  const router = useRouter();
  const { language } = useLanguage() || {};
  const textSlug = router.query.text || "";
  const chapter = Number(router.query.chapter);
  const title = deslug(textSlug);
  const basePath = `/upanishads/${textSlug}/chapter-${chapter}`;
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(withLangPrefix(basePath, pathLang || language));
  const prefixed = (path) => canonicalUrl(withLangPrefix(path, pathLang || language));
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: prefixed("/") },
    { name: "Upanishads", url: prefixed("/upanishads") },
    { name: title, url: prefixed(`/upanishads/${textSlug}`) },
    { name: `Chapter ${chapter}`, url: canonical }
  ]);
  const article = buildArticleSchema({
    headline: `${title} Upanishad Chapter ${chapter}`,
    url: canonical,
    bookName: `${title} Upanishad`,
    bookUrl: prefixed(`/upanishads/${textSlug}`)
  });

  return (
    <>
      <SeoHead
        title={`${title} Upanishad Chapter ${chapter}`}
        description={`Read ${title} Upanishad Chapter ${chapter} with verses and meaning.`}
        canonical={canonical}
        schema={[article, breadcrumb]}
      />
      <VersePage
        categoryOverride="upanishads"
        textOverride={title}
        workOverride="Upanishads"
        subWorkOverride={title}
        chapterOverride={chapter}
      />
    </>
  );
}
