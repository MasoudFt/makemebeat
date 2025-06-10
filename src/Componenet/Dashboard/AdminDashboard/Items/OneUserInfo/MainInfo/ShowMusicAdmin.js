import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation,  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchurlMuiscFile } from "../../../../../StateManagement/Action";
import ServerURL from "../../../../../API/ServerURL";
const ShowMusicAdmin = () => {
  const [updating, setUpdating] = useState(false); // اضافه کردن وضعیت لودینگ به‌روزرسانی
  const [musiclist, setMusicList] = useState([]);

  const dispatch = useDispatch();

  const location = useLocation();
  const str = location.pathname;
  const result = str.replace(/.*\/(\d+)$/, "$1");

  const imageUrl = ServerURL();

  const getMusicListFromDb = async () => {
    try {
      const url = `${ServerURL()}oneUserMusics/${result}`;
      const res = await axios.get(url);
      setMusicList(res.data);
      console.log(res.data);
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
      const url = `${ServerURL()}musics/${id}`;
      const response = await axios.put(url, inputValues);
      setMusicList((prevList) =>
        prevList.map((item) =>
          item.post_id === id ? { ...item, ...inputValues } : item
        )
      ); // به‌روزرسانی لیست موسیقی با مقادیر جدید
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false); // پایان لودینگ
    }
  };

  const colItems = [
    { id: 0, name: "ردیف" },
    { id: 1, name: "کاور عکس" },
    { id: 2, name: "نام محصول" },
    { id: 3, name: "سبک" },
    { id: 4, name: "تاریخ بارگذاری" },
    { id: 6, name: "قیمت اصلی " },
    { id: 7, name: "تخفیف" },
    { id: 5, name: "وضعیت تایید" },
    { id: 8, name: "ویرایش" },
  ];
  useEffect(() => {
    getMusicListFromDb();
  }, [result]);
  return (
    <>
      <div className="grid-rows-2 rounded-lg font-bold text-white text-xl p-2">
        <div className="grid grid-cols-9 border border-zinc-900 py-2 border-b-neutral-800 gap-2 text-center p-1 text-xs text-slate-300 ">
          {colItems.map((a) => (
            <div key={a.id}>
              <div>{a.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid-rows-2 overflow-y-scroll h-full rounded-lg font-bold text-cyan-50 text-xs p-2">
        {musiclist.length ? (
          musiclist.map((item) => (
            <div
              key={item.post_id}
              onClick={() => dispatch(fetchurlMuiscFile(item))}
              className="grid grid-cols-9 border border-zinc-900 py-2 border-b-neutral-800 hover:ml-2 items-center gap-2 text-center p-1 text-xs text-cyan-50"
            >
              <div>{musiclist.indexOf(item) + 1}</div>
              <img
                src={imageUrl + item.file_pathImage}
                alt={item.title}
                className="h-12 w-12 rounded-full"
              />
              {[
                "title",
                "type",
                "createat",
                "orginalPriceTanzim",
                "discountPriceTanzim",
              ].map((field) => (
                <div key={field}>
                  {editingIndex === musiclist.indexOf(item) ? (
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
              <div
                className={`${
                  item.isShow === 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.isShow === 0 ? "تایید نشده" : "تایید شده"}
              </div>
              <div>
                {editingIndex === musiclist.indexOf(item) ? (
                  <button
                    onClick={() => {
                      stopEditing();
                      updateFieldInDb(item.post_id);
                    }}
                    className="bg-black cursor-pointer text-cyan-50 border border-purple-600 rounded-lg p-2"
                  >
                    ذخیره
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(musiclist.indexOf(item), item)}
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
    </>
  );
};

export default ShowMusicAdmin;
