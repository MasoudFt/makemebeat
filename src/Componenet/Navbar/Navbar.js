import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";
import { logout } from "../StateManagement/Action";
const Navbar = () => {
  const auth = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const tokenusername = localStorage.getItem("username");

  // تعیین مسیر ورود/ثبت نام
  const SignIcon = {
    name: tokenusername ? tokenusername : (location.pathname === "/login" ? "ثبت نام" : "ورود/عضویت"),
    path: tokenusername ? "/dashbord" : (location.pathname === "/login" ? "/SignUp" : "/login"),
    style: "col-span-2",
  };
  const input = [
    { name: "خانه", path: "/", style: "col-span-1" },
    { name: "موزیک", path: "/Product", style: "col-span-1" },
    { name: "ویدیو", path: "/VideoPlayer", style: "col-span-1" },
    { name: "گرافیک", path: "/About", style: "col-span-1" },
    { name: "اخبار", path: "/Contact", style: "col-span-1" },
    { name: "دوره های آموزشی", path: "/Contact", style: "col-span-2" },
  ];

  return (
    <>
      <div className={` top-10 mt-2 w-screen grid grid-cols-7 border border-l-zinc-950 border-b-stone-900 h-20 text-center fixed z-10 bg-zinc-950 items-center justify-between p-4`}>
        <div className="col-span-1">
          <div
            onClick={() => navigate(SignIcon.path)} 
            className="font-extrabold flex justify-between h-10 w-36 rounded-lg col-span-1 p-1 relative cursor-pointer before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:transition-all after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:transition-all before:top-[-5px] before:left-[-5px] before:border-t before:border-l before:border-purple-800 after:bottom-[-5px] after:right-[-5px] after:border-b after:border-r after:border-purple-800 before:hover:w-[calc(100%+9px)] before:hover:h-[calc(100%+9px)] after:hover:w-[calc(100%+9px)] after:hover:h-[calc(100%+9px)] text-white hover:cursor-pointer hover:text-blue-400">
            <AiOutlineUserAdd size={30} />
            <div className="">
              {SignIcon.name}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Input />
        </div>
        <div className="col-span-3">
          <div dir="rtl" className="grid grid-cols-7 text-base">
            {input.map((item) => (
              <div key={item.name} className={`text-white ${item.style} hover:border-2 border-zinc-950 border-b-purple-800`}>
                <Link to={item.path}>{item.name}</Link>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 p-1 ml-5">
          <img
            alt="cover"
            className="h-12 w-20"
            src="https://makemebeat.net/wp-content/uploads/2021/10/12-1024x745-1-5.png"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
