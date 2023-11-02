import React, { useState, useEffect, memo } from "react";

const useResponsiveWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    if (width < 640) return 100; // Tailwind sm breakpoint
    if (width < 768) return 135; // Tailwind md breakpoint
    return 200; // Tailwind lg breakpoint
  };


  export default useResponsiveWidth;