const express = require("express");
const cors = require("cors");
require("dotenv").config();

const weatherRoutes = require("./routes/weather");
// const activitiesRoutes = require("./routes/activities");
const favoritesRoutes = require("./routes/favorites");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);
// app.use("/api/activities", activitiesRoutes);
app.use("/api/favorites", favoritesRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
