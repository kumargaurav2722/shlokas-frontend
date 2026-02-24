import GitaOverview from "../../src/pages/Scriptures/GitaOverview";
import SeoHead from "../../src/components/seo/SeoHead";
import { canonicalUrl } from "../../src/utils/seo";
import { buildBreadcrumbSchema, buildBookSchema } from "../../src/utils/schema";
import useLanguage from "../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../src/utils/lang";
import { useRouter } from "next/router";

export default function BhagavadGitaPage() {
  const { language } = useLanguage() || {};
  const router = useRouter();
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(
    withLangPrefix("/bhagavad-gita", pathLang || language)
  );
  const prefixed = (path) =>
    canonicalUrl(withLangPrefix(path, pathLang || language));
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: prefixed("/") },
    { name: "Bhagavad Gita", url: canonical }
  ]);
  const book = buildBookSchema("Bhagavad Gita", canonical, "Vyasa");

  return (
    <>
      <SeoHead
        title="Bhagavad Gita – Chapters & Verses"
        description="Read the Bhagavad Gita with chapter summaries, verses, and translations."
        canonical={canonical}
        schema={[book, breadcrumb]}
      />
      <GitaOverview />
    </>
  );
}
