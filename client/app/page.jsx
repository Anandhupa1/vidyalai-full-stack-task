import React from 'react';
import Link from 'next/link';


function Page() {
  return (
    <>
      {/* <Navbar/> */}
      <div 
        className="dark:bg-gray-800 hero min-h-screen bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url('https://wallpapers.com/images/hd/ultra-wide-fantasy-art-winter-night-i0b7s1ki7ul74kjj.jpg')` }}
      >
        <div className="hero-overlay bg-opacity-60"></div> {/* Darken the background image a bit */}
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Pdf Manager</h1>
            <p className="py-6">
              Streamline Your PDFs with Ease: Edit, Rearrange, and Master Your Documents in Clicks!
            </p>
            <Link href={"/my-files"}>
            
            <button className="btn bg-white text-black border-none hover:bg-gray-100">
              Get Started
            </button>
           

            </Link>
          </div>
        </div>
      </div>
      
      {/* <div className="container mx-auto px-4 my-8 ">
        <div className="flex justify-center ">
          <img 
            src="your-gif-link.gif" 
            alt="PDF Manager in action" 
            className="w-full max-w-lg object-contain" 
            style={{ maxHeight: '50vh' }} 
          />
        </div>
      </div> */}
    </>
  )
}

export default Page;
