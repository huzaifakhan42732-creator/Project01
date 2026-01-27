import React from 'react';
import { Clock } from 'lucide-react';
import './SearchHistory.css';

const SearchHistory = ({ 
  history, 
  onSelectHistory, 
  onClearHistory 
}) => {

  if (history.length === 0) return null;

  return (
    <div className="search-history">
      <div className="search-history-header">
        <span className="search-history-title">
          <Clock size={14} />
          Recent Searches
        </span>
        <button onClick={onClearHistory} className="clear-history-btn">
          Clear
        </button>
      </div>
      {history.map((query, index) => (
        <div
          key={index}
          className="search-history-item"
          onClick={() => onSelectHistory(query)}
        >
          <Clock size={14} />
          <span>{query}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchHistory;