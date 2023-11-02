"use client"
// pages/upload.js
import FileUploadButton from '../components/FileUploadButton';

const UploadPage = () => {
  const handleFileSelect = (file) => {
    console.log('Selected File:', file);
    // TODO: Handle the file as needed
  };

  return (
    <main className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center text-white p-4">
      <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm flex flex-col p-6 bg-zinc-800 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-white">Upload a PDF</h1>
        <FileUploadButton onFileSelect={handleFileSelect} />
      </div>
      
      

 

     
    </main>
  );
};

export default UploadPage;
