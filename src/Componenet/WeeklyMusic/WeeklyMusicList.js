
import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { RiDiscountPercentLine } from "react-icons/ri";
import { MdArrowCircleLeft, MdArrowCircleRight } from "react-icons/md";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import axios from "axios";
import { fetchurlMuiscFile, getOneMusicInfo, showMusicplayer } from "../StateManagement/Action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion, AnimatePresence } from "framer-motion";
import ServerURL from "../API/ServerURL";
const WeeklyMusicList = () => {
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const FinalUrl = ServerURL();
  // const FinalUrl = "http://localhost:3000/";
  const getMusic = useCallback(async () => {
    try {
      setLoading(true);
      const url = `${ServerURL()}musics`;
      // const url = `http://localhost:3000/musics`;
      const res = await axios.get(url);
      setMusicList(res.data);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMusic();
  }, [getMusic]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3;

  const handelNextIndexPic = useCallback(() => {
    if (currentSlide + itemsPerPage < musicList.length) {
      setCurrentSlide(prev => prev + itemsPerPage);
    } else {
      setCurrentSlide(0);
    }
  }, [currentSlide, musicList.length]);

  const handelPervIndexPic = useCallback(() => {
    if (currentSlide >= itemsPerPage) {
      setCurrentSlide(prev => prev - itemsPerPage);
    } else {
      setCurrentSlide(
        Math.max(
          musicList.length - (musicList.length % itemsPerPage || itemsPerPage),
          0
        )
      );
    }
  }, [currentSlide, musicList.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
  {
    loading?
    <div className="flex justify-center items-center h-96">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
:
 
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-1 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handelPervIndexPic}
            className="p-1 rounded-full focus:outline-none"
            aria-label="Previous"
          >
            <MdArrowCircleLeft color="gray" size={40} />
          </motion.button>
        </div>

        <div className="col-span-10">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {musicList.slice(currentSlide, currentSlide + itemsPerPage).map((a, i) => (
                  <motion.div
                    key={`${a.id}-${i}`}
                    whileHover={{ y: -5 }}
                    className="bg-zinc-950 border border-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    {a.discountPriceTanzim ===null? (
                        
                       <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-900 to-red-700 text-white">تخفیف ندارد</div>  
                        )
                        :
                        (<div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-900 to-red-700 text-white">
                        <RiDiscountPercentLine size={24} />
                        <span className="font-medium">
                          {parseFloat(a.discountPriceTanzim).toLocaleString()} تومان تخفیف
                        </span>
                      </div>
                    )
                  }
                    
                    <div className="relative  w-full overflow-hidden">
                      <LazyLoadImage
                        alt={a.title}
                        src={!a.file_pathImage ? "12-1024x745-1-5.png" : FinalUrl + a.file_pathImage}
                        effect="opacity"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        placeholderSrc="/placeholder-music.jpg"
                      />
                      <button
                        onClick={() => {
                          dispatch(showMusicplayer(true));
                          dispatch(fetchurlMuiscFile(a));
                        }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all"
                      >
                        <PlayCircleOutlineIcon className="text-white text-lg" />
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-200 mb-1 truncate">{a.artistName}</h3>
                      <h4 className="text-lg text-gray-300 mb-2 truncate">{a.title}</h4>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{a.tozihat}</p>

                      <div className="flex items-center justify-between mb-3">
                        <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                          <div>{a.rate}</div>
                          <div>امتیاز کاربران</div>
                        </div>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Rating
                            name="text-feedback"
                            value={a.sheromelody}
                            readOnly
                            precision={0.5}
                            emptyIcon={
                              <StarIcon style={{ opacity: 0.55, color: "yellow",whitesmoke:"", fontSize:"inherit"}}  />
                            }
                          />
                        </Box>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold text-white">
                          {a.orginalPriceTanzim === null 
                            ? "قیمتی درج نشده" 
                            : `${parseFloat(a.orginalPriceTanzim).toLocaleString()} تومان`}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            dispatch(getOneMusicInfo(musicList[currentSlide + i]));
                            navigate(`/product/${a.type}`);
                          }}
                          className="px-4 py-2 bg-black hover:bg-green-700  text-white font-medium rounded-lg transition-colors"
                        >
                          انتخاب
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="col-span-1 flex justify-start">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handelNextIndexPic}
            className="p-1 rounded-full focus:outline-none"
            aria-label="Next"
          >
            <MdArrowCircleRight color="gray" size={40} />
          </motion.button>
        </div>
      </div>
    </div>
     }
    </>
  );
};

export default WeeklyMusicList;
