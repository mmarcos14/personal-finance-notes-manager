import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const Navigate=useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    withXSRFToken: true,
  });

  // ✅ Get authenticated user
  const getUser = async () => {
    try {
      const res = await api.get("/api/user");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login
  const login = async (url, data) => {
    try {
      setErrors({});
      await api.get("/sanctum/csrf-cookie");
      await api.post(url, data);
      await getUser(); // 🔥 TRÈS IMPORTANT
    } catch (e) {
      if (e.response?.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  // ✅ Logout
  const logout = async () => {
    await api.post("/logout");
    setUser(null);
    Navigate('/')
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, errors, loading ,getUser}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => useContext(AuthContext);
