
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../../../types';
import { formatPrice } from '../../../lib/utils';

interface CarListingTableProps {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (car: Car) => void;
  limit?: number;
}

const CarListingTable: React.FC<CarListingTableProps> = ({ 
  cars, 
  onEdit, 
  onDelete,
  limit 
}) => {
  const displayCars = limit ? cars.slice(0, limit) : cars;
  
  return (
    <table className="min-w-full divide-y divide-border">
      <thead className="bg-secondary/50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Car
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Price
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Status
          </th>
          {!limit && (
            <>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Posted Date
              </th>
            </>
          )}
          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-border">
        {displayCars.map((car) => (
          <tr key={car.id} className="hover:bg-secondary/30 transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0 mr-3">
                  <img
                    src={car.images[0]}
                    alt={car.title}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                </div>
                <div>
                  <Link to={`/cars/${car.id}`} className="text-primary hover:underline">
                    {car.title}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    {car.year} · {car.mileage.toLocaleString()} miles
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="font-medium">{formatPrice(car.price)}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                car.status === 'available'
                  ? 'bg-green-100 text-green-800'
                  : car.status === 'reserved'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
              </span>
            </td>
            {!limit && (
              <>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {car.featured ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {new Date(car.createdAt).toLocaleDateString()}
                </td>
              </>
            )}
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              <button
                onClick={() => onEdit(car)}
                className="text-primary hover:text-primary/80 mr-3"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(car)}
                className="text-destructive hover:text-destructive/80"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarListingTable;
