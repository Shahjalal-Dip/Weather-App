// services/weatherService.js
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY; 
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByCity = async (city) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};