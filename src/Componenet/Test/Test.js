import React, { useState, useRef, useEffect } from "react";
import Slider from "@mui/material/Slider";
import SkipPreviousSharpIcon from "@mui/icons-material/SkipPreviousSharp";
import SkipNextSharpIcon from "@mui/icons-material/SkipNextSharp";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import { PiHeadCircuitFill } from "react-icons/pi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BiDownload } from "react-icons/bi";
import { MdStarRate } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import {  showMusicplayer } from "../StateManagement/Action";
import ServerURL from "../API/ServerURL";

const Test = ({infoOneMusic}) => {
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [show, setShow] = useState(true);
  const [number, setNumber] = useState(0);
  const dispatch=useDispatch();
  const baseUrl = ServerURL();
  // const baseUrl = "http://localhost:3000/";
  const urlFinal = baseUrl + (infoOneMusic.file_pathtagMP3||infoOneMusic.file_pathMP3Orginal);
  const audioRef = useRef(null);
 

  function formatDuration(duration) {
    if (typeof duration !== "number" || isNaN(duration) || duration < 0)
      return "0.00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return minutes + ":" + seconds.toString().padStart(2, "0");
  }

  const finalDuration = formatDuration(duration);

  const handleseek = (e) => {
    const seekTime = parseFloat(e.target.value); // تبدیل به عدد

    if (!isNaN(seekTime) && audioRef.current) {
      audioRef.current.currentTime = seekTime; // اعمال زمان جستجو
      setCurrentTime(seekTime); // به روز رسانی currentTime
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleplay = () => {
    audioRef.current.play();
  };

  const handlepause = () => {
    audioRef.current.pause();
  };

  useEffect(() => {
    
    const audioElement = audioRef.current;
    if (audioRef.current) {
      audioRef.current.pause();
      setShow(true);
    }
 

    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [audioRef, number]);

  const handleSkipPrevious = () => {
    if (number > 0) {
      setNumber((last) => last - 1);
    }
  };


  const handleSkipNext = () => {
    if (number < musicList.length - 1) {
      setNumber((last) => last + 1);
    }
  };

  return (
    <div className={`fixed bottom-1 ${showPlayer ? "h-24" : "h-8"} right-2 -left-2 py-2 px-4 w-screen transition-all duration-500`}>
    <div className={`h-24 gap-4 flex flex-row ${showPlayer ? " bg-zinc-950" : " bg-transparent "}  rounded-lg shadow-inner shadow-purple-800 text-white place-items-center transition-all duration-500`}>
      {!loading ? (
        <>
          <div className="flex p-2 justify-between basis-1/4">
            <div className="flex p-2 gap-4 justify-between">
              <IoIosCloseCircleOutline size={20} onClick={() => dispatch(showMusicplayer(true))} />
              {showPlayer ? (
                <FaRegArrowAltCircleUp onClick={() => setShowPlayer(p => !p)} className="mb-12" size={20} />
              ) : (
                <FaRegArrowAltCircleDown onClick={() => setShowPlayer(p => !p)} className="mb-12" size={20} />
              )}
            </div>
              <img
                className="rounded-lg h-20 w-20"
                src={baseUrl+infoOneMusic.file_pathImage}
                alt={infoOneMusic.title}
              />
            </div>
            <div className="basis-2/4 ">
              {/* {infoOneMusic.title} */}
              <div className="flex flex-col">
                <div>
                  <Slider
                    style={{ color: "white" }}
                    onChange={handleseek}
                    type="range"
                    min={0}
                    max={Number.isNaN(duration) ? "0.00" : duration}
                    value={currentTime}
                  />
                </div>
                <div className="flex flex-row gap-4 p-2 ">
                  <div className="basis-1/5">
                    {Math.floor(currentTime / 60)}:
                    {Math.floor(currentTime % 60) < 10
                      ? "0" + Math.floor(currentTime % 60)
                      : Math.floor(currentTime % 60)}
                  </div>
                  <SkipPreviousSharpIcon
                    size={30}
                    onClick={handleSkipPrevious}
                    className="basis-1/5"
                  ></SkipPreviousSharpIcon>
                  {show ? (
                    <PlayCircleOutlineIcon
                      size={30}
                      onClick={() => {
                        handleplay();
                        setShow(false);
                      }}
                      className="basis-1/5"
                    ></PlayCircleOutlineIcon>
                  ) : (
                    <PauseCircleFilledRoundedIcon
                      size={30}
                      onClick={() => {
                        handlepause();
                        setShow(true);
                      }}
                      className="basis-1/5"
                    ></PauseCircleFilledRoundedIcon>
                  )}
                  <SkipNextSharpIcon
                    size={30}
                    onClick={handleSkipNext}
                    className="basis-1/5"
                  ></SkipNextSharpIcon>
                  <div className="basis-1/5">
                    {Number.isNaN(duration) ? "0.00" : finalDuration}
                  </div>
                </div>
              </div>
            </div>
            <div dir="rtl" className="flex flex-col basis-1/4">
              <div className="flex justify-center flex-row ">
                <div className="basis-1/4">
                  <PiHeadCircuitFill size={25} />

                  <div className="basis-2/3">
                    <BiDownload size={25} />
                  </div>
                  <div className="basis-2/3">
                    <MdStarRate size={25} />
                  </div>
                </div>
                <div>
                  <div className="mr-3">{infoOneMusic.title}</div>
                  <div className="mr-3">{infoOneMusic.tempo}</div>
                  <div className="mr-3">{infoOneMusic.view}</div>
                </div>
              </div>
            </div>
            <audio ref={audioRef} src={urlFinal} />
          </>
        ) : (
          "loading..."
        )}
      </div>
    </div>
  );
};

export default Test;
