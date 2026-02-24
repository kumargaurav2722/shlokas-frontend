export default function SidePanel({ suggestions = [] }) {
  return (
    <aside className="hidden w-80 shrink-0 border-l border-amber-100/70 bg-gradient-to-b from-amber-50/70 to-white lg:block">
      <div className="sticky top-20 p-6">
        <div className="rounded-2xl border border-amber-100 bg-white/80 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 text-amber-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
              ॐ
            </span>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Daily Reflections
            </h3>
          </div>

          <p className="mt-3 text-sm text-amber-900/70">
            Suggested verses to contemplate today.
          </p>

          <ul className="mt-4 space-y-3">
            {suggestions.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-amber-100 bg-white px-4 py-3 text-sm text-amber-900 shadow-sm hover:shadow-md transition"
              >
                {item}
              </li>
            ))}
            {suggestions.length === 0 && (
              <li className="rounded-xl border border-amber-100 bg-white px-4 py-3 text-sm text-amber-900/70">
                No suggestions yet.
              </li>
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
}
