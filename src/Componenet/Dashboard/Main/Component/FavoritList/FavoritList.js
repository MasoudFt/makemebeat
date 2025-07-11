import { FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';

const Wishlist = ({ items }) => {
  return (
    <div className="bg-zinc-950 rounded-xl shadow-lg p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
          <span className="bg-purple-500/10 p-2 rounded-lg">
            <FiHeart className="text-purple-400" />
          </span>
          لیست مشتری های برتر
        </h2>
        
        <div className="text-sm text-gray-500">
          {items?.length > 0 ? `${items.length} آیتم` : 'خالی'}
        </div>
      </div>
      
      {items?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-colors group">
              <div className="flex">
                <div className="w-24 h-24 bg-gray-700 flex-shrink-0 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-3 flex-1">
                  <h3 className="font-medium text-gray-200 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-purple-400 font-medium">{item.price.toLocaleStringString()} تومان</div>
                    {item.inStock ? (
                      <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full">موجود</span>
                    ) : (
                      <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded-full">ناموجود</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 p-2 flex gap-2">
                <button className="flex-1 py-1 px-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm flex items-center justify-center gap-1 transition-colors">
                  <FiShoppingCart size={14} />
                  افزودن به سبد
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800/20 border border-dashed border-gray-700 rounded-lg p-8 text-center">
          <FiHeart className="mx-auto text-gray-600 mb-3" size={48} />
          <div className="text-gray-400 mb-1"> لیست مشتری های برتر شما خالی است</div>
          <div className="text-sm text-gray-600">مشتری هایی که به آنها علاقه دارید را اینجا ذخیره کنید</div>
          <button className="mt-4 text-purple-400 hover:text-purple-300 text-sm flex items-center justify-center gap-1 mx-auto">
           مشاهده مشتری ها
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};



export default Wishlist;
