import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, requireSubscription = false }) => {
  const { currentUser, hasSubscription } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requireSubscription && !hasSubscription) {
    return <Navigate to="/subscription-plans" />;
  }

  return children;
};

export default ProtectedRoute;
