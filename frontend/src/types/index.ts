export type UserRole = 'customer' |'dealer'

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    phone?: string;
    address?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Car {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    featured?: boolean;
    type: string;
    manufacturer: string;
    model: string;
    year: number;
    mileage: number;
    transmission: 'automatic' | 'manual' | 'semi-automatic';
    fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'other';
    color: string;
    vin: string;
    dealerId: string;
    status: 'available' | 'sold' | 'reserved';
    createdAt: Date;
    updatedAt: Date;
}

export interface Dealer {
    id: string;
    userId: string;
    companyName: string;
    logo?: string;
    description?: string;
    website?: string;
    location: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        coordinates?: {
        lat: number;
        lng: number;
        };
    };
    contactInfo: {
        email: string;
        phone: string;
    };
    businessHours?: Record<string, string>;
    createdAt: Date;
    updatedAt: Date;
}

export interface Inquiry {
    id: string;
    carId: string;
    userId: string;
    dealerId: string;
    message: string;
    status: 'pending' | 'replied' | 'closed';
    createdAt: Date;
    updatedAt: Date;
}

export interface TestDrive{
    id: string;
    carId: string;
    userId: string;
    dealerId: string;
    date: Date;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
    createdAt: Date;
    updatedAt: Date;  
}

export interface Favorite{
    id: string;
    carId: string;
    userId: string;
    createdAt: Date;
}