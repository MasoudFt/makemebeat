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
  <div className="grid place-content-center row-span-3 h-screen border bg-zinc-900 border-gray-700 rounded-lg text-white font-semibold text-base p-4 gap-4 m-1">
            {userList.profile_path === null ? (
              <VscAccount size={50} />
            ) : (
              <img className="h-36 w-36 items-center p-3 rounded-full" src={imageUrl + userList.profile_path} />
            )}
            <div className="border border-zinc-900 border-b-gray-700">نام کاربری {userList.username}</div>
            <div className="border border-zinc-900 border-b-gray-700">
              شماره همراه {userList.mobilePhone}
            </div>
            <div className="border border-zinc-900 border-b-gray-700">
              آدرس استدیو {userList.stadioAddress}
            </div>
            <div className="border border-zinc-900 border-b-gray-700">
              ایمیل {userList.email}
            </div>
            <div className="border border-zinc-900 border-b-gray-700">
              تاریخ ثبت نام {userList.createdAt}
            </div>
            <div className="border border-zinc-900 border-b-gray-700">
              {" "}
              نوع کاربری {userList.seller === 0 ? "فروشنده" : "خریدار"}
            </div>
            <div
              className={`${
                userList.artist === 0 ? "text-red-500" : "text-green-500"
              } border border-zinc-900 border-b-gray-700`}
            >
              {" "}
              آرتیست رسمی {userList.artist === 0 ? "تایید نشده" : "تایید شده"}
            </div>
            <div className="grid place-items-center mt-7 mb-7">
              <button
                onClick={() => navigate("/dashbord")}
                className="rounded-xl  
               text-white text-xs h-8 x font-semibold bg-black border border-gray-600  w-14 p-2"
              >
                برگشت
              </button>
            </div>
          </div>

    </>
  )
}

export default SectionRightAdmin