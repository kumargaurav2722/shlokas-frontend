import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";
import { getHistory } from "../../services/history.service";
import { SkeletonList } from "../../components/ui/Skeleton";

export default function History() {
  const { t, language } = useLanguage() || {};
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getHistory();
      setItems(res.data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-amber-900 mb-6">
          {t("history.title")}
        </h2>
        {loading && <SkeletonList count={3} />}
        {!loading && items.length === 0 && (
          <p className="text-sm text-muted">{t("history.empty")}</p>
        )}
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
