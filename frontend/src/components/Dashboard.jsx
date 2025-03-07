// Dashboard.jsx - Main dashboard after login
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import WeatherSearch from './Weather/WeatherSearch';
import WeatherCard from './Weather/WeatherCard';
import SavedLocations from './Weather/SavedLocations';
import { getSavedLocations } from '../services/locationService';

const Dashboard = () => {
  const { user } = useAuth();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const locations = await getSavedLocations();
        setSavedLocations(locations);
      } catch (error) {
        console.error('Error fetching saved locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedLocations();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.username}!</h1>
      <div className="dashboard-content">
        <div className="weather-section">
          <WeatherSearch setCurrentWeather={setCurrentWeather} />
          {currentWeather && (
            <WeatherCard 
              weather={currentWeather} 
              savedLocations={savedLocations}
              setSavedLocations={setSavedLocations}
            />
          )}
        </div>
        <div className="locations-section">
          <SavedLocations 
            locations={savedLocations} 
            setCurrentWeather={setCurrentWeather}
            setSavedLocations={setSavedLocations}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
