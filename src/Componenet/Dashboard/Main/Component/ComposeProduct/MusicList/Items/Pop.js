import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ServerURL from "../../../../../../API/ServerURL"; // مسیر صحیح

const Pop = ({ Component }) => {
  // استفاده از userId از Redux یا localStorage
  const userIdFromRedux = useSelector((state) => state.userId);
  const userIdFromStorage = localStorage.getItem("userId");
  const tokenUserId = userIdFromRedux || userIdFromStorage;

  const d = new Date();
  const Time = new Intl.DateTimeFormat("fa-IR", { dateStyle: "full" }).format(d);
  const ComponentType = Component; // فرض می‌کنیم این property به درستی پاس داده می‌شود

  // State برای مدیریت ورودی‌های فرم
  const [inputValues, setInputValues] = useState({
    user_id: tokenUserId,
    productName: "", // عنوان محصول
    productImage: null, // عکس اصلی محصول
    createat: Time, // زمان ایجاد
    // view: "", // این فیلدها معمولاً در سمت سرور مدیریت می‌شوند
    // likeproduct: "",
    // post_id: "",
    type: ComponentType?.[0] || 'general', // نوع کامپوننت یا دسته‌بندی کلی
    gammuisc: "", // گام موسیقی
    tempo: "", // تمپو
    productDescription: "", // توضیحات محصول
    // فیلدهای مربوط به دسته‌بندی‌های خاص (این‌ها را با دقت مدیریت می‌کنم)
    demoMP3File: null,       // فایل دمو MP3
    mainMP3File: null,       // فایل اصلی MP3
    tagMP3File: null,       // فایل MP3 با تگ
    waveFile: null,         // فایل WAV
    projectFile: null,      // فایل پروژه (zip/rar)
    coverImage: null,       // عکس کاور برای شعر یا محصول
    primaryAmount: "",      // مبلغ اصلی
    discountAmount: "",     // مبلغ تخفیف
  });

  // مدیریت نمایش حالات مختلف برای چک‌باکس‌ها
  const [showFileFields, setShowFileFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // تعریف ساختار کلی فیلدها
  const inputItems = [
    { label: "عنوان محصول", field: "productName", type: "text", placeholder: "پاپ" },
    { label: "عکس محصول", field: "productImage", type: "file", accept: "image/*", placeholder: "انتخاب عکس" },
    { label: "توضیحات محصول", field: "productDescription", type: "textarea", placeholder: "جزئیات محصول را اینجا وارد کنید..." },
    { label: "گام موسیقی", field: "gammuisc", type: "text", placeholder: "مثال: Cm" },
    { label: "تمپو (BPM)", field: "tempo", type: "text", placeholder: "مثال: 140" },
  ];

  // دسته‌بندی‌های اصلی برای انتخاب (مثلاً شعر و ملودی، تنظیم، ...)
  const productCategoryGroups = [
    {
      name: "شعر و ملودی",
      fields: [
        { name: "فایل mp3 دمو", field: "demoMP3File", labelInput: "فایل دمو MP3", type: "file", accept: ".mp3", note: "مجاز: mp3 (حداکثر 1000 MB)" },
        { name: "فایل mp3 اصلی", field: "mainMP3File", labelInput: "فایل اصلی MP3", type: "file", accept: ".mp3", note: "مجاز: mp3 (حداکثر 1000 MB)" },
        { name: "عکس شعر با آکورد", field: "coverImage", labelInput: "عکس شعر/آکورد", type: "file", accept: "image/*", note: "مجاز: jpg, png (حداکثر 1 MB)" }
      ],
    },
    {
      name: "تنظیم و میکس",
      fields: [
        { name: "mp3 با تگ", field: "tagMP3File", labelInput: "فایل MP3 با تگ", type: "file", accept: ".mp3", note: "مجاز: mp3 (حداکثر 20 MB)" },
        { name: "فایل WAV", field: "waveFile", labelInput: "فایل WAV", type: "file", accept: ".wav", note: "مجاز: wav (حداکثر 100 MB)" },
        { name: "پروژه (لاین به لاین)", field: "projectFile", labelInput: "فایل پروژه", type: "file", note: "مجاز: zip, rar (حداکثر 1000 MB)" },
        { name: "مبلغ اصلی", field: "primaryAmount", labelInput: "مبلغ اصلی (تومان)", type: "text", note: "قیمت به تومان" },
        { name: "مبلغ تخفیف", field: "discountAmount", labelInput: "مبلغ تخفیف (تومان)", type: "text", note: "قیمت به تومان" },
      ],
    },
    {
      name: "نمونه کار آماده",
      fields: [
        { name: "دمو فایل mp3", field: "demoMP3File", labelInput: "دمو فایل MP3", type: "file", accept: ".mp3", note: "مجاز: mp3 (حداکثر 20 MB)" },
        { name: "مبلغ اصلی", field: "primaryAmount", labelInput: "مبلغ اصلی (تومان)", type: "text", note: "قیمت به تومان" },
        { name: "مبلغ تخفیف", field: "discountAmount", labelInput: "مبلغ تخفیف (تومان)", type: "text", note: "قیمت به تومان" },
        { name: "کاور محصول", field: "coverImage", labelInput: "کاور محصول", type: "file", accept: "image/*", note: "مجاز: jpg, png (حداکثر 1 MB)" },
      ],
    },
  ];

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null); // برای رادیو دکمه‌ها

  // --- مدیریت ورودی‌ها ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputValues(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0] || null;
    setInputValues(prev => ({ ...prev, [field]: file }));
  };

  // مدیریت انتخاب دسته‌بندی اصلی (رادیو دکمه‌ها)
  const handleCategorySelect = (index) => {
    setSelectedCategoryIndex(index);
    // پاک کردن مقادیر فیلدهای قبلی هنگام تغییر دسته‌بندی
    const currentCategory = productCategoryGroups[index];
    const resetValues = {};
    currentCategory.fields.forEach(item => {
      resetValues[item.field] = item.type === 'file' ? null : '';
    });
    setInputValues(prev => ({ ...prev, ...resetValues }));
    setShowFileFields({}); // پاک کردن نمایش فیلدهای فعال قبلی
  };

  // مدیریت نمایش فیلدهای زیر چک‌باکس‌ها
  const handleToggleFieldVisibility = (field) => {
    setShowFileFields(prev => ({
      ...prev,
      [field]: !prev[field] // Toggle current visibility
    }));
  };

  // --- ارسال فرم ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage(""); // پاک کردن پیام قبلی

    const formData = new FormData();
    // اضافه کردن تمام مقادیر state به formData
    Object.entries(inputValues).forEach(([key, value]) => {
      if (value !== null && value !== "" && value !== undefined) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post(`${ServerURL()}musics`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitMessage(response.data.message || "عملیات با موفقیت انجام شد.");
      console.log("ارسال موفق:", response.data);
      resetForm(); // پاک کردن فرم پس از ارسال موفقیت آمیز
    } catch (error) {
      console.error("خطا در ارسال:", error);
      setSubmitMessage(error.response?.data?.message || "خطا در ارسال اطلاعات.");
    } finally {
      setLoading(false);
    }
  };

  // تابع برای پاک کردن فرم
  const resetForm = () => {
    setInputValues({
      user_id: tokenUserId,
      productName: "", productImage: null, createat: Time,
      type: ComponentType?.[0] || 'general',
      gammuisc: "", tempo: "", productDescription: "",
      demoMP3File: null, mainMP3File: null, tagMP3File: null, waveFile: null, projectFile: null, coverImage: null,
      primaryAmount: "", discountAmount: "",
    });
    setSelectedCategoryIndex(null);
    setShowFileFields({});
  };

  // --- کلاس‌های استایل و ریسپانسیو ---
  const baseWrapperClass = "min-h-screen w-full bg-zinc-900 py-6 px-3"; // پس‌زمینه کلی بدون گرادیان
  const formContainerClass = "flex flex-col max-w-3xl mx-auto p-5 sm:p-8 rounded-xl shadow-lg bg-zinc-900/70 backdrop-blur-md border border-zinc-700/40";
  const titleClass = "text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-4 sm:mb-6 text-center";
  const inputGroupClass = "flex flex-col mb-4";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";
  const inputFieldClass = "w-full px-3 py-2 border border-purple-600 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300";
  const fileInputClass = `${inputFieldClass} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-800 file:text-white file:cursor-pointer file:hover:bg-purple-700`;
  const textareaClass = `${inputFieldClass} h-32 resize-y`;
  const categoryRadioGroupClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6";
  const categoryLabelClass = "flex items-center cursor-pointer p-3 rounded-lg border border-purple-700/50 hover:bg-zinc-800 transition-all duration-300";
  const categoryInputClass = "h-5 w-5 text-purple-500 focus:ring-purple-400 mr-3";
  const categoryNameClass = "text-lg font-semibold text-white";
  const conditionalFieldsContainerClass = "mt-6 p-5 sm:p-6 border-t border-purple-700/30 bg-zinc-800/50 rounded-lg";
  const conditionalFieldLabelClass = "block text-md font-semibold text-purple-400 mb-3";
  const fieldItemWrapperClass = "grid grid-cols-[auto_1fr] items-start gap-x-3 sm:gap-x-4 mb-4";
  const fieldCheckboxClass = "h-4 w-4 text-purple-500 rounded focus:ring-purple-400 mt-1.5";
  const fieldLabelClass = "text-gray-300 font-medium";
  const specificFieldInputContainerClass = "col-span-2 ml-0 sm:ml-9 grid gap-y-2";
  const noteTextStyle = "text-xs text-blue-400 mt-1";
  const submitButtonClass = "w-full max-w-xs mx-auto py-3 px-6 bg-black border border-purple-700 text-white text-lg font-bold rounded-lg hover:bg-zinc-900 hover:border-purple-800 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500";
  const loadingSpinnerContainerClass = "flex items-center justify-center";
  const loadingSpinnerClass = "animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-400 mr-3";
  const messageTextStyle = "mt-4 text-center text-sm font-medium";

  return (
    <div dir="rtl" className={baseWrapperClass}>
      <div className={formContainerClass}>
        <h1 className={titleClass}>ثبت محصول جدید</h1>
        <h2 className="flex justify-end text-sm text-zinc-400 mb-4">{Time}</h2>

        <form onSubmit={handleSubmit} className="grid gap-y-4">
          {/* --- فیلدهای اصلی --- */}
          <div>
            {inputItems.map((item) => (
              <div key={item.field} className={inputGroupClass}>
                <label htmlFor={item.field} className={labelClass}>{item.label}</label>
                {item.type === "textarea" ? (
                  <textarea id={item.field} name={item.field} className={textareaClass} value={inputValues[item.field] || ""} onChange={handleInputChange} placeholder={item.placeholder} />
                ) : (
                  <input
                    id={item.field}
                    type={item.type}
                    name={item.field}
                    accept={item.accept}
                    className={item.type === "file" ? fileInputClass : inputFieldClass}
                    value={item.type === "file" ? "" : inputValues[item.field] || ""} // File inputs cannot have their value set directly
                    onChange={item.type === "file" ? (e) => handleFileChange(e, item.field) : handleInputChange}
                    placeholder={item.placeholder}
                  />
                )}
              </div>
            ))}
          </div>

          {/* --- دسته‌بندی‌های محصول (رادیو دکمه‌ها) --- */}
          <div className="mt-4">
            <p className={`${labelClass} text-lg mb-3`}>انتخاب دسته بندی:</p>
            <div className={categoryRadioGroupClass}>
              {productCategoryGroups.map((category, index) => (
                <label key={index} className={categoryLabelClass} htmlFor={`category-${index}`}>
                  <input
                    type="radio"
                    id={`category-${index}`}
                    name="productCategory"
                    className={categoryInputClass}
                    checked={selectedCategoryIndex === index}
                    onChange={() => handleCategorySelect(index)}
                  />
                  <span className={categoryNameClass}>{category.name}</span>
                </label>
              ))}
            </div>

            {/* --- فیلدهای شرطی بر اساس دسته بندی انتخاب شده --- */}
            {selectedCategoryIndex !== null && (
              <div className={conditionalFieldsContainerClass}>
                <h3 className={conditionalFieldLabelClass}>{productCategoryGroups[selectedCategoryIndex].name}</h3>
                <div>
                  {productCategoryGroups[selectedCategoryIndex].fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className={fieldItemWrapperClass}>
                      <input
                        type="checkbox"
                        id={`${field.field}-checkbox-${fieldIndex}`}
                        className={fieldCheckboxClass}
                        checked={showFileFields[field.field] || false}
                        onChange={() => handleToggleFieldVisibility(field.field)}
                      />
                      <label htmlFor={`${field.field}-checkbox-${fieldIndex}`} className={fieldLabelClass}>{field.name}</label>

                      {showFileFields[field.field] && (
                        <div className={specificFieldInputContainerClass}>
                          {field.type === 'file' ? (
                            <>
                              <label htmlFor={`${field.field}-file`} className={labelClass}>{field.labelInput}</label>
                              <input
                                id={`${field.field}-file`}
                                type="file"
                                accept={field.accept}
                                name={field.field}
                                className={fileInputClass}
                                onChange={(e) => handleFileChange(e, field.field)}
                              />
                              {field.note && <p className={noteTextStyle}>{field.note}</p>}
                            </>
                          ) : (
                            <>
                              <label htmlFor={field.field} className={labelClass}>{field.labelInput}</label>
                              <input
                                id={field.field}
                                type={field.type}
                                name={field.field}
                                className={inputFieldClass}
                                value={inputValues[field.field] || ""}
                                onChange={handleInputChange}
                                placeholder={field.labelInput}
                              />
                              {field.note && <p className={noteTextStyle}>{field.note}</p>}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* --- دکمه ارسال --- */}
          <div className="mt-6 flex justify-center">
            <button type="submit" className={submitButtonClass} disabled={loading}>
              {loading ? (
                <div className={loadingSpinnerContainerClass}>
                  <div className={loadingSpinnerClass}></div>
                  <p>در حال ارسال...</p>
                </div>
              ) : (
                "ارسال اطلاعات"
              )}
            </button>
          </div>

          {/* --- نمایش پیام وضعیت --- */}
          {submitMessage && (
            <p className={`${messageTextStyle} ${submitMessage.toLowerCase().includes("error") ? "text-red-400" : "text-green-400"}`}>
              {submitMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Pop;