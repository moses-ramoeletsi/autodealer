
import React from 'react';
import { MonitorSmartphone, Shield, Banknote } from 'lucide-react';
import DashboardCard from './DashboardCard';

interface DashboardStatsProps {
  activeCars: number;
  reservedCars: number;
  soldCars: number;
  onCardClick: () => void;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  activeCars, 
  reservedCars, 
  soldCars, 
  onCardClick 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <DashboardCard
        title="Active Listings"
        value={activeCars}
        icon={<MonitorSmartphone className="w-6 h-6" />}
        onClick={onCardClick}
      />
      
      <DashboardCard
        title="Reserved Cars"
        value={reservedCars}
        icon={<Shield className="w-6 h-6" />}
        onClick={onCardClick}
      />
      
      <DashboardCard
        title="Sold Cars"
        value={soldCars}
        icon={<Banknote className="w-6 h-6" />}
        onClick={onCardClick}
      />
    </div>
  );
};

export default DashboardStats;
