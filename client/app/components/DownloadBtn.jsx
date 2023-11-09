import baseUrl from '@/app/utils/baseUrl';
import showAlert from '../utils/showAlert';


function DownloadBtn({id,setLoading}) {

  async function download(pdfId) {
    // Construct the URL for the download endpoint
    const url = `${baseUrl}/pdf/download/${id}`;
  
    try {
      // Make the GET request to the server using the fetch API
      setLoading(true)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`, // Set the auth header
          'Content-Type': 'application/json',
        },
      });
      setLoading(false)
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
        console.error(`Download error: ${error.message}`);
        showAlert("Download Error","please try again","error")
      }
    } catch (error) {
      // Handle network errors
      setLoading(false)
      console.error('Download failed', error);
      showAlert("Oops ! , something went wrong","please try again later","error")
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
