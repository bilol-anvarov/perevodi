'use client'
import React, { useEffect, useRef } from "react";
import './sectionFour.css'
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';



const MyImg = ({src})=> {
    return <img src={src} className="sliderImg" alt="img" />
}

export default function SectionFour() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        arrows: false,              
        pauseOnHover: false,    
        dots: false,
        slidesToShow: 10,
        slidesToScroll: 1,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 0,
        variableWidth: true,
      };
    
  const { t } = useTranslation();
  
    return (
      <div className="scroll-container fade-in-section opacity-0">
        <h2 className="title">{t('mainPage.sectionFive.title')}</h2>
        <div className="scroll-content">
            <Slider {...settings}>

                <div className="sliderImgCtr">
                    <MyImg src={'/1 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/2 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/3 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/4 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/5.png'}/>
                </div>

                <div className="sliderImgCtr">
                    <MyImg src={'/1 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/2 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/3 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/4 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/5.png'}/>
                </div>

                <div className="sliderImgCtr">
                    <MyImg src={'/1 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/2 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/3 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/4 (2).png'}/>
                </div>
                <div className="sliderImgCtr">
                    <MyImg src={'/5.png'}/>
                </div>

            </Slider>
          
        </div>
      </div>
    );
}
