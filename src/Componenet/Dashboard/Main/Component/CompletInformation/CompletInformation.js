import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchImage } from "../../../../StateManagement/Action"; // فرض بر این است که این اکشن را دارید
import ServerURL from '../../../../API/ServerURL';

const CompletInformation = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    licenseNumber: '',
    studioAddress: '',
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
      const res = await axios.put(`${ServerURL()}users/update/${userInfo.userId}`, data, {
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
    { id: 1, label: "نام خانوادگی", name: "lastName", type: "text", className: "w-full border-solid border-2 border-purple-600 p-2 mt-1 bg-zinc-950 text-white rounded-md" },
    { id: 2, label: "شماره مجوز", name: "licenseNumber", type: "text", className: "w-full border-solid border-2 border-purple-600 p-2 mt-1 bg-zinc-950 text-white rounded-md" },
    { id: 3, label: "آدرس استودیو", name: "studioAddress", type: "text", className: "w-full border-solid border-2 border-purple-600 p-2 mt-1 bg-zinc-950 text-white rounded-md" },
    { id: 4, label: "آپلود تصویر", name: "image", type: "file", className: "w-full border-purple-600 mt-1 border-2 bg-zinc-950 border-gray-300 rounded-lg cursor-pointer" },
  ];

  return (
    <form onSubmit={postFormData} className="bg-zinc-950 p-6 rounded-lg shadow-lg max-w-4xl mx-auto text-white text-xl">
    <h2 className="text-2xl font-bold mb-4 text-purple-400 text-center">فرم ارسال اطلاعات</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 font-bold text-base gap-6">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col">
          <label className="px-2 py-2">{item.label}</label>
          <input
            name={item.name} 
            onChange={handleInputChange} 
            type={item.type}
            placeholder={item.label}
            className={`${item.className}`}
            accept={item.type === 'file' ? "image/*" : undefined}
          />
        </div>
      ))}
      <div className="col-span-1 md:col-span-2 flex justify-center">
        <button className={`${ButtonClassName} w-full md:w-auto py-2 px-4 rounded-lg transition-colors duration-200 bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400`} type="submit">
          ارسال
        </button>
      </div>
    </div>
  </form>
  );
};

export default CompletInformation;