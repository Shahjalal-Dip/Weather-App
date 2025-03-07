// WeatherSearch.jsx - Search component for weather
import React, { useState } from 'react';
import { getWeatherByCity } from '../../services/weatherService';

const WeatherSearch = ({ setCurrentWeather }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const weatherData = await getWeatherByCity(city);
      setCurrentWeather(weatherData);
    } catch (error) {
      setError(error.message || 'Failed to fetch weather data');
      setCurrentWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-search">
      <h2>Search Weather</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default WeatherSearch;