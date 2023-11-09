import React, { useState, useEffect, memo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import useResponsiveWidth from "./UseResponsiveWidth";
import PDFPage from "./PDFpage";
import DownloadBtn from "./DownloadBtn";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ file,id }) => {



  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };








  return (
    <>
   
    <div className="bg-gray-900 rounded-lg text-white p-4 ">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <div className="overflow-x-auto whitespace-nowrap scrollbar scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
          {Array.from(new Array(numPages), (_, index) => {
            const pageNumber = index + 1;
            return (
              <PDFPage
                key={pageNumber}
                pageNumber={pageNumber}
              />
            );
          })}
        </div>
      </Document>
      
      
  
   
    </div>
    <DownloadBtn id={id}/>
    </>
  );
};

export default PDFViewer;
