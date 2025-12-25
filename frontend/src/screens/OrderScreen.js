import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const OrderScreen = () => {
  const { id } = useParams(); // Get Order ID from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        const { data } = await axios.get(`/api/orders/${id}`, config);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <h2 style={{textAlign:'center', marginTop:'50px'}}>Loading Order...</h2>;
  if (!order) return <h2 style={{textAlign:'center', marginTop:'50px', color:'red'}}>Order Not Found</h2>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px', color: '#34495E' }}>Order {order._id}</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ flex: '2' }}>
          
          {/* Shipping Info */}
          <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <h2 style={{ color: '#34495E', fontSize: '1.5rem' }}>Shipping</h2>
            <p><strong>Name: </strong> {order.user.name}</p>
            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            
            {/* Delivered Status Box */}
            <div style={{ 
              marginTop: '10px', 
              padding: '10px', 
              backgroundColor: order.isDelivered ? '#d4edda' : '#f8d7da', 
              color: order.isDelivered ? '#155724' : '#721c24',
              borderRadius: '5px'
            }}>
              {order.isDelivered ? `Delivered at ${order.deliveredAt}` : 'Not Delivered'}
            </div>
          </div>

          {/* Payment Info */}
          <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <h2 style={{ color: '#34495E', fontSize: '1.5rem' }}>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>

            {/* Paid Status Box */}
            <div style={{ 
              marginTop: '10px', 
              padding: '10px', 
              backgroundColor: order.isPaid ? '#d4edda' : '#f8d7da', 
              color: order.isPaid ? '#155724' : '#721c24',
              borderRadius: '5px'
            }}>
              {order.isPaid ? `Paid on ${order.paidAt}` : 'Not Paid'}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h2 style={{ color: '#34495E', fontSize: '1.5rem' }}>Order Items</h2>
            {order.orderItems.map((item, index) => (
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
        </div>

        {/* RIGHT COLUMN: Summary */}
        <div style={{ flex: '1' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', background: '#fff' }}>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 20px 0', color: '#34495E', textAlign:'center', borderBottom:'1px solid #eee', paddingBottom:'10px' }}>
              Order Summary
            </h2>
            
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
              <span>Items</span>
              <span>${order.itemsPrice}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'10px' }}>
              <span>Tax</span>
              <span>${order.taxPrice}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px', borderTop:'1px solid #eee', paddingTop:'10px', fontWeight:'bold', fontSize:'1.2rem' }}>
              <span>Total</span>
              <span>${order.totalPrice}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderScreen;