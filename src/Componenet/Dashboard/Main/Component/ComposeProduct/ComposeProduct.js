import React, { useState } from 'react';
import { FaImage, FaMusic, FaVideo, FaArrowLeft, FaCheck } from 'react-icons/fa';

import MusicList from "./MusicList/MusicList";
import GraphicItems from "./GraphicList/GraphicItems";
import VideoPost from "./VideoList/VideoPost";

const ComposeProduct = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const products = [
    {
      name: "گرافیک",
      icon: <FaImage className="text-3xl sm:text-4xl mb-2 text-purple-400" />, // آیکون با قابلیت تنظیم اندازه در موبایل
      imageUrl: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-41-48-1024x1024.jpg",
      Component: <GraphicItems />,
    },
    {
      name: "موزیک",
      icon: <FaMusic className="text-3xl sm:text-4xl mb-2 text-purple-400" />, // آیکون با قابلیت تنظیم اندازه در موبایل
      imageUrl: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-05_03-59-31-1024x1024.jpg",
      Component: <MusicList />,
    },
    {
      name: "ویدیو",
      icon: <FaVideo className="text-3xl sm:text-4xl mb-2 text-purple-400" />, // آیکون با قابلیت تنظیم اندازه در موبایل
      imageUrl: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-26-59.jpg",
      Component: <VideoPost />,
    },
  ];

  // کلاس ها و تنظیمات استایل
  const primaryButtonClass = "rounded-xl flex items-center justify-center gap-2 text-white text-lg h-12 sm:h-14 font-semibold bg-gradient-to-r from-purple-800 to-black border-2 border-purple-600 w-full hover:from-purple-700 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-purple-700/50 transform hover:scale-102 focus:outline-none focus:ring-2 focus:ring-purple-500";
  const cardContainerClass = "group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/40 border border-transparent hover:border-purple-400";
  const imageClass = "h-48 sm:h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"; // تنظیم ارتفاع در موبایل
  const iconContainerClass = "absolute top-2 left-2 sm:top-3 sm:left-3 bg-purple-800/60 rounded-full p-2 sm:p-3 z-10 transition-all duration-300 backdrop-blur-sm group-hover:bg-white/20"; // padding در موبایل کمتر
  const textOverlayClass = "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20";
  const textClass = "text-white text-lg sm:text-2xl font-bold text-center"; // فونت تکست در موبایل کوچکتر
  const backButtonClass = "flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium text-lg";
  const sectionBackgroundClass = "flex flex-col border border-purple-500/50 rounded-xl p-4 sm:p-6 gap-6 bg-zinc-950/80 backdrop-blur-md"; 

  return (
    <div className="min-h-screen w-full bg-zinc-950 py-4 px-2"> 
      <div className={sectionBackgroundClass}>

        {showDetails ? (
          <div className="space-y-6">
            {/* بازگشت به لیست محصولات */}
            <button
              onClick={() => setShowDetails(false)}
              className={backButtonClass}
            >
              <FaArrowLeft className="w-5 h-5" />
              <span>بازگشت</span>
            </button>

            {/* کامپوننت جزئیات */}
            <div className="rounded-lg p-4 sm:p-6 border border-purple-500/30 shadow-inner bg-zinc-900/50">
              {products[selectedIndex].Component}
            </div>
          </div>
        ) : (
          <>
            {/* دکمه ثبت محصول */}
            <button className={primaryButtonClass}>
              <FaCheck className="w-5 h-5" />
              <span className="font-semibold">ثبت محصول</span>
            </button>

            {/* گرید محصولات */}
            {/* گرید ریسپانسیو: 1 ستون در موبایل، 2 ستون در تبلت، 3 ستون در دسکتاپ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 place-items-center text-white">
              {products.map((product, index) => (
                <div
                  key={product.name}
                  onClick={() => {
                    setShowDetails(true);
                    setSelectedIndex(index);
                  }}
                  className={cardContainerClass}
                >
                  {/* آیکون در گوشه */}
                  <div className={iconContainerClass}>
                    {product.icon}
                  </div>

                  {/* تصویر محصول با افکت زوم */}
                  <img
                    className={imageClass}
                    src={product.imageUrl}
                    alt={product.name}
                  />

                  {/* متن روی تصویر در هاور */}
                  <div className={textOverlayClass}>
                    <span className={textClass}>
                      {product.name}
                    </span>
                  </div>

                  {/* لایه گرادیانت روی تصویر برای زیبایی بیشتر */}
                  <div className="absolute inset-0 bg-purple-900/30 group-hover:bg-purple-900/50 transition-all duration-500 z-0"></div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComposeProduct;