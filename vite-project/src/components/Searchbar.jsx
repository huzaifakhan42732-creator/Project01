import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Filter, Clock, TrendingUp, ArrowUpRight, Sparkles } from 'lucide-react';
import './Searchbar.css';

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  onClear, 
  onToggleFilters 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Mock data - In real app, these would come from props or API
  const recentSearches = [
    'Leather Jacket',
    'Running Shoes',
    'Wireless Headphones',
    'Denim Jeans'
  ];

  const trendingSearches = [
    { query: 'Summer Collection', trend: '+45%' },
    { query: 'Smart Watch', trend: '+32%' },
    { query: 'Sunglasses', trend: '+28%' },
    { query: 'Backpack', trend: '+18%' }
  ];

  const suggestions = [
    { text: 'Leather Boots', category: 'Footwear', results: 124 },
    { text: 'Leather Wallet', category: 'Accessories', results: 89 },
    { text: 'Leather Belt', category: 'Accessories', results: 156 },
    { text: 'Leather Bag', category: 'Bags', results: 203 }
  ];

  const categories = [
    '👔 Clothing',
    '👟 Footwear',
    '👜 Accessories',
    '⌚ Watches',
    '🎒 Bags',
    '👓 Eyewear'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleSearchChange = (value) => {
    onSearchChange(value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (text) => {
    onSearchChange(text);
    setShowSuggestions(false);
    setIsFocused(false);
  };

  const handleClear = () => {
    onClear();
    setShowSuggestions(true);
  };

  const filteredSuggestions = searchQuery 
    ? suggestions.filter(s => s.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : suggestions;

  return (
    <div className="search-container" ref={searchRef}>
      <div className={`search-bar ${isFocused ? 'search-bar-focused' : ''}`}>
        <div className="search-icon-wrapper">
          <Search className="search-icon" size={20} />
        </div>
        
        <input
          type="text"
          placeholder="Search for products, categories, or brands..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={handleFocus}
          className="search-input"
          autoComplete="off"
        />

        <div className="search-actions">
          {searchQuery && (
            <button 
              className="action-btn clear-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
          
          <div className="action-divider"></div>
          
          <button 
            className="action-btn filter-toggle"
            onClick={onToggleFilters}
            aria-label="Toggle filters"
          >
            <Filter size={18} />
            <span className="filter-text">Filters</span>
          </button>
        </div>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="search-dropdown">
          <div className="dropdown-content">
            {/* Active Search Results */}
            {searchQuery && filteredSuggestions.length > 0 && (
              <div className="dropdown-section">
                <div className="section-header">
                  <Sparkles size={16} />
                  <span>Suggestions</span>
                </div>
                <div className="suggestions-list">
                  {filteredSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <Search size={16} className="suggestion-icon" />
                      <div className="suggestion-content">
                        <span className="suggestion-text">{suggestion.text}</span>
                        <span className="suggestion-meta">
                          in {suggestion.category} · {suggestion.results} items
                        </span>
                      </div>
                      <ArrowUpRight size={16} className="suggestion-arrow" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {!searchQuery && recentSearches.length > 0 && (
              <div className="dropdown-section">
                <div className="section-header">
                  <Clock size={16} />
                  <span>Recent Searches</span>
                  <button className="clear-history-btn">Clear</button>
                </div>
                <div className="recent-list">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="recent-item"
                      onClick={() => handleSuggestionClick(search)}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <Clock size={14} className="recent-icon" />
                      <span>{search}</span>
                      <X size={14} className="remove-icon" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            {!searchQuery && (
              <div className="dropdown-section">
                <div className="section-header">
                  <TrendingUp size={16} />
                  <span>Trending Now</span>
                </div>
                <div className="trending-list">
                  {trendingSearches.map((item, index) => (
                    <button
                      key={index}
                      className="trending-item"
                      onClick={() => handleSuggestionClick(item.query)}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="trending-content">
                        <TrendingUp size={14} className="trending-icon" />
                        <span>{item.query}</span>
                      </div>
                      <span className="trend-badge">{item.trend}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Categories */}
            {!searchQuery && (
              <div className="dropdown-section categories-section">
                <div className="section-header">
                  <span>Quick Categories</span>
                </div>
                <div className="categories-grid">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className="category-chip"
                      onClick={() => handleSuggestionClick(category.split(' ')[1])}
                      style={{ animationDelay: `${index * 0.03}s` }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchQuery && filteredSuggestions.length === 0 && (
              <div className="no-results">
                <Search size={32} className="no-results-icon" />
                <p className="no-results-title">No suggestions found</p>
                <p className="no-results-text">
                  Try searching for something else or browse our categories
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay */}
      {showSuggestions && (
        <div 
          className="search-overlay"
          onClick={() => {
            setShowSuggestions(false);
            setIsFocused(false);
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;