import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="border-t border-amber-100/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl gap-2 p-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask the Gita…"
          aria-label="Ask the Gita"
          className="flex-1 rounded-full border border-amber-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          onKeyDown={(e) => e.key === "Enter" && send()}
        />

        <button
          onClick={send}
          disabled={loading}
          className="rounded-full px-5 py-3 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
