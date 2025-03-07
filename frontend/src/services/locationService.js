// services/locationService.js
const API_URL = 'http://weather-app-production-bc2b.up.railway.app/api';

export const getSavedLocations = async () => {
  try {
    const response = await fetch(`${API_URL}/locations`, {
      credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch locations');
    return data;
  } catch (error) {
    throw error;
  }
};

export const saveLocation = async (cityName) => {
  try {
    const response = await fetch(`${API_URL}/locations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cityName }),
      credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to save location');
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeLocation = async (locationId) => {
  try {
    const response = await fetch(`${API_URL}/locations/${locationId}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to remove location');
    }
  } catch (error) {
    throw error;
  }
};
