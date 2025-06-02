import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const Chart = ({ data, filterDate, setIndex, index,typeUser }) => {
  const [chartData, setChartData] = useState([]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const maxValue = Math.max(...data.map((item) => item.value), 1);

  const [DateFilter, SetDateFilter] = useState(0);

  const filterdate = [0, 6, 12];

  const detaHandel = () => {
    if (DateFilter < 1) {
      SetDateFilter(1);
    } else {
      SetDateFilter(0);
    }
  };

  const ButtonClassName = " bg-purple-700 rounded-full cursor-pointer ";

  const HandelButtontitleChart = () => {
    if (index < filterDate.length - 1) {
      setIndex((e) => e + 1);
    } else {
      setIndex(0);
    }
  };

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const color = [
    "bg-blue-500",
    "bg-zinc-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-blue-400",
    "bg-zinc-700",
    "bg-green-800",
    "bg-yellow-300",
    "bg-red-400",
    "bg-purple-600",
  ];

  return (
    <div className="p-2 bg-black shadow-md w-full shadow-amber-300 rounded-lg ">
      <div className="flex justify-between">
        <MdKeyboardArrowRight
          onClick={HandelButtontitleChart}
          className={ButtonClassName}
        />
        <h2 className="text-xs font-semibold mb-4 text-gray-200 ">
          نمودار 
          <span className={`${typeUser?"text-green-600":"text-red-600 "} mr-1 ml-1`}>
          {typeUser?"خرید":"فروش"} 
            </span>
            ({data[0]?.gender})
        </h2>
        <MdKeyboardArrowLeft
          onClick={HandelButtontitleChart}
          className={ButtonClassName}
        />

        <MdKeyboardArrowRight
          onClick={detaHandel}
          className={ButtonClassName}
        />
        <h2 className="text-xs font-semibold text-gray-200  text-center">
          {DateFilter < 1 ? "6ماه اول" : "6 ماه دوم"}
        </h2>
        <MdKeyboardArrowLeft onClick={detaHandel} className={ButtonClassName} />

        {/* <span className="text-base  text-zinc-400">{maxValue}</span> */}
      </div>
      <div className="flex items-end h-full  ">
        {data
          .slice(filterdate[0 + DateFilter], filterdate[1 + DateFilter])
          .map((item, index) => (
            <div
              key={index}
              className="flex w-6 flex-col items-center mx-2 flex-1 relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`w-10 ${
                  color[index]
                } rounded-t transition-all duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-90"
                }`}
                style={{
                  height: `${(item.value / maxValue) * 100}px`,
                  minHeight: "2px",
                }}
              ></div>
              <span className="text-xs font-semibold m-1 text-zinc-200">
                {item.label}
              </span>
              {hoveredIndex === index && (
                <div className="absolute -top-10 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  <div className="font-bold">
                    {item.label}: {item.value}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
      {/* <div dir="ltr" className="flex justify-between mb-5 text-base  text-zinc-400">
        <span>0</span>
      </div> */}
    </div>
  );
};
export default Chart;
