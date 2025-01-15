import React from 'react';
import { Box, Typography } from '@mui/material';

const ActivityCard = ({ activity, handleActivityClick }) => {
  return (
    <Box
      onClick={() => handleActivityClick(activity)}
      sx={{
        right: { xs: '0%', sm: '0%', md: '0%', lg: '30%' },
        width: { xs: '90%', sm: '90%', md: '30%', lg: '30%' },
        backgroundColor: 'primary.main',
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
        textAlign: 'center',
        backgroundImage: `url(${activity.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
        height: '150px',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
        {activity.title}
      </Typography>
      <Typography variant="body1" sx={{ color: 'white' }}>
        {activity.description}
      </Typography>
    </Box>
  );
};

export default ActivityCard;