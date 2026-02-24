import { useEffect } from "react";
import AppRoutes from "./routes";
import OfflineBanner from "../components/OfflineBanner";

const getFestival = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month === 11 && day <= 15) return "diwali";
  if (month === 12 && day <= 15) return "gita-jayanti";
  return "";
};

export default function App() {
  useEffect(() => {
    const festival = getFestival(new Date());
    if (festival) {
      document.body.dataset.festival = festival;
    } else {
      delete document.body.dataset.festival;
    }
  }, []);

  return (
    <>
      <OfflineBanner />
      <AppRoutes />
    </>
  );
}
