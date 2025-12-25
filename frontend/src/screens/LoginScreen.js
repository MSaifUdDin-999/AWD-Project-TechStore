import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import hooks
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/'); // Send to home if already logged in
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      // 1. Send the email/pass to backend
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      // 2. Save the response (token & name) to Local Storage
      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false);
      
      // 3. Force the page to reload so the Header updates with the new name
      window.location.href = '/'; 

    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-inner">
        <h1>Sign In</h1>
        
        {/* Error Message */}
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>Invalid Email or Password</div>}
        {loading && <div style={{ marginBottom: '10px' }}>Loading...</div>}

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        <div style={{ marginTop: '15px' }}>
          New Customer? <Link to="/register" style={{ color: '#34495E', fontWeight: 'bold' }}>Register</Link>
        </div>
        
      </div>
    </div>
  );
};

export default LoginScreen;