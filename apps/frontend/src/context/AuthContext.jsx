import React, { createContext, useContext, useEffect, useState } from "react";

/*
Simple auth using localStorage (dummy).
Stores { id, email, role } and token (fake).
Seeded users:
  - admin@example.com / admin123 (ADMIN)
  - user@example.com / user123 (USER)
*/

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // simple register: store user in localStorage "users" list
  function register({ email, password }) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email))
      throw new Error("Email already registered");
    const newUser = { id: Date.now(), email, password, role: "USER" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    // auto-login
    setUser({ id: newUser.id, email: newUser.email, role: newUser.role });
  }

  // login: check local users (seed if empty)
  function login({ email, password }) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!users || users.length === 0) {
      // seed default users
      users = [
        {
          id: 1,
          email: "admin@example.com",
          password: "admin123",
          role: "ADMIN",
        },
        { id: 2, email: "user@example.com", password: "user123", role: "USER" },
      ];
      localStorage.setItem("users", JSON.stringify(users));
    }
    const u = users.find((x) => x.email === email && x.password === password);
    if (!u) throw new Error("Invalid credentials");
    setUser({ id: u.id, email: u.email, role: u.role });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
