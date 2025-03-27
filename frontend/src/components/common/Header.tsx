
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="page-container">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            AutoElite
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" label="Home" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/cars" label="Cars" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/about" label="About" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/contact" label="Contact" currentPath={location.pathname} onClick={closeMenu} />
          </nav>
          
          {/* Desktop Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={user?.role === 'dealer' ? '/dealer-dashboard' : '/dashboard'}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-foreground hover:text-destructive transition-colors"
                >
                  Logout
                </button>
                <Link
                  to="/profile"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white text-sm font-medium"
                >
                  {user?.name.charAt(0).toUpperCase()}
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Login
                </Link>
                <Link to="/register" className="button-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <NavLink to="/" label="Home" currentPath={location.pathname} onClick={closeMenu} />
              <NavLink to="/cars" label="Cars" currentPath={location.pathname} onClick={closeMenu} />
              <NavLink to="/about" label="About" currentPath={location.pathname} onClick={closeMenu} />
              <NavLink to="/contact" label="Contact" currentPath={location.pathname} onClick={closeMenu} />
              
              {isAuthenticated ? (
                <>
                  <Link
                    to={user?.role === 'dealer' ? '/dealer-dashboard' : '/dashboard'}
                    className="text-base font-medium text-foreground hover:text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="text-base font-medium text-destructive hover:text-destructive/80 transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-base font-medium text-foreground hover:text-primary transition-colors"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="button-primary w-full justify-center"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, currentPath, onClick }) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  
  return (
    <Link
      to={to}
      className={`text-base font-medium transition-colors ${
        isActive
          ? 'text-primary relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
          : 'text-foreground hover:text-primary'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Header;
