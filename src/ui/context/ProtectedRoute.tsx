import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

type ProtectedRouteProps = {
  children: React.JSX.Element;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Tu peux retourner un spinner ici si tu veux
    return <p>Chargement...</p>;
  }

  if (!currentUser) {
    // Non connecté -> redirige vers login
    return <Navigate to="/login" replace />;
  }

  return children;
};
