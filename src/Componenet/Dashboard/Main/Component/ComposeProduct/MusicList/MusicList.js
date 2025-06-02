import React, { useState } from "react";
import { MdArrowCircleLeft } from "react-icons/md";
import { MdArrowCircleRight } from "react-icons/md";
import PostForm from "../SendFormData/PostForm";
import axios from "axios";
import { useDispatch } from "react-redux";
import Classic from "./Items/Classic";
import Electronic from "./Items/Electronic";
import MixMaster from "./Items/MixMaster";
import Pop from "./Items/Pop";
import Rock from "./Items/Rock";
import HipHop from "./Items/HipHop";
import { getMusicInfo } from "../../../../../StateManagement/Action";

const MusicList = () => {
 
    const [formData, setFormData] = useState({
      musicFile: null,
      musicImageFile: null,
      message: "",
      gammuisc: "",
      tempo: 100,
      title: "",
      tozihat: "",
      sheromelody: 0,
      tanzim: 0,
      sampleproduct: 0,
    });
    const [itemCheck, setItemCheck] = useState({
      pop: true,
      hiphop: false,
      elec: false,
      rock: false,
      classic: false,
      mixmaster: false,
    });
    const handleCheckboxChange = (name) => {
      const newCheckState = {
        pop: false,
        hiphop: false,
        elec: false,
        rock: false,
        classic: false,
        mixmaster: false,
      };
      newCheckState[name] = true; // فقط آیتم انتخاب‌شده را تیک می‌زنیم
      setItemCheck(newCheckState);
    };
    const checkedItems = Object.entries(itemCheck)
    .filter(([key, value]) => value) // فقط کلیدهایی که مقدار true دارند را فیلتر می‌کنیم
    .map(([key]) => key); // فقط نام کلیدها را برمی‌گردانیم
  console.log(checkedItems)
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      Object.keys(formData).forEach((key) => {
        fd.append(key, formData[key]);
      });
  
      try {
        const response = await axios.post("http://localhost:3000/musics", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFormData({ ...formData, message: response.data.message });
        console.log(response.data);
      } catch (error) {
        console.error("Error uploading music:", error);
        setFormData({ ...formData, message: "Error uploading music" });
      }
    };
  
    const itemProduct = [
      { name: "پاپ", key: "pop" },
      { name: "هیپ هاپ", key: "hiphop" },
      { name: "الکترونیک", key: "elec" },
      { name: "راک", key: "rock" },
      { name: "کلاسیک", key: "classic" },
      { name: "میکس مستر", key: "mixmaster" },
    ];

    const ButtonClassName =
    "rounded-xl grid col-span-2 place-content-center text-white text-xl h-12 mt-7 font-semibold bg-black border border-purple-600 w-full p-2";
 

  return (
     <>
          {/* {
            show ? 
            <>
            <PostForm/>
            </>
            :
            <>
          <div className="grid grid-cols-12 gap-2  place-content-center ">
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
              <div className={`mt-5 p-3 grid grid-cols-3 gap-2`}>
                {image.slice(currentSlide, currentSlide + 3).map((a, i) => (
                  <div
                    key={a.name}
                    className={`w-full col 
                       rounded-lg shadow-sm  `}
                      onClick={()=>{setShow(true);setSelectGender(i)}}
                  >
                    <img
                      alt={a.name}
                      className="p-2 rounded-xl h-72 w-full"
                      src={a.url}
                    />
                    <div className="px-2 pb-2 ">
                      <div className="justify-items-center ">
                        <h5 className="text-2xl mb-2 font-semibold tracking-tight text-gray-900 dark:text-stone-300 ">
                          {a.name}
                        </h5>
                      </div>
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
          } */}
            <div className="bg-zinc-950 h-full">
          <div dir="rtl" className="flex justify-between p-1 gap-2 m-1 text-white font-bold text-xl ">
            {itemProduct.map((item) => (
              <div  key={item.key} className="flex justify-between p-1 mr-2 ml-2 gap-4">
              <label>
                <input
                  type="checkbox"
                  className="text-purple-600 rounded-xl m-1 p-1"
                  name={item.key}
                  checked={itemCheck[item.key]}
                  onChange={() => handleCheckboxChange(item.key)}
                />
                {item.name}
              </label>
                  </div>
            ))}
          </div>
  
          {itemCheck.pop && <Pop Component={checkedItems}/>}
          {itemCheck.hiphop && <HipHop Component={checkedItems}/>}
          {itemCheck.elec && <Electronic Component={checkedItems}/>}
          {itemCheck.rock && <Rock Component={checkedItems}/>}
          {itemCheck.classic && <Classic Component={checkedItems}/>}
          {itemCheck.mixmaster && <MixMaster Component={checkedItems}/>}
          
      </div>
        </>
  )
}

export default MusicList