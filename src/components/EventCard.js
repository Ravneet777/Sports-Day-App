import React from 'react';
import './css/EventCard.css';


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
  
  const EventCard = ({ event, onSelect, isSelected, isDisabled }) => {
    return (
      <div className="event-card" aria-labelledby={`event-${event.id}`}>
        <div className="event-symbol">
          <span>{event.event_category[0]}</span>
          <div className="separator"></div>
        </div>
        <div className="event-details">
          <h3 id={`event-${event.id}`}>{event.event_name}</h3>
          <p>({event.event_category})</p>
          <p>{formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
        </div>
        <button 
          onClick={() => onSelect(event)} 
          disabled={isSelected || isDisabled} 
          aria-pressed={isSelected}
          aria-disabled={isSelected || isDisabled}
        >
          {isSelected ? 'Selected' : 'Select'}
        </button>
      </div>
    );
  };
  
  export default EventCard;