import { useState } from "react";
import AudioPlayer from "../../components/AudioPlayer";

export default function PopularShlokas() {
  const [activeLang, setActiveLang] = useState("en");

  // temporary static data (later API driven)
  const shloka = {
    id: "demo-id",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।",
    hi: "तुम्हारा अधिकार केवल कर्म करने में है, फल में नहीं।",
    en: "You have the right to perform your duty, not to the results.",
    bn: "তোমার অধিকার শুধু কর্মে, ফলের উপর নয়।",
    mr: "तुला फक्त कर्म करण्याचा अधिकार आहे, फळांवर नाही.",
    te: "నీకు హక్కు కేవలం కర్మ చేయడమే, ఫలాలపై కాదు.",
    ta: "உனக்கு உரியது செயல்படுவது மட்டுமே, பலன்கள் அல்ல.",
    kn: "ನಿನಗೆ ಹಕ್ಕು ಕರ್ಮ ಮಾಡುವುದರಲ್ಲಿ ಮಾತ್ರ, ಫಲಗಳ ಮೇಲೆ ಅಲ್ಲ."
  };

  const translations = {
    en: shloka.en,
    hi: shloka.hi,
    bn: shloka.bn,
    mr: shloka.mr,
    te: shloka.te,
    ta: shloka.ta,
    kn: shloka.kn
  };

  const langLabels = {
    en: "English",
    hi: "Hindi",
    bn: "Bengali",
    mr: "Marathi",
    te: "Telugu",
    ta: "Tamil",
    kn: "Kannada"
  };

  return (
    <section
      className="px-6 py-20 animate-fade-up"
      style={{ animationDelay: "120ms" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
            Highlight
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-amber-900">
            Shloka of the Week
          </h2>
          <p className="mt-3 text-muted">
            A verse to carry with you throughout the week.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card-surface rounded-3xl p-8">
            <p className="text-xl leading-relaxed text-amber-900">
              {shloka.sanskrit}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {Object.keys(translations).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    activeLang === lang
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent"
                      : "border-amber-200 text-amber-900 bg-white/70"
                  }`}
                >
                  {langLabels[lang]}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">
              {translations[activeLang]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AudioPlayer textId={shloka.id} language="sanskrit" />
              <AudioPlayer textId={shloka.id} language="hi" />
              <AudioPlayer textId={shloka.id} language="en" />
            </div>
          </div>

          <div className="card-surface rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
                Ritual
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-amber-900">
                Evening Reflection
              </h3>
              <p className="mt-3 text-muted">
                Spend 5 minutes listening to a shloka, and note one insight you
                can apply today.
              </p>
            </div>
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4 text-white">
              <p className="text-sm">Create your daily ritual</p>
              <p className="text-xs opacity-90">
                set reminders and audio pace
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
