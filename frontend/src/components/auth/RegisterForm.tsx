import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';



const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<UserRole>('customer');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      setIsLoading(true);
      
      try {
        await register(name, email, password, role);
        navigate('/login');
      } catch (err: any) {
        setError(err.message || 'Registration failed. Please try again.');
        console.error('Registration error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">
            Join us to start browsing and managing vehicles
          </p>
        </div>
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              minLength={8}
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`p-3 rounded-md border ${
                  role === 'customer'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-input hover:border-primary/50 hover:bg-secondary/50'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
                onClick={() => setRole('customer')}
              >
                <div className="font-medium">Customer</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Browse and buy vehicles
                </div>
              </button>
              <button
                type="button"
                className={`p-3 rounded-md border ${
                  role === 'dealer'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-input hover:border-primary/50 hover:bg-secondary/50'
                } transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
                onClick={() => setRole('dealer')}
              >
                <div className="font-medium">Dealer</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Sell and manage vehicles
                </div>
              </button>
            </div>
          </div>
          
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-input bg-white text-primary focus:ring-primary focus:ring-offset-background"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-muted-foreground">
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <button
            type="submit"
            className="button-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-border"></div>
          <span className="px-3 text-sm text-muted-foreground">or continue with</span>
          <div className="flex-grow h-px bg-border"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 p-2 border border-input bg-background rounded-md text-sm font-medium hover:bg-secondary/50 transition-colors"
            onClick={() => {/* OAuth integration would go here */}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 p-2 border border-input bg-background rounded-md text-sm font-medium hover:bg-secondary/50 transition-colors"
            onClick={() => {/* OAuth integration would go here */}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="#1877F2" />
              <path d="M15.893 14.89l.443-2.89h-2.773v-1.876c0-.791.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.195-2.238-.195c-2.285 0-3.777 1.384-3.777 3.89V12h-2.54v2.89h2.54v6.988a10.06 10.06 0 003.115 0V14.89h2.33z" fill="#FFFFFF" />
            </svg>
            Facebook
          </button>
        </div>
        
        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    );
  };
  
  export default RegisterForm;