import React from 'react';
import { ShoppingBag } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo">
            <ShoppingBag className="logo-icon" />
            Dezze Store😎
          </h1>
          <nav className="nav">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Categories</a>
            <a href="#" className="nav-link">Deals</a>
            <a href="#" className="nav-link">About</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;