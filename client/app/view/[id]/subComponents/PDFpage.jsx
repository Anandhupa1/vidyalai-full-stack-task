import React, { useState, useEffect, memo } from "react";
import useResponsiveWidth from "./UseResponsiveWidth";
import { Document, Page, pdfjs } from "react-pdf";

const PDFPage = memo(({ pageNumber, selected, onSelect }) => {
    const pageWidth = useResponsiveWidth();
  
    return (
      <div
        
        className={`relative w-34 h-48 border inline-block
         rounded-md overflow-hidden shadow-xl m-2`}
      >
        <Page pageNumber={pageNumber} width={150} height={200} />
        <div className="absolute top-2 left-2 flex items-center">
          <span className="ml-2 text-black">{pageNumber}</span>
        </div>
      </div>
    );
  });

  export default PDFPage;