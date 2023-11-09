import baseUrl from '@/app/utils/baseUrl';
import showAlert from '../utils/showAlert';


function DeleteBtn({id,reloadData, setLoading}) {

  async function deleteFile(pdfId) {
    // Construct the URL for the download endpoint
    const url = `${baseUrl}/pdf/delete/${id}`;
    
    try {
      // Make the GET request to the server using the fetch API
      setLoading(true)
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`, // Set the auth header
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();
      setLoading(false)
      reloadData();
      if(response.ok){
        showAlert("Successfully Deleted","","success")
      }
      else {showAlert("Oops ! , something went wrong","please try again later","error")}
      
    } catch (error) {
      // Handle network errors
      setLoading(false)
      console.error('Deletion failed', error);
      showAlert("Oops ! , something went wrong","please try again later","error")
    }
  }
  
  return (



    <button
           onClick={() => { deleteFile(id) }}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      Delete
                    </button>



  )
}

export default DeleteBtn
