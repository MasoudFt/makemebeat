import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import {
  FaSearch,
  FaHeart,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { showInput } from "../StateManagement/Action";

const UpNav = () => {
  const input = useSelector((state) => state.showInput);
  const { cart } = useSelector((state) => state.cartLit);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const tokenusername = localStorage.getItem("username");
  const [expandedItems, setExpandedItems] = useState({
    موزیک: false,
    ویدیو: false,
    گرافیک: false,
  });

  const subItems = {
    موزیک: [
      { name: "پاپ", key: "pop" },
      { name: "راک", key: "rock" },
      { name: "هیپ هاپ", key: "hiphop" },
      { name: "کلاسیک", key: "classic" },
      { name: "الکترونیک", key: "electronic" },
      { name: "میکس مستر", key: "mixmaster" },
    ],
    ویدیو: [
      { name: "موزیک ویدئو", key: "musicVideo" },
      { name: "کامینگ سون", key: "comingSoon" },
      { name: "تیزر", key: "reels" },
      { name: "تدوین", key: "edit" },
      { name: "موبایل گرافی", key: "mobilegraphi" },
      { name: "کلیپ", key: "clip" },
    ],
    گرافیک: [
      { name: "کاور آرت", key: "coverArt" },
      { name: "اکولایزر", key: "equalizer" },
      { name: "موشن گرافی", key: "motiongraphic" },
      { name: "تکست گرافی", key: "textgraphic" },
    ],
  };

  const toggleExpand = (itemName) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
      if (window.innerWidth >= 780) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SignIcon = {
    name:
      tokenusername ||
      (location.pathname === "/login" ? "ثبت نام" : "ورود/عضویت"),
    path: tokenusername
      ? "/dashbord"
      : location.pathname === "/login"
      ? "/SignUp"
      : "/login",
  };

  const navItems = [
    { name: "دوره های آموزشی", path: "/course" },
    { name: "درباره ما", path: "/about" },
    { name: "اخبار", path: "/news" },
    { name: "قوانین", path: "/rules" },
    { name: "تعرفه", path: "/tarafe" },
    { name: "ویدیو", path: "/videoPlayer", hasSubmenu: true },
    { name: "گرافیک", path: "/Graphicplayer", hasSubmenu: true },
    { name: "موزیک", path: "/product", hasSubmenu: true },
    { name: "خانه", path: "/" },
  ];

  const iconButtons = [
    {
      icon: <IoCartSharp size={isMobile ? 20 : 25} />,
      path: "/Card",
      badge: cart.length,
    },
    {
      icon: input ? (
        <MdOutlineClose size={isMobile ? 18 : 20} />
      ) : (
        <FaSearch size={isMobile ? 18 : 20} />
      ),
      action: () => dispatch(showInput()),
      badge: null,
    },
    {
      icon: <FaHeart size={isMobile ? 20 : 25} />,
      path: "/wishlist",
      badge: null,
    },
  ];

  const renderSubmenu = (itemName) => {
    return (
      <div className="bg-zinc-800 rounded-lg mt-2 overflow-hidden transition-all duration-300">
        {subItems[itemName]?.map((subItem) => (
          <div
            key={subItem.key}
            className="py-2 px-4 hover:bg-zinc-700 transition-colors duration-200 border-b border-zinc-700 last:border-b-0"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${subItem.key}`);
              setMenuOpen(false);
            }}
          >
            <span className="text-zinc-300 hover:text-purple-400">
              {subItem.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        className={`flex ${
          location.pathname === "/dashbord"
            ? "justify-evenly"
            : "justify-between"
        } gap-4 items-center bg-zinc-950 p-2 fixed top-0 left-0 z-50 w-full border-b-2 border-zinc-800`}
      >
        <div
          onClick={() => navigate(SignIcon.path)}
          className={` font-bold m-2 flex items-center justify-between h-10 rounded-lg p-1 relative cursor-pointer ${location.pathname === '/dashbord' ? 'hidden w-24 text-xs' : 'w-36'} before:content-[''] before:absolute before:w-[20px] before:h-[20px] before:transition-all after:content-[''] after:absolute after:w-[20px] after:h-[20px] after:transition-all before:top-[-5px] before:left-[-5px] before:border-t before:border-l before:border-purple-800 after:bottom-[-5px] after:right-[-5px] after:border-b after:border-r after:border-purple-800 before:hover:w-[calc(100%+9px)] before:hover:h-[calc(100%+9px)] after:hover:w-[calc(100%+9px)] after:hover:h-[calc(100%+9px)] text-white hover:text-blue-400`}
        >
          <AiOutlineUser size={isMobile ? 20 : 30} className="ml-1" />
          <span className="text-sm md:text-base">{SignIcon.name}</span>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {iconButtons.map((btn, index) => (
            <div key={index} className="relative">
              <div
                className="text-white hover:text-blue-400 cursor-pointer transition-colors"
                onClick={btn.action || (() => navigate(btn.path))}
              >
                {btn.icon}
              </div>
              {btn.badge > 0 && (
                <div className="absolute -top-2 -right-2 bg-blue-500 animate-ping text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {btn.badge}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex flex-1 justify-center">
  {navItems.map((item, index) => (
    <div
      key={index}
      className="relative text-sm text-white font-bold hover:text-blue-400 cursor-pointer px-2 mr-2 ml-2 transition-colors h-[10px] flex items-center"
      onMouseEnter={() => item.hasSubmenu && toggleExpand(item.name)}
      onMouseLeave={() => item.hasSubmenu && toggleExpand(item.name)}
      onClick={() => {
        if (!item.hasSubmenu) {
          navigate(item.path);
        }
      }}
    >
      {item.name}
      {item.hasSubmenu && expandedItems[item.name] && (
        <div className="absolute top-full left-0 mt-1 z-50">
          {renderSubmenu(item.name)}
        </div>
      )}
    </div>
  ))}
</div>


        <div
          className="text-white text-2xl cursor-pointer md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : "☰"}
        </div>
      </div>
      {menuOpen && isMobile && (
  <div dir="rtl" className="fixed inset-0 z-40 bg-black bg-opacity-50 mt-16">
    <div className="bg-zinc-900 h-full overflow-y-auto">
      <div className="flex justify-around p-4 border-b border-zinc-700">
        {iconButtons.map((btn, index) => (
          <div key={index} className="relative mt-4">
            <button
              className="text-white hover:text-blue-400 transition-colors"
              onClick={() => {
                if (btn.path === "/Card" || btn.path === "/wishlist") {
                  setMenuOpen(false); // بستن منو
                }
                btn.action ? btn.action() : navigate(btn.path);
              }}
            >
              {btn.icon}
              {btn.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {btn.badge}
                </span>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="p-4">
        {navItems.reverse().map((item) => (
          <div key={item.name} className="mb-2">
            <div
              className={`flex justify-between items-center p-3 rounded-lg ${
                item.hasSubmenu ? "bg-zinc-800" : "hover:bg-zinc-800"
              } transition-colors`}
              onClick={() => {
                if (!item.hasSubmenu) {
                  navigate(item.path);
                  setMenuOpen(false); // بستن منو
                } else {
                  toggleExpand(item.name);
                }
              }}
            >
              <span className="text-white font-bold">{item.name}</span>
              {item.hasSubmenu &&
                (expandedItems[item.name] ? (
                  <FaChevronUp className="text-zinc-400" />
                ) : (
                  <FaChevronDown className="text-zinc-400" />
                ))}
            </div>

            {item.hasSubmenu &&
              expandedItems[item.name] &&
              renderSubmenu(item.name)}
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
