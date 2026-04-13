import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

const storageKeys = {
  token: "smartRepairToken",
  user: "smartRepairUser"
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem(storageKeys.user);
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authUser) localStorage.setItem(storageKeys.user, JSON.stringify(authUser));
    else localStorage.removeItem(storageKeys.user);
  }, [authUser]);

  const login = async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", payload);
      localStorage.setItem(storageKeys.token, data.token);
      setAuthUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ accountType, ...payload }) => {
    setLoading(true);
    try {
      const endpoint = accountType === "provider" ? "/auth/register/provider" : "/auth/register/user";
      const { data } = await api.post(endpoint, payload);
      localStorage.setItem(storageKeys.token, data.token);
      setAuthUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(storageKeys.token);
    localStorage.removeItem(storageKeys.user);
    setAuthUser(null);
  };

  const value = useMemo(
    () => ({ authUser, setAuthUser, loading, login, register, logout }),
    [authUser, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
