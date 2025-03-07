const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const getWeatherByCity = async (city) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    // Save weather data to Supabase
    await saveWeatherDataToSupabase(data);

    return data;
  } catch (error) {
    throw error;
  }
};

// Save weather data to Supabase
const saveWeatherDataToSupabase = async (weatherData) => {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/weather_data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(weatherData),
    });

    if (!res.ok) {
      throw new Error("Failed to save data to Supabase");
    }
  } catch (error) {
    console.error(error);
  }
};

// Fetch saved weather data from Supabase
export const fetchWeatherData = async () => {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/weather_data`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch weather data from Supabase");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};
