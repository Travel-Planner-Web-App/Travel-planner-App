import { useState } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import HomePage from './components/pages/HomePage';
import logo from './assets/logo.png'; // Assuming the logo image is placed in src/assets

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // Handle profile circle click

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout logic here
  };

  const handleProfileClick = () => {
    setProfileOpen(true);
    // Handle profile modal or navigation here
    console.log('Profile clicked');
  };

  return (
    <>
      {/* App Logo and Drawer Toggle */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,  // Adjusted to move the logo slightly upwards
          left: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          
        }}
      >
        <IconButton onClick={toggleDrawer(true)}>
          {/* Display the logo */}
          <img src={logo} alt="App Logo" style={{ width: 60, height: 60 }} />
        </IconButton>
      </Box>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Profile Circle */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 50,
              height: 50,
              backgroundColor: '#007bff',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              cursor: 'pointer',
            }}
            onClick={handleProfileClick}
          >
            {/* Profile Icon or Initials */}
            <Typography variant="h6">P</Typography>
          </Box>

          <List sx={{ marginTop: '80px', paddingLeft: 0 }}>
            {/* Favorites */}
            <ListItem button>
              <ListItemIcon sx={{ color: 'red' }}>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItem>

            {/* Logout */}
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main App Content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          marginTop: '50px',  // Adjusted to move the content down below the logo
        }}
      >
        <HomePage />
      </Box>
    </>
  );
}

export default App;
