

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { MdArrowCircleLeft, MdArrowCircleRight } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

const Cart = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextIndexPic = () => {
    if (currentSlide < product.length - 1) {
      setCurrentSlide((e) => e + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const handlePrevIndexPic = () => {
    if (currentSlide > 0) {
      setCurrentSlide((e) => e - 1);
    } else {
      setCurrentSlide(product.length - 1); // Go to the last product
    }
  };

  const product = [
    {
      image: "https://makemebeat.net/wp-content/uploads/2020/11/2221212.jpg",
      title: "روزبه قائم",
      description: "خواننده,آهنگساز,تنظیم کننده,میکس من",
      rate: "5.0",
      price: "150000",
    },
    {
      image:
        "https://makemebeat.net/wp-content/uploads/2022/09/WhatsApp%20Image%202022-09-10%20at%2012.16.39%20PM.jpeg",
      title: "آبتین",
      description: "کارگردان",
      rate: "1.5",
      price: "150000",
    },
    {
      image:
        "https://makemebeat.net/wp-content/uploads/2023/01/%D9%85%D8%AC%D8%AA%D8%A8%DB%8C-%D8%AA%D9%82%DB%8C-%D9%BE%D9%88%D8%B1.png",
      title: "مجتبی تقی پور",
      description: "آهنگساز,خواننده,نوازنده",
      rate: "3.0",
      price: "150000",
    },
    {
      image: "https://makemebeat.net/wp-content/uploads/2022/07/M-Namdar.png",
      title: "محسن نامدار",
      description: "آهنگساز,تنظیم کننده,میکس من",
      rate: "4.0",
      price: "150000",
    },
    {
      image: "https://makemebeat.net/wp-content/uploads/2022/06/unnamed.jpg",
      title: "پویا صفا",
      description: "آهنگساز,تنظیم کننده,میکس من",
      rate: "5.0",
      price: "150000",
    },
    {
      image:
        "https://makemebeat.net/wp-content/uploads/2022/05/274224342_224286739917884_5050267142920397498_n.jpg",
      title: "محمد سیحونی",
      description: "تهییه کننده,نویسنده,کارگردان,تدوین گر",
      rate: "3.5",
      price: "150000",
    },
    {
      image:
        "https://makemebeat.net/wp-content/uploads/2023/02/Amin_Captive-800x600.jpg",
      title: "Amin Captive",
      description: "کارگردان,گرافیست",
      rate: "4.0",
      price: "150000",
    },
    {
      image:
        "https://makemebeat.net/wp-content/uploads/2023/06/IMG_20230519_165431_468-400x400.jpg",
      title: "علی سونار ",
      description: "آهنگ ساز,تنظیم کننده,میکس من",
      rate: "4.0",
      price: "150000",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full p-2">
        {/* Arrow navigation on mobile only */}
        <div className="flex justify-between w-full mb-2 md:hidden">
          <MdArrowCircleLeft
            color="gray"
            style={{ cursor: "pointer" }}
            size={40}
            onClick={handlePrevIndexPic}
          />
          <MdArrowCircleRight
            color="gray"
            style={{ cursor: "pointer" }}
            size={40}
            onClick={handleNextIndexPic}
          />
        </div>

        {/* Image cards */}
        <div className={`w-full`}>
          <div className={`mt-5 p-3 grid grid-cols-1 md:grid-cols-3 gap-4`}>
            {product.slice(currentSlide, currentSlide + (window.innerWidth < 768 ? 1 : 3)).map((a, index) => (
              <motion.div
                key={a.title}
                className={`max-w-xs w-full bg-stone-900 border border-gray-600 rounded-lg shadow-sm overflow-hidden`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
              >
                <LazyLoadImage
                  alt={a.title}
                  className="p-2 rounded-xl h-72 w-full object-cover"
                  src={a.image}
                  effect="opacity"  // Ensures that images fade in
                />
                <div className="px-2 pb-2 ">
                  <div className="justify-items-end">
                    <h5 className="text-xl mb-2 font-semibold tracking-tight text-gray-900 dark:text-stone-300 ">
                      {a.title}
                    </h5>
                    <h6 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-stone-300">
                      {a.description}
                    </h6>
                  </div>
                  <div className="flex items-center justify-between mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Rating
                          name="text-feedback"
                          value={a.rate}
                          readOnly
                          precision={0.5}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55, color: "white" }}
                              fontSize="inherit"
                            />
                          }
                        />
                      </Box>
                      <div className="flex justify-items-end bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-sm justify-center dark:bg-blue-200 dark:text-blue-800 ms-2">
                        <div className="">{a.rate}</div>
                        <div className="">امتیاز کاربران</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Arrow navigation for desktop (hidden in mobile) */}
      <div className="hidden md:flex justify-between w-full mt-2">
        <MdArrowCircleLeft
          color="gray"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={handlePrevIndexPic}
        />
        <MdArrowCircleRight
          color="gray"
          style={{ cursor: "pointer" }}
          size={40}
          onClick={handleNextIndexPic}
        />
      </div>
    </>
  );
};

export default Cart;