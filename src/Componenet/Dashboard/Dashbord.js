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
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

const token = localStorage.getItem("authToken")
const tokenUserId = localStorage.getItem("userId")
  
async function getData() {
      
    
  await axios.get(`${ServerURL()}users/${tokenUserId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // ارسال توکن در هدر
    },
  })
  .then(response => {
    setUserInfo(response.data)
    setLoading(false)
  
  })
  .catch(error => {
    console.error("Error:", error.response ? error.response.data : error.message);
  });
  }

  useEffect( () => {
    if(!token){
      navigate('/login')
    }
getData()
  }, [navigate]);

  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return (
    <>
    {
      !true?
      <AdminDashbord/>
      :
    <>
      <div dir="rtl"  className="grid grid-flow-row-dense grid-cols-5 p-1  gap-10">
        <div className=" col-span-1">
        <Sidebar profilepic={userInfo.profile_path}username={userInfo.username} type={userInfo.seller === 0?true:false}/>
        
        </div>
        <div className="col-span-4 mt-14">
          <div className="grid grid-cols-2 flow-row ">
            <div className="">
            <Head type={userInfo.seller === 0?true:false}/>
        
            </div>
            <div className="">
            <Head type={userInfo.seller === 0?true:false}/>
            </div>
          </div>
            <div className="border-t-2 border-purple-600 rounded-lg mt-5">
            <Main/>
            </div>
          </div>
      </div>
    </>

    }

    </>
  );
};

export default Dashbord;
