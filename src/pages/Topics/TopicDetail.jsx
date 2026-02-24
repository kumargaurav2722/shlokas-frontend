import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import useLanguage from "../../hooks/useLanguage";
import { api } from "../../services/api";
import { withLangPrefix } from "../../utils/lang";
import { SkeletonList } from "../../components/ui/Skeleton";
import { logEvent } from "../../services/analytics.service";

export default function TopicDetail() {
  const { topic = "" } = useParams();
  const { language } = useLanguage() || {};
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [topicMeta, setTopicMeta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!topic) return;
    let active = true;
    setLoading(true);

    logEvent("topic_view", { topic }).catch(() => {});

    api
      .get("/topics", { params: language ? { lang: language } : {} })
      .then((res) => {
        if (!active) return;
        const list = res.data || [];
        const match = list.find((entry) => entry.slug === topic);
        if (match) setTopicMeta(match);
      })
      .catch(() => {
        if (active) setTopicMeta(null);
      });

    api
      .get(`/topics/${topic}`)
      .then((res) => {
        if (active) setItems(res.data || []);
      })
      .catch(() => {
        if (active) setItems([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [topic, language]);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-amber-900 mb-2">
          {topicMeta?.name || topic}
        </h1>
        {topicMeta?.description && (
          <p className="text-sm text-muted mb-6">{topicMeta.description}</p>
        )}
        {loading && <SkeletonList count={4} />}
        {!loading && items.length === 0 && (
          <p className="text-sm text-muted">No verses found.</p>
        )}
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.itemId}
              onClick={() =>
                navigate(withLangPrefix(item.route || "/", language))
              }
              className="card-surface rounded-2xl p-5 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                {item.type}
              </div>
              <div className="text-lg font-semibold text-amber-900">
                {item.title}
              </div>
              {item.preview && (
                <p className="text-sm text-muted mt-2 line-clamp-3">
                  {item.preview}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
