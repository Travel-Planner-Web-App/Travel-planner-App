import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import WeatherIcon from './WeatherIcon';

const WeatherCard = ({ day, index, setSelectedDay }) => {
  return (
    <Card
      sx={{
        width: 170,
        height: 230,
        textAlign: 'center',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          {index === 0
            ? 'TODAY'
            : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
        </Typography>
        <WeatherIcon condition={day.day.condition.text} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {day.day.condition.text}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
          {day.day.avgtemp_c}°C
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
          onClick={() => setSelectedDay(day)}
        >
          Activities
        </Button>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;