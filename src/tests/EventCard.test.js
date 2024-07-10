import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventCard from '../components/EventCard';
import '@testing-library/jest-dom';

const event = {
  id: 1,
  event_name: 'Event 1',
  event_category: 'Category 1',
  start_time: '2024-07-04T09:00:00',
  end_time: '2024-07-04T10:00:00'
};

test('renders event details correctly', () => {
  render(<EventCard event={event} onSelect={() => {}} isSelected={false} isDisabled={false} />);
  
  expect(screen.getByText('Event 1')).toBeInTheDocument();
  expect(screen.getByText('(Category 1)')).toBeInTheDocument();
  expect(screen.getByText('9:00 AM - 10:00 AM')).toBeInTheDocument();
});

test('calls onSelect when select button is clicked', () => {
  const handleSelect = jest.fn();
  render(<EventCard event={event} onSelect={handleSelect} isSelected={false} isDisabled={false} />);
  
  fireEvent.click(screen.getByRole('button', { name: /select/i }));
  expect(handleSelect).toHaveBeenCalledWith(event);
});

test('disables select button if event is already selected or disabled', () => {
  render(<EventCard event={event} onSelect={() => {}} isSelected={true} isDisabled={false} />);
  expect(screen.getByRole('button', { name: /selected/i })).toBeDisabled();
  
  render(<EventCard event={event} onSelect={() => {}} isSelected={false} isDisabled={true} />);
  const buttons = screen.getAllByRole('button', { name: /select/i });
  expect(buttons[1]).toBeDisabled(); // Ensure we check the correct button
});
