import Landing from "../src/pages/Landing/Landing";
import SeoHead from "../src/components/seo/SeoHead";
import { canonicalUrl } from "../src/utils/seo";
import useLanguage from "../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../src/utils/lang";
import { useRouter } from "next/router";

export default function HomePage() {
  const { language } = useLanguage() || {};
  const router = useRouter();
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(withLangPrefix("/", pathLang || language));
  return (
    <>
      <SeoHead
        title="Shlokas – Sacred Wisdom"
        description="Explore shlokas, verses, and guided reading across Bhagavad Gita, Vedas, Upanishads, and more."
        canonical={canonical}
      />
      <Landing />
    </>
  );
}
