import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading = false
}) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;
  
  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than max pages to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're at the start or end
      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add page range
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <nav className={`flex items-center ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className={`px-3 py-1 rounded-l-lg border ${
            currentPage === 1 || isLoading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-500 hover:bg-blue-50'
          }`}
          aria-label="Previous page"
        >
          &laquo;
        </button>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 border-t border-b bg-white text-gray-500">...</span>
            ) : (
              <button
                onClick={() => typeof page === 'number' && onPageChange(page)}
                disabled={isLoading}
                className={`px-3 py-1 border-t border-b ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500 hover:bg-blue-50'
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
        
        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className={`px-3 py-1 rounded-r-lg border ${
            currentPage === totalPages || isLoading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-500 hover:bg-blue-50'
          }`}
          aria-label="Next page"
        >
          &raquo;
        </button>
      </nav>
    </div>
  );
};

export default Pagination; 