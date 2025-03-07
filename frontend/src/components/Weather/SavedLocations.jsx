// SavedLocations.jsx - Display and manage saved locations
import React from 'react';
import { getWeatherByCity } from '../../services/weatherService';
import { removeLocation } from '../../services/locationService';

const SavedLocations = ({ locations, setCurrentWeather, setSavedLocations, loading }) => {
  const handleLocationClick = async (cityName) => {
    try {
      const weatherData = await getWeatherByCity(cityName);
      setCurrentWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleDeleteLocation = async (id, e) => {
    e.stopPropagation();
    try {
      await removeLocation(id);
      setSavedLocations(locations.filter(loc => loc.id !== id));
    } catch (error) {
      console.error('Error removing location:', error);
    }
  };

  if (loading) {
    return <div className="saved-locations"><p>Loading saved locations...</p></div>;
  }

  return (
    <div className="saved-locations">
      <h2>Saved Locations</h2>
      {locations.length === 0 ? (
        <p>No saved locations yet. Search for a city and save it!</p>
      ) : (
        <ul className="locations-list">
          {locations.map((location) => (
            <li 
              key={location.id} 
              className="location-item"
              onClick={() => handleLocationClick(location.city_name)}
            >
              <span>{location.city_name}</span>
              <button 
                className="delete-btn"
                onClick={(e) => handleDeleteLocation(location.id, e)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedLocations;