import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { RiDiscountPercentLine } from "react-icons/ri";
import { MdArrowCircleLeft } from "react-icons/md";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { MdArrowCircleRight } from "react-icons/md";
import axios from "axios";
import { fetchurlMuiscFile, getOneMusicInfo, showMusicplayer } from "../StateManagement/Action";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const WeeklyMusicList = () => {
  const [musicList, setMusicList] = useState([]);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  const FinalUrl = `http://localhost:3000/`;
  const getMusic = async () => {
    try {
      const url = `http://localhost:3000/musics`;
      const res = await axios.get(url);
      setMusicList(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getMusic();
  
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handelNextIndexPic = () => {
    if (currentSlide < product.length - 1) {
      setCurrentSlide((e) => e + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const handelPervIndexPic = () => {
    if (currentSlide !== 0) {
      setCurrentSlide((e) => e - 1);
    } else {
      setCurrentSlide(product.length - (product.length % 3 || 3));
    }
  };

  const product = [
    {
      image: "https://makemebeat.net/wp-content/uploads/2020/11/2221212.jpg",
      title: "روزبه قائم",
      description: "خواننده,آهنگساز,تنظیم کننده,میکس من",
      rate: "5.0",
      price: "150000",
    },
    {
      image:
        "https://makemebeat.net/wp-content/uploads/2022/09/WhatsApp%20Image%202022-09-10%20at%2012.16.39%20PM.jpeg",
      title: "آبتین",
      description: "کارگردان",
      rate: "1.5",
      price: "150000",
    },
    {
      image:
        "https://makemebeat.net/wp-content/uploads/2023/01/%D9%85%D8%AC%D8%AA%D8%A8%DB%8C-%D8%AA%D9%82%DB%8C-%D9%BE%D9%88%D8%B1.png",
      title: "مجتبی تقی پور",
      description: "آهنگساز,خواننده,نوازنده",
      rate: "3.0",
      price: "150000",
    },
    {
      image: "https://makemebeat.net/wp-content/uploads/2022/07/M-Namdar.png",
      title: "محسن نامدار",
      description: "آهنگساز,تنظیم کننده,میکس من",
      rate: "4.0",
      price: "150000",
    },
    {
      image: "https://makemebeat.net/wp-content/uploads/2022/06/unnamed.jpg",
      title: "پویا صفا",
      description: "آهنگساز,تنظیم کننده,میکس من",
      rate: "5.0",
      price: "150000",
    },
    {
      image:
        "https://makemebeat.net/wp-content/uploads/2022/05/274224342_224286739917884_5050267142920397498_n.jpg",
      title: "محمد سیحونی",
      description: "تهییه کننده,نویسنده,کارگردان,تدوین گر",
      rate: "3.5",
      price: "150000",
    },
    {
      image:
        "https://makemebeat.net/wp-content/uploads/2023/02/Amin_Captive-800x600.jpg",
      title: "Amin Captive",
      description: "کارگردان,گرافیست",
      rate: "4.0",
      price: "150000",
    },
    {
      image:
        "https://makemebeat.net/wp-content/uploads/2023/06/IMG_20230519_165431_468-400x400.jpg",
      title: "علی سونار ",
      description: "آهنگ ساز,تنظیم کننده,میکس من",
      rate: "4.0",
      price: "150000",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-12 gap-2 justify-between  place-content-center ">
        <div className="col-span-1 ">
          <div className="grid justify-items-end  items-center h-full w-full">
            <MdArrowCircleLeft
              color="gray"
              style={{ cursor: "pointer" }}
              size={40}
              onClick={handelPervIndexPic}
            />
          </div>
        </div>

        <div className="col-span-10">
          <div className={`mt-5 p-3 grid grid-cols-3 gap-2`}>
            {/* {musicList.slice(currentSlide, currentSlide + 3).map((a, i) => ( */}
            {musicList.map((a, i) => (
              <div
                key={i}
                className={`w-full col max-w-sm 
                
                  border border-gray-600 rounded-lg shadow-sm bg-zinc-950`}
              >
                <div className="flex gap-2 m-2 text-xl">
                <RiDiscountPercentLine size={35} fontSize={10} title="تخفیف"/>
                {a.discountPriceTanzim} تومان 
                </div>
                <img
                  // alt={a.title}
                  className="p-2 rounded-xl h-72 w-full"
                  src={FinalUrl+a.file_path.replace(/\\/g, "/")}
                />
                <div className="px-2 pb-2 ">
                  <div className="justify-items-end">
                    <div className="text-xl mb-2 font-semibold tracking-tight text-gray-900 dark:text-stone-300 ">
                     آرتیست : {a.artistName}
                    </div>
                    <div className="text-lg mb-2 font-semibold tracking-tight text-gray-900 dark:text-stone-300 ">
                    نام موزیک :  {a.title}
                    </div>
                    <div className="text-sm font-semibold tracking-tight text-gray-900 dark:text-stone-300">
                      {a.tozihat}
                    </div>
                  </div>
                  <div className="flex mt-2.5 mb-2.5">
                    <div className="space-x-1 ">
                    <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-sm ms-2">
                        <div className="">{a.rate}</div>
                        <div className="">امتیاز کاربران</div>
                      </div>
                    </div>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Rating
                          name="text-feedback"
                          value={a.sheromelody}
                          readOnly
                          precision={0.5}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55,color:"whitesmoke" }}
                              fontSize="inherit"
                            />
                          }
                        />
                      </Box>
                   
                  </div>
                  <div dir="rtl" className="flex items-center ">
                    <span className=" font-bold text-gray-900 dark:text-white">
                      قیمت : {a.orginalPriceTanzim === null?"":a.orginalPriceTanzim}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-1 m-1">
                    <button
                      onClick={()=>{dispatch(getOneMusicInfo(musicList[i]));navigate('/product')}
                      }
                      className="h-14 w-14 bg-zinc-900 text- base text-center text-blue-300 font-semibold rounded-lg"
                    >
                      انتخاب
                    </button>
                      <PlayCircleOutlineIcon size={25}  className="text-cyan-50"
                      onClick={()=>{dispatch(showMusicplayer(true));dispatch(fetchurlMuiscFile(a))}}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid justify-items-start items-center h-full w-full">
            <MdArrowCircleRight
              color="gray"
              style={{ cursor: "pointer" }}
              size={40}
              onClick={handelNextIndexPic}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeklyMusicList;
