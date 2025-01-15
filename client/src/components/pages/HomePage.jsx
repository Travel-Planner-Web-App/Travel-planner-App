// Homepage.jsx Prince
// import React, { useState } from 'react';
// import { Container, Box, Typography } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import SearchBar from '../SearchBar';
// import WeatherCard from '../WeatherCard';
// import DetailedWeatherView from '../DetailedWeatherView';
// import ActivityDialog from '../ActivityDialog';

// const Homepage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [weatherData, setWeatherData] = useState([
//     { date: '2025-01-14', day: { condition: { text: 'Snow', icon: 'snow' }, avgtemp_c: 15, avghumidity: 65, maxwind_kph: 20 } },
//     { date: '2025-01-15', day: { condition: { text: 'Thunderstorm', icon: 'thunderstorms-night-rain' }, avgtemp_c: 18, avghumidity: 70, maxwind_kph: 25 } },
//     { date: '2025-01-16', day: { condition: { text: 'Clear', icon: 'clear-day' }, avgtemp_c: 12, avghumidity: 55, maxwind_kph: 15 } },
//     { date: '2025-01-17', day: { condition: { text: 'Partly Cloudy', icon: 'partly-cloudy-day' }, avgtemp_c: 14, avghumidity: 60, maxwind_kph: 18 } },
//     { date: '2025-01-18', day: { condition: { text: 'Rain', icon: 'rain' }, avgtemp_c: 13, avghumidity: 75, maxwind_kph: 22 } },
//     { date: '2025-01-19', day: { condition: { text: 'Fog', icon: 'fog' }, avgtemp_c: 11, avghumidity: 80, maxwind_kph: 12 } },
//     { date: '2025-01-20', day: { condition: { text: 'Snow', icon: 'snow' }, avgtemp_c: 10, avghumidity: 68, maxwind_kph: 19 } },
//   ]);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [locationName, setLocationName] = useState('Your Current Location');
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedActivity, setSelectedActivity] = useState(null);

//   const activities = [
//     {
//       id: 1,
//       title: "Mountain Hiking",
//       description: "Explore scenic mountain trails with professional guides",
//       image: "https://source.unsplash.com/featured/?mountain,hiking",
//       location: { lat: 40.7128, lng: -74.0060 },
//       backgroundImage: "https://source.unsplash.com/featured/?mountain,trail",
//     },
//     {
//       id: 2,
//       title: "Rock Climbing",
//       description: "Experience thrilling climbs for all skill levels",
//       image: "https://source.unsplash.com/featured/?climbing",
//       location: { lat: 40.7580, lng: -73.9855 },
//       backgroundImage: "https://source.unsplash.com/featured/?rock,climbing",
//     },
//     {
//       id: 3,
//       title: "Forest Adventure",
//       description: "Discover hidden trails and natural wonders",
//       image: "https://source.unsplash.com/featured/?forest,adventure",
//       location: { lat: 40.7829, lng: -73.9654 },
//       backgroundImage: "https://source.unsplash.com/featured/?forest,nature",
//     },
//   ];

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       console.log('Searching for:', searchQuery);
//     }
//   };

//   const handleActivityClick = (activity) => {
//     setSelectedActivity(activity);
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedActivity(null);
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 6 }}>
//       <SearchBar 
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         handleSearch={handleSearch}
//       />

//       <Box
//         sx={{
//           position: 'relative',
//           textAlign: 'center',
//           mb: 4,
//           border: '1px solid',
//           borderRadius: 2,
//           padding: 2,
//           boxShadow: 2,
//           color: 'black'
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, marginTop: '20px' }}>
//           {locationName}
//         </Typography>
//         <FavoriteIcon
//           color="error"
//           sx={{
//             position: 'absolute',
//             top: 8,
//             right: 8,
//             fontSize: 32,
//           }}
//         />

//         {selectedDay ? (
//           <DetailedWeatherView
//             selectedDay={selectedDay}
//             activities={activities}
//             handleActivityClick={handleActivityClick}
//             setSelectedDay={setSelectedDay}
//           />
//         ) : (
//           <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
//             {weatherData.map((day, index) => (
//               <WeatherCard
//                 key={index}
//                 day={day}
//                 index={index}
//                 setSelectedDay={setSelectedDay}
//               />
//             ))}
//           </Box>
//         )}
//       </Box>

//       <ActivityDialog
//         open={dialogOpen}
//         handleClose={handleCloseDialog}
//         activity={selectedActivity}
//       />
//     </Container>
//   );
// };

// export default Homepage;

// me

import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchBar from '../SearchBar';
import WeatherCard from './WeatherCard';
import DetailedWeatherView from '../DetailedWeatherView';
import ActivityDialog from '../ActivityDialog';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [locationName, setLocationName] = useState('Soweto');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/weather', { params: { location } });
      const { location: locData, dailyForecasts } = response.data;
      setLocationName(locData.name);
      setWeatherData(dailyForecasts);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery);
    }
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedActivity(null);
  };

  useEffect(() => {
    fetchWeatherData(''); // Default location on load
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" textAlign="center" mt={4}>
          {error}
        </Typography>
      ) : (
        <Box
          sx={{
            position: 'relative',
            textAlign: 'center',
            mb: 4,
            border: '1px solid',
            borderRadius: 2,
            padding: 2,
            boxShadow: 2,
            color: 'black',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, marginTop: '20px' }}>
            {locationName}
          </Typography>
          <FavoriteIcon
            color="error"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              fontSize: 32,
            }}
          />

          {selectedDay ? (
            <DetailedWeatherView
              selectedDay={selectedDay}
              activities={selectedDay.activities.suggestions}
              handleActivityClick={handleActivityClick}
              setSelectedDay={setSelectedDay}
            />
          ) : (
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
              {weatherData.map((day, index) => (
                <WeatherCard
                  key={index}
                  day={day}
                  index={index}
                  setSelectedDay={setSelectedDay}
                />
              ))}
            </Box>
          )}
        </Box>
      )}

      <ActivityDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        activity={selectedActivity}
      />
    </Container>
  );
};

export default Homepage;



//
// import { useState } from 'react';
// import { Container, Box, Typography, CircularProgress } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import SearchBar from '../SearchBar';
// import WeatherCard from '../WeatherCard';
// import DetailedWeatherView from '../DetailedWeatherView';
// import ActivityDialog from '../ActivityDialog';
// import axios from 'axios';

// const Homepage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [weatherData, setWeatherData] = useState(null);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedActivity, setSelectedActivity] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     if (searchQuery.trim()) {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await axios.get(`http://localhost:5000/api/weather?location=${searchQuery}`);
//         setWeatherData(response.data);
//       } catch (error) {
//         setError('Failed to fetch weather data');
//         console.log(error)
//         setWeatherData(null);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleActivityClick = (activity) => {
//     setSelectedActivity(activity);
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedActivity(null);
//   };

//   function getWeatherIcon(condition) {
//     const iconMap = {
//       'clear': 'clear-day',
//       'few clouds': 'partly-cloudy-day',
//       'scattered clouds': 'cloudy',
//       'broken clouds': 'cloudy',
//       'shower rain': 'rain',
//       'rain': 'rain',
//       'thunderstorm': 'thunderstorm',
//       'snow': 'snow',
//       'mist': 'fog'
//     };
//     return iconMap[condition.toLowerCase()] || 'clear-day';
//   }

//   const transformedActivities = weatherData ? [
//     ...(weatherData.activities.suggestions.outdoor || []).map(activity => ({
//       id: activity.name.toLowerCase().replace(/\s/g, '-'),
//       title: activity.name,
//       description: activity.description,
//       image: `https://source.unsplash.com/featured/?${activity.name.toLowerCase()}`,
//       location: { 
//         lat: activity.locations[0].lat, 
//         lng: activity.locations[0].lon 
//       },
//       intensity: activity.intensity,
//       locations: activity.locations
//     })),
//     ...(weatherData.activities.suggestions.indoor || []).map(activity => ({
//       id: activity.name.toLowerCase().replace(/\s/g, '-'),
//       title: activity.name,
//       description: activity.description,
//       image: `https://source.unsplash.com/featured/?${activity.name.toLowerCase()}`,
//       location: { 
//         lat: activity.locations[0].lat, 
//         lng: activity.locations[0].lon 
//       },
//       intensity: activity.intensity,
//       locations: activity.locations
//     }))
//   ] : [];

//   const currentWeatherCard = weatherData ? {
//     date: new Date().toISOString().split('T')[0],
//     day: {
//       condition: {
//         text: weatherData.weather.condition,
//         icon: getWeatherIcon(weatherData.weather.condition)
//       },
//       avgtemp_c: weatherData.weather.temperature,
//       avghumidity: weatherData.weather.humidity,
//       maxwind_kph: weatherData.weather.windSpeed * 3.6
//     }
//   } : null;

//   return (
//     <Container maxWidth="md" sx={{ py: 6 }}>
//       <SearchBar 
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         handleSearch={handleSearch}
//       />

//       <Box
//         sx={{
//           position: 'relative',
//           textAlign: 'center',
//           mb: 4,
//           padding: 2,
//           color: 'black',
//           minHeight: '200px'
//         }}
//       >
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Typography color="error" sx={{ p: 3 }}>
//             {error}
//           </Typography>
//         ) : weatherData ? (
//           <>
//             <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, marginTop: '20px' }}>
//               {weatherData.weather.location}
//             </Typography>
//             <FavoriteIcon
//               color="error"
//               sx={{
//                 position: 'absolute',
//                 top: 8,
//                 right: 8,
//                 fontSize: 32,
//               }}
//             />

//             {selectedDay ? (
//               <DetailedWeatherView
//                 selectedDay={selectedDay}
//                 activities={transformedActivities}
//                 handleActivityClick={handleActivityClick}
//                 setSelectedDay={setSelectedDay}
//               />
//             ) : (
//               <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
//                 <WeatherCard
//                   day={currentWeatherCard}
//                   index={0}
//                   setSelectedDay={setSelectedDay}
//                 />
//               </Box>
//             )}
//           </>
//         ) : (
//           <Typography sx={{ p: 3 }}>
//             Search for a location to see weather and activities
//           </Typography>
//         )}
//       </Box>

//       <ActivityDialog
//         open={dialogOpen}
//         handleClose={handleCloseDialog}
//         activity={selectedActivity}
//       />
//     </Container>
//   );
// };

// export default Homepage;