import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import ScripturesHome from "../pages/Scriptures/ScripturesHome";
import TextList from "../pages/Scriptures/TextList";
import ChapterList from "../pages/Scriptures/ChapterList";
import VersePage from "../pages/Scriptures/VersePage";
import RamayanaOverview from "../pages/Scriptures/RamayanaOverview";
import GitaOverview from "../pages/Scriptures/GitaOverview";
import BhagavataPuranaOverview from "../pages/Scriptures/BhagavataPuranaOverview";
import VedasOverview from "../pages/Scriptures/VedasOverview";
import UpanishadsOverview from "../pages/Scriptures/UpanishadsOverview";
import PuranasOverview from "../pages/Scriptures/PuranasOverview";
import MahabharataOverview from "../pages/Scriptures/MahabharataOverview";
import SearchPage from "../pages/Search/SearchPage";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import GoogleCallback from "../pages/Auth/GoogleCallback";
import AskScripture from "../pages/Chat/AskScripture";
import Profile from "../pages/Profile/Profile";
import Chalisas from "../pages/Devotion/Chalisas";
import PujaVidhi from "../pages/Devotion/PujaVidhi";
import Bookmarks from "../pages/Bookmarks/Bookmarks";
import History from "../pages/History/History";
import TopicsIndex from "../pages/Topics/TopicsIndex";
import TopicDetail from "../pages/Topics/TopicDetail";
import VerseOfDay from "../pages/VerseOfDay";
import About from "../pages/About/About";
import Insights from "../pages/Admin/Insights";
import { useParams } from "react-router-dom";

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
    </BrowserRouter>
  );
}
