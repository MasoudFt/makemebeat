import React, { useState } from 'react';
import { FaPalette as Palette, FaMusic as Music, FaVideo as Video, FaShoppingCart as ShoppingCart, FaArrowLeft as ArrowLeft } from 'react-icons/fa';

import MusicList from "./MusicList/MusicList";
import GraphicItems from "./GraphicList/GraphicItems";
import VideoList from "./VideoList/VideoList";

const MyProductList = () => {
  const [selectIndex, setSelectIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const items = [
    {
      name: "گرافیک",
      imageUrl: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-41-48-1024x1024.jpg",
      icon: <Palette className="w-6 h-6 text-purple-400" />, // آیکون کمی کوچک‌تر شده است
      Component: <GraphicItems />,
    },
    {
      name: "موزیک",
      imageUrl: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-05_03-59-31-1024x1024.jpg",
      icon: <Music className="w-6 h-6 text-purple-400" />, // آیکون کمی کوچک‌تر شده است
      Component: <MusicList />,
    },
    {
      name: "ویدیو",
      imageUrl: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-26-59.jpg",
      icon: <Video className="w-6 h-6 text-purple-400" />, // آیکون کمی کوچک‌تر شده است
      Component: <VideoList />,
    },
  ];

  // className اصلی
  const primaryButtonClass = "rounded-xl text-white text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-lg hover:shadow-purple-500/40 transform transition-all duration-300 hover:scale-105 py-3 px-5 w-full";
  const titleClass = "text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400";
  const sectionBackgroundClass = "flex flex-col border border-purple-500/50 rounded-xl p-4 sm:p-6 gap-6 bg-zinc-950/80 backdrop-blur-md"; 

  return (
    <div className="min-h-screen w-full bg-zinc-950 py-4 px-2 sm:py-8 sm:px-4"> {/* padding کلی صفحه در موبایل کمتر شده */}
      <div className={sectionBackgroundClass}>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <h1 className={titleClass}>پنل مدیریت محصولات</h1>
          <div className="w-full sm:w-auto" onClick={() => setShowDetails(false)}>
            <button className={`${primaryButtonClass} font-medium`}>
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span>بازگشت به فهرست</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
     
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 place-items-center text-white">
          {showDetails ? (
            <div className="col-span-full w-full min-h-full flex flex-col rounded-xl p-4 sm:p-6 animate-fadeIn">
              <div className="flex items-center mb-6 gap-4">
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-3 rounded-lg bg-purple-900/50 hover:bg-purple-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <ArrowLeft className="w-6 h-6 text-purple-300" />
                </button>
                <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-cyan-300">
                  {items[selectIndex].name}
                </h2>
              </div>

              <div className="rounded-lg p-4 sm:p-5 border border-purple-500/20 shadow-inner flex-grow">
                {items[selectIndex].Component}
              </div>
            </div>
          ) : (
            <>
              {items.map((item, index) => (
                <div
                  key={item.name}
                  onClick={() => {
                    setShowDetails(true);
                    setSelectIndex(index);
                  }}
                 
                  className="group relative overflow-hidden w-full h-56 sm:h-56 lg:h-64 xl:h-72 rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transform hover:-translate-y-2"
                >
                  {/* Overlay for Name on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4 sm:pb-5 z-20"> {/* padding پایین در موبایل کمتر */}
                    <span className="text-white text-lg sm:text-xl font-bold"> 
                      {item.name}
                    </span>
                  </div>

                  {/* Icon on Hover */}
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-purple-700/70 rounded-full p-2 sm:p-3 z-10 transition-all duration-300 backdrop-blur-sm group-hover:bg-black"> {/* padding آیکون در موبایل کمتر */}
                    {item.icon}
                  </div>

                  {/* Image with Zoom Effect */}
                  <img
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${showDetails && selectIndex === index ? 'scale-105' : ''}`}
                    src={item.imageUrl}
                    alt={item.name}
                  />
                  {/* Slight Darker Overlay on Image */}
                  <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-purple-900/40 transition-all duration-500 z-0"></div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProductList;