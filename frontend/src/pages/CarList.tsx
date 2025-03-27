
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/common/Layout';
import CarCard from '../components/common/CarCard';
import SearchBar from '../components/common/SearchBar';
import CarFilter, { FilterOptions } from '../components/cars/CarFilter';
import { useCars } from '../context/CarContext';
import { Car } from '../types';

const CarList: React.FC = () => {
  const { searchCars, isLoading } = useCars();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Get search term from URL params
  const searchTerm = searchParams.get('search') || '';
  
  useEffect(() => {
    const fetchCars = async () => {
      setIsFiltering(true);
      try {
        const results = await searchCars({ searchTerm });
        setFilteredCars(results);
      } catch (error) {
        console.error('Error filtering cars:', error);
        setFilteredCars([]);
      } finally {
        setIsFiltering(false);
      }
    };
    
    fetchCars();
  }, [searchCars, searchTerm]);
  
  const handleSearch = (term: string) => {
    // Update URL with search term
    setSearchParams({ search: term });
  };
  
  const handleFilter = async (filters: Partial<FilterOptions>) => {
    setIsFiltering(true);
    try {
      const results = await searchCars({ searchTerm, ...filters });
      setFilteredCars(results);
    } catch (error) {
      console.error('Error filtering cars:', error);
      setFilteredCars([]);
    } finally {
      setIsFiltering(false);
    }
  };
  
  return (
    <Layout>
      <div className="bg-secondary py-16">
        <div className="page-container">
          <h1 className="text-3xl font-bold mb-6 text-center">Browse Our Inventory</h1>
          <SearchBar
            className="max-w-2xl mx-auto"
            onSearch={handleSearch}
            placeholder="Search by make, model, or keyword..."
          />
        </div>
      </div>
      
      <div className="page-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <CarFilter onFilter={handleFilter} />
          </div>
          
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {searchTerm
                  ? `Search results for "${searchTerm}"`
                  : 'All Cars'}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'})
                </span>
              </h2>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm mr-2 text-muted-foreground">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="text-sm border border-input rounded px-2 py-1"
                  defaultValue="newest"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="mileage">Mileage: Low to High</option>
                </select>
              </div>
            </div>
            
            {(isLoading || isFiltering) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <CarCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
                <p className="text-lg font-medium mb-2">No cars found</p>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchParams({});
                    handleFilter({});
                  }}
                  className="button-secondary"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
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

export default CarList;
