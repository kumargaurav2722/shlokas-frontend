import { useEffect } from "react";
import { getAudioFileUrl, getSiteUrl } from "../../utils/seo";

export default function AudioSchema({ verse, language }) {
  useEffect(() => {
    if (!verse?.id || !language) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "AudioObject",
      name: verse.title || `Verse ${verse.chapter}.${verse.verse}`,
      description: `Audio recitation for ${verse.title || `Chapter ${verse.chapter} Verse ${verse.verse}`}.`,
      contentUrl: getAudioFileUrl({ textId: verse.id, language }),
      encodingFormat: "audio/mpeg",
      inLanguage: language,
      url: `${getSiteUrl()}${verse.route || ""}`
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.audioSchema = `${verse.id}-${language}`;
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [verse?.id, language]);

  return null;
}
