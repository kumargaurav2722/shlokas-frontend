import { createContext, useEffect, useMemo, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import useLanguage from "../hooks/useLanguage";
import { getMe, updateMe } from "../services/user.service";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { token } = useAuth() || {};
  const { setLanguage, language, pathOverride } = useLanguage() || {};
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const syncingRef = useRef(false);

  const loadUser = async () => {
    if (!token) {
      setUser(null);
      return;
    }
    setLoading(true);
    try {
      const res = await getMe();
      setUser(res.data);
      if (res.data?.preferredLanguage && !pathOverride) {
        setLanguage(res.data.preferredLanguage);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const updateUser = async (payload) => {
    const res = await updateMe(payload);
    setUser(res.data);
    if (payload?.preferredLanguage) {
      setLanguage(payload.preferredLanguage);
    }
    return res.data;
  };

  useEffect(() => {
    if (!user || !language || !user.preferredLanguage) return;
    if (pathOverride) return;
    if (user.preferredLanguage === language) return;
    if (syncingRef.current) return;
    syncingRef.current = true;
    updateMe({ preferredLanguage: language })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {})
      .finally(() => {
        syncingRef.current = false;
      });
  }, [language, user?.id, user?.preferredLanguage, pathOverride]);

  const value = useMemo(
    () => ({ user, loading, refresh: loadUser, updateUser }),
    [user, loading]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
