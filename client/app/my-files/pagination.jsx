import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Create an array from 1 to totalPages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handler when a page number is clicked
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-start mt-10 space-x-1">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
      >
        Previous
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 text-sm rounded transition-colors ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
