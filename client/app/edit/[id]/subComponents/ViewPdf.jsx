import React, { useState, useEffect, memo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import DraggablePageList from "./DragAndDrop";
import { DragDropContext } from "react-beautiful-dnd";
import useResponsiveWidth from "./UseResponsiveWidth";
import PDFPage from "./PDFpage";
import UpdateForm from "./UpdateForm";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ file,id,setLoading }) => {
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
    <>
    <div className="bg-gray-900 rounded-lg text-white p-4">
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
      
      
      
    {/* drag and drop  starts here*/}
    <div className="bg-gray-900 text-white ">
     
      <DragDropContext onDragEnd={onDragEnd}>
        <DraggablePageList
          file={file}
          selectedPages={selectedPages}
          setSelectedPages={setSelectedPages}
        />
      </DragDropContext>
    </div>
    {/* drag and drop endds */}
   
    </div>
   {selectedPages.length>0 && <UpdateForm selectedPages={selectedPages} setLoading={setLoading} id={id}/>}
   
    </>
  );
};

export default PDFViewer;
