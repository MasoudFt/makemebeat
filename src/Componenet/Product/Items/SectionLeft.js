import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoCartSharp } from 'react-icons/io5';
import { MdSupportAgent } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { PiUsersThreeBold } from 'react-icons/pi';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { LiaEyeSolid } from 'react-icons/lia';
import { postProductlist } from '../../StateManagement/Action'; // Adjust the import based on your file structure
import { Alert, Stack } from '@mui/material'; // Ensure you have @mui/material installed

const SectionLeft = ({ OneMusicInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const StyleDivfather1 = "row-span-3 text-white drop-shadow-xl rounded-lg gap-4 shadow-xl border-2 border-zinc-800";
  const StyleDivChild = "flex border-b-2";
  const StyleDivChild1 = "p-2 grid justify-items-start items-center";
  const StyleDivChild2 = "p-2 grid justify-items-start items-center";

  const [checked, setChecked] = useState({
    t1: false,
    t2: false,
    t3: false,
  });

  const handleChange = (event) => {
    const { name, checked: isChecked } = event.target;
    setChecked((prev) => ({
      ...prev,
      [name]: isChecked,
    }));
  };

  const handleAddToCart = () => {
   
      dispatch(postProductlist(OneMusicInfo));
      navigate("/Card");
  
  };

  return (
    <>
      <div dir="rtl" className={StyleDivfather1}>
        <div className={StyleDivChild}>
          <div className={StyleDivChild1}>نوع بیت</div>
          <div className={StyleDivChild2}>
            <div>
              <input
                style={{ color: "white" }}
                name="t1"
                type="Checkbox"
                checked={checked.t1}
                onChange={handleChange}
              />
              پروژه بیت
            </div>
            <div>
              <input
                style={{ color: "white" }}
                name="t2"
                type="Checkbox"
                checked={checked.t2}
                onChange={handleChange}
              />
              نسخه wave بیت
            </div>
            <div>
              <input
                style={{ color: "white" }}
                name="t3"
                type="Checkbox"
                checked={checked.t3}
                onChange={handleChange}
              />
              نسخه mp3 بیت
            </div>
          </div>
        </div>
        <div>
          <div className="p-2 m-5 text-xl justify-items-center border-2 border-dashed rounded-2xl items-center">
            <div className="line-through decoration-red-500 decoration-2">
              {OneMusicInfo.orginalPriceTanzim} تومان
            </div>
            <div className="p-2 m-5 text-3xl justify-items-center items-center">
              {OneMusicInfo.discountPriceTanzim} تومان
            </div>
          </div>
        </div>
        <div className="grid grid-rows-1 gap-4 p-4">
          <div className="">
            <input
              type="number"
              placeholder="تعداد"
              className="bg-gray-800 rounded-lg border-2 h-10 w-16 p-1 border-white"
              min={0}
            />
          </div>
          <div className="grid grid-rows-3 gap-2">
            <button
              onClick={handleAddToCart}
              className="flex w-full hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
            >
              <IoCartSharp className="w-20" size={25} />
              افزودن به سبد خرید
            </button>
        
            <div className="">
              <button className="flex w-full hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
                <MdSupportAgent className="w-20" size={25} />
                دریافت پشتیبانی
              </button>
            </div>
            <div className="">
              <button className="flex w-full hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full">
                <FaHeart className="ml-3" size={20} />
                افزودن به لیست علاقه مندی ها
              </button>
            </div>
          </div>
        </div>
        <div className="flex p-2 justify-evenly">
          <div className="w-14 text-purple-700">
            <PiUsersThreeBold size={35} />
          </div>
          <div dir="ltr" className="w-14 font-bold text-purple-700">0</div>
          <div className="w-14 font-bold text-purple-700">خریداران</div>
        </div>
        <div className="flex mt-5 p-2 justify-evenly">
          <div title="دیدگاه" className="w-14 text-yellow-500 mr-4">
            <VscCommentDiscussion size={30} />
          </div>
          <div className="cursor-help w-14 font-bold text-yellow-500">0</div>
          <div title="بازدید" className="w-14 text-yellow-500 mr-4">
            <LiaEyeSolid size={30} />
          </div>
          <div className="cursor-help w-14 font-bold text-yellow-500">
            {OneMusicInfo.view}
          </div>
        </div>

        {/* Display alert message if it exists */}
       
      </div>
    </>
  );
};

export default SectionLeft;

