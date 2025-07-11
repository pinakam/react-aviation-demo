import axios from 'axios';
import moment from 'moment';

const API_BASE_URL = 'https://api.aviationstack.com/v1';
const API_KEY = import.meta.env.VITE_AVIATION_API_KEY;

export interface FlightResponse {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: Flight[];
}

export interface Flight {
  flight_date: string;
  flight_status: string;
  departure: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    delay: number | null;
    scheduled: string | null;
    estimated: string | null;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  arrival: {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    baggage: string | null;
    delay: number | null;
    scheduled: string | null;
    estimated: string | null;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
  };
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
  flight: {
    number: string;
    iata: string;
    icao: string;
    codeshared: {
      airline_name: string;
      airline_iata: string;
      airline_icao: string;
      flight_number: string;
      flight_iata: string;
      flight_icao: string;
    } | null;
  };
  aircraft: null | any;
  live: null | any;
}

export interface SearchParams {
  flight_number?: string;
  flight_date?: string;
  limit?: number;
  offset?: number;
}

export const searchFlightByNumber = async (
  flightNumber: string,
  page: number = 1,
  limit: number = 10
): Promise<FlightResponse> => {
  try {
    const currentDate = moment().format('YYYY-MM-DD');
    const offset = (page - 1) * limit;
    
    const response = await axios.get(`${API_BASE_URL}/flights`, {
      params: {
        access_key: API_KEY,
        flight_iata: flightNumber,
        flight_date: currentDate,
        limit,
        offset,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};

export const searchFlights = async (params: SearchParams): Promise<FlightResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/flights`, {
      params: {
        access_key: API_KEY,
        ...params,
        flight_date: params.flight_date || moment().format('YYYY-MM-DD')
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
}; 