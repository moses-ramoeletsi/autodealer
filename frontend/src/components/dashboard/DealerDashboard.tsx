
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCars } from '../../context/CarContext';
import { Car } from '../../types';
import { formatPrice } from '../../lib/utils';

const DealerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { cars, deleteCar, isLoading } = useCars();
  
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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dealer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your listings, inquiries, and test drives
          </p>
        </div>
        
        <button
          onClick={() => {
            setSelectedCar(null);
            setIsAddCarModalOpen(true);
          }}
          className="button-primary flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Listing
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DashboardCard
          title="Active Listings"
          value={activeCars.length}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M19 17H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2ZM18 21H6a2 2 0 0 1-2-2v-2h16v2a2 2 0 0 1-2 2Z"></path>
            </svg>
          }
          onClick={() => setActiveTab('listings')}
        />
        
        <DashboardCard
          title="Reserved Cars"
          value={reservedCars.length}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z" />
              <path d="M9 9l2 2 4-4" />
            </svg>
          }
          onClick={() => setActiveTab('listings')}
        />
        
        <DashboardCard
          title="Sold Cars"
          value={soldCars.length}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M9 11V8H4.5a2.5 2.5 0 0 0 0 5H5" />
              <circle cx="9" cy="13" r="2" />
              <path d="M22 11v3h-4.5a2.5 2.5 0 1 1 0-5H19" />
              <circle cx="15" cy="13" r="2" />
            </svg>
          }
          onClick={() => setActiveTab('listings')}
        />
      </div>
      
      <div className="mb-6 border-b border-border">
        <nav className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'overview'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
            } transition-colors`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'listings'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
            } transition-colors`}
          >
            My Listings
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'inquiries'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
            } transition-colors`}
          >
            Inquiries
          </button>
          <button
            onClick={() => setActiveTab('test-drives')}
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'test-drives'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
            } transition-colors`}
          >
            Test Drives
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'profile'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
            } transition-colors`}
          >
            Dealer Profile
          </button>
        </nav>
      </div>
      
      <div className="min-h-[50vh]">
        {activeTab === 'overview' && (
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
                    onClick={() => {
                      setSelectedCar(null);
                      setIsAddCarModalOpen(true);
                    }}
                    className="button-primary"
                  >
                    Add Your First Listing
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-border">
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-border">
                      {dealerCars.slice(0, 5).map((car) => (
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => handleEditCar(car)}
                              className="text-primary hover:text-primary/80 mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(car)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
        )}
        
        {activeTab === 'listings' && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">My Listings</h2>
              <button
                onClick={() => {
                  setSelectedCar(null);
                  setIsAddCarModalOpen(true);
                }}
                className="button-primary flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add New Listing
              </button>
            </div>
            
            {dealerCars.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
                <p className="text-muted-foreground mb-4">You haven't added any car listings yet.</p>
                <button
                  onClick={() => {
                    setSelectedCar(null);
                    setIsAddCarModalOpen(true);
                  }}
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Featured
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Posted Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-border">
                    {dealerCars.map((car) => (
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleEditCar(car)}
                            className="text-primary hover:text-primary/80 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(car)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
        
        {activeTab === 'inquiries' && (
          <section>
            <h2 className="text-xl font-semibold mb-6">Customer Inquiries</h2>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
              <p className="text-muted-foreground mb-4">
                Customer inquiry management will be available in the next update.
              </p>
            </div>
          </section>
        )}
        
        {activeTab === 'test-drives' && (
          <section>
            <h2 className="text-xl font-semibold mb-6">Test Drive Appointments</h2>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
              <p className="text-muted-foreground mb-4">
                Test drive appointment management will be available in the next update.
              </p>
            </div>
          </section>
        )}
        
        {activeTab === 'profile' && (
          <section>
            <h2 className="text-xl font-semibold mb-6">Dealer Profile</h2>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
              <p className="text-muted-foreground mb-4">
                Dealer profile management will be available in the next update.
              </p>
            </div>
          </section>
        )}
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedCar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-scale-in">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete <strong>{selectedCar.title}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add/Edit Car Modal would go here */}
      {isAddCarModalOpen && (
        <AddEditCarModal
          car={selectedCar}
          onClose={() => {
            setIsAddCarModalOpen(false);
            setSelectedCar(null);
          }}
          onSave={(carData) => {
            // Here you would handle saving the car data
            console.log('Car data to save:', carData);
            setIsAddCarModalOpen(false);
            setSelectedCar(null);
          }}
        />
      )}
    </div>
  );
};

const DashboardCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ title, value, icon, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm p-6 border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
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

interface AddEditCarModalProps {
  car: Car | null;
  onClose: () => void;
  onSave: (carData: any) => void;
}

const AddEditCarModal: React.FC<AddEditCarModalProps> = ({ car, onClose, onSave }) => {
  // In a real implementation, this would have a form to add/edit car details
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 animate-scale-in">
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
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="input-field"
              defaultValue={car?.title}
              placeholder="e.g., 2023 BMW 5 Series"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                Price
              </label>
              <input
                id="price"
                type="number"
                className="input-field"
                defaultValue={car?.price}
                placeholder="e.g., 45000"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1">
                Status
              </label>
              <select
                id="status"
                className="input-field"
                defaultValue={car?.status || 'available'}
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              className="input-field"
              defaultValue={car?.description}
              placeholder="Enter car description..."
            />
          </div>
          
          <p className="text-center text-muted-foreground">
            This is a simplified modal. In a real application, you would have complete
            forms for all car details including image uploads.
          </p>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="button-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave({
                title: "2023 Test Car", // In a real app, get values from form inputs
                price: 50000,
                description: "Test description",
                status: "available"
              })}
              className="button-primary"
            >
              {car ? 'Save Changes' : 'Add Listing'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;
