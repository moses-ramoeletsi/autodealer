
import  { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from '../components/common/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="page-container py-24">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="button-primary inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
