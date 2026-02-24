import UpanishadsOverview from "../../src/pages/Scriptures/UpanishadsOverview";
import SeoHead from "../../src/components/seo/SeoHead";
import { canonicalUrl } from "../../src/utils/seo";
import { buildBookSchema, buildBreadcrumbSchema } from "../../src/utils/schema";
import useLanguage from "../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../src/utils/lang";
import { useRouter } from "next/router";

export default function UpanishadsPage() {
  const { language } = useLanguage() || {};
  const router = useRouter();
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(
    withLangPrefix("/upanishads", pathLang || language)
  );
  const prefixed = (path) =>
    canonicalUrl(withLangPrefix(path, pathLang || language));
  const book = buildBookSchema("Upanishads", canonical, "Sages");
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: prefixed("/") },
    { name: "Upanishads", url: canonical }
  ]);

  return (
    <>
      <SeoHead
        title="Upanishads – Explore Wisdom"
        description="Browse major Upanishads with chapters, verses, and reflections."
        canonical={canonical}
        schema={[book, breadcrumb]}
      />
      <UpanishadsOverview />
    </>
  );
}
