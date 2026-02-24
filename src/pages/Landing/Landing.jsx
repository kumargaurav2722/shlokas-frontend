import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import HeroSection from "./HeroSection";
import VerseOfDaySection from "./VerseOfDaySection";
import PopularShlokas from "./PopularShlokas";
import RecommendationsSection from "./RecommendationsSection";
import RecentHistorySection from "./RecentHistorySection";
import TrendingVersesSection from "./TrendingVersesSection";
import Categories from "./Categories";
import EpicsSection from "./EpicsSection";
import ChalisaSection from "./ChalisaSection";
import PujaVidhiSection from "./PujaVidhiSection";
import DailyPracticeSection from "./DailyPracticeSection";
import OverviewsSection from "./OverviewsSection";

export default function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <VerseOfDaySection />
      <PopularShlokas />
      <RecommendationsSection />
      <TrendingVersesSection />
      <RecentHistorySection />
      <Categories />
      <EpicsSection />
      <OverviewsSection />
      <ChalisaSection />
      <PujaVidhiSection />
      <DailyPracticeSection />
      <Footer />
    </>
  );
}
