import React from 'react';
import { Flight } from '../services/flightService';
import moment from 'moment';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const departureDelay = flight.departure.delay ? `${flight.departure.delay} min` : undefined;
  const arrivalDelay = flight.arrival.delay ? `${flight.arrival.delay} min` : undefined;
  const formattedDate = moment(flight.flight_date).format('YYYY-MM-DD');
  const operatedBy = flight.flight.codeshared?.airline_name;

  // Convert flight status to uppercase and format it
  const flightStatus = flight.flight_status.toUpperCase();
  
  // Extract city names from timezone
  const departureCity = flight.departure.timezone.split('/')[1] || flight.departure.timezone;
  const arrivalCity = flight.arrival.timezone.split('/')[1] || flight.arrival.timezone;
  
  return (
    <div className="w-full bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col">
      {/* Flight Info */}
      <div className="p-6 flex-grow">
        {/* Header with date and status */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-medium text-gray-800">{formattedDate}</div>
          <div className="text-xl font-bold uppercase text-gray-800">{flightStatus}</div>
        </div>

        {/* Flight route information */}
        <div className="flex justify-between items-center mb-6">
          {/* Departure */}
          <div className="text-left flex-1">
            <div className="text-6xl font-bold text-gray-900">{flight.departure.iata}</div>
            <div className="text-xl font-medium mt-2">{flight.departure.airport}</div>
            <div className="text-lg text-gray-600">{departureCity}</div>
            {departureDelay && <div className="text-lg text-gray-600 mt-2">Delay: {departureDelay}</div>}
          </div>

          {/* Arrow */}
          <div className="text-gray-400 mx-4 flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Arrival */}
          <div className="text-right flex-1">
            <div className="text-6xl font-bold text-gray-900">{flight.arrival.iata}</div>
            <div className="text-xl font-medium mt-2">{flight.arrival.airport}</div>
            <div className="text-lg text-gray-600">{arrivalCity}</div>
            {arrivalDelay && <div className="text-lg text-gray-600 mt-2">Delay: {arrivalDelay}</div>}
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Airline Info */}
      <div className="p-6 flex justify-between items-center">
        <div>
          <div className="text-2xl font-medium text-gray-800">{flight.airline.name}</div>
          {operatedBy && (
            <div className="text-gray-600 text-lg">
              Operated by {operatedBy.charAt(0).toUpperCase() + operatedBy.slice(1)}
            </div>
          )}
        </div>
        <div className="text-2xl font-bold text-gray-800">{flight.flight.iata}</div>
      </div>
    </div>
  );
};

export default FlightCard; 