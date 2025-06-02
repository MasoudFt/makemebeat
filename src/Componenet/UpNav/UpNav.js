import React from "react";
import { IoCartSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { showInput } from "../StateManagement/Action";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { useLocation, useNavigate } from "react-router-dom";
const UpNav = () => {
  const input = useSelector((state) => state.showInput);
const { cart }=useSelector((state)=>state.cartLit)
const navigate=useNavigate()

  const token = localStorage.getItem('authToken');
  const location=useLocation();

  const dispatch = useDispatch();
const item=[
  {name:"آموزش",className:"text-white font-bold text-center",path:"/course"},
  {name:"تعرفه",className:"text-white font-bold text-center",path:"/tarafe"},
  {name:"درباره ما",className:"text-white font-bold text-center",path:"/about"},
  {name:"قوانین",className:"text-white font-bold text-center",path:"/rules"},
  {name:"خانه",className:"text-white font-bold text-center",path:"/"},
]
  return (
    <>
      <div className="flex bg-zinc-950 p-2 top-0 left-0 z-50 w-screen fixed border-zinc-950 border-2 border-b-stone-800">
        <div className="flex justify-between gap-4 p-1 w-44">
         <div className="flex">
         <IoCartSharp size={25} color="white" onClick={()=>navigate("/Card")}/>
          <div className="relative w-4 h-4 ">
          
            <span className="flex-none w-16"></span>
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping">
            </div>
            <div className="absolute  text-xs pb-1 ps-1 text-white inset-0 bg-blue-500 rounded-full">
            {cart.length}
            </div>
          </div>
          {input ? (
            <MdOutlineClose
              onClick={() => dispatch(showInput())}
              size={20}
              className="ml-2"
              color="white"
            />
          ) : (
            <FaSearch
              onClick={() => dispatch(showInput())}
              className="ml-2"
              size={20}
              color="white"
            />
          )}

          <FaHeart className="ml-2" size={25} color="white" />
         </div>
        </div>
        <div className="flex w-full gap-4 ml-4 py-2 px-1 ">
       {item.map((a,b)=>(
          <div key={a.name}  className={a.className}>
             <div  onClick={()=>navigate(a.path)}>{a.name}</div>
          </div>
       ))}
       </div>
          
          <div className="flex justify-between text-white gap-2 mt-2 ">
          <div><TfiEmail size={20} /></div>
          <div>MakeMeBeatinfo@gmail.com</div>
          </div>
      </div>
    </>
  );
};

export default UpNav;
