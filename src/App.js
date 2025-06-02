
import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "../src/Componenet/Navbar/Navbar";
import About from "../src/Componenet/About/About";
import Contact from "../src/Componenet/Contact/Contact";
import Login from "../src/Componenet/Auth/Login/Login";
import SignUp from "../src/Componenet/Auth/SignUp/SignUp";
import HomePage from "./Componenet/HomePage/HomePage";
import Product from "./Componenet/Product/Product";
import Test from "./Componenet/Test/Test";
import VideoPlayer from "./Componenet/Test/VideoPlayeNEwr";
import VideoUpload from "./Componenet/Test/VideoPost";
import Card from "./Componenet/Card/Card";
import UpNav from "./Componenet/UpNav/UpNav";
import Input from "./Componenet/Navbar/Input";
import Slider from "./Componenet/Comp/Slider";
import MusicPlayer from "./Componenet/MusicPlayer/MusicPlayer";
import Cart from "./Componenet/Comp/Cart";
import Dashbord from "./Componenet/Dashboard/Dashbord";
import Rules from "./Componenet/UpNav/Comp/Rules";
import Tarafe from "./Componenet/UpNav/Comp/Tarafe";
import Course from "./Componenet/UpNav/Comp/Course";
import ScrollTop from "./Componenet/Comp/ScrollTop";
import OneUser from "./Componenet/Dashboard/AdminDashboard/Items/OneUser";
import Ticket from "./Componenet/Dashboard/Main/Component/Ticket/Ticket";
import Lottie from "react-lottie-player";
import AnimationLottie from "./AnimationLottie.json";
import { Routes, Route, useLocation, Navigate } from "react-router";
import { useSelector,useDispatch } from "react-redux";

function App() {
  const auth = useSelector((state) => state.user);
  const playMusic = useSelector((state) => state.playMusic);
  const urlMusicFile = useSelector((state) => state.urlMusicFile);
  const { cart }=useSelector((state)=>state.cartLit)
  const location = useLocation();
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
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
          <div
            className={`${
              location.pathname.startsWith("/dashbord") ? "hidden" : ""
            }`}
          >
            <Navbar />
          </div>

          <div className="bg-zinc-950 ">
            <ScrollTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/musicPlayer" element={<MusicPlayer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/test" element={<Test />} />
              <Route path="/dashbord/*" element={<Dashbord />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/tarafe" element={<Tarafe />} />
              <Route path="/Card" element={<Card />} />
              <Route path="/course" element={<Course />} />
              <Route path="/dashbord/OneUser/:id" element={<OneUser />} />
              <Route path="/VideoPlayer" element={<VideoPlayer />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/slider" element={<Slider />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <div>{playMusic ? <Test infoOneMusic={urlMusicFile} /> : null}</div>
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
