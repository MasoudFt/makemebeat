import React, { useState } from "react";
import MusicList from "./MusicList/MusicList";
import GraphicItems from "./GraphicList/GraphicItems";
import VideoList from "./VideoList/VideoList";
import { FaPalette as Palette, FaMusic as Music } from 'react-icons/fa';
import { MdVideoLibrary as Video, MdShoppingCart as ShoppingCart, MdArrowBack as ArrowLeft } from 'react-icons/md';


const MyProductList = () => {
  const [select, setSelect] = useState(0);
  const [show, setShow] = useState(false);
  
  const items = [
    {
      name: "گرافیگ",
      className: "h-64 w-64 rounded-xl p-2  transition-all duration-300 mt-2 cursor-pointer ",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-41-48-1024x1024.jpg",
      show: false,
      Component: <GraphicItems />,
      icon: <Palette className="w-8 h-8 text-purple-400" />
    },
    {
      name: "موزیک",
      className: "h-64 w-64 rounded-xl p-2 transition-all duration-300 mt-2 cursor-pointer ",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-05_03-59-31-1024x1024.jpg",
      show: true,
      Component: <MusicList />,
      icon: <Music className="w-8 h-8 text-purple-400" />
    },
    {
      name: "ویدیو",
      className: "h-64 w-64 rounded-xl p-2 transition-all duration-300 mt-2 cursor-pointer ",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-26-59.jpg",
      show: false,
      Component: <VideoList />,
      icon: <Video className="w-8 h-8 text-purple-400" />
    },
  ];
  
  const ButtonClassName = "rounded-xl grid col-span-2 place-content-center text-white text-xl h-12 mt-7 font-semibold  from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300 w-full p-2 shadow-lg hover:shadow-purple-500/40 transform hover:scale-[1.02]";

  return (
<div className=" mx-auto p-4 w-full">
  <div className="flex flex-col  border border-purple-500/50 rounded-xl h-full p-6 gap-6  from-gray-900 via-purple-900/20 to-black backdrop-blur-sm ">
    {/* Header Section */}
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold  from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        پنل مدیریت محصولات
      </h1>
      <div onClick={() => setShow(false)} className="w-fit">
        <button className={`${ButtonClassName} hover:scale-105 transition-transform duration-200`}>
          <div className="flex items-center justify-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            <span>انتخاب محصول</span>
          </div>
        </button>
      </div>
    </div>
    
    {/* Main Content */}
    <div className="flex-grow grid grid-cols-1 md:grid-cols-3 place-items-center text-white gap-6">
      {show ? (
        <div className="col-span-3 w-full animate-fadeIn min-h-full flex flex-col  rounded-xl p-6 ">
          <div className="flex items-center mb-6 gap-4">
            <button 
              onClick={() => setShow(false)}
              className="p-2 rounded-lg bg-purple-900/50 hover:bg-purple-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold  from-purple-300 to-black bg-clip-text text-transparent">
              {items[select].name}
            </h2>
          </div>
          
          <div className="flex-grow rounded-lg p-4 border border-purple-500/20 mb-4">
            {items[select].Component}
          </div>
          
          
        </div>
      ) : (
        <>
          {items.map((item, index) => (
            <div 
              key={item.name} 
              onClick={() => { setShow(true); setSelect(index) }}
              className="group relative overflow-hidden w-full h-full rounded-xl border border-purple-500/30 hover:border-purple-400 transition-all duration-500 cursor-pointer"
            >
              <div className="absolute inset-0  from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 z-10">
                <span className="text-white text-xl font-bold  from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  {item.name}
                </span>
              </div>
              
              <div className="absolute top-4 right-4 bg-purple-600/80 rounded-full p-2 z-10 group-hover:bg-black transition-colors duration-500">
                {item.icon}
              </div>
              
              <div className="absolute inset-0 bg-purple-900/10 group-hover:bg-purple-900/30 transition-all duration-500 z-0"></div>
              
              <img 
                className={`${item.className} object-cover w-full h-full group-hover:scale-105 transition-transform duration-700`} 
                src={item.url} 
                alt={item.name}
              />
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
