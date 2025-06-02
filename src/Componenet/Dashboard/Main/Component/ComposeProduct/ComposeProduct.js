import React, { useState } from "react";
import MusicList from "./MusicList/MusicList";
import GraphicItems from "./GraphicList/GraphicItems";
import VideoPost from "./VideoList/VideoPost";

const ComposeProduct = () => {
  const [select, setSelect] = useState(0);
  const [show, setShow] = useState(false);
  const items = [
    {
      name: "گرافیگ",
      className: "h-64 w-64 rounded-xl p-2 border border-purple-600  mt-2 cursor-pointer",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-41-48-1024x1024.jpg",
      show: false,
      Component: <GraphicItems />,
    },
    {
      name: "موزیک",
      className: "h-64 w-64 rounded-xl p-2 border border-purple-600  mt-2 cursor-pointer",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-05_03-59-31-1024x1024.jpg",
      show: true,
      Component: <MusicList />,
    },
    {
      name: "ویدیو",
      className: "h-64 w-64 rounded-xl p-2 border border-purple-600  mt-2 cursor-pointer ",
      url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-26-59.jpg",
      show: false,
      Component: <VideoPost />,
    },
  ];
  const ButtonClassName="rounded-xl grid col-span-2 place-content-center text-white text-xl h-12 mt-7 font-semibold bg-black border border-purple-600 w-full p-2";

  return (
    <div>
      <div className="flex flex-col border border-purple-600 rounded-lg h-full p-2 gap-4">
        <div onClick={()=>setShow(false)}>
          <button className={ButtonClassName}>
            ثبت محصول
          </button>
        </div>
        <div className="grid grid-cols-3 place-items-center text-white font-bold text-xl justify-between ">
          {
            show?
            <div className="col-span-3">
            {items[select].Component}
            </div>
            :
            <>
            {items.map((a, b) => (
            <div key={a.name} onClick={() =>{ setShow(true);setSelect(b)}}>
              <label className="grid text-white text-center font-semibold text-2xl">{a.name}</label>
              <img className={a.className} src={a.url} />
            </div>
          ))}
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default ComposeProduct;
