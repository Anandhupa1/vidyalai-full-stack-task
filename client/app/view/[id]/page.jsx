"use client"
import { isValidObjectId } from '@/app/utils/validations'
import  { useState } from 'react';
import PDFViewer from './subComponents/ViewPdf';
import baseUrl from '@/app/utils/baseUrl';




function page({params:{id}}) {
  if(!isValidObjectId(id)){ return <h1>pdf not found</h1>}
  else if(!sessionStorage.getItem("token")){ window.location.href="/login"}
  else {
  const [file, setFile] = useState(null);
  useState(async()=>{
    try {
        const response = await fetch(`${baseUrl}/pdf/${id}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`, // add your token here
          },
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const blob = await response.blob();
        const file = new File([blob], "filename.pdf", { type: "application/pdf" });
        setFile(file);
      } catch (error) {
        alert("something went wrong , please try again later..")
        console.error('There has been a problem with your fetch operation:', error);
      }
  },[])
  

  return (
    <>
    <div className="dark:bg-gray-800  bg-white min-h-screen transition-colors duration-300">
    <div className="container mx-auto px-5 py-20">
      
      <main>
      {file && <PDFViewer file={file} id={id}/>}
      </main>
      

    </div>
  </div>
  
  </>
  )
  }
}



export default page
