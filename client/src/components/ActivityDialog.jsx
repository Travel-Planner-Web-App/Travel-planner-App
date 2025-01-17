// import React, { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
//   Typography,
//   IconButton,
//   Button,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAPBOX_TOKEN;

// // Custom hook for map initialization
// const useMapboxMap = (mapContainerRef, location, activity) => {
//   useEffect(() => {
//     if (!mapContainerRef.current || !location || !activity) return;

//     const { lng, lat } = location;
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/outdoors-v12',
//       center: [lng, lat],
//       zoom: 13,
//       pitch: 45,
//       bearing: -17.6,
//       antialias: true,
//     });

//     map.addControl(new mapboxgl.NavigationControl(), 'top-right');

//     const popup = new mapboxgl.Popup({ offset: 25 })
//       .setHTML(`<strong>${activity.title}</strong><p>${activity.description}</p>`);

//     new mapboxgl.Marker({ color: '#FF0000', scale: 1.2 })
//       .setLngLat([lng, lat])
//       .setPopup(popup)
//       .addTo(map);

//     map.on('load', () => {
//       map.addSource('mapbox-dem', {
//         type: 'raster-dem',
//         url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
//         tileSize: 512,
//         maxzoom: 14,
//       });
//       map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
//       map.addLayer({
//         id: 'sky',
//         type: 'sky',
//         paint: {
//           'sky-type': 'atmosphere',
//           'sky-atmosphere-sun': [0.0, 90.0],
//           'sky-atmosphere-color': 'rgba(85, 151, 210, 0.5)',
//         },
//       });
//     });

//     return () => map.remove();
//   }, [mapContainerRef, location, activity]);
// };

// const ActivityDialog = React.memo(({ open, handleClose, activity }) => {
//   const mapContainerRef = useRef(null);

//   useMapboxMap(mapContainerRef, activity?.location, activity);

//   if (!activity) {
//     return (
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Error</DialogTitle>
//         <DialogContent>
//           <Typography>No activity data available.</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
//   }

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="lg"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 2,
//           boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
//         },
//       }}
//       aria-labelledby="activity-dialog-title"
//     >
//       <DialogTitle
//         id="activity-dialog-title"
//         sx={{
//           m: 0,
//           p: 3,
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           borderBottom: '1px solid rgba(0,0,0,0.1)',
//           bgcolor: 'white',
//           color: 'black',
//           borderRadius: '8px 8px 0 0',
//         }}
//       >
//         <Box display="flex" alignItems="center" gap={1}>
//         <LocationOnIcon sx={{ color: 'red' }} />
//           <Typography variant="h5" component="span" fontWeight="bold">
//             {activity.title}
//           </Typography>
//         </Box>
//         <IconButton
//           onClick={handleClose}
//           sx={{
//             color: 'white',
//             '&:hover': {
//               bgcolor: 'rgba(255,255,255,0.1)',
//             },
//           }}
//           aria-label="close"
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent
//         sx={{
//           p: 3,
//           '&::-webkit-scrollbar': {
//             width: '8px',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             backgroundColor: 'rgba(0,0,0,0.2)',
//             borderRadius: '4px',
//           },
//         }}
//       >
//         <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, marginTop:'20px'}}>
//           <Box
//             sx={{
//               flex: 1,
//               height: { xs: '250px', md: '400px' },
//               backgroundImage: `url(${activity.image})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               borderRadius: 2,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//               transition: 'transform 0.3s ease',
//               '&:hover': {
//                 transform: 'scale(1.02)',
//               },
//             }}
//             aria-label="Activity image"
//           />
//           <Box
//             ref={mapContainerRef}
//             sx={{
//               flex: 1,
//               height: { xs: '250px', md: '400px' },
//               borderRadius: 2,
//               overflow: 'hidden',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//               '& .mapboxgl-canvas': {
//                 borderRadius: 2,
//               },
//               '& .mapboxgl-ctrl-top-right': {
//                 top: '10px',
//                 right: '10px',
//               },
//             }}
//             aria-label="Map"
//           />
//         </Box>

//         <Box
//           sx={{
//             mt: 3,
//             p: 2,
//             bgcolor: 'rgba(0,0,0,0.02)',
//             borderRadius: 2,
//             border: '1px solid rgba(0,0,0,0.05)',
//           }}
//         >
//           <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.primary' }}>
//             {activity.description}
//           </Typography>
//         </Box>
//       </DialogContent>

//       <DialogActions
//         sx={{
//           p: 2,
//           borderTop: '1px solid rgba(0,0,0,0.1)',
//           bgcolor: 'background.paper',
//         }}
//       >
//         <Button
//           onClick={handleClose}
//           variant="contained"
//           sx={{
//             bgcolor: 'primary.main',
//             color: 'white',
//             px: 4,
//             py: 1,
//             borderRadius: 1,
//             textTransform: 'none',
//             fontWeight: 'bold',
//             '&:hover': {
//               bgcolor: 'primary.dark',
//             },
//           }}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// });

// export default ActivityDialog;

// ActivityDialog.js
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Button } from '@mui/material';

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

export default ActivityDialog;
