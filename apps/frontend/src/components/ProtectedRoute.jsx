// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UnauthorizedPage from "../pages/UnauthorizedPage";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/unauthorized" replace />;
  return children;
};

export const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/unauthorized" replace />;
  if (user.role !== "ADMIN") return <UnauthorizedPage />;
  return children;
};
