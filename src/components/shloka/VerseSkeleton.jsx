import { SkeletonBlock } from "../ui/Skeleton";

export default function VerseSkeleton() {
  return (
    <div className="card-surface rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <SkeletonBlock className="h-3 w-24" />
        <SkeletonBlock className="h-8 w-40 rounded-full" />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonBlock key={idx} className="h-7 w-16 rounded-full" />
        ))}
      </div>
      <SkeletonBlock className="h-4 w-full mb-2" />
      <SkeletonBlock className="h-4 w-11/12 mb-2" />
      <SkeletonBlock className="h-4 w-10/12 mb-4" />
      <div className="flex gap-4">
        <SkeletonBlock className="h-3 w-24" />
        <SkeletonBlock className="h-3 w-20" />
      </div>
    </div>
  );
}
