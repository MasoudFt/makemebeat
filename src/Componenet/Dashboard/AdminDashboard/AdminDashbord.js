import React, { useEffect, useState } from "react";
import axios from "axios";
// import VideoShow from './Items/OneUserInfo/Player/VideoShow'
// import VideoUserListShow from "./Items/OneUserInfo/Player";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ServerURL from "../../API/ServerURL";
const AdminDashbord = () => {
 const[userList,setUserList]=useState([]);
 const urlImage=ServerURL()
const navigate=useNavigate()
  const getUserListFromDb=async()=>{
    try {
      const url=`${ServerURL()}users`
      
      const res=await axios.get(url)
      setUserList(res.data)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getUserListFromDb();
  }, [])
  const colItems = [
    { id:0,name: "ردیف" },
    { id:1,name: "تصویر پروفایل" },
    { id:2,name: "نام کاربر" },
    { id:3,name: "شماره موبایل" },
    { id:4,name: "تاریخ ثبت نام" },
    { id:5,name: "آیدی کاربر" },
    { id:6,name: "نوع کاربر" },
    { id:7,name: "توضیحات" },
    { id:8,name: "آدرس استدیو" },
    { id:9,name: "آرتیست" },
  ];

  const ButtonClassName =
    "rounded-xl grid col-span-2 place-content-center text-white text-xl h-12 mt-7 font-semibold bg-black border border-purple-600 w-full p-2";
  return (
    <div dir="rtl" className="mt-14 text-cyan-50 h-screen">
      AdminDashbord
      <div>
        <div className="grid-rows-2 rounded-lg font-bold text-white h-full text-xl p-2">
          <div className="grid grid-cols-10 border border-zinc-950 py-2 border-b-neutral-800 h-fit gap-2 text-center p-1 text-xs text-slate-300 ">
            {colItems.map((a) => (
              <div key={a.id}>
                <div>{a.name}</div>
              </div>
            ))}
          </div>
        </div>
            <div
            className="grid-rows-2  rounded-lg font-bold text-white h-full text-xl p-2"
            >
                {userList.map((a,b)=>(
                    <div
                    onClick={()=>navigate(`/dashbord/OneUser/${a.userID}`)}
                    className="grid grid-cols-10 cursor-pointer hover:text-purple-600 hover:ml-2 border items-center border-zinc-950 py-2 border-b-neutral-800 h-fit gap-2 text-center p-1 text-xs text-slate-300 "
                     key={a.post_id}>
                        <div>{b+1}</div>
                        {a.profile_path === null?<VscAccount size={35} />
                        
                      :
                        <img 
                        className="h-12 w-1h-12 p-1 rounded-full   border-2 border-blue-700"
                        src={urlImage+a.profile_path}/>
                      }
                        <div>{a.username}</div>
                        <div className="text-lime-600">{a.mobilePhone}</div>
                        <div>{a.createdAt}</div>
                        <div className="text-blue-600">{a.userID}</div>
                        <div className={a.seller === 0?"text-red-600 ":"text-green-600"} >{a.seller===0?"فروشنده":"خریدار"}</div>
                        <div className={a.tozihat ===null?"text-yellow-500":"text-cyan-50"}>{a.tozihat ===null?"توضیحاتی ثبت نشده":a.tozihat}</div>
                        <div className="text-cyan-500">{a.stadioAddress ===null?"آدرسی ثبت نشده":a.stadioAddress}</div>
                        <div className={a.artist === 0?"text-red-600 ":"text-green-600"} >{a.artist===0?"تایید نشده":"تایید شده"}</div>
                        
                    </div>
                ))

                }
            </div>
      </div>
     {/* <VideoUserListShow/> */}
     {/* <VideoShow/> */}
    </div>
  );
};

export default AdminDashbord;
