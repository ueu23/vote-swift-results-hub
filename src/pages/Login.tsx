
import React from 'react';
import LoginForm from '@/components/Auth/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <LoginForm />;
};

export default Login;
