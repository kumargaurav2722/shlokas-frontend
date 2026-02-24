import { getSiteUrl } from "../src/utils/seo";
import { getChapterRoute, getTextRoute, getVerseRoute } from "../src/utils/routes";
import { SUPPORTED_LANGS, withLangPrefix } from "../src/utils/lang";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

const buildXml = (urls) => {
  const items = urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
};

export async function getServerSideProps({ res }) {
  const site = getSiteUrl();
  const urls = new Set();
  const addUrl = (path) => {
    if (!path) return;
    urls.add(`${site}${path}`);
  };
  const addUrlWithLangs = (path) => {
    addUrl(path);
    SUPPORTED_LANGS.forEach((lang) => {
      addUrl(withLangPrefix(path, lang));
    });
  };

  addUrlWithLangs("/");
  addUrlWithLangs("/scriptures");
  addUrlWithLangs("/bhagavad-gita");
  addUrlWithLangs("/verse-of-the-day");
  addUrlWithLangs("/upanishads");
  addUrlWithLangs("/scriptures/vedas");
  addUrlWithLangs("/scriptures/puranas");
  addUrlWithLangs("/scriptures/ramayana");
  addUrlWithLangs("/scriptures/mahabharata");
  addUrlWithLangs("/topics");

  try {
    const [topicsRes, verseRes] = await Promise.all([
      fetch(`${API_BASE}/topics`),
      fetch(`${API_BASE}/texts/verse-index`)
    ]);
    const topics = topicsRes.ok ? await topicsRes.json() : [];
    topics.forEach((topic) => {
      const slug = typeof topic === "string" ? topic : topic.slug;
      if (slug) addUrlWithLangs(`/topics/${slug}`);
    });

    const rows = verseRes.ok ? await verseRes.json() : [];
    rows.forEach((row) => {
      const label = row.sub_work ? `${row.work} ${row.sub_work}` : row.work;
      addUrlWithLangs(
        getTextRoute({
          category: row.category,
          work: row.work,
          subWork: row.sub_work,
          label
        })
      );
      addUrlWithLangs(
        getChapterRoute({
          category: row.category,
          work: row.work,
          subWork: row.sub_work,
          label,
          chapter: row.chapter
        })
      );
      addUrlWithLangs(
        getVerseRoute({
          category: row.category,
          work: row.work,
          subWork: row.sub_work,
          label,
          chapter: row.chapter,
          verse: row.verse
        })
      );
    });
  } catch {
    // ignore sitemap errors for local dev
  }

  const xml = buildXml(Array.from(urls));
  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
