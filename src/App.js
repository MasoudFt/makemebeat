
import "./App.css";
import React, { useState, useEffect } from "react";
import About from "../src/Componenet/About/About";
import News from "../src/Componenet/News/News"
import Login from "../src/Componenet/Auth/Login/Login";
import SignUp from "../src/Componenet/Auth/SignUp/SignUp";
import HomePage from "./Componenet/HomePage/HomePage";
import Product from "./Componenet/Product/Product";
import VideoPlayer from "./Componenet/VideoPlayer/VideoPlayeNEwr";
import Card from "./Componenet/Card/Card";
import UpNav from "./Componenet/UpNav/UpNav";
import MusicPlayer from "./Componenet/MusicPlayer/MusicPlayer";
import Dashbord from "./Componenet/Dashboard/Dashbord";
import Rules from "./Componenet/UpNav/Comp/Rules";
import Tarafe from "./Componenet/UpNav/Comp/Tarafe";
import Course from "./Componenet/UpNav/Comp/Course";
import ScrollTop from "./Componenet/Comp/ScrollTop";
import OneUser from "./Componenet/Dashboard/AdminDashboard/Items/OneUserInfo/OneUser";
import Graphicplayer from "./Componenet/GraphicPlayer/Graphicplayer";
import Lottie from "react-lottie-player";
import AnimationLottie from "./AnimationLottie.json";
import { Routes, Route, useLocation, Navigate } from "react-router";
import { useSelector } from "react-redux";

function App() {
  const playMusic = useSelector((state) => state.playMusic);
  const urlMusicFile = useSelector((state) => state.urlMusicFile);
  const { cart }=useSelector((state)=>state.cartLit)
  const location = useLocation();
  const [alert, setAlert] = useState(false);
  const userNameToken = localStorage.getItem("userId")
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currentTime = new Date().getTime(); // محاسبه زمان فعلی
    const storedTime = localStorage.getItem('lastUpdatedTime');
    // اگر زمان ذخیره شده وجود داشته باشد
    if (storedTime) {
      const timeElapsed = currentTime - storedTime;
      console.log(timeElapsed);
      // اگر بیشتر از یک دقیقه گذشته باشد
      if (timeElapsed > 360000) { // 60000 میلی‌ثانیه برابر با یک دقیقه است
        localStorage.removeItem('cart');
        localStorage.removeItem('lastUpdatedTime');
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
      }
    }
    if (cart.length > 0) {
      localStorage.setItem('lastUpdatedTime', currentTime);
    }
  }, [userNameToken])
  return (
    <>
      {alert ? (
        <>
          <div
            className={`${
              location.pathname === "/login" || location.pathname === "/signup" ? "show" : ""
            }`}
          >
            <UpNav />
          </div>

          <div className="bg-zinc-950 ">
            <ScrollTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashbord/*" element={<Dashbord />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/tarafe" element={<Tarafe />} />
              <Route path="/Card" element={<Card />} />
              <Route path="/course" element={<Course />} />
              <Route path="/dashbord/OneUser/:id" element={<OneUser />} />
              <Route path="/VideoPlayer/:id" element={<VideoPlayer />} />
              <Route path="/Graphicplayer/:id" element={<Graphicplayer />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="/news" element={<News />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <div>{playMusic ? <MusicPlayer infoOneMusic={urlMusicFile} /> : null}</div>
        </>
      ) : (
        <div className="bg-black h-screen text-cyan-50">
          <Lottie
            animationData={AnimationLottie}
            play={true}
            loop={true}
            speed={1.5}
            style={{ height: "550px", backgroundColor: "black", color: "white" }}
          />
          MakeMeBeat...
        </div>
      )}
    </>
  );
}

export default App;
