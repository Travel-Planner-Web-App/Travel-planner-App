import { Card, CardContent, Typography } from '@mui/material';

const WeatherCard = ({ day, index, setSelectedDay }) => {
  const handleClick = () => {
    setSelectedDay(day);
  };

  return (
    <Card onClick={handleClick} sx={{ cursor: 'pointer', width: 150 }}>
      <CardContent>
        <Typography variant="h6" textAlign="center">
          {day.date}
        </Typography>
        <img
          src={`http://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
          alt={day.weather.condition}
          style={{ width: 60, height: 60, margin: '0 auto' }}
        />
        <Typography textAlign="center">{day.weather.condition}</Typography>
        <Typography textAlign="center">{day.weather.temperature.max}°C</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
