import React from 'react';
import Product from '../components/Product';
import About from '../components/About';
import '../App.css';

const HomeScreen = () => {
  return (
    <div>
      {/* 1. HERO SECTION */}
      <div id="home" className="hero-section">
        <h1 className="hero-title">TECHSTORE</h1>
        <p className="hero-subtitle">(Discover the future of technology)</p>
        <button 
          onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth'})} 
          className="btn-shop"
        >
          Shop Collection
        </button>
      </div>

      {/* 2. PRODUCTS SECTION */}
      <div id="products" className="section">
        <Product />
      </div>

      {/* 3. ABOUT SECTION (Added here!) */}
      <div id="about">
         <About />
      </div>

    </div>
  );
};

export default HomeScreen;