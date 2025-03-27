import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car } from '../types';


const MOCK_CARS: Car[] = [
    {
      id: '1',
      title: '2023 BMW 5 Series',
      description: 'Luxurious sedan with cutting-edge technology and powerful performance.',
      price: 65000,
      images: [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1520038410233-7141be7e6f97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      ],
      featured: true,
      type: 'sedan',
      manufacturer: 'BMW',
      model: '5 Series',
      year: 2023,
      mileage: 5000,
      transmission: 'automatic',
      fuelType: 'petrol',
      color: 'Black',
      vin: 'WBAJB9C50JB083652',
      dealerId: '1',
      status: 'available',
      createdAt: new Date('2023-05-01'),
      updatedAt: new Date('2023-05-01'),
    },
    {
      id: '2',
      title: '2022 Mercedes-Benz E-Class',
      description: 'Elegant design with premium interior and advanced safety features.',
      price: 62000,
      images: [
        'https://images.unsplash.com/photo-1617469767053-6a25e516b97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      ],
      featured: true,
      type: 'sedan',
      manufacturer: 'Mercedes-Benz',
      model: 'E-Class',
      year: 2022,
      mileage: 8000,
      transmission: 'automatic',
      fuelType: 'petrol',
      color: 'Silver',
      vin: 'W1KZF8DB9NA123456',
      dealerId: '2',
      status: 'available',
      createdAt: new Date('2023-04-15'),
      updatedAt: new Date('2023-04-15'),
    },
    {
      id: '3',
      title: '2023 Audi Q7',
      description: 'Spacious SUV with premium features and quattro all-wheel drive.',
      price: 75000,
      images: [
        'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      ],
      featured: true,
      type: 'suv',
      manufacturer: 'Audi',
      model: 'Q7',
      year: 2023,
      mileage: 3000,
      transmission: 'automatic',
      fuelType: 'diesel',
      color: 'White',
      vin: 'WAUZZZ4M7ND123456',
      dealerId: '1',
      status: 'available',
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2023-06-01'),
    },
    {
      id: '4',
      title: '2022 Tesla Model 3',
      description: 'All-electric sedan with impressive range and autopilot features.',
      price: 52000,
      images: [
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1551826152-d7248d8b8a40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      ],
      featured: true,
      type: 'sedan',
      manufacturer: 'Tesla',
      model: 'Model 3',
      year: 2022,
      mileage: 10000,
      transmission: 'automatic',
      fuelType: 'electric',
      color: 'Blue',
      vin: '5YJ3E1EA6NF123456',
      dealerId: '2',
      status: 'available',
      createdAt: new Date('2023-03-10'),
      updatedAt: new Date('2023-03-10'),
    },
    {
      id: '5',
      title: '2023 Porsche 911',
      description: 'Iconic sports car with exhilarating performance and timeless design.',
      price: 120000,
      images: [
        'https://images.unsplash.com/photo-1584636778269-75cc5c82d2fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      ],
      featured: true,
      type: 'sports',
      manufacturer: 'Porsche',
      model: '911',
      year: 2023,
      mileage: 1500,
      transmission: 'automatic',
      fuelType: 'petrol',
      color: 'Red',
      vin: 'WP0AB2A95JS123456',
      dealerId: '1',
      status: 'available',
      createdAt: new Date('2023-06-15'),
      updatedAt: new Date('2023-06-15'),
    },
    {
      id: '6',
      title: '2022 Range Rover Sport',
      description: 'Luxury SUV with off-road capability and sophisticated design.',
      price: 92000,
      images: [
        'https://images.unsplash.com/photo-1543854589-fca4035ef168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      ],
      featured: false,
      type: 'suv',
      manufacturer: 'Land Rover',
      model: 'Range Rover Sport',
      year: 2022,
      mileage: 12000,
      transmission: 'automatic',
      fuelType: 'diesel',
      color: 'Black',
      vin: 'SALWA2BK3NA123456',
      dealerId: '2',
      status: 'available',
      createdAt: new Date('2023-02-20'),
      updatedAt: new Date('2023-02-20'),
    },
    {
      id: '7',
      title: '2022 Lexus ES',
      description: 'Refined luxury sedan with exceptional comfort and reliability.',
      price: 48000,
      images: [
        'https://images.unsplash.com/photo-1583267746897-2cf415887172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      ],
      featured: false,
      type: 'sedan',
      manufacturer: 'Lexus',
      model: 'ES',
      year: 2022,
      mileage: 15000,
      transmission: 'automatic',
      fuelType: 'hybrid',
      color: 'Silver',
      vin: 'JTHBK1GG9N2123456',
      dealerId: '1',
      status: 'available',
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-01-15'),
    },
    {
      id: '8',
      title: '2023 Toyota RAV4',
      description: 'Popular crossover SUV with versatile features and excellent efficiency.',
      price: 35000,
      images: [
        'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      ],
      featured: false,
      type: 'suv',
      manufacturer: 'Toyota',
      model: 'RAV4',
      year: 2023,
      mileage: 8000,
      transmission: 'automatic',
      fuelType: 'hybrid',
      color: 'Green',
      vin: 'JTMWGFVX0N5123456',
      dealerId: '2',
      status: 'available',
      createdAt: new Date('2023-04-05'),
      updatedAt: new Date('2023-04-05'),
    },
  ];
  

  interface CarContextType {
    cars: Car[];
    featuredCars: Car[];
    getCar: (id: string) => Car | undefined;
    addCar: (car: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Car>;
    updateCar: (id: string, carData: Partial<Car>) => Promise<Car>;
    deleteCar: (id: string) => Promise<void>;
    isLoading: boolean;
    searchCars: (filters: Partial<CarFilters>) => Promise<Car[]>;
  }

  interface CarFilters {
    searchTerm: string;
    priceMin: number;
    priceMax: number;
    type: string[];
    manufacturer: string[];
    yearMin: number;
    yearMax: number;
    mileageMax: number;
    transmission: string[];
    fuelType: string[];
  }

  const CarContext = createContext<CarContextType | undefined>(undefined);

  export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cars, setCars] = useState<Car[]>([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchCars = async () => {
        setIsLoading(true);
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          setCars(MOCK_CARS);
        } catch (error) {
          console.error('Error fetching cars:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchCars();
    }, []);
  
    const featuredCars = cars.filter(car => car.featured);
  
    const getCar = (id: string) => {
      return cars.find(car => car.id === id);
    };
  
    const addCar = async (carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt'>): Promise<Car> => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newCar: Car = {
          ...carData,
          id: `car-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        setCars(prevCars => [...prevCars, newCar]);
        return newCar;
        
      } catch (error) {
        console.error('Error adding car:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    const updateCar = async (id: string, carData: Partial<Car>): Promise<Car> => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const existingCarIndex = cars.findIndex(car => car.id === id);
        
        if (existingCarIndex === -1) {
          throw new Error('Car not found');
        }
        
        const updatedCar = {
          ...cars[existingCarIndex],
          ...carData,
          updatedAt: new Date(),
        };
        
        const updatedCars = [...cars];
        updatedCars[existingCarIndex] = updatedCar;
        
        setCars(updatedCars);
        return updatedCar;
        
      } catch (error) {
        console.error('Error updating car:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    const deleteCar = async (id: string): Promise<void> => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCars(prevCars => prevCars.filter(car => car.id !== id));
        
      } catch (error) {
        console.error('Error deleting car:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    const searchCars = async (filters: Partial<CarFilters>): Promise<Car[]> => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredCars = [...cars];
        
        // Apply filters
        if (filters.searchTerm) {
          const searchTerm = filters.searchTerm.toLowerCase();
          filteredCars = filteredCars.filter(car =>
            car.title.toLowerCase().includes(searchTerm) ||
            car.description.toLowerCase().includes(searchTerm) ||
            car.manufacturer.toLowerCase().includes(searchTerm) ||
            car.model.toLowerCase().includes(searchTerm)
          );
        }
        
        if (filters.priceMin !== undefined) {
          filteredCars = filteredCars.filter(car => car.price >= filters.priceMin!);
        }
        
        if (filters.priceMax !== undefined) {
          filteredCars = filteredCars.filter(car => car.price <= filters.priceMax!);
        }
        
        if (filters.type && filters.type.length > 0) {
          filteredCars = filteredCars.filter(car => filters.type!.includes(car.type));
        }
        
        if (filters.manufacturer && filters.manufacturer.length > 0) {
          filteredCars = filteredCars.filter(car => filters.manufacturer!.includes(car.manufacturer));
        }
        
        if (filters.yearMin !== undefined) {
          filteredCars = filteredCars.filter(car => car.year >= filters.yearMin!);
        }
        
        if (filters.yearMax !== undefined) {
          filteredCars = filteredCars.filter(car => car.year <= filters.yearMax!);
        }
        
        if (filters.mileageMax !== undefined) {
          filteredCars = filteredCars.filter(car => car.mileage <= filters.mileageMax!);
        }
        
        if (filters.transmission && filters.transmission.length > 0) {
          filteredCars = filteredCars.filter(car => 
            filters.transmission!.includes(car.transmission as string)
          );
        }
        
        if (filters.fuelType && filters.fuelType.length > 0) {
          filteredCars = filteredCars.filter(car => 
            filters.fuelType!.includes(car.fuelType as string)
          );
        }
        
        return filteredCars;
        
      } catch (error) {
        console.error('Error searching cars:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <CarContext.Provider
        value={{
          cars,
          featuredCars,
          getCar,
          addCar,
          updateCar,
          deleteCar,
          isLoading,
          searchCars,
        }}
      >
        {children}
      </CarContext.Provider>
    );
  };

  export const useCars = () => {
    const context = useContext(CarContext);
    if (context === undefined) {
      throw new Error('useCars must be used within a CarProvider');
    }
    return context;
  };
  