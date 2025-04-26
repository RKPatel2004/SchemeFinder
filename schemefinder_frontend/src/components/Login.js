import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { username, password } = formData;

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { token } = response.data;

      localStorage.setItem('token', token);
     
      if (username === 'admin' && password === 'admin123') {
          navigate('/AdminHomePage');
          return;
        }
  
      navigate('/home'); 
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      
      <p>Don't have an account? <Link to="/register">SignUp</Link></p>
    </div>
  );
};

export default Login;
