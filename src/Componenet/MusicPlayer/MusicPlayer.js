
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
import { showMusicplayer } from "../StateManagement/Action";
import ServerURL from "../API/ServerURL";

const MusicPlayer = ({ infoOneMusic }) => {
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPlayer, setShowPlayer] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [show, setShow] = useState (true);
  const [number, setNumber] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const dispatch = useDispatch();
  const baseUrl = ServerURL();
  // const baseUrl = "http://localhost:3000/uploads/musics/03. Ever Wonder.mp3";
  const urlFinal = baseUrl + (infoOneMusic.file_pathtagMP3 || infoOneMusic.file_pathMP3Orginal);
  const audioRef = useRef(null);

  function formatDuration(duration) {
    if (typeof duration !== "number" || isNaN(duration) || duration < 0) return "0:00";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  const finalDuration = formatDuration(duration);

  const handleSeek = (e, newValue) => {
    const seekTime = parseFloat(newValue);
    if (!isNaN(seekTime) && audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e, newValue) => {
    const newVolume = parseFloat(newValue);
    if (!isNaN(newVolume) && audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const togglePlay = () => {
    if (show) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setShow(!show);
  };

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

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.pause();
      setShow(true);
    }

    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("ended", () => {
        setShow(true);
        if (number < musicList.length - 1) {
          handleSkipNext();
        }
      });
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("ended", () => {});
      }
    };
  }, [audioRef, number]);

  return (
    <div
      className={`fixed bottom-0 ${
        showPlayer ? "h-28 md:h-32" : "h-10"
      } left-0 right-0 py-2 px-4 w-full transition-all duration-300 ease-in-out z-50`}
    >
      <div
        className={`h-full gap-2 md:gap-4 flex flex-row ${
          showPlayer
            ? "bg-zinc-900"
            : "bg-transparent"
        } rounded-t-lg shadow-lg shadow-purple-900/50 text-white items-center transition-all duration-300 ease-in-out`}
      >
        {!loading ? (
          <>
            {/* Album Art and Controls */}
            <div className="flex items-center p-1 md:p-2 w-1/4 md:w-1/5">
              <div className="flex flex-col items-center mr-2 md:mr-4">
                <div className="flex space-x-2 mb-1">
                  <button
                    onClick={() => dispatch(showMusicplayer(true))}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <IoIosCloseCircleOutline size={20} />
                  </button>
                  <button
                    onClick={() => setShowPlayer((p) => !p)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {showPlayer ? (
                      <FaRegArrowAltCircleUp size={20} />
                    ) : (
                      <FaRegArrowAltCircleDown size={20} />
                    )}
                  </button>
                </div>
                <img
                  className={`rounded-lg ${
                    showPlayer ? "h-16 w-16 md:h-20 md:w-20" : "h-0 w-0"
                  } object-cover transition-all duration-300`}
                  src={baseUrl + infoOneMusic.file_pathImage}
                  alt={infoOneMusic.title}
                />
              </div>
            </div>

            {/* Main Player Controls */}
            <div className="flex flex-col flex-grow px-2 md:px-4">
              {showPlayer && (
                <>
                  <div className="w-full">
                    <Slider
                      value={currentTime}
                      min={0}
                      max={duration || 100}
                      onChange={handleSeek}
                      sx={{
                        color: "#a855f7",
                        height: 4,
                        "& .MuiSlider-thumb": {
                          width: 12,
                          height: 12,
                          transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                          "&:hover, &.Mui-focusVisible": {
                            boxShadow: "0px 0px 0px 8px rgba(168, 85, 247, 0.16)",
                          },
                          "&.Mui-active": {
                            width: 16,
                            height: 16,
                          },
                        },
                        "& .MuiSlider-rail": {
                          opacity: 0.5,
                          backgroundColor: "#4b5563",
                        },
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs md:text-sm text-gray-300 w-12">
                      {formatDuration(currentTime)}
                    </span>
                    <div className="flex items-center space-x-3 md:space-x-6">
                      <button
                        onClick={handleSkipPrevious}
                        className="text-gray-300 hover:text-purple-400 transition-colors"
                      >
                        <SkipPreviousSharpIcon fontSize="medium" />
                      </button>
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-purple-400 transition-colors"
                      >
                        {show ? (
                          <PlayCircleOutlineIcon fontSize="large" />
                        ) : (
                          <PauseCircleFilledRoundedIcon fontSize="large" />
                        )}
                      </button>
                      <button
                        onClick={handleSkipNext}
                        className="text-gray-300 hover:text-purple-400 transition-colors"
                      >
                        <SkipNextSharpIcon fontSize="medium" />
                      </button>
                    </div>
                    <span className="text-xs md:text-sm text-gray-300 w-12 text-right">
                      {Number.isNaN(duration) ? "0:00" : finalDuration}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Track Info and Additional Controls */}
            {showPlayer && (
              <div className="hidden md:flex flex-col items-end w-1/4">
                <div className="flex items-center space-x-4 mt-2 p-2">
                  <button className="text-gray-300 hover:text-purple-400 transition-colors">
                    <PiHeadCircuitFill size={20} />
                  </button>
                  <button className="text-gray-300 hover:text-purple-400 transition-colors">
                    <BiDownload size={20} />
                  </button>
                  <button className="text-gray-300 hover:text-purple-400 transition-colors">
                    <MdStarRate size={20} />
                  </button>
                </div>
                <div className="text-right mr-4">
                  <h3 className="text-sm font-semibold truncate max-w-[200px]">
                    {infoOneMusic.title}
                  </h3>
                  <p className="text-xs text-gray-400">{infoOneMusic.tempo}</p>
                  <p className="text-xs text-gray-400">{infoOneMusic.view} plays</p>
                </div>
                <div className="mt-2 mr-4 w-full max-w-[120px]">
                  <Slider
                    value={volume}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={handleVolumeChange}
                    sx={{
                      color: "#a855f7",
                      height: 4,
                      "& .MuiSlider-thumb": {
                        width: 10,
                        height: 10,
                      },
                    }}
                  />
                </div>
              </div>
            )}

            {/* Mobile View - Collapsed */}
            {!showPlayer && (
              <div className="flex items-center justify-between w-full px-2">
                <div className="flex items-center space-x-2">
                  <button onClick={togglePlay} className="text-white">
                    {show ? (
                      <PlayCircleOutlineIcon fontSize="small" />
                    ) : (
                      <PauseCircleFilledRoundedIcon fontSize="small" />
                    )}
                  </button>
                  <span className="text-sm truncate max-w-[150px]">
                    {infoOneMusic.title}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {formatDuration(currentTime)} / {finalDuration}
                </span>
              </div>
            )}

            <audio ref={audioRef} src={urlFinal} />
          </>
        ) : (
          <div className="w-full text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
