# Flight Search Application

This is a React application that allows users to search for flight information using the AviationStack API.

## Features

- Search for flights by flight number
- Display flight details including departure and arrival information
- Show airline and codeshare details
- Responsive design with Tailwind CSS

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your AviationStack API key:
   ```
   VITE_AVIATION_API_KEY=your_api_key_here
   ```
   You can sign up for a free API key at [AviationStack](https://aviationstack.com/).

4. Start the development server:
   ```bash
   npm run dev
   ```

## How to Use

1. Enter a flight number (e.g., EY7076) in the search box
2. Click the "Search" button
3. View the flight details displayed in the card format

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios for API requests
- Moment.js for date formatting

## API Reference

This application uses the AviationStack API to fetch flight data. The API endpoint used is:

```
https://api.aviationstack.com/v1/flights?access_key=YOUR_ACCESS_KEY&flight_number=FLIGHT_NUMBER&flight_date=CURRENT_DATE
```

For more information about the API, visit the [AviationStack documentation](https://aviationstack.com/documentation).
