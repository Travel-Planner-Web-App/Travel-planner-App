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
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText,
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
  const [selectedDay, setSelectedDay] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCardClick = (day) => {
    setSelectedDay(day);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

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
      <Box display="flex" alignItems="center" mb={4}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search for your destination"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            borderRadius: 2,
            '& .MuiOutlinedInput-root': { borderRadius: 2 },
          }}
        />
        <IconButton
          onClick={handleSearch}
          sx={{
            ml: 2,
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          <SearchIcon />
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
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
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
      </Box>

      {/* Weather Cards */}
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
        {weatherData.map((day, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(day)}
            sx={{
              width: 150,
              textAlign: 'center',
              boxShadow: 3,
              borderRadius: 3,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': { transform: 'scale(1.1)', boxShadow: 5 },
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
                sx={{ mt: 2 }}
                onClick={() => console.log(`Looking for activities on ${day.date}`)}
              >
                Look for activities
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/*Selected day */}
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Activities for {selectedDay?.date}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Based on the weather ({selectedDay?.day.condition.text}), here are some activities you can enjoy:
          </DialogContentText>
          <ul>
            {selectedDay?.day.condition.text === 'Sunny' && <li>Go for a hike</li>}
            {selectedDay?.day.condition.text === 'Partly cloudy' && <li>Visit a park</li>}
            {selectedDay?.day.condition.text === 'Rain' && <li>Visit a museum</li>}
            {selectedDay?.day.condition.text === 'Cloudy' && <li>Go to a coffee shop</li>}
            {selectedDay?.day.condition.text === 'Light rain' && <li>Watch a movie indoors</li>}
            {selectedDay?.day.condition.text === 'Overcast' && <li>Explore an indoor market</li>}
            {selectedDay?.day.condition.text === 'Clear' && <li>Have a picnic</li>}
          </ul>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default WeatherApp;
