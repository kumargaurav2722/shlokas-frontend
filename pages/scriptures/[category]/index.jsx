import { useRouter } from "next/router";
import TextList from "../../../src/pages/Scriptures/TextList";
import SeoHead from "../../../src/components/seo/SeoHead";
import { canonicalUrl } from "../../../src/utils/seo";
import useLanguage from "../../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../../src/utils/lang";

export default function Page() {
  const router = useRouter();
  const { language } = useLanguage() || {};
  const category = router.query.category || "scriptures";
  const title = `${category} Scriptures`.replace(/(^\\w)/, (c) => c.toUpperCase());
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(
    withLangPrefix(`/scriptures/${category}`, pathLang || language)
  );

  return (
    <>
      <SeoHead
        title={title}
        description={`Explore ${category} texts, chapters, and verses.`}
        canonical={canonical}
      />
      <TextList />
    </>
  );
}
