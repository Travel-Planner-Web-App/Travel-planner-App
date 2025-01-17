const axios = require("axios");
require("dotenv").config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Keep the existing weatherActivities database
const weatherActivities = {
  clear: {
    indoor: ["Yoga", "Dancing", "Reading", "Board Games", "Cooking"],
    outdoor: [
      { name: "Cycling", intensity: "moderate" },
      { name: "Hiking", intensity: "moderate" },
      { name: "Running", intensity: "high" },
      { name: "Picnic", intensity: "low" },
      { name: "Photography", intensity: "low" },
    ],
  },
  rain: {
    indoor: ["Movie Marathon", "Baking", "Painting", "Playing Music", "Writing"],
    outdoor: [
      { name: "Walking with Umbrella", intensity: "low" },
      { name: "Photography", intensity: "low" },
      { name: "Fishing", intensity: "moderate" },
    ],
  },
  clouds: {
    indoor: ["Puzzle Games", "Karaoke", "Cooking", "Home Workouts"],
    outdoor: [
      { name: "Jogging", intensity: "moderate" },
      { name: "Cycling", intensity: "moderate" },
      { name: "Sightseeing", intensity: "low" },
      { name: "Skateboarding", intensity: "high" },
    ],
  },
  snow: {
    indoor: ["Hot Chocolate & Books", "Board Games", "Knitting", "Movie Night"],
    outdoor: [
      { name: "Skiing", intensity: "high" },
      { name: "Snowball Fight", intensity: "moderate" },
      { name: "Building a Snowman", intensity: "low" },
      { name: "Ice Skating", intensity: "moderate" },
    ],
  },
  storm: {
    indoor: ["Reading", "Board Games", "Learning a New Skill", "Cooking"],
    outdoor: [],
  },
  fog: {
    indoor: ["Watching Movies", "Meditation", "Organizing Home"],
    outdoor: [
      { name: "Photography", intensity: "low" },
      { name: "Nature Walk", intensity: "low" },
    ],
  },
};

module.exports = weatherActivities;


// Helper function to map weather conditions
const mapWeatherCondition = (condition) => {
  condition = condition.toLowerCase();
  if (condition.includes("clear") || condition.includes("sun")) return "clear";
  if (condition.includes("rain") || condition.includes("drizzle")) return "rain";
  if (condition.includes("cloud")) return "clouds";
  return "clear"; // Default to clear if no match
};

const getWeather = async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: "Location is required." });
  }

  try {
    // Step 1: Get latitude & longitude from Geocoding API
    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct`;
    const geoResponse = await axios.get(geoApiUrl, {
      params: {
        q: location,
        limit: 1,
        appid: WEATHER_API_KEY,
      },
    });

    if (!geoResponse.data.length) {
      return res.status(404).json({ error: "Location not found." });
    }

    const { lat, lon, name } = geoResponse.data[0];

    // Step 2: Get current weather data
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather`;
    const currentWeatherResponse = await axios.get(currentWeatherUrl, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: "metric",
      },
    });

    const currentWeather = {
      temperature: currentWeatherResponse.data.main.temp,
      humidity: currentWeatherResponse.data.main.humidity,
      windSpeed: currentWeatherResponse.data.wind.speed,
      condition: currentWeatherResponse.data.weather[0].description,
    };

    // Step 3: Get 5-day weather forecast (grouped in 3-hour intervals)
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast`;
    const forecastResponse = await axios.get(forecastApiUrl, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: "metric",
      },
    });

    // Process 5-day forecast into daily summaries
    const dailyForecasts = {};
    forecastResponse.data.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toISOString().split("T")[0];

      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          temperatures: [],
          humidity: [],
          windSpeeds: [],
          weatherConditions: [],
          rainProbability: [],
          uvi: [],
        };
      }

      dailyForecasts[date].temperatures.push(entry.main.temp);
      dailyForecasts[date].humidity.push(entry.main.humidity);
      dailyForecasts[date].windSpeeds.push(entry.wind.speed);
      dailyForecasts[date].weatherConditions.push(entry.weather[0].description);
      dailyForecasts[date].rainProbability.push(entry.pop * 100);
      dailyForecasts[date].uvi.push(entry.main.uvi || 0); // UVI data is not always available
    });

    // Convert daily forecasts into a structured array
    const processedForecasts = Object.keys(dailyForecasts).slice(0, 7).map((date) => {
      const dayData = dailyForecasts[date];

      const maxTemp = Math.max(...dayData.temperatures);
      const minTemp = Math.min(...dayData.temperatures);
      const avgHumidity = Math.round(dayData.humidity.reduce((a, b) => a + b, 0) / dayData.humidity.length);
      const avgWindSpeed = Math.round(dayData.windSpeeds.reduce((a, b) => a + b, 0) / dayData.windSpeeds.length);
      const mostCommonCondition = dayData.weatherConditions.sort((a, b) =>
        dayData.weatherConditions.filter(v => v === a).length - dayData.weatherConditions.filter(v => v === b).length
      ).pop();

      const weatherType = mapWeatherCondition(mostCommonCondition);
      let activities = JSON.parse(JSON.stringify(weatherActivities[weatherType])) || { indoor: [], outdoor: [] };

      // Apply temperature-based filters
      if (maxTemp > 30) {
        activities.outdoor = activities.outdoor.filter((activity) => activity.intensity !== "high");
      } else if (maxTemp < 5) {
        activities.outdoor = activities.outdoor.filter((activity) => activity.intensity === "high");
      }

      // Apply wind-based filters
      if (avgWindSpeed > 20) {
        activities.outdoor = activities.outdoor.filter(
          (activity) => !["Cycling", "Photography"].includes(activity.name)
        );
      }

      return {
        date,
        weather: {
          temperature: { max: maxTemp, min: minTemp },
          humidity: avgHumidity,
          windSpeed: avgWindSpeed,
          condition: mostCommonCondition,
          rainProbability: Math.round(dayData.rainProbability.reduce((a, b) => a + b, 0) / dayData.rainProbability.length),
          uvi: Math.round(dayData.uvi.reduce((a, b) => a + b, 0) / dayData.uvi.length),
        },
        activities: {
          weatherType,
          suggestions: activities,
        },
      };
    });

    // Step 4: Return structured weather data
    res.status(200).json({
      location: {
        name,
        coordinates: { latitude: lat, longitude: lon },
      },
      current: currentWeather,
      dailyForecasts: processedForecasts,
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    if (error.response?.status === 404) {
      return res.status(404).json({ error: "Location not found." });
    }
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
};

module.exports = { getWeather };
