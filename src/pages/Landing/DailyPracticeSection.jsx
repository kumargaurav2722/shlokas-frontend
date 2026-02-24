import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const PRACTICES = [
  {
    title: "Daily Shloka",
    description: "Receive a fresh verse each day for reflection."
  },
  {
    title: "Audio Recitation",
    description: "Listen in Sanskrit with adjustable speed."
  },
  {
    title: "Bookmarks",
    description: "Save verses, chalisas, and puja steps."
  }
];

export default function DailyPracticeSection() {
  const { language } = useLanguage();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1fr,1.1fr] items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
            Daily Practice
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-amber-900">
            Build a calm, consistent spiritual routine
          </h2>
          <p className="mt-4 text-muted">
            Shlokas helps you combine reading, listening, and ritual guidance
            into a focused daily practice.
          </p>
          <Link
            to={withLangPrefix("/profile", language)}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-800"
          >
            Open Your Practice →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PRACTICES.map((item) => (
            <div key={item.title} className="card-surface rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-amber-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
