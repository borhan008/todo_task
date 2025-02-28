import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Header from "../common/Header";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  console.log("loading", loading);

  return user.email ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
}
