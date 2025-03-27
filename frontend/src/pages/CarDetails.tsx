
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import CarGallery from '../components/cars/CarGallery';
import CarSpecs from '../components/cars/CarSpecs';
import ContactDealer from '../components/cars/ContactDealer';
import { useCars } from '../context/CarContext';
import { useInquiry } from '../context/InquiryContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../lib/utils';

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCar, cars, isLoading } = useCars();
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useInquiry();
  
  const [car, setCar] = useState(id ? getCar(id) : undefined);
  const [similarCars, setSimilarCars] = useState<{ id: string; title: string; images: string[]; price: number; year: number; mileage: number; transmission: string }[]>([]);
  
  useEffect(() => {
    if (id) {
      const carDetails = getCar(id);
      setCar(carDetails);
      
      if (carDetails) {
        // Find similar cars (same type or manufacturer)
        const similar = cars
          .filter(c => 
            c.id !== carDetails.id && 
            (c.type === carDetails.type || c.manufacturer === carDetails.manufacturer)
          )
          .slice(0, 3);
        
        setSimilarCars(similar);
      }
    }
  }, [id, getCar, cars]);
  
  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = `/login?redirect=/cars/${id}`;
      return;
    }
    
    if (id) {
      try {
        await toggleFavorite(id);
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="page-container py-10">
          <div className="animate-pulse">
            <div className="h-64 bg-secondary rounded-lg mb-6"></div>
            <div className="h-8 bg-secondary rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-secondary rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="h-32 bg-secondary rounded"></div>
                <div className="h-64 bg-secondary rounded"></div>
              </div>
              <div>
                <div className="h-64 bg-secondary rounded mb-6"></div>
                <div className="h-48 bg-secondary rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!car) {
    return (
      <Layout>
        <div className="page-container py-10">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
            <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The car you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/cars" className="button-primary">
              Browse All Cars
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  const isFav = id ? isFavorite(id) : false;
  
  return (
    <Layout>
      <div className="page-container py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <Link
              to="/cars"
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center mb-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to All Cars
            </Link>
            <h1 className="text-3xl font-bold">{car.title}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">{formatPrice(car.price)}</span>
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full ${
                isFav ? 'bg-destructive text-white' : 'bg-secondary hover:bg-secondary/70'
              } transition-colors`}
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <CarGallery images={car.images} title={car.title} />
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground">{car.description}</p>
            </div>
            
            <CarSpecs car={car} />
          </div>
          
          <div className="space-y-6">
            <ContactDealer car={car} />
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4">Dealer Information</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg mr-3">
                  D
                </div>
                <div>
                  <h4 className="font-medium">Demo Dealership</h4>
                  <p className="text-sm text-muted-foreground">Premium Car Dealer</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-muted-foreground">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-muted-foreground">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>contact@dealership.com</span>
                </div>
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-muted-foreground">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>123 Dealer Street, Car City, CC 12345</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {similarCars.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Cars You May Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarCars.map((similarCar) => (
                <Link
                  key={similarCar.id}
                  to={`/cars/${similarCar.id}`}
                  className="card hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={similarCar.images[0]}
                      alt={similarCar.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold line-clamp-1">
                        {similarCar.title}
                      </h3>
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(similarCar.price)}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-1 mb-2">
                      {similarCar.year} · {similarCar.mileage.toLocaleString()} miles · {similarCar.transmission}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CarDetail;
