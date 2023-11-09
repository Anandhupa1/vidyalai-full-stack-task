"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Loader from './Loader';

const FileUploadButton = ({ onFileSelect }) => {
  const [loading,setLoading]=useState(false)
  const router = useRouter();
  
  const [fileName, setFileName] = useState('Browse a file');


  const handleFileChange = (event) => {

    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  
  };

  return (
    <div className="w-full">
      <label
        htmlFor="file-upload"
        className="w-full bg-gray-500 text-white p-2 rounded-md transition cursor-pointer inline-block text-center"
      >
       {fileName}
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <p className="text-gray-300 mt-2 text-xs">{fileName}</p>
    </div>
  );
  
};

export default FileUploadButton;
