import { Link } from "react-router-dom";

function VerseRefCard({ verseRef }) {
  const ref = verseRef;
  const label = `${ref.sub_work || ref.work} ${ref.chapter}:${ref.verse}`;
  const path = ref.sub_work === "Bhagavad Gita"
    ? `/bhagavad-gita/${ref.chapter}/${ref.verse}`
    : `/scriptures/${ref.work}/${ref.sub_work}/${ref.chapter}/${ref.verse}`;

  return (
    <Link
      to={path}
      className="block rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-3 hover:bg-amber-50 transition"
    >
      <div className="text-xs font-semibold text-amber-700">{label}</div>
      {ref.sanskrit && (
        <p className="mt-1 text-sm text-amber-900 line-clamp-2">{ref.sanskrit}</p>
      )}
      {ref.translation && (
        <p className="mt-1 text-xs text-muted line-clamp-2">{ref.translation}</p>
      )}
    </Link>
  );
}

export default function ChatMessage({
  role,
  content,
  references,
  provider,
  labels,
}) {
  const isUser = role === "user";
  const providerLabels = labels?.providerLabels || {};

  return (
    <div
      className={`max-w-[90%] px-5 py-4 rounded-2xl mb-4 shadow-sm ${isUser
        ? "ml-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white"
        : "mr-auto bg-white/90 border border-amber-100 text-amber-900"
        }`}
    >
      <p className="leading-relaxed whitespace-pre-wrap">
        {content}
      </p>

      {/* Verse references */}
      {!isUser && references && references.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            {labels?.referencedVerses || "Referenced Verses"}
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {references.map((r, i) => (
              <VerseRefCard key={i} verseRef={r} />
            ))}
          </div>
        </div>
      )}

      {/* Provider badge */}
      {!isUser && provider && provider !== "none" && (
        <div className="mt-3 flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
          <span className="text-[0.6rem] text-muted">
            {provider === "groq"
              ? providerLabels.groq || "AI-powered"
              : provider === "ollama"
                ? providerLabels.ollama || "Local AI"
                : providerLabels.default || "Verse match"}
          </span>
        </div>
      )}
    </div>
  );
}
