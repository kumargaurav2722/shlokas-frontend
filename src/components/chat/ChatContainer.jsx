import ChatEmptyState from "./ChatEmptyState";
import ChatMessage from "./ChatMessage";

export default function ChatContainer({
  messages,
<<<<<<< HEAD
  labels,
  emptyState,
=======
  suggestions = [],
>>>>>>> e2a85248ea258e9efd459f0d15025d1b689a37d4
  onSelectSuggestion,
  loading = false,
}) {
  const hasMessages = messages.length > 0;

  return (
    <div
<<<<<<< HEAD
      className="min-h-0 flex-1 overflow-y-auto px-6 py-8 bg-gradient-to-b from-amber-50/40 to-white"
=======
      className="min-h-0 flex-1 overflow-y-auto bg-gradient-to-b from-amber-50/40 to-white px-6 py-8"
>>>>>>> e2a85248ea258e9efd459f0d15025d1b689a37d4
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
<<<<<<< HEAD
              labels={labels}
=======
>>>>>>> e2a85248ea258e9efd459f0d15025d1b689a37d4
            />
          ))}
        </div>
      ) : (
        <ChatEmptyState
<<<<<<< HEAD
          title={emptyState?.title}
          subtitle={emptyState?.subtitle}
          description={emptyState?.description}
          suggestions={emptyState?.suggestions}
=======
          suggestions={suggestions}
>>>>>>> e2a85248ea258e9efd459f0d15025d1b689a37d4
          onSelectSuggestion={onSelectSuggestion}
          loading={loading}
        />
      )}
    </div>
  );
}
