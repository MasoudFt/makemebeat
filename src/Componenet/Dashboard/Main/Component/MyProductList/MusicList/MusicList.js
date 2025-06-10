import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import ServerURL from "../../../../../API/ServerURL";

const MusicList = () => {
  const [musicList,setMusicList]=useState([]);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const navigate=useNavigate()
  const ColTabel=[
    {title:"ردیف"},
    {title:"کاور کار"},
    {title:"نام محصول"},
    {title:"تاریخ بارگذاری"},
    {title:"بازدید"},
    {title:"لایک"},
    {title:"قیمت اصلی"},
    {title:"قیمت با تخفیف"},
  ]
  const tokenUserId = localStorage.getItem("userId")
  const Imageurl = ServerURL()
  const GetDataFromDb = async (tokenUserId, number) => {
    try {
      const url = `${ServerURL()}musics/${tokenUserId}/${number}`;
      const res = await axios.get(url);
      setMusicList(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };


  
  useEffect(() => {
GetDataFromDb(tokenUserId, number); 
  }, [number]);
const ButtonClassName ="rounded-xl text-white text-xl h-12 font-semibold bg-black border border-purple-600 w-full p-2  "
  return (
   <>
  { 
  musicList.length === 0 ?
<>
  <div className='flex items-center justify-between w-full h-72 gap-10 1border border-purple-600 rounded-lg font-bold text-white text-xl p-2 '>
        <div>
        {error}
        </div>
        <button className={ButtonClassName} onClick={()=>navigate("/dashbord/ComposeProduct")}>ایجاد محصول</button>
        </div>
</>
  :
<>
<div className="grid-rows-2 rounded-lg font-bold text-white h-full text-xl p-2">
      <div className="grid grid-cols-8 border border-zinc-950 py-2 border-b-neutral-800 h-fit gap-2 text-center p-1 text-xs text-slate-300 ">
      {ColTabel.map((a,i)=>(
        <div className="" key={i}>
          <div >{a.title}</div>
        </div>
      ))}
    
      </div>
      <div>
        {musicList.map((music, index) => (
          <div key={index} className="grid grid-cols-8 border border-zinc-950 py-2 border-b-neutral-800 h-full items-center text-center rounded-t-lg p-1 m-1">
            <p className='p-2 text-xl'>{index + 1}</p>
            <img src={Imageurl+music.file_pathImage} alt="Cover" className="h-14 w-14 mr-3 rounded-2xl" />
            <span className="text-xs font-semibold p-2">{music.title }</span>
            <span className="text-xs  font-semibold p-2">{music.createat=== null?" sgh;":music.createat}</span>
            <span className="text-xs  font-semibold p-2">{music.view ===null?"0":music.view}</span>
            <span className="text-xs  font-semibold p-2">{music.likeproduct ===null?"0":music.likeproduct}</span>
            <span className="text-xs  font-semibold p-2">{music.orginalPriceTanzim===null?"0":music.orginalPriceTanzim}</span>
            <span className="text-xs  font-semibold p-2">{music.discountPriceTanzim ===null?"0":music.discountPriceTanzim}</span>
          </div>
        ))}
        </div>
      </div>
      {
        musicList.length<6 || musicList.length>=6?
        <div className="flex justify-center">
       
        <input onClick={()=>setNumber(2)}name="1" type="radio" className="text-purple-700 p-1 m-1"/>
        <input onClick={()=>setNumber(1)}name="1" type="radio" className="text-purple-700 p-1 m-1"/>
        <input onClick={()=>setNumber(3)}name="1" type="radio" className="text-purple-700 p-1 m-1"/>
    
        </div>
        :
        null
      }
       
</>
  }
   </>
  )
}

export default MusicList