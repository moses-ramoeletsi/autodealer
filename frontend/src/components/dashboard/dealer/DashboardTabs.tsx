
import React from 'react';

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
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
  );
};

export default DashboardTabs;
