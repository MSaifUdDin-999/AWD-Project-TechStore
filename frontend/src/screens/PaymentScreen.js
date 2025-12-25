import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const PaymentScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const shippingAddress = localStorage.getItem('shippingAddress');
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [navigate]);

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/placeorder');
  };

  return (
    <div className="form-container">
      <div className="form-inner">
        <h1 style={{ marginBottom: '20px' }}>Payment Method</h1>
        
        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ fontSize: '1.2rem', color: '#34495E', fontWeight: 'bold' }}>
              Select Method
            </label>
            
            <div style={{ marginTop: '15px' }}>
              
              {/* OPTION 1: Best for Overseas */}
              <div style={{ marginBottom: '15px' }}>
                <input 
                  type="radio" 
                  id="CreditCard" 
                  name="paymentMethod" 
                  value="Credit Card" 
                  checked={paymentMethod === 'Credit Card'} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                  style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                />
                <label htmlFor="CreditCard" style={{ fontSize: '1.1rem' }}>
                  Credit / Debit Card (International)
                </label>
              </div>

              {/* OPTION 2: Best for Pakistan */}
              <div style={{ marginBottom: '15px' }}>
                <input 
                  type="radio" 
                  id="COD" 
                  name="paymentMethod" 
                  value="Cash on Delivery" 
                  checked={paymentMethod === 'Cash on Delivery'} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                  style={{ marginRight: '10px', transform: 'scale(1.2)' }}
                />
                <label htmlFor="COD" style={{ fontSize: '1.1rem' }}>
                  Cash on Delivery (Pakistan Only)
                </label>
              </div>

            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;