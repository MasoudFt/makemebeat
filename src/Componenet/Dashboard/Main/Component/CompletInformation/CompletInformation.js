import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchImage } from "../../../../StateManagement/Action"; // فرض بر این است که این اکشن را دارید

const CompletInformation = () => {
  const [formData, setFormData] = useState({
    // lastName: '',
    // licenseNumber: '',
    // studioAddress: '',
    image: null,
  });
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userId);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] }); // فقط فایل را ذخیره می‌کنیم
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const postFormData = async (e) => {
    e.preventDefault(); // جلوگیری از ارسال فرم
    const data = new FormData();
    data.append("image", formData.image);
    data.append("userId", userInfo.userId); // شناسه کاربر را به فرم اضافه کنید
    // console.log(userInfo.userId)
    try {
      const res = await axios.put(`http://localhost:3000/users/update/${userInfo.userId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(res.data);
      dispatch(fetchImage(res.data.imageName));
    } catch (error) {
      console.log(error);
    }
  };

  const ButtonClassName = "rounded-xl grid col-span-2 place-content-center text-white text-xl h-12 mt-7 font-semibold bg-black border border-purple-600 w-24 p-2";
  const items = [
    { id: 1, label: "نام خانوادگی", name: "lastName", type: "text", className: "w-full border-solid border-2 border-purple-600 p-2 mt-1 bg-zinc-950 text-white rounded-md focus:outline-none" },
    { id: 2, label: "شماره مجوز", name: "licenseNumber", type: "text", className: "w-full border-solid border-2 border-purple-600 p-2 mt-1 bg-zinc-950 text-white rounded-md focus:outline-none" },
    { id: 3, label: "آدرس استودیو", name: "studioAddress", type: "text", className: "w-full border-solid border-2 border-purple-600 p-2 mt-1 bg-zinc-950 text-white rounded-md focus:outline-none" },
    { id: 4, label: "آپلود تصویر", name: "image", type: "file", className: "w-full border-purple-600 mt-1 border-2 bg-zinc-950 border-gray-300 rounded-lg cursor-pointer focus:outline-none" },
  ];

  return (
      <form onSubmit={postFormData} className="text-white text-xl">
    <div className="grid grid-cols-2 font-bold text-white text-base gap-4 p-2">
        {items.map((item) => (
          <div key={item.id}>
            <label className="grid px-2 py-2 ml-2">{item.label}</label>
            <input
              name={item.name} // نام ورودی را به عنوان کلید در state استفاده می‌کنیم
              onChange={handleInputChange} // تابع تغییر داینامیک
              type={item.type}
              placeholder={item.label}
              className={item.className}
              accept={item.type === 'file' ? "image/*" : undefined} // فقط برای ورودی فایل
            />
          </div>
        ))}
        <button className={ButtonClassName} type="submit">ارسال</button>
    </div>
      </form>
  );
};

export default CompletInformation;