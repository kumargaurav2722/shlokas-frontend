import { useEffect, useMemo, useState } from "react";
import useBookmarks from "../../hooks/useBookmarks";
import useAuth from "../../hooks/useAuth";
import useLanguage from "../../hooks/useLanguage";
import { addHistory } from "../../services/history.service";
import { logEvent } from "../../services/analytics.service";
import AudioPlayer from "../AudioPlayer";
import AudioSchema from "../seo/AudioSchema";
import { getShareImageUrl, getSiteUrl } from "../../utils/seo";

const LANG_LABELS = {
  sanskrit: "Sanskrit",
  hi: "Hindi",
  en: "English",
  bn: "Bengali",
  mr: "Marathi",
  te: "Telugu",
  ta: "Tamil",
  kn: "Kannada"
};

export default function Verse({ verse }) {
  const getValue = (lang) => verse?.[lang] ?? verse?.translations?.[lang];

  const availableLangs = useMemo(() => {
    const langs = [];
    if (getValue("sanskrit")) langs.push("sanskrit");
    if (getValue("en")) langs.push("en");
    if (getValue("hi")) langs.push("hi");
    if (getValue("bn")) langs.push("bn");
    if (getValue("mr")) langs.push("mr");
    if (getValue("te")) langs.push("te");
    if (getValue("ta")) langs.push("ta");
    if (getValue("kn")) langs.push("kn");
    return langs;
  }, [verse]);

  const { token } = useAuth() || {};
  const { language } = useLanguage() || {};
  const [activeLang, setActiveLang] = useState(
    availableLangs.includes(language)
      ? language
      : availableLangs.includes("en")
        ? "en"
        : availableLangs[0] || "sanskrit"
  );
  const [hasManualLang, setHasManualLang] = useState(false);
  const { isBookmarked, toggleBookmark } = useBookmarks() || {};
  const bookmarked = isBookmarked ? isBookmarked(verse?.id) : false;
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!hasManualLang && language && availableLangs.includes(language)) {
      setActiveLang(language);
      return;
    }
    if (availableLangs.length && !availableLangs.includes(activeLang)) {
      setActiveLang(availableLangs[0]);
    }
  }, [activeLang, availableLangs, language, hasManualLang]);

  useEffect(() => {
    setHasManualLang(false);
  }, [verse?.id]);

  useEffect(() => {
    if (!token || !verse?.id) return;
    let route = verse?.route;
    if (!route && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (verse?.verse) params.set("verse", verse.verse);
      route = `${window.location.pathname}?${params.toString()}`;
    }
    addHistory({
      type: "verse",
      itemId: verse.id,
      title: verse?.title || `Chapter ${verse?.chapter} Verse ${verse?.verse}`,
      route: route || "/"
    }).catch(() => {});
  }, [token, verse?.id, verse?.verse, verse?.title, verse?.route]);

  const getText = () => {
    if (activeLang === "hi") return getValue("hi");
    if (activeLang === "en") return getValue("en");
    if (activeLang === "bn") return getValue("bn");
    if (activeLang === "mr") return getValue("mr");
    if (activeLang === "te") return getValue("te");
    if (activeLang === "ta") return getValue("ta");
    if (activeLang === "kn") return getValue("kn");
    return getValue("sanskrit");
  };

  const handleLangChange = (lang) => {
    setHasManualLang(true);
    setActiveLang(lang);
  };

  const handleBookmark = () => {
    if (!token || !toggleBookmark) return;
    let route = verse?.route;
    if (!route && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (verse?.verse) params.set("verse", verse.verse);
      route = `${window.location.pathname}?${params.toString()}`;
    }
    toggleBookmark({
      type: "verse",
      itemId: verse.id,
      title: verse?.title || `Chapter ${verse?.chapter} Verse ${verse?.verse}`,
      route: route || "/"
    });
  };

  const buildShareUrl = () => {
    if (typeof window === "undefined") return "";
    const base = getSiteUrl();
    const route = verse?.route || window.location.pathname + window.location.search;
    return `${base}${route}`;
  };

  const shareUrl = buildShareUrl();
  const shareText = `${verse?.title || `Chapter ${verse?.chapter} Verse ${verse?.verse}`}`;
  const whatsappLink = shareUrl
    ? `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    : "";
  const twitterLink = shareUrl
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    : "";

  const handleShare = async (channel = "share") => {
    const url = buildShareUrl();
    const title = verse?.title || `Chapter ${verse?.chapter} Verse ${verse?.verse}`;
    const text = getText();
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore share errors
    } finally {
      logEvent("share", { textId: verse?.id, channel }).catch(() => {});
    }
  };

  const handleDownloadCard = async () => {
    const imageUrl = getShareImageUrl({
      textId: verse?.id,
      lang: activeLang,
      title: verse?.title
    });
    try {
      const res = await fetch(imageUrl);
      if (!res.ok) return;
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `verse-${verse?.chapter}-${verse?.verse}.svg`;
      link.click();
      URL.revokeObjectURL(link.href);
      logEvent("share_card_download", { textId: verse?.id }).catch(() => {});
    } catch {
      // ignore download errors
    }
  };

  const translationMeta = verse?.translationMeta?.[activeLang] || {};
  const sourceLabel = verse?.source || verse?.sub_work || verse?.work || "Traditional source";
  const readCount = verse?.readCount || 0;
  const bookmarkCount = verse?.bookmarkCount || 0;

  return (
    <article
      id={`verse-${verse?.verse}`}
      className={`card-surface rounded-2xl p-6 max-w-3xl transition ${
        isPlaying ? "ring-2 ring-amber-300" : ""
      }`}
    >
      <AudioSchema verse={verse} language={activeLang} />
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted">
          Chapter {verse.chapter} • Verse {verse.verse}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleBookmark}
            disabled={!token}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
              bookmarked
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent"
                : "border-amber-200 text-amber-900 bg-white/70"
            }`}
          >
            {bookmarked ? "Bookmarked" : token ? "Bookmark" : "Login to bookmark"}
          </button>
          <button
            onClick={() => handleShare("copy")}
            className="px-3 py-1 rounded-full text-xs font-semibold border border-amber-200 text-amber-900 bg-white/70"
          >
            {copied ? "Copied" : "Share"}
          </button>
          {whatsappLink && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => logEvent("share", { textId: verse?.id, channel: "whatsapp" }).catch(() => {})}
              className="px-3 py-1 rounded-full text-xs font-semibold border border-amber-200 text-amber-900 bg-white/70"
            >
              WhatsApp
            </a>
          )}
          {twitterLink && (
            <a
              href={twitterLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => logEvent("share", { textId: verse?.id, channel: "x" }).catch(() => {})}
              className="px-3 py-1 rounded-full text-xs font-semibold border border-amber-200 text-amber-900 bg-white/70"
            >
              X
            </a>
          )}
          <button
            onClick={handleDownloadCard}
            className="px-3 py-1 rounded-full text-xs font-semibold border border-amber-200 text-amber-900 bg-white/70"
          >
            Download Card
          </button>
          <AudioPlayer
            textId={verse.id}
            language={activeLang}
            onPlayStateChange={setIsPlaying}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {availableLangs.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLangChange(lang)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${
              activeLang === lang
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent"
                : "border-amber-200 text-amber-900 bg-white/70"
            }`}
          >
            {LANG_LABELS[lang]}
          </button>
        ))}
      </div>

      <p className="text-lg leading-relaxed whitespace-pre-wrap text-amber-900">
        {getText()}
      </p>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
        <span>Read by {readCount} seekers</span>
        <span>{bookmarkCount} bookmarks</span>
      </div>

      <div className="mt-4 border-t border-amber-100 pt-4 text-xs text-muted space-y-1">
        <p>Source: {sourceLabel}</p>
        {translationMeta.generated_by && (
          <p>Commentary source: {translationMeta.generated_by}</p>
        )}
        <p>Authenticity: curated from primary Sanskrit sources and verified editions.</p>
      </div>
    </article>
  );
}
