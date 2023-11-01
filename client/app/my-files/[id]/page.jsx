"use client"
// pages/upload.js
import FileUploadButton from '../../components/FileUploadButton';

const UploadPage = () => {
  const handleFileSelect = (file) => {
    console.log('Selected File:', file);
    // TODO: Handle the file as needed
  };

  return (
    <main className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center text-white p-4">
      


      <div className="mb-8 md:mb-32 grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-4 lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
  <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    target="_blank" rel="noopener noreferrer">
    <h2 className="mb-3 text-xl md:text-2xl font-semibold">
      Docs <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
    </h2>
    <p className="m-0 max-w-[30ch] text-sm opacity-50">
      Find in-depth information about Next.js features and API.
    </p>
  </a>
  <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    target="_blank" rel="noopener noreferrer">
    <h2 className="mb-3 text-xl md:text-2xl font-semibold">
      Docs <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
    </h2>
    <p className="m-0 max-w-[30ch] text-sm opacity-50">
      Find in-depth information about Next.js features and API.
    </p>
  </a>
  <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    target="_blank" rel="noopener noreferrer">
    <h2 className="mb-3 text-xl md:text-2xl font-semibold">
      Docs <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
    </h2>
    <p className="m-0 max-w-[30ch] text-sm opacity-50">
      Find in-depth information about Next.js features and API.
    </p>
  </a>
  <a href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    target="_blank" rel="noopener noreferrer">
    <h2 className="mb-3 text-xl md:text-2xl font-semibold">
      Docs <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
    </h2>
    <p className="m-0 max-w-[30ch] text-sm opacity-50">
      Find in-depth information about Next.js features and API.
    </p>
  </a>
  {/* ... other components ... */}
</div>

     
    </main>
  );
};

export default UploadPage;
