"use client";

import axios from "@/api/axios";
import React, { useState,useEffect } from "react";
import Slider from "react-slick";

export default function Presi() {
  let [step, setStep] = useState(1);
  const trouverPlusGrand = (liste)=> {
    if (liste.length === 0) {
      return null; // Retourne null si la liste est vide
    }
  
    let plusGrand = liste[0]; // Initialise avec le premier élément
  
    for (let i = 1; i < liste.length; i++) {
      if (liste[i].nb_voie > plusGrand.nb_voie ) {
        plusGrand = liste[i];
      }
    }
  
    return plusGrand;
  }
  const [Candis,setCandis] =useState({})
  let i = 0;
  
  useEffect(()=>{
    axios.get('/test/nb-votes').then(({data})=>{
      console.log(trouverPlusGrand(data.candidats))
      setCandis(trouverPlusGrand(data.candidates))
    }).catch(err=>console.log(err)
    )
    },[])

  //   Carousel settings
  let [autoplay, setAutoPlay] = useState(true);
  const settings = {
    dots: false,
    infinite: true,
    speed: 50,
    slidesToShow: 1,
    fade: true,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 5,
    cssEase: "none",
    pauseOnHover: false,

    beforeChange: (current: any, next: any) => {
      i++;
      if (i >= 100 && next == 3) {
        setAutoPlay(false);

        console.log(next);
        console.log(current);
      }
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-8 h-full pt-4 md:pt-8">
      <Slider {...settings} className="">
        <div className="fdfd">
          <img
            src="images/N'GBESSO Tchimou Yannick Levi.jpg"
            alt=""
            className="result-image text-center object-contain block mx-auto"
          />
        </div>
        {/* <div className="">
          <img
            src="images/woman.jpg"
            alt=""
            className="result-image text-center object-contain block mx-auto"
          />
        </div>
        <div className="">
          <img
            src="images/max.jpg"
            alt=""
            className="result-image text-center object-contain block mx-auto"
          />
        </div>
        <div className="">
          <img
            src="images/aiony.jpg"
            alt=""
            className="result-image text-center object-contain block mx-auto"
          />
        </div> */}
      </Slider>
    </div>
  );
}
