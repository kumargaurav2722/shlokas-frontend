export function SkeletonBlock({ className = "" }) {
  return <div className={`skeleton ${className}`} />;
}

export function SkeletonCard({ lines = 3, className = "" }) {
  return (
    <div className={`card-surface rounded-2xl p-5 ${className}`}>
      <SkeletonBlock className="h-3 w-20 mb-3" />
      <SkeletonBlock className="h-5 w-3/4 mb-4" />
      {Array.from({ length: lines }).map((_, idx) => (
        <SkeletonBlock key={idx} className="h-3 w-full mb-2 last:mb-0" />
      ))}
    </div>
  );
}

export function SkeletonList({ count = 3 }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
}
