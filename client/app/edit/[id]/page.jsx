"use client"
import { isValidObjectId } from '@/app/utils/validations';
import { useEffect, useState } from 'react';
import PDFViewer from './subComponents/ViewPdf';
import baseUrl from '@/app/utils/baseUrl';
import { useRouter } from 'next/navigation';
import showAlert from '@/app/utils/showAlert';
import Loader from '@/app/components/Loader';
import Navbar from '@/app/components/Navbar';

function Page({ params: { id } }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading]=useState(false);
  const router = useRouter()
  useEffect(() => {
    (async () => {
      if (!isValidObjectId(id)) {
        showAlert("Please put a valid object id as param","","warning")
        return;
      }

      try {
        setLoading(true)
        const response = await fetch(`${baseUrl}/pdf/${id}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const blob = await response.blob();
        const file = new File([blob], "filename.pdf", { type: "application/pdf" });
        setFile(file);
        setLoading(false);
      } catch (error) {
        setLoading(false)
        showAlert("Error","something went wrong, please try again later..","error")
        console.error('There has been a problem with your fetch operation:', error);
      }
    })();
  }, [id]);

  if (!isValidObjectId(id)) {
    return <h1>pdf not found</h1>;
  } else if (!sessionStorage.getItem("token")) {
    router.push("/login")
  } else {
    return (
      <>
      {loading && <Loader/>}
      <Navbar/>
      <div className="dark:bg-gray-800 bg-white min-h-screen transition-colors duration-300">
        <div className="container mx-auto px-5">
          <header className="py-10">
            <h1 className="text-3xl font-bold dark:text-white">Edit Your PDF</h1>
          </header>

          <main>
            {file && <PDFViewer file={file} setLoading={setLoading} id={id} />}
          </main>
        </div>
      </div>
      </>
    );
  }
}

export default Page;
