// src/components/Authentification/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_API ||
  "https://back-matching-1-860478262732.us-central1.run.app";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // 🔁 Restaure les infos du localStorage au chargement
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔐 login avec rôle (défaut = "candidat")
  const login = async (email, password, role) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.detail || "Erreur inconnue" };
      }

      // console.log("Login réussi role :", role);
      // ✅ On enregistre email + rôle + token
      const userData = { email, role };
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setToken(data.access_token);

      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
