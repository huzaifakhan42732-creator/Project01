import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import './Searchbar.css';

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  onClear, 
  onToggleFilters 
}) => {
  return (
    <div className="search-bar">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        placeholder="Search for products, categories, or brands..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchQuery && (
        <button 
          className="clear-btn"
          onClick={onClear}
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
      <button 
        className="filter-toggle"
        onClick={onToggleFilters}
        aria-label="Toggle filters"
      >
        <Filter size={18} />
      </button>
    </div>
  );
};

export default SearchBar;