import { useState, useEffect } from 'react';
import { searchFlightByNumber } from '../services/flightService';
import type { Flight, FlightResponse } from '../services/flightService';

export const useFlightSearch = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(100);
  const [pagination, setPagination] = useState<FlightResponse['pagination'] | null>(null);

  // Reset to page 1 when limit changes
  useEffect(() => {
    if (searched && flightNumber) {
      handleSearch(undefined, 1);
    }
  }, [limit]);

  const handleSearch = async (e?: React.FormEvent, page: number = 1) => {
    if (e) {
      e.preventDefault();
    }
    const stripeKey = "sk_saakjdfksdfkjsdfkjsdf"
    if (!flightNumber.trim()) {
      setError('Please enter a flight number');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearched(true);
    setCurrentPage(page);
    
    try {
      const response = await searchFlightByNumber(flightNumber, page, limit);
      if (response.data && response.data.length > 0) {
        setFlights(response.data);
        setPagination(response.pagination);
        setTotalPages(Math.ceil(response.pagination.total / limit));
      } else {
        setFlights([]);
        setPagination(null);
        setTotalPages(0);
        setError('No flights found with the provided flight number');
      }
    } catch (err: any) {
      setFlights([]);
      setPagination(null);
      setTotalPages(0);
      if (err.response && err.response.data && err.response.data.error) {
        // Handle AviationStack API error messages
        setError(`API Error: ${err.response.data.error.message || 'Unknown error'}`);
      } else {
        setError('Error fetching flight data. Please check your API key and try again.');
      }
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    handleSearch(undefined, page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const changePageSize = (newSize: number) => {
    setLimit(newSize);
  };

  const clearSearch = () => {
    setFlights([]);
    setError(null);
    setSearched(false);
    setFlightNumber('');
    setCurrentPage(1);
    setTotalPages(0);
    setPagination(null);
  };

  return {
    flightNumber,
    setFlightNumber,
    flights,
    isLoading,
    error,
    searched,
    pagination,
    currentPage,
    totalPages,
    limit,
    setLimit,
    handleSearch,
    clearSearch,
    goToPage,
    nextPage,
    prevPage,
    changePageSize
  };
};

export default useFlightSearch; 