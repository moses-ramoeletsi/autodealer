
import React from 'react';
import { User } from '../../../../types';

interface ProfileTabProps {
  user: User | null;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-6">Dealer Profile</h2>
      <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-secondary/30 p-6 rounded-lg text-center">
              <div className="mx-auto w-24 h-24 mb-4 relative">
                <img 
                  src={user?.avatar || 'https://randomuser.me/api/portraits/men/2.jpg'} 
                  alt="Dealer avatar" 
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />
                <button className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
              <h3 className="text-lg font-semibold">{user?.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
              <div className="text-left mt-6">
                <p className="text-sm font-medium mb-1">Member since</p>
                <p className="text-sm text-muted-foreground">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h3 className="text-lg font-semibold mb-4">Dealership Information</h3>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    className="input-field w-full"
                    defaultValue={user?.name}
                    placeholder="Your dealership name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="input-field w-full"
                    defaultValue={user?.phone || ''}
                    placeholder="Your contact number"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-1">
                  Website
                </label>
                <input
                  id="website"
                  type="url"
                  className="input-field w-full"
                  placeholder="https://www.yourdealership.com"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  className="input-field w-full"
                  defaultValue={user?.address || ''}
                  placeholder="Your dealership address"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  About Your Dealership
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="input-field w-full"
                  placeholder="Tell customers about your dealership..."
                ></textarea>
              </div>
              
              <h3 className="text-lg font-semibold pt-2">Business Hours</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Weekdays</label>
                  <input
                    type="text"
                    className="input-field w-full"
                    placeholder="e.g. 9:00 AM - 6:00 PM"
                    defaultValue="9:00 AM - 6:00 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Weekends</label>
                  <input
                    type="text"
                    className="input-field w-full"
                    placeholder="e.g. 10:00 AM - 4:00 PM"
                    defaultValue="10:00 AM - 4:00 PM"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="button-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="button-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileTab;
