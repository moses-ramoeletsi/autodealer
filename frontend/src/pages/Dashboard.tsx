
import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import CustomerDashboard from '../components/dashboard/CustomerDashboard';
import DealerDashboard from '../components/dashboard/DealerDashboard';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-secondary rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-secondary rounded mb-2"></div>
            <div className="h-3 w-32 bg-secondary rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Layout>
      {user?.role === 'dealer' ? (
        <DealerDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </Layout>
  );
};

export default Dashboard;
