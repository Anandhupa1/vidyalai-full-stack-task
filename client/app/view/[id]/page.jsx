"use client"
import { isValidObjectId } from '@/app/utils/validations'
import  { useState } from 'react';
import PDFViewer from './subComponents/ViewPdf';
import baseUrl from '@/app/utils/baseUrl';
import Loader from '@/app/components/Loader';
import showAlert from '@/app/utils/showAlert';
import Navbar from '@/app/components/Navbar';



function Page({params:{id}}) {
  const [file, setFile] = useState(null);
  const [Loading ,setLoading]=useState(true);
  useState(async()=>{
    if(!isValidObjectId(id)){ return <h1>pdf not found</h1>}
    else{
    try {
        setLoading(true)
        const response = await fetch(`${baseUrl}/pdf/${id}`);

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const blob = await response.blob();
        const file = new File([blob], "filename.pdf", { type: "application/pdf" });
        setFile(file);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        showAlert("Error","something went wrong , please try again later..","error")
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
  },[])

  return (
    <>
     <Navbar/>
    
    <div className="dark:bg-gray-800  bg-white min-h-screen transition-colors duration-300 mt-10">
    {Loading && <Loader/>}
    <div className="container mx-auto px-5">
      <header className="py-10">
        <h1 className="text-3xl font-bold dark:text-white"> Your File</h1>
      </header>

      <main>
      {file && <PDFViewer file={file} id={id}/>}
      </main>

    </div>
  </div>
  </>
  )
  }




export default Page