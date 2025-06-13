
import React, { useState } from 'react';
import axios from 'axios';
import VideoListCompos from './Items/VideoListCompos';
import ServerURL from '../../../../../API/ServerURL';

const VideoPost = () => {
  const d = new Date();
  const Time = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "full",
  }).format(d);
  const tokenUser  = localStorage.getItem("userId");

  const [itemCheck, setItemCheck] = useState({
    musicVideo: false,
    comingSoon: false,
    reels: false,
    edit: false,
    mobilegraphi: false,
    clip: false,
  });

  const [inputValues, setInputValues] = useState({
    user_id: tokenUser ,
    title: "",
    filepathImage: null,
    createat: Time,
    tozihat: "",
    likeproduct: "",
    type: "", // مقدار پیش‌فرض خالی
    director: 0,
    nameSdirector: "",
    actor: 0,
    nameSactor: "",
    senarioWriter: 0,
    nameSsenarioWriter: "",
    productionManager: 0,
    nameSproductionManager: "",
    cinematographer: 0,
    nameScinematographer: "",
    lightingDesigner: 0,
    nameSlightingDesigner: "",
    makeUpArtist: 0,
    nameSmakeUpArtist: "",
    setPlace: "",
    nameSsetPlace: "",
    costumeDesigner: 0,
    nameScostumeDesigner: "",
    fieldSpesialEffectDesigner: 0,
    nameSfieldSpesialEffectDesigner: "",
    visualEffectDseigner: 0,
    nameSvisualEffectDseigner: "",
    edit: 0,
    nameSedit: "",
    otherFactor: 0,
    nameSotherFactor: "",
    cameraCount: 0,
    cameraModel: "",
    lightingCount: "",
    lightingModel: "",
    moveMentEquipmentCranes: "",
    moveMentEquipmentHelishot: "",
    moveMentEquipmentRonin: "",
    moveMentEquipmentRail: "",
    otherEquipment: "",
    orginalPrice: "",
    discountPrice: "",
    demoVideofile: "",
  });
console.log(inputValues)
const [formData, setFormData] = useState({
  videoFile: null,
});
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // اعتبارسنجی اولیه
  if (!inputValues.title || !inputValues.type) {
    alert('عنوان و نوع ویدیو الزامی هستند');
    return;
  }

  const fd = new FormData();

  // اضافه کردن فایل‌ها
  // if (inputValues.filepathImage) {
  //   fd.append("filepathImage", inputValues.filepathImage);
  // }
  if (inputValues.demoVideofile) {
    fd.append("demoVideofile", inputValues.demoVideofile);
  }

  // اضافه کردن سایر مقادیر (به جز فایل‌ها)
  for (const key in inputValues) {
    if (key !== "filepathImage" && key !== "demoVideofile") {
      fd.append(key, inputValues[key] || ''); // ارسال مقدار یا رشته خالی
    }
  }

  try {
    const response = await axios.post(`${ServerURL()}video-upload`, fd, {
    // const response = await axios.post(`http://localhost:3000/video_upload`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    console.log("Upload successful:", response.data);
    alert('ویدیو با موفقیت آپلود شد');
    // ریست فرم یا انجام عملیات بعدی
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    alert('خطا در آپلود ویدیو: ' + (error.response?.data?.error || error.message));
  }
};

const handleFileChange = (e, field) => {
  const file = e.target.files[0];
  if (!file) return;

  // اعتبارسنجی نوع فایل
  if (field === 'demoVideofile') {
    const videoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm'];
    if (!videoTypes.includes(file.type)) {
      alert('فقط فایل‌های ویدیویی مجاز هستند');
      return;
    }
  } else if (field === 'filepathImage') {
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!imageTypes.includes(file.type)) {
      alert('فقط فایل‌های تصویری مجاز هستند');
      return;
    }
  }

  setInputValues(prev => ({ ...prev, [field]: file }));
};




  const handleCheckboxChange = (name) => {
    const newCheckState = {
      musicVideo: false,
      comingSoon: false,
      reels: false,
      edit: false,
      mobilegraphi: false,
      clip: false,
    };
    
    newCheckState[name] = true; // فقط آیتم انتخاب‌شده را تیک می‌زنیم
    setItemCheck(newCheckState);
    
    setInputValues((prev) => ({
      ...prev,
      type: name, // مقدار type را به گزینه انتخاب شده تغییر می‌دهیم
    }));
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setInputValues((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setInputValues((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  // const handleFileChange = (e, field) => {
  //   const file = e.target.files[0] || null;
  //   if (field === "demoVideofile") {
  //     setFormData((prev) => ({ ...prev, videoFile: file }));
  //   } else if (field === "filepathImage") {
  //     setInputValues((prev) => ({ ...prev, filepathImage: file })); // تنظیم فایل تصویر
  //   }
  // };
 

  const itemProduct = [
    { name: "موزیک ویدئو", key: "musicVideo" },
    { name: "کامینگ سون", key: "comingSoon" },
    { name: "تیزر", key: "reels" },
    { name: "تدوین", key: "edit" },
    { name: "موبایل گرافی", key: "mobilegraphi" },
    { name: "کلیپ", key: "clip" },
  ];

  const inputDescription = [
    {
      name: "عنوان محصول",
      type: "text",
      className: "rounded-lg border border-purple-500 bg-transparent text-white p-2",
      field: "title",
    },
    {
      name: "عکس محصول",
      type: "file",
      className: "rounded-lg border border-purple-500 bg-transparent text-white p-2",
      field: "filepathImage",
      accept: "image/*",
    },
    {
      name: "توضیحات محصول",
      type: "textarea",
      className: "rounded-lg border border-purple-500 bg-transparent text-white p-2",
      field: "tozihat",
    },
  ];

  const ButtonClassName = "bg-black border border-purple-600 text-white text-base font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="bg-zinc-950 h-full">
          <div dir="rtl" className="flex justify-between p-1 gap-2 m-1 text-white font-bold text-base ">
            {itemProduct.map((item) => (
              <div key={item.key} className="flex justify-between p-1 mr-2 ml-2 gap-4">
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
        </div>
        <div>
          {inputDescription.map((item, idx) => (
            <div key={idx} className="flex flex-col mb-4 text-white">
              <label className="mb-2">{item.name}</label>
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
        <div>
          <VideoListCompos inputValues={inputValues} setInputValues={setInputValues}/>
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
  );
};

export default VideoPost;