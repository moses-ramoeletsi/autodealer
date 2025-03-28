
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, onClick }) => {
  return (
    <div
      className="bg-card rounded-lg shadow-sm p-6 border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="p-3 bg-primary/10 rounded-full text-primary mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{value}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
