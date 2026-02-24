import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { signup } from "../../services/auth.service";
import { LANG_OPTIONS } from "../../i18n/translations";
import { api } from "../../services/api";

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

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [interests, setInterests] = useState([]);
  const googleUrl = `${api.defaults.baseURL}/auth/google/start?next=${encodeURIComponent(window.location.origin + "/auth/google/callback")}`;

  const toggleInterest = (value) => {
    setInterests((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      }
      if (prev.length >= 3) return prev;
      return [...prev, value];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = {
      email: form.get("email"),
      password: form.get("password"),
      fullName: form.get("fullName"),
      age: form.get("age") ? Number(form.get("age")) : null,
      gender: form.get("gender") || null,
      region: form.get("region") || null,
      preferredLanguage: form.get("preferredLanguage") || "en",
      interests
    };

    try {
      setError("");
      await signup(payload);
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <AuthLayout title="Create Account">
      <a
        href={googleUrl}
        className="mb-4 w-full inline-flex items-center justify-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm font-semibold text-amber-900 shadow-sm hover:bg-white"
      >
        Continue with Google
      </a>
      {error && (
        <div className="mb-4 text-sm text-red-600 text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="age"
            placeholder="Age (optional)"
            min="1"
            className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <select
            name="gender"
            className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
            defaultValue=""
          >
            <option value="">Gender (optional)</option>
            {GENDER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          name="region"
          placeholder="Region (e.g., North India)"
          className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
        <select
          name="preferredLanguage"
          className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
          defaultValue="en"
        >
          {LANG_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="space-y-2">
          <div className="text-xs text-muted">Interests (pick up to 3)</div>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((item) => {
              const active = interests.includes(item);
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
          {interests.length >= 3 && (
            <div className="text-[0.7rem] text-amber-700">
              Maximum 3 interests selected.
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-sm"
        >
          Sign Up
        </button>

        <div className="text-sm text-center mt-4">
          <Link to="/login" className="underline">
            Already have an account?
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
