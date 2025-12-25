import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link import
import axios from 'axios';
import '../App.css';

const ProfileScreen = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      
      // Fetch My Orders
      const fetchOrders = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          };
          const { data } = await axios.get('/api/orders/myorders', config);
          setOrders(data);
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchOrders();
    }
  }, [navigate]);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px' }}>
        
        {/* LEFT COLUMN: User Profile */}
        <div style={{ flex: '1' }}>
          <h2 style={{color: '#34495E'}}>User Profile</h2>
          {message && <div style={{color:'red'}}>{message}</div>}
          
          <div className="form-group" style={{marginBottom: '15px'}}>
            <label style={{fontWeight:'bold'}}>Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={name} 
              disabled // We will make this editable later
              style={{backgroundColor: '#eee'}}
            />
          </div>

          <div className="form-group">
            <label style={{fontWeight:'bold'}}>Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              disabled 
              style={{backgroundColor: '#eee'}}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: My Orders */}
        <div style={{ flex: '2' }}>
          <h2 style={{color: '#34495E'}}>My Orders</h2>
          {orders.length === 0 ? (
            <div style={{padding:'10px', backgroundColor:'#f8d7da', color:'#721c24', borderRadius:'5px'}}>
              No orders found
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop:'10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#34495E', color: 'white', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>ID</th>
                  <th style={{ padding: '10px' }}>DATE</th>
                  <th style={{ padding: '10px' }}>TOTAL</th>
                  <th style={{ padding: '10px' }}>PAID</th>
                  <th style={{ padding: '10px' }}>DELIVERED</th>
                  <th style={{ padding: '10px' }}></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px' }}>{order._id.substring(0, 10)}...</td>
                    <td style={{ padding: '10px' }}>{order.createdAt.substring(0, 10)}</td>
                    <td style={{ padding: '10px' }}>${order.totalPrice}</td>
                    <td style={{ padding: '10px', color: order.isPaid ? 'green' : 'red' }}>
                      {order.isPaid ? order.paidAt.substring(0, 10) : 'X'}
                    </td>
                    <td style={{ padding: '10px', color: order.isDelivered ? 'green' : 'red' }}>
                      {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'X'}
                    </td>
                    <td style={{ padding: '10px' }}>
                      <Link to={`/order/${order._id}`}>
                        <button className="btn-add-cart" style={{padding:'5px 10px', fontSize:'0.8rem'}}>
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfileScreen;