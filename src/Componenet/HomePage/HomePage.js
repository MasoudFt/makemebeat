import React from "react";

import Slider from "../Comp/Slider";
import Cart from "../Comp/Cart";
import WeeklyMusicList from "../WeeklyMusic/WeeklyMusicList";
import Footer from "../Footer/Footer";
import MotionGraphic from "../MotionGraphic/MotionGraphic";

const HomePage = () => {
 
   const product = [
    {
      id: 1,
      name: "Image1",
      title: "Video",
      ImagePath:
        "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-05_03-59-31-1024x1024.jpg",
    },
    {
      id: 2,
      name: "Image2",
      title: "Video",
      ImagePath:
        "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-06_12-42-53-1024x1024.jpg",
    },
    {
      id: 3,
      name: "Image3",
      title: "Video",
      ImagePath:
        "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-05_03-50-42-1024x1024.jpg",
    },
  ];
   const product2 = [
    {
      id: 1,
      name: "Image1",
      ImagePath:"1.jpeg"
      
    },
    {
      id: 2,
      name: "Image2",
      ImagePath:
      "2.jpeg",
    },
    {
      id: 3,
      name: "Image3",
      ImagePath:
      "3.jpeg",
    },
    {
      id: 4,
      name: "Image4",
      ImagePath:
      "4.jpeg",
    },
  ];

  return (
    <>
    
      <div className=" h-full p-2 ">
        <div className="mt-36 justify-center ">
        <div className="h-full text-center text-cyan-50 font-bold ">
            <Slider product={product2} />
          </div>
          <div className="h-18 text-center text-3xl text-cyan-50 font-bold py-5 px-5">
         پیشنهاد های ویژه
        </div>
        <div className="h-full text-center mb-32 text-cyan-50 font-bold py-5 px-5">
          <WeeklyMusicList />
        </div>
          <div className="h-18 mt-16 text-center text-3xl text-cyan-50 font-bold py-3 px-3">
            سبک های انتخابی
          </div>
          <div className="h-full mt-16 text-center text-cyan-50 font-bold ">
            <Slider product={product} />
          </div>
        </div>
        <div className="h-18 text-center text-3xl text-cyan-50 font-bold py-5 px-5">
          نمونه کارهای تصویری
        </div>
        <div className="h-full text-center mb-32 text-cyan-50 font-bold py-5 px-5">
          <Cart />
        </div>
        <div className="h-18 text-center text-3xl text-cyan-50 font-bold py-5 px-5">
          گرافیک دیزاین
        </div>
        <div className="h-full text-center mb-32 text-cyan-50 font-bold py-5 px-5">
          <Cart />
        </div>
        <div className="h-18 text-center text-3xl text-cyan-50 font-bold py-5 px-5">
          رادیو میک می بیت
        </div>
        <div className="h-full text-center mb-32 text-cyan-50 font-bold py-5 px-5">
          <Cart />
        </div>
        <div className="h-18 text-center text-3xl text-cyan-50 font-bold py-5 px-5">
          هنرمندهای های رسمی سایت
        </div>
        <div className="h-full text-center mb-32 text-cyan-50 font-bold py-5 px-5">
          <Cart />
        </div>
        <div className="h-18 text-center text-3xl text-cyan-50 font-bold py-5 px-5">
          موشن گرافی
        </div>
        <div className="h-full text-center mb-32 text-cyan-50 font-bold py-5 px-5">
          <MotionGraphic />
        </div>
        <div className="h-18 text-center text-3xl text-cyan-50 font-bold py-5 px-5">
          مجله میک می بیت
        </div>
        <div className="h-full text-center mb-32 text-cyan-50 font-bold py-5 px-5">
          <Cart />
        </div>
        <div className="h-full text-center  text-cyan-50 font-bold ">
          <Footer />
        </div>
      </div>
    
    </>
  );
};

export default HomePage;
