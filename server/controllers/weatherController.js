const axios = require("axios");

// Load environment variables
require("dotenv").config();

// Extract API key from environment variables
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Function to fetch weather data
const getWeather = async (req, res) => {
  const { location } = req.query;

  // Validate query parameter
  if (!location) {
    return res.status(400).json({ error: "Location is required." });
  }

  try {
    // API endpoint for fetching weather data
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather`;

    // Make a request to the weather API
    const response = await axios.get(weatherApiUrl, {
      params: {
        q: location,
        appid: WEATHER_API_KEY,
        units: "metric", // Use metric units (Celsius)
      },
    });

    // Extract and structure the necessary data
    const { name, main, wind, weather } = response.data;

    res.status(200).json({
      location: name,
      temperature: main.temp,
      humidity: main.humidity,
      windSpeed: wind.speed,
      condition: weather[0].description,
    });
  } catch (error) {
    // Handle errors from the API or request
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "Location not found." });
    }
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
};

module.exports = { getWeather };
