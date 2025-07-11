import React from 'react';

interface PaginationInfoProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({ currentPage, pageSize, totalItems }) => {
  const startItem = Math.min((currentPage - 1) * pageSize + 1, totalItems);
  const endItem = Math.min(currentPage * pageSize, totalItems);
  
  return (
    <div className="text-sm text-gray-600 text-center mt-4">
      Showing {startItem} to {endItem} of {totalItems} results
    </div>
  );
};

export default PaginationInfo; 