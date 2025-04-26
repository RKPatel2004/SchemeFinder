import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AdminAddScheme.css';

const AdminAddScheme = () => {
  const [schemeData, setSchemeData] = useState({
    schemeName: '',
    description: '',
    eligibilityCriteria: {
      age: { min: '', max: '' },
      gender: 'any',
      profession: 'any',
      category: 'any',
      economicClass: 'any',
      isSpeciallyAbled: 'any',
      isMarried: 'any'
    },
    benefits: [''],
    applicationProcess: [''],
    requiredDocuments: ['']
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchemeData({ ...schemeData, [name]: value });
  };

  const handleAgeChange = (e) => {
    const { name, value } = e.target;
    setSchemeData({
      ...schemeData,
      eligibilityCriteria: {
        ...schemeData.eligibilityCriteria,
        age: {
          ...schemeData.eligibilityCriteria.age,
          [name]: value
        }
      }
    });
  };

  const handleEligibilityChange = (e) => {
    const { name, value } = e.target;
    setSchemeData({
      ...schemeData,
      eligibilityCriteria: {
        ...schemeData.eligibilityCriteria,
        [name]: value
      }
    });
  };

  const handleArrayChange = (e, field, index) => {
    const { value } = e.target;
    const updatedArray = [...schemeData[field]];
    updatedArray[index] = value;
    setSchemeData({ ...schemeData, [field]: updatedArray });
  };

  const handleAddField = (field) => {
    setSchemeData({ ...schemeData, [field]: [...schemeData[field], ''] });
  };

  const handleRemoveField = (field, index) => {
    const updatedArray = [...schemeData[field]];
    updatedArray.splice(index, 1);
    setSchemeData({ ...schemeData, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!schemeData.schemeName.trim() || !schemeData.description.trim()) {
      setError('Scheme Name and Description are required.');
      scrollToTop();
      return;
    }

    const minAge = Number(schemeData.eligibilityCriteria.age.min);
    const maxAge = Number(schemeData.eligibilityCriteria.age.max);
    if (minAge >= maxAge) {
      setError('Min Age must be less than Max Age.');
      scrollToTop();
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin/schemes/add', schemeData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      setSuccess('Scheme added successfully!');
      scrollToTop();

      setSchemeData({
        schemeName: '',
        description: '',
        eligibilityCriteria: {
          age: { min: '', max: '' },
          gender: 'any',
          profession: 'any',
          category: 'any',
          economicClass: 'any',
          isSpeciallyAbled: 'any',
          isMarried: 'any'
        },
        benefits: [''],
        applicationProcess: [''],
        requiredDocuments: ['']
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add scheme. Please try again.');
      scrollToTop();
      console.error(err);
    }
  };

  return (
    <div className="admin-add-scheme">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/AdminHomePage" className="logo">Admin Dashboard</Link>
        </div>
        <div className="navbar-right">
          <button className="elevated-btn logout-btn" onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="add-scheme-content">
        <h2>Add New Scheme</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          {/* Scheme Name */}
          <div className="form-group">
            <label>Scheme Name<span className="required">*</span></label>
            <input
              type="text"
              name="schemeName"
              value={schemeData.schemeName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description<span className="required">*</span></label>
            <textarea
              name="description"
              value={schemeData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Eligibility Criteria */}
          <fieldset className="eligibility-criteria">
            <legend>Eligibility Criteria</legend>

            {/* Age */}
            <div className="form-group">
              <label>Age Range<span className="required">*</span></label>
              <div className="age-range">
                <input
                  type="number"
                  name="min"
                  placeholder="Min Age"
                  value={schemeData.eligibilityCriteria.age.min}
                  onChange={handleAgeChange}
                  required
                />
                <span> - </span>
                <input
                  type="number"
                  name="max"
                  placeholder="Max Age"
                  value={schemeData.eligibilityCriteria.age.max}
                  onChange={handleAgeChange}
                  required
                />
              </div>
            </div>

            {/* Gender */}
            <div className="form-group">
              <label>Gender<span className="required">*</span></label>
              <select
                name="gender"
                value={schemeData.eligibilityCriteria.gender}
                onChange={handleEligibilityChange}
                required
              >
                <option value="any">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Profession */}
            <div className="form-group">
              <label>Profession<span className="required">*</span></label>
              <select
                name="profession"
                value={schemeData.eligibilityCriteria.profession}
                onChange={handleEligibilityChange}
                required
              >
                <option value="any">Any</option>
                <option value="student">Student</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="soldier/policeman">Soldier/Policeman</option>
                <option value="farmer">Farmer</option>
                <option value="Unemployed/Unskilled workers">Unemployed/Unskilled Workers</option>
                <option value="housewife">Housewife</option>
              </select>
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category<span className="required">*</span></label>
              <select
                name="category"
                value={schemeData.eligibilityCriteria.category}
                onChange={handleEligibilityChange}
                required
              >
                <option value="any">Any</option>
                <option value="SC/ST">SC/ST</option>
                <option value="OBC">OBC</option>
                <option value="General">General</option>
              </select>
            </div>

            {/* Economic Class */}
            <div className="form-group">
              <label>Economic Class<span className="required">*</span></label>
              <select
                name="economicClass"
                value={schemeData.eligibilityCriteria.economicClass}
                onChange={handleEligibilityChange}
                required
              >
                <option value="any">Any</option>
                <option value="BPL">BPL</option>
                <option value="BPL/APL">BPL/APL</option>
              </select>
            </div>

            {/* Specially Abled */}
            <div className="form-group">
              <label>Specially Abled<span className="required">*</span></label>
              <select
                name="isSpeciallyAbled"
                value={schemeData.eligibilityCriteria.isSpeciallyAbled}
                onChange={handleEligibilityChange}
                required
              >
                <option value="any">Any</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Is Married */}
            <div className="form-group">
              <label>Marital Status<span className="required">*</span></label>
              <select
                name="isMarried"
                value={schemeData.eligibilityCriteria.isMarried}
                onChange={handleEligibilityChange}
                required
              >
                <option value="any">Any</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </fieldset>

          {/* Benefits */}
          <fieldset className="benefits">
            <legend>Benefits</legend>
            {schemeData.benefits.map((benefit, index) => (
              <div className="form-group dynamic-field" key={index}>
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange(e, 'benefits', index)}
                  placeholder={`Benefit ${index + 1}`}
                  required
                />
                {schemeData.benefits.length > 1 && (
                  <button type="button" onClick={() => handleRemoveField('benefits', index)} className="remove-btn">-</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('benefits')} className="add-btn">Add Benefit</button>
          </fieldset>

          {/* Application Process */}
          <fieldset className="application-process">
            <legend>Application Process</legend>
            {schemeData.applicationProcess.map((process, index) => (
              <div className="form-group dynamic-field" key={index}>
                <input
                  type="text"
                  value={process}
                  onChange={(e) => handleArrayChange(e, 'applicationProcess', index)}
                  placeholder={`Step ${index + 1}`}
                  required
                />
                {schemeData.applicationProcess.length > 1 && (
                  <button type="button" onClick={() => handleRemoveField('applicationProcess', index)} className="remove-btn">-</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('applicationProcess')} className="add-btn">Add Step</button>
          </fieldset>

          {/* Required Documents */}
          <fieldset className="required-documents">
            <legend>Required Documents</legend>
            {schemeData.requiredDocuments.map((doc, index) => (
              <div className="form-group dynamic-field" key={index}>
                <input
                  type="text"
                  value={doc}
                  onChange={(e) => handleArrayChange(e, 'requiredDocuments', index)}
                  placeholder={`Document ${index + 1}`}
                  required
                />
                {schemeData.requiredDocuments.length > 1 && (
                  <button type="button" onClick={() => handleRemoveField('requiredDocuments', index)} className="remove-btn">-</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => handleAddField('requiredDocuments')} className="add-btn">Add Document</button>
          </fieldset>

          {/* Submit Button */}
          <div className="form-group">
            <button type="submit" className="submit-btn">Add Scheme</button>
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

export default AdminAddScheme;
