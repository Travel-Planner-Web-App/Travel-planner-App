import { useState } from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Tooltip,
  Container,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import HomePage from './components/pages/HomePage';
import logo from './assets/logo.png'; // Ensure logo is in src/assets

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  const handleProfileClick = () => {
    setProfileOpen(true);
    console.log('Profile clicked');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#007bff' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo */}
          <IconButton onClick={toggleDrawer(true)} sx={{ color: 'white' }}>
            <img src={logo} alt="App Logo" style={{ width: 50, height: 50 }} />
          </IconButton>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="h6" sx={{ color: 'white', cursor: 'pointer' }}>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Drawer) */}
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
          <Tooltip title="Profile">
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
              <Typography variant="h6">P</Typography>
            </Box>
          </Tooltip>

          <List sx={{ marginTop: '80px', paddingLeft: 0 }}>
            <ListItem button>
              <ListItemIcon sx={{ color: 'red' }}>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItem>

           
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container sx={{ flexGrow: 1, marginTop: '80px', paddingBottom: '50px' }}>
        <HomePage />
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#007bff',
          color: 'white',
          textAlign: 'center',
          padding: '10px',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          left: 0,
        }}
      >
        <Typography variant="body2">© 2025 Travel Planner. All Rights Reserved.</Typography>
      </Box>
    </Box>
  );
}

export default App;
