
import React from 'react';
import { Plus } from 'lucide-react';
import { Car } from '../../../../types';
import CarListingTable from '../CarListingTable';

interface ListingsTabProps {
  dealerCars: Car[];
  onOpenAddCar: () => void;
  onEditCar: (car: Car) => void;
  onDeleteCar: (car: Car) => void;
}

const ListingsTab: React.FC<ListingsTabProps> = ({
  dealerCars,
  onOpenAddCar,
  onEditCar,
  onDeleteCar
}) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Listings</h2>
        <button
          onClick={onOpenAddCar}
          className="button-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Listing
        </button>
      </div>
      
      {dealerCars.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
          <p className="text-muted-foreground mb-4">You haven't added any car listings yet.</p>
          <button
            onClick={onOpenAddCar}
            className="button-primary"
          >
            Add Your First Listing
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-border">
          <div className="p-4 bg-secondary/30 border-b border-border">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search listings..."
                className="input-field text-sm"
              />
              <select className="input-field text-sm">
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
          
          <CarListingTable 
            cars={dealerCars} 
            onEdit={onEditCar} 
            onDelete={onDeleteCar} 
          />
        </div>
      )}
    </section>
  );
};

export default ListingsTab;
