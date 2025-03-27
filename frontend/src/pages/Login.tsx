
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <div className="pt-10 pb-20">
        <div className="page-container max-w-md">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
