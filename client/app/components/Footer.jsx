import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-6 md:mb-0">
          
          <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
                Pdf Editor
           
            </Link>
          </div>
          <div className="w-full md:w-auto">
            <ul className="flex flex-wrap items-center justify-center md:justify-end">
              <li>
                <Link href="/" className="text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 mx-2 my-2 md:my-0">
                    Home
                 
                </Link>
              </li>
              <li>
                <Link href="/my-files" className="text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 mx-2 my-2 md:my-0">
                    Dashboard
               
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 mx-2 my-2 md:my-0">
                    Upload file
             
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 mx-2 my-2 md:my-0">
                    Login
     
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 mx-2 my-2 md:my-0">
                    Register
            
                </Link>
              </li>
              {/* Add more links here */}
            </ul>
          </div>
        </div>
        <div className="border-t mt-4 pt-4">
          <p className="text-center text-gray-800 dark:text-white text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
