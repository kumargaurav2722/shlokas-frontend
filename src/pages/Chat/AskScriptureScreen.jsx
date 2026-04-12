import { useState } from "react";
import ChatContainer from "../../components/chat/ChatContainer";
import ChatInput from "../../components/chat/ChatInput";
import Navbar from "../../components/layout/Navbar";
import { askScripture } from "../../services/chat.service";

const LANGUAGES = [
  { code: "English", label: "English", badge: "EN" },
  { code: "Hindi", label: "Hindi", badge: "HI" },
  { code: "Sanskrit", label: "Sanskrit", badge: "SA" },
  { code: "Bengali", label: "Bengali", badge: "BN" },
  { code: "Tamil", label: "Tamil", badge: "TA" },
  { code: "Telugu", label: "Telugu", badge: "TE" },
  { code: "Marathi", label: "Marathi", badge: "MR" },
  { code: "Kannada", label: "Kannada", badge: "KN" },
  { code: "Gujarati", label: "Gujarati", badge: "GU" },
];

const SAMPLE_QUESTIONS = [
  "What does the Gita teach about handling anxiety and overthinking?",
  "Explain karma yoga in simple words with one verse reference.",
  "Which verse from the Bhagavad Gita helps when I feel lost in life?",
  "What does Krishna say about discipline and controlling the mind?",
];

export default function AskScriptureScreen() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleSend = async (rawQuestion) => {
    const question = rawQuestion.trim();
    if (!question || loading) return;

    setDraft("");
    setLoading(true);

    const typingId = Date.now();
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
      {
        role: "assistant",
        content: `Searching scriptures (${language})...`,
        _typing: true,
        _id: typingId,
      },
    ]);

    try {
      const res = await askScripture(question, null, language);
      const data = res.data;

      setMessages((prev) => [
        ...prev.filter((message) => message._id !== typingId),
        {
          role: "assistant",
          content: data.answer,
          references: data.references || [],
          provider: data.provider || "",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.filter((message) => message._id !== typingId),
        {
          role: "assistant",
          content:
            error.response?.data?.detail ||
            "I could not reach the server. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 flex flex-col gap-4 border-b border-amber-100/70 bg-white/90 px-6 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-amber-900">Ask the Gita</h1>
            <p className="text-sm text-muted">
              Ask questions and receive answers grounded in scripture.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="chat-lang"
              className="whitespace-nowrap text-xs font-medium text-amber-700"
            >
              Answer in:
            </label>
            <select
              id="chat-lang"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="cursor-pointer rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-sm text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              {LANGUAGES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.badge} {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ChatContainer
          messages={messages}
          suggestions={SAMPLE_QUESTIONS}
          onSelectSuggestion={handleSend}
          loading={loading}
        />

        <ChatInput
          value={draft}
          onChangeText={setDraft}
          onSend={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
}
