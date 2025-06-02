import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { LuDownload } from "react-icons/lu";

const DownloadList = () => {
   const [musicList, setMusicList] = useState([]);
     const ButtonClassName ="rounded-xl text-white text-xl h-12 font-semibold bg-black border border-purple-600 w-24 p-2  "
  
    const MusicFileName = useSelector((state) => state.musicId);
    console.log(typeof MusicFileName);
    const url = `http://localhost:3000/musics/${MusicFileName.fileName}`;
    const getMusic = async () => {
      try {
        const res = await axios.get(url);
        setMusicList(res);
        console.log(res);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
  
    useEffect(() => {
      getMusic();
    }, [MusicFileName]);
  return (
    <>
      <div className="text-white text-2xl  ">
        {/* <h2>Music List</h2>
        <div>artist:{MusicFileName.artist}</div>
        <div>title:{MusicFileName.title}</div>
        <div>createdAt:{MusicFileName.createdAt}</div>
        <audio src={url} controls> 
        </audio>  */}
      </div>
      {
        MusicFileName.length === 0?
        <div className='flex justify-evenly items-center h-72 border border-purple-600 rounded-lg font-bold text-white text-xl p-2 '>
        <LuDownload size={25}/>
        <div className=''>
        دانلودی ثبت نشده است
        </div>
        <button className={ButtonClassName}>دانلود</button>
        </div>
        :

        <>
<div className="flex flex-col border border-purple-600 rounded-lg font-bold text-white text-xl p-2  ">
        <div className="flex justify-between p-1 m-1">
          <div className="text-base font-semibold border-b-2 border-purple-500 text-white">
            ردیف
          </div>
          <div className="text-base font-semibold border-b-2 border-purple-500 text-white">
            نام هنرمند
          </div>
          <div className="text-base font-semibold border-b-2 border-purple-500 text-white">
            نام اثر
          </div>
          <div className="text-base font-semibold border-b-2 border-purple-500 text-white">
            تاریخ
          </div>
        </div>
          <div className="flex justify-between rounded-lg h-full w-full p-1 m-1">
            <p className='p-2 text-3xl'>1</p>
            <span className="text-sm font-semibold p-2">
              {MusicFileName.artist}
            </span>
            <span className="text-sm font-semibold p-2">
              {MusicFileName.title}
            </span>
            <span className="text-sm font-semibold p-2">
              {MusicFileName.createdAt}
            </span>
          </div>
          </div>
        </>
      }
     
      
      
    </>
  )
}

export default DownloadList