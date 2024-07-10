import React from 'react';
import { Link } from 'react-router-dom';
import './css/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Not Found</h1>
      <p className="not-found-message">The page you are looking for does not exist.</p>
      <Link to="/" className="not-found-home-button">Go Back to Home</Link>
    </div>
  );
};

export default NotFound;
