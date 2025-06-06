// import React, { useState } from "react";
// import MusicList from "./MusicList/MusicList";
// import GraphicItems from "./GraphicList/GraphicItems";
// import VideoPost from "./VideoList/VideoPost";

// const ComposeProduct = () => {
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
//       Component: <VideoPost />,
//     },
//   ];
//   const ButtonClassName="rounded-xl grid col-span-2 place-content-center text-white text-xl h-12 mt-7 font-semibold bg-black border border-purple-600 w-full p-2";

//   return (
//     <div>
//       <div className="flex flex-col border border-purple-600 rounded-lg h-full p-2 gap-4">
//         <div onClick={()=>setShow(false)}>
//           <button className={ButtonClassName}>
//             ثبت محصول
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
//             </>
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComposeProduct;
import { useState } from 'react';
import { FaImage, FaMusic, FaVideo, FaArrowLeft, FaCheck } from 'react-icons/fa';
import MusicList from "./MusicList/MusicList";
import GraphicItems from "./GraphicList/GraphicItems";
import VideoPost from "./VideoList/VideoPost";

const ComposeProduct = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  const products = [
    {
      name: "گرافیگ",
      icon: <FaImage className="text-4xl mb-2 text-purple-400" />,
      className: "h-64 w-64 rounded-xl p-4 border-2 border-purple-600 hover:border-purple-400 mt-2 cursor-pointer transition-all duration-300 hover:scale-105",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-41-48-1024x1024.jpg",
      Component: <GraphicItems />,
    },
    {
      name: "موزیک",
      icon: <FaMusic className="text-4xl mb-2 text-purple-400" />,
      className: "h-64 w-64 rounded-xl p-4 border-2 border-purple-600 hover:border-purple-400 mt-2 cursor-pointer transition-all duration-300 hover:scale-105",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-05_03-59-31-1024x1024.jpg",
      Component: <MusicList />,
    },
    {
      name: "ویدیو",
      icon: <FaVideo className="text-4xl mb-2 text-purple-400" />,
      className: "h-64 w-64 rounded-xl p-4 border-2 border-purple-600 hover:border-purple-400 mt-2 cursor-pointer transition-all duration-300 hover:scale-105",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-26-59.jpg",
      Component: <VideoPost />,
    },
  ];

  const ButtonClassName = "rounded-xl flex items-center justify-center gap-2 text-white text-xl h-12 mt-7 font-semibold bg-gradient-to-r from-purple-800 to-black border-2 border-purple-600 w-full p-2 hover:from-purple-700 hover:to-gray-900 transition-all duration-300";

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col border-2 border-purple-600 rounded-xl h-full p-6 gap-6 bg-zinc-950 bg-opacity-80 backdrop-blur-sm">
        {showDetails ? (
          <div className="space-y-6">
            <button 
              onClick={() => setShowDetails(false)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <FaArrowLeft /> بازگشت
            </button>
            {products[selectedIndex].Component}
          </div>
        ) : (
          <>
            <button className={ButtonClassName}>
              <FaCheck /> ثبت محصول
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center text-white">
              {products.map((product, index) => (
                <div 
                  key={product.name} 
                  onClick={() => { 
                    setShowDetails(true);
                    setSelectedIndex(index);
                  }}
                  className="group"
                >
                  <div className="flex flex-col items-center">
                    {product.icon}
                    <label className="text-white text-center font-bold text-2xl mb-3 group-hover:text-purple-300  transition-colors">
                      {product.name}
                    </label>
                  </div>
                  <div className="relative overflow-hidden rounded-xl">
                    <img 
                      className={product.className}
                      src={product.url} 
                      alt={product.name}
                    />
                    <div className="absolute inset-0 bg-purple-900 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>
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
