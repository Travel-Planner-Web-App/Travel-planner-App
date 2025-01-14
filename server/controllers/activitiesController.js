const activities = {
    sunny: ["Hiking", "Beach", "Cycling"],
    rainy: ["Museum Visit", "Board Games", "Cooking Class"],
    cloudy: ["Shopping", "Photography", "Cafe Hopping"],
  };
  // /* { date: '2025-01-14', day: { condition: { text: 'Snow', icon: 'snow' }, avgtemp_c: 15 } },
  //   { date: '2025-01-15', day: { condition: { text: 'Thunderstorm', icon: 'thunderstorms-night-rain' }, avgtemp_c: 18 } },
  //   { date: '2025-01-16', day: { condition: { text: 'Clear', icon: 'clear-day' }, avgtemp_c: 12 } },
  //   { date: '2025-01-17', day: { condition: { text: 'Partly Cloudy', icon: 'partly-cloudy-day' }, avgtemp_c: 14 } },
  //   { date: '2025-01-18', day: { condition: { text: 'Rain', icon: 'rain' }, avgtemp_c: 13 } },
  //   { date: '2025-01-19', day: { condition: { text: 'Fog', icon: 'fog' }, avgtemp_c: 11 } },
  //   { date: '2025-01-20', day: { condition: { text: 'Snow', icon: 'snow' }, avgtemp_c: 10 } },
  //  */

  
  const getActivities = (req, res) => {
    const { condition } = req.query;
  
    if (!condition) {
      return res.status(400).json({ error: "Weather condition is required." });
    }
  
    const suggestions = activities[condition.toLowerCase()] || [];
    res.status(200).json({ activities: suggestions });
  };
  
  module.exports = { getActivities };
  