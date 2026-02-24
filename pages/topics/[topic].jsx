import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SeoHead from "../../src/components/seo/SeoHead";
import { canonicalUrl } from "../../src/utils/seo";
import { buildBreadcrumbSchema } from "../../src/utils/schema";
import Navbar from "../../src/components/layout/Navbar";
import { api } from "../../src/services/api";
import { useNavigate } from "../../src/compat/react-router-dom";
import useLanguage from "../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../src/utils/lang";

export default function TopicPage() {
  const router = useRouter();
  const navigate = useNavigate();
  const { language } = useLanguage() || {};
  const topic = router.query.topic || "";
  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(
    withLangPrefix(`/topics/${topic}`, pathLang || language)
  );
  const prefixed = (path) => withLangPrefix(path, pathLang || language);
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: canonicalUrl(prefixed("/")) },
    { name: "Topics", url: canonicalUrl(prefixed("/topics")) },
    { name: topic, url: canonical }
  ]);
  const [items, setItems] = useState([]);
  const [topicMeta, setTopicMeta] = useState(null);

  useEffect(() => {
    if (!topic) return;
    let active = true;
    api
      .get("/topics", {
        params: language ? { lang: language } : {}
      })
      .then((res) => {
        if (!active) return;
        const list = res.data || [];
        const match = list.find((entry) => entry.slug === topic);
        if (match) setTopicMeta(match);
      })
      .catch(() => {
        if (active) setTopicMeta(null);
      });

    api.get(`/topics/${topic}`)
      .then((res) => setItems(res.data || []))
      .catch(() => setItems([]));

    return () => {
      active = false;
    };
  }, [topic, language]);

  return (
    <>
      <SeoHead
        title={`${topicMeta?.name || topic} – Verses and Guidance`}
        description={
          topicMeta?.description
            ? topicMeta.description
            : `Explore verses related to ${topic} with meaning and context.`
        }
        canonical={canonical}
        schema={breadcrumb}
      />
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-amber-900 mb-2">
          {topicMeta?.name || topic}
        </h1>
        {topicMeta?.description && (
          <p className="text-sm text-muted mb-6">{topicMeta.description}</p>
        )}
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.itemId}
              onClick={() =>
                navigate(prefixed(item.route || `/topics/${topic}`))
              }
              className="card-surface rounded-2xl p-5 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                {item.type}
              </div>
              <div className="text-lg font-semibold text-amber-900">
                {item.title}
              </div>
              <p className="text-sm text-muted mt-2 line-clamp-3">
                {item.preview || item.sanskrit}
              </p>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-muted">No verses found.</p>
          )}
        </div>
      </div>
    </>
  );
}
