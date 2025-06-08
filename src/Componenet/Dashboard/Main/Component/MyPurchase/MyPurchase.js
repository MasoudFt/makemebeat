import React ,{useState ,useEffect}from 'react'
import { FiShoppingBag, FiEye } from 'react-icons/fi';

const MyPurchase = () => {
  const [purchases, setPurchases] = useState([]);
  
  // فرضی: دریافت خریدها از API
  useEffect(() => {
    // axios.get('/api/purchases').then(res => setPurchases(res.data))
    setPurchases([
      { id: 1, product: 'آلبوم موسیقی', price: 50000, date: '1402/05/10', status: 'تکمیل شده' },
      { id: 2, product: 'اشتراک ماهانه', price: 100000, date: '1402/04/01', status: 'در حال پردازش' },
    ]);
  }, []);

  return (
    <div className="min-h-[400px] flex flex-col">
    <div className="mb-4">
      <div className="text-sm text-gray-500">
        {purchases.length > 0 ? `${purchases.length} خرید` : 'خالی'}
      </div>
    </div>
    
    {purchases.length > 0 ? (
      <div className="overflow-x-auto flex-1">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-gray-800">
              <th className="text-right pb-2">محصول</th>
              <th className="text-right pb-2">مبلغ</th>
              <th className="text-right pb-2">تاریخ</th>
              <th className="text-right pb-2">وضعیت</th>
              <th className="text-right pb-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="border-b border-gray-800 hover:bg-gray-800/20 transition-colors">
                <td className="py-3 text-gray-200">{purchase.product}</td>
                <td className="py-3 text-purple-400">{purchase.price.toLocaleString()} تومان</td>
                <td className="py-3 text-gray-400 text-sm">{purchase.date}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    purchase.status === 'تکمیل شده' 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-yellow-900/30 text-yellow-400'
                  }`}>
                    {purchase.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-gray-400 hover:text-purple-400 p-1">
                    <FiEye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-800/20 border border-dashed border-gray-700 rounded-lg p-8 text-center">
        <FiShoppingBag className="text-gray-600 mb-3" size={48} />
        <div className="text-gray-400 mb-1">لیست خریدهای شما خالی است</div>
        <div className="text-sm text-gray-600">خریدهای شما در اینجا نمایش داده می‌شود</div>
        <button className="mt-4 text-purple-400 hover:text-purple-300 text-sm flex items-center justify-center gap-1 mx-auto">
          مشاهده محصولات
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    )}
  </div>
  
  );
};

export default MyPurchase;
