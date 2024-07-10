import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import App from '../App';
import NotFound from '../components/NotFound';

// Mock the ReactDOM.createRoot method
describe('Index.js', () => {
    test('renders App component for root path', () => {
      render(
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      );
  
      // Expect the App component to be rendered for the root path
      expect(screen.getByText('All Events')).toBeInTheDocument(); // Replace with a unique text from your App component
    });
  
    test('renders NotFound component for unknown paths', () => {
      window.history.pushState({}, 'Test page', '/some-unknown-route');
  
      render(
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      );
  
      // Expect the NotFound component to be rendered for unknown paths
      expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
    });
  });