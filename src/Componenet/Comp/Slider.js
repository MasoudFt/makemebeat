import React, { useState, useEffect ,useRef} from "react";

import { MdArrowCircleLeft } from "react-icons/md";

import { MdArrowCircleRight } from "react-icons/md";


const Slider = ({ product }) => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [isDragging, setIsDragging] = useState(false);
  
  const [startX, setStartX] = useState(0);
  
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const sliderRef = useRef(null);


  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    setScrollLeft(sliderRef.current.scrollLeft);
  };


  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const dragDistance = (x - startX) * 1.5; // سرعت drag
    sliderRef.current.scrollLeft = scrollLeft - dragDistance;
  };

  
  const endDrag = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % product.length);
        setIsTransitioning(false);
      },800); // زمان انیمیشن
    }, 3000); // زمان بین اسلایدها

    return () => clearInterval(interval);
  }, [product.length]);

  const handelNextIndexPic = () => {
    if (currentSlide < product.length - 1) {
      setCurrentSlide((e) => e + 1);
    }
  };

  const handelPervIndexPic = () => {
    if (currentSlide !== 0) {
      setCurrentSlide((e) => e - 1);
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-between h-full place-content-center ">
      <div className="relative w-full h-80 overflow-hidden">
           
           {product.map((slide, index) => (
             <div
               key={index}
               className={`absolute w-full h-full  transition-transform duration-500 ${
                 index === currentSlide ? "translate-x-0" : "translate-x-full"
               } ${isTransitioning && "transform -translate-x-full"}`}
             >
               <img
                 src={product[currentSlide].profile_path}
                 alt={`Slide ${index}`}
                 className="h-full w-screen  object-cover rounded-xl shadow-xl"
               />
             </div>
           ))}
         </div>
        {/* <div className="w-5 z-10">
          <div className="grid justify-items-end  items-center h-64 w-full">
          <MdArrowCircleLeft color="gray" size={40} onClick={handelPervIndexPic} />
    </div>
        </div>
        <div className="w-full">
          <div className="relative w-full h-64 overflow-hidden">
           
            {product.map((slide, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-transform duration-500 ${
                  index === currentSlide ? "translate-x-0" : "translate-x-full"
                } ${isTransitioning && "transform -translate-x-full"}`}
              >
                <img
                  src={product[currentSlide].imageUrl}
                  alt={`Slide ${index}`}
                  className="w-screen h-full object-cover rounded-lg shadow-xl"
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" z-10 w-5">
        <div className="grid justify-items-start items-center h-64 w-full">
          <MdArrowCircleRight color="gray" size={40} onClick={handelNextIndexPic} />
        </div>
        </div> */}
      </div>
    </>
  );
};

export default Slider;
       {/* <div
      ref={sliderRef}
      className="flex overflow-x-auto scroll-snap-x-mandatory cursor-grab"
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={startDrag}
      onTouchMove={onDrag}
      onTouchEnd={endDrag}
    >
      {product.map((slide, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-full h-64 scroll-snap-align-start"
        >
          <img
           src={product[currentSlide].imageUrl}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div> */}
    {/* {//////slide pick with mousee /////} */}