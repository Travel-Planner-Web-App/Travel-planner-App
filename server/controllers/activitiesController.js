const activities = {
    sunny: ["Hiking", "Beach", "Cycling"],
    rainy: ["Museum Visit", "Board Games", "Cooking Class"],
    cloudy: ["Shopping", "Photography", "Cafe Hopping"],
  };
  
  const getActivities = (req, res) => {
    const { condition } = req.query;
  
    if (!condition) {
      return res.status(400).json({ error: "Weather condition is required." });
    }
  
    const suggestions = activities[condition.toLowerCase()] || [];
    res.status(200).json({ activities: suggestions });
  };
  
  module.exports = { getActivities };
  