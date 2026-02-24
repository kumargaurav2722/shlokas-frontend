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
        "🙏 Ask any question based on the Bhagavad Gita. I will answer using the scriptures."
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (question) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question }
    ]);

    setLoading(true);

    try {
      const res = await askScripture(question);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.answer
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I could not find an answer in the given scriptures."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col h-[calc(100vh-64px)]">
        <div className="px-6 py-4 border-b bg-white">
          <h1 className="text-2xl font-semibold">Ask the Gita</h1>
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
