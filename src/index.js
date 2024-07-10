import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 Not Found */}
        </Routes>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
