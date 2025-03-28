
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCars } from '../../context/CarContext';
import { Car } from '../../types';

// Import new component files
import DashboardHeader from './dealer/DashboardHeader';
import DashboardStats from './dealer/DashboardStats';
import DashboardTabs from './dealer/DashboardTabs';
import CarModal from './dealer/CarModal';
import DeleteCarModal from './dealer/DeleteCarModal';

// Import tab components
import OverviewTab from './dealer/tabs/OverviewTab';
import ListingsTab from './dealer/tabs/ListingsTab';
import InquiriesTab from './dealer/tabs/InquiriesTab';
import TestDrivesTab from './dealer/tabs/TestDrivesTab';
import ProfileTab from './dealer/tabs/ProfileTab';

const DealerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { cars, addCar, updateCar, deleteCar, isLoading } = useCars();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Filter cars for this dealer
  const dealerCars = cars.filter(car => car.dealerId === user?.id);
  
  const activeCars = dealerCars.filter(car => car.status === 'available');
  const soldCars = dealerCars.filter(car => car.status === 'sold');
  const reservedCars = dealerCars.filter(car => car.status === 'reserved');
  
  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setIsAddCarModalOpen(true);
  };
  
  const handleDeleteClick = (car: Car) => {
    setSelectedCar(car);
    setIsDeleteModalOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (selectedCar) {
      try {
        await deleteCar(selectedCar.id);
        setIsDeleteModalOpen(false);
        setSelectedCar(null);
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };
  
  const handleSaveCar = async (carData: Partial<Car>) => {
    try {
      if (selectedCar) {
        // Update existing car
        await updateCar(selectedCar.id, {
          ...carData,
          updatedAt: new Date()
        });
      } else {
        // Add new car
        await addCar({
          ...carData,
          id: `car-${Date.now()}`,
          dealerId: user?.id || '',
          createdAt: new Date(),
          updatedAt: new Date()
        } as Car);
      }
      setIsAddCarModalOpen(false);
      setSelectedCar(null);
    } catch (error) {
      console.error('Error saving car:', error);
      throw error;
    }
  };
  
  const handleAddNewListing = () => {
    setSelectedCar(null);
    setIsAddCarModalOpen(true);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-secondary rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-secondary rounded mb-2"></div>
          <div className="h-3 w-32 bg-secondary rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-container pt-8 pb-16">
      <DashboardHeader onAddNewListing={handleAddNewListing} />
      
      <DashboardStats 
        activeCars={activeCars.length}
        reservedCars={reservedCars.length}
        soldCars={soldCars.length}
        onCardClick={() => setActiveTab('listings')}
      />
      
      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="min-h-[50vh]">
        {activeTab === 'overview' && (
          <OverviewTab 
            dealerCars={dealerCars}
            onOpenAddCar={handleAddNewListing}
            onEditCar={handleEditCar}
            onDeleteCar={handleDeleteClick}
            setActiveTab={setActiveTab}
          />
        )}
        
        {activeTab === 'listings' && (
          <ListingsTab 
            dealerCars={dealerCars}
            onOpenAddCar={handleAddNewListing}
            onEditCar={handleEditCar}
            onDeleteCar={handleDeleteClick}
          />
        )}
        
        {activeTab === 'inquiries' && (
          <InquiriesTab />
        )}
        
        {activeTab === 'test-drives' && (
          <TestDrivesTab />
        )}
        
        {activeTab === 'profile' && (
          <ProfileTab user={user} />
        )}
      </div>
      
      {/* Modals */}
      <DeleteCarModal 
        isOpen={isDeleteModalOpen}
        car={selectedCar}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
      
      <CarModal 
        isOpen={isAddCarModalOpen}
        car={selectedCar}
        onSave={handleSaveCar}
        onClose={() => {
          setIsAddCarModalOpen(false);
          setSelectedCar(null);
        }}
      />
    </div>
  );
};

export default DealerDashboard;