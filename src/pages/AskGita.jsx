import { useState } from "react";
import { api } from "../services/api";

export default function AskGita() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  const ask = async () => {
    const res = await api.post("/chat", null, { params: { question: q } });
    setA(res.data.answer);
  };

  return (
    <div>
      <h2>Ask the Gita</h2>
      <input value={q} onChange={e => setQ(e.target.value)} />
      <button onClick={ask}>Ask</button>
      <pre>{a}</pre>
    </div>
  );
}
