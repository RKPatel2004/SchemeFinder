// HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon } from 'react-icons/fa';
import './HomePage.css';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.png';
import slide3 from '../assets/slide3.png';
import digitalindia from '../assets/digitalindia.png';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Logout handler
  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000); 
    return () => clearInterval(slideInterval);
  }, []);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const handleFindSchemesClick = () => {
    navigate('/find-schemes'); 
  };

  const getAllSchemes = async() => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('No token found');
        return;
      }      
      const response = await fetch('http://localhost:5000/api/schemes/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Network response was not ok'}`);
      }      
      const schemes = await response.json();
      
      localStorage.setItem('suggestedSchemes', JSON.stringify(schemes));
      
      navigate('/suggest', { state: { schemes } });
    } catch (error) {
      console.error('Error fetching schemes:', error);
    }
  };

  const getStudentSchemes = async() => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('No token found');
        return;
      }      
      const response = await fetch('http://localhost:5000/api/schemes/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Network response was not ok'}`);
      }      
      let schemes = await response.json();
      schemes = schemes.filter(scheme => scheme.eligibilityCriteria.profession === 'student' ||
        scheme.eligibilityCriteria.profession === 'any'
      );
      
      localStorage.setItem('suggestedSchemes', JSON.stringify(schemes));
      
      navigate('/suggest', { state: { schemes } });
    } catch (error) {
      console.error('Error fetching schemes:', error);
    }
  };

  const getFemaleSchemes = async() => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('No token found');
        return;
      }      
      const response = await fetch('http://localhost:5000/api/schemes/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Network response was not ok'}`);
      }      
      let schemes = await response.json();
      schemes = schemes.filter(scheme => scheme.eligibilityCriteria.gender === 'female' ||
        scheme.eligibilityCriteria.gender === 'any'
      );
      
      localStorage.setItem('suggestedSchemes', JSON.stringify(schemes));
      
      navigate('/suggest', { state: { schemes } });
    } catch (error) { 
      console.error('Error fetching schemes:', error);
    }
  };
  
  return (
    <div className="home-page">
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

      {/* Carousel */}
      <div className="carousel">
        <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          <div className="carousel-slide">
            <img src={slide1} alt="Slide 1" />
          </div>
          <div className="carousel-slide">
            <img src={slide2} alt="Slide 2" />
          </div>
          <div className="carousel-slide">
            <img src={slide3} alt="Slide 3" />
          </div>
        </div>
        <button className="prev-btn" onClick={() => setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides)}>&#8920;</button>
        <button className="next-btn" onClick={() => setCurrentSlide((currentSlide + 1) % totalSlides)}>&#8921;</button>
        <div className="carousel-dots">
          {[...Array(totalSlides)].map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <div className="find-schemes-wrapper">
        <div className="find-schemes-container">
          <button className="find-schemes-btn" onClick={handleFindSchemesClick}>
            Find Schemes For You &#128269;
          </button>
        </div>
      </div>

      {/* Elevated Buttons */}
      <div className="elevated-buttons-container">
        <button className="elevated-btn" onClick={getAllSchemes}>Total Schemes</button>
        <button className="elevated-btn" onClick={getStudentSchemes}>Student Schemes</button>
        <button className="elevated-btn" onClick={getFemaleSchemes}>Female related Schemes</button>
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

export default HomePage;
