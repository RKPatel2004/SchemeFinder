import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './AboutUs.css'; 
import digitalindia from '../assets/digitalindia.png';

const AboutUs = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/login'); 
  };

  return (
    <div className="about-us-page">
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
        <h1 className="page-title">About Us...</h1>
        <div className="card">
          <h2>Our Vision</h2>
          <p>Our vision is to make citizens' lives easier.</p>
        </div>
        <div className="card">
          <h2>Our Mission</h2>
          <p>Our mission is to streamline the government – user interface for government schemes and benefits. Reduce time and effort required to find and avail a government scheme.</p>
        </div>
        <div className="card">
          <h2>SchemeFinder</h2>
          <p>SchemeFinder is a National Platform that aims to offer one-stop search and discovery of the Government schemes...</p>
        </div>
        <div className="card">
          <h2>Eligibility Check</h2>
          <p>You can check your eligibility for schemes using different criteria and personal attributes.</p>
        </div>
        <div className="card">
          <h2>Scheme Finder</h2>
          <p>Fast and easy searching with filter-based drill downs for various Government Schemes.</p>
        </div>
        <div className="card">
          <h2>Scheme in Detail</h2>
          <p>Deep dive into dedicated scheme pages for fine-grained scheme details before you apply.</p>
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

export default AboutUs;
