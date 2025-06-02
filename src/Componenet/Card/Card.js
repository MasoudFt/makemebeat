import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { removeFromCart } from '../StateManagement/Action';
import { useNavigate } from 'react-router-dom';
import { Alert, Stack } from '@mui/material';

const Card = () => {
const { cart, alert }=useSelector((state)=>state.cartLit)
const userCartList = localStorage.getItem("cart")
const imageUrl=`http://localhost:3000/`;
const dispatch = useDispatch();
const navigate=useNavigate();

  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    dispatch(removeFromCart(newCart));
  };

  
  const totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.orginalPriceTanzim-item.discountPriceTanzim) || 0,
    0
  );
useEffect(() => {
  if(!cart.length||!userCartList){
    navigate("/")
  }
}, [cart,userCartList])

  return (
<div className="min-h-screen bg-zinc-950 p-6 mt-28">
  <h1 className="text-3xl text-white font-bold mb-6 text-center">سبد خرید</h1>
     {alert && (
           <Stack dir="rtl" sx={{ width: "100%" }} spacing={2}>
             <Alert style={{color:'black',fontSize:"large",fontWeight:"bold",padding:"1%"}} severity="error">{alert}</Alert>
           </Stack>
         )}
  <div dir="rtl" className="flex flex-col gap-3">
    <div className="flex-1 bg-zinc-900 rounded-lg shadow p-4">
      <div className='flex text-center text-white font-semibold justify-around gap-2 mb-3 border-b pb-2'>
        <div className='w-fit'>ردیف</div>
        <div className='w-14'>کاور محصول</div>
        <div className='w-16'>نام هنرمند</div>
        <div className='w-20'>نام محصول</div>
        <div className='w-36'>قیمت تمام شده</div>
        <div>ویرایش</div>
      </div>
      {cart.map((product, index) => (
        <div key={product.post_id}
          className="flex text-center justify-around  gap-2 mb-3 border-b pb-2 items-center" 
          style={{ minHeight: '60px' }} 
        >
          <p className="font-xs p-1 text-white">{index + 1}</p>
          <img src={imageUrl + product.file_path.replace(/\\/g, "/")} className='h-14 w-14 rounded-lg' />
          <p className="font-xs p-1 w-16 text-white">{product.artistName}</p>
          <p className="font-xs p-1 w-20 text-white">{product.title}</p>
          <p className="font-xs p-1 w-36 text-gray-200">تومان {parseFloat(product.orginalPriceTanzim-product.discountPriceTanzim).toLocaleString()} </p>
          <button
            onClick={() => handleRemove(index)} 
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            حذف
          </button>
        </div>
      ))}
    </div>

    <div className="flex justify-center mt-6 p-2 gap-4">
      <p className="text-lg text-white font-semibold">
        مجموع: {totalPrice.toLocaleString()} تومان
      </p>
      <button  className="bg-green-500 w-36 text-white px-3 py-1 rounded hover:bg-green-600">
        پرداخت
      </button>
    </div>
  </div>
</div>

  );
};

export default Card;
