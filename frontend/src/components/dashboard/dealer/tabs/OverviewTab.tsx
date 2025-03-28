
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../../../../types';
import CarListingTable from '../CarListingTable';

interface OverviewTabProps {
  dealerCars: Car[];
  onOpenAddCar: () => void;
  onEditCar: (car: Car) => void;
  onDeleteCar: (car: Car) => void;
  setActiveTab: (tab: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  dealerCars, 
  onOpenAddCar, 
  onEditCar, 
  onDeleteCar, 
  setActiveTab 
}) => {
  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Listings</h2>
          <button
            onClick={() => setActiveTab('listings')}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View All
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
            <CarListingTable 
              cars={dealerCars} 
              onEdit={onEditCar} 
              onDelete={onDeleteCar}
              limit={5}
            />
          </div>
        )}
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-6">Performance Overview</h2>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
          <p className="text-muted-foreground mb-4 text-center">
            Detailed analytics and performance metrics will be available soon.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Views</h3>
              <p className="text-2xl font-bold">1,245</p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Inquiries</h3>
              <p className="text-2xl font-bold">37</p>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Test Drives</h3>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
          
          <div className="h-64 bg-secondary/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Analytics chart coming soon</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewTab;
