import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";
import { getBookmarks, removeBookmark } from "../../services/bookmark.service";
import { SkeletonList } from "../../components/ui/Skeleton";

export default function Bookmarks() {
  const { t, language } = useLanguage() || {};
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getBookmarks();
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

  const handleDelete = async (item) => {
    const prev = items;
    setItems((list) => list.filter((b) => b.id !== item.id));
    try {
      await removeBookmark(item.type, item.itemId);
    } catch {
      setItems(prev);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-amber-900 mb-6">
          {t("bookmarks.title")}
        </h2>
        {loading && <SkeletonList count={3} />}
        {!loading && items.length === 0 && (
          <p className="text-sm text-muted">{t("bookmarks.empty")}</p>
        )}
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="card-surface rounded-2xl p-5 flex items-center justify-between gap-4"
            >
              <div
                className="cursor-pointer"
                onClick={() =>
                  navigate(withLangPrefix(item.route || "/", language))
                }
              >
                <div className="text-sm uppercase tracking-[0.2em] text-amber-700">
                  {item.type}
                </div>
                <div className="text-lg font-semibold text-amber-900">
                  {item.title}
                </div>
              </div>
              <button
                onClick={() => handleDelete(item)}
                className="rounded-full border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-900 hover:bg-amber-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
