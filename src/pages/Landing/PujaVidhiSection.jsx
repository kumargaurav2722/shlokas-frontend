import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const PUJAS = [
  { title: "Ganesh Puja", note: "Step-by-step sankalp and arati" },
  { title: "Lakshmi Puja", note: "Prosperity ritual guidance" },
  { title: "Satyanarayan Katha", note: "Complete katha with vidhi" }
];

export default function PujaVidhiSection() {
  const { language } = useLanguage();
  return (
    <section className="px-6 py-20 section-shell">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
            Ritual Guidance
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-amber-900">
            Dharmik Puja Vidhi, ready for download
          </h2>
          <p className="mt-3 text-muted">
            Access puja steps in clean text or downloadable PDF formats from
            the backend.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to={withLangPrefix("/puja-vidhi", language)}
              className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Browse Puja Vidhi
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PUJAS.map((puja) => (
            <div key={puja.title} className="card-surface rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-amber-900">
                {puja.title}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {puja.note}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-amber-800">
                Text + PDF options →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
