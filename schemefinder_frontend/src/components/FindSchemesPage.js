import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import digitalindia from '../assets/digitalindia.png';
import './FindSchemesPage.css';

const FindSchemesPage = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/login'); 
  };

  const [formData, setFormData] = useState({
    age: '',
    gender: '-----select-----',
    profession: '-----select-----',
    category: '-----select-----',
    economicClass: '-----select-----',
    speciallyAbled: '-----select-----',
    married: '-----select-----',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClearForm = () => {
    setFormData({
      age: '',
      gender: '-----select-----',
      profession: '-----select-----',
      category: '-----select-----',
      economicClass: '-----select-----',
      speciallyAbled: '-----select-----',
      married: '-----select-----',
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.age) errors.age = 'Age is required';
    if (formData.gender === '-----select-----') errors.gender = 'Gender is required';
    if (formData.profession === '-----select-----') errors.profession = 'Profession is required';
    if (formData.category === '-----select-----') errors.category = 'Category is required';
    if (formData.economicClass === '-----select-----') errors.economicClass = 'Economic class is required';
    if (formData.speciallyAbled === '-----select-----') errors.speciallyAbled = 'Specially abled status is required';
    if (formData.married === '-----select-----') errors.married = 'Marital status is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFindSchemesClick = async () => {

    if (!validateForm()) {
      console.error('Form validation failed');
      return; 
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }      
      const response = await fetch('http://localhost:5000/api/schemes/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Network response was not ok'}`);
      }      
      const schemes = await response.json();
      console.log('Schemes received:', schemes);
      
      localStorage.setItem('suggestedSchemes', JSON.stringify(schemes));
      
      navigate('/suggest', { state: { schemes } });
    } catch (error) {
      console.error('Error fetching schemes:', error);
    }
  };
  

  return (
    <div className="find-schemes-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/home" className="logo">SchemeFinder</a>
          <div className="search-icon">&#128269;</div>
          <img src={digitalindia} alt="Digital India" className="custom-icon" />
          <div className="digital-india-logo">Digital India</div>
        </div>
        <div className="navbar-right">
          <button
            className="elevated-btn logout-btn"
            onClick={handleLogout} 
          >
            Logout
          </button>
          
        </div>
      </nav>

      {/* Main Content */}
      <div className="form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Help Us in Finding Schemes For You...</h2>
          <div className="form-group">
            <label>What is your age?</label>
            <input
              type="number"
              name="age"
              min="0"
              max="100"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
            {formErrors.age && <p className="error-message">{formErrors.age}</p>}
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="-----select-----">-----select-----</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            {formErrors.gender && <p className="error-message">{formErrors.gender}</p>}
          </div>

          <div className="form-group">
            <label>What is your profession?</label>
            <select
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              required
            >
              <option value="-----select-----">-----select-----</option>
              <option value="farmer">farmer</option>
              <option value="Unemployed/Unskilled workers">Unemployed/Unskilled workers</option>
              <option value="housewife">housewife</option>
              <option value="student">student</option>
              <option value="entrepreneur">entrepreneur</option>
              <option value="soldier/policeman">soldier/policeman</option>
            </select>
            {formErrors.profession && <p className="error-message">{formErrors.profession}</p>}
          </div>

          <div className="form-group">
            <label>Select your category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="-----select-----">-----select-----</option>
              <option value="SC/ST">SC/ST</option>
              <option value="OBC">OBC</option>
              <option value="General">General</option>
            </select>
            {formErrors.category && <p className="error-message">{formErrors.category}</p>}
          </div>

          <div className="form-group">
            <label>What is your economic class?</label>
            <select
              name="economicClass"
              value={formData.economicClass}
              onChange={handleInputChange}
              required
            >
              <option value="-----select-----">-----select-----</option>
              <option value="BPL">BPL</option>
              <option value="APL">APL</option>
            </select>
            {formErrors.economicClass && <p className="error-message">{formErrors.economicClass}</p>}
          </div>

          <div className="form-group">
            <label>Are you specially abled?</label>
            <select
              name="speciallyAbled"
              value={formData.speciallyAbled}
              onChange={handleInputChange}
              required
            >
              <option value="-----select-----">-----select-----</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
            {formErrors.speciallyAbled && <p className="error-message">{formErrors.speciallyAbled}</p>}
          </div>

          <div className="form-group">
            <label>Are you married?</label>
            <select
              name="married"
              value={formData.married}
              onChange={handleInputChange}
              required
            >
              <option value="-----select-----">-----select-----</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
            {formErrors.married && <p className="error-message">{formErrors.married}</p>}
          </div>

          <div className="form-buttons">
            <button type="button" className="find-schemes-btn" onClick={handleFindSchemesClick}>Find Schemes</button>
            <button type="button" className="clear-form-btn" onClick={handleClearForm}>Clear Form</button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 SchemeFinder</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <div className="footer-links">
          <a href="/contact">Contact Us</a>
          <a href="/about">About Us</a>
        </div>
      </footer>
    </div>
  );
};

export default FindSchemesPage;
