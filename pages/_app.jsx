import { useEffect } from "react";
import "../src/index.css";
import { AuthProvider } from "../src/context/AuthContext";
import { LanguageProvider } from "../src/context/LanguageContext";
import { UserProvider } from "../src/context/UserContext";
import { BookmarkProvider } from "../src/context/BookmarkContext";

const getFestival = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month === 11 && day <= 15) return "diwali";
  if (month === 12 && day <= 15) return "gita-jayanti";
  return "";
};

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const festival = getFestival(new Date());
    if (festival) {
      document.body.dataset.festival = festival;
    } else {
      delete document.body.dataset.festival;
    }
  }, []);

  return (
    <AuthProvider>
      <LanguageProvider>
        <UserProvider>
          <BookmarkProvider>
            <Component {...pageProps} />
          </BookmarkProvider>
        </UserProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
