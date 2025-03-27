
import React, { useState } from 'react';

export interface FilterOptions {
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

interface CarFilterProps {
  onFilter: (filters: Partial<FilterOptions>) => void;
  initialFilters?: Partial<FilterOptions>;
  className?: string;
}

const currentYear = new Date().getFullYear();

const CarFilter: React.FC<CarFilterProps> = ({
  onFilter,
  initialFilters = {},
  className = '',
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceMin: initialFilters.priceMin || 0,
    priceMax: initialFilters.priceMax || 200000,
    type: initialFilters.type || [],
    manufacturer: initialFilters.manufacturer || [],
    yearMin: initialFilters.yearMin || 2010,
    yearMax: initialFilters.yearMax || currentYear,
    mileageMax: initialFilters.mileageMax || 150000,
    transmission: initialFilters.transmission || [],
    fuelType: initialFilters.fuelType || [],
  });
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      const filterCategory = name.split('-')[0];
      const filterValue = name.split('-')[1];
      
      setFilters(prev => {
        const currentValues = [...(prev[filterCategory as keyof FilterOptions] as string[])];
        
        if (checked) {
          return {
            ...prev,
            [filterCategory]: [...currentValues, filterValue],
          };
        } else {
          return {
            ...prev,
            [filterCategory]: currentValues.filter(val => val !== filterValue),
          };
        }
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };
  
  const handleReset = () => {
    const resetFilters: FilterOptions = {
      priceMin: 0,
      priceMax: 200000,
      type: [],
      manufacturer: [],
      yearMin: 2010,
      yearMax: currentYear,
      mileageMax: 150000,
      transmission: [],
      fuelType: [],
    };
    
    setFilters(resetFilters);
    onFilter(resetFilters);
  };
  
  return (
    <div className={className}>
      <div className="md:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex justify-between items-center p-3 border border-input rounded-md bg-background hover:bg-secondary/50 transition-colors"
        >
          <span className="font-medium">Filters</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      
      <div className={`md:block ${isFilterOpen ? 'block' : 'hidden'}`}>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h3 className="font-semibold text-lg mb-4">Filter Cars</h3>
          
          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="priceMin" className="block text-xs text-muted-foreground mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  id="priceMin"
                  name="priceMin"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={filters.priceMin}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="priceMax" className="block text-xs text-muted-foreground mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  id="priceMax"
                  name="priceMax"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={filters.priceMax}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>
          
          {/* Vehicle Type */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Vehicle Type</h4>
            <div className="space-y-2">
              {['sedan', 'suv', 'sports', 'coupe', 'convertible', 'truck'].map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    name={`type-${type}`}
                    checked={filters.type.includes(type)}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-input bg-white text-primary"
                  />
                  <span className="ml-2 text-sm capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Manufacturer */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Manufacturer</h4>
            <div className="space-y-2">
              {['BMW', 'Mercedes-Benz', 'Audi', 'Tesla', 'Porsche', 'Toyota', 'Lexus', 'Land Rover'].map(make => (
                <label key={make} className="flex items-center">
                  <input
                    type="checkbox"
                    name={`manufacturer-${make}`}
                    checked={filters.manufacturer.includes(make)}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-input bg-white text-primary"
                  />
                  <span className="ml-2 text-sm">{make}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Year */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Year</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="yearMin" className="block text-xs text-muted-foreground mb-1">
                  From
                </label>
                <input
                  type="number"
                  id="yearMin"
                  name="yearMin"
                  min="1990"
                  max={currentYear}
                  value={filters.yearMin}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="yearMax" className="block text-xs text-muted-foreground mb-1">
                  To
                </label>
                <input
                  type="number"
                  id="yearMax"
                  name="yearMax"
                  min="1990"
                  max={currentYear}
                  value={filters.yearMax}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>
          
          {/* Mileage */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Mileage</h4>
            <div>
              <label htmlFor="mileageMax" className="block text-xs text-muted-foreground mb-1">
                Max Mileage
              </label>
              <input
                type="number"
                id="mileageMax"
                name="mileageMax"
                min="0"
                max="500000"
                step="1000"
                value={filters.mileageMax}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
          
          {/* Transmission */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Transmission</h4>
            <div className="space-y-2">
              {['automatic', 'manual', 'semi-automatic'].map(trans => (
                <label key={trans} className="flex items-center">
                  <input
                    type="checkbox"
                    name={`transmission-${trans}`}
                    checked={filters.transmission.includes(trans)}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-input bg-white text-primary"
                  />
                  <span className="ml-2 text-sm capitalize">{trans}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Fuel Type */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Fuel Type</h4>
            <div className="space-y-2">
              {['petrol', 'diesel', 'electric', 'hybrid'].map(fuel => (
                <label key={fuel} className="flex items-center">
                  <input
                    type="checkbox"
                    name={`fuelType-${fuel}`}
                    checked={filters.fuelType.includes(fuel)}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-input bg-white text-primary"
                  />
                  <span className="ml-2 text-sm capitalize">{fuel}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <button type="submit" className="button-primary">
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="button-secondary"
            >
              Reset Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarFilter;
