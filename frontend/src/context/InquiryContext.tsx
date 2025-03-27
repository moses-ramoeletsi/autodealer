import React, { createContext, useContext, useState, useEffect } from 'react';
import { Inquiry, TestDrive, Favorite } from '../types';
import { useAuth } from './AuthContext';


interface InquiryContextType {
    inquiries: Inquiry[];
    testDrives: TestDrive[];
    favorites: Favorite[];
    createInquiry: (carId: string, dealerId: string, message: string) => Promise<Inquiry>;
    updateInquiry: (id: string, data: Partial<Inquiry>) => Promise<Inquiry>;
    scheduleTestDrive: (carId: string, dealerId: string, date: Date) => Promise<TestDrive>;
    updateTestDrive: (id: string, data: Partial<TestDrive>) => Promise<TestDrive>;
    toggleFavorite: (carId: string) => Promise<boolean>;
    isFavorite: (carId: string) => boolean;
    isLoading: boolean;
  }

  const MOCK_INQUIRIES: Inquiry[] = [
    {
      id: '1',
      carId: '1',
      userId: '1',
      dealerId: '1',
      message: 'I am interested in this car. Is it still available?',
      status: 'pending',
      createdAt: new Date('2023-06-25'),
      updatedAt: new Date('2023-06-25'),
    },
    {
      id: '2',
      carId: '3',
      userId: '1',
      dealerId: '1',
      message: 'Can I get more information about the features?',
      status: 'replied',
      createdAt: new Date('2023-06-20'),
      updatedAt: new Date('2023-06-21'),
    },
  ];

  const MOCK_TEST_DRIVES: TestDrive[] = [
    {
      id: '1',
      carId: '2',
      userId: '1',
      dealerId: '2',
      date: new Date('2023-07-05T10:00:00'),
      status: 'confirmed',
      notes: 'Please bring your driver\'s license',
      createdAt: new Date('2023-06-28'),
      updatedAt: new Date('2023-06-29'),
    },
  ];

  const MOCK_FAVORITES: Favorite[] = [
    {
      id: '1',
      carId: '1',
      userId: '1',
      createdAt: new Date('2023-06-20'),
    },
    {
      id: '2',
      carId: '4',
      userId: '1',
      createdAt: new Date('2023-06-22'),
    },
  ];
  

  const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

  export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [testDrives, setTestDrives] = useState<TestDrive[]>([]);
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 800));
          
          if (user) {
            // Filter data based on current user
            setInquiries(MOCK_INQUIRIES.filter(inq => inq.userId === user.id));
            setTestDrives(MOCK_TEST_DRIVES.filter(td => td.userId === user.id));
            setFavorites(MOCK_FAVORITES.filter(fav => fav.userId === user.id));
          } else {
            setInquiries([]);
            setTestDrives([]);
            setFavorites([]);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [user]);
  
    const createInquiry = async (carId: string, dealerId: string, message: string): Promise<Inquiry> => {
      if (!user) {
        throw new Error('You must be logged in to create an inquiry');
      }
  
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newInquiry: Inquiry = {
          id: `inq-${Date.now()}`,
          carId,
          userId: user.id,
          dealerId,
          message,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setInquiries(prev => [...prev, newInquiry]);
        MOCK_INQUIRIES.push(newInquiry);
        
        return newInquiry;
      } catch (error) {
        console.error('Error creating inquiry:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    const updateInquiry = async (id: string, data: Partial<Inquiry>): Promise<Inquiry> => {
      if (!user) {
        throw new Error('You must be logged in to update an inquiry');
      }
  
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const inquiryIndex = inquiries.findIndex(inq => inq.id === id);
        
        if (inquiryIndex === -1) {
          throw new Error('Inquiry not found');
        }
        
        const updatedInquiry = {
          ...inquiries[inquiryIndex],
          ...data,
          updatedAt: new Date(),
        };
        
        const updatedInquiries = [...inquiries];
        updatedInquiries[inquiryIndex] = updatedInquiry;
        
        setInquiries(updatedInquiries);
        
        // Update mock data
        const mockIndex = MOCK_INQUIRIES.findIndex(inq => inq.id === id);
        if (mockIndex !== -1) {
          MOCK_INQUIRIES[mockIndex] = updatedInquiry;
        }
        
        return updatedInquiry;
      } catch (error) {
        console.error('Error updating inquiry:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    const scheduleTestDrive = async (carId: string, dealerId: string, date: Date): Promise<TestDrive> => {
      if (!user) {
        throw new Error('You must be logged in to schedule a test drive');
      }
  
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newTestDrive: TestDrive = {
          id: `td-${Date.now()}`,
          carId,
          userId: user.id,
          dealerId,
          date,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setTestDrives(prev => [...prev, newTestDrive]);
        MOCK_TEST_DRIVES.push(newTestDrive);
        
        return newTestDrive;
      } catch (error) {
        console.error('Error scheduling test drive:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    const updateTestDrive = async (id: string, data: Partial<TestDrive>): Promise<TestDrive> => {
      if (!user) {
        throw new Error('You must be logged in to update a test drive');
      }
  
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const testDriveIndex = testDrives.findIndex(td => td.id === id);
        
        if (testDriveIndex === -1) {
          throw new Error('Test drive not found');
        }
        
        const updatedTestDrive = {
          ...testDrives[testDriveIndex],
          ...data,
          updatedAt: new Date(),
        };
        
        const updatedTestDrives = [...testDrives];
        updatedTestDrives[testDriveIndex] = updatedTestDrive;
        
        setTestDrives(updatedTestDrives);
        
        // Update mock data
        const mockIndex = MOCK_TEST_DRIVES.findIndex(td => td.id === id);
        if (mockIndex !== -1) {
          MOCK_TEST_DRIVES[mockIndex] = updatedTestDrive;
        }
        
        return updatedTestDrive;
      } catch (error) {
        console.error('Error updating test drive:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    const toggleFavorite = async (carId: string): Promise<boolean> => {
      if (!user) {
        throw new Error('You must be logged in to favorite a car');
      }
  
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const existingFavorite = favorites.find(fav => fav.carId === carId);
        
        if (existingFavorite) {
          // Remove favorite
          setFavorites(prev => prev.filter(fav => fav.carId !== carId));
          
          // Update mock data
          const mockIndex = MOCK_FAVORITES.findIndex(fav => fav.id === existingFavorite.id);
          if (mockIndex !== -1) {
            MOCK_FAVORITES.splice(mockIndex, 1);
          }
          
          return false;
        } else {
          // Add favorite
          const newFavorite: Favorite = {
            id: `fav-${Date.now()}`,
            carId,
            userId: user.id,
            createdAt: new Date(),
          };
          
          setFavorites(prev => [...prev, newFavorite]);
          MOCK_FAVORITES.push(newFavorite);
          
          return true;
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    const isFavorite = (carId: string): boolean => {
      return !!favorites.find(fav => fav.carId === carId);
    };
  
    return (
      <InquiryContext.Provider
        value={{
          inquiries,
          testDrives,
          favorites,
          createInquiry,
          updateInquiry,
          scheduleTestDrive,
          updateTestDrive,
          toggleFavorite,
          isFavorite,
          isLoading,
        }}
      >
        {children}
      </InquiryContext.Provider>
    );
  };

  export const useInquiry = () => {
    const context = useContext(InquiryContext);
    if (context === undefined) {
      throw new Error('useInquiry must be used within an InquiryProvider');
    }
    return context;
  };