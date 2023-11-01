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
      <label
        htmlFor="file-upload"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition cursor-pointer inline-block text-center"
      >
        Browse PDF
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
