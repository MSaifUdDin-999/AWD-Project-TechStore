import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // --- 1. BEST COLLECTION LOGIC (1 item per category) ---
  const seenCategories = new Set();
  const bestCollection = products.filter(product => {
    if (seenCategories.has(product.category)) {
      return false;
    } else {
      seenCategories.add(product.category);
      return true;
    }
  });

  // --- 2. CATEGORY FILTERS ---
  // We filter products based on the category name in the Database
  const mobileProducts = products.filter(p => p.category === 'Mobiles');
  const gamingProducts = products.filter(p => p.category === 'Gaming');
  const cameraProducts = products.filter(p => p.category === 'Cameras');
  
  // For Accessories, we check for 'Audio' (Airbuds/Speakers) OR 'Accessories'
  const accessoryProducts = products.filter(p => p.category === 'Audio' || p.category === 'Accessories');

  // --- HELPER COMPONENT FOR GRID (Keeps code clean) ---
  const ProductGrid = ({ items }) => (
    <div className="product-grid">
      {items.map((product) => (
        <div key={product._id} className="product-card">
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} className="card-image" />
          </Link>
          <div className="card-info">
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
              <h3 style={{ margin: '10px 0', color: '#333', fontSize: '1.1rem' }}>
                {product.name}
              </h3>
            </Link>
            <h4 style={{ color: '#013555', fontWeight: 'bold' }}>${product.price}</h4>
            <button className="btn-add-cart">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="product-container">
      
      {/* SECTION 1: BEST COLLECTION */}
      <h1 style={{ color: '#013555', marginBottom: '10px' }}>Our Best Collection</h1>
      <p style={{ color: '#666' }}>A hand-picked selection from every category</p>
      <ProductGrid items={bestCollection} />

      {/* SECTION 2: SMART MOBILES */}
      {mobileProducts.length > 0 && (
        <>
          <h1 style={{ color: '#013555', marginBottom: '10px', marginTop: '80px' }}>Smart Mobiles</h1>
          <p style={{ color: '#666' }}>Latest smartphones and devices</p>
          <ProductGrid items={mobileProducts} />
        </>
      )}

      {/* SECTION 3: GAMING ZONE */}
      {gamingProducts.length > 0 && (
        <>
          <h1 style={{ color: '#013555', marginBottom: '10px', marginTop: '80px' }}>Gaming Zone</h1>
          <p style={{ color: '#666' }}>Consoles, accessories & more</p>
          <ProductGrid items={gamingProducts} />
        </>
      )}

      {/* SECTION 4: PRO CAMERAS (New) */}
      {cameraProducts.length > 0 && (
        <>
          <h1 style={{ color: '#013555', marginBottom: '10px', marginTop: '80px' }}>Pro Cameras</h1>
          <p style={{ color: '#666' }}>Capture the world in high definition</p>
          <ProductGrid items={cameraProducts} />
        </>
      )}

      {/* SECTION 5: ACCESSORIES & AUDIO (New) */}
      {accessoryProducts.length > 0 && (
        <>
          <h1 style={{ color: '#013555', marginBottom: '10px', marginTop: '80px' }}>Accessories & Audio</h1>
          <p style={{ color: '#666' }}>Headphones, Speakers, and Essentials</p>
          <ProductGrid items={accessoryProducts} />
        </>
      )}

    </div>
  );
};

export default Product;