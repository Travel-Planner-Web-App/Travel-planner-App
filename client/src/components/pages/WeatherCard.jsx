import { Card, CardContent, Typography, Button } from '@mui/material';
import { FaSun, FaCloudSun, FaCloudShowersHeavy, FaSnowflake, FaCloud } from 'react-icons/fa'; // Import weather icons
import { isToday, isTomorrow, format } from 'date-fns';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'; // Import an icon for the button

const WeatherIcon = ({ condition }) => {
  const iconSize = 40; // Set desired icon size

  // Map weather condition to a corresponding icon
  switch (condition.toLowerCase()) {
    case 'clear':
      return <FaSun size={iconSize} color="#FFD700" />; // Gold for sunny
    case 'clouds':
      return <FaCloudSun size={iconSize} color="#A9A9A9" />; // Gray for cloudy
    case 'rain':
      return <FaCloudShowersHeavy size={iconSize} color="#1E90FF" />; // DodgerBlue for rain
    case 'snow':
      return <FaSnowflake size={iconSize} color="#87CEEB" />; // SkyBlue for snow
    default:
      return <FaCloud size={iconSize} color="#A9A9A9" />; // Gray for unknown
  }
};

const formatDateLabel = (dateString) => {
  const date = new Date(dateString);
  if (isToday(date)) {
    return 'Today';
  } else if (isTomorrow(date)) {
    return 'Tomorrow';
  } else {
    return format(date, 'EEE'); // Format as abbreviated day name (e.g., Mon, Tue)
  }
};

const WeatherCard = ({ day, onActivityClick }) => {
  return (
    <Card
      sx={{
        width: 180, // Slightly wider for better spacing
        borderRadius: 4,
        background: 'linear-gradient(145deg, #ffffff, #f0f0f0)', // Subtle gradient
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center', padding: 3 }}>
        {/* Date */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 2,
            fontSize: '1.25rem',
          }}
        >
          {formatDateLabel(day.date)}
        </Typography>

        {/* Weather Icon */}
        <div style={{ margin: '16px 0' }}>
          <WeatherIcon condition={day.weather.condition} />
        </div>

        {/* Weather Condition */}
        <Typography
          variant="body1"
          sx={{
            color: '#555',
            marginBottom: 1,
            fontWeight: '500',
            fontSize: '1rem',
          }}
        >
          {day.weather.condition}
        </Typography>

        {/* Temperature */}
        <Typography
          variant="body1"
          sx={{
            color: '#FF6347', // Tomato color for temperature
            fontWeight: 'bold',
            fontSize: '1.25rem',
            marginBottom: 2,
          }}
        >
          {day.weather.temperature.max}°C
        </Typography>

        {/* Activities Button */}
        <Button
          variant="contained"
          size="medium"
          color="primary"
          endIcon={<DirectionsRunIcon />} // Icon on the side
          onClick={() => onActivityClick(day)}
          sx={{
            borderRadius: 20,
            textTransform: 'none',
            background: 'linear-gradient(145deg, #6A11CB, #2575FC)', // Gradient for button
            color: '#fff',
            padding: '8px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            '&:hover': {
              background: 'linear-gradient(145deg, #2575FC, #6A11CB)', // Reverse gradient on hover
              transform: 'scale(1.05)',
              transition: 'transform 0.2s ease-in-out',
            },
          }}
        >
          Activities
        </Button>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;