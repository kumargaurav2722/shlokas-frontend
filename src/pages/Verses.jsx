import { useEffect, useState } from "react";
import { api } from "../services/api";
import AudioPlayer from "../components/AudioPlayer";

const LANGUAGES = [
  { code: "hi", label: "Hindi" },
  { code: "en", label: "English" },
  { code: "mr", label: "Marathi" },
  { code: "ta", label: "Tamil" },
  { code: "kn", label: "Kannada" },
  { code: "ml", label: "Malayalam" }
];

function VerseCard({ verse }) {
  const [selectedLang, setSelectedLang] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [commentary, setCommentary] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadTranslation = async (lang) => {
    try {
      setLoading(true);
      setSelectedLang(lang);

      const res = await api.post(
        `/translate/${verse.id}`,
        null,
        { params: { language: lang } }
      );

      setTranslation(res.data.translation);
      setCommentary(res.data.commentary);
    } catch (err) {
      console.error(err);
      setTranslation("Failed to load translation");
      setCommentary("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        marginBottom: "24px",
        borderRadius: "8px"
      }}
    >
      {/* Shloka number */}
      <h3>
        Chapter {verse.chapter} : Shloka {verse.verse}
      </h3>

      {/* Sanskrit text */}
      <pre
        style={{
          fontSize: "18px",
          whiteSpace: "pre-wrap",
          lineHeight: "1.6"
        }}
      >
        {verse.sanskrit}
      </pre>

      {/* Sanskrit Audio */}
      <div style={{ marginBottom: "12px" }}>
        <strong>Sanskrit Audio:</strong>{" "}
        <AudioPlayer textId={verse.id} language="sanskrit" />
      </div>

      {/* Language buttons */}
      <div style={{ marginBottom: "12px" }}>
        <strong>Translation:</strong>{" "}
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => loadTranslation(l.code)}
            style={{
              marginRight: "6px",
              padding: "4px 8px",
              cursor: "pointer"
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && <p>Loading translation...</p>}

      {/* Translation text */}
      {translation && (
        <>
          <h4>
            {selectedLang?.toUpperCase()} Translation{" "}
            <AudioPlayer textId={verse.id} language={selectedLang} />
          </h4>

          <p style={{ lineHeight: "1.6" }}>{translation}</p>
        </>
      )}

      {/* Commentary */}
      {commentary && (
        <>
          <h4>Explanation</h4>
          <p style={{ lineHeight: "1.6" }}>{commentary}</p>
        </>
      )}
    </div>
  );
}

export default function Verses({ chapter }) {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!chapter) return;
    let active = true;
    setLoading(true);
    setError("");

    api
      .get("/texts/verses", {
        params: {
          work: "Mahabharata",
          sub_work: "Bhagavad Gita",
          chapter
        }
      })
      .then((res) => {
        if (active) setVerses(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        if (active) setError("Failed to load verses");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [chapter]);

  if (!chapter) {
    return (
      <div>
        <p>No chapter selected.</p>
        <a href="#/chapters">Go to chapters</a>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <h2>Chapter {chapter} Verses</h2>
      {loading && <p>Loading verses...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && verses.length === 0 && (
        <p>No verses found.</p>
      )}
      {verses.map((verse) => (
        <VerseCard key={verse.id || `${verse.chapter}-${verse.verse}`} verse={verse} />
      ))}
    </div>
  );
}
