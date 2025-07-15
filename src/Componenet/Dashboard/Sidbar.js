import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsBasket3 } from "react-icons/bs";
import { FaRegComments } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";
import { SlWallet } from "react-icons/sl";
import { LuTicketCheck } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";
import { BsCardList } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router";
import ServerURL from "../API/ServerURL";

const Sidebar = ({ username, type, profilepic }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 780);
  const [show, setShow] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const convertPath = (filePath) => {
    if (!profilepic) return null;
    return filePath.replace(/\\/g, '/');
  };

  const url = `${ServerURL()}${convertPath(profilepic)}`;
  
  if (!token) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const input = [
    { name: "اطلاعات تکمیلی", path: "", Icon: <BsCardList /> },
    { name: `${type ? "سفارش های من" : "محصولات من"}`, path: "MyProductList", Icon: <IoDocumentTextOutline /> },
    { name: `${type ? "ثبت سفارش" : "ثبت محصول"}`, path: "ComposeProduct", Icon: <MdAddShoppingCart /> },
    { name: `${type ? "خریدهای من" : "فروش های من"}`, path: "MyPurchase", Icon: <BsBasket3 /> },
    { name: `${type ? "نظرهای من" : "نظرات محصولات"}`, path: "CommentList", Icon: <FaRegComments /> },
    { name: `${type ? "دانلودها" : "دانلود محصولات"}`, path: "DownloadList", Icon: <LuDownload /> },
    { name: "کیف پول", path: "Wallet", Icon: <SlWallet /> },
    { name: "تیکت ها", path: "Ticket", Icon: <LuTicketCheck /> },
    { name: `${type ? "علاقه مندی ها" : "مشتری های برتر"}`, path: "FavList", Icon: <RiPlayList2Fill /> }
  ];

  return (
    <>
      {/* دسکتاپ */}
      {!isMobile && (
        <div
          className={`${
            show ? "w-14 shadow-xl shadow-purple-500" : "w-64 shadow-md shadow-purple-700"
          } flex flex-col fixed z-50 bg-zinc-950 h-screen text-white`}
        >
          {/* محتوای سایدبار دسکتاپ */}
          <div className="mb-5 ml-2 rounded-2xl border-2 border-zinc-950 border-b-purple-900">
            <div className="relative">
              <button
                onClick={() => setShow(!show)}
                className="absolute top-6 -left-4 bg-purple-700 rounded-full p-1"
              >
                {show ? <MdKeyboardArrowLeft size={18} /> : <MdKeyboardArrowRight size={18} />}
              </button>
            </div>
            <div className="grid place-content-start py-2 px-3">
              {profilepic ? (
                <img src={url} className={`${show ? "h-8 w-8" : "h-20 w-20"} rounded-full border-2 border-purple-600`} />
              ) : (
                <VscAccount size={show ? 25 : 65} />
              )}
               </div>
              {!show && (
                <div className="flex justify-around items-center m-3">
                  <span className="text-xs font-bold">{username}</span>
                  <span className={`${type ? "bg-green-500" : "bg-red-500"} px-2 py-1 rounded text-xs`}>
                    {type ? "خریدار" : "فروشنده"}
                  </span>
                </div>
              )}
           
          </div>

          <div className="overflow-y-auto flex-grow row-span-5 custom-scroll">
            {input.map((item) => (
              <NavItem 
                key={item.name}
                item={item}
                show={show}
                onClick={() => navigate(`/dashbord/${item.path}`)}
              />
            ))}
          </div>

          {!show && (
            <button
              onClick={handleLogout}
              className="m-2 bg-white text-black py-2 rounded-lg"
            >
              خروج
            </button>
          )}
        </div>
      )}

      {/* موبایل */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 z-50 border-t border-purple-800">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full flex justify-center py-2 bg-zinc-900 text-purple-400"
          >
            {expanded ? <FaChevronDown /> : <FaChevronUp />}
          </button>

          {expanded && (
            <div className="grid grid-cols-4 gap-2 p-2 bg-zinc-950">
              {input.map((item) => (
                <MobileNavItem 
                  key={item.name}
                  item={item}
                  onClick={() => {
                    navigate(`/dashbord/${item.path}`);
                    setExpanded(false);
                  }}
                />
              ))}
            </div>
          )}

          {!expanded && (
            <div className="flex justify-around p-2">
              {input.slice(0, 5).map((item) => (
                <MobileNavItem 
                  key={item.name}
                  item={item}
                  onClick={() => navigate(`/dashbord/${item.path}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

// کامپوننت آیتم‌های دسکتاپ
const NavItem = ({ item, show, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center p-3 hover:bg-zinc-800 cursor-pointer ${!show && "border-b border-zinc-800"}`}
  >
    <span className={`${show ? "mx-auto" : "ml-2"}`}>{item.Icon}</span>
    {!show && <span className="mr-2">{item.name}</span>}
  </div>
);

// کامپوننت آیتم‌های موبایل
const MobileNavItem = ({ item, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col text-white items-center p-2 hover:bg-zinc-800 rounded cursor-pointer"
  >
    <div >{item.Icon}</div>
    <span className="text-xs mt-1 text-center">{item.name}</span>
  </div>
);

export default Sidebar;
