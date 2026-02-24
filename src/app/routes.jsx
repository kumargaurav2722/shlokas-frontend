import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import { useParams } from "react-router-dom";

// Lazy-loaded pages for code splitting
const ScripturesHome = lazy(() => import("../pages/Scriptures/ScripturesHome"));
const TextList = lazy(() => import("../pages/Scriptures/TextList"));
const ChapterList = lazy(() => import("../pages/Scriptures/ChapterList"));
const VersePage = lazy(() => import("../pages/Scriptures/VersePage"));
const RamayanaOverview = lazy(() => import("../pages/Scriptures/RamayanaOverview"));
const GitaOverview = lazy(() => import("../pages/Scriptures/GitaOverview"));
const BhagavataPuranaOverview = lazy(() => import("../pages/Scriptures/BhagavataPuranaOverview"));
const VedasOverview = lazy(() => import("../pages/Scriptures/VedasOverview"));
const UpanishadsOverview = lazy(() => import("../pages/Scriptures/UpanishadsOverview"));
const PuranasOverview = lazy(() => import("../pages/Scriptures/PuranasOverview"));
const MahabharataOverview = lazy(() => import("../pages/Scriptures/MahabharataOverview"));
const SearchPage = lazy(() => import("../pages/Search/SearchPage"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));
const GoogleCallback = lazy(() => import("../pages/Auth/GoogleCallback"));
const AskScripture = lazy(() => import("../pages/Chat/AskScripture"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Chalisas = lazy(() => import("../pages/Devotion/Chalisas"));
const PujaVidhi = lazy(() => import("../pages/Devotion/PujaVidhi"));
const Bookmarks = lazy(() => import("../pages/Bookmarks/Bookmarks"));
const History = lazy(() => import("../pages/History/History"));
const TopicsIndex = lazy(() => import("../pages/Topics/TopicsIndex"));
const TopicDetail = lazy(() => import("../pages/Topics/TopicDetail"));
const VerseOfDay = lazy(() => import("../pages/VerseOfDay"));
const About = lazy(() => import("../pages/About/About"));
const Insights = lazy(() => import("../pages/Admin/Insights"));

function RouteFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xl animate-pulse">ॐ</span>
        <span className="text-sm text-muted">Loading...</span>
      </div>
    </div>
  );
}

const deslug = (value = "") =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const parseNumber = (value = "") => {
  const match = value.toString().match(/\d+/);
  return match ? Number(match[0]) : NaN;
};

const parsePair = (value = "") => {
  const match = value.toString().match(/(\d+)[^\d]+(\d+)/);
  if (!match) return { chapter: NaN, verse: NaN };
  return { chapter: Number(match[1]), verse: Number(match[2]) };
};

const GitaChapterRoute = () => {
  const { chapter } = useParams();
  const chapterNumber = parseNumber(chapter);
  return (
    <VersePage
      categoryOverride="gita"
      textOverride="Bhagavad Gita"
      workOverride="Mahabharata"
      subWorkOverride="Bhagavad Gita"
      chapterOverride={chapterNumber}
    />
  );
};

const GitaVerseRoute = () => {
  const { chapter, verse } = useParams();
  const chapterNumber = parseNumber(chapter);
  const verseNumber = parseNumber(verse);
  return (
    <VersePage
      categoryOverride="gita"
      textOverride="Bhagavad Gita"
      workOverride="Mahabharata"
      subWorkOverride="Bhagavad Gita"
      chapterOverride={chapterNumber}
      focusVerse={verseNumber}
    />
  );
};

const UpanishadTextRoute = () => {
  const { text = "" } = useParams();
  const title = deslug(text);
  return (
    <ChapterList
      categoryOverride="upanishads"
      workOverride="Upanishads"
      subWorkOverride={title}
      titleOverride={`${title} Upanishad`}
    />
  );
};

const UpanishadSegmentRoute = () => {
  const { text = "", segment = "" } = useParams();
  const title = deslug(text);
  if (segment.toString().startsWith("verse-")) {
    const { chapter, verse } = parsePair(segment);
    return (
      <VersePage
        categoryOverride="upanishads"
        textOverride={title}
        workOverride="Upanishads"
        subWorkOverride={title}
        chapterOverride={chapter}
        focusVerse={verse}
      />
    );
  }
  const chapterNumber = parseNumber(segment);
  return (
    <VersePage
      categoryOverride="upanishads"
      textOverride={title}
      workOverride="Upanishads"
      subWorkOverride={title}
      chapterOverride={chapterNumber}
    />
  );
};

const ScriptureChapterRoute = () => {
  const { chapterSegment } = useParams();
  const chapterNumber = parseNumber(chapterSegment);
  return <VersePage chapterOverride={chapterNumber} />;
};

const ScriptureVerseRoute = () => {
  const { chapterSegment, verseSegment } = useParams();
  const chapterNumber = parseNumber(chapterSegment);
  const verseNumber = parseNumber(verseSegment);
  return (
    <VersePage
      chapterOverride={chapterNumber}
      focusVerse={verseNumber}
    />
  );
};

const LangLayout = () => <Outlet />;

const langRoutes = (
  <>
    <Route index element={<Landing />} />
    <Route path="scriptures" element={<ScripturesHome />} />
    <Route path="topics" element={<TopicsIndex />} />
    <Route path="topics/:topic" element={<TopicDetail />} />
    <Route path="verse-of-the-day" element={<VerseOfDay />} />
    <Route path="about" element={<About />} />
    <Route path="admin/insights" element={<Insights />} />
    <Route path="bhagavad-gita" element={<GitaOverview />} />
    <Route path="bhagavad-gita/:chapter" element={<GitaChapterRoute />} />
    <Route
      path="bhagavad-gita/:chapter/:verse"
      element={<GitaVerseRoute />}
    />
    <Route path="upanishads" element={<UpanishadsOverview />} />
    <Route path="upanishads/:text" element={<UpanishadTextRoute />} />
    <Route
      path="upanishads/:text/:segment"
      element={<UpanishadSegmentRoute />}
    />
    <Route
      path="veda-overview"
      element={<Navigate to="vedas-overview" replace />}
    />
    <Route
      path="vedas"
      element={<Navigate to="vedas-overview" replace />}
    />
    <Route path="vedas-overview" element={<VedasOverview />} />
    <Route
      path="upanishad-overview"
      element={<Navigate to="upanishads-overview" replace />}
    />
    <Route
      path="upnishad-overview"
      element={<Navigate to="upanishads-overview" replace />}
    />
    <Route path="upanishads-overview" element={<UpanishadsOverview />} />
    <Route
      path="purana-overview"
      element={<Navigate to="puranas-overview" replace />}
    />
    <Route
      path="puranas"
      element={<Navigate to="puranas-overview" replace />}
    />
    <Route path="puranas-overview" element={<PuranasOverview />} />
    <Route path="ramayana" element={<RamayanaOverview />} />
    <Route
      path="gita"
      element={<Navigate to="gita-overview" replace />}
    />
    <Route path="gita-overview" element={<GitaOverview />} />
    <Route
      path="bhagwat-purana"
      element={<Navigate to="bhagavata-purana" replace />}
    />
    <Route
      path="bhagvat-purana"
      element={<Navigate to="bhagavata-purana" replace />}
    />
    <Route
      path="bhagavata-purana"
      element={<BhagavataPuranaOverview />}
    />
    <Route
      path="mahabharata"
      element={<Navigate to="mahabharata-overview" replace />}
    />
    <Route
      path="mahabharata-overview"
      element={<MahabharataOverview />}
    />
    <Route path="search" element={<SearchPage />} />
    <Route path="scriptures/:category" element={<TextList />} />
    <Route path="scriptures/:category/:text" element={<ChapterList />} />
    <Route
      path="scriptures/:category/:text/:chapterSegment"
      element={<ScriptureChapterRoute />}
    />
    <Route
      path="scriptures/:category/:text/:chapterSegment/:verseSegment"
      element={<ScriptureVerseRoute />}
    />
    <Route path="chat" element={<AskScripture />} />
    <Route path="profile" element={<Profile />} />
    <Route path="bookmarks" element={<Bookmarks />} />
    <Route path="history" element={<History />} />
    <Route path="chalisas" element={<Chalisas />} />
    <Route path="puja-vidhi" element={<PujaVidhi />} />
    <Route path="auth/google/callback" element={<GoogleCallback />} />
    <Route path="login" element={<Login />} />
    <Route path="signup" element={<Signup />} />
    <Route path="forgot-password" element={<ForgotPassword />} />
  </>
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/topics" element={<TopicsIndex />} />
          <Route path="/topics/:topic" element={<TopicDetail />} />
          <Route path="/verse-of-the-day" element={<VerseOfDay />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/insights" element={<Insights />} />
          <Route path="/bhagavad-gita" element={<GitaOverview />} />
          <Route path="/bhagavad-gita/:chapter" element={<GitaChapterRoute />} />
          <Route
            path="/bhagavad-gita/:chapter/:verse"
            element={<GitaVerseRoute />}
          />
          <Route path="/upanishads" element={<UpanishadsOverview />} />
          <Route path="/upanishads/:text" element={<UpanishadTextRoute />} />
          <Route
            path="/upanishads/:text/:segment"
            element={<UpanishadSegmentRoute />}
          />
          <Route path="/scriptures" element={<ScripturesHome />} />
          <Route
            path="/veda-overview"
            element={<Navigate to="/vedas-overview" replace />}
          />
          <Route
            path="/vedas"
            element={<Navigate to="/vedas-overview" replace />}
          />
          <Route path="/vedas-overview" element={<VedasOverview />} />
          <Route
            path="/upanishad-overview"
            element={<Navigate to="/upanishads-overview" replace />}
          />
          <Route
            path="/upnishad-overview"
            element={<Navigate to="/upanishads-overview" replace />}
          />
          <Route path="/upanishads-overview" element={<UpanishadsOverview />} />
          <Route
            path="/purana-overview"
            element={<Navigate to="/puranas-overview" replace />}
          />
          <Route
            path="/puranas"
            element={<Navigate to="/puranas-overview" replace />}
          />
          <Route path="/puranas-overview" element={<PuranasOverview />} />
          <Route path="/ramayana" element={<RamayanaOverview />} />
          <Route
            path="/gita"
            element={<Navigate to="/gita-overview" replace />}
          />
          <Route path="/gita-overview" element={<GitaOverview />} />
          <Route
            path="/bhagwat-purana"
            element={<Navigate to="/bhagavata-purana" replace />}
          />
          <Route
            path="/bhagvat-purana"
            element={<Navigate to="/bhagavata-purana" replace />}
          />
          <Route
            path="/bhagavata-purana"
            element={<BhagavataPuranaOverview />}
          />
          <Route
            path="/mahabharata"
            element={<Navigate to="/mahabharata-overview" replace />}
          />
          <Route
            path="/mahabharata-overview"
            element={<MahabharataOverview />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/scriptures/:category" element={<TextList />} />
          <Route path="/scriptures/:category/:text" element={<ChapterList />} />
          <Route
            path="/scriptures/:category/:text/:chapterSegment"
            element={<ScriptureChapterRoute />}
          />
          <Route
            path="/scriptures/:category/:text/:chapterSegment/:verseSegment"
            element={<ScriptureVerseRoute />}
          />
          <Route path="/chat" element={<AskScripture />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/history" element={<History />} />
          <Route path="/chalisas" element={<Chalisas />} />
          <Route path="/puja-vidhi" element={<PujaVidhi />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/:lang" element={<LangLayout />}>
            {langRoutes}
          </Route>
          <Route path="/:lang/*" element={<LangLayout />}>
            {langRoutes}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
