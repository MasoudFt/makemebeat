import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../StateManagement/Action';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import ServerURL from '../API/ServerURL';

const Cart = () => {
  const { cart, alert: cartAlert } = useSelector((state) => state.cartLit);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const tokenUserId = localStorage.getItem("userId");
  const imageUrl = ServerURL();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenUserId) {
      setShowAuthAlert(true);
    } else if (!cart.length) {
      navigate("/");
    }
  }, [cart, tokenUserId, navigate]);

  const handleRemove = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    dispatch(removeFromCart(newCart));
  };

  if (!tokenUserId) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <Alert
          severity="warning"
          onClick={() => navigate("/login")}
          className="cursor-pointer text-lg p-4"
          onClose={() => {}}
        >
          لطفاً برای مشاهده سبد خرید به صفحه ورود مراجعه کنید
        </Alert>
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.orginalPriceTanzim - item.discountPriceTanzim) || 0,
    0
  );

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <h1 className="text-3xl text-white font-bold mb-6 text-center">سبد خرید</h1>
      
      {cartAlert && (
        <div className="mb-6">
          <Alert severity="error" className="text-lg">
            {cartAlert}
          </Alert>
        </div>
      )}

      <div dir="rtl" className="flex flex-col gap-3 mt-8">
        {cart.length > 0 ? (
          <>
            <div className="flex-1 bg-black rounded-lg shadow p-4">
              <div className='flex text-center text-white font-semibold justify-around gap-2 mb-3 border-b pb-2'>
                <div className='w-fit'>ردیف</div>
                <div className='w-14'>تصویر</div>
                <div className='w-16'>هنرمند</div>
                <div className='w-20'>محصول</div>
                <div className='w-36'>قیمت</div>
                <div>عملیات</div>
              </div>
              
              {cart.map((product, index) => (
                <div 
                  key={product.post_id}
                  className="flex text-center justify-around gap-2 mb-3 border-b pb-2 items-center" 
                  style={{ minHeight: '60px' }}
                >
                  <p className="font-xs p-1 text-white">{index + 1}</p>
                  <img 
                    src={imageUrl + product.file_pathImage} 
                    alt={`تصویر ${product.title}`}
                    className='h-14 w-14 rounded-lg object-cover' 
                  />
                  <p className="font-xs p-1 w-16 text-white truncate">{product.artistName}</p>
                  <p className="font-xs p-1 w-20 text-white truncate">{product.title}</p>
                  <p className="font-xs p-1 w-36 text-gray-200">
                    {parseFloat(product.orginalPriceTanzim - product.discountPriceTanzim).toLocaleString()} تومان
                  </p>
                  <button
                    onClick={() => handleRemove(index)} 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 p-4 bg-black rounded-lg">
              <p className="text-lg text-white font-semibold">
                مجموع: {totalPrice.toLocaleString()} تومان
              </p>
              <button 
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
              >
                پرداخت
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">سبد خرید شما خالی است</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
