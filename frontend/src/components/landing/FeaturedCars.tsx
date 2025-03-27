
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../common/CarCard';
import { useCars } from '../../context/CarContext';

const FeaturedCars: React.FC = () => {
  const { featuredCars, isLoading } = useCars();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('featured-cars-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section id="featured-cars-section" className="section-container">
      <div className={`flex flex-col items-center mb-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <span className="text-sm font-medium text-primary mb-2">Featured Vehicles</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Exceptional Cars, Exceptional Deals</h2>
        <p className="text-muted-foreground text-center max-w-2xl">
          Discover our handpicked selection of premium vehicles, each one chosen for its 
          exceptional quality, performance, and value.
        </p>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.slice(0, 6).map((car, index) => (
              <div 
                key={car.id} 
                className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} 
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CarCard car={car} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/cars"
              className={`button-secondary inline-flex items-center gap-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: '0.7s' }}
            >
              View All Vehicles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

const CarCardSkeleton: React.FC = () => {
  return (
    <div className="card animate-pulse">
      <div className="h-48 sm:h-56 bg-secondary"></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-secondary rounded w-2/3"></div>
          <div className="h-6 bg-secondary rounded w-1/4"></div>
        </div>
        <div className="h-12 bg-secondary rounded w-full mb-3"></div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 bg-secondary rounded"></div>
          ))}
        </div>
        <div className="h-10 bg-secondary rounded w-full"></div>
      </div>
    </div>
  );
};

export default FeaturedCars;
