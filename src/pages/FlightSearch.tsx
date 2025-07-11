import React from 'react';
import FlightCard from '../components/FlightCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import PageSizeSelector from '../components/PageSizeSelector';
import PaginationInfo from '../components/PaginationInfo';
import useFlightSearch from '../hooks/useFlightSearch';

const FlightSearch: React.FC = () => {
  const {
    flightNumber,
    setFlightNumber,
    flights,
    isLoading,
    error,
    searched,
    handleSearch,
    pagination,
    currentPage,
    totalPages,
    limit,
    changePageSize,
    goToPage
  } = useFlightSearch();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto mb-10">
          {/* Search Box */}
          <div className="bg-white p-6 rounded-3xl shadow-md mb-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Flight Search</h1>
            
            <form onSubmit={handleSearch}>
              <div className="mb-4">
                <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Flight Number (e.g., EY7076)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="flightNumber"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter flight number"
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? <LoadingSpinner /> : 'Search'}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md mt-2">
                  {error}
                </div>
              )}
              
              <div className="text-sm text-gray-500 mt-2">
                Note: You need to add your AviationStack API key to the .env file as VITE_AVIATION_API_KEY.
              </div>
            </form>
          </div>
        </div>
        
        {isLoading && (
          <div className="bg-white p-6 rounded-3xl shadow-md mb-6 flex justify-center">
            <LoadingSpinner />
          </div>
        )}
        
        {!isLoading && searched && flights.length === 0 && !error && (
          <div className="bg-white p-6 rounded-3xl shadow-md mb-6 text-center text-gray-500">
            No flights found with the provided flight number.
          </div>
        )}
        
        {!isLoading && flights.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-700">
                Found {pagination?.total || flights.length} flight{(pagination?.total || flights.length) !== 1 ? 's' : ''}
              </h2>
              <PageSizeSelector 
                pageSize={limit} 
                onPageSizeChange={changePageSize}
                isLoading={isLoading}
              />
            </div>
            
            {pagination && pagination.total > 0 && (
              <PaginationInfo
                currentPage={currentPage}
                pageSize={limit}
                totalItems={pagination.total}
              />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
              {flights.map((flight, index) => (
                <div key={`${flight.flight.iata}-${index}`}>
                  <FlightCard flight={flight} />
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch; 