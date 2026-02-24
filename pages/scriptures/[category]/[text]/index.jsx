import { useRouter } from "next/router";
import ChapterList from "../../../../src/pages/Scriptures/ChapterList";
import SeoHead from "../../../../src/components/seo/SeoHead";
import { canonicalUrl } from "../../../../src/utils/seo";
import useLanguage from "../../../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../../../src/utils/lang";

export default function Page() {
  const router = useRouter();
  const { language } = useLanguage() || {};
  const category = router.query.category || "scriptures";
  const text = router.query.text || "";
  const textTitle = text.toString().split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(
    withLangPrefix(`/scriptures/${category}/${text}`, pathLang || language)
  );

  return (
    <>
      <SeoHead
        title={`${textTitle || text} – Chapters`}
        description={`Explore chapters and verses from ${textTitle || text}.`}
        canonical={canonical}
      />
      <ChapterList />
    </>
  );
}
