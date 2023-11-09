import baseUrl from '@/app/utils/baseUrl';
import showAlert from '@/app/utils/showAlert';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'



function UpdateForm({id,selectedPages,setLoading}) {
  const pdfName=useRef("");
  const router = useRouter();
    async function create(e){
        e.preventDefault();
        try {
        setLoading(true)
        let res = await fetch(`${baseUrl}/pdf/extract-pages`, {
            method: 'POST',
            body: JSON.stringify({
                pdfId:id,
                pages:selectedPages,
                newPdfName:pdfName.current.value
               
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
        
        let data = await res.json();
        
        if(res.ok){showAlert(data.message,"","success");router.push(`/view/${data.newPdfId}`)}
        else {
          setLoading(false)
          showAlert(data.message)}
        
        
        } catch (error) {
          setLoading(false)
            showAlert("Oops ..","something went wrong , please try again later","error")
            console.error("error in uploading new pdf ",error)
        }
       
    }
    

  return (
<div className="bg-gray-900 rounded-lg text-white p-4 mt-10 pb-10 w-full  mx-auto">
  <div className="flex flex-col sm:flex-row items-center justify-between">
    <form onSubmit={create} >
    <input 
      ref={pdfName}
      type="text" required
      className="input input-bordered flex-grow mb-2 sm:mb-0 sm:mr-2" 
      placeholder="Enter a name to the pdf" 
    />
    <input type="submit"   className="btn btn-primary rounded-lg"/>
    
    </form>
  </div>
</div>

  )
}

export default UpdateForm
