"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import baseUrl from '../utils/baseUrl';
import FileUploadButton from '../components/fileUploadButton';
import showAlert from '../utils/showAlert';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';

const UploadPage = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect to login if no token is found, but only on the client side
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      router.push("/login");
    }
  }, [router]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    // Check for sessionStorage should be client-side only
    if (!sessionStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    if (selectedFile) {
      try {
        setLoading(true);
        
        const formData = new FormData();
        formData.append('pdf', selectedFile);

        const response = await fetch(`${baseUrl}/pdf/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        
        if (response.ok) {
          showAlert("Success", 'File uploaded successfully!', "success");
          setSelectedFile(null); // Clear the selected file after upload
          router.push(`/edit/${data._id}`); // Redirect to the /edit route
        } else {
          showAlert("Error", 'File upload failed, please try after some time', "error");
          console.error(data);
        }
      } catch (error) {
        showAlert("Error", 'Something went wrong, please try again later.', "error");
        console.error('There has been a problem with your fetch operation:', error);
      } finally {
        setLoading(false);
      }
    } else {
      showAlert("No file Selected", 'Please select a file to upload.', "warning");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Navbar />
      <main className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center text-white p-4">
        <div className="z-10 max-w-lg w-full items-center justify-between font-mono text-sm flex flex-col p-6 bg-zinc-800 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold mb-6 text-white">Upload a PDF</h1>
          <FileUploadButton onFileSelect={handleFileSelect} />
          {selectedFile && (
            <button
              className="w-full mt-10 bg-blue-500 text-white p-2 rounded-md transition cursor-pointer inline-block text-center"
              onClick={handleUpload}
            >
              Upload
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default UploadPage;
