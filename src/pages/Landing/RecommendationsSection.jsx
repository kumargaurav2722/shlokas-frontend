import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";
import useUser from "../../hooks/useUser";
import { getRecommendations } from "../../services/recommendations.service";

export default function RecommendationsSection() {
  const { t, language } = useLanguage() || {};
  const { user } = useUser() || {};
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let active = true;
    if (!user) return;
    getRecommendations()
      .then((res) => {
        if (active) setItems(res.data || []);
      })
      .catch(() => {
        if (active) setItems([]);
      });
    return () => {
      active = false;
    };
  }, [user]);

  if (!user || items.length === 0) return null;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold text-amber-900 mb-6">
          {t("home.recommended")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.itemId}
              onClick={() =>
                navigate(withLangPrefix(item.route || "/", language))
              }
              className="card-surface rounded-2xl p-5 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                {item.type}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-amber-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted line-clamp-3">
                {item.preview || item.sanskrit}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
