import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ServerURL from "./../../../../../API/ServerURL"
const ShowGraphicAdmin = () => {
  const [videoList, setVideoList] = useState([]);
  const [updating, setUpdating] = useState(false); // اضافه کردن وضعیت لودینگ به‌روزرسانی

    const location = useLocation();
    const str = location.pathname;
    const result = str.replace(/.*\/(\d+)$/, "$1");
    console.log(result)
    const getVideoFromDb = async () => {
        try {
          const url = `${ServerURL()}videos/${result}`;
          const res = await axios.get(url);
          console.log(res)
          setVideoList(res.data);
        } catch (error) {
          console.log(error);
        }
      };
   

      const [editingIndex, setEditingIndex] = useState(null);
      const [inputValues, setInputValues] = useState({});
    
    
      const stopEditing = () => {
        setEditingIndex(null);
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({ ...prev, [name]: value }));
      };
    
    
        const startEditing = (index, item) => {
            setEditingIndex(index);
            setInputValues({
              title: item.title,
              type: item.type,
              post_id: item.post_id,
              createat: item.createat,
              orginalPriceTanzim: item.orginalPriceTanzim,
              discountPriceTanzim: item.discountPriceTanzim,
            });
          };
        
          const updateFieldInDb = async (id) => {
            setUpdating(true); // شروع لودینگ
            try {
              const url = `${ServerURL()}videos/${id}`;
              const response = await axios.put(url, inputValues);
              setVideoList((prevList) =>
                prevList.map((item) => (item.post_id === id ? { ...item, ...inputValues } : item))
              );// به‌روزرسانی لیست موسیقی با مقادیر جدید
              console.log(response)
            } catch (error) {
              console.log(error);
            } finally {
              setUpdating(false); // پایان لودینگ
            }
          };

            useEffect(() => {
                getVideoFromDb();
                console.log("object")
            }, [result]);

            const colItems = [
                { id: 0, name: "ردیف" },
                { id: 2, name: "نام محصول" },
                { id: 3, name: "نوع ویدیو" },
                { id: 4, name: "تاریخ بارگذاری" },
                { id: 5, name: "وضعیت تایید" },
                { id: 6, name: "قیمت اصلی " },
                { id: 7, name: "تخفیف" },
                { id: 8, name: "ویرایش" },
              ];
  return (
    <>
        <div className="grid-rows-2 rounded-lg font-bold text-white h-full text-xl p-2">
                <div className="grid grid-cols-8 border border-zinc-900 py-2 border-b-neutral-800 h-fit gap-2 text-center p-1 text-xs text-slate-300 ">
                  {colItems.map((a) => (
                    <div key={a.id}><div>{a.name}</div></div>
                  ))}
                </div>
                <div className="grid-rows-2 overflow-y-scroll h-72 rounded-lg font-bold text-cyan-50 text-xs p-2">
                {videoList.length ? (
                  videoList.map((item) => (
                    <div key={item.post_id} className="grid grid-cols-8 border border-zinc-900 py-2 border-b-neutral-800 hover:ml-2 items-center gap-2 text-center p-1 text-xs text-cyan-50">
                      <div>ردیف {videoList.indexOf(item) + 1}</div>
                      {/* <img src={imageUrl + item.file_path} alt={item.title} className="h-12 w-12 rounded-full" /> */}
                      {["title", "type", "createat", "orginalPriceTanzim", "discountPriceTanzim"].map((field) => (
                        <div key={field}>
                          {editingIndex === videoList.indexOf(item) ? (
                            <input
                              type="text"
                              name={field}
                              value={inputValues[field] || ""}
                              onChange={handleInputChange}
                              className="bg-transparent border-b border-cyan-50 text-cyan-50 w-full"
                              autoFocus={field === "title"}
                            />
                          ) : (
                            item[field]
                          )}
                        </div>
                      ))}
                      <div className={`${item.isShow === 0 ? "text-red-500" : "text-green-500"}`}>
                        {item.isShow === 0 ? "تایید نشده" : "تایید شده"}
                      </div>
                      <div>
                        {editingIndex === videoList.indexOf(item) ? (
                          <button
                            onClick={() => { stopEditing(); updateFieldInDb(item.post_id); }}
                            className="bg-black cursor-pointer text-cyan-50 border border-purple-600 rounded-lg p-2"
                          >
                            ذخیره
                          </button>
                        ) : (
                          <button
                            onClick={() => startEditing(videoList.indexOf(item), item)}
                            className="bg-black cursor-pointer text-cyan-50 border border-purple-600 rounded-lg p-2"
                          >
                            ویرایش
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>محصولی بارگذاری نشده</p>
                )}
              </div>
              </div>
    </>
  )
}

export default ShowGraphicAdmin