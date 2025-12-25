import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css'; // Import the CSS

const Header = ({ user, logoutHandler }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      {/* 1. Brand Logo */}
      <Link to="/" className="navbar-brand">
        TECHSTORE
      </Link>
      
      {/* 2. Center Navigation */}
      <div className="nav-links">
        {isHomePage ? (
          <>
            <span onClick={() => scrollToSection('home')} className="nav-item">Home</span>
            <span onClick={() => scrollToSection('products')} className="nav-item">Products</span>
            <span onClick={() => scrollToSection('about')} className="nav-item">About</span>
            <span onClick={() => scrollToSection('about')} className="nav-item">Contact</span>
          </>
        ) : (
          <Link to="/" className="nav-item">Home</Link>
        )}
      </div>

      {/* 3. Right Side: Cart & User Auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Cart Link (Always Visible) */}
        <Link to="/cart" className="nav-item">
          <i className="fas fa-shopping-cart" style={{fontWeight:'700', fontSize:'9px'}}></i> Cart
        </Link>

        {/* Auth Logic */}
        {!user ? (
          <Link to="/login" className="nav-item">Login</Link>
        ) : (
          // --- LOGGED IN: SHOW DROPDOWN MENU ---
          <div className="dropdown">
            <span className="user-name nav-item" style={{display:'flex', alignItems:'center', gap:'5px', fontWeight:'700', fontSize:'19px'}}>
              Hi! {user.name} <i className="fas fa-caret-down"></i>
            </span>
            
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;