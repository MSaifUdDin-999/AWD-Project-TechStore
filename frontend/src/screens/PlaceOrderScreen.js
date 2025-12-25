import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Import Axios
import '../App.css'; 

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  // Get Data from Local Storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
  const paymentMethod = localStorage.getItem('paymentMethod');
  const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Get User Info for Token

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [navigate, shippingAddress, paymentMethod]);

  // Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  // --- NEW: THE REAL ORDER HANDLER ---
  const placeOrderHandler = async () => {
    try {
      // 1. Setup the Headers (Authorization Token)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // 2. Send the Order to the Backend
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        config
      );

      // 3. Success! Clear the cart and redirect
      alert('Order Placed Successfully!');
      localStorage.removeItem('cartItems'); // Clear local storage
      navigate('/'); // Go back home (We will build an "Order Success" page later)

    } catch (error) {
      alert(error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#34495E' }}>Review Order</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ flex: '2' }}>
          
          <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <h2 style={{ color: '#34495E', fontSize: '1.5rem' }}>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <h2 style={{ color: '#34495E', fontSize: '1.5rem' }}>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {paymentMethod}
            </p>
          </div>

          <div>
            <h2 style={{ color: '#34495E', fontSize: '1.5rem' }}>Order Items</h2>
            {cartItems.length === 0 ? (
              <div style={{color:'red'}}>Your cart is empty</div>
            ) : (
              <div>
                {cartItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent:'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                      <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius:'5px', objectFit:'cover' }} />
                      <Link to={`/product/${item.product}`} style={{textDecoration:'none', color:'#333'}}>
                        {item.name}
                      </Link>
                    </div>
                    <div style={{color: '#666'}}>
                      {item.qty} x ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ flex: '1' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', background: '#fff' }}>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 20px 0', color: '#34495E', textAlign:'center', borderBottom:'1px solid #eee', paddingBottom:'10px' }}>
              Order Summary
            </h2>
            
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
              <span>Items</span>
              <span>${itemsPrice}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
              <span>Shipping</span>
              <span>${shippingPrice}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
              <span>Tax</span>
              <span>${taxPrice}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px', borderTop:'1px solid #eee', paddingTop:'10px', fontWeight:'bold', fontSize:'1.2rem' }}>
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>

            <button 
              type="button" 
              className="btn-add-cart" 
              onClick={placeOrderHandler}
            >
              Place Order
            </button>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrderScreen;