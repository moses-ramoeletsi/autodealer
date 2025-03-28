
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define a more specific type for mock users which requires avatar
interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar: string; // Non-optional here
  createdAt: Date;
  updatedAt: Date;
}

// Mock user data for demonstration
const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    email: 'customer@example.com',
    password: 'password',
    name: 'John Doe',
    role: 'customer' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'dealer@example.com',
    password: 'password',
    name: 'Auto Dealership Inc.',
    role: 'dealer' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('carDealerUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = foundUser;
      const authenticatedUser = userWithoutPassword as User;
      
      setUser(authenticatedUser);
      localStorage.setItem('carDealerUser', JSON.stringify(authenticatedUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      // Create new user with required avatar field
      const avatarUrl = `https://randomuser.me/api/portraits/${role === 'dealer' ? 'men' : 'women'}/${Math.floor(Math.random() * 10) + 1}.jpg`;
      
      // Create new user with the correct types
      const newUser: MockUser = {
        id: `user-${Date.now()}`,
        email,
        name,
        role,
        password,
        avatar: avatarUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // In a real app, you would save this to a database
      // For now, we'll just set the current user
      const { password: _, ...userWithoutPassword } = newUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('carDealerUser', JSON.stringify(userWithoutPassword));
      
      // Add to mock users (for demonstration)
      MOCK_USERS.push(newUser);
      
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('carDealerUser');
  };

  const updateProfile = async (userData: Partial<User>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        throw new Error('Not authenticated');
      }
      
      const updatedUser = {
        ...user,
        ...userData,
        updatedAt: new Date(),
      };
      
      setUser(updatedUser);
      localStorage.setItem('carDealerUser', JSON.stringify(updatedUser));
      
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
