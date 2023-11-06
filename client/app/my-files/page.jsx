"use client"
import baseUrl from '@/app/utils/baseUrl';
import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import ShareBtn from '../components/ShareBtn';
import Link from 'next/link';
import DownloadBtn from '../components/DownloadBtn';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

function Page() {
  const [pdfData, setPdfData] = useState({
    totalPages: 0,
    currentPage: 1,
    limit: 8,
    items: [],
  });
  const [error, setError] = useState(null);
  const [currentPdfUrl, setCurrentPdfUrl] = useState("");

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!window.sessionStorage.getItem("token")) {
        router.push('/login');
      } else {
        try {
          const limit = pdfData.limit; // You can also make this dynamic
          const response = await fetch(`${baseUrl}/pdf/user-pdfs?page=${pdfData.currentPage}&limit=${limit}`, {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
          }

          const data = await response.json();
          setPdfData(prevState => ({
            ...prevState,
            totalPages: data.totalPages,
            items: data.items
          }));
        } catch (error) {
          setError('Something went wrong, please try again later.');
          console.error('There has been a problem with your fetch operation:', error);
        }
      }
    })();
  }, [pdfData.currentPage, router]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pdfData.totalPages) {
      setPdfData(prevState => ({
        ...prevState,
        currentPage: newPage
      }));
    }
  };

  const formatDateTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar/>
      <div className="dark:bg-gray-800 bg-white min-h-screen transition-colors duration-300">
        <div className="container mx-auto px-5 py-20">
          <main>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-6">My Files</h1>

            {pdfData.items.length === 0 ? (
              <>
                <p className="text-gray-600 dark:text-gray-400">No files found.</p>
                <div className="flex mt-5">
                  <button className='btn btn-primary'>Upload</button>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pdfData.items.map((pdf) => (
                  <div key={pdf._id} className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg p-4">
                    <div className="mb-2">
                      <div className='flex justify-between w-full align-top'>
                        <h5 className="text-lg font-bold text-gray-800 pt-3 dark:text-white">{pdf.originalName.split("-")[0] + ".pdf"}</h5>
                        <ShareBtn url={`/view/${pdf._id}`} />
                      </div>
                      <p className="text-sm text-gray-600 pt-3 dark:text-gray-400">
                        {formatDateTime(pdf.createdAt)}
                      </p>
                    </div>
                    <div className="flex justify-between pt-3 items-top">
                      <Link
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                        href={`/edit/${pdf._id}`}
                      >
                        edit
                      </Link>
                      <DownloadBtn id={pdf._id} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {pdfData.items.length > 0 && <Pagination
              currentPage={pdfData.currentPage}
              totalPages={pdfData.totalPages}
              onPageChange={handlePageChange}
            />}
          </main>
        </div>
      </div>
    </>
  );
}

export default Page;
