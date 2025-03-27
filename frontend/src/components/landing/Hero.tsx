
import React from 'react';
import SearchBar from '../common/SearchBar';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury car on a road"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>
      
      <div className="relative z-10 w-full page-container text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Find Your Perfect Drive
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 mx-auto max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover our premium selection of vehicles, meticulously chosen for quality and performance.
          </p>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <SearchBar variant="hero" />
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Stat icon="car" value="500+" label="Vehicles" />
            <Stat icon="users" value="1,000+" label="Happy Customers" />
            <Stat icon="shield" value="100%" label="Satisfaction" />
            <Stat icon="award" value="15+" label="Years Experience" />
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatProps {
  icon: 'car' | 'users' | 'shield' | 'award';
  value: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ icon, value, label }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'car':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M19 17H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2ZM18 21H6a2 2 0 0 1-2-2v-2h16v2a2 2 0 0 1-2 2Z"></path>
          </svg>
        );
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case 'award':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="p-3 bg-white/10 rounded-full">
        {renderIcon()}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
};

export default Hero;
