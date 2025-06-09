import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchImage } from "../../../../../StateManagement/Action";
import { MdArrowCircleLeft } from "react-icons/md";

import { MdArrowCircleRight } from "react-icons/md";
import ServerURL from "../../../../../API/ServerURL";


const GraphicItems = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [show, setShow] = useState(false);
    const [selectGender, setSelectGender] = useState(0);
    console.log(selectGender)
    const [formData, setFormData] = useState({
      firstPurchase: "",
      gender: "",
      price: "",
      cover: null,
    });
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userId);
  
  
    const handelNextIndexPic = () => {
      if (currentSlide < image.length - 1) {
        setCurrentSlide((e) => e + 1);
      } else {
        setCurrentSlide(0);
      }
    };
  
    const handelPervIndexPic = () => {
      if (currentSlide !== 0) {
        setCurrentSlide((e) => e - 1);
      } else {
        setCurrentSlide(image.length - (image.length % 3 || 3));
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value, type, files } = e.target;
      if (type === "file") {
        setFormData({ ...formData, [name]: files[0] }); // فقط فایل را ذخیره می‌کنیم
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
  
    const postFormData = async (e) => {
      e.preventDefault(); // جلوگیری از ارسال فرم
      const data = new FormData();
      data.append("image", formData.image);
      data.append("userId", userId); // شناسه کاربر را به فرم اضافه کنید
  
      try {
        const res = await axios.post(
          `${ServerURL()}uploadProfile`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(res.data);
        dispatch(fetchImage(res.data.imageName));
      } catch (error) {
        console.log(error);
      }
    };
    const image = [
      {
        name: "تکست گرافی",
        url: "https://makemebeat.net/wp-content/uploads/2025/02/2.%D9%88.%D9%88-1024x1024.jpg",
      },
      {
        name: "اکولایزر",
        url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-34-00-1024x1024.jpg",
      },
      {
        name: "کاور آرت",
        url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-05_03-45-51-1024x1024.jpg",
      },
      {
        name: "موشن گرافی",
        url: "https://makemebeat.net/wp-content/uploads/2023/06/photo_2023-06-04_14-41-48-1024x1024.jpg",
      }

    ];
    const ButtonClassName =
      "rounded-xl grid col-span-2 place-content-center text-white text-xl h-12 mt-7 font-semibold bg-black border border-purple-600 w-24 p-2";
    const ButtonClassName2 =
      "rounded-xl grid col-span-2 place-content-center text-white text-xl h-12 mt-7 font-semibold bg-black border border-purple-600 w-44 p-2";
    const items = [
      {
        id: 1,
        label: "نام محصول",
        name: "firstPurchase",
        type: "text",
        className:
          "w-full border-solid border-2 border-purple-600 p-2 mt-1 bg-zinc-950 text-white rounded-md focus:outline-none",
      },
      {
        id: 2,
        label: "سبک",
        name: "gender",
        type: "text",
        className:
          "w-full border-solid border-2 border-purple-600 p-2 mt-1 bg-zinc-950 text-white rounded-md focus:outline-none",
      },
      {
        id: 3,
        label: "قیمت",
        name: "price",
        type: "text",
        className:
          "w-full border-solid border-2 border-purple-600 p-2 mt-1 bg-zinc-950 text-white rounded-md focus:outline-none",
      },
      {
        id: 4,
        label: "آپلود کاور",
        name: "image",
        type: "file",
        className:
          "w-full border-purple-600 mt-1 border-2 bg-zinc-950 border-gray-300 rounded-lg cursor-pointer focus:outline-none",
      },
    ];
  return (
      <form onSubmit={postFormData} className="text-white text-xl">
              {
                show ? 
                <>
                   <div className="grid grid-cols-2 font-bold text-white text-base gap-4 p-2">
                {items.map((item) => (
                  <div key={item.id}>
                    <label className="grid px-2 py-2 ml-2">{item.label}</label>
                    <input
                      name={item.name} // نام ورودی را به عنوان کلید در state استفاده می‌کنیم
                      onChange={handleInputChange} // تابع تغییر داینامیک
                      type={item.type}
                      value={item.name === "gender"? image[selectGender].name:""}
                      placeholder={item.label}
                      className={item.className}
                      accept={item.type === 'file' ? "image/*" : undefined} // فقط برای ورودی فایل
                    />
                  </div>
                ))}
                <div>
                <button className={ButtonClassName} type="submit">ارسال</button>
                </div>
                <div>
                <button onClick={()=>setShow(false)} className={ButtonClassName2} type="submit">انتخاب سبک</button>
                </div>
            </div>
                </>
                :
                <>
              <div className="grid grid-cols-12 gap-2 justify-between  place-content-center ">
                <div className="col-span-1 ">
                  <div className="grid justify-items-end  items-center h-full w-full">
                    <MdArrowCircleRight
                      color="gray"
                      style={{ cursor: "pointer" }}
                      size={40}
                      onClick={handelPervIndexPic}
                    />
                  </div>
                </div>
        
                <div className="col-span-10">
                  <div className={`mt-5 p-3 grid grid-cols-4 gap-2`}>
                    {image.slice(currentSlide, currentSlide + 4).map((a, i) => (
                      <div
                        key={a.name}
                        className={`w-full 
                           rounded-lg shadow-sm  `}
                          onClick={()=>{setShow(true);setSelectGender(i)}}
                      >
                        <img
                          alt={a.name}
                          className="p-2 rounded-xl h-72 w-full"
                          src={a.url}
                        />
                        <div className="px-2 pb-2 ">
                          {/* <div className="justify-items-center ">
                            <h5 className="text-2xl mb-2 font-semibold tracking-tight text-gray-900 dark:text-stone-300 ">
                              {a.name}
                            </h5>
                          </div> */}
                          <div className="flex items-center justify-between mt-2.5 mb-5">
                            <div className="flex  items-center space-x-1 rtl:space-x-reverse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="grid justify-items-start items-center h-full w-full">
                    <MdArrowCircleLeft
                      color="gray"
                      style={{ cursor: "pointer" }}
                      size={40}
                      onClick={handelNextIndexPic}
                    />
                  </div>
                </div>
              </div>
              </>
              }
            </form>
  )
}

export default GraphicItems