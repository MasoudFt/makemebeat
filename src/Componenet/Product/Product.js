import React, { useState } from "react";
import SectionLeft from "./Items/SectionLeft";
import MainSection from "./Items/MainSection";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import WeeklyMusicList from "../WeeklyMusic/WeeklyMusicList";
import { useSelector } from "react-redux";
import LikeGenere from "../MusicLikeGener/LikeGenere";

const Product = () => {
  const OneMusicInfo=useSelector((state)=>state.MusicInfo)
  return (
    <>
      <div className="h-full grid grid-flow-col grid-rows-3 bg-zinc-950 gap-4 mt-32 p-4">
        <SectionLeft OneMusicInfo={OneMusicInfo}/>
        <div className=" p-4 row-span-3 rounded-lg col-span-10 bg-zinc-950 ">
          <div className="">
          <MainSection OneMusicInfo={OneMusicInfo}/>
          </div>
          <LikeGenere OneMusicInfo={OneMusicInfo}/>
        </div>
        </div>
        <div className="col-span-10 rounded-xl row-span-1 bg-gray-900">
        
      </div>
    </>
  );
};

export default Product;
