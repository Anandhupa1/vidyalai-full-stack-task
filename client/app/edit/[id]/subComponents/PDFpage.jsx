import React, { useState, useEffect, memo } from "react";
import useResponsiveWidth from "./UseResponsiveWidth";
import { Document, Page, pdfjs } from "react-pdf";

const PDFPage = memo(({ pageNumber, selected, onSelect }) => {
    const pageWidth = useResponsiveWidth();
  
    return (
      <div
        onClick={() => onSelect(pageNumber)}
        className={`relative w-34 h-48 border inline-block ${selected ? 'border-blue-500' : 'border-white'}
         rounded-md overflow-hidden shadow-xl cursor-pointer m-2`}
      >
        <Page pageNumber={pageNumber} width={150} height={200} />
        <div className="absolute top-2 left-2 flex items-center">
          <input
            type="checkbox"
            checked={selected}
            readOnly
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-300 rounded"
          />
          <span className="ml-2 text-black">{pageNumber}</span>
        </div>
      </div>
    );
  });

  export default PDFPage;