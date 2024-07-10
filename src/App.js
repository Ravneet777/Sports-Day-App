import React, { useState, useEffect, Suspense, lazy } from 'react';
import './css/App.css';
import mockData from './mockData.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventCard = lazy(() => import('./components/EventCard'));
const SelectedEvents = lazy(() => import('./components/SelectedEvents'));

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(() => {
    const savedSelectedEvents = localStorage.getItem('selectedEvents');
    return savedSelectedEvents ? JSON.parse(savedSelectedEvents) : [];
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const savedCurrentPage = localStorage.getItem('currentPage');
    return savedCurrentPage ? JSON.parse(savedCurrentPage) : 1;
  });
  const [error, setError] = useState(null);
  const eventsPerPage = 4;

  useEffect(() => {
    // Load the mock data with error handling
    try {
      setEvents(mockData);
    } catch (error) {
      setError("Failed to load events. Please try again later.");
    }
  }, []);

  useEffect(() => {
    // Save selected events and current page to localStorage
    localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
    localStorage.setItem('currentPage', JSON.stringify(currentPage));
  }, [selectedEvents, currentPage]);

  const handleSelectEvent = (event) => {
    if (selectedEvents.length >= 3) {
      toast.error('You can select a maximum of 3 events.');
      return;
    }

    try {
      const hasConflict = selectedEvents.some(selectedEvent => 
        (new Date(selectedEvent.start_time) < new Date(event.end_time) &&
        new Date(event.start_time) < new Date(selectedEvent.end_time))
      );

      if (!hasConflict) {
        setSelectedEvents([...selectedEvents, event]);
      } else {
        toast.error('There is a time conflict with an already selected event.');
      }
    } catch (error) {
      toast.error("Failed to select the event. Please try again.");
    }
  };

  const handleDeselectEvent = (event) => {
    try {
      setSelectedEvents(selectedEvents.filter(e => e.id !== event.id));
    } catch (error) {
      toast.error("Failed to deselect the event. Please try again.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const isEventConflicting = (event) => {
    return selectedEvents.some(selectedEvent => 
      (new Date(selectedEvent.start_time) < new Date(event.end_time) &&
      new Date(event.start_time) < new Date(selectedEvent.end_time))
    );
  };

  // Get current events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <div className="app">
      <div className="events-section">
        <div className="events-list">
          <h2>All Events</h2>
          {error && <p className="error-message">{error}</p>}
          {!error && currentEvents.length === 0 && <p className="error-message">No events available.</p>}
          <Suspense fallback={<div>Loading events...</div>}>
            <div className="event-cards">
              {currentEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onSelect={handleSelectEvent} 
                  isSelected={selectedEvents.includes(event)}
                  isDisabled={isEventConflicting(event) && !selectedEvents.includes(event)}
                />
              ))}
            </div>
          </Suspense>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="demarcation-line"></div>
        <Suspense fallback={<div>Loading selected events...</div>}>
          <SelectedEvents selectedEvents={selectedEvents} onDeselect={handleDeselectEvent} />
        </Suspense>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
