import { useRouter } from "next/router";
import ChapterList from "../../../src/pages/Scriptures/ChapterList";
import SeoHead from "../../../src/components/seo/SeoHead";
import { canonicalUrl } from "../../../src/utils/seo";
import useLanguage from "../../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../../src/utils/lang";

const deslug = (value = "") =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function UpanishadTextPage() {
  const router = useRouter();
  const { language } = useLanguage() || {};
  const textSlug = router.query.text || "";
  const title = deslug(textSlug);
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(
    withLangPrefix(`/upanishads/${textSlug}`, pathLang || language)
  );

  return (
    <>
      <SeoHead
        title={`${title} Upanishad – Chapters`}
        description={`Read the ${title} Upanishad with chapters and verses.`}
        canonical={canonical}
      />
      <ChapterList
        categoryOverride="upanishads"
        workOverride="Upanishads"
        subWorkOverride={title}
        titleOverride={`${title} Upanishad`}
      />
    </>
  );
}
