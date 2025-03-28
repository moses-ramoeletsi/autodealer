
import React from 'react';
import { Car } from '../../../types';

interface DeleteCarModalProps {
  isOpen: boolean;
  car: Car | null;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteCarModal: React.FC<DeleteCarModalProps> = ({ 
  isOpen, 
  car, 
  onCancel, 
  onConfirm 
}) => {
  if (!isOpen || !car) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-scale-in">
        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p className="mb-6">
          Are you sure you want to delete <strong>{car.title}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="button-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCarModal;
