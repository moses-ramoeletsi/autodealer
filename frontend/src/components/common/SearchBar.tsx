
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  className?: string;
  onSearch?: (term: string) => void;
  placeholder?: string;
  variant?: 'default' | 'hero';
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = '',
  onSearch,
  placeholder = 'Search by make, model, or keyword...',
  variant = 'default',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm);
      } else {
        navigate(`/cars?search=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  if (variant === 'hero') {
    return (
      <div className={`max-w-4xl w-full mx-auto ${className}`}>
        <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              type="search"
              className="flex h-14 w-full rounded-md border border-input bg-white px-11 py-2 text-base shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="h-14 px-8 md:w-auto w-full button-primary">
            Search Cars
          </button>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          type="search"
          className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center px-3 rounded-r-md hover:text-primary"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
