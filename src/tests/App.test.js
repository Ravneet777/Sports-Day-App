import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

jest.mock('../mockData.json', () => [
  { id: 1, event_name: 'Event 1', event_category: 'Category 1', start_time: '2024-07-04T09:00:00', end_time: '2024-07-04T10:00:00' },
  { id: 2, event_name: 'Event 2', event_category: 'Category 2', start_time: '2024-07-04T10:00:00', end_time: '2024-07-04T11:00:00' },
  { id: 3, event_name: 'Event 3', event_category: 'Category 1', start_time: '2024-07-04T11:00:00', end_time: '2024-07-04T12:00:00' },
  { id: 4, event_name: 'Event 4', event_category: 'Category 2', start_time: '2024-07-04T12:00:00', end_time: '2024-07-04T13:00:00' },
  { id: 5, event_name: 'Event 5', event_category: 'Category 1', start_time: '2024-07-04T13:00:00', end_time: '2024-07-04T14:00:00' },
]);

beforeEach(() => {
  localStorage.clear();
});

test('loads and displays events', async () => {
  await act(async () => {
    render(<App />);
  });
  const eventCards = await screen.findAllByRole('button', { name: /select/i });
  expect(eventCards).toHaveLength(4); // Should display 4 events per page
});

test('saves selected events to local storage', async () => {
  await act(async () => {
    render(<App />);
  });
  const selectButtons = screen.getAllByRole('button', { name: /select/i });
  fireEvent.click(selectButtons[0]); // Select first event

  const selectedEvents = JSON.parse(localStorage.getItem('selectedEvents'));
  expect(selectedEvents).toHaveLength(1);
  expect(selectedEvents[0].event_name).toBe('Event 1');
});

// test('loads selected events from local storage and allows for deselection', async () => {
//     localStorage.setItem('selectedEvents', JSON.stringify([
//       { id: 1, event_name: 'Event 1', event_category: 'Category 1', start_time: '2024-07-04T09:00:00', end_time: '2024-07-04T10:00:00' }
//     ]));
  
//     render(<App />);
  
//     // Check that the "Remove" button for the loaded event is rendered
//     const removeButton = screen.getByText('Remove');
//     expect(removeButton).toBeInTheDocument();
  
//     // Check that clicking the "Remove" button calls the onDeselect function
//     fireEvent.click(removeButton);
//     expect(screen.queryByText('Event 1')).not.toBeInTheDocument();
//   });

test('handles pagination correctly', async () => {
  await act(async () => {
    render(<App />);
  });
  const page2Button = screen.getByText('2');
  fireEvent.click(page2Button);

  const eventCards = await screen.findAllByRole('button', { name: /select/i });
  expect(eventCards).toHaveLength(1); // Only 1 event should be on the second page
});

