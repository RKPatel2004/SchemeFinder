import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMoon } from 'react-icons/fa';
import './Feedback.css';
import digitalindia from '../assets/digitalindia.png';

const Feedback = () => {
  const [schemeName, setSchemeName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const location = useLocation();
  const navigate = useNavigate();

  const { schemeId } = location.state || {}; 

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      if (!schemeId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/schemes/${schemeId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSchemeName(data.schemeName); // Autofill scheme name
        } else {
          setErrorMessage('Failed to fetch scheme details.');
          console.error('Failed to fetch scheme details:', response.statusText);
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching scheme details.');
        console.error('Error fetching scheme details:', error);
      }
    };

    fetchSchemeDetails();
  }, [schemeId]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 

    if (!feedbackText || !rating || !schemeId) {
      alert('Please fill all fields.');
      return;
    }

    const token = localStorage.getItem('token'); 
    if (!token) {
      setErrorMessage('You need to log in to submit feedback.');
      console.error("No token found, please login.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          schemeName,
          feedbackText,
          rating: parseFloat(rating), 
        }),
      });

      if (response.ok) {
        setSubmitted(true); 
        setFeedbackText(''); 
        setRating('');
      } else if (response.status === 403) {
        setErrorMessage('You are not authorized to submit feedback. Please log in.');
      } else {
        setErrorMessage('Failed to submit feedback. Please try again.');
        console.error('Failed to submit feedback:', response.statusText);
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting feedback.');
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="feedback-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/home" className="logo">SchemeFinder</a>
          <div className="search-icon">&#128269;</div>
          <img src={digitalindia} alt="Digital India Logo" className="custom-icon" />
          <div className="digital-india-logo">Digital India</div>
        </div>
        <div className="navbar-right">
          <button className="elevated-btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Feedback Form */}
      <div className="feedback-container">
        <h1>Feedback Form:</h1>
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="schemeName">Scheme Name:</label>
            <input
              type="text"
              id="schemeName"
              value={schemeName}
              readOnly
              className="read-only-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="feedbackText">Enter Your Feedback:</label>
            <textarea
              id="feedbackText"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Give Rating (Out of 5):</label>
            <input
              type="number"
              id="rating"
              step="0.1" 
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
        {submitted && <p className="success-message">Feedback Submitted Successfully!</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>} 
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

export default Feedback;
