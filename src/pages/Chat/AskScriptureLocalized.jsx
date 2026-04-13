import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import ChatContainer from "../../components/chat/ChatContainer";
import ChatInputLocalized from "../../components/chat/ChatInputLocalized";
import { askScripture } from "../../services/chat.service";

const LANGUAGES = [
  { code: "en", backend: "English", label: "English" },
  { code: "hi", backend: "Hindi", label: "हिन्दी" },
  { code: "sa", backend: "Sanskrit", label: "संस्कृतम्" },
];

const UI_TEXT = {
  en: {
    title: "Ask the Gita",
    subtitle: "Ask questions and receive answers grounded in scripture.",
    answerIn: "Answer in:",
    placeholder: "Ask the Gita...",
    ask: "Ask",
    welcome:
      "🙏 Ask any question based on the Bhagavad Gita. I will answer using the scriptures.",
    typing: (languageName) => `Searching scriptures in ${languageName}...`,
    error:
      "I could not reach the server. Please check your connection and try again.",
    referencedVerses: "Referenced Verses",
    providerLabels: {
      groq: "AI-powered",
      ollama: "Local AI",
      default: "Verse match",
    },
  },
  hi: {
    title: "गीता से पूछें",
    subtitle: "प्रश्न पूछें और शास्त्र आधारित उत्तर पाएँ।",
    answerIn: "उत्तर की भाषा:",
    placeholder: "गीता से पूछें...",
    ask: "पूछें",
    welcome:
      "🙏 भगवद गीता पर आधारित कोई भी प्रश्न पूछें। मैं शास्त्रों के आधार पर उत्तर दूँगा।",
    typing: (languageName) => `${languageName} में शास्त्र खोजे जा रहे हैं...`,
    error:
      "सर्वर से जुड़ने में समस्या हुई। कृपया अपना कनेक्शन जाँचें और फिर प्रयास करें।",
    referencedVerses: "संदर्भित श्लोक",
    providerLabels: {
      groq: "AI से उत्तर",
      ollama: "स्थानीय AI",
      default: "श्लोक मिलान",
    },
  },
  sa: {
    title: "गीतां पृच्छतु",
    subtitle: "प्रश्नान् पृच्छतु, शास्त्राधारितं उत्तरं प्राप्नुयात्।",
    answerIn: "उत्तरस्यान भाषा:",
    placeholder: "गीतां पृच्छतु...",
    ask: "पृच्छतु",
    welcome:
      "🙏 भगवद्गीतायाः विषये किंचन अपि पृच्छतु। अहं शास्त्राधारेण उत्तरं दास्यामि।",
    typing: (languageName) => `${languageName} भाषायां शास्त्राणि अन्विष्यन्ते...`,
    error:
      "सर्वरेण सह सम्पर्कः न जातः। कृपया स्वीयं जालसम्बन्धं परीक्ष्य पुनः प्रयतध्वम्।",
    referencedVerses: "संदर्भिताः श्लोकाः",
    providerLabels: {
      groq: "AI-आधारितम्",
      ollama: "स्थानीय AI",
      default: "श्लोकसाम्यम्",
    },
  },
};

const createWelcomeMessage = (languageCode) => ({
  role: "assistant",
  content: UI_TEXT[languageCode].welcome,
  _kind: "welcome",
});

export default function AskScriptureLocalized() {
  const [messages, setMessages] = useState(() => [createWelcomeMessage("en")]);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);

  const text = UI_TEXT[language] || UI_TEXT.en;
  const selectedLanguage = useMemo(
    () => LANGUAGES.find((item) => item.code === language) || LANGUAGES[0],
    [language]
  );

  useEffect(() => {
    setMessages((prev) =>
      prev.map((message) =>
        message._kind === "welcome"
          ? { ...message, content: text.welcome }
          : message
      )
    );
  }, [text.welcome]);

  const handleSend = async (question) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmedQuestion }]);
    setLoading(true);

    const typingId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: text.typing(selectedLanguage.label),
        _typing: true,
        _id: typingId,
      },
    ]);

    try {
      const res = await askScripture(
        trimmedQuestion,
        null,
        selectedLanguage.backend
      );
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
    } catch (err) {
      setMessages((prev) => [
        ...prev.filter((message) => message._id !== typingId),
        {
          role: "assistant",
          content: err.response?.data?.detail || text.error,
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
            <h1 className="text-2xl font-semibold text-amber-900">{text.title}</h1>
            <p className="text-sm text-muted">{text.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="chat-lang"
              className="text-xs font-medium text-amber-700 whitespace-nowrap"
            >
              {text.answerIn}
            </label>
            <select
              id="chat-lang"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border border-amber-200 bg-white px-3 py-1.5 text-sm text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-300 cursor-pointer"
            >
              {LANGUAGES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ChatContainer
          messages={messages}
          labels={{
            referencedVerses: text.referencedVerses,
            providerLabels: text.providerLabels,
          }}
        />
        <ChatInputLocalized
          onSend={handleSend}
          loading={loading}
          placeholder={text.placeholder}
          ariaLabel={text.placeholder}
          buttonLabel={text.ask}
        />
      </div>
    </>
  );
}
