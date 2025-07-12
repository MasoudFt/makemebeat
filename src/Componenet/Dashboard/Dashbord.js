import React, { useEffect, useState } from "react";
import Sidebar from "./Sidbar";
import Head from "./Head";
import Main from "./Main/Main";
import axios from "axios";
import { useNavigate } from "react-router";
import AdminDashbord from "./AdminDashboard/AdminDashbord";
import ServerURL from "../API/ServerURL";


const Dashbord = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const tokenUserId = localStorage.getItem("userId");

  // بازیابی وضعیت ادمین از localStorage
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if(error){
      setInterval(() => {
        navigate("/SignUp");
      }, 5000);

    }
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
    const getData = async () => {
      try {
        // const response = await axios.get(`${ServerURL()}users/${tokenUserId}`, {
        const response = await axios.get(`http://localhost:3000/users/${tokenUserId}`, {
          // headers: {
          //   Authorization: `Bearer ${token}`, 
          // },
        });
        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        setError( error.response ? error.response.data : error.message)
        // console.log(error)
      }
    };
    getData();
  }, [navigate, token, tokenUserId,]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen ">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
      <p className="text-cyan-50 font-bold text-xl max-w-md text-center px-4">
        {error || 'در حال بارگذاری...'}
      </p>
    </div>
    
    );
  }

  return (
    <>
      {isAdmin ? (
        <AdminDashbord />
      ) : (
<div dir="rtl" className="grid grid-cols-1 md:grid-cols-5 gap-4">
  <div className="col-span-1 mb-4 md:mb-0">
    <Sidebar
      profilepic={userInfo?.profile_path}
      username={userInfo?.username}
      type={userInfo?.seller === 0}
    />
  </div>

  <div className="col-span-4 mt-4 md:mt-14 mb-5 min-h-screen">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div>
        <Head type={userInfo?.seller === 0} />
      </div>
      <div>
        <Head type={userInfo?.seller === 0} />
      </div>
    </div>

    <div className="border-t-2 border-purple-600 rounded-lg mt-6 md:mt-10 p-2">
      <Main />
    </div>
  </div>
</div>


      )}
    </>
  );
};

export default Dashbord;
