import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { BookmarkProvider } from "./context/BookmarkContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <UserProvider>
          <BookmarkProvider>
            <App />
          </BookmarkProvider>
        </UserProvider>
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
)
