import ChatEmptyState from "./ChatEmptyState";
import ChatMessage from "./ChatMessage";

export default function ChatContainer({
  messages,
  suggestions = [],
  onSelectSuggestion,
  loading = false,
}) {
  const hasMessages = messages.length > 0;

  return (
    <div
      className="min-h-0 flex-1 overflow-y-auto bg-gradient-to-b from-amber-50/40 to-white px-6 py-8"
      role="log"
      aria-live="polite"
    >
      {hasMessages ? (
        <div className="mx-auto max-w-3xl">
          {messages.map((msg, idx) => (
            <ChatMessage
              key={msg._id || `${msg.role}-${idx}`}
              role={msg.role}
              content={msg.content}
              references={msg.references}
              provider={msg.provider}
            />
          ))}
        </div>
      ) : (
        <ChatEmptyState
          suggestions={suggestions}
          onSelectSuggestion={onSelectSuggestion}
          loading={loading}
        />
      )}
    </div>
  );
}
