import React, { useState,useEffect } from 'react'
import axios from "axios";
import VideoShow from './VideoShow';
const VideoUserListShow = () => {
    const [userList, setUserList] = useState([]);
    const [selectVideoUser, setSelectVideoUser] = useState('');
    const [showSelectVideoUser, setShowSelectVideoUser] = useState(false);
    const [error, setError] = useState("");
    const post_id=userList[selectVideoUser].post_id
    console.log(post_id)
    const GetDataFromDb = async (tokenUserId, number) => {
      try {
        const url = `http://localhost:3000/video/joinUser`;
        const res = await axios.get(url);
        setUserList(res.data);
        
        console.log(res.data);
        
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data);
      }
    };
    const ConfirmVideo = async () => {
      try {
        // const url = `http://localhost:3000/videoConfirmAdmin/${post_id}`;
        const url = `http://localhost:3000/videoConfirmAdmin/${""}`;
        const res = await axios.put(url);
        console.log(res.data);
        setError(res.data);
        
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data);
      }
    };
  const HandleErroButtonConfirm=()=>{
    alert("قبلا تایید شده");
  }
  
    useEffect(() => {
      GetDataFromDb();
    }, []);
  
    const colItems = [
      { name: "ردیف" },
      { name: "نام کاربر" },
      { name: "شماره موبایل" },
      { name: "تاریخ بارگذاری" },
      { name: "آیدی پست" },
      { name: "وضعیت تایید" },
      { name: "نوع ویدیو" },
      { name: "قیمت اصلی" },
      { name: "قیمت با تخفیف" },
      { name: "نمایش پست" },
      { name: "تایید برای نمایش " },
    ];
  return (
    <div>
         <div>
        <div className="grid-rows-2 rounded-lg font-bold text-white h-full text-xl p-2">
          <div className="grid grid-cols-11 border border-zinc-950 py-2 border-b-neutral-800 h-fit gap-2 text-center p-1 text-xs text-slate-300 ">
            {colItems.map((a, i) => (
              <div className="" key={i}>
                <div>{a.name}</div>
              </div>
            ))}
          </div>
        </div>
            <div
            className="grid-rows-2 rounded-lg font-bold text-white h-full text-xl p-2"
            >
                {userList.map((a,b)=>(
                    <div
                    className="grid grid-cols-11 border  border-zinc-950 py-2 border-b-neutral-800 h-fit gap-2 text-center p-1 text-xs text-slate-300 "
                     key={a.post_id}>
                        <div>{b+1}</div>
                        <div>{a.username}</div>
                        <div className="text-lime-600">{a.mobilePhone}</div>
                        <div>{a.createat}</div>
                        <div>{a.post_id}</div>
                        <div
                        className={a.isShow === 0?"text-red-600 ":"text-green-600"}
                        >{a.isShow === 0?"تایید نشده" :"تایید شده"}</div>
                        <div className="text-blue-600">{a.type}</div>
                        <div className="text-yellow-600">{parseFloat(a.orginalPrice).toLocaleString()}</div>
                        <div className="text-yellow-800">{parseFloat(a.discountPrice).toLocaleString()}</div>
                        <button
                        className="w-16  h-8 bg-black rounded-xl border border-purple-600"
                         onClick={()=>{ {setSelectVideoUser(b)
                          ;
                          showSelectVideoUser?setShowSelectVideoUser(false):setShowSelectVideoUser(true)}}} 
                        >
                          {showSelectVideoUser?"عدم نمایش":"نمایش"}
                        </button>
                        <button onClick={()=>{a.isShow === 0?ConfirmVideo():HandleErroButtonConfirm()}} 
                        className={`w-20 h-8  rounded-xl border border-purple-600 ${a.isShow === 0?"bg-black":"opacity-25 cursor-not-allowed"}`}>{"تایید نمایش"}</button>
                    </div>
                ))

                }
            </div>
      </div>
        {
          !showSelectVideoUser?
          <VideoShow/>
          :
          null
        }
        <div
        className="text-white text-lg font-bold p-1"
        >
        {error}

        </div>
    </div>
  )
}

export default VideoUserListShow