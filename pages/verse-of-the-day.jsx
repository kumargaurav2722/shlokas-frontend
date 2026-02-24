import SeoHead from "../src/components/seo/SeoHead";
import Navbar from "../src/components/layout/Navbar";
import VerseOfDaySection from "../src/pages/Landing/VerseOfDaySection";
import { canonicalUrl } from "../src/utils/seo";
import useLanguage from "../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../src/utils/lang";
import { useRouter } from "next/router";

export default function VerseOfTheDayPage() {
  const { language } = useLanguage() || {};
  const router = useRouter();
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(
    withLangPrefix("/verse-of-the-day", pathLang || language)
  );

  return (
    <>
      <SeoHead
        title="Verse of the Day – Daily Guidance"
        description="Read today’s highlighted verse with meaning and reflection."
        canonical={canonical}
      />
      <Navbar />
      <VerseOfDaySection />
    </>
  );
}
