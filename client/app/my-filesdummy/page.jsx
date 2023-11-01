"use client"
import React, { useState } from 'react';
import PDFUpload from './pdfUploadbutton';
import baseUrl from '../utils/baseUrl';
import PDFViewer from './ViewPdf';


const Home = () => {
  if(!sessionStorage.getItem("token")){window.location.href="/login"}
  else{
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    if (!file) return alert("Please select a PDF file.");

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch(`${baseUrl}/pdf/upload`, {
        method: 'POST',
        body: formData,
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` } // if you need to add authorization
      });
      const data = await response.json();
      alert(JSON.stringify(data))
      // Here you can set the state with the uploaded PDF's data
    } catch (error) {
      console.error('File upload failed', error);
      alert('File upload failed');
    }
  };

  return (
    <div>
      <PDFUpload setFile={setFile} />
      <button onClick={handleSubmit}>Upload PDF</button>
      {file && <PDFViewer file={file} />}
      
    </div>
  );

  }
};

export default Home;
