import React, { useState } from "react";
import Chart from "./Chart";

const Head = ({type}) => {
  const [index, setIndex] = useState(0);
  const filterDate = ["هیپ هاپ", "الکترونیک", "پاپ", "راک", "رپ", "کلاسیک"];
  const typeUser=type
  const rawData = [
    { label: "فروردین", values: [74, 26, 47, 12, 69, 14] },
    { label: "اردیبهشت", values: [59, 74, 21, 33, 70, 25] },
    { label: "خرداد", values: [14, 16, 21, 41, 43, 36] },
    { label: "تیر", values: [55, 95, 11, 63, 70, 88] },
    { label: "مرداد", values: [100, 14, 75, 33, 70, 65] },
    { label: "شهریور", values: [150, 39, 63, 34, 40, 33] },
    { label: "مهر", values: [74, 26, 47, 12, 69, 14] },
    { label: "آبان", values: [49, 74, 21, 33, 70, 25] },
    { label: "آذر", values: [84, 16, 21, 41, 43, 36] },
    { label: "دی", values: [15, 95, 11, 63, 70, 88] },
    { label: "بهمن", values: [44, 14, 75, 33, 70, 65] },
    { label: "اسفند", values: [30, 39, 63, 34, 40, 33] },
  ];
  // console.log(sampleDate);
  const sampleData = rawData.map((item) => ({
    label: item.label,
    value: item.values[index],
    gender: filterDate[index],
  }));

  return (
    <>
      <div className="flex flex-row h-full p-2 gap-2">
        <Chart
          data={sampleData}
          index={index}
          setIndex={setIndex}
          filterDate={filterDate}
          typeUser={typeUser}
        />
      </div>
    </>
  );
};

export default Head;
