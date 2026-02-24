const LANGS = [
  "English",
  "Hindi",
  "Bengali",
  "Marathi",
  "Telugu",
  "Tamil",
  "Kannada"
];

export default function LanguageTabs({ onSelect }) {
  return (
    <div>
      {LANGS.map(l => (
        <button key={l} onClick={() => onSelect(l)}>
          {l}
        </button>
      ))}
    </div>
  );
}
