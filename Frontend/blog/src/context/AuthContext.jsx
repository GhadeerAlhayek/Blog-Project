import React, { createContext, useContext, useState, useEffect } from "react";
import ApiService from "../utils/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (
        token &&
        userData &&
        userData !== "null" &&
        userData !== "undefined" &&
        userData.trim() !== ""
      ) {
        try {
          const parsedUser = JSON.parse(userData);

          if (parsedUser && typeof parsedUser === "object" && parsedUser.name) {
            setUser(parsedUser);
            setIsAuthenticated(true);
          } else {
            clearAuthData();
          }
        } catch (parseError) {
          console.error("Error parsing user data:", parseError);
          clearAuthData();
        }
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const login = (userData, token) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error storing auth data:", error);
    }
  };

  const logout = async () => {
    try {
      await ApiService.logout();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      clearAuthData();
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
