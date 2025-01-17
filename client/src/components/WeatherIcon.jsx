import React from 'react';
import SnowIcon from '../assets/snow.svg';
import ThunderstormIcon from '../assets/thunderstorms-night-rain.svg';
import ClearDayIcon from '../assets/clear-day.svg';
import PartlyCloudyIcon from '../assets/partly-cloudy-day.svg';
import RainIcon from '../assets/rainIcon.svg';
import FogIcon from '../assets/fog.svg';

const WeatherIcon = ({ condition }) => {
  const icons = {
    Snow: SnowIcon,
    Thunderstorm: ThunderstormIcon,
    Clear: ClearDayIcon,
    'Partly Cloudy': PartlyCloudyIcon,
    Rain: RainIcon,
    Fog: FogIcon,
  };

  const iconSrc = icons[condition];

  if (!iconSrc) {
    console.error(`No icon found for condition: ${condition}`);
    return null; // Return null or a default icon if the condition is not found
  }

  return <img src={iconSrc} alt={condition} style={{ width: '60px', height: '60px' }} />;
};

export default WeatherIcon;