const axios = require("axios");

// Load environment variables
require("dotenv").config();

// Extract API key from environment variables
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// // Weather activities database
const weatherActivities = {
  clear: {
    outdoor: [
      {
        name: "Beach Visit",
        description: "Perfect weather for swimming and sunbathing",
        intensity: "moderate",
        locations: [
          { name: "Bondi Beach", lat: -33.8915, lon: 151.2767 },
          { name: "Manly Beach", lat: -33.7969, lon: 151.2887 },
          { name: "Coogee Beach", lat: -33.9198, lon: 151.2589 },
        ],
      },
      {
        name: "Hiking",
        description: "Excellent conditions for trail exploration",
        intensity: "high",
        locations: [
          { name: "Blue Mountains", lat: -33.7197, lon: 150.3125 },
          { name: "Royal National Park", lat: -34.1202, lon: 151.0664 },
          { name: "Ku-ring-gai Chase", lat: -33.651, lon: 151.2277 },
        ],
      },
      {
        name: "Picnic",
        description: "Great opportunity for outdoor dining",
        intensity: "low",
        locations: [
          { name: "Centennial Park", lat: -33.9022, lon: 151.2322 },
          { name: "Hyde Park", lat: -33.8731, lon: 151.2111 },
          { name: "Botanical Gardens", lat: -33.8642, lon: 151.2166 },
        ],
      },
    ],
    indoor: [
      {
        name: "Indoor Rock Climbing",
        description: "Stay active while beating the heat",
        intensity: "high",
        locations: [
          { name: "Sydney Indoor Climbing Gym", lat: -33.8688, lon: 151.2093 },
          { name: "Climb Fit", lat: -33.8734, lon: 151.2001 },
          { name: "9 Degrees", lat: -33.8919, lon: 151.2006 },
        ],
      },
      {
        name: "Museum Visit",
        description: "Cool cultural experience on a warm day",
        intensity: "low",
        locations: [
          { name: "Australian Museum", lat: -33.8746, lon: 151.2144 },
          { name: "Museum of Contemporary Art", lat: -33.8599, lon: 151.2089 },
          { name: "Powerhouse Museum", lat: -33.8778, lon: 151.199 },
        ],
      },
    ],
  },
  rain: {
    indoor: [
      {
        name: "Movie Marathon",
        description: "Perfect weather to catch up on films",
        intensity: "low",
        locations: [
          { name: "Event Cinemas", lat: -33.8717, lon: 151.2067 },
          { name: "Hoyts", lat: -33.8683, lon: 151.2086 },
          { name: "Palace Cinemas", lat: -33.8778, lon: 151.2167 },
        ],
      },
      {
        name: "Indoor Swimming",
        description: "Visit an indoor pool",
        intensity: "moderate",
        locations: [
          { name: "Ian Thorpe Aquatic Centre", lat: -33.8819, lon: 151.1947 },
          { name: "Cook and Phillip Pool", lat: -33.8739, lon: 151.2137 },
          {
            name: "Sydney Olympic Park Aquatic Centre",
            lat: -33.8474,
            lon: 151.0677,
          },
        ],
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
        locations: [
          { name: "Sydney Opera House", lat: -33.8568, lon: 151.2153 },
          { name: "Sydney Harbour Bridge", lat: -33.8523, lon: 151.2107 },
          { name: "Mrs Macquarie's Chair", lat: -33.8587, lon: 151.222 },
        ],
      },
      {
        name: "Running",
        description: "Ideal temperature for outdoor exercise",
        intensity: "high",
        locations: [
          { name: "Bay Run", lat: -33.8715, lon: 151.1473 },
          { name: "Bondi to Bronte", lat: -33.8938, lon: 151.2813 },
          { name: "Centennial Park", lat: -33.9022, lon: 151.2322 },
        ],
      },
    ],
    indoor: [
      {
        name: "Art Gallery",
        description: "Explore local exhibitions",
        intensity: "low",
        locations: [
          { name: "Art Gallery of NSW", lat: -33.8688, lon: 151.2173 },
          { name: "White Rabbit Gallery", lat: -33.8847, lon: 151.2017 },
          { name: "National Art School Gallery", lat: -33.8794, lon: 151.2157 },
        ],
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
        locations: location,
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


////////////////////////////


// const axios = require("axios");
// require("dotenv").config();

// // Extract API keys from environment variables
// const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// // Function to calculate distance between two points
// function calculateDistance(lat1, lon1, lat2, lon2) {
//   const R = 6371; // Earth's radius in kilometers
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in kilometers
// }

// // Weather activities database with locations
// const weatherActivities = {
//   clear: {
//     outdoor: [
//       {
//         name: "Beach Visit",
//         description: "Perfect weather for swimming and sunbathing",
//         intensity: "moderate",
//         locations: [
//           { name: "Bondi Beach", lat: -33.8915, lon: 151.2767 },
//           { name: "Manly Beach", lat: -33.7969, lon: 151.2887 },
//           { name: "Coogee Beach", lat: -33.9198, lon: 151.2589 },
//         ],
//       },
//       {
//         name: "Hiking",
//         description: "Excellent conditions for trail exploration",
//         intensity: "high",
//         locations: [
//           { name: "Blue Mountains", lat: -33.7197, lon: 150.3125 },
//           { name: "Royal National Park", lat: -34.1202, lon: 151.0664 },
//           { name: "Ku-ring-gai Chase", lat: -33.651, lon: 151.2277 },
//         ],
//       },
//       {
//         name: "Picnic",
//         description: "Great opportunity for outdoor dining",
//         intensity: "low",
//         locations: [
//           { name: "Centennial Park", lat: -33.9022, lon: 151.2322 },
//           { name: "Hyde Park", lat: -33.8731, lon: 151.2111 },
//           { name: "Botanical Gardens", lat: -33.8642, lon: 151.2166 },
//         ],
//       },
//     ],
//     indoor: [
//       {
//         name: "Indoor Rock Climbing",
//         description: "Stay active while beating the heat",
//         intensity: "high",
//         locations: [
//           { name: "Sydney Indoor Climbing Gym", lat: -33.8688, lon: 151.2093 },
//           { name: "Climb Fit", lat: -33.8734, lon: 151.2001 },
//           { name: "9 Degrees", lat: -33.8919, lon: 151.2006 },
//         ],
//       },
//       {
//         name: "Museum Visit",
//         description: "Cool cultural experience on a warm day",
//         intensity: "low",
//         locations: [
//           { name: "Australian Museum", lat: -33.8746, lon: 151.2144 },
//           { name: "Museum of Contemporary Art", lat: -33.8599, lon: 151.2089 },
//           { name: "Powerhouse Museum", lat: -33.8778, lon: 151.199 },
//         ],
//       },
//     ],
//   },
//   rain: {
//     indoor: [
//       {
//         name: "Movie Marathon",
//         description: "Perfect weather to catch up on films",
//         intensity: "low",
//         locations: [
//           { name: "Event Cinemas", lat: -33.8717, lon: 151.2067 },
//           { name: "Hoyts", lat: -33.8683, lon: 151.2086 },
//           { name: "Palace Cinemas", lat: -33.8778, lon: 151.2167 },
//         ],
//       },
//       {
//         name: "Indoor Swimming",
//         description: "Visit an indoor pool",
//         intensity: "moderate",
//         locations: [
//           { name: "Ian Thorpe Aquatic Centre", lat: -33.8819, lon: 151.1947 },
//           { name: "Cook and Phillip Pool", lat: -33.8739, lon: 151.2137 },
//           {
//             name: "Sydney Olympic Park Aquatic Centre",
//             lat: -33.8474,
//             lon: 151.0677,
//           },
//         ],
//       },
//     ],
//     outdoor: [],
//   },
//   clouds: {
//     outdoor: [
//       {
//         name: "Photography",
//         description: "Perfect lighting for outdoor photos",
//         intensity: "low",
//         locations: [
//           { name: "Sydney Opera House", lat: -33.8568, lon: 151.2153 },
//           { name: "Sydney Harbour Bridge", lat: -33.8523, lon: 151.2107 },
//           { name: "Mrs Macquarie's Chair", lat: -33.8587, lon: 151.222 },
//         ],
//       },
//       {
//         name: "Running",
//         description: "Ideal temperature for outdoor exercise",
//         intensity: "high",
//         locations: [
//           { name: "Bay Run", lat: -33.8715, lon: 151.1473 },
//           { name: "Bondi to Bronte", lat: -33.8938, lon: 151.2813 },
//           { name: "Centennial Park", lat: -33.9022, lon: 151.2322 },
//         ],
//       },
//     ],
//     indoor: [
//       {
//         name: "Art Gallery",
//         description: "Explore local exhibitions",
//         intensity: "low",
//         locations: [
//           { name: "Art Gallery of NSW", lat: -33.8688, lon: 151.2173 },
//           { name: "White Rabbit Gallery", lat: -33.8847, lon: 151.2017 },
//           { name: "National Art School Gallery", lat: -33.8794, lon: 151.2157 },
//         ],
//       },
//     ],
//   },
// };

// const getWeather = async (req, res) => {
//   const { location } = req.query;

//   if (!location) {
//     return res.status(400).json({ error: "Location is required." });
//   }

//   try {
//     const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather`;
//     const response = await axios.get(weatherApiUrl, {
//       params: {
//         q: location,
//         appid: WEATHER_API_KEY,
//         units: "metric",
//       },
//     });

//     const { name, main, wind, weather, coord } = response.data;
//     const weatherType = mapWeatherCondition(weather[0].description);

//     // Filter activities based on weather and add distances
//     let activities = JSON.parse(
//       JSON.stringify(weatherActivities[weatherType])
//     ) || {
//       indoor: [],
//       outdoor: [],
//     };

//     // Filter and add distance to each location
//     for (const category in activities) {
//       activities[category] = activities[category]
//         .map((activity) => {
//           // Filter locations within 200km and add distance
//           activity.locations = activity.locations
//             .map((location) => ({
//               ...location,
//               distance: calculateDistance(
//                 coord.lat,
//                 coord.lon,
//                 location.lat,
//                 location.lon
//               ),
//             }))
//             .filter((location) => location.distance <= 200)
//             .sort((a, b) => a.distance - b.distance);
//           return activity;
//         })
//         .filter((activity) => activity.locations.length > 0); // Only keep activities with nearby locations
//     }

//     // Apply temperature and wind filters
//     if (main.temp > 30) {
//       activities.outdoor = activities.outdoor.filter(
//         (activity) => activity.intensity !== "high"
//       );
//     } else if (main.temp < 5) {
//       activities.outdoor = activities.outdoor.filter(
//         (activity) => activity.intensity === "high"
//       );
//     }

//     if (wind.speed > 20) {
//       activities.outdoor = activities.outdoor.filter(
//         (activity) => !["Cycling", "Photography"].includes(activity.name)
//       );
//     }

//     res.status(200).json({
//       weather: {
//         location: name,
//         coordinates: {
//           latitude: coord.lat,
//           longitude: coord.lon,
//         },
//         temperature: main.temp,
//         humidity: main.humidity,
//         windSpeed: wind.speed,
//         condition: weather[0].description,
//       },
//       activities: {
//         weatherType,
//         suggestions: activities,
//       },
//     });
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       return res.status(404).json({ error: "Location not found." });
//     }
//     res.status(500).json({ error: "Failed to fetch weather data." });
//   }
// };

// module.exports = { getWeather };
