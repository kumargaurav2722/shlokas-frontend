import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ChatContainer from "../../components/chat/ChatContainer";
import ChatInput from "../../components/chat/ChatInput";
import { askScripture } from "../../services/chat.service";

export default function AskScripture() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "🙏 Ask any question based on the Bhagavad Gita. I will answer using the scriptures.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (question) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
    ]);

    setLoading(true);

    // Show typing indicator
    const typingId = Date.now();
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Searching scriptures…", _typing: true, _id: typingId },
    ]);

    try {
      const res = await askScripture(question);
      const data = res.data;

      // Remove typing indicator and add real response
      setMessages((prev) => [
        ...prev.filter((m) => !m._typing),
        {
          role: "assistant",
          content: data.answer,
          references: data.references || [],
          provider: data.provider || "",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.filter((m) => !m._typing),
        {
          role: "assistant",
          content:
            err.response?.data?.detail ||
            "I could not reach the server. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col h-[calc(100vh-64px)]">
        <div className="px-6 py-4 border-b border-amber-100/70 bg-white/90 backdrop-blur">
          <h1 className="text-2xl font-semibold text-amber-900">Ask the Gita</h1>
          <p className="text-sm text-muted">
            Ask questions and receive answers grounded in scripture.
          </p>
        </div>
        <ChatContainer messages={messages} />
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
    </>
  );
}
