import React from 'react';
import './css/SelectedEvents.css';

const formatTime = (time) => {
  const date = new Date(time);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strMinutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + strMinutes + ' ' + ampm;
  return strTime;
}

const SelectedEvents = ({ selectedEvents, onDeselect }) => {
  return (
    <div className="selected-events">
      <h2>Selected Events</h2>
      {selectedEvents.length === 0 && <p className="error-message">No selected events.</p>}
      <div className="selected-event-cards">
        {selectedEvents.map(event => (
          <div key={event.id} className="selected-event-card">
            <div className="event-symbol" aria-hidden="true">
              <span>{event.event_category[0]}</span>
              <div className="separator"></div>
            </div>
            <div className="event-details">
              <h3 id={`event-name-${event.id}`}>{event.event_name}</h3>
              <p id={`event-category-${event.id}`}>({event.event_category})</p>
              <p id={`event-time-${event.id}`}>{formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
            </div>
            <button 
              onClick={() => onDeselect(event)}
              aria-labelledby={`event-name-${event.id} event-category-${event.id} event-time-${event.id}`}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedEvents;