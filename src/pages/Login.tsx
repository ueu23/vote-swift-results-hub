import React from 'react';
import LoginForm from '@/components/Auth/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (isAuthenticated) {
    // If authenticated as admin, go to admin dashboard
    if (isAdmin) {
      return <Navigate to="/admin-dashboard" />;
    }
    // Otherwise go to voter dashboard
    return <Navigate to="/dashboard" />;
  }

  return <LoginForm />;
};

export default Login;
