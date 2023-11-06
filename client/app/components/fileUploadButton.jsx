import React, { useState } from 'react';

const FileUploadButton = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState('No file selected');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      
    
      <p className="text-gray-300 mt-2 text-xs">{fileName}</p>
    </div>
  );
};

export default FileUploadButton;
