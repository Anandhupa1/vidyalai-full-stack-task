import baseUrl from '@/app/utils/baseUrl';
import Link from 'next/link'
import React from 'react'


function DownloadBtn({id}) {
  
  async function download(pdfId) {
    // Construct the URL for the download endpoint
    const url = `${baseUrl}/pdf/download/${id}`;
  
    try {
      // Make the GET request to the server using the fetch API
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`, // Set the auth header
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the request was successful
      if (response.ok) {
        // Extract the filename from the Content-Disposition header
        const contentDisposition = response.headers.get('Content-Disposition');
        const match = contentDisposition && contentDisposition.match(/filename="(.+)"/);
        const filename = (match && match[1]) || `${id}-editor.pdf`;
        
        // Download the PDF Blob
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        // If the server response was not ok, handle errors
        const error = await response.json();
        alert(`Download error: ${error.message}`);
      }
    } catch (error) {
      // Handle network errors
      console.error('Download failed', error);
      alert("Oops, something went wrong, please try again later..");
    }
  }
  
  return (

  <div className="flex p-0  sm:flex-row items-start justify-start mt-10">
    <Link href={`/edit/${id}`}>
      <a className="btn btn-outline btn-primary mr-4 mb-4 sm:mb-0 ">Edit</a> {/* Use 'a' instead of 'button' for Link */}
    </Link>
    <button onClick={() => { download(id) }} className="btn btn-primary">Download</button>
  </div>


  )
}

export default DownloadBtn
