
const DetailedWeatherView = ({ selectedDay, activities, handleActivityClick, setSelectedDay }) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '90%', md: '750px', lg: '800px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          right: { xs: '0%', sm: '0%', md: '0%', lg: '0%' },
          width: { xs: '90%', sm: '90%', md: '90%', lg: '90%' },
          height: 'auto',
          backgroundColor: 'grey.900',
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
          color: 'white',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: { xs: .7, sm: 1, md: 1, lg: 1 },
        }}
      >
        <Box sx={{ fontSize: '1rem', display: 'inline-block' }}>
          <WeatherIcon condition={selectedDay.day.condition.text} />
        </Box>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Temp: {selectedDay.day.avgtemp_c}°C
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Humidity: {selectedDay.day.avghumidity}%
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Wind: {selectedDay.day.maxwind_kph} kph
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mt: 3, fontSize: '0.9rem', textAlign: 'center', color: 'black' }}>
        Discover exciting activities that bring you closer to nature and adventure. Whether it's hiking through scenic trails, conquering mountain peaks, or exploring the beauty of the outdoors, there's something for everyone to enjoy.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          mt: 4,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} handleActivityClick={handleActivityClick} />
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={() => setSelectedDay(null)}
        sx={{
          mt: 3,
          backgroundColor: '#0dcaf0',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          px: 3,
          py: 1.5,
          borderRadius: '8px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.9)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#FFD700',
            color: '#000',
            boxShadow: '0px 6px 10px rgba(255, 215, 0, 0.9)',
          },
        }}
      >
        Check Weather
      </Button>
    </Box>
  );
};

export default DetailedWeatherView;