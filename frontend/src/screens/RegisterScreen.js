import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // 1. Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // 2. Send data to backend
      const config = { headers: { 'Content-Type': 'application/json' } };
      
      const { data } = await axios.post(
        '/api/users', // This hits the register route
        { name, email, password },
        config
      );

      // 3. Log the user in immediately
      localStorage.setItem('userInfo', JSON.stringify(data));
      window.location.href = '/'; 

    } catch (error) {
      setError(error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-inner">
        <h1>Sign Up</h1>
        {message && <div style={{color: 'red', marginBottom:'10px'}}>{message}</div>}
        {error && <div style={{color: 'red', marginBottom:'10px'}}>{error}</div>}
        
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter Name"
              value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <input type="email" className="form-control" placeholder="Enter Email"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <input type="password" className="form-control" placeholder="Enter Password"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="form-group">
            <input type="password" className="form-control" placeholder="Confirm Password"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn-primary">Register</button>
        </form>

        <div style={{ marginTop: '15px' }}>
          Have an Account? <Link to="/login" style={{ color: '#34495E', fontWeight: 'bold' }}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;