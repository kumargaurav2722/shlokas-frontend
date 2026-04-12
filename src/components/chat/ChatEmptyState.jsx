<<<<<<< HEAD
const SUGGESTION_BADGES = ["01", "02", "03", "04"];

export default function ChatEmptyState({
  icon = "\u{1F64F}",
  title,
  subtitle,
  description,
  suggestions = [],
  onSelectSuggestion,
  loading = false,
}) {
=======
const SUGGESTION_ICONS = ["01", "02", "03", "04"];

export default function ChatEmptyState({ suggestions, onSelectSuggestion, loading }) {
>>>>>>> e2a85248ea258e9efd459f0d15025d1b689a37d4
  return (
    <div className="mx-auto flex min-h-full max-w-3xl items-center justify-center">
      <div className="w-full animate-fade-up rounded-[2rem] border border-amber-200/70 bg-white/85 p-8 shadow-[0_24px_80px_rgba(180,83,9,0.12)] backdrop-blur sm:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 text-3xl shadow-inner">
<<<<<<< HEAD
            {icon}
          </div>

          <h2 className="mt-6 text-3xl font-semibold text-amber-950 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-lg text-amber-900 sm:text-xl">
            {subtitle}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
            {description}
=======
            🙏
          </div>

          <h2 className="mt-6 text-3xl font-semibold text-amber-950 sm:text-4xl">
            Namaste
          </h2>
          <p className="mt-3 text-lg text-amber-900 sm:text-xl">
            Ask anything from the Bhagavad Gita
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
            Start with a sample question below, or type your own and receive an
            answer grounded in scripture.
>>>>>>> e2a85248ea258e9efd459f0d15025d1b689a37d4
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
<<<<<<< HEAD
              onClick={() => onSelectSuggestion?.(suggestion)}
=======
              onClick={() => onSelectSuggestion(suggestion)}
>>>>>>> e2a85248ea258e9efd459f0d15025d1b689a37d4
              disabled={loading}
              className="animate-fade-up rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-800">
<<<<<<< HEAD
                  {SUGGESTION_BADGES[index] || "Q"}
=======
                  {SUGGESTION_ICONS[index] || "Q"}
>>>>>>> e2a85248ea258e9efd459f0d15025d1b689a37d4
                </span>
                <span className="text-sm leading-6 text-amber-950">
                  {suggestion}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
