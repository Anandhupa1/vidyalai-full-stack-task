import baseUrl from '@/app/utils/baseUrl';
import React, { useRef } from 'react'



function UpdateForm({id,selectedPages}) {
  const pdfName=useRef("")
    async function create(e){
        e.preventDefault();
        try {
            
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
        alert(JSON.stringify(data.message))
        window.location.href=`/view/${data.newPdfId}`
        } catch (error) {
            alert("something went wrong ")
            console.log(error)
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
