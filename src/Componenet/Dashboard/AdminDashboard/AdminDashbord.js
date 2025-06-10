import React, { useEffect, useState } from "react";
import axios from "axios";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ServerURL from "../../API/ServerURL";
const AdminDashbord = () => {
  const [userList, setUserList] = useState([]);

  const urlImage = ServerURL();
  const navigate = useNavigate();
  const getUserListFromDb = async () => {
    try {
      const url = `${ServerURL()}users`;

      const res = await axios.get(url);
      setUserList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserListFromDb();
  }, []);
  const colItems = [
    { id: 0, name: "ردیف" },
    { id: 1, name: "تصویر پروفایل" },
    { id: 2, name: "نام کاربر" },
    { id: 3, name: "شماره موبایل" },
    { id: 4, name: "تاریخ ثبت نام" },
    { id: 5, name: "آیدی کاربر" },
    { id: 6, name: "نوع کاربر" },
    { id: 7, name: "توضیحات" },
    { id: 8, name: "آدرس استدیو" },
    { id: 9, name: "آرتیست" },
  ];

  return (
    <>
      <div dir="rtl" className="bg-zinc-950 mt-14 min-h-screen">
        {/* هدر */}
        <div className="flex p-4 shadow-lg border-b border-purple-800/50  justify-between items-center">
          <div className="mt-4 text-center text-purple-300 text-sm">
            تعداد کاربران:{" "}
            <span className="font-bold text-purple-100">{userList.length-1}</span>
          </div>
          <h1 className="text-2xl font-bold text-center text-purple-100">
            داشبورد مدیریت
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              localStorage.removeItem("username");
              navigate("/");
            }}
            className="bg-purple-700 hover:bg-purple-600 text-purple-100 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            خروج
          </button>
        </div>

        {/* محتوا */}
        <div className="container mx-auto px-2 py-4">
          {/* جدول کاربران */}
          <div className="bg-zinc-900 rounded-xl shadow-xl overflow-hidden border border-purple-900/50">
            {/* هدر جدول */}
            <div className="grid grid-cols-10 border-b border-purple-900/50 text-purple-100 font-bold py-3 px-4 text-sm">
              {colItems.map((item) => (
                <div key={item.id} className="text-center text-xs px-2">
                  {item.name}
                </div>
              ))}
            </div>

            {/* لیست کاربران */}
            <div className="divide-y divide-purple-900/30 max-h-[calc(100vh-180px)] overflow-y-auto custom-scroll">
  {userList
    .filter(user => user.email !== "Admin@gmail.com")
    .map((user, index) => (
      <div
        key={user.post_id}
        onClick={() => navigate(`/dashbord/OneUser/${user.userID}`)}
        className="grid grid-cols-10 items-center hover:bg-black transition-colors duration-200 cursor-pointer py-3 px-4 text-sm"
      >
        {/* شماره ردیف با عرض ثابت */}
        <div className="text-center text-gray-400 w-8 mx-auto">
          {index + 1}
        </div>

        {/* تصویر پروفایل */}
        <div className="flex justify-center">
          {user.profile_path === null ? (
            <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center border border-purple-800/50">
              <VscAccount size={20} className="text-purple-300" />
            </div>
          ) : (
            <img
              className="h-10 w-10 rounded-full object-cover border-2 border-purple-500"
              src={urlImage + user.profile_path}
              alt="پروفایل کاربر"
            />
          )}
        </div>

        {/* نام کاربری */}
        <div className="text-center text-purple-100 truncate px-2">
          {user.username}
        </div>

        {/* شماره موبایل */}
        <div className="text-center text-purple-300 truncate px-2">
          {user.mobilePhone}
        </div>

        {/* تاریخ ایجاد */}
        <div className="text-center text-gray-400 truncate px-2">
          {user.createdat}
        </div>

        {/* شناسه کاربر */}
        <div className="text-center text-purple-400 truncate px-2">
          {user.userID}
        </div>

        {/* وضعیت فروشنده */}
        <div className="text-center">

          <span
            className={`px-2 py-1 rounded-full text-xs ${
              user.seller === 0
                ? "bg-red-900/50 text-red-300"
                : "bg-purple-900/50 text-purple-300"
            }`}
          >
            {user.seller === 0 ? "خریدار" : "فروشنده"}
          </span>
        </div>

        {/* توضیحات */}
        <div className="text-center truncate px-2">
          {user.tozihat === null ? (
            <span className="text-yellow-400/80 text-xs">
              بدون توضیح
            </span>
          ) : (
            <span className="text-gray-300 truncate block max-w-full">
              {user.tozihat}
            </span>
          )}
        </div>

        {/* آدرس */}
        <div className="text-center truncate px-2">
          {user.stadioAddress === null ? (
            <span className="text-gray-500 text-xs">بدون آدرس</span>
          ) : (
            <span className="text-purple-300 truncate block max-w-full">
              {user.stadioAddress}
            </span>
          )}
        </div>

        {/* وضعیت هنرمند */}
        <div className="text-center">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              user.artist === 0
                ? "bg-red-900/50 text-red-300"
                : "bg-green-700/50 text-cyan-50"
            }`}
          >
            {user.artist === 0 ? "تایید نشده" : "تایید شده"}
          </span>
        </div>
      </div>
    ))}
</div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashbord;
