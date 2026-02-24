import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  const loginUser = (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    setToken(token);
  };

  const logoutUser = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
