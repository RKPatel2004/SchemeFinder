import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register'; 
import Login from './components/Login';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FindSchemesPage from './components/FindSchemesPage';
import Suggest from './components/Suggest';
import SchemeDetails from './components/SchemeDetails';
import Feedback from './components/Feedback';

import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminHomePage from './components/AdminHomePage';
import AdminAddScheme from './components/AdminAddScheme';
import AdminEditScheme from './components/AdminEditScheme';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/find-schemes" element={<FindSchemesPage />} />
          <Route path="/suggest" element={<Suggest />} />
          <Route path="/scheme-details" element={<SchemeDetails />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/schemes/:id" element={<SchemeDetails />} />
          <Route path="/AdminHomePage" element={<AdminHomePage />} />
          <Route path="/adminAddScheme" element={<AdminAddScheme />} />
          <Route path="/adminEditScheme" element={<AdminEditScheme />} />
          {/* Default route redirects to login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
