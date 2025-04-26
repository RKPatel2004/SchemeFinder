import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SchemeDetails.css';
import digitalindia from '../assets/digitalindia.png';

const SchemeDetails = (props) => {
  console.log('SchemeDetails props:', props);
  const location = useLocation();
  const navigate = useNavigate();
  
  
  const handleLogout = () => {
    navigate('/login');
  };

  const scheme = location.state?.scheme || {};
  
  const benefits = Array.isArray(scheme.benefits) ? scheme.benefits : [];
  const applicationProcess = Array.isArray(scheme.applicationProcess) ? scheme.applicationProcess : [];

  const handleFeedback = () => {
    navigate('/feedback', { state: { schemeId: scheme._id } });
  };

  return (
    <div className="scheme-details-page">
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
      {/* main content */ }
      <div className="details-container">
        <h2>{scheme.schemeName}</h2>
        <p>{scheme.description}</p>
        
        <h3>Benefits</h3>
        <ul>
          {benefits.length > 0 ? (
            benefits.map((benefit, index) => <li key={index}>{benefit}</li>)
          ) : (
            <p>No benefits available</p>
          )}
        </ul>

        <h3>Application Process</h3>
        <ol>
          {applicationProcess.length > 0 ? (
            applicationProcess.map((step, index) => <li key={index}>{step}</li>)
          ) : (
            <p>No application process available</p>
          )}
        </ol>

        <h3>Required Documents</h3>
        <ul>
          {scheme.requiredDocuments && scheme.requiredDocuments.length > 0 ? (
            scheme.requiredDocuments.map((doc, index) => <li key={index}>{doc}</li>)
          ) : (
            <p>No documents available</p>
          )}
        </ul>
      </div>

      <div className="feedback-container">
        <button className="give-feedback-btn" onClick={handleFeedback}>
          Give Feedback
        </button>
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

export default SchemeDetails;
