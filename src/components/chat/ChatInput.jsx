export default function ChatInput({ value, onChangeText, onSend, loading }) {
  const send = () => {
    onSend(value);
  };

  return (
    <div className="sticky bottom-0 z-20 shrink-0 border-t border-amber-100/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl gap-2 p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
        <input
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Ask the Gita…"
          aria-label="Ask the Gita"
          className="flex-1 rounded-full border border-amber-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed disabled:bg-amber-50/50"
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={loading}
        />

        <button
          type="button"
          onClick={send}
          disabled={loading || !value.trim()}
          className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:from-amber-600 hover:to-orange-600 disabled:opacity-50"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
