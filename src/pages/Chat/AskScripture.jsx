import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ChatContainer from "../../components/chat/ChatContainer";
import ChatInput from "../../components/chat/ChatInput";
import { askScripture } from "../../services/chat.service";

const LANGUAGES = [
  { code: "English", label: "English", flag: "🇬🇧" },
  { code: "Hindi", label: "हिन्दी (Hindi)", flag: "🇮🇳" },
  { code: "Sanskrit", label: "संस्कृतम् (Sanskrit)", flag: "🕉️" },
  { code: "Bengali", label: "বাংলা (Bengali)", flag: "🇮🇳" },
  { code: "Tamil", label: "தமிழ் (Tamil)", flag: "🇮🇳" },
  { code: "Telugu", label: "తెలుగు (Telugu)", flag: "🇮🇳" },
  { code: "Marathi", label: "मराठी (Marathi)", flag: "🇮🇳" },
  { code: "Kannada", label: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳" },
  { code: "Gujarati", label: "ગુજરાતી (Gujarati)", flag: "🇮🇳" },
];

export default function AskScripture() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "🙏 Ask any question based on the Bhagavad Gita. I will answer using the scriptures.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");

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
      { role: "assistant", content: `Searching scriptures (${language})…`, _typing: true, _id: typingId },
    ]);

    try {
      const res = await askScripture(question, null, language);
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
        <div className="px-6 py-4 border-b border-amber-100/70 bg-white/90 backdrop-blur flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-amber-900">Ask the Gita</h1>
            <p className="text-sm text-muted">
              Ask questions and receive answers grounded in scripture.
            </p>
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="chat-lang"
              className="text-xs font-medium text-amber-700 whitespace-nowrap"
            >
              Answer in:
            </label>
            <select
              id="chat-lang"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-sm text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-300 cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ChatContainer messages={messages} />
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
    </>
  );
}

