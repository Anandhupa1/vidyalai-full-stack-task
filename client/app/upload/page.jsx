"use client"
import FileUploadButton from '../components/FileUploadButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import baseUrl from '../utils/baseUrl';

const UploadPage = () => {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('pdf', selectedFile);

        const response = await fetch(`${baseUrl}/pdf/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          alert('File uploaded successfully!');
          setSelectedFile(null); // Clear the selected file after upload
          router.push(`/edit/${data._id}`); // Redirect to the /edit route
        } else {
         
          alert(`File upload failed: ${data.error}`);
        }
      } catch (error) {
        alert('Something went wrong, please try again later.');
        console.error('There has been a problem with your fetch operation:', error);
      }
    } else {
      alert('No file selected. Please select a file to upload.');
    }
  };

  return (
    <main className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center text-white p-4">
      <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm flex flex-col p-6 bg-zinc-800 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-white">Upload a PDF</h1>
        <FileUploadButton onFileSelect={handleFileSelect} />
        {selectedFile && (
          <button
            className="btn btn-primary"
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
      </div>
    </main>
  );
};

export default UploadPage;
