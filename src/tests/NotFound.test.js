import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import NotFound from '../components/NotFound'; // Ensure you are importing correctly

test('renders 404 Not Found for non-existent route', () => {
  render(
    <MemoryRouter initialEntries={['/non-existent']}>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );

  // Check for the presence of the 404 message
  expect(screen.getByText('404 - Not Found')).toBeInTheDocument();
  expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
});
