import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import useLanguage from "../../hooks/useLanguage";
import { api } from "../../services/api";
import { withLangPrefix } from "../../utils/lang";
import { SkeletonList } from "../../components/ui/Skeleton";

export default function TopicsIndex() {
  const { language } = useLanguage() || {};
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-amber-900 mb-6">Topics</h1>
        {loading && <SkeletonList count={6} />}
        {!loading && displayed.length === 0 && (
          <p className="text-sm text-muted">No topics available.</p>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((topic) => (
            <button
              key={topic.slug}
              onClick={() =>
                navigate(withLangPrefix(`/topics/${topic.slug}`, language))
              }
              className="card-surface rounded-2xl p-5 text-left hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="text-lg font-semibold text-amber-900">
                {topic.name || topic.slug}
              </div>
              {topic.description && (
                <p className="mt-2 text-sm text-muted">
                  {topic.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
