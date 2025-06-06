
import React, { useState } from 'react';

const VideoListCompos = ({ inputValues, setInputValues }) => {
  const [checkboxShowTanzim, setCheckboxShowTanzim] = useState({});

  const handleCheckboxToggle = (index) => {
    setCheckboxShowTanzim(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0] || null;
    setInputValues(prev => ({ ...prev, [field]: file }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const inputCheckBoxItem = [
    {
      name: 'کارگردان',
      item: [
        { name: 'کارگردان تعداد', field: 'director', type: 'number', min: 0 },
        { name: 'نام کارگردان ها', field: 'nameSdirector', type: 'text' },
      ],
    },
    {
      name: 'بازیگر',
      item: [
        { name: 'بازیگر تعداد', field: 'actor', type: 'number', min: 0 },
        { name: 'نام بازیگر ها', field: 'nameSactor', type: 'text' },
      ],
    },
    {
      name: 'نویسنده سناریو',
      item: [
        { name: 'نویسنده سناریو تعداد', field: 'senarioWriter', type: 'number', min: 0 },
        { name: 'نام نویسنده سناریو ها', field: 'nameSsenarioWriter', type: 'text' },
      ],
    },
    {
      name: 'مدیر تولید',
      item: [
        { name: 'مدیر تولید تعداد', field: 'productionManager', type: 'number', min: 0 },
        { name: 'نام مدیر تولید ها', field: 'nameSproductionManager', type: 'text' },
      ],
    },
    {
      name: 'فیلم بردار',
      item: [
        { name: 'فیلم بردار تعداد', field: 'cinematographer', type: 'number', min: 0 },
        { name: 'نام فیلم بردار ها', field: 'nameScinematographer', type: 'text' },
      ],
    },
    {
      name: 'نورپرداز',
      item: [
        { name: 'نورپرداز تعداد', field: 'lightingDesigner', type: 'number', min: 0 },
        { name: 'نام نورپرداز ها', field: 'nameSlightingDesigner', type: 'text' },
      ],
    },
    {
      name: 'گریمور',
      item: [
        { name: 'گریمور تعداد', field: 'makeUpArtist', type: 'number', min: 0 },
        { name: 'نام گریمور ها', field: 'nameSmakeUpArtist', type: 'text' },
      ],
    },
    {
      name: 'طراح صحنه',
      item: [
        { name: 'طراح صحنه تعداد', field: 'setPlace', type: 'number', min: 0 },
        { name: 'نام طراح صحنه ها', field: 'nameSsetPlace', type: 'text' },
      ],
    },
    {
      name: 'طراح لباس',
      item: [
        { name: 'طراح لباس تعداد', field: 'fieldSpesialEffectDesigner', type: 'number', min: 0 },
        { name: 'نام طراح لباس ها', field: 'nameSfieldSpesialEffectDesigner', type: 'text' },
      ],
    },
    {
      name: 'طراح جلوه های ویژه میدانی',
      item: [
        { name: 'طراح جلوه های ویژه میدانی تعداد', field: 'costumeDesigner', type: 'number', min: 0 },
        { name: 'اسامی', field: 'nameScostumeDesigner', type: 'text' },
      ],
    },
    {
      name: 'طراح جلوه های ویژه کامپیوتری (visual effects)',
      item: [
        { name: 'طراح جلوه های ویژه کامپیوتری (visual effects) تعداد', field: 'visualEffectDseigner', type: 'number', min: 0 },
        { name: 'اسامی', field: 'nameSvisualEffectDseigner', type: 'text' },
      ],
    },
    {
      name: 'ادیتور',
      item: [
        { name: 'ادیتور تعداد', field: 'edit', type: 'number', min: 0 },
        { name: 'نام ادیتور ها', field: 'nameSedit', type: 'text' },
      ],
    },
    {
      name: 'دیگر عوامل ...',
      item: [
        { name: 'دیگر عوامل تعداد', field: 'otherFactor', type: 'number', min: 0 },
        { name: 'نام دیگر عوامل', field: 'nameSotherFactor', type: 'text' },
      ],
    },
    {
      name: "دوربین ",
      item: [
        { name: 'تعداد دوربین ', field: 'cameraCount', type: 'number', min: 0 },
        { name: 'مدل  دوربین ', field: 'cameraModel', type: 'text' },
      ],
    },
    {
      name: "نورپردازی  ",
      item: [
        { name: 'تعداد نورپردازی  ', field: 'lightingCount', type: 'number', min: 0 },
        { name: 'مدل  نورپردازی  ', field: 'lightingModel', type: 'text' },
      ],
    },
    {
      name: "تجهیزات حرکتی ",
      item: [
        { name: 'کرین | cranes', field: 'moveMentEquipmentCranes', type: 'checkbox' },
        { name: 'هلی شات ', field: 'moveMentEquipmentHelishot', type: 'checkbox' },
        { name: 'رونین | Rōnin ', field: 'moveMentEquipmentRonin', type: 'checkbox' },
        { name: 'ریل ', field: 'moveMentEquipmentRail', type: 'checkbox' },
      ],
    },
    {
      name: "دیگر تجهیزات ",
      item: [
        { name: 'دیگر تجهیزات  ', field: 'otherEquipment', type: 'text', min: 0 },
      ],
    },
    {
      name: "قیمت اصلی",
      item: [
        { name: 'قیمت اصلی ', field: 'orginalPrice', type: 'number', min: 0 },
      ],
    },
    {
      name: "قیمت با تخفیف",
      item: [
        { name: 'قیمت با تخفیف ', field: 'discountPrice', type: 'number', min: 0 },
      ],
    },
  ];

  return (
    <div className='p-2 gap-4 text-white'>
      {inputCheckBoxItem.map((group, groupIndex) => (
        <div className='p-2 gap-4' key={groupIndex}>
          <input 
            onChange={() => handleCheckboxToggle(groupIndex)} 
            className="text-purple-600 p-2 rounded-full m-2" 
            type="checkbox" 
          />
          <label>{group.name}</label>
          <div className='gap-2 p-2'>
            {checkboxShowTanzim[groupIndex] && (
              <div>
                {group.item.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <label className='text-slate-300 m-2 py-2'>{item.name}</label>
                    <input
                      type={item.type}
                      name={item.field}
                      className={item.type === "checkbox" ? 
                        "rounded-full bg-white text-purple-500 p-2" :
                        "rounded-lg border border-purple-500 bg-transparent w-full text-white p-2"
                      }
                      min={item.min}
                      value={inputValues[item.field] || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      <label>بخش آپلود فایل موزیک ویدئو</label>
      <input 
        className="text-purple-600 p-2 rounded-full" 
        type="file" 
        accept="video/*" 
        onChange={(e) => handleFileChange(e, 'demoVideofile')} 
      />
    </div>
  );
};
export default VideoListCompos