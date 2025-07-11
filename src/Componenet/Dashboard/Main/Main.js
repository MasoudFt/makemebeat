import React from 'react'
import { Routes, Route } from "react-router";
import FavList from './Component/FavoritList/FavoritList';
import CompletInformation from './Component/CompletInformation/CompletInformation';
import MyProductList from './Component/MyProductList/MyProductList';
import ComposeProduct from './Component/ComposeProduct/ComposeProduct';
import MyPurchase from './Component/MyPurchase/MyPurchase';
import CommentList from './Component/CommentList/CommentList';
import DownloadList from './Component/DownloadList/DownloadList';
import Wallet from './Component/Wallet/Wallet';
import Ticket from './Component/Ticket/Ticket';
const Main = () => {
const SideBarItem=[
  {title:"اطلاعات تکمیلی",Component:<CompletInformation/>,path:"/"},
  {title:"محصولات من",Component:<MyProductList/>,path:"MyProductList"},
  {title:"ثبت محصول",Component:<ComposeProduct/>,path:"ComposeProduct"},
  {title:"فروش های من",Component:<MyPurchase/>,path:"MyPurchase"},
  {title:"نظرات",Component:<CommentList/>,path:"CommentList"},
  {title:"دانلود ها",Component:<DownloadList/>,path:"DownloadList"},
  {title:"کیف پول",Component:<Wallet/>,path:"Wallet"},
  {title:"تیکت ها",Component:<Ticket/>,path:"Ticket"},
  {title:"لیست علاقه مندی ها",Component:<FavList/>,path:"FavList"},
  
]
  return (
    
   
    <Routes>
      {SideBarItem.map((item) => (
        <Route key={item.title} path={item.path} element={item.Component} />
      ))}
    </Routes>
 
  )
}

export default Main