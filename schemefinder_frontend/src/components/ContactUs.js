import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ContactUs.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import digitalindia from '../assets/digitalindia.png';

const ContactUs = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/login'); 
  };

  return (
    <div className="contact-us-page">
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
      <main>
        <h1 className="page-title">Contact Us...</h1>
        <div className="email-links">
          <a href="mailto:rudra0405@gmail.com" className="email-link">
            <i className="fas fa-envelope"></i> rudra0405@gmail.com
          </a>
          <a href="mailto:tirth546patel@gmail.com" className="email-link">
            <i className="fas fa-envelope"></i> tirth546patel@gmail.com
          </a>
        </div>
        <div className="map-container">
          <iframe 
             src="https://www.google.com/maps/embed/v1/place?key=AIzaSyATL2mQ30lMA5QyNavrpEEyb1ubMtSeMBQ&q=Dharmsinh+Desai+University,+Nadiad"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </main>

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

export default ContactUs;
