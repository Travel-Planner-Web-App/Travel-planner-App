# Installations
 - npm install @mui/material @emotion/react @emotion/styled
 - npm install @mui/icons-material


## Trip Planner App

## Overview
 -The Trip Planner App is designed to help users plan trips based on real-time weather conditions. By searching for a destination, users can view the weather forecast, get activity recommendations, and save favorite destinations. Additionally, users can explore destinations on an interactive map for better planning.

# Features
 - Search Destinations

 - Search for cities or locations to view trip details.
## Weather Integration

 - Displays real-time weather and a 7-day forecast, including temperature, humidity, wind speed, and conditions.
## Activity Recommendations

 - Suggests activities based on the current weather.
## Favorites List

 - Save frequently visited destinations for quick access.
 - Map Integration

 - View the destination on an interactive map.
## Technologies Used
 - Frontend: React.js, Material-UI (MUI)
 - Backend: Node.js, Express.js
 - Database: Firebase Firestore
 - APIs: OpenWeatherMap, Mapbox
 - Other Tools: Axios, Nodemon, dotenv, CORS
## Installation and Setup
Clone the repository:

bash
Copy code
git clone [repository_url]  
cd trip-planner  
Install dependencies:

bash
Copy code
npm install  
Configure environment variables:

Create a .env file and add:
env
Copy code
REACT_APP_WEATHER_API_KEY=your_weather_api_key  
REACT_APP_MAPBOX_API_KEY=your_mapbox_api_key  
Start the development server:

bash
Copy code
npm start  
Deploy the app:

## Use Firebase or other hosting services.
 - APIs Used
 - OpenWeatherMap API: Fetches real-time weather data and a 7-day forecast.
 - Mapbox API: Provides interactive map features to display destination locations.
## Challenges Faced
 - CORS Issues: Solved using CORS middleware in the backend.
 - Dynamic Activity Mapping: Addressed by creating a predefined dataset and API integration.
 - Responsive Design: Used Material-UI for a consistent look across devices.
## Future Enhancements
 - Add user authentication for a personalized experience.
 - Integrate local event and attraction data for more comprehensive trip planning.
 - Enable offline access for saved destinations.
 - Add a social sharing feature for trip details.


## App Documentation
 - https://docs.google.com/document/d/1xHxB7mUMPFRtco4zHVvPEWqtyTYUNmMedjD3ZLdkG7k/edit?usp=sharing