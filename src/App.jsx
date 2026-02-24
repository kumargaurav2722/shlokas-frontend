import { useEffect, useMemo, useState } from "react";
import Landing from "./pages/Landing/Landing";
import Chapters from "./pages/Chapters";
import Verses from "./pages/Verses";
import AskScripture from "./pages/Chat/AskScripture";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";

const getHashPath = () => {
  if (window.location.hash) {
    return window.location.hash.replace(/^#/, "") || "/";
  }
  return window.location.pathname || "/";
};

export default function App() {
  const [path, setPath] = useState(getHashPath());

  useEffect(() => {
    const onChange = () => setPath(getHashPath());
    window.addEventListener("hashchange", onChange);
    window.addEventListener("popstate", onChange);
    return () => {
      window.removeEventListener("hashchange", onChange);
      window.removeEventListener("popstate", onChange);
    };
  }, []);

  const route = useMemo(() => {
    if (path.startsWith("/chapters/")) {
      const chapter = path.replace("/chapters/", "");
      return { name: "verses", chapter };
    }
    if (path === "/chapters") return { name: "chapters" };
    if (path === "/chat") return { name: "chat" };
    if (path === "/login") return { name: "login" };
    if (path === "/signup") return { name: "signup" };
    if (path === "/forgot-password") return { name: "forgot" };
    if (path === "/ask") return { name: "ask" };
    return { name: "landing" };
  }, [path]);

  if (route.name === "chapters") {
    return (
      <Chapters
        onChapter={(c) => {
          window.location.hash = `#/chapters/${c}`;
        }}
      />
    );
  }

  if (route.name === "verses") {
    return <Verses chapter={route.chapter} />;
  }

  if (route.name === "login") return <Login />;
  if (route.name === "signup") return <Signup />;
  if (route.name === "forgot") return <ForgotPassword />;
  if (route.name === "chat") return <AskScripture />;
  if (route.name === "ask") return <AskScripture />;

  return <Landing />;
}
