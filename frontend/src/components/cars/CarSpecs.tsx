
import React from 'react';
import { Car } from '../../types';
import { formatNumber } from '../../lib/utils';

interface CarSpecsProps {
  car: Car;
}

const CarSpecs: React.FC<CarSpecsProps> = ({ car }) => {
  const specs = [
    {
      label: 'Make',
      value: car.manufacturer,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M19 17H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2ZM18 21H6a2 2 0 0 1-2-2v-2h16v2a2 2 0 0 1-2 2Z"></path>
        </svg>
      ),
    },
    {
      label: 'Model',
      value: car.model,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
    },
    {
      label: 'Year',
      value: car.year.toString(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      label: 'Mileage',
      value: `${formatNumber(car.mileage)} mi`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z" />
          <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
        </svg>
      ),
    },
    {
      label: 'Type',
      value: car.type.charAt(0).toUpperCase() + car.type.slice(1),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="4" y="5" width="16" height="16" rx="2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M12 12h.01" />
        </svg>
      ),
    },
    {
      label: 'Transmission',
      value: car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      label: 'Fuel Type',
      value: car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M3 22h12c.7 0 1.4-.2 2-.5 1.4-.7 2-2 2-3.5V10c0-1.2-.5-2.3-1.3-3.3L16 4.4c-.6-.8-1.5-1.2-2.4-1.2H5c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2zM7 16h8" />
          <path d="M19 10v11" />
          <path d="M19 15h-2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2" />
        </svg>
      ),
    },
    {
      label: 'Color',
      value: car.color,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 22a4 4 0 0 0 4-4H8a4 4 0 0 0 4 4z" />
          <path d="M16 4c0-1.1-.9-2-2-2s-2 .9-2 2" />
          <path d="M20 6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v6l8 2V6z" />
          <path d="M10 6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6l6 2V6z" />
        </svg>
      ),
    },
    {
      label: 'VIN',
      value: car.vin,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polyline points="16 16 12 12 8 16" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
          <polyline points="16 16 12 12 8 16" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
      <h3 className="text-lg font-semibold mb-4">Vehicle Specifications</h3>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {specs.map((spec, index) => (
          <div key={index} className="border-b border-border pb-3 last:border-0 last:pb-0">
            <dt className="flex items-center text-sm text-muted-foreground mb-1">
              <span className="mr-2 text-primary">{spec.icon}</span>
              {spec.label}
            </dt>
            <dd className="font-medium pl-7">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default CarSpecs;
