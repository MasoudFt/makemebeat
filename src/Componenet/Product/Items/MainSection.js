import React from "react";
import Skeleton from '@mui/material/Skeleton';
import { GiMusicalScore } from "react-icons/gi";
import Stack from '@mui/material/Stack';
import { GiMetronome } from "react-icons/gi";
import { PiMicrophoneStage } from "react-icons/pi";
import { BsFileMusic } from "react-icons/bs";
const MainSection = ({ OneMusicInfo }) => {
 const FinalUrl = `http://localhost:3000/`;
  return (
    <>
      <div className="flex  gap-4 border-2 border-zinc-900">
        <div className="p-2 basis-2/4">
          {OneMusicInfo.title ===undefined ? 
            <Stack   spacing={1}>
            <Skeleton style={{backgroundColor:"gray"}} variant="rectangular" width={380} height={560} />
          </Stack>
          :
          <img
            className=" h-full w-full rounded-2xl"
            src={FinalUrl+OneMusicInfo.file_pathImage}
            alt="cover"
          />
          }
        </div>
        <div dir="rtl" className="basis-2/4 text-white ">
        <div className="">
          <div className="h-24 p-3">
            این بیت در سه نسخه Wave.Mp3 و پروژه به فروش می رسد
          </div>
        </div>
        <div>
            
            {OneMusicInfo.gammuisc ===null? 
            ""
            :
            <>
          <div className="flex h-24 w-80">
            <GiMusicalScore className="ml-4" size={35} />
            {OneMusicInfo.gammuisc}
          </div>
            </>
            }
          <div className="flex h-24 w-80">
            <PiMicrophoneStage className="ml-4" size={35} /> 
            {OneMusicInfo.artistName}
          </div>
          <div className="flex h-24 w-80">
          <BsFileMusic  size={35} className="ml-4" />
          {OneMusicInfo.title}
          </div>
          <div className="flex h-24 w-80">
            <GiMetronome className="ml-4" size={35} /> {OneMusicInfo.tempo}
          </div>
        </div>
        </div>
       
      </div>
    </>
  );
};

export default MainSection;
