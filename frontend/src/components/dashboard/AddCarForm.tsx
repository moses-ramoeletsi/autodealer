
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Car } from '../../types';

interface AddCarFormProps {
  onSave: (carData: Partial<Car>) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<Car>;
  isEdit?: boolean;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ 
  onSave, 
  onCancel, 
  initialData = {}, 
  isEdit = false 
}) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Car>>({
    title: initialData.title || '',
    manufacturer: initialData.manufacturer || '',
    model: initialData.model || '',
    year: initialData.year || new Date().getFullYear(),
    price: initialData.price || 0,
    mileage: initialData.mileage || 0,
    description: initialData.description || '',
    color: initialData.color || '',
    transmission: initialData.transmission || 'automatic',
    fuelType: initialData.fuelType || 'petrol',
    status: initialData.status || 'available',
    type: initialData.type || 'sedan',
    featured: initialData.featured || false,
    vin: initialData.vin || '',
    images: initialData.images || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const updatedValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    
    // Special handling for number fields
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? '' : Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: updatedValue
      }));
    }
    
    // Clear error for the field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.manufacturer) newErrors.manufacturer = 'Manufacturer is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (formData.price && formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.description) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      // Add default values for a complete car listing
      const completeCarData: Partial<Car> = {
        ...formData,
        dealerId: user?.id || '',
        // For new cars, generate some sample images
        images: formData.images && formData.images.length > 0 
          ? formData.images 
          : [
              `https://source.unsplash.com/random/800x600/?car,${formData.manufacturer || 'auto'}`,
              `https://source.unsplash.com/random/800x600/?car,interior`,
              `https://source.unsplash.com/random/800x600/?car,${formData.model || 'vehicle'}`
            ],
      };
      
      await onSave(completeCarData);
    } catch (error) {
      console.error('Error saving car:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Failed to save car. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), `https://source.unsplash.com/random/800x600/?car,${Math.random()}`]
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {errors.form}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className={`input-field w-full ${errors.title ? 'border-red-500' : ''}`}
              placeholder="e.g. 2023 BMW 5 Series"
            />
            {errors.title && <span className="text-red-500 text-xs">{errors.title}</span>}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="manufacturer" className="block text-sm font-medium mb-1">
                Manufacturer *
              </label>
              <input
                id="manufacturer"
                name="manufacturer"
                type="text"
                value={formData.manufacturer}
                onChange={handleChange}
                className={`input-field w-full ${errors.manufacturer ? 'border-red-500' : ''}`}
                placeholder="e.g. BMW"
              />
              {errors.manufacturer && <span className="text-red-500 text-xs">{errors.manufacturer}</span>}
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium mb-1">
                Model *
              </label>
              <input
                id="model"
                name="model"
                type="text"
                value={formData.model}
                onChange={handleChange}
                className={`input-field w-full ${errors.model ? 'border-red-500' : ''}`}
                placeholder="e.g. 5 Series"
              />
              {errors.model && <span className="text-red-500 text-xs">{errors.model}</span>}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium mb-1">
                Year *
              </label>
              <input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                className={`input-field w-full ${errors.year ? 'border-red-500' : ''}`}
                placeholder="e.g. 2023"
                min="1900" 
                max={new Date().getFullYear() + 1}
              />
              {errors.year && <span className="text-red-500 text-xs">{errors.year}</span>}
            </div>
            <div>
              <label htmlFor="vin" className="block text-sm font-medium mb-1">
                VIN
              </label>
              <input
                id="vin"
                name="vin"
                type="text"
                value={formData.vin}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="Vehicle Identification Number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Price (USD) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className={`input-field w-full ${errors.price ? 'border-red-500' : ''}`}
                placeholder="e.g. 45000"
                min="0"
              />
              {errors.price && <span className="text-red-500 text-xs">{errors.price}</span>}
            </div>
            <div>
              <label htmlFor="mileage" className="block text-sm font-medium mb-1">
                Mileage
              </label>
              <input
                id="mileage"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="e.g. 5000"
                min="0"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="color" className="block text-sm font-medium mb-1">
                Color
              </label>
              <input
                id="color"
                name="color"
                type="text"
                value={formData.color}
                onChange={handleChange}
                className="input-field w-full"
                placeholder="e.g. Midnight Blue"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="transmission" className="block text-sm font-medium mb-1">
                Transmission
              </label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
                <option value="semi-automatic">Semi-Automatic</option>
              </select>
            </div>
            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium mb-1">
                Fuel Type
              </label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Car Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input-field w-full"
              >
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="coupe">Coupe</option>
                <option value="wagon">Wagon</option>
                <option value="convertible">Convertible</option>
                <option value="van">Van</option>
                <option value="hatchback">Hatchback</option>
              </select>
            </div>
            <div className="flex items-center pt-7">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="featured" className="ml-2 block text-sm">
                Featured Listing
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`input-field w-full resize-none ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter detailed description of the car..."
            />
            {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Images
              </label>
              <button
                type="button"
                onClick={handleAddImage}
                className="text-xs text-primary hover:text-primary/80 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Image
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {(formData.images || []).map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Car image ${index + 1}`}
                    className="h-20 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
              {(formData.images || []).length === 0 && (
                <div className="h-20 w-full border border-dashed border-gray-300 rounded-md flex items-center justify-center text-sm text-gray-400">
                  No images added
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              For production use, this would include a proper image upload functionality.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="button-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="button-primary flex items-center"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isEdit ? 'Save Changes' : 'Add Listing'}
        </button>
      </div>
    </form>
  );
};

export default AddCarForm;
