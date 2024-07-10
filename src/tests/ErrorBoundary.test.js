import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../components/ErrorBoundary';

// A component that throws an error
const ProblemChild = () => {
  throw new Error('Problem!');
};

test('renders fallback UI when there is an error', () => {
  render(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );

  // Check for the presence of the fallback UI
  expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
});

test('renders children when there is no error', () => {
  render(
    <ErrorBoundary>
      <div>Child Component</div>
    </ErrorBoundary>
  );

  // Check for the presence of the child component
  expect(screen.getByText('Child Component')).toBeInTheDocument();
});
