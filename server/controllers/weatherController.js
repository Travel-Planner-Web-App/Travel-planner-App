const axios = require("axios");

// Load environment variables
require("dotenv").config();

// Extract API key from environment variables
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Weather activities database
const weatherActivities = {
  clear: {
    outdoor: [
      {
        name: "Beach Visit",
        description: "Perfect weather for swimming and sunbathing",
        intensity: "moderate",
      },
      {
        name: "Hiking",
        description: "Excellent conditions for trail exploration",
        intensity: "high",
      },
      {
        name: "Picnic",
        description: "Great opportunity for outdoor dining",
        intensity: "low",
      },
    ],
    indoor: [
      {
        name: "Indoor Rock Climbing",
        description: "Stay active while beating the heat",
        intensity: "high",
      },
      {
        name: "Museum Visit",
        description: "Cool cultural experience on a warm day",
        intensity: "low",
      },
    ],
  },
  rain: {
    indoor: [
      {
        name: "Movie Marathon",
        description: "Perfect weather to catch up on films",
        intensity: "low",
      },
      {
        name: "Indoor Swimming",
        description: "Visit an indoor pool",
        intensity: "moderate",
      },
    ],
    outdoor: [],
  },
  clouds: {
    outdoor: [
      {
        name: "Photography",
        description: "Perfect lighting for outdoor photos",
        intensity: "low",
      },
      {
        name: "Running",
        description: "Ideal temperature for outdoor exercise",
        intensity: "high",
      },
    ],
    indoor: [
      {
        name: "Art Gallery",
        description: "Explore local exhibitions",
        intensity: "low",
      },
    ],
  },
};

// Helper function to map weather conditions
const mapWeatherCondition = (condition) => {
  condition = condition.toLowerCase();
  if (condition.includes("clear") || condition.includes("sun")) return "clear";
  if (condition.includes("rain") || condition.includes("drizzle"))
    return "rain";
  if (condition.includes("cloud")) return "clouds";
  return "clear"; // default to clear if no match
};

// Enhanced weather function with activity suggestions
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

    // Map the weather condition to our activity categories
    const weatherType = mapWeatherCondition(weather[0].description);

    // Get relevant activities
    const activities = weatherActivities[weatherType] || {
      indoor: [],
      outdoor: [],
    };

    // Apply temperature-based filters
    if (main.temp > 30) {
      activities.outdoor = activities.outdoor.filter(
        (activity) => activity.intensity !== "high"
      );
    } else if (main.temp < 5) {
      activities.outdoor = activities.outdoor.filter(
        (activity) => activity.intensity === "high"
      );
    }

    // Apply wind-based filters
    if (wind.speed > 20) {
      activities.outdoor = activities.outdoor.filter(
        (activity) => !["Cycling", "Photography"].includes(activity.name)
      );
    }

    // Return combined weather and activity data
    res.status(200).json({
      weather: {
        location: name,
        temperature: main.temp,
        humidity: main.humidity,
        windSpeed: wind.speed,
        condition: weather[0].description,
      },
      activities: {
        weatherType,
        suggestions: activities,
      },
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
