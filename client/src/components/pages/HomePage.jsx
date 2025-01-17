import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Box, 
  Typography, 
  CircularProgress,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SearchBar from '../SearchBar';
import DetailedWeatherView from '../DetailedWeatherView';

// WeatherCard Component
const WeatherCard = ({ day, index, setSelectedDay, onActivityClick }) => {
  return (
    <Card 
      sx={{ 
        minWidth: 200, 
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
    >
      <CardContent onClick={() => setSelectedDay(day)}>
        <Typography variant="h6" gutterBottom>
          {day.date}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {day.temperature}°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {day.condition}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
        <Button 
          variant="contained" 
          size="small" 
          color="primary"
          startIcon={<DirectionsRunIcon />}
          onClick={(e) => {
            e.stopPropagation();
            onActivityClick(day.activities.suggestions);
          }}
          sx={{
            borderRadius: 20,
            textTransform: 'none',
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease-in-out'
            }
          }}
        >
          Activities
        </Button>
      </CardActions>
    </Card>
  );
};

// ActivityDialog Component
const ActivityDialog = ({ open, handleClose, activity }) => {
  if (!activity) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Suggested Activity
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom>
            {activity.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {activity.description}
          </Typography>
          {activity.requirements && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Requirements: {activity.requirements}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Main Homepage Component
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

  const handleActivityButtonClick = (activities) => {
    setSelectedActivity(activities[0]); // You can modify this to handle multiple activities
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedActivity(null);
  };

  useEffect(() => {
    fetchWeatherData('soweto'); // Default location on load
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
                  onActivityClick={handleActivityButtonClick}
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