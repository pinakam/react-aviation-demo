import React from 'react';

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  options?: number[];
  isLoading?: boolean;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ 
  pageSize, 
  onPageSizeChange, 
  options = [10, 25, 50, 100],
  isLoading = false
}) => {
  return (
    <div className={`flex items-center text-sm text-gray-600 ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}>
      <span className="mr-2">Show</span>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="ml-2">results per page</span>
    </div>
  );
};

export default PageSizeSelector; 