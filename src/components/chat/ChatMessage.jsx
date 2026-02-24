export default function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`max-w-[90%] px-5 py-4 rounded-2xl mb-4 shadow-sm ${
        isUser
          ? "ml-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white"
          : "mr-auto bg-white/90 border border-amber-100 text-amber-900"
      }`}
    >
      <p className="leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}
