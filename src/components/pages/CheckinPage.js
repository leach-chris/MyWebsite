import React, { useState, useEffect } from 'react';
import UserCheckin from '../Checkin';
import { Dimmer, Loader } from 'semantic-ui-react';
import '../../components/Checkin.css';

export default function CheckinPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkinData, setCheckinData] = useState(null);
  const [cityList, setCityList] = useState([]);

  const handleCheckIn = async () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Replace this URL with your actual API endpoint from Amplify
          const response = await fetch('https://t93hgqbl53.execute-api.us-east-2.amazonaws.com/dev/checkin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude }),
          });

          if (response.ok) {
            const data = await response.json();
            setCheckinData(data);
            setCityList(data.allCities);
          } else {
            const errorData = await response.json();
            setError(errorData.error || 'Failed to check in. Please try again.');
          }
        } catch (err) {
          console.error('Error checking in:', err);
          setError('An error occurred. Please try again.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Unable to retrieve your location. Please make sure location services are enabled.');
        setLoading(false);
      }
    );
  };

  return (
    <div className="checkin-page">
      <h1>User Check-In</h1>
      
      <div className="checkin-container">
        <button className="checkin-button" onClick={handleCheckIn} disabled={loading}>
          Check In Now
        </button>
        
        {loading && (
          <Dimmer active>
            <Loader>Getting your location...</Loader>
          </Dimmer>
        )}
        
        {error && <p className="error-message">{error}</p>}
        
        {checkinData && (
          <div className="current-checkin">
            <h2>Your current location:</h2>
            <p>City: {checkinData.city}</p>
            <p>Check-ins for this city: {checkinData.checkins}</p>
          </div>
        )}
        
        <div className="city-list">
          <h2>All Check-ins</h2>
          {cityList.length > 0 ? (
            <ul>
              {cityList.sort((a, b) => b.checkins - a.checkins).map((city, index) => (
                <li key={index}>
                  {city.city}: {city.checkins} check-in{city.checkins !== 1 ? 's' : ''}
                </li>
              ))}
            </ul>
          ) : (
            <p>No check-ins yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}