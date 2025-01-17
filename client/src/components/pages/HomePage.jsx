import { useState, useEffect } from 'react';
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
      console.log(err);
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
    // Prompt user for location access
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(`${latitude},${longitude}`); // Use latitude and longitude to fetch weather data
        },
        (error) => {
          console.error('Error getting location', error);
          setError('Location access denied. Defaulting to Soweto.');
          fetchWeatherData('Soweto'); // Fallback to default location if location access is denied
        }
      );
    } else {
      console.log('Geolocation not supported');
      setError('Geolocation not supported. Defaulting to Soweto.');
      fetchWeatherData('Soweto'); // Fallback to default location if geolocation is not supported
    }
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