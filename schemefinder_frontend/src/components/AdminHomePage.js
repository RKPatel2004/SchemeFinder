import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './AdminHomePage.css';
import AdminEditScheme from './AdminEditScheme';

const AdminHomePage = () => {
  const [schemes, setSchemes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchSchemes();
    fetchFeedbacks();
    fetchUsers();
  }, []);

  // Fetch Schemes
  const fetchSchemes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/schemes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSchemes(response.data);
    } catch (err) {
      setError('Failed to fetch schemes.');
      console.error(err);
    }
  };

  // Fetch Feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/feedback', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setFeedbacks(response.data);
    } catch (err) {
      setError('Failed to fetch feedbacks.');
      console.error(err);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users.');
      console.error(err);
    }
  };

  // Handle Delete Scheme
  const handleDeleteScheme = async (schemeName) => {
    if (!window.confirm(`Are you sure you want to delete the scheme "${schemeName}"?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/schemes/${schemeName}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSchemes(schemes.filter(scheme => scheme.schemeName !== schemeName));
    } catch (err) {
      setError('Failed to delete scheme.');
      console.error(err);
    }
  };

  const handleEditScheme = async (scheme) => {
    try {
      navigate('/adminEditScheme', { state: { scheme } });
    } catch (err) {
      setError('Failed to fetch scheme details for editing.');
      console.error(err);
    }
  };

  // Handle Delete Feedback
  const handleDeleteFeedback = async (username) => {
    if (!window.confirm(`Are you sure you want to delete all feedback from user "${username}"?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/feedback/${username}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setFeedbacks(feedbacks.filter(fb => fb.username !== username));
    } catch (err) {
      setError('Failed to delete feedback.');
      console.error(err);
    }
  };

  const handleDeleteUser = async (username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${username}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(users.filter(user => user.username !== username));
    } catch (err) {
      setError('Failed to delete user.');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="admin-homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/AdminHomePage" className="logo">Admin Dashboard</Link>
        </div>
        <div className="navbar-right">
          <button className="elevated-btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="admin-content">
        <div className="add-schemes-wrapper">
          <div className="add-scheme-button">
            <button onClick={() => navigate('/adminAddScheme')} className="elevated-btn add-btn">Add Scheme</button>
          </div>
        </div>

        {/* Schemes Section */}
        <div className="section">
          <h2>Schemes</h2>
          <table>
            <thead>
              <tr>
                <th>Scheme Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map((scheme, index) => (
                <tr key={index}>
                  <td>{scheme.schemeName}</td>
                  <td>
                    <button onClick={() => handleEditScheme(scheme)} className="action-btn edit-btn">Edit</button>
                    <button onClick={() => handleDeleteScheme(scheme.schemeName)} className="action-btn delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feedbacks Section */}
        <div className="section">
          <h2>Feedbacks</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Scheme Name</th>
                <th>Feedback</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (
                <tr key={index}>
                  <td>{feedback.username}</td>
                  <td>{feedback.schemeName}</td>
                  <td>{feedback.feedbackText}</td>
                  <td>{feedback.rating}</td>
                  <td>
                    <button onClick={() => handleDeleteFeedback(feedback.username)} className="action-btn delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Users Section */}
        <div className="section">
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.username)} className="action-btn delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      </footer>
    </div>
  );
};

export default AdminHomePage;
