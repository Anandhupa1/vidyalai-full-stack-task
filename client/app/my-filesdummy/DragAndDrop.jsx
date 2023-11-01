import React from "react";
import { Document, Page } from "react-pdf";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {LiaTrashAltSolid} from "react-icons/lia"
const DraggablePageList = ({ file, selectedPages, setSelectedPages }) => {

  const removePage = (pageNumber) => {
    setSelectedPages(prevPages => prevPages.filter(page => page !== pageNumber));
  };

  if (!selectedPages || selectedPages.length === 0) {
    return <p className="text-center text-white mt-4">No pages selected</p>;
  }

  return (
    <Droppable droppableId="selectedPages" direction="horizontal">
      {(provided) => (
        <div
          className="mt-4  overflow-x-auto whitespace-nowrap scrollbar scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {selectedPages.map((pageNumber, index) => (
            <Draggable  className="mt-4 flex overflow-x-auto whitespace-nowrap scrollbar scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300"
            key={pageNumber} draggableId={String(pageNumber)} index={index}>
              {(provided) => (
                <div
                  className="relative w-34 h-48 m-2 overflow-hidden inline-block"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Document file={file}>

                    <Page pageNumber={pageNumber} width={150} height={200} />
                     <div className="absolute flex justify-between top-2 left-2 ">
            
            <span className="ml-2 text-black">{pageNumber}</span>
            <button  style={{color:"white", backgroundColor:"red",padding:"3px",borderRadius:"5px",marginLeft:"90px", fontSize:"20px"}} onClick={()=>{
              setSelectedPages(selectedPages.filter(num=>num!=pageNumber))
            }} className="btn-primary text-black">
              <LiaTrashAltSolid />
            </button>
            </div>
                  </Document>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DraggablePageList;
