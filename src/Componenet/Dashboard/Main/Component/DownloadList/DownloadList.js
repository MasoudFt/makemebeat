import React, { useEffect, useState } from "react";
import { FiTrash2 } from 'react-icons/fi';
import { LuDownload } from 'react-icons/lu';
import { useSelector } from "react-redux";
import axios from "axios";
import ServerURL from "../../../../API/ServerURL";

const DownloadList = () => {
  const [musicList, setMusicList] = useState([]);
  const MusicFileName = useSelector((state) => state.musicId);
  const url = `${ServerURL()}musics/${MusicFileName.fileName}`;

  const getMusic = async () => {
    try {
      const res = await axios.get(url);
      setMusicList(res);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getMusic();
  }, [MusicFileName]);

  return (
    <div className="bg-zinc-950 rounded-xl shadow-lg p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
          <span className="bg-purple-500/10 p-2 rounded-lg">
            <LuDownload className="text-purple-400" size={20} />
          </span>
          لیست دانلودها
        </h2>
        
        <div className="text-sm text-gray-500">
          {MusicFileName?.length > 0 ? '1 آیتم' : 'خالی'}
        </div>
      </div>
      
      {MusicFileName?.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-2 text-gray-400 text-sm border-b border-gray-800 pb-2 px-2">
            <div className="col-span-1">ردیف</div>
            <div className="col-span-3">نام هنرمند</div>
            <div className="col-span-4">نام اثر</div>
            <div className="col-span-2">تاریخ</div>
            <div className="col-span-2">عملیات</div>
          </div>
          
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-3 hover:border-purple-500/50 transition-colors">
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-1 text-purple-400">1</div>
              <div className="col-span-3 text-gray-200 truncate">{MusicFileName.artist}</div>
              <div className="col-span-4 text-gray-200 truncate">{MusicFileName.title}</div>
              <div className="col-span-2 text-gray-400 text-sm">{MusicFileName.createdAt}</div>
              <div className="col-span-2 flex justify-end gap-2">
                <button className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 rounded transition-colors">
                  <LuDownload size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800/20 border border-dashed border-gray-700 rounded-lg p-8 text-center">
          <LuDownload className="mx-auto text-gray-600 mb-3" size={48} />
          <div className="text-gray-400 mb-1">لیست دانلودهای شما خالی است</div>
          <div className="text-sm text-gray-600">آهنگ‌هایی که دانلود می‌کنید در اینجا نمایش داده می‌شوند</div>
          <button className="mt-4 text-purple-400 hover:text-purple-300 text-sm flex items-center justify-center gap-1 mx-auto">
            مشاهده آهنگ‌ها
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0  0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadList;
