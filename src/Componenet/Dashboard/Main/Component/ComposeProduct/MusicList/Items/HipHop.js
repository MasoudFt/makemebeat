import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HipHop = ({ Component }) => {
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();
  const d = new Date();
  const Time = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "full",
    // timeStyle: "short",
  }).format(d);
  const ComponentType = Component;

  const [selectCheckbox, setSelectCheckbox] = useState(0);
  const [checkboxShowTanzim, setCheckboxShowTanzim] = useState([]);

  const [Loading, setLoading] = useState(false);
  const selectGener = [
    "رپ",
    "ترپ",
    "دریل",
    "آراندبی",
    "اولد اسکول",
    "دیگر ...",
  ];
  const inputCheckBoxItem = [
    {
      name: "رپ",
      item: [
        {
          name: "mp3 با تگ دارد.",
          field: "mainMP3File",
          labelInput: "mp3 با تگ .",
          type: "file",
          accept: ".mp3",
        },
        {
          name: "wave  دارد.",
          field: "waveFile",
          labelInput: "wave .",
          type: "file",
          accept: ".wav",
        },
        {
          name: "پروژه (لاین به لاین) دارد.",
          field: "projectFile",
          labelInput: "(لاین به لاین)",
          type: "file",
        },
        {
          name: "مبلغ اصلی",
          field: "primaryAmount",
          labelInput: "مبلغ اصلی",
          type: "text",
        },
        {
          name: "مبلغ تخفیف",
          field: "discountAmount",
          labelInput: "مبلغ تخفیف",
          type: "text",
        },
      ],
    },
    {
      name: "ترپ",
      item: [
        {
          name: "mp3 با تگ دارد.",
          field: "mainMP3File",
          labelInput: "mp3 با تگ .",
          type: "file",
          accept: ".mp3",
        },
        {
          name: "wave  دارد.",
          field: "waveFile",
          labelInput: "wave .",
          type: "file",
          accept: ".wav",
        },
        {
          name: "پروژه (لاین به لاین) دارد.",
          field: "projectFile",
          labelInput: "(لاین به لاین)",
          type: "file",
        },
        {
          name: "مبلغ اصلی",
          field: "primaryAmount",
          labelInput: "مبلغ اصلی",
          type: "text",
        },
        {
          name: "مبلغ تخفیف",
          field: "discountAmount",
          labelInput: "مبلغ تخفیف",
          type: "text",
        },
      ],
    },
    {
      name: "دریل",
      item: [
        {
          name: "mp3 با تگ دارد.",
          field: "mainMP3File",
          labelInput: "mp3 با تگ .",
          type: "file",
          accept: ".mp3",
        },
        {
          name: "wave  دارد.",
          field: "waveFile",
          labelInput: "wave .",
          type: "file",
          accept: ".wav",
        },
        {
          name: "پروژه (لاین به لاین) دارد.",
          field: "projectFile",
          labelInput: "(لاین به لاین)",
          type: "file",
        },
        {
          name: "مبلغ اصلی",
          field: "primaryAmount",
          labelInput: "مبلغ اصلی",
          type: "text",
        },
        {
          name: "مبلغ تخفیف",
          field: "discountAmount",
          labelInput: "مبلغ تخفیف",
          type: "text",
        },
      ],
    },
    {
      name: "آراندبی",
      item: [
        {
          name: "mp3 با تگ دارد.",
          field: "mainMP3File",
          labelInput: "mp3 با تگ .",
          type: "file",
          accept: ".mp3",
        },
        {
          name: "wave  دارد.",
          field: "waveFile",
          labelInput: "wave .",
          type: "file",
          accept: ".wav",
        },
        {
          name: "پروژه (لاین به لاین) دارد.",
          field: "projectFile",
          labelInput: "(لاین به لاین)",
          type: "file",
        },
        {
          name: "مبلغ اصلی",
          field: "primaryAmount",
          labelInput: "مبلغ اصلی",
          type: "text",
        },
        {
          name: "مبلغ تخفیف",
          field: "discountAmount",
          labelInput: "مبلغ تخفیف",
          type: "text",
        },
      ],
    },
    {
      name: "اولد اسکول",
      item: [
        {
          name: "mp3 با تگ دارد.",
          field: "mainMP3File",
          labelInput: "mp3 با تگ .",
          type: "file",
          accept: ".mp3",
        },
        {
          name: "wave  دارد.",
          field: "waveFile",
          labelInput: "wave .",
          type: "file",
          accept: ".wav",
        },
        {
          name: "پروژه (لاین به لاین) دارد.",
          field: "projectFile",
          labelInput: "(لاین به لاین)",
          type: "file",
        },
        {
          name: "مبلغ اصلی",
          field: "primaryAmount",
          labelInput: "مبلغ اصلی",
          type: "text",
        },
        {
          name: "مبلغ تخفیف",
          field: "discountAmount",
          labelInput: "مبلغ تخفیف",
          type: "text",
        },
      ],
    },
    {
      name: "دیگر ...",
      item: [
        {
          name: "mp3 با تگ دارد.",
          field: "mainMP3File",
          labelInput: "mp3 با تگ .",
          type: "file",
          accept: ".mp3",
        },
        {
          name: "wave  دارد.",
          field: "waveFile",
          labelInput: "wave .",
          type: "file",
          accept: ".wav",
        },
        {
          name: "پروژه (لاین به لاین) دارد.",
          field: "projectFile",
          labelInput: "(لاین به لاین)",
          type: "file",
        },
        {
          name: "مبلغ اصلی",
          field: "primaryAmount",
          labelInput: "مبلغ اصلی",
          type: "text",
        },
        {
          name: "مبلغ تخفیف",
          field: "discountAmount",
          labelInput: "مبلغ تخفیف",
          type: "text",
        },
      ],
    },
  ];
  const tokenUserId = localStorage.getItem("userId");
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
    type: ComponentType[0],
    gener: selectGener[selectCheckbox],
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
    otherStyle: "", // برای ذخیره سبک دیگر
  });
  console.log(inputValues);
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

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    // Append inputValues keys (including files)
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
      setLoading(true);
      // Reset input values to their initial state
      setInputValues({
        user_id: userId.userId,
        productName: "",
        productImage: null,
        createat: Time,
        view: "",
        likeproduct: "",
        post_id: "",
        sheroMelody: 0,
        tanzim: 0,
        sampleproduct: 0,
        type: ComponentType[0],
        gener: selectCheckbox,
        gammuisc: "",
        tempo: "",
        productDescription: "",
        demoMP3File: null,
        mainMP3File: null,
        tagMP3: null,
        waveFile: null,
        projectFile: null,
        coverImage: null,
        primaryAmount: "",
        discountAmount: "",
        otherStyle: "",
      });

      // Redirect to another page after 5 seconds
      setTimeout(() => {
        // Replace with your desired route
        navigate("/dashbord/MyProductList");
      }, 5000);

     
    } catch (error) {
      console.error("Error uploading music:", error);
      setFormData({ ...formData, message: "Error uploading music" });
    } finally {
      setLoading(false);
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
  const inputItems = [
    { label: "عنوان محصول", field: "productName", type: "text" },
    {
      label: "عکس محصول",
      field: "productImage",
      type: "file",
      accept: "image/*",
    },
    { label: "توضیحات محصول", field: "productDescription", type: "textarea" },
    { label: "گام", field: "gammuisc", type: "text" },
    { label: "تمپو", field: "tempo", type: "text" },
  ];

  const handleFileChange = (e, field) => {
    setInputValues({ ...inputValues, [field]: e.target.files[0] });
  };
  const handleCheckboxToggle = (index) => {
    const updatedCheckboxes = checkboxShowTanzim.map((item, i) =>
      i === index ? !item : item
    );
    setCheckboxShowTanzim(updatedCheckboxes);
  };
  const handleSelectCheckbox = (index) => {
    setSelectCheckbox(index);

    // Reset the values in inputValues for the file and text inputs associated with the newly selected checkbox group
    const items = inputCheckBoxItem[index]?.item || [];
    const resetValues = {};
    items.forEach((item) => {
      resetValues[item.field] = item.type === "file" ? null : "";
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

    // Update the gener value based on selected checkbox (0 corresponds to "رپ")
    const selectedGener = selectGener[index]; // Get the corresponding genre
    setInputValues((prev) => ({
      ...prev,
      ...resetValues,
      ...groupUpdate,
      gener: selectedGener, // Set gener dynamically
    }));

    setCheckboxShowTanzim(Array(items.length).fill(false)); // Reset checkboxShowTanzim
  };
  const ButtonClassName =
    "bg-black border border-purple-600 text-white text-base font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  return (
    <>
      <div
        dir="rtl"
        className="bg-zinc-950 text-white p-5 rounded-lg shadow-md shadow-zinc-200"
      >
        <form onSubmit={handleSubmit2} className="grid gap-2">
          <h2 className="flex place-content-end text-base mb-4 text-zinc-300">
            {" "}
            {Time}
          </h2>
          {/* Input fields */}
          <div>
            {inputItems.map((a, b) => (
              <div key={b} className="flex flex-col mb-4">
                <label className="mb-2">{a.label}</label>
                {a.type === "textarea" ? (
                  <textarea
                    className="rounded-lg border border-purple-500 bg-transparent text-white p-2"
                    name={a.field}
                    value={inputValues[a.field]}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    className="rounded-lg border border-purple-500 bg-transparent text-white p-2"
                    type={a.type}
                    name={a.field}
                    accept={a.accept} // Use the `accept` property here
                    onChange={
                      a.type === "file"
                        ? (e) => handleFileChange(e, a.field)
                        : handleInputChange
                    }
                  />
                )}
              </div>
            ))}
          </div>

          {/* Checkboxes section */}
          <div className="text-white">
            <div className="flex justify-between p-1 m-1">
              {inputCheckBoxItem.map((group, idx) => (
                <div className="flex items-center mb-2" key={idx}>
                  <input
                    type="radio" // Changed to radio
                    name="checkboxGroup"
                    className="text-purple-600 rounded-full"
                    checked={selectCheckbox === idx}
                    onChange={() => handleSelectCheckbox(idx)} // Changed to handleSelectCheckbox
                  />
                  <label className="ml-2">{group.name}</label>
                </div>
              ))}
            </div>

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
                        <label className="mb-1 text-purple-400">
                          {item.labelInput}
                        </label>
                        <input
                          className="rounded-lg border border-purple-500 bg-gray-800 text-white p-2"
                          type={item.type}
                          name={item.field}
                          accept={item.accept}
                          onChange={
                            item.type === "file"
                              ? (e) => handleFileChange(e, item.field)
                              : handleInputChange
                          }
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Submit button */}
          </div>
          <div className="flex justify-center p-1 mt-5">
            <button
              type="submit"
              className={ButtonClassName}
              disabled={Loading}
            >
              {Loading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
                  در حال ارسال
                </div>
              ) : formData.message === "Music uploaded successfully" ? (
                "با موفقیت آپلود شد" // تغییر به یک رشته
              ) : formData.message === "Error uploading music" ? (
                "خطا در آپلود"
              ) : (
                "ارسال"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HipHop;
