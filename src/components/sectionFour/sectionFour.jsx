'use client'
import React, { useEffect, useRef, useState } from "react";
import './sectionFour.css'
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';



const images = [
    '/toys 1.png',
    '/toys 2.png',
    '/toys 3.png',
    '/toys 4.png',
    '/toys 5.png',
    '/toys 6.png',
    '/toys 7.png',
    '/toys 8.png',
    '/toys 9.png',
    '/toys 10.png',
    '/toys 11.png',
    '/toys 12.png',
    '/toys 13.png',
    '/toys 14.png',
    '/toys 15.png',
    '/toys 16.png',
    '/toys 17.png',
    '/toys 18.png',
    '/toys 19.png',
    '/toys 20.png',
    '/toys 22.png',
    '/toys 23.png',
    '/toys 24.png',
]

const MyImg = ({src})=> {
    return <img src={src} className="sliderImg" alt="img" />
}

export default function SectionFour() {
    const [isHovered, setIsHovered] = useState(false);
    const sliderRef = useRef(null);

  const settings = {
    infinite: true, // Loop infinitely
    slidesToShow: 8, // Number of images visible at once
    slidesToScroll: 1, // Scroll one image at a time
    speed: 2000, // Control the speed (set high for continuous effect)
    autoplay: true, // Stop autoplay on hover
    autoplaySpeed: 10, // For continuous movement, speed is set to zero
    cssEase: 'linear', // Linear easing for smooth scrolling
    pauseOnHover: true, // Pause on hover
    draggable: true, // Enable manual dragging
    swipeToSlide: true, // Enable swipe to slide
    arrows: false, // Show arrows for back and forth scrolling
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
          }
        }
      ]
  };

  const { t } = useTranslation();



 // Function to handle hover state checks
 const checkHoverState = () => {
    if (sliderRef.current) {
      // Check if the slider is hovered over
      const isHoveredNow = sliderRef.current.matches(':hover');
      setIsHovered(isHoveredNow);
    }
  };

  // useEffect to monitor hover state
  useEffect(() => {
    const sliderElement = sliderRef.current;

    // Set up interval to continuously check hover state
    const interval = setInterval(() => {
      checkHoverState();
    }, 100); // Check every 100ms for hover state changes

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  
  
    return (
    <div className="scroll-container fade-in-section opacity-0    ">
        <h2 className="title">{t('mainPage.sectionFive.title')}</h2>
        <div
            className="slider-container"
            ref={sliderRef}
        >
        <Slider {...settings}>
            {images.map((src, index)=>{
                return (
                    <div className="imgCtr" key={index}>
                        <img
                        src={src}
                        alt={`Slide`}
                        className="slider-image"
                        />
                    </div>
                )
            })}
        </Slider>
        </div>
    </div>
  );
}
