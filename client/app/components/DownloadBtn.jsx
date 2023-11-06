import baseUrl from '@/app/utils/baseUrl';
import Link from 'next/link'
import React from 'react'


function DownloadBtn({id}) {
 // Assuming you have a function to get the authentication token
function getAuthToken() {
    // Retrieve your auth token from where it's stored (e.g., local storage, state management)
    return 'your-auth-token';
  }
  
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



    <button
           onClick={() => { download(id) }}
          className="text-green-500 hover:text-green-700 transition-colors duration-200"
                    >
                      Download
                    </button>



  )
}

export default DownloadBtn
