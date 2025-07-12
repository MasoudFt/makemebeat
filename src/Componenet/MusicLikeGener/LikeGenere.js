import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { RiDiscountPercentLine } from "react-icons/ri";
import { MdArrowCircleLeft, MdArrowCircleRight } from "react-icons/md";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import axios from "axios";
import {
  fetchurlMuiscFile,
  getOneMusicInfo,
  showMusicplayer,
} from "../StateManagement/Action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LikeGenere = ({ OneMusicInfo }) => {
  const [musicList, setMusicList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scrollToTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    []
  );

  const imageUrl = "http://localhost:3000/"; // ServerURL()

  const getMusic = useCallback(async () => {
    if (!OneMusicInfo || !OneMusicInfo.type) {
      setError("لطفاً نوع موسیقی را برای یافتن موارد مشابه انتخاب کنید.");
      setMusicList([]);
      return;
    }
    setError(""); // پاک کردن خطای قبلی
    try {
      const url = `${imageUrl}musics/like/${OneMusicInfo.type}`;
      const res = await axios.get(url);
      setMusicList(res.data);
    } catch (err) {
      console.error(
        "Error fetching similar music:",
        err.response || "Unknown error"
      );
      setError("خطا در دریافت موسیقی‌های مشابه. لطفاً بعداً تلاش کنید.");
      setMusicList([]);
    }
  }, [OneMusicInfo?.type, imageUrl]);

  useEffect(() => {
    getMusic();
  }, [getMusic]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const getItemsPerPage = useCallback(() => {
    if (window.innerWidth < 640) return 1; // Mobile
    if (window.innerWidth < 768) return 2; // Tablet
    return 3; // Desktop
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getItemsPerPage]);

  const totalItems = musicList.length;
  const visibleMusic = musicList.slice(
    currentSlide,
    currentSlide + itemsPerPage
  );

  // مدیریت اسلایدها (فقط اگر موسیقی وجود داشته باشد، پیکان‌ها فعال هستند)
  const canSlide = totalItems > itemsPerPage && totalItems > 0;

  const handelNextIndexPic = useCallback(() => {
    if (!canSlide) return;
    setCurrentSlide((prev) =>
      prev + itemsPerPage >= totalItems ? 0 : prev + itemsPerPage
    );
  }, [currentSlide, itemsPerPage, totalItems, canSlide]);

  const handelPervIndexPic = useCallback(() => {
    if (!canSlide) return;
    setCurrentSlide((prev) =>
      prev - itemsPerPage < 0
        ? Math.max(totalItems - itemsPerPage, 0)
        : prev - itemsPerPage
    );
  }, [currentSlide, itemsPerPage, totalItems, canSlide]);

  const renderMusicCard = useCallback(
    (a, i) => (
      <article
        key={a._id || i}
        className="flex flex-col justify-between w-full max-w-full border border-zinc-700 rounded-lg shadow-lg bg-zinc-900 overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
      >
        <div className="absolute z-10 top-0 left-0 m-3 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-md flex items-center gap-1">
          <RiDiscountPercentLine size={18} />
          {a.discountPriceTanzim
            ? `${a.discountPriceTanzim} تومان`
            : "بدون تخفیف"}
        </div>

        <div className="relative w-full">
          <img
            className="w-full h-72 object-cover"
            src={imageUrl + a.file_pathImage}
            alt={`Cover of ${a.title}`}
            onError={(e) => (e.target.src = "/fallback_image.png")}
          />
        </div>

        <div className="p-5 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-cyan-400 mb-1 truncate">
              {a.artistName || "هنرمند نامشخص"}
            </h3>
            <h4 className="text-lg font-semibold text-white mb-3 truncate">
              {a.title || "نام موزیک نامشخص"}
            </h4>
            <p className="text-sm text-gray-300 mb-4 line-clamp-2">
              {a.tozihat || "توضیحات موجود نیست."}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <span>{a.rate || 0}</span>
                  <StarIcon fontSize="small" />
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  بر اساس ۱۰ رای کاربر
                </span>
              </div>
              <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                <Rating
                  name={`rating-${i}`}
                  value={a.sheromelody || 0}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.5, color: "whitesmoke" }}
                      fontSize="inherit"
                    />
                  }
                  sx={{ fontSize: "20px" }}
                />
              </Box>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-base font-extrabold text-cyan-300">
                {a.orginalPriceTanzim
                  ? a.orginalPriceTanzim.toLocaleString()
                  : "رایگان"}
              </span>
              {a.discountPriceTanzim && (
                <span className="text-sm font-semibold text-gray-400 line-through">
                  {a.orginalPriceTanzim
                    ? a.orginalPriceTanzim.toLocaleString()
                    : ""}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-zinc-700">
            <button
              onClick={() => {
                dispatch(getOneMusicInfo(a));
                scrollToTop();
                navigate("/product");
              }}
              className="px-5 py-2 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              انتخاب
            </button>

            <PlayCircleOutlineIcon
              className="text-cyan-50 cursor-pointer hover:text-cyan-300 transition-colors duration-300"
              onClick={() => {
                dispatch(showMusicplayer(true));
                dispatch(fetchurlMuiscFile(a));
              }}
              sx={{ fontSize: 40 }}
            />
          </div>
        </div>
      </article>
    ),
    [
      dispatch,
      navigate,
      scrollToTop,
      imageUrl,
      totalItems,
      itemsPerPage,
      canSlide,
      getItemsPerPage,
    ]
  );

  return (
    <section className="w-full py-8">
      {" "}
      {/* بخش اصلی */}
      <div className="container mx-auto px-4">
        {/* عنوان و ناوبری (پیکان‌ها) */}
        <div className="flex items-center justify-between mb-6 px-2">
          <MdArrowCircleRight
            size={30}
            onClick={handelNextIndexPic}
            className={`p-2 bg-zinc-800 hover:bg-zinc-700 text-cyan-50 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
              !canSlide && "opacity-50 cursor-not-allowed"
            }`}
            aria-label="Next slide"
            disabled={!canSlide}
          />
          <h2 className="text-3xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            موسیقی‌های مشابه مطابق سلیقه شما
          </h2>
          <MdArrowCircleLeft
            size={30}
            onClick={handelPervIndexPic}
            className={`p-2 bg-zinc-800 hover:bg-zinc-700 text-cyan-50 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
              !canSlide && "opacity-50 cursor-not-allowed"
            }`}
            aria-label="Previous slide"
            disabled={!canSlide}
          />
        </div>

        {/* نمایش خطا یا محتوا */}
        {error ? (
          <div className="flex justify-center items-center py-10 px-4">
            <div className="bg-yellow-700 text-white text-lg font-semibold py-4 px-6 rounded-lg shadow-lg">
              {error}
            </div>
          </div>
        ) : totalItems === 0 ? (
          <div className="flex justify-center items-center py-10 px-4">
            <p className="text-lg text-gray-500">
              موسیقی مشابهی برای نمایش یافت نشد.
            </p>
          </div>
        ) : (
          <div
            className={`mt-6 grid gap-8`}
            style={{
              gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
            }}
          >
            {visibleMusic.map(renderMusicCard)}
          </div>
        )}
      </div>
    </section>
  );
};

export default LikeGenere;
