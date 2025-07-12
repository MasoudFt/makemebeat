import React from "react";
import Skeleton from '@mui/material/Skeleton';
import { GiMusicalScore } from "react-icons/gi";
import Stack from '@mui/material/Stack';
import { GiMetronome } from "react-icons/gi";
import { PiMicrophoneStage } from "react-icons/pi";
import { BsFileMusic } from "react-icons/bs";
// import { FaCheckerboard } from "react-icons/fa"; // این آیکون مشکل داشت
import { TbBuilding } from "react-icons/tb"; // یک آیکون جایگزین برای نمایش پروژه
import { MdOutlineSubtitles } from "react-icons/md"; // آیکون مناسب‌تر برای توضیحات

const MainSection = ({ OneMusicInfo }) => {
  const FinalUrl = "http://localhost:3000/";

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 bg-zinc-900 rounded-2xl shadow-xl border border-zinc-700">

        <div className="md:w-1/3 lg:w-1/2 xl:w-2/5 flex justify-center items-center">
          {OneMusicInfo.title === undefined ?
            <Stack spacing={1} width="100%">
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ bgcolor: 'grey.800', borderRadius: '16px' }} />
            </Stack>
            :
            <img
              className="max-w-full h-auto rounded-2xl object-cover"
              src={FinalUrl + OneMusicInfo.file_pathImage}
              alt="cover"
              onError={(e) => (e.target.src = "/fallback_image.png")}
            />
          }
        </div>

        <div dir="rtl" className="md:flex-1 flex flex-col gap-4">
          {/* Top Message Section */}
          <div className="border-b border-zinc-700 pb-4 mb-4">
            <p className="text-sm text-gray-300">این بیت در سه نسخه Wave.Mp3 و پروژه به فروش می‌رسد.</p>
          </div>

          {/* Main Info Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OneMusicInfo.gammuisc !== null && OneMusicInfo.gammuisc !== undefined && (
              <div className="flex items-center gap-3 p-2 bg-zinc-800 rounded-lg">
                <TbBuilding size={30} className="text-cyan-500"/>
                <span className="font-semibold text-lg flex-1 truncate">{OneMusicInfo.gammuisc}</span>
              </div>
            )}

            <div className="flex items-center gap-3 p-2 bg-zinc-800 rounded-lg">
              <PiMicrophoneStage size={30} className="text-purple-500"/>
              <span className="font-semibold text-lg flex-1 truncate">{OneMusicInfo.artistName || "هنرمند نامشخص"}</span>
            </div>

            <div className="flex items-center gap-3 p-2 bg-zinc-800 rounded-lg">
              <BsFileMusic size={30} className="text-pink-500"/>
              <span className="font-semibold text-lg flex-1 truncate">{OneMusicInfo.title || "نام موزیک نامشخص"}</span>
            </div>

            <div className="flex items-center gap-3 p-2 bg-zinc-800 rounded-lg">
              <GiMetronome size={30} className="text-yellow-500"/>
              <span className="font-semibold text-lg flex-1 truncate">{OneMusicInfo.tempo || "---"}</span>
            </div>
          </div>

          <div className="mt-6 border-t border-zinc-700 pt-4 flex items-center gap-3">
            <MdOutlineSubtitles size={30} className="text-gray-400"/>
            <span className="text-gray-300">برای توضیحات بیشتر یا نظرات، به بخش مربوطه مراجعه کنید.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSection;