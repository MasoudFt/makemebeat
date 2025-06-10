import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import ServerURL from '../../../../../API/ServerURL';
const SectionRightAdmin = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

    const location = useLocation();
    const str = location.pathname;
    const result = str.replace(/.*\/(\d+)$/, "$1");

    const imageUrl = ServerURL();

  const getUserListFromDb = async () => {
    try {
      const url = `${ServerURL()}users/${result}`;
      const res = await axios.get(url);
      setUserList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
    useEffect(() => {
      getUserListFromDb();
    }, [result]);
  return (
    <>
<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-zinc-900 border border-gray-700 rounded-lg text-white font-semibold text-base gap-4 m-1">
  <div className="flex flex-col items-center w-full max-w-md">
    {userList.profile_path === null ? (
      <VscAccount size={50} />
    ) : (
      <img 
        className="h-36 w-36 object-cover p-3 rounded-full" 
        src={imageUrl + userList.profile_path} 
        alt="پروفایل کاربر"
      />
    )}
    
    <div className="w-full py-2 border-b border-gray-700 truncate">
      نام کاربری: {userList.username}
    </div>
    
    <div className="w-full py-2 border-b border-gray-700 truncate">
      شماره همراه: {userList.mobilePhone}
    </div>
    
    <div className="w-full py-2 border-b border-gray-700 truncate">
      آدرس استدیو: {userList.stadioAddress}
    </div>
    
    <div className="w-full py-2 border-b border-gray-700 truncate">
      ایمیل: {userList.email}
    </div>
    
    <div className="w-full py-2 border-b border-gray-700 truncate">
      تاریخ ثبت نام: {userList.createdAt}
    </div>
    
    <div className="w-full py-2 border-b border-gray-700 truncate">
      نوع کاربری: {userList.seller === 0 ? "فروشنده" : "خریدار"}
    </div>
    
    <div className={`w-full py-2 border-b border-gray-700 truncate ${
      userList.artist === 0 ? "text-red-500" : "text-green-500"
    }`}>
      آرتیست رسمی: {userList.artist === 0 ? "تایید نشده" : "تایید شده"}
    </div>
    
    <div className="w-full flex justify-center mt-7 mb-7">
      <button
        onClick={() => navigate("/dashbord")}
        className="rounded-xl text-white text-xs h-8 font-semibold bg-black border border-gray-600 w-14 p-2 hover:bg-gray-800 transition-colors"
      >
        برگشت
      </button>
    </div>
  </div>
</div>


    </>
  )
}

export default SectionRightAdmin