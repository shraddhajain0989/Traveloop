import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "@/features/auth/api/authApi";
import { tokenService } from "@/shared/services/tokenService";

const AuthContext = createContext(null);

function normalizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.full_name || user.name || "",
    full_name: user.full_name || user.name || "",
    email: user.email,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => tokenService.getUser());

  useEffect(() => {
    const token = tokenService.getToken();
    if (!token) return;

    let cancelled = false;

    authApi
      .me()
      .then((response) => {
        if (cancelled) return;
        const nextUser = normalizeUser(response.data?.data);
        tokenService.setUser(nextUser);
        setUser(nextUser);
      })
      .catch(() => {
        if (cancelled) return;
        tokenService.clearSession();
        setUser(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (payload) => {
    const response = await authApi.login(payload);
    const nextUser = normalizeUser(response.data?.data?.user);
    tokenService.setToken(response.data?.data?.token);
    tokenService.setUser(nextUser);
    setUser(nextUser);
    return nextUser;
  };

  const signup = async (payload) => {
    const response = await authApi.signup({
      full_name: payload.name,
      email: payload.email,
      password: payload.password,
    });
    const nextUser = normalizeUser(response.data?.data?.user);
    tokenService.setToken(response.data?.data?.token);
    tokenService.setUser(nextUser);
    setUser(nextUser);
    return nextUser;
  };

  const logout = () => {
    tokenService.clearSession();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, signup, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
