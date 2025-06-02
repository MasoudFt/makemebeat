import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsBasket3 } from "react-icons/bs";
import { FaRegComments } from "react-icons/fa6";
import { LuDownload } from "react-icons/lu";
import { SlControlPause, SlWallet } from "react-icons/sl";
import { LuTicketCheck } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";
import { BsCardList } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router";

const Sidbar = ({ username, type,profilepic }) => {
  const convertPath = (filePath) => {
    if(profilepic === null){
      return null
    }else{
      return filePath.replace(/\\/g, '/');
  }
  };
  const url = `http://localhost:3000/${convertPath(profilepic)}`
  // console.log(profilepic)
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");


    if (!token) {
      navigate("/login");
      return;
    }
  
    
  

  const handleLogout = () => {
    // پاک کردن اطلاعات از localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    navigate("/login");

    // window.location.reload();
  };

  const input = [
    { name: "اطلاعات تکمیلی", path: "", Icon: <BsCardList size={25} /> },
    {
      name: `${type ? "سفارش های من" : "محصولات من "}`,
      path: "MyProductList",
      Icon: <IoDocumentTextOutline size={25} />,
    },
    {
      name: `${type ? "ثبت سفارش" : "ثبت محصول"}`,
      path: "ComposeProduct",
      Icon: <MdAddShoppingCart size={25} />,
    },
    {
      name: `${type ? "خریدهای من" : "فروش های من"}`,
      path: "MyPurchase",
      Icon: <BsBasket3 size={25} />,
    },
    {
      name: `${type ? "نظرهای من" : "نظرات برای محصولات من "}`,
      path: "CommentList",
      Icon: <FaRegComments size={25} />,
    },
    {
      name: `${type ? "دانلود ها" : "دانلود محصولات من "}`,
      path: "DownloadList",
      Icon: <LuDownload size={25} />,
    },
    { name: "کیف پول", path: "Wallet", Icon: <SlWallet size={25} /> },
    {
      name: `${type ? "تیکت های خریدار" : "تیکت های فروشنده"}`,
      path: "Ticket",
      Icon: <LuTicketCheck size={25} />,
    },
    {
      name: `${type ? "لیست علاقه مندی ها" : "مشتری های برتر "}`,
      path: "FavList",
      Icon: <RiPlayList2Fill size={25} />,
    },
  ];
  return (
    <>
      <div
        className={`${
          show
            ? "w-14 shadow-xl shadow-purple-500"
            : "w-64 shadow-md shadow-purple-700"
        } flex flex-col  fixed z-50 bg-zinc-950 h-screen text-white `}
      >
        <div className="mb-5 ml-2 rounded-2xl border-2 border-zinc-950 border-b-purple-900 ">
          <div dir="ltr">
            <div className="relative">
              {show ? (
                <MdKeyboardArrowLeft
                  size={20}
                  onClick={() => setShow(false)}
                  className="relative end-0 top-6 -left-4 bg-purple-700 rounded-full"
                  />
              ) : (
                <MdKeyboardArrowRight
                  size={20}
                  onClick={() => setShow(true)}
                  className="relative end-0 top-6 -left-4 bg-purple-700 rounded-full"
                />
              )}
              <div dir="rtl" className="flex"></div>
            </div>
          </div>
          <div className="grid place-content-start py-2 px-3">
            {profilepic === null ? (
              <VscAccount size={show ? "25" : "65"} />
            ) : (
              <img 
              src={url} 
              className={show?"h-6 w-6 rounded-full" : "h-20 w-20  border-2 border-purple-600 rounded-full"} />
            )}
            <div className="flex justify-between w-56 gap-4">
              <label
                className={show ? "hidden" : "p-2 mt-3 font-bold text-xs text-zinc-350"}
              >
                نام کاربری : {username}
              </label>
              <button
                className={
                  show
                    ? "hidden"
                    : `${
                        type ? " bg-green-500" : " bg-red-500"
                      } relative z-50 w-18 py-2 px-2 mt-5 rounded-2xl text-xs font-bold text-black text-center `
                }
              >
                {type ? "خریدار" : "فروشنده"}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${
            show ? "overflow-y-hidden overflow-x-hidden" : "overflow-y-auto"
          } row-span-5 text-sm font-bold`}
          style={{ maxHeight: 'calc(100vh - 100px)', /* Adjust height as needed */ }}
        >
          <div className="flex flex-col justify-between  gap-2 p-1">
            {input.map((a, b) => (
              <div
                className="flex  hover:text-purple-500 hover:mr-2 hover:border-b-2 border-white"
                key={a.name}
              >
                <div className="p-1 mr-2 ">{a.Icon}</div>
                <div
                  className={`${show ? "opacity-0" : "opacity-100 mt-2"} h-14`}
                  onClick={() => navigate(`/dashbord/${a.path}`)}
                >
                  {a.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center row-span-1">
          <button
            onClick={handleLogout}
            className={`${
              show ? "opacity-20 cursor-not-allowed" : "opacity-100"
            } rounded-xl bg-white text-black p-2 m-2`}
          >
            خروج
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidbar;
