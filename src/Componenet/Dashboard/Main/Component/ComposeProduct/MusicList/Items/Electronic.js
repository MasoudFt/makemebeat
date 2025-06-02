import React, { useState } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';
const Electronic = ({Component}) => {
 const userId = useSelector((state) => state.userId);
  const d = new Date();
  const Time=new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "full",
    // timeStyle: "short",
  }).format(d)
  const ComponentType=Component
  const tokenUserId = localStorage.getItem("userId")
const [inputValues, setInputValues] = useState({
  user_id: tokenUserId,
  productName: "", // Changed from title to productName
  productImage: null,
  createat: Time,
  view: "",
  likeproduct: "",
  post_id: "",
  sheroMelody: 0,
  tanzim: 0,
  sampleproduct: 0,
  type:ComponentType[0],
  gener:"",
  gammuisc: "",
  tempo: "",
  productDescription: "", // Changed from tozihat to productDescription
  demoMP3File: null,
  mainMP3File: null,
  tagMP3: null,
  waveFile: null,
  projectFile: null,
  coverImage: null,
  primaryAmount: "",
  discountAmount: "",
  });
  const [formData, setFormData] = useState({
    message: "",
    gammuisc: "",
    tempo: 100,
    title: "",
    tozihat: "",
    sheromelody: 0,
    tanzim: 0,
    sampleproduct: 0,
  });

  const [selectCheckbox, setSelectCheckbox] = useState(null);
  const [checkboxShowTanzim, setCheckboxShowTanzim] = useState([]);


  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    // Append inputValues keys (including files) - Use inputValues instead of formData
    Object.entries(inputValues).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        fd.append(key, value);
      }
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setInputValues((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setInputValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0] || null;
    setInputValues((prev) => ({ ...prev, [field]: file }));
  };

  const inputItems = [
    { label: "عنوان محصول", field: "productName", type: "text" },
    { label: "عکس محصول", field: "productImage", type: "file", accept: "image/*" },
    { label: "توضیحات محصول", field: "productDescription", type: "textarea" },
    { label: "گام", field: "gammuisc", type: "text" },
    { label: "تمپو", field: "tempo", type: "text" },
  ];

  const inputCheckBoxItem = [
    {
      name: "شعر و ملودی",
      item: [
        { name: "فایل mp3 دمو دارد", field: "demoMP3File", labelInput: "فایل دمو mp3", type: "file", accept: ".mp3",note:"انواع فایل های مجاز : mp3, حداکثر اندازه فایل: 1,000 MB." },
        { name: "فایل mp3 آپلود اصلی", field: "mainMP3File", labelInput: "فایل اصلی mp3", type: "file", accept: ".mp3",note:"انواع فایل های مجاز : mp3, حداکثر اندازه فایل: 1,000 MB." },
        { name: "آپلود عکس شعر به همراه آکورد ها", field: "coverImage", labelInput: "آپلود عکس شعر به همراه آکورد ها", type: "file", accept: "image/*",note:"انواع فایل های مجاز : jpg, jpeg, png, حداکثر اندازه فایل: 1 MB" }
      ],
    },
    {
      name: "تنظیم",
      item: [
        { name: "mp3 با تگ دارد", field: "tagMP3", labelInput: "mp3 با تگ", type: "file", accept: ".mp3",note:"انواع فایل های مجاز : mp3, حداکثر اندازه فایل: 20 MB." },
        { name: "wave دارد", field: "waveFile", labelInput: "wave", type: "file", accept: ".wav",note:"انواع فایل های مجاز : wav, حداکثر اندازه فایل: 100 MB." },
        { name: "پروژه (لاین به لاین) دارد", field: "projectFile", labelInput: "(لاین به لاین)", type: "file",note:"انواع فایل های مجاز : zip, rar, حداکثر اندازه فایل: 1,000 MB." },
        { name: "مبلغ اصلی", field: "primaryAmount", labelInput: "مبلغ اصلی", type: "text",note:"قیمت به تومان وارد شود." },
        { name: "مبلغ تخفیف", field: "discountAmount", labelInput: "مبلغ تخفیف", type: "text" ,note:"قیمت به تومان وارد شود."},
      ],
    },
    {
      name: "نمونه کارآماده",
      item: [
        { name: "mp3 آپلود دمو فایل", field: "demoMP3File", labelInput: "دمو فایل mp3", type: "file", accept: ".mp3",note:"انواع فایل های مجاز : mp3, حداکثر اندازه فایل: 20 MB." },
        { name: "مبلغ اصلی", field: "primaryAmount", labelInput: "مبلغ اصلی", type: "text",note:"قیمت به تومان وارد شود." },
        { name: "مبلغ تخفیف", field: "discountAmount", labelInput: "مبلغ تخفیف", type: "text",note:"قیمت به تومان وارد شود." },
        { name: "کاور محصول", field: "coverImage", labelInput: "اپلود کاور", type: "file", accept: "image/*" ,note:"انواع فایل های مجاز : jpg, jpeg, png, حداکثر اندازه فایل: 1 MB."},
      ],
    },
  ];

  const handleCheckboxToggle = (index) => {
    const newCheckboxState = [...checkboxShowTanzim];
    newCheckboxState[index] = !newCheckboxState[index];
    setCheckboxShowTanzim(newCheckboxState);
  };
  const handleSelectCheckbox = (index) => {
    setSelectCheckbox(index);

    // Reset the values in inputValues for the file and text inputs associated with the newly selected checkbox group
    const items = inputCheckBoxItem[index]?.item || [];
    const resetValues = {};
    items.forEach(item => {
      resetValues[item.field] = item.type === 'file' ? null : '';
    });

    // Set the corresponding value to 1 based on the selected index
    let groupUpdate = {};
    if (index === 0) {
      groupUpdate = { sheroMelody: 1, tanzim: 0, sampleproduct: 0 };
    } else if (index === 1) {
      groupUpdate = { sheroMelody: 0, tanzim: 1, sampleproduct: 0 };
    } else if (index === 2) {
      groupUpdate = { sheroMelody: 0, tanzim: 0, sampleproduct: 1 };
    }

    setInputValues(prev => ({ ...prev, ...resetValues, ...groupUpdate }));
    setCheckboxShowTanzim(Array(items.length).fill(false)); // Reset checkboxShowTanzim
  };

  const ButtonClassName = "bg-black border border-purple-600 text-white text-base font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  return (

<div dir="rtl" className="bg-zinc-950 text-white p-5 rounded-lg shadow-md shadow-zinc-200">
      <form onSubmit={handleSubmit2} className="grid gap-2">
        <h2 className="flex place-content-end text-base mb-4 text-zinc-300"> {Time}</h2>
        <div>
          {inputItems.map((item, idx) => (
            <div key={idx} className="flex flex-col mb-4">
              <label className="mb-2">{item.label}</label>
              {item.type === "textarea" ? (
                <textarea
                  className="rounded-lg border border-purple-500 bg-transparent text-white p-2"
                  name={item.field}
                  value={inputValues[item.field]}
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  className="rounded-lg border border-purple-500 bg-transparent text-white p-2"
                  type={item.type}
                  name={item.field}
                  accept={item.accept}
                  onChange={item.type === "file" ? (e) => handleFileChange(e, item.field) : handleInputChange}
                />
              )}
            </div>
          ))}
        </div>

        {/* Checkbox groups and their inputs */}
        <div className="text-white">
          {/* Checkbox selectors */}
          <div className="flex justify-between p-1 m-1">
          {inputCheckBoxItem[selectCheckbox]?.item.map((item, idx) => (
            <div key={idx} className="grid items-start gap-2 p-1 w-full">
              <input
                type="checkbox"
                className="text-purple-600 rounded-full mt-1"
                checked={checkboxShowTanzim[idx] || false}
                onChange={() => handleCheckboxToggle(idx)}
                id={`checkbox-item-${idx}`}
              />
              <label htmlFor={`checkbox-item-${idx}`} className="ml-2">
                {item.name}
              </label>
              {checkboxShowTanzim[idx] && (
                <>
                <div className="grid gap-2 ml-6 mt-1">
                  <input
                    className="rounded-lg border border-purple-500 bg-transparent text-white p-2"
                    type={item.type}
                    name={item.field}
                    accept={item.accept}
                    onChange={item.type === "file" ? (e) => handleFileChange(e, item.field) : handleInputChange}
                  />
                </div>
                <p className='text-xs font-semibold text-cyan-50'>{item.note}</p>
                </>
              )}
            </div>
          ))}
      </div>

          {/* Group inputs */}
          {selectCheckbox !== null && (
        <div>
          {inputCheckBoxItem[selectCheckbox]?.item.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 p-1 w-full">
              <input
                type="checkbox"
                className="text-purple-600 rounded-full mt-1"
                checked={checkboxShowTanzim[idx] || false}
                onChange={() => handleCheckboxToggle(idx)}
                id={`checkbox-item-${idx}`}
              />
              <label htmlFor={`checkbox-item-${idx}`} className="ml-2">
                {item.name}
              </label>
              {checkboxShowTanzim[idx] && (
                <div className="flex flex-col gap-2 ml-6 mt-1">
                  <label className="mb-1 text-purple-400">{item.labelInput}</label>
                  <input
                    className="rounded-lg border border-purple-500 bg-transparent text-white p-2"
                    type={item.type}
                    name={item.field}
                    accept={item.accept}
                    onChange={item.type === "file" ? (e) => handleFileChange(e, item.field) : handleInputChange}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

          {/* Submit button */}
          </div>
          <div className='flex justify-center p-1 mt-5'>
            <button type="submit" className={ButtonClassName}>
              ارسال اطلاعات
            </button>
        </div>
            {formData.message && (
              <p className="text-white mt-3">{formData.message}</p>
          )}
      </form>
    </div>

  )
}

export default Electronic