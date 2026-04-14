import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const PUJAS = [
  {
    titleKey: "home.puja_ganesh_title",
    noteKey: "home.puja_ganesh_note"
  },
  {
    titleKey: "home.puja_lakshmi_title",
    noteKey: "home.puja_lakshmi_note"
  },
  {
    titleKey: "home.puja_satyanarayan_title",
    noteKey: "home.puja_satyanarayan_note"
  }
];

export default function PujaVidhiSection() {
  const { language, t } = useLanguage() || {};

  return (
    <section className="section-shell px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
            {t?.("home.puja_badge")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-amber-900">
            {t?.("home.puja_title")}
          </h2>
          <p className="mt-3 text-muted">
            {t?.("home.puja_description")}
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to={withLangPrefix("/puja-vidhi", language)}
              className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:from-amber-600 hover:to-orange-600"
            >
              {t?.("home.puja_cta")}
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PUJAS.map((puja) => (
            <div key={puja.titleKey} className="card-surface rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-amber-900">
                {t?.(puja.titleKey)}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {t?.(puja.noteKey)}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-amber-800">
                {t?.("home.puja_card_badge")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
