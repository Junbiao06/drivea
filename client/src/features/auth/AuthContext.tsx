import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import toast from "react-hot-toast";
import authService from "./authService";

type User = {
  name?: string;
  email: string;
  password?: string;
};

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshMe = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authService.getMe();
      setUser(response.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await authService.logout();
      setLoading(true);
      setUser(null);
      toast.success("Logout successfully!");
    } catch {
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const value = { loading, setLoading, user, setUser, refreshMe, logout };
  return (
    <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
