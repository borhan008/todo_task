import React from "react";
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";

export default function PublicRouter({ children }) {
  const { user, loading } = useAuth();

  return (
    <>{loading ? <Loading /> : user.email ? <Navigate to="/" /> : children}</>
  );
}
