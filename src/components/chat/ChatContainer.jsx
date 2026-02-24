import ChatMessage from "./ChatMessage";

export default function ChatContainer({ messages }) {
  return (
    <div
      className="flex-1 overflow-y-auto px-6 py-8 bg-gradient-to-b from-amber-50/40 to-white"
      role="log"
      aria-live="polite"
    >
      <div className="mx-auto max-w-3xl">
        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            role={msg.role}
            content={msg.content}
            references={msg.references}
            provider={msg.provider}
          />
        ))}
      </div>
    </div>
  );
}
