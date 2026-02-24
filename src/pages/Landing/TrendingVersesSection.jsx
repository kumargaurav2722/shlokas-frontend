import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { getTrending } from "../../services/stats.service";
import { withLangPrefix } from "../../utils/lang";
import { SkeletonList } from "../../components/ui/Skeleton";

export default function TrendingVersesSection() {
  const { language } = useLanguage() || {};
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTrending(5)
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
  }, []);

  if (loading) {
    return (
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-amber-900 mb-6">
            Trending Verses
          </h2>
          <SkeletonList count={3} />
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold text-amber-900 mb-6">
          Trending Verses
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.textId}
              onClick={() =>
                navigate(withLangPrefix(item.route || "/", language))
              }
              className="card-surface rounded-2xl p-5 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                Trending
              </div>
              <h3 className="mt-2 text-lg font-semibold text-amber-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {item.readCount} listens • {item.bookmarkCount} bookmarks
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
