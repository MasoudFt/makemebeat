import React from "react";
import SectionLeft from "./Items/SectionLeft";
import MainSection from "./Items/MainSection";
import { useSelector } from "react-redux";
import LikeGenere from "../MusicLikeGener/LikeGenere";

const Product = () => {
  const OneMusicInfo = useSelector((state) => state.MusicInfo);

  return (
    <div dir="rtl" className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 lg:p-16">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"> 

      {/* SectionLeft (Menu/Navigation Side) */}
      <aside className="md:col-span-3 w-full">
        <SectionLeft OneMusicInfo={OneMusicInfo} />
      </aside>

      {/* Main Content Area */}
     
      <main className="md:col-span-9 flex flex-col gap-4 md:gap-6"> 

        {/* MainSection (Primary Content) */}
        <section className="rounded-2xl bg-zinc-950 p-6 md:p-8 shadow-xl border border-zinc-700 transition-all duration-300 ease-in-out">
          {/* حذف h-fit و تنظیم padding بهتر */}
          <h2 className="text-3xl font-bold mb-6 text-gray-200 border-b-2 border-zinc-700 pb-4">اطلاعات آهنگ</h2>
          <MainSection OneMusicInfo={OneMusicInfo} />
        </section>

        {/* LikeGenere (Secondary Content/Recommendations) */}
        <section className="rounded-2xl bg-zinc-950 p-6 md:p-8 shadow-xl border border-zinc-700 transition-all duration-300 ease-in-out">
          <h2 className="text-3xl font-bold mb-6 text-gray-200 border-b-2 border-zinc-700 pb-4">موسیقی‌های مشابه مطابق سلیقه شما</h2>
          <LikeGenere OneMusicInfo={OneMusicInfo} />
        </section>

      </main>
    </div>

  
  </div>
  );
};

export default Product;