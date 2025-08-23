"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    let didTimeout = false;
    const timeout = setTimeout(() => {
      didTimeout = true;
      console.warn("Auth check timed out");
      setLoading(false);
    }, 10000); // 10s timeout

    try {
      console.log("Checking auth status...");
      const response = await fetch("/api/auth/verify", {
        credentials: "include",
      });
      if (didTimeout) return;
      clearTimeout(timeout);

      console.log("Auth verify response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Auth verify data:", data);
        if (data.authenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      if (!didTimeout) {
        console.log("Auth check complete, loading set to false");
        setLoading(false);
      }
    }
  };

  const login = async () => {
    // After a successful login request, refresh auth status from server.
    // Do not set isAuthenticated optimistically here to avoid UI showing
    // admin before the server-side cookie is verified.
    await checkAuthStatus(); // Refresh user data
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
