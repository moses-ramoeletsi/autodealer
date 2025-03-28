import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useInquiry } from '../../context/InquiryContext';
import { useCars } from '../../context/CarContext';
import { formatDate, formatTime } from '../../lib/utils';
import CarCard from '../common/CarCard';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { inquiries, testDrives, favorites, isLoading: inquiryLoading } = useInquiry();
  const { cars, isLoading: carsLoading } = useCars();
  
  const [activeTab, setActiveTab] = useState('overview');
  
  const favoriteCars = favorites.map(fav => {
    return cars.find(car => car.id === fav.carId);
  }).filter(Boolean);
    
  const isLoading = inquiryLoading || carsLoading;
  
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
          <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">
            Manage your vehicle inquiries, test drives, and favorites
          </p>
        </div>
        
        <Link to="/cars" className="button-primary">
          Browse Cars
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DashboardCard
          title="Favorites"
          value={favorites.length}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          }
          onClick={() => setActiveTab('favorites')}
        />
        
        <DashboardCard
          title="Inquiries"
          value={inquiries.length}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          }
          onClick={() => setActiveTab('inquiries')}
        />
        
        <DashboardCard
          title="Test Drives"
          value={testDrives.length}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
          onClick={() => setActiveTab('testDrives')}
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
            onClick={() => setActiveTab('favorites')}
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'favorites'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
            } transition-colors`}
          >
            Favorites
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
            onClick={() => setActiveTab('testDrives')}
            className={`whitespace-nowrap px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === 'testDrives'
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
            Profile
          </button>
        </nav>
      </div>
      
      <div className="min-h-[50vh]">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Favorites</h2>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View All
                </button>
              </div>
              {favorites.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
                  <p className="text-muted-foreground mb-4">You haven't added any cars to your favorites yet.</p>
                  <Link to="/cars" className="button-secondary">
                    Browse Cars
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favoriteCars.slice(0, 3).map((car) => (
                    car && <CarCard key={car.id} car={car} />
                  ))}
                </div>
              )}
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Upcoming Test Drives</h2>
                <button
                  onClick={() => setActiveTab('testDrives')}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View All
                </button>
              </div>
              {testDrives.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
                  <p className="text-muted-foreground mb-4">You haven't scheduled any test drives yet.</p>
                  <Link to="/cars" className="button-secondary">
                    Browse Cars
                  </Link>
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
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-border">
                      {testDrives.slice(0, 3).map((testDrive) => {
                        const car = cars.find(c => c.id === testDrive.carId);
                        return (
                          <tr key={testDrive.id} className="hover:bg-secondary/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {car ? (
                                <Link to={`/cars/${car.id}`} className="text-primary hover:underline">
                                  {car.title}
                                </Link>
                              ) : (
                                'Unknown Car'
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {formatDate(testDrive.date)}, {formatTime(testDrive.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                testDrive.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : testDrive.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : testDrive.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {testDrive.status.charAt(0).toUpperCase() + testDrive.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        )}
        
        {activeTab === 'favorites' && (
          <section>
            <h2 className="text-xl font-semibold mb-6">Your Favorite Cars</h2>
            {favorites.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
                <p className="text-muted-foreground mb-4">You haven't added any cars to your favorites yet.</p>
                <Link to="/cars" className="button-secondary">
                  Browse Cars
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {favoriteCars.map((car) => (
                  car && <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </section>
        )}
        
        {activeTab === 'inquiries' && (
          <section>
            <h2 className="text-xl font-semibold mb-6">Your Inquiries</h2>
            {inquiries.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
                <p className="text-muted-foreground mb-4">You haven't made any inquiries yet.</p>
                <Link to="/cars" className="button-secondary">
                  Browse Cars
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {inquiries.map((inquiry) => {
                  const car = cars.find(c => c.id === inquiry.carId);
                  return (
                    <div key={inquiry.id} className="bg-white rounded-lg shadow-sm p-6 border border-border">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold">
                            {car ? (
                              <Link to={`/cars/${car.id}`} className="text-primary hover:underline">
                                {car.title}
                              </Link>
                            ) : (
                              'Unknown Car'
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Sent on {formatDate(inquiry.createdAt)}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          inquiry.status === 'replied'
                            ? 'bg-green-100 text-green-800'
                            : inquiry.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                        </span>
                      </div>
                      <div className="border-t border-border pt-4">
                        <h4 className="text-sm font-medium mb-2">Your Message:</h4>
                        <p className="text-sm bg-secondary/30 p-3 rounded-md">{inquiry.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
        
        {activeTab === 'testDrives' && (
          <section>
            <h2 className="text-xl font-semibold mb-6">Your Test Drives</h2>
            {testDrives.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-border">
                <p className="text-muted-foreground mb-4">You haven't scheduled any test drives yet.</p>
                <Link to="/cars" className="button-secondary">
                  Browse Cars
                </Link>
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
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-border">
                    {testDrives.map((testDrive) => {
                      const car = cars.find(c => c.id === testDrive.carId);
                      return (
                        <tr key={testDrive.id} className="hover:bg-secondary/30 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {car ? (
                              <Link to={`/cars/${car.id}`} className="text-primary hover:underline">
                                {car.title}
                              </Link>
                            ) : (
                              'Unknown Car'
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatDate(testDrive.date)}, {formatTime(testDrive.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              testDrive.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : testDrive.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : testDrive.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {testDrive.status.charAt(0).toUpperCase() + testDrive.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {testDrive.notes || 'No additional notes'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
        
        {activeTab === 'profile' && (
          <UserProfile />
        )}
      </div>
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

const UserProfile: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await updateProfile({ name, phone, address });
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile. Please try again.');
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Your Profile</h2>
      
      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-sm">
          {success}
        </div>
      )}
      
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={user?.email}
              className="input-field bg-secondary/30"
              disabled
            />
            <p className="text-xs text-muted-foreground mt-1">
              Email address cannot be changed
            </p>
          </div>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
              placeholder="(123) 456-7890"
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field"
              rows={3}
              placeholder="Enter your address"
            />
          </div>
          
          <button
            type="submit"
            className="button-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerDashboard;