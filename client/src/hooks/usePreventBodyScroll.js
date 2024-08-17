import { useEffect } from 'react';

const usePreventBodyScroll = () => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // This runs on component mount
    document.body.style.overflow = 'visible';
    
    // This runs on component unmount
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
};

export default usePreventBodyScroll;