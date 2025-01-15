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
  
  return <img src={icons[condition]} alt={condition} style={{ width: '60px', height: '60px' }} />;
};

export default WeatherIcon;