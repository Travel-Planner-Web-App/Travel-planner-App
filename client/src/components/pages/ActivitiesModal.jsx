import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
} from '@mui/material';

const ActivitiesModal = ({ open, onClose, day, activities, handleActivityClick }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen // Make the modal full-screen
      aria-labelledby="activities-modal-title"
      aria-describedby="activities-modal-description"
    >
      <DialogTitle id="activities-modal-title" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Activities for {day.date}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            p: 2,
          }}
        >
          {/* Activities Section */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: '600px', // Limit width for better readability
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
              Suggested Activities
            </Typography>
            {activities.map((activity) => (
              <Button
                key={activity.id}
                variant="contained"
                onClick={() => handleActivityClick(activity)}
                sx={{
                  background: 'linear-gradient(145deg, #6A11CB, #2575FC)', // Gradient for button
                  color: 'white',
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(145deg, #2575FC, #6A11CB)', // Reverse gradient on hover
                  },
                }}
              >
                {activity.title}
              </Button>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: 3 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderRadius: 20,
            border: '2px solid #6A11CB', // Border color
            color: '#6A11CB', // Text color
            fontSize: '1rem',
            fontWeight: 'bold',
            px: 4,
            py: 1,
            '&:hover': {
              backgroundColor: '#6A11CB', // Background color on hover
              color: 'white', // Text color on hover
              border: '2px solid transparent', // Remove border on hover
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActivitiesModal;