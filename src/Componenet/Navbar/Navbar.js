
import React, { useState } from "react";
import { AiOutlineUser  } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tokenusername = localStorage.getItem("username");
  const [dropdownStates, setDropdownStates] = useState({
    موزیک: false,
    ویدیو: false,
    گرافیک: false,
  });

  // تعیین مسیر ورود/ثبت نام
  const SignIcon = {
    name: tokenusername
      ? tokenusername
      : location.pathname === "/login"
      ? "ثبت نام"
      : "ورود/عضویت",
    path: tokenusername
      ? "/dashbord"
      : location.pathname === "/login"
      ? "/SignUp"
      : "/login",
    style: "col-span-2",
  };

  const input = [
    {
      name: "خانه",
      path: "/",
      style: "col-span-1",
    },
    {
      name: "موزیک",
      path: "/product",
      style: "col-span-1",
      ArrowCom: dropdownStates["موزیک"] ? (
        <IoIosArrowUp size={20} />
      ) : (
        <IoIosArrowDown size={20} />
      ),
    },
    {
      name: "ویدیو",
      path: "/videoPlayer",
      style: "col-span-1",
      ArrowCom: dropdownStates["ویدیو"] ? (
        <IoIosArrowUp size={20} />
      ) : (
        <IoIosArrowDown size={20} />
      ),
    },
    {
      name: "گرافیک",
      path: "/graphic",
      style: "col-span-1",
      ArrowCom: dropdownStates["گرافیک"] ? (
        <IoIosArrowUp size={20} />
      ) : (
        <IoIosArrowDown size={20} />
      ),
    },
    {
      name: "اخبار",
      path: "/news",
      style: "col-span-1",
    },
    {
      name: "دوره های آموزشی",
      path: "/course",
      style: "col-span-2",
    },
  ];

  const subItems = {
    موزیک: ["پاپ", "هیپ هاپ", "الکترونیک", "میکس مستر"],
    ویدیو: [
      "موزیک ویدیو",
      "کامینگ سون",
      "تیزر",
      "ریلز",
      "تدوین",
      "موبایل گرافی",
    ],
    گرافیک: ["کاور آرت", "اکولایزر", "موشن گرافی", "تکست گرافی"],
  };

  const handleMouseEnter = (itemName) => {
    setDropdownStates((prevStates) => {
      const newStates = {
        موزیک: false,
        ویدیو: false,
        گرافیک: false,
      };
      newStates[itemName] = true; // فقط آیتم فعلی را باز کن
      return newStates;
    });
  };

  const handleMouseLeave = () => {
    setDropdownStates({
      موزیک: false,
      ویدیو: false,
      گرافیک: false,
    });
  };

  return (
    <>
     <div className="top-10 mt-4 w-screen grid grid-cols-7 border border-l-zinc-950 border-b-stone-900 h-fit text-center fixed z-10 bg-zinc-950 items-center justify-between p-4">
        <div
          onClick={() => navigate(SignIcon.path)}
          className="font-extrabold flex justify-between h-10 w-36 rounded-lg col-span-1 p-1 relative cursor-pointer before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:transition-all after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:transition-all before:top-[-5px] before:left-[-5px] before:border-t before:border-l before:border-purple-800 after:bottom-[-5px] after:right-[-5px] after:border-b after:border-r after:border-purple-800 before:hover:w-[calc(100%+9px)] before:hover:h-[calc(100%+9px)] after:hover:w-[calc(100%+9px)] after:hover:h-[calc(100%+9px)] text-white hover:cursor-pointer hover:text-blue-400"
        >
          <AiOutlineUser size={30} />
          <div className="">{SignIcon.name}</div>
        </div>
        <div className="col-span-2 w-full">
          <Input />
        </div>
        <div className="col-span-4 w-full">
          <div dir="rtl" className="grid grid-cols-8 gap-3 w-fit justify-between">
            <img
              alt="cover"
              className="h-12 w-20"
              src="https://makemebeat.net/wp-content/uploads/2021/10/12-1024x745-1-5.png"
            />
            {input.map((item) => (
              <div
                key={item.name}
                className={`flex text-white ${item.style} hover:border-2 items-center border-zinc-950 border-b-purple-800 relative`}
                {...(item.ArrowCom
                  ? {
                      onMouseEnter: () => handleMouseEnter(item.name), // هاور کردن
                      onMouseLeave: handleMouseLeave, // هاور خارج شدن
                    }
                  : {})} // فقط اگر ArrowCom داشته باشد این پراپ‌ها اضافه شوند
              >
                <Link to={item.path}>{item.name}</Link>
                {item.ArrowCom && <div className="m-1 p-1">{item.ArrowCom}</div>}
                {dropdownStates[item.name] && item.ArrowCom && (
                  <div className="absolute z-20 text-xs bg-gray-950 text-white top-14 mt-2 w-32 p-2 rounded-lg shadow-lg">
                    <ul>
                      {subItems[item.name]?.map((subItem, index) => (
                        <li key={index} className="hover:text-purple-700 p-1">
                          <Link to={`/sub${subItem}`}>{subItem}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  
  );
};

export default Navbar;
