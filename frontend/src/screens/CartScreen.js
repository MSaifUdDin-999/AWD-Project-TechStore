import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 

const CartScreen = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // 1. Load Cart from Local Storage when page loads
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  // 2. Handle Quantity Change (Update Local Storage)
  const updateQtyHandler = (id, newQty) => {
    const updatedCart = cartItems.map((item) => 
      item.product === id ? { ...item, qty: Number(newQty) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // 3. Handle Remove Item
  const removeFromCartHandler = (id) => {
    const updatedCart = cartItems.filter((item) => item.product !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // 4. Handle Checkout
  const checkoutHandler = () => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      // If logged in, go to shipping (we will build this later)
      navigate('/shipping'); 
    } else {
      // If not, go to login, then redirect to shipping
      navigate('/login?redirect=shipping');
    }
  };

  // Calculate Subtotals
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#34495E' }}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          Your cart is empty <Link to="/" style={{ color: '#34495E', fontWeight: 'bold' }}>Go Back</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          
          {/* LEFT SIDE: Cart Items List */}
          <div style={{ flex: '2' }}>
            {cartItems.map((item) => (
              <div key={item.product} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '15px 0', 
                borderBottom: '1px solid #eee' 
              }}>
                
                {/* Image & Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 2 }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
                  <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                    {item.name}
                  </Link>
                </div>

                {/* Price */}
                <div style={{ flex: 1, fontWeight: 'bold', color: '#34495E' }}>${item.price}</div>

                {/* Qty Selector (Reusing simple select for list view is easier here) */}
                <div style={{ flex: 1 }}>
                  <select 
                    value={item.qty} 
                    onChange={(e) => updateQtyHandler(item.product, e.target.value)}
                    style={{ padding: '5px', borderRadius: '5px' }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delete Button */}
                <div style={{ flex: 0.5 }}>
                  <button 
                    onClick={() => removeFromCartHandler(item.product)}
                    style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: Subtotal Card */}
          <div style={{ flex: '1' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', background: '#fff' }}>
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 20px 0', color: '#34495E' }}>
                Subtotal ({totalItems}) items
              </h2>
              <h3 style={{ fontSize: '1.8rem', margin: '0 0 20px 0', fontWeight: 'bold' }}>
                ${totalPrice}
              </h3>
              <button 
                onClick={checkoutHandler}
                className="btn-add-cart" 
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartScreen;