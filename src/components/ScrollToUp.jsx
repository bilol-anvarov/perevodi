'use client'
import React, { useEffect, useState } from 'react'

export default function ScrollToUp() {
    const [isVisible, setIsVisible] = useState(false);


    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
    if(!isVisible) return null
  return (
        <button
          className='p-3 fixed bottom-8 right-8 rounded-full bg-[#00AC3566]'
          onClick={()=>{
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M14.4009 10.6193C14.7456 10.3238 15.2542 10.3238 15.5989 10.6193L24.1898 17.9829C24.5758 18.3138 24.6205 18.8949 24.2897 19.2808C23.9588 19.6668 23.3778 19.7115 22.9918 19.3807L14.9999 12.5305L7.00802 19.3807C6.62205 19.7115 6.04097 19.6668 5.71014 19.2808C5.3793 18.8949 5.424 18.3138 5.80997 17.9829L14.4009 10.6193Z" fill="white"/>
          </svg>
        </button>
      )
}
