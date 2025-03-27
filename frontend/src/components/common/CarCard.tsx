
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../../types';
import { formatPrice } from '../../lib/utils';
import { useInquiry } from '../../context/InquiryContext';
import { useAuth } from '../../context/AuthContext';

interface CarCardProps {
  car: Car;
  className?: string;
}

const CarCard: React.FC<CarCardProps> = ({ car, className = '' }) => {
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useInquiry();
  const isFav = isFavorite(car.id);
  
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = `/login?redirect=/cars/${car.id}`;
      return;
    }
    
    try {
      await toggleFavorite(car.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  
  return (
    <div className={`card group hover:translate-y-[-4px] transition-all duration-300 ${className}`}>
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img
          src={car.images[0]}
          alt={car.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isFav ? 'bg-destructive text-white' : 'bg-white/80 text-foreground'
          } shadow-sm hover:shadow-md transition-all duration-300`}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFav ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        
        {car.featured && (
          <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">
            {car.title}
          </h3>
          <span className="text-lg font-bold text-primary">
            {formatPrice(car.price)}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {car.description}
        </p>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1 text-muted-foreground">
              <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z"></path>
              <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
            </svg>
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1 text-muted-foreground">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>{car.year}</span>
          </div>
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1 text-muted-foreground">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span className="capitalize">{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1 text-muted-foreground">
              <path d="M19 17H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2ZM18 21H6a2 2 0 0 1-2-2v-2h16v2a2 2 0 0 1-2 2Z"></path>
            </svg>
            <span className="capitalize">{car.fuelType}</span>
          </div>
        </div>
        
        <Link
          to={`/cars/${car.id}`}
          className="button-primary w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
