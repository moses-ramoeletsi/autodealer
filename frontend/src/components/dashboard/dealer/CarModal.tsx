
import React from 'react';
import { Car } from '../../../types';
import AddCarForm from '../AddCarForm';

interface CarModalProps {
  isOpen: boolean;
  car: Car | null;
  onSave: (carData: Partial<Car>) => Promise<void>;
  onClose: () => void;
}

const CarModal: React.FC<CarModalProps> = ({ 
  isOpen, 
  car, 
  onSave, 
  onClose 
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">
            {car ? 'Edit Car Listing' : 'Add New Car Listing'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-secondary/50 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <AddCarForm
          initialData={car || {}}
          isEdit={!!car}
          onSave={onSave}
          onCancel={onClose}
        />
      </div>
    </div>
  );
};

export default CarModal;
