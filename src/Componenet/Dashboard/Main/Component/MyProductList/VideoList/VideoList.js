import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ServerURL from "../../../../../API/ServerURL";

const VideoList = () => {
  
  const [videoList,setVideoList]=useState([]);
  const [error, setError] = useState("");
    const [number, setNumber] = useState(1);
console.log(videoList)
  const navigate=useNavigate()
  const tokenUserId = localStorage.getItem("userId")
  const GetVideoFromDb = async () => {
    try {
      const url = `${ServerURL()}videos/${tokenUserId}`;
      // const url = `http://localhost:3000/videos/${tokenUserId}`;
      const res = await axios.get(url);
      setVideoList(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };
  useEffect(() => {
    GetVideoFromDb(tokenUserId); 
  }, [number,tokenUserId]);

  const ColTabel=[
    {title:"ردیف"},
    {title:"نام محصول"},
    {title:"تاریخ بارگذاری"},
    {title:"بازدید"},
    {title:"نوع"},
    {title:"قیمت اصلی"},
    {title:"قیمت با تخفیف"},
    {title:"تایید"},
  ]

  const ButtonClassName = "rounded-xl grid col-span-2 place-content-center text-white text-xl h-12 mt-7 font-semibold  from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transition-all duration-300 w-full p-2 shadow-lg hover:shadow-purple-500/40 transform hover:scale-[1.02]";
  return (
   <>
   {/* {
    videoList?
    <>
    <div className="grid grid-rows-2  rounded-lg font-bold text-white h-full text-xl p-2 sm:overflow-x-auto md:overflow-x-auto">
      <div className="grid grid-cols-8 border border-zinc-950 py-2 border-b-neutral-800 h-fit gap-2 text-center p-1 text-xs text-slate-300 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-8">
        {ColTabel.map((a, i) => (
          <div key={i}>
            <div>{a.title}</div>
          </div>
        ))}
      </div>
      <div>
        {videoList.map((video, index) => (
          <div key={index} className="grid grid-cols-8 border border-zinc-950 py-2 border-b-neutral-800 h-full items-center text-center rounded-t-lg p-1 m-1 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-8">
            <p className="p-2 text-lg">{index + 1}</p>
            <span className="text-xs font-semibold p-2 sm:text-sm md:text-base lg:text-lg">{video.title}</span>
            <span className="text-xs font-semibold p-2 sm:text-sm md:text-base lg:text-lg">{video.createat}</span>
            <span className="text-xs font-semibold p-2 sm:text-sm md:text-base lg:text-lg">{video.view === null ? '0' : video.view}</span>
            <span className="text-xs font-semibold p-2 sm:text-sm md:text-base lg:text-lg">{video.likeproduct === null ? '0' : video.likeproduct}</span>
            <span className="text-xs font-semibold p-2 sm:text-sm md:text-base lg:text-lg">{video.type}</span>
            <span className="text-xs font-semibold p-2 sm:text-sm md:text-base lg:text-lg">{video.orginalPriceTanzim === null ? '0' : video.orginalPrice}</span>
            <span className="text-xs font-semibold p-2 sm:text-sm md:text-base lg:text-lg">{video.discountPriceTanzim === null ? '0' : video.discountPrice}</span>
          </div>
        ))}
      </div>
    </div>
    {videoList.length < 6 || videoList.length >= 6 ? (
      <div className="flex justify-center my-4">
        <input
          onClick={() => setNumber(2)}
          name="1"
          type="radio"
          className="text-purple-700 p-1 m-1 sm:p-2 sm:m-2 md:p-3 md:m-3 lg:p-4 lg:m-4"
        />
        <input
          onClick={() => setNumber(1)}
          name="1"
          type="radio"
          className="text-purple-700 p-1 m-1 sm:p-2 sm:m-2 md:p-3 md:m-3 lg:p-4 lg:m-4"
        />
        <input
          onClick={() => setNumber(3)}
          name="1"
          type="radio"
          className="text-purple-700 p-1 m-1 sm:p-2 sm:m-2 md:p-3 md:m-3 lg:p-4 lg:m-4"
        />
      </div>
    ) : null}
  </>
    :
     <div className="text-lg text-cyan-50 p-3  rounded-lg mb-4 ">
            <div className="flex items-center gap-2">
              <span>محصولی بارگذاری نشده به صفحه ی ایجاد محصول بروید</span>
              <button 
            className={`${ButtonClassName} hover:scale-[1.02] transition-transform duration-200 shadow-lg shadow-purple-900/30`}
            onClick={()=>navigate("/dashbord/ComposeProduct")}>
            ایجاد محصول جدید
          </button>
            </div>
          </div>
   } */}
   <div className="flex sm:grid grid-rows-2">
   <div className="flex-row w-full md:grid grid-cols-8 border border-zinc-950 py-2 border-b-neutral-800  gap-2 text-center p-1 text-xs text-slate-300 ">
        {ColTabel.map((a, i) => (
          <div className="items-center text-center py-2 p-1 m-1" key={i}>
            <div>{a.title}</div>
          </div>
        ))}
      </div>
      <div>
        {videoList.map((video, index) => (
          <div key={index} className="flex-row w-full md:grid grid-cols-8  border overflow-x-auto border-zinc-950 py-2 border-b-neutral-800 h-full items-center text-center rounded-t-lg p-1 m-1 ">
            <div className="p-2 text-lg">{index + 1}</div>
            <div className="text-xs font-semibold p-2 ">{video.title}</div>
            <div className="text-xs font-semibold p-2 ">{video.createat}</div>
            <div className="text-xs font-semibold p-2 ">{video.likeproduct === null ? '0' : video.likeproduct}</div>
            <div className="text-xs font-semibold p-2 ">{video.type}</div>
            <div className="text-xs font-semibold p-2 ">{video.orginalPriceTanzim === null ? '0' : video.orginalPrice}</div>
            <div className="text-xs font-semibold p-2 ">{video.discountPriceTanzim === null ? '0' : video.discountPrice}</div>
            {/* <div className={`border ${video.isShow?"border-red-500 bg-red-500":"border-green-500 bg-green-500"} h-8 w-12  text-xs bg-black rounded-lg font-semibold p-2 `}>تایید</div> */}
            <div className={`text-xs font-semibold p-2 ${video.isShow?"border-red-500 bg-red-500":"border-green-500 bg-green-500"}  rounded-lg font-semibold `}>تایید</div>
          </div>
        ))}
      </div>
   </div>
   
   </>
  )
}

export default VideoList