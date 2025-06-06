import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { RiDiscountPercentLine } from "react-icons/ri";
import { MdArrowCircleLeft } from "react-icons/md";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { MdArrowCircleRight } from "react-icons/md";
import axios from "axios";
import {
  fetchurlMuiscFile,
  getOneMusicInfo,
  showMusicplayer,
} from "../StateManagement/Action";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LikeGenere = ({ OneMusicInfo }) => {
  const [musicList, setMusicList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scrollToTop = () => {
    window.scrollTo({
      top: -6,
      behavior: "smooth", // برای اسکرول نرم
    });
  };
  const imageUrl = `http://localhost:3000/`;
  const getMusic = async () => {
    try {
      const url = `http://localhost:3000/musics/like/${OneMusicInfo.type}`;
      const res = await axios.get(url);
      setMusicList(res.data);
    } catch (error) {
      console.log(error.response);
      setError(error.response.data);
    }
  };

  useEffect(() => {
    getMusic();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 3;

  const handelNextIndexPic = () => {
    if (currentSlide + itemsPerPage < musicList.length) {
      setCurrentSlide((prev) => prev + itemsPerPage);
    } else {
      setCurrentSlide(0); // Loop back to start
    }
  };

  const handelPervIndexPic = () => {
    if (currentSlide >= itemsPerPage) {
      setCurrentSlide((prev) => prev - itemsPerPage);
    } else {
      setCurrentSlide(
        Math.max(
          musicList.length - (musicList.length % itemsPerPage || itemsPerPage),
          0
        )
      ); // Loop back to end
    }
  };

  return (
    <>
      {/* <div ref={topRef} /> */}
      {error ? (
        <p className="text-base  text-cyan-50 text-center">{error}</p>
      ) : (
        <>
          <div className="flex p-2 mt-8">
            <div className="h-16 flex-1 text-cyan-50  ...">
              <div className="grid justify-items-end h-full w-full">
                <MdArrowCircleLeft
                  color="gray"
                  style={{ cursor: "pointer" }}
                  size={40}
                  onClick={handelPervIndexPic}
                />
              </div>
            </div>
            <div className="h-16 w-fit  text-cyan-50 text-lg font-bold p-2 shrink-0 ">
              موزیک های مشابه
            </div>
            <div className="h-16 flex-1 text-cyan-50  ...">
              <div className="grid justify-items-start h-full w-full">
                <MdArrowCircleRight
                  color="gray"
                  style={{ cursor: "pointer" }}
                  size={40}
                  onClick={handelNextIndexPic}
                />
              </div>
            </div>
          </div>
          <div className="flex h-screen items-center justify-center  mt-8">
            <div className="flex-grow mx-5">
              <div className={`mt-5 p-3 grid grid-cols-3 gap-2`}>
                {musicList.slice(currentSlide, currentSlide + 3).map((a, i) => (
                  <div
                    key={i}
                    className="w-full max-w-sm border border-gray-600 rounded-lg shadow-sm bg-zinc-950"
                  >
                    <div className="flex gap-2 m-2 text-cyan-50 text-xl">
                      <RiDiscountPercentLine size={35} title="تخفیف" />
                      {a.discountPriceTanzim} تومان
                    </div>
                    <img
                      // alt={a.title}
                      className="p-2 rounded-xl h-72 w-full"
                      src={imageUrl + a.file_pathImage}
                    />
                    <div className="px-2 pb-2">
                      <div className="justify-items-end">
                        <div className="text-xl mb-2 font-semibold tracking-tight text-gray-900 dark:text-stone-300">
                          آرتیست : {a.artistName}
                        </div>
                        <div className="text-lg mb-2 font-semibold tracking-tight text-gray-900 dark:text-stone-300">
                          نام موزیک : {a.title}
                        </div>
                        <div className="text-sm font-semibold tracking-tight text-gray-900 dark:text-stone-300">
                          {a.tozihat}
                        </div>
                      </div>
                      <div className="flex mt-2.5 mb-2.5">
                        <div className="space-x-1">
                          <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-sm ms-2">
                            <div>{a.rate}</div>
                            <div>امتیاز کاربران</div>
                          </div>
                        </div>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Rating
                            name="text-feedback"
                            value={a.sheromelody}
                            readOnly
                            precision={0.5}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55, color: "whitesmoke" }}
                                fontSize="inherit"
                              />
                            }
                          />
                        </Box>
                      </div>
                      <div dir="rtl" className="flex items-center">
                        <span className="font-bold text-gray-900 dark:text-white">
                          قیمت :{" "}
                          {a.orginalPriceTanzim === null
                            ? ""
                            : a.orginalPriceTanzim.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-1 m-1">
                        <button
                          onClick={() => {
                            dispatch(
                              getOneMusicInfo(musicList[currentSlide + i])
                            );
                            scrollToTop();
                            navigate("/product");
                          }}
                          className="h-14 w-14 bg-zinc-900 text-base text-center text-blue-300 font-semibold rounded-lg"
                        >
                          انتخاب
                        </button>
                        <PlayCircleOutlineIcon
                          size={25}
                          className="text-cyan-50"
                          onClick={() => {
                            dispatch(showMusicplayer(true));
                            dispatch(fetchurlMuiscFile(a));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LikeGenere;
