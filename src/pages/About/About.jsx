import Navbar from "../../components/layout/Navbar";
import useLanguage from "../../hooks/useLanguage";

export default function About() {
  const { t } = useLanguage() || {};
  return (
    <>
      <Navbar />
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-semibold text-amber-900">
            {t?.("about.title") || "About Shlokas"}
          </h1>
          <p className="mt-3 text-muted">
            {t?.("about.subtitle") ||
              "A respectful, modern home for timeless verses and guidance."}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="card-surface rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-amber-900">
                {t?.("about.mission_title") || "Our Mission"}
              </h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {t?.("about.mission_body") ||
                  "We curate shlokas from authentic sources, present them with clarity, and make them accessible in multiple languages so seekers can read, reflect, and return daily."}
              </p>
            </div>
            <div className="card-surface rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-amber-900">
                {t?.("about.sources_title") || "Sources & Authenticity"}
              </h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {t?.("about.sources_body") ||
                  "Texts are sourced from reputable public datasets and verified editions. Where available, we cite traditional commentaries and preserve the original Sanskrit alongside translations."}
              </p>
            </div>
            <div className="card-surface rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-amber-900">
                {t?.("about.trust_title") || "Respect & Trust"}
              </h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {t?.("about.trust_body") ||
                  "Our platform is non-commercial and focused on respectful presentation. We avoid sensationalism and prioritize sincerity, accuracy, and cultural sensitivity."}
              </p>
            </div>
            <div className="card-surface rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-amber-900">
                {t?.("about.community_title") || "For the Community"}
              </h2>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {t?.("about.community_body") ||
                  "Whether you are beginning your journey or deepening your practice, we aim to be a steady companion with daily verses, audio recitations, and mindful guidance."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
