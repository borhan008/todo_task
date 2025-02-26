import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Header from '../common/Header';

export default function ProtectedRoute({children}) {
 const {user, loading} =  useAuth();
 return user ? (
    <>
    <Header />
    {children}
    </>
 ) : <Navigate to="/login" />;
}
