import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Suggest.css';
import digitalindia from '../assets/digitalindia.png'; // Update path if needed

const Suggest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const schemes = location.state?.schemes || []; // Get suggested schemes from location state

  const handleLogout = () => {
    // Clear any user session data here (if needed)
    navigate('/login');
  };

  const handleKnowMore = (scheme) => {
    // Navigate to SchemeDetails page, passing selected scheme data
    navigate('/scheme-details', { state: { scheme } });
  };

  return (
    <div className="suggest-page">
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
      <h2>Suggested Schemes...</h2>
      <div className="scheme-cards-container">
        {schemes.length > 0 ? (
          schemes.map((scheme) => (
            <div className="scheme-card" key={scheme._id}>
              <h3 className="scheme-name">{scheme.schemeName}</h3>
              <p className="scheme-description">{scheme.description}</p>
              <button className="know-more-btn" onClick={() => handleKnowMore(scheme)}>Know More...</button>
            </div>
          ))
        ) : (
          <p>No schemes found matching your criteria.</p>
        )}
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

export default Suggest;
