
import React from 'react';
import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  onAddNewListing: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onAddNewListing }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dealer Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your listings, inquiries, and test drives
        </p>
      </div>
      
      <button
        onClick={onAddNewListing}
        className="button-primary flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add New Listing
      </button>
    </div>
  );
};

export default DashboardHeader;
