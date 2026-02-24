import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SeoHead from "../../src/components/seo/SeoHead";
import { canonicalUrl } from "../../src/utils/seo";
import Navbar from "../../src/components/layout/Navbar";
import { buildBreadcrumbSchema } from "../../src/utils/schema";
import { api } from "../../src/services/api";
import useLanguage from "../../src/hooks/useLanguage";
import { getPathLanguage, withLangPrefix } from "../../src/utils/lang";
import { useRouter } from "next/router";

export default function TopicsIndex() {
  const { language } = useLanguage() || {};
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const pathLang = getPathLanguage(router.asPath || "");
  const canonical = canonicalUrl(
    withLangPrefix("/topics", pathLang || language)
  );
  const prefixed = (path) => withLangPrefix(path, pathLang || language);
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: canonicalUrl(prefixed("/")) },
    { name: "Topics", url: canonical }
  ]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get("/topics", {
        params: language ? { lang: language } : {}
      })
      .then((res) => {
        if (!active) return;
        const data = res.data || [];
        const normalized = data.map((item) =>
          typeof item === "string"
            ? { slug: item, name: item, description: "" }
            : item
        );
        setTopics(normalized);
      })
      .catch(() => {
        if (active) setTopics([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [language]);

  const displayed = useMemo(() => topics, [topics]);

  return (
    <>
      <SeoHead
        title="Topics – Shlokas and Verses"
        description="Explore verses by topic: karma, bhakti, fear, anxiety, and more."
        canonical={canonical}
        schema={breadcrumb}
      />
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-amber-900 mb-6">Topics</h1>
        {loading && (
          <p className="text-sm text-muted">Loading topics...</p>
        )}
        {!loading && displayed.length === 0 && (
          <p className="text-sm text-muted">No topics available.</p>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((topic) => (
            <Link
              key={topic.slug}
              href={prefixed(`/topics/${topic.slug}`)}
              className="card-surface rounded-2xl p-5 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="text-lg font-semibold text-amber-900">
                {topic.name || topic.slug}
              </div>
              {topic.description && (
                <p className="mt-2 text-sm text-muted">
                  {topic.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
