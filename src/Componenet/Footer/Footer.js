import React from 'react'
import { IoLogoInstagram } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-black w-full text-white py-8 px-4 hover:opacity-100 rounded-lg opacity-35 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <img src={"12-1024x745-1-5.png"} className="h-24 w-24 items-center p-2 place-content-center"/>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent mb-4">
              میک‌می‌بیت
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              میک‌می‌بیت این امکان را به شما خوانندگان عزیز می‌دهد که از ۰ تا ۱۰۰ تولید محتوا خود را به صورت آنلاین با پشتیبانی قوی و با قیمت مناسب‌تر نسبت به همکاران انجام دهید. همچنین هنرمندانی که خود خالق آثار هنری و تولیدات مربوط به حوزه موسیقی هستند می‌توانند به صورت آنلاین در صفحه خود در وبسایت میک‌می‌بیت محصولاتشان را به فروش بگذارند.
            </p>
          </div>
          
          {/* لینک‌های سریع */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-purple-300 transition">صفحه اصلی</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-300 transition">خدمات ما</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-300 transition">فروشگاه هنرمندان</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-300 transition">تماس با ما</a></li>
            </ul>
          </div>
          
          {/* شبکه‌های اجتماعی */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">ما را دنبال کنید</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-purple-600 hover:bg-purple-700 w-10 h-10 rounded-full flex items-center justify-center transition">
                <i className="fab fa-instagram text-white"><IoLogoInstagram size={25}/></i>
              </a>
              <a href="#" className="bg-purple-600 hover:bg-purple-700 w-10 h-10 rounded-full flex items-center justify-center transition">
                <i className="fab fa-telegram text-white"><FaTelegram size={25}/></i>
              </a>
              <a href="#" className="bg-purple-600 hover:bg-purple-700 w-10 h-10 rounded-full flex items-center justify-center transition">
                <i className="fab fa-twitter text-white"><IoLogoWhatsapp size={25}/></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* کپی‌رایت */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} میک‌می‌بیت. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
