import React from 'react';
import './Checkin.css';

export default function UserCheckin({ city, count, allCities }) {
  return (
    <div className="checkin-display">
      <div className="current-checkin">
        <h2>Your current location:</h2>
        <p>City: {city}</p>
        <p>Check-ins for this city: {count}</p>
      </div>
      
      <div className="city-list">
        <h2>All Check-ins</h2>
        {allCities && allCities.length > 0 ? (
          <ul>
            {allCities.sort((a, b) => b.checkins - a.checkins).map((cityItem, index) => (
              <li key={index}>
                {cityItem.city}: {cityItem.checkins} check-in{cityItem.checkins !== 1 ? 's' : ''}
              </li>
            ))}
          </ul>
        ) : (
          <p>No check-ins yet.</p>
        )}
      </div>
    </div>
  );
}