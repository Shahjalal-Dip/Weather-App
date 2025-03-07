# Weather App - PERN Stack

A full-stack weather application built with the PERN stack (PostgreSQL, Express, React, Node.js) that allows users to search for weather information, create an account, and save their favorite locations.

## Features

- User registration and authentication
- Weather search by city name
- Save and manage favorite locations
- Responsive design for all devices
- Real-time weather data from OpenWeatherMap API

## Prerequisites

- Node.js and npm
- PostgreSQL database
- OpenWeatherMap API key

## Setup Instructions

### Backend Setup

1. Navigate to the server directory and install dependencies:
   ```
   cd backend
   npm install
   ```

2. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   DB_USER=your_postgres_username
   DB_HOST=localhost
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432
   JWT_SECRET=your_secret_key_for_jwt
   ```

3. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

2. Create a `.env` file in the client directory with your OpenWeatherMap API key:
   ```
   REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
weather-app/
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context providers
│   │   ├── services/      # API service functions
│   │   ├── App.jsx        # Main App component
│   │   ├── index.js       # Entry point
│   │   └── styles.css     # Global styles
│   ├── .env               # Environment variables
│   └── package.json
├── backend/               # Express backend
│   ├──config/             # database connection
│   ├──controllers/        # controls routes
│   ├──middleware/         # authenticateToken
│   ├──models/             # database schema
│   ├──routes/             # serve routes
│   ├── server.js          # Main server file
│   ├── .env               # Environment variables
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user
- `GET /api/auth/check` - Check if user is authenticated

### Locations
- `GET /api/locations` - Get all saved locations for the authenticated user
- `POST /api/locations` - Save a new location
- `DELETE /api/locations/:id` - Delete a saved location

## Technologies Used

- **Frontend**: React, React Router, Context API
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT, bcrypt
- **API**: OpenWeatherMap API


## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API