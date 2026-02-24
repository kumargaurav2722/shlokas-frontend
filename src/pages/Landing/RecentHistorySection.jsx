import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import useUser from "../../hooks/useUser";
import { getHistory } from "../../services/history.service";
import { withLangPrefix } from "../../utils/lang";

export default function RecentHistorySection() {
  const { user } = useUser() || {};
  const { t, language } = useLanguage() || {};
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let active = true;
    if (!user) return;
    getHistory()
      .then((res) => {
        if (!active) return;
        const data = res.data || [];
        setItems(data.slice(0, 10));
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
          {t?.("home.recently_viewed") || "Recently Viewed"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id || item.itemId}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
