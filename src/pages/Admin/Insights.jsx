import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { getAnalyticsSummary } from "../../services/analytics.service";
import { SkeletonList } from "../../components/ui/Skeleton";
import useLanguage from "../../hooks/useLanguage";

export default function Insights() {
  const { t } = useLanguage() || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getAnalyticsSummary()
      .then((res) => {
        if (active) setData(res.data || null);
      })
      .catch(() => {
        if (active) setData(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl font-semibold text-amber-900 mb-6">
            {t?.("nav.insights") || "Insights"}
          </h1>
          {loading && <SkeletonList count={3} />}
          {!loading && !data && (
            <p className="text-sm text-muted">No analytics available yet.</p>
          )}
          {!loading && data && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="card-surface rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-amber-900 mb-3">
                  Top Languages
                </h2>
                <ul className="space-y-2 text-sm text-muted">
                  {(data.languages || []).map((row) => (
                    <li key={row.language} className="flex items-center justify-between">
                      <span>{row.language}</span>
                      <span>{row.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-surface rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-amber-900 mb-3">
                  Top Topics
                </h2>
                <ul className="space-y-2 text-sm text-muted">
                  {(data.topTopics || []).map((row) => (
                    <li key={row.topic} className="flex items-center justify-between">
                      <span>{row.topic}</span>
                      <span>{row.readCount}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-surface rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-amber-900 mb-3">
                  Top Shares
                </h2>
                <ul className="space-y-2 text-sm text-muted">
                  {(data.topShares || []).map((row, idx) => (
                    <li key={`${row.textId}-${idx}`} className="flex items-center justify-between">
                      <span>{row.textId}</span>
                      <span>{row.shareCount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
