'use client'
import React, { useEffect, useRef, useState } from "react";
import './sectionFour.css'
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';



const MyImg = ({src})=> {
    return <img src={src} className="sliderImg" alt="img" />
}

export default function SectionFour() {
    const [isHovered, setIsHovered] = useState(false);
    const sliderRef = useRef(null);

  const settings = {
    infinite: true, // Loop infinitely
    slidesToShow: 7, // Number of images visible at once
    slidesToScroll: 1, // Scroll one image at a time
    speed: 3000, // Control the speed (set high for continuous effect)
    autoplay: true, // Stop autoplay on hover
    autoplaySpeed: 0, // For continuous movement, speed is set to zero
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
            dots: true
          }
        }
      ]
  };

  // Hover handlers
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const { t } = useTranslation();
  
    return (
    <div className="scroll-container fade-in-section opacity-0    ">
        <h2 className="title">{t('mainPage.sectionFive.title')}</h2>
        <div
            className="slider-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
        <Slider ref={sliderRef} {...settings}>
            <div className="imgCtr">
                <img
                src={'/1 (2).png'}
                alt={`Slide`}
                className="slider-image"
                />
            </div>
            <div className="imgCtr">
                <img
                src={'/2 (2).png'}
                alt={`Slide`}
                className="slider-image"
                />
            </div>
            <div className="imgCtr">
                <img
                src={'/3 (2).png'}
                alt={`Slide`}
                className="slider-image"
                />
            </div>
            <div className="imgCtr">
                <img
                src={'/4 (2).png'}
                alt={`Slide`}
                className="slider-image"
                />
            </div>
            <div className="imgCtr">
                <img
                src={'/5.png'}
                alt={`Slide`}
                className="slider-image"
                />
            </div>



            <div className="imgCtr">
                <img
                src={'/1 (2).png'}
                alt={`Slide`}
                className="slider-image"
                />
            </div>
            <div className="imgCtr">
                <img
                src={'/2 (2).png'}
                alt={`Slide`}
                className="slider-image"
                />
            </div>
            <div className="imgCtr">
                <img
                src={'/3 (2).png'}
                alt={`Slide`}
                className="slider-image"
                />
            </div>
            <div className="imgCtr">
                <img
                src={'/4 (2).png'}
                alt={`Slide`}
                className="slider-image"
                />
            </div>
            <div className="imgCtr">
                <img
                src={'/5.png'}
                alt={`Slide`}
                className="slider-image"
                />
            </div>
        </Slider>
        </div>
    </div>
  );
}
// export default function SectionFour() {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 2000,
//         arrows: false,              
//         pauseOnHover: true,    
//         dots: false,
//         slidesToShow: 10,
//         slidesToScroll: 1,
//         cssEase: 'linear',
//         autoplay: true,
//         autoplaySpeed: 0,
//         variableWidth: true,
//         draggable: true,
//         rtl: false,
//         touchThreshold: 15,         // Более высокое значение делает обратный свайп труднее
//         swipeToSlide: true 
//       };
    
//   const { t } = useTranslation();
  
//     return (
//       <div className="scroll-container fade-in-section opacity-0    ">
//         <h2 className="title">{t('mainPage.sectionFive.title')}</h2>
//         <div className="scroll-content">
//             <Slider {...settings}>

//                 <div className="sliderImgCtr">
//                     <MyImg src={'/1 (2).png'}/>
//                 </div>
//                 <div className="sliderImgCtr">
//                     <MyImg src={'/2 (2).png'}/>
//                 </div>
//                 <div className="sliderImgCtr">
//                     <MyImg src={'/3 (2).png'}/>
//                 </div>
//                 <div className="sliderImgCtr">
//                     <MyImg src={'/4 (2).png'}/>
//                 </div>
//                 <div className="sliderImgCtr">
//                     <MyImg src={'/5.png'}/>
//                 </div>

//                 <div className="sliderImgCtr">
//                     <MyImg src={'/1 (2).png'}/>
//                 </div>
//                 <div className="sliderImgCtr">
//                     <MyImg src={'/2 (2).png'}/>
//                 </div>
//                 <div className="sliderImgCtr">
//                     <MyImg src={'/3 (2).png'}/>
//                 </div>
//                 <div className="sliderImgCtr">
//                     <MyImg src={'/4 (2).png'}/>
//                 </div>
//                 <div className="sliderImgCtr">
//                     <MyImg src={'/5.png'}/>
//                 </div>


//             </Slider>
          
//         </div>
//       </div>
//     );
// }
