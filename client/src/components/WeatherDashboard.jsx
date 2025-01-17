import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WeatherCard from './WeatherCard';
import DetailedWeatherView from './DetailedWeatherView';

const WeatherDashboard = ({ 
  locationName, 
  selectedDay, 
  weatherData, 
  handleSelectDay, 
  handleActivityClick 
}) => {
  return (
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
          activities={selectedDay.activities?.suggestions || []}
          handleActivityClick={handleActivityClick}
          setSelectedDay={handleSelectDay}
        />
      ) : (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
          {weatherData.map((day, index) => (
            <WeatherCard
              key={index}
              day={day}
              index={index}
              onActivityClick={handleActivityClick}  // Still pass this prop, but it won't be used for selecting the card
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default WeatherDashboard;
