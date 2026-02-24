import { Link } from "react-router-dom";
import useLanguage from "../../hooks/useLanguage";
import { withLangPrefix } from "../../utils/lang";

const FOOTER_LINKS = [
  {
    heading: "Scriptures",
    links: [
      { label: "Bhagavad Gita", to: "/bhagavad-gita" },
      { label: "Vedas", to: "/scriptures/vedas" },
      { label: "Upanishads", to: "/upanishads" },
      { label: "Puranas", to: "/scriptures/puranas" },
      { label: "Ramayana", to: "/scriptures/ramayana" },
    ],
  },
  {
    heading: "Features",
    links: [
      { label: "Ask the Gita", to: "/chat" },
      { label: "Verse of the Day", to: "/verse-of-the-day" },
      { label: "Bookmarks", to: "/bookmarks" },
      { label: "Topics", to: "/topics" },
      { label: "Search", to: "/search" },
    ],
  },
  {
    heading: "Devotion",
    links: [
      { label: "Chalisa", to: "/chalisas" },
      { label: "Puja Vidhi", to: "/puja-vidhi" },
      { label: "Mahabharata", to: "/scriptures/mahabharata" },
      { label: "Bhagavata Purana", to: "/bhagavata-purana" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "About", to: "/about" },
      { label: "Profile", to: "/profile" },
      { label: "History", to: "/history" },
    ],
  },
];

export default function Footer() {
  const { language } = useLanguage();
  const prefixed = (path) => withLangPrefix(path, language);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-amber-100/70 bg-gradient-to-b from-white/90 to-amber-50/60 mt-16">
      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* Brand + columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to={prefixed("/")} className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700 shadow-sm">
                ॐ
              </span>
              <span className="text-xl font-semibold tracking-wide text-amber-900">
                Shlokas
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed max-w-xs">
              A respectful, modern home for timeless verses and guidance — read,
              listen, and reflect daily.
            </p>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-amber-700 font-semibold mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={prefixed(link.to)}
                      className="text-sm text-amber-900/80 hover:text-amber-700 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="glow-divider mt-10 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {year} Shlokas. All rights reserved.</p>
          <p>
            Built with reverence • Curated from authentic Sanskrit sources
          </p>
        </div>
      </div>
    </footer>
  );
}
