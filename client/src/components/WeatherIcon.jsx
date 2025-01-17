import React from 'react';
import { FaSun, FaCloudSun, FaCloudShowersHeavy, FaSnowflake, FaCloud } from 'react-icons/fa'; // Import weather icons

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

export default WeatherIcon;