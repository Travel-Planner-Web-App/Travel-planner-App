import React, { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';

import SnowIcon from '../../assets/snow.svg';
import ThunderstormIcon from '../../assets/thunderstorms-night-rain.svg';
import ClearDayIcon from '../../assets/clear-day.svg';
import PartlyCloudyIcon from '../../assets/partly-cloudy-day.svg';
import RainIcon from '../../assets/rainIcon.svg';
import FogIcon from '../../assets/fog.svg';

const WeatherApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState([
    { date: '2025-01-14', day: { condition: { text: 'Snow', icon: 'snow' }, avgtemp_c: 15 } },
    { date: '2025-01-15', day: { condition: { text: 'Thunderstorm', icon: 'thunderstorms-night-rain' }, avgtemp_c: 18 } },
    { date: '2025-01-16', day: { condition: { text: 'Clear', icon: 'clear-day' }, avgtemp_c: 12 } },
    { date: '2025-01-17', day: { condition: { text: 'Partly Cloudy', icon: 'partly-cloudy-day' }, avgtemp_c: 14 } },
    { date: '2025-01-18', day: { condition: { text: 'Rain', icon: 'rain' }, avgtemp_c: 13 } },
    { date: '2025-01-19', day: { condition: { text: 'Fog', icon: 'fog' }, avgtemp_c: 11 } },
    { date: '2025-01-20', day: { condition: { text: 'Snow', icon: 'snow' }, avgtemp_c: 10 } },
  ]);

  const [locationName, setLocationName] = useState('Your Current Location');

  const getWeatherIcon = (condition) => {
    const icons = {
      Snow: SnowIcon,
      Thunderstorm: ThunderstormIcon,
      Clear: ClearDayIcon,
      'Partly Cloudy': PartlyCloudyIcon,
      Rain: RainIcon,
      Fog: FogIcon,
    };
    return <img src={icons[condition]} alt={condition} style={{ width: '60px', height: '60px' }} />;
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Search Section */}
      <Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  mb={4}
  sx={{
    gap: 2,
    padding: 2,
    backgroundColor: 'background.paper',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
  }}
  top={'20%'}
>
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    placeholder="Search for your destination"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: 3,
        backgroundColor: 'white',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        '&.Mui-focused': {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        },
      },
    }}
  />
  <IconButton
    onClick={handleSearch}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 1.5,
      backgroundColor: 'primary.main',
      color: 'white',
      borderRadius: 2,
      top: 2,
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        backgroundColor: 'primary.dark',
        boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
      },
      transition: 'all 0.3s ease',
    }}
  >
    <SearchIcon fontSize="medium" />
  </IconButton>
</Box>


      {/* Weather Icon Container */}
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          mb: 4,
          border: '1px solid',
          borderRadius: 2,
          padding: 2,
          boxShadow: 2,
          
        }}
      >
        <Typography variant="h5" sx={{ color:'black', fontWeight: 'bold', mb: 2,marginTop: '20px' }}>
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
      

    {/* Weather Cards */}
<Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
  {weatherData.map((day, index) => (
    <Card
      key={index}
      sx={{
        width: 170,
        height: 230,
        textAlign: 'center',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        },
        backgroundColor: 'background.default',
      }}
    >
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}
              >
                {index === 0
                  ? 'TODAY'
                  : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
              </Typography>
              {getWeatherIcon(day.day.condition.text)}
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                {day.day.condition.text}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 'bold', color: 'text.primary', mt: 1 }}
              >
                {day.day.avgtemp_c}°C
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => console.log(`Looking for activities on ${day.date}`)}
              >
                Activities
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      </Box>
    </Container>
  );
};
export default WeatherApp;