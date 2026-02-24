import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LanguageSelector from "../shloka/LanguageSelector";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import useTheme from "../../hooks/useTheme";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const EXPLORE_LINKS = [
  { key: "scripture.vedas", to: "/scriptures/vedas" },
  { key: "scripture.upanishads", to: "/upanishads" },
  { key: "scripture.puranas", to: "/scriptures/puranas" },
  { key: "scripture.gita", to: "/bhagavad-gita" },
  { key: "scripture.ramayana", to: "/scriptures/ramayana" },
  { key: "scripture.mahabharata", to: "/scriptures/mahabharata" },
  { key: "scripture.bhagavata", to: "/bhagavata-purana" },
  { key: "scripture.chalisa", to: "/chalisas" },
  { key: "scripture.puja", to: "/puja-vidhi" },
  { key: "nav.topics", to: "/topics" },
  { key: "nav.about", to: "/about" }
];

export default function Navbar() {
  const { token, logoutUser } = useAuth() || {};
  const { user } = useUser() || {};
  const { theme, toggleTheme } = useTheme();
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const initials = (() => {
    const name = user?.fullName || user?.email || "";
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  })();

  const badgeColor = (() => {
    const seed = (user?.id || user?.email || "user").split("")
      .reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const palette = ["#F4B183", "#F6D365", "#F29F8D", "#F2C14E", "#E7A977"];
    return palette[seed % palette.length];
  })();

  const handleSearch = (e) => {
    e.preventDefault();
    const term = search.trim();
    if (!term) return;
    navigate(withLangPrefix(`/search?q=${encodeURIComponent(term)}`, language));
    setSearch("");
  };
  const prefixed = (path) => withLangPrefix(path, language);

  return (
    <nav className="sticky top-0 z-40 border-b border-amber-100/70 bg-gradient-to-b from-white/95 to-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to={prefixed("/")} className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700 shadow-sm">
            ॐ
          </span>
          <span className="text-xl font-semibold tracking-wide text-amber-900">
            Shlokas
          </span>
        </Link>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/80 px-3 py-1"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("nav.search_placeholder")}
              className="w-40 bg-transparent text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="text-xs font-semibold text-amber-800"
            >
              {t("nav.go")}
            </button>
          </form>
          <LanguageSelector />
          <button
            onClick={toggleTheme}
            className="rounded-full px-3 py-2 text-xs font-medium text-amber-900 border border-amber-200/70 bg-white/70 hover:bg-white"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <Link
            className="rounded-full px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50"
            to={prefixed("/chat")}
          >
            {t("nav.ask")}
          </Link>
          {token ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-amber-900 border border-amber-200 shadow-sm"
                style={{ backgroundColor: badgeColor }}
                aria-label="Open profile menu"
              >
                {initials || "U"}
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-amber-100 bg-white shadow-lg overflow-hidden z-50">
                  <Link to={prefixed("/profile")} className="block px-4 py-2 text-sm hover:bg-amber-50">{t("nav.profile")}</Link>
                  <Link to={prefixed("/bookmarks")} className="block px-4 py-2 text-sm hover:bg-amber-50">{t("nav.bookmarks")}</Link>
                  <Link to={prefixed("/history")} className="block px-4 py-2 text-sm hover:bg-amber-50">{t("nav.history")}</Link>
                  <Link to={prefixed("/admin/insights")} className="block px-4 py-2 text-sm hover:bg-amber-50">{t("nav.insights") === "nav.insights" ? "Insights" : t("nav.insights")}</Link>
                  <button onClick={logoutUser} className="w-full text-left px-4 py-2 text-sm hover:bg-amber-50">{t("nav.logout")}</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link className="rounded-full px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50" to={prefixed("/login")}>{t("nav.sign_in")}</Link>
              <Link className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" to={prefixed("/signup")}>{t("nav.sign_up")}</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg border border-amber-200/70 bg-white/70"
          aria-label="Toggle mobile menu"
        >
          <span className={`block h-0.5 w-5 bg-amber-800 transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-5 bg-amber-800 transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-amber-800 transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Desktop explore bar */}
      <div className="hidden md:block border-t border-amber-100/70 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-6 py-2 text-sm">
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-amber-700">
            {t("nav.explore")}
          </span>
          {EXPLORE_LINKS.map((link) => (
            <Link
              key={link.to}
              to={prefixed(link.to)}
              className="rounded-full border border-amber-200/70 px-3 py-1 text-xs font-medium text-amber-900 hover:bg-amber-50"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-100/70 bg-white/95 backdrop-blur px-6 py-4 space-y-4 animate-fade-up">
          <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/80 px-3 py-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("nav.search_placeholder")}
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
            <button type="submit" className="text-sm font-semibold text-amber-800">{t("nav.go")}</button>
          </form>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={toggleTheme}
              className="rounded-full px-3 py-2 text-xs font-medium text-amber-900 border border-amber-200/70 bg-white/70"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="w-full text-[0.65rem] uppercase tracking-[0.3em] text-amber-700 mb-1">{t("nav.explore")}</span>
            {EXPLORE_LINKS.map((link) => (
              <Link
                key={link.to}
                to={prefixed(link.to)}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full border border-amber-200/70 px-3 py-1 text-xs font-medium text-amber-900 hover:bg-amber-50"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-100/70">
            <Link onClick={() => setMobileMenuOpen(false)} className="rounded-full px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50" to={prefixed("/chat")}>{t("nav.ask")}</Link>
            {token ? (
              <>
                <Link onClick={() => setMobileMenuOpen(false)} className="rounded-full px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50" to={prefixed("/profile")}>{t("nav.profile")}</Link>
                <Link onClick={() => setMobileMenuOpen(false)} className="rounded-full px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50" to={prefixed("/bookmarks")}>{t("nav.bookmarks")}</Link>
                <button onClick={() => { logoutUser(); setMobileMenuOpen(false); }} className="rounded-full px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50">{t("nav.logout")}</button>
              </>
            ) : (
              <>
                <Link onClick={() => setMobileMenuOpen(false)} className="rounded-full px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-50" to={prefixed("/login")}>{t("nav.sign_in")}</Link>
                <Link onClick={() => setMobileMenuOpen(false)} className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm bg-gradient-to-r from-amber-500 to-orange-500" to={prefixed("/signup")}>{t("nav.sign_up")}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
