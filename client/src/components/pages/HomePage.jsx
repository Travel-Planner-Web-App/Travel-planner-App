// import React, { useState, useEffect } from 'react';
// import { Container, Box, Card, CardContent, Typography, TextField, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import axios from 'axios';

// const WeatherApp = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [weatherData, setWeatherData] = useState([]);
//   const [locationName, setLocationName] = useState('Location name');

//   useEffect(() => {
//     // Fetch initial weather data for default location
//     fetchWeatherData('default-location');
//   }, []);

//   const fetchWeatherData = async (location) => {
//     try {
//       // Replace with your API URL and key
//       const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${location}&days=7`);
//       const forecast = response.data.forecast.forecastday;
//       setWeatherData(forecast);
//       setLocationName(response.data.location.name);
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//     }
//   };

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       fetchWeatherData(searchQuery);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
//         <Box>
//           <img src="/location.jpg" alt="logo" style={{ height: 50 }} />
//         </Box>
//         <Box display="flex" alignItems="center" flexGrow={1} ml={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             size="small"
//             placeholder="Search for your destination"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <IconButton onClick={handleSearch}>
//             <SearchIcon />
//           </IconButton>
//         </Box>
//       </Box>

//       <Typography variant="h5" align="center" gutterBottom>
//         {locationName}
//       </Typography>

//       <Box display="flex" justifyContent="center" mb={2}>
//         <FavoriteIcon color="error" />
//       </Box>

//       <Box display="flex" flexWrap="wrap" justifyContent="space-around" gap={2}>
//         {weatherData.map((day, index) => (
//           <Card
//             key={index}
//             onClick={() => alert(`Details for ${day.date}`)}
//             style={{ cursor: 'pointer', width: '120px', textAlign: 'center' }}
//           >
//             <CardContent>
//               <Typography variant="subtitle1" gutterBottom>
//                 {index === 0 ? 'TODAY' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
//               </Typography>
//               <img src={`https:${day.day.condition.icon}`} alt="weather" style={{ height: 40 }} />
//               <Typography variant="body2">{day.day.condition.text}</Typography>
//               <Typography variant="body2">{day.day.avgtemp_c}°C</Typography>
//               <Typography variant="caption" display="block">
//                 Look at activities
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default WeatherApp;

import React, { useState, useEffect } from 'react';
import { Container, Box, Card, CardContent, Typography, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

const WeatherApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState([
    {
      date: '2025-01-14',
      day: {
        condition: { text: 'Partly cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' },
        avgtemp_c: 15,
      },
    },
    {
      date: '2025-01-15',
      day: {
        condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
        avgtemp_c: 18,
      },
    },
    {
      date: '2025-01-16',
      day: {
        condition: { text: 'Rain', icon: '//cdn.weatherapi.com/weather/64x64/day/308.png' },
        avgtemp_c: 12,
      },
    },
    {
      date: '2025-01-17',
      day: {
        condition: { text: 'Cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/119.png' },
        avgtemp_c: 14,
      },
    },
    {
      date: '2025-01-18',
      day: {
        condition: { text: 'Light rain', icon: '//cdn.weatherapi.com/weather/64x64/day/296.png' },
        avgtemp_c: 13,
      },
    },
    {
      date: '2025-01-19',
      day: {
        condition: { text: 'Overcast', icon: '//cdn.weatherapi.com/weather/64x64/day/122.png' },
        avgtemp_c: 11,
      },
    },
    {
      date: '2025-01-20',
      day: {
        condition: { text: 'Clear', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
        avgtemp_c: 16,
      },
    },
  ]);
  const [locationName, setLocationName] = useState('Your Current location');

  useEffect(() => {
    // Fetch initial weather data for default location (if needed)
  }, []);

  const fetchWeatherData = async (location) => {
    try {
      // Replace with your API URL and key
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${location}&days=7`);
      const forecast = response.data.forecast.forecastday;
      setWeatherData(forecast);
      setLocationName(response.data.location.name);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" align-Items="center" justifyContent="space-between" my={2}>
        <Box>
          <img src="/location.jpg" alt="logo" style={{ height: 50 }} />
        </Box>
        <Box display="flex" alignItems="center" flexGrow={1} ml={2}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search for your destination"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <Typography variant="h5" align="center" gutterBottom>
        {locationName}
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <FavoriteIcon color="error" />
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="space-around" gap={2}>
        {weatherData.map((day, index) => (
          <Card
            key={index}
            onClick={() => alert(`Details for ${day.date}`)}
            style={{ cursor: 'pointer', width: '120px', textAlign: 'center' }}
          >
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                {index === 0 ? 'TODAY' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
              </Typography>
              <img src={`https:${day.day.condition.icon}`} alt="weather" style={{ height: 40 }} />
              <Typography variant="body2">{day.day.condition.text}</Typography>
              <Typography variant="body2">{day.day.avgtemp_c}°C</Typography>
              <Typography variant="caption" display="block">
                Look at activities
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default WeatherApp;

