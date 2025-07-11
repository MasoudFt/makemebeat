import React, { useState } from "react";
import Classic from "./Items/Classic";
import Electronic from "./Items/Electronic";
import MixMaster from "./Items/MixMaster";
import Pop from "./Items/Pop";
import Rock from "./Items/Rock";
import HipHop from "./Items/HipHop";

const MusicList = () => {
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
    newCheckState[name] = true;
    setItemCheck(newCheckState);
  };

  const checkedItems = Object.entries(itemCheck)
    .filter(([key, value]) => value)
    .map(([key]) => key);

  const itemProduct = [
    { name: "پاپ", key: "pop" },
    { name: "هیپ هاپ", key: "hiphop" },
    { name: "الکترونیک", key: "elec" },
    { name: "راک", key: "rock" },
    { name: "کلاسیک", key: "classic" },
    { name: "میکس مستر", key: "mixmaster" },
  ];

  return (
    <>
      <div dir="rtl" className="w-full overflow-x-auto">
        <div className="flex flex-wrap justify-center md:justify-between gap-2 p-2 text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl">
          {itemProduct.map((item) => (
            <div
              key={item.key}
              className="flex items-center whitespace-nowrap px-2 py-1"
            >
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-purple-600 rounded transition duration-150 ease-in-out"
                  name={item.key}
                  checked={itemCheck[item.key]}
                  onChange={() => handleCheckboxChange(item.key)}
                />
                <span className="mr-2">{item.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {itemCheck.pop && <Pop Component={checkedItems} />}
        {itemCheck.hiphop && <HipHop Component={checkedItems} />}
        {itemCheck.elec && <Electronic Component={checkedItems} />}
        {itemCheck.rock && <Rock Component={checkedItems} />}
        {itemCheck.classic && <Classic Component={checkedItems} />}
        {itemCheck.mixmaster && <MixMaster Component={checkedItems} />}
      </div>
    </>
  );
};

export default MusicList;
