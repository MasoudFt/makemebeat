
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { LuDownload } from "react-icons/lu";

// const Wallet = () => {
 

//   return (
//   <>
//   wallet
//   </>
//   );
// };

// export default Wallet;
import { FiCreditCard, FiPlus, FiMinus, FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';

const Wallet = ({ balance, transactions }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR'
    }).format(amount).replace('ریال', 'تومان');
  };

  return (
    <div className="bg-zinc-950 rounded-xl shadow-lg p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
          <span className="bg-purple-500/10 p-2 rounded-lg">
            <FiCreditCard className="text-purple-400" />
          </span>
          کیف پول من
        </h2>
        
        <div className="bg-purple-900/30 px-3 py-1 rounded-full text-purple-300 border border-purple-500/30 text-sm">
          موجودی فعلی
        </div>
      </div>
      
      <div className="bg-zinc-950/50 border border-gray-700 rounded-xl p-4 mb-6">
        <div className="text-gray-400 text-sm mb-1">موجودی قابل برداشت</div>
        <div className="text-3xl font-bold text-purple-300">{""}</div>
      </div>
      
      <div className="flex gap-3 mb-6">
        <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
          <FiPlus />
          افزایش موجودی
        </button>
        <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-purple-300 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
          <FiMinus />
          برداشت وجه
        </button>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-300 mb-4">تراکنش‌های اخیر</h3>
      
      {transactions?.length > 0 ? (
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'deposit' 
                    ? 'bg-green-900/30 text-green-400' 
                    : 'bg-red-900/30 text-red-400'
                }`}>
                  {transaction.type === 'deposit' ? <FiArrowDownLeft /> : <FiArrowUpRight />}
                </div>
                <div>
                  <div className="font-medium text-gray-200">{transaction.description}</div>
                  <div className="text-xs text-gray-500">{transaction.date}</div>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'
              }`}>
                {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800/20 border border-dashed border-gray-700 rounded-lg p-8 text-center">
          <div className="text-gray-500 mb-2">تراکنشی یافت نشد</div>
          <div className="text-sm text-gray-600">هنوز هیچ تراکنشی انجام نداده‌اید</div>
        </div>
      )}
    </div>
  );
};

// Example usage:
<Wallet 
  balance={1250000} 
  transactions={[
    { type: 'deposit', amount: 500000, description: 'افزایش موجودی', date: '1402/05/15' },
    { type: 'withdraw', amount: 250000, description: 'خرید محصول', date: '1402/05/10' }
  ]} 
/>

export default Wallet;
