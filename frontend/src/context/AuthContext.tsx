import { useState, createContext,useContext,useEffect } from "react";
import { User, UserRole } from "../types";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<User>;
    register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
    logout: () => void;
    updateProfile: (userData: Partial<User>) => Promise<void>;  
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);


const MOCK_USERS = [
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

    useEffect(()=>{
        const savedUser = localStorage.getItem('carDealerUser');
        if (savedUser) {
        setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);

    },[]);

    const login =async (email:string,password:string): Promise<User> =>{
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
      
            const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
            
            if (!foundUser) {
                throw new Error('Invalid credentials');
            }
            const { password: _, ...userWithoutPassword } = foundUser;
            const authenticatedUser = userWithoutPassword as User;
            
            setUser(authenticatedUser);
            localStorage.setItem('carDealerUser', JSON.stringify(authenticatedUser));
            return authenticatedUser;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string, role: UserRole) =>{
        setIsLoading(true);

        try {
            
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (MOCK_USERS.some(u => u.email === email)) {
                throw new Error('User already exists');
            }

            const newUser: User = {
                id: `user-${Date.now()}`,
                email,
                name,
                role,
                avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', // Default avatar
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            setUser(newUser);
            localStorage.setItem('carDealerUser', JSON.stringify(newUser));
            MOCK_USERS.push({...newUser, avatar: newUser.avatar || 'https://randomuser.me/api/portraits/lego/1.jpg', password});
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

    const updateProfile = async (userData: Partial<User>) =>{
        setIsLoading(true);

        try {
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
    
    return(

        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                updateProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth =() =>{
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}