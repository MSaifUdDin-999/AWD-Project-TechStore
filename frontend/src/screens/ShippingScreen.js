import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ShippingScreen = () => {
  const navigate = useNavigate();

  // 1. Load existing address from Local Storage (if valid JSON exists)
  const existingAddress = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

  const [address, setAddress] = useState(existingAddress.address || '');
  const [city, setCity] = useState(existingAddress.city || '');
  const [postalCode, setPostalCode] = useState(existingAddress.postalCode || '');
  const [country, setCountry] = useState(existingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    
    // 2. Save the new data to Local Storage
    localStorage.setItem('shippingAddress', JSON.stringify({
      address, city, postalCode, country
    }));

    // 3. Move to the next step (Payment)
    navigate('/payment');
  };

  return (
    <div className="form-container">
      <div className="form-inner">
        <h1 style={{ marginBottom: '20px' }}>Shipping Address</h1>
        
        <form onSubmit={submitHandler}>
          
          <div className="form-group">
            <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>Address</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter address" 
              value={address} 
              required
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>City</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter city" 
              value={city} 
              required
              onChange={(e) => setCity(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>Postal Code</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter postal code" 
              value={postalCode} 
              required
              onChange={(e) => setPostalCode(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label style={{display: 'block', marginBottom:'5px', fontWeight:'bold'}}>Country</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter country" 
              value={country} 
              required
              onChange={(e) => setCountry(e.target.value)} 
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Continue
          </button>

        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;