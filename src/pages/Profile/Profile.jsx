import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import useAudio from "../../hooks/useAudio";
import useLanguage from "../../hooks/useLanguage";
import useUser from "../../hooks/useUser";
import { LANG_OPTIONS } from "../../i18n/translations";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" }
];

const INTEREST_OPTIONS = [
  "karma",
  "bhakti",
  "meditation",
  "fear",
  "anxiety",
  "success",
  "devotion",
  "self-realization"
];

export default function Profile() {
  const { language } = useLanguage() || {};
  const { prefs, updatePrefs } = useAudio();
  const { user, updateUser } = useUser() || {};
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    gender: "",
    region: "",
    preferredLanguage: language || "en",
    interests: []
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user) return;
    setForm({
      fullName: user.fullName || "",
      age: user.age ?? "",
      gender: user.gender || "",
      region: user.region || "",
      preferredLanguage: user.preferredLanguage || "en",
      interests: user.interests || []
    });
  }, [user]);

  const toggleInterest = (value) => {
    setForm((prev) => {
      const interests = prev.interests || [];
      if (interests.includes(value)) {
        return { ...prev, interests: interests.filter((i) => i !== value) };
      }
      if (interests.length >= 3) return prev;
      return { ...prev, interests: [...interests, value] };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setStatus("");
      await updateUser({
        fullName: form.fullName,
        age: form.age ? Number(form.age) : null,
        gender: form.gender || null,
        region: form.region || null,
        preferredLanguage: form.preferredLanguage || "en",
        interests: form.interests || []
      });
      setStatus("Profile updated.");
    } catch {
      setStatus("Failed to update profile.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <section className="card-surface rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-amber-900 mb-4">
            Profile
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                type="text"
                placeholder="Full Name"
                className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm"
              />
              <input
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                type="number"
                placeholder="Age"
                className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm"
              >
                <option value="">Gender</option>
                {GENDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <input
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                type="text"
                placeholder="Region"
                className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm"
              />
            </div>
            <select
              value={form.preferredLanguage}
              onChange={(e) => setForm({ ...form, preferredLanguage: e.target.value })}
              className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm"
            >
              {LANG_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div>
              <div className="text-xs text-muted mb-2">Interests (max 3)</div>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((item) => {
                  const active = form.interests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                        active
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent"
                          : "border-amber-200 text-amber-900 bg-white/70"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              type="submit"
              className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Save
            </button>
            {status && (
              <div className="text-xs text-muted">{status}</div>
            )}
          </form>
        </section>

        <section className="card-surface rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-amber-900 mb-4">
            Preferences
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <label className="text-sm text-muted block mb-1">
                Audio Speed
              </label>
              <select
                value={prefs.rate}
                onChange={(e) =>
                  updatePrefs({ rate: Number(e.target.value) })
                }
                className="border border-amber-200 rounded-full px-3 py-1 text-sm bg-white/80"
              >
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>
            <Link
              to="/bookmarks"
              className="rounded-full border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50"
            >
              View Bookmarks
            </Link>
            <Link
              to="/history"
              className="rounded-full border border-amber-200 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50"
            >
              View History
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
