import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  login as authLogin,
  logout as authLogout,
  getCurrentUser,
} from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await authLogin(email, password);
      setUser(userData);
      navigate(userData.role === "admin" ? "/admin/dashboard" : "/user/stores");
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await authLogout();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
