import React, { useState, useEffect ,useRef} from "react";

const Slider = ({ product }) => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [isTransitioning, setIsTransitioning] = useState(false);

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
                 src={product[currentSlide].ImagePath}
                 alt={`Slide ${index}`}
                 className="h-full w-screen  object-cover rounded-xl shadow-xl"
               />
             </div>
           ))}
         </div>

      </div>
    </>
  );
};

export default Slider;
