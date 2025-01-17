import { Card, CardContent, Typography, Button } from '@mui/material';
import { isToday, isTomorrow, format } from 'date-fns';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useState } from 'react';
import ActivitiesModal from './ActivitiesModal';

const formatDateLabel = (dateString) => {
  const date = new Date(dateString);
  if (isToday(date)) {
    return 'Today';
  } else if (isTomorrow(date)) {
    return 'Tomorrow';
  } else {
    return format(date, 'EEE');
  }
};

const WeatherCard = ({ day, activities = [], handleActivityClick, setSelectedDay }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          width: 180,
          borderRadius: 4,
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.02)',
          },
        }}
      >
        <CardContent sx={{ textAlign: 'center', padding: 3 }}>
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
          <Typography
            variant="body1"
            sx={{
              color: '#FF6347',
              fontWeight: 'bold',
              fontSize: '1.25rem',
              marginBottom: 2,
            }}
          >
            {day.weather.temperature.max}°C
          </Typography>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            endIcon={<DirectionsRunIcon />}
            onClick={handleOpenModal}
            sx={{
              borderRadius: 20,
              textTransform: 'none',
              background: 'linear-gradient(145deg, #6A11CB, #2575FC)',
              color: '#fff',
              padding: '8px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              '&:hover': {
                background: 'linear-gradient(145deg, #2575FC, #6A11CB)',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}
          >
            Activities
          </Button>
        </CardContent>
      </Card>

      {/* Activities Modal */}
      <ActivitiesModal
        open={modalOpen}
        onClose={handleCloseModal}
        day={day}
        activities={activities}
        handleActivityClick={handleActivityClick}
        setSelectedDay={setSelectedDay}
      />
    </>
  );
};

export default WeatherCard;