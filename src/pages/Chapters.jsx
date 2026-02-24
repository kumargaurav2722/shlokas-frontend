import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Chapters({ onChapter }) {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    api.get("/texts/chapters", {
      params: {
        work: "Mahabharata",
        sub_work: "Bhagavad Gita"
      }
    }).then(res => setChapters(res.data));
  }, []);

  return (
    <div>
      <h2>Chapters</h2>
      {chapters.map(c => (
        <button key={c} onClick={() => onChapter(c)}>
          Chapter {c}
        </button>
      ))}
    </div>
  );
}
