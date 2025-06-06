import React, { useState } from "react";
import MusicList from "./MusicList/MusicList";
import GraphicItems from "./GraphicList/GraphicItems";
import VideoList from "./VideoList/VideoList";

// const MyProductList = () => {
//   const [select, setSelect] = useState(0);
//   const [show, setShow] = useState(false);
//   const items = [
//     {
//       name: "گرافیگ",
//       className: "h-64 w-64 rounded-xl p-2 border border-purple-600  mt-2 cursor-pointer",
//       url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-41-48-1024x1024.jpg",
//       show: false,
//       Component: <GraphicItems />,
//     },
//     {
//       name: "موزیک",
//       className: "h-64 w-64 rounded-xl p-2 border border-purple-600  mt-2 cursor-pointer",
//       url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-05_03-59-31-1024x1024.jpg",
//       show: true,
//       Component: <MusicList />,
//     },
//     {
//       name: "ویدیو",
//       className: "h-64 w-64 rounded-xl p-2 border border-purple-600  mt-2 cursor-pointer ",
//       url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-26-59.jpg",
//       show: false,
//       Component: <VideoList />,
//     },
//   ];
//   const ButtonClassName="rounded-xl grid col-span-2 place-content-center text-white text-xl h-12 mt-7 font-semibold bg-black border border-purple-600 w-full p-2";
//   return (
//     <div>
//       <div className="flex flex-col border border-purple-600 rounded-lg h-full p-2 gap-4">
//         <div onClick={()=>setShow(false)}>
//           <button  className={ButtonClassName} >
//             انتخاب محصول
//           </button>
//         </div>
//         <div className="grid grid-cols-3 place-items-center text-white font-bold text-xl justify-between ">
//           {
//             show?
//             <div className="col-span-3">
//             {items[select].Component}
//             </div>
//             :
//             <>
//             {items.map((a, b) => (
//             <div key={a.name} onClick={() =>{ setShow(true);setSelect(b)}}>
//               <label className="grid text-white text-center font-semibold text-2xl">{a.name}</label>
//               <img className={a.className} src={a.url} />
//             </div>
//           ))}
//           {/* محصولی موجود نیست */}
//             </>
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProductList;
import { FaPalette as Palette, FaMusic as Music } from 'react-icons/fa';
import { MdVideoLibrary as Video, MdShoppingCart as ShoppingCart, MdArrowBack as ArrowLeft } from 'react-icons/md';

const MyProductList = () => {
  const [select, setSelect] = useState(0);
  const [show, setShow] = useState(false);
  const items = [
    {
      name: "گرافیگ",
      className: "h-64 w-64 rounded-xl p-2 border-2 border-purple-500 hover:border-purple-300 transition-all duration-300 mt-2 cursor-pointer shadow-lg hover:shadow-purple-500/30",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-41-48-1024x1024.jpg",
      show: false,
      Component: <GraphicItems />,
      icon: <Palette className="w-8 h-8 text-purple-400" />
    },
    {
      name: "موزیک",
      className: "h-64 w-64 rounded-xl p-2 border-2 border-purple-500 hover:border-purple-300 transition-all duration-300 mt-2 cursor-pointer shadow-lg hover:shadow-purple-500/30",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-05_03-59-31-1024x1024.jpg",
      show: true,
      Component: <MusicList />,
      icon: <Music className="w-8 h-8 text-purple-400" />
    },
    {
      name: "ویدیو",
      className: "h-64 w-64 rounded-xl p-2 border-2 border-purple-500 hover:border-purple-300 transition-all duration-300 mt-2 cursor-pointer shadow-lg hover:shadow-purple-500/30",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-26-59.jpg",
      show: false,
      Component: <VideoList />,
      icon: <Video className="w-8 h-8 text-purple-400" />
    },
  ];
  
  const ButtonClassName = "rounded-xl grid col-span-2 place-content-center text-white text-xl h-12 mt-7 font-semibold bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300 w-full p-2 shadow-lg hover:shadow-purple-500/40 transform hover:scale-[1.02]";

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col border-2 border-purple-500 rounded-xl h-full p-6 gap-6 bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm">
        <div onClick={() => setShow(false)} className="w-full">
          <button className={ButtonClassName}>
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              <span>انتخاب محصول</span>
            </div>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-center text-white font-bold text-xl gap-6">
          {show ? (
            <div className="col-span-3 w-full animate-fadeIn">
              <div className="flex items-center mb-4 gap-2">
                <button 
                  onClick={() => setShow(false)}
                  className="p-2 rounded-lg bg-purple-900/50 hover:bg-purple-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-purple-300">{items[select].name}</h2>
              </div>
              {items[select].Component}
            </div>
          ) : (
            <>
              {items.map((item, index) => (
                <div 
                  key={item.name} 
                  onClick={() => { setShow(true); setSelect(index) }}
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-lg font-medium">{item.name}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-purpleple-600/80 rounded-full p-2">
                    {item.icon}
                  </div>
                  <img 
                    className={item.className} 
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
