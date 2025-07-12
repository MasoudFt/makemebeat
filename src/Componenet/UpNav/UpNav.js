import React, { useState, useEffect } from "react";
import { IoCartSharp } from "react-icons/io5";
import { FaSearch, FaHeart, FaTimes } from "react-icons/fa";
import { showInput } from "../StateManagement/Action";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

const UpNav = () => {
  const input = useSelector((state) => state.showInput);
  const { cart } = useSelector((state) => state.cartLit);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const tokenusername = localStorage.getItem("username");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const navItems = [
    { name: "دوره های آموزشی", path: "/course" },
    { name: "درباره ما", path: "/about" },
    { name: "اخبار", path: "/news" },
    { name: "قوانین", path: "/rules" },
    { name: "تعرفه", path: "/tarafe" },
    { name: "ویدیو", path: "/videoPlayer" },
    { name: "گرافیک", path: "/Graphicplayer" },
    { name: "موزیک", path: "/product" },
    { name: "خانه", path: "/" },
  ];

  const iconButtons = [
    { icon: <IoCartSharp size={isMobile ? 20 : 25} />, path: "/Card", badge: cart.length },
    { 
      icon: input ? <MdOutlineClose size={isMobile ? 18 : 20} /> : <FaSearch size={isMobile ? 18 : 20} />, 
      action: () => {
        dispatch(showInput());
      },
      badge: null 
    },
    { icon: <FaHeart size={isMobile ? 20 : 25} />, path: "/wishlist", badge: null }
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <div className={`flex ${location.pathname === "/dashbord"?"justify-evenly":"justify-between"} gap-4 items-center bg-zinc-950 p-2 fixed top-0 left-0 z-50 w-full border-b-2 border-zinc-800`}>
       {/* User Profile Button */}
       <div
          onClick={() => navigate(SignIcon.path)}
          className={`${location.pathname === "/dashbord"?"hidden":"show"} font-extrabold md:w-32 max-md:w-24 m-2 flex items-center justify-between h-10 rounded-lg p-1 relative cursor-pointer before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:transition-all after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:transition-all before:top-[-5px] before:left-[-5px] before:border-t before:border-l before:border-purple-800 after:bottom-[-5px] after:right-[-5px] after:border-b after:border-r after:border-purple-800 before:hover:w-[calc(100%+9px)] before:hover:h-[calc(100%+9px)] after:hover:w-[calc(100%+9px)] after:hover:h-[calc(100%+9px)] text-white hover:text-blue-400`}
        >
          <AiOutlineUser size={isMobile ? 20 : 30} className="ml-1" />
          <span className="text-sm md:text-base">{SignIcon.name}</span>
        </div>
        
        {/* Icon Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {iconButtons.map((btn, index) => (
            <div key={index} className="relative">
              <div 
                className="text-white hover:text-blue-400 cursor-pointer transition-colors"
                onClick={btn.action || (() => navigate(btn.path))}
              >
                {btn.icon}
              </div>
              {btn.badge !== null && btn.badge > 0 && (
                <div className="absolute -top-2 -right-2 bg-blue-500 animate-ping text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  <div className="absolute text-xs pb-1 ps-1 text-white inset-0 bg-blue-500 rounded-full">
                  {btn.badge}
                </div>
                </div>
              )}
            </div>
          ))}
        </div>
       
        {/* Desktop Navigation Items */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex gap-4 py-2 px-1 text-sm">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="text-white font-bold hover:text-blue-400 cursor-pointer transition-colors"
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        
       
         
        {/* Mobile Menu Button */}
        <div 
          className="text-white text-2xl cursor-pointer md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : '☰'}
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {menuOpen && isMobile && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-80 mt-16 ">
          <div className={`bg-zinc-900 ${location.pathname === "/dashbord"?"p-4 ":"p-4"} h-fit rounded-b-lg shadow-lg overflow-y-scroll"`}>
              {/* Mobile Icon Buttons */}
              <div className="flex justify-around mt-2 border-b border-zinc-700 pt-2">
              <div 
                className="text-white hover:text-blue-400 cursor-pointer transition-colors p-2"
                onClick={() => navigate(iconButtons[0].path)}
              >
              
              
                {iconButtons[0].icon}
              </div>
              <div
                className="text-white hover:text-blue-400 cursor-pointer transition-colors p-2"
                onClick={iconButtons[1].action}
              >
                {iconButtons[1].icon}
              </div>
              <div 
                className="text-white hover:text-blue-400 cursor-pointer transition-colors p-2"
                onClick={() => navigate(iconButtons[2].path)}
              >
                {iconButtons[2].icon}
              </div>
            </div>
            {/* Mobile Navigation Items */}
            <div className="flex flex-col space-y-4 text-center items-center  h-64 overflow-y-scroll ">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="text-white font-bold py-2 px-4 hover:bg-zinc-800 rounded-lg transition-colors text-right"
                  onClick={() => {
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
            
          
          </div>
        </div>
      )}
    </>
  );
};

export default UpNav;