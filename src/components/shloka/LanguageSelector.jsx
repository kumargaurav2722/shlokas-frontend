import { useEffect } from "react";
import useLanguage from "../../hooks/useLanguage";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { getPathLanguage, stripLangPrefix, withLangPrefix } from "../../utils/lang";

export default function LanguageSelector() {
  const { language, setLanguage, options } = useLanguage();
  const { user, updateUser } = useUser() || {};
  const navigate = useNavigate();

  const handleChange = (value) => {
    setLanguage(value);
    if (user) {
      updateUser({ preferredLanguage: value }).catch(() => {});
    }
    if (typeof window !== "undefined") {
      const currentPath = stripLangPrefix(window.location.pathname + window.location.search);
      const nextPath = withLangPrefix(currentPath, value);
      navigate(nextPath);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pathLang = getPathLanguage(window.location.pathname);
    if (pathLang && pathLang !== language) {
      setLanguage(pathLang);
    }
  }, []);

  return (
    <select
      value={language}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-full border border-amber-200 bg-white/80 px-3 py-1 text-xs font-medium text-amber-900 shadow-sm"
      aria-label="Select language"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
