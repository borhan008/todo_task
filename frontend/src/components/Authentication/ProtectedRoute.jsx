import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
 const isLoggedIn = false;
 return isLoggedIn ? Outlet : <Navigate to="/login" />;
}
