import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectedEvents from '../components/SelectedEvents';
import '@testing-library/jest-dom';

const selectedEvents = [
  {
    id: 1,
    event_name: 'Event 1',
    event_category: 'Category 1',
    start_time: '2024-07-04T09:00:00',
    end_time: '2024-07-04T10:00:00'
  },
  {
    id: 2,
    event_name: 'Event 2',
    event_category: 'Category 2',
    start_time: '2024-07-04T10:00:00',
    end_time: '2024-07-04T11:00:00'
  }
];

test('renders selected events correctly', () => {
  render(<SelectedEvents selectedEvents={selectedEvents} onDeselect={() => {}} />);
  
  expect(screen.getByText('Event 1')).toBeInTheDocument();
  expect(screen.getByText('Event 2')).toBeInTheDocument();
});

test('calls onDeselect when remove button is clicked', () => {
    const handleDeselect = jest.fn();
    render(<SelectedEvents selectedEvents={selectedEvents} onDeselect={handleDeselect} />);   
    const removeButtons = screen.getAllByText(/remove/i);
    fireEvent.click(removeButtons[0]);
    expect(handleDeselect).toHaveBeenCalledWith(selectedEvents[0]);
  });

test('displays message when no selected events', () => {
  render(<SelectedEvents selectedEvents={[]} onDeselect={() => {}} />);
  expect(screen.getByText('No selected events.')).toBeInTheDocument();
});
