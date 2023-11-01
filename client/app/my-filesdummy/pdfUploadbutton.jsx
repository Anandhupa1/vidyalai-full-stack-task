"use client"
import React, { useState } from 'react';

const PDFUpload = ({ setFile }) => {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleChange} />
    </div>
  );
};

export default PDFUpload;
