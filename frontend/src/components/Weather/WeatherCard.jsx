// WeatherCard.jsx - Display weather information
import React from 'react';
import { saveLocation, removeLocation } from '../../services/locationService';

const WeatherCard = ({ weather, savedLocations, setSavedLocations }) => {
  const isSaved = savedLocations.some(
    location => location.city_name.toLowerCase() === weather.name.toLowerCase()
  );

  const handleSaveLocation = async () => {
    try {
      const newLocation = await saveLocation(weather.name);
      setSavedLocations([...savedLocations, newLocation]);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const handleRemoveLocation = async () => {
    try {
      const locationToRemove = savedLocations.find(
        location => location.city_name.toLowerCase() === weather.name.toLowerCase()
      );
      await removeLocation(locationToRemove.id);
      setSavedLocations(savedLocations.filter(loc => loc.id !== locationToRemove.id));
    } catch (error) {
      console.error('Error removing location:', error);
    }
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weather.name}, {weather.sys.country}</h2>
        {isSaved ? (
          <button onClick={handleRemoveLocation} className="btn-remove">
            Remove from Saved
          </button>
        ) : (
          <button onClick={handleSaveLocation} className="btn-save">
            Save Location
          </button>
        )}
      </div>
      <div className="weather-body">
        <div className="weather-main">
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
          />
          <div className="temperature">
            <h3>{Math.round(weather.main.temp)}°C</h3>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
        <div className="weather-details">
          <div className="detail">
            <span>Feels like:</span>
            <span>{Math.round(weather.main.feels_like)}°C</span>
          </div>
          <div className="detail">
            <span>Humidity:</span>
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="detail">
            <span>Wind:</span>
            <span>{weather.wind.speed} m/s</span>
          </div>
          <div className="detail">
            <span>Pressure:</span>
            <span>{weather.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;