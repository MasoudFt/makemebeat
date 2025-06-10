import React, { useState, useEffect } from "react";
import SectionRightAdmin from "./SectionRight/SectionRightAdmin";
import ShowMusicAdmin from "./MainInfo/ShowMusicAdmin";
import ShowVideoAdmin from "./MainInfo/ShowVideoAdmin";
import ShowGraphicAdmin from "./MainInfo/ShowGraphicAdmin";


const OneUser = () => {
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("موزیک"); // وضعیت برای انتخاب فعلی
  const itemMainmenu = ["موزیک", "ویدیو", "گرافیک"];
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div dir="rtl" className="mt-14 h-screen text-white">
      {loading ? (
        "loading.."
      ) : (
        <div
          dir="rtl"
          className="flex-grow grid grid-flow-col grid-cols-3 bg-zinc-950 gap-4 p-4"
        >
          <SectionRightAdmin />
          {/* <div className="col-span-2 rounded-lg bg-zinc-900 border border-zinc-900 border-b-gray-700 w-full h-56">
            {selectedMenu === "موزیک" && <ShowPlayerAdmin />}
            {selectedMenu === "ویدیو" && <VideoShow />}
          </div> */}
          <div className="col-span-2 rounded-lg bg-zinc-900 border border-zinc-900 h-full border-b-gray-700 flex flex-col">
            <div dir="rtl" className="flex justify-evenly p-2 gap-4">
              {itemMainmenu.map((item, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    className="bg-white rounded-full text-black"
                    name="mainMenu"
                    checked={selectedMenu === item}
                    onChange={() => setSelectedMenu(item)} // تنظیم وضعیت انتخاب
                  />
                  {item}
                </label>
              ))}
            </div>
            {/* نمایش کامپوننت مناسب بر اساس انتخاب */}
            {selectedMenu === "موزیک" && <ShowMusicAdmin />}
            {selectedMenu === "ویدیو" && <ShowVideoAdmin />}
            {selectedMenu === "گرافیک" && <ShowGraphicAdmin />}
          </div>
        </div>
      )}
    </div>
  );
};

export default OneUser;
