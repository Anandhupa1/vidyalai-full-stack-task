import React, { useState, useEffect, memo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {LiaTrashAltSolid} from "react-icons/lia"
import DraggablePageList from "./DragAndDrop";
import { DragDropContext } from "react-beautiful-dnd";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useResponsiveWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (width < 640) return 100; // Tailwind sm breakpoint
  if (width < 768) return 135; // Tailwind md breakpoint
  return 200; // Tailwind lg breakpoint
};

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




const PDFViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageSelect = (pageNumber) => {
    if (selectedPages.includes(pageNumber)) {
      setSelectedPages(selectedPages.filter(page => page !== pageNumber));
    } else {
      setSelectedPages([...selectedPages, pageNumber]);
    }
  };


// Drag and drop starts here
const onDragEnd = (result) => {
  if (!result.destination) return;

  const itemsArray = Array.from(selectedPages);
  const [reorderedItem] = itemsArray.splice(result.source.index, 1);
  itemsArray.splice(result.destination.index, 0, reorderedItem);

  setSelectedPages(itemsArray);
};
// Drag and drop ends here



  return (
    <div className="bg-gray-900 text-white p-4">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <div className="overflow-x-auto whitespace-nowrap scrollbar scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
          {Array.from(new Array(numPages), (_, index) => {
            const pageNumber = index + 1;
            return (
              <PDFPage
                key={pageNumber}
                pageNumber={pageNumber}
                selected={selectedPages.includes(pageNumber)}
                onSelect={handlePageSelect}
              />
            );
          })}
        </div>
      </Document>

       
    {/* drag and drop */}
    <div className="bg-gray-900 text-white p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* ... other components ... */}
        <DraggablePageList
          file={file}
          selectedPages={selectedPages}
          setSelectedPages={setSelectedPages}
        />
      </DragDropContext>
    </div>
    {/* drag and drop endds */}
   
    </div>
  );
};

export default PDFViewer;
