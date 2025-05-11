
import React from 'react';
import AdminLoginForm from '@/components/Auth/AdminLoginForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminLogin = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (isAuthenticated) {
    // If already logged in as admin, go to dashboard
    if (isAdmin) {
      return <Navigate to="/admin-dashboard" />;
    } 
    // If logged in as voter, redirect to voter dashboard
    return <Navigate to="/dashboard" />;
  }

  return <AdminLoginForm />;
};

export default AdminLogin;
