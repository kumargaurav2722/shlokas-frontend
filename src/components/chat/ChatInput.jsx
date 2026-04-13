import { useState } from "react";

export default function ChatInput({
  onSend,
  loading,
  placeholder = "Ask the Gita...",
  ariaLabel = "Ask the Gita",
  buttonLabel = "Ask",
}) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="sticky bottom-0 z-20 shrink-0 border-t border-amber-100/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl gap-2 p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          className="flex-1 rounded-full border border-amber-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed disabled:bg-amber-50/50"
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={loading}
        />

        <button
          type="button"
          onClick={send}
          disabled={loading || !text.trim()}
          className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:from-amber-600 hover:to-orange-600 disabled:opacity-50"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
