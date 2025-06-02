import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const OneUser = ({infoUser}) => {





  const location=useLocation()
  const str = location.pathname;
const result = str.replace(/.*\/(\d+)$/, '$1');


const getUserListFromDb=async()=>{
  try {
    const url=`http://localhost:3000/users/${result}`
    const res=await axios.get(url)
    console.log(res)
    setUserList(res.data)
  } catch (error) {
    console.log(error)
  }

}

useEffect(() => {
  getUserListFromDb();
}, [])
  return (
    <div
    dir="rtl"
    className="mt-14 h-screen text-white"
    >OneUser</div>
  )
}

export default OneUser