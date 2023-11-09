// components/Loader.js

const Loader = () => {
  return (
    // Apply a backdrop filter for the blur effect and adjust the opacity to make it darker
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center backdrop-blur-sm">
      <div className="animate-spin-fast rounded-full h-16 w-16 border-4 border-t-transparent border-r-blue-600 border-b-blue-600 border-l-transparent"></div>
    </div>
  );
};

export default Loader;
