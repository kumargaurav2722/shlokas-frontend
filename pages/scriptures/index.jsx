import ScripturesHome from "../../src/pages/Scriptures/ScripturesHome";
import SeoHead from "../../src/components/seo/SeoHead";
import { canonicalUrl } from "../../src/utils/seo";
import { buildBreadcrumbSchema } from "../../src/utils/schema";
import useLanguage from "../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../src/utils/lang";
import { useRouter } from "next/router";

export default function Page() {
  const { language } = useLanguage() || {};
  const router = useRouter();
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(
    withLangPrefix("/scriptures", pathLang || language)
  );
  const prefixed = (path) =>
    canonicalUrl(withLangPrefix(path, pathLang || language));
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: prefixed("/") },
    { name: "Scriptures", url: canonical }
  ]);

  return (
    <>
      <SeoHead
        title="Scriptures – Vedas, Upanishads, Puranas, and Epics"
        description="Browse scriptures, chapters, and verses across the Vedas, Upanishads, Puranas, and epics."
        canonical={canonical}
        schema={breadcrumb}
      />
      <ScripturesHome />
    </>
  );
}
