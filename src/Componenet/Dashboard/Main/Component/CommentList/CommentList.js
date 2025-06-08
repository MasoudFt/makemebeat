import React ,{useState ,useEffect}from 'react'
import {  FiTrash2, FiMessageSquare, FiStar, FiCheck } from 'react-icons/fi';


const CommentList = () => {
  const [comments, setComments] = useState([]);
  
  // فرضی: دریافت نظرات از API
  useEffect(() => {
    // axios.get('/api/comments').then(res => setComments(res.data))
    setComments([
      { id: 1, user: 'کاربر ۱', text: 'نظر تستی اول', date: '1402/05/15', rating: 4 },
      { id: 2, user: 'کاربر ۲', text: 'نظر تستی دوم', date: '1402/05/16', rating: 5 },
    ]);
  }, []);

  return (
    <div className="bg-zinc-950 rounded-xl shadow-lg p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
          <span className="bg-purple-500/10 p-2 rounded-lg">
            <FiMessageSquare className="text-purple-400" size={20} />
          </span>
          لیست نظرات
        </h2>
        
        <div className="text-sm text-gray-500">
          {comments.length > 0 ? `${comments.length} نظر` : 'خالی'}
        </div>
      </div>
      
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={comment.id} className="bg-gray-800/30 rounded-lg border border-gray-700 p-4 hover:border-purple-500/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-purple-400">{comment.user}</h3>
                <div className="flex items-center gap-2">
                  <div className="text-yellow-400 text-sm flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <FiStar key={i} fill={i < comment.rating ? "currentColor" : "none"} size={16} />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">{comment.date}</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{comment.text}</p>
              <div className="flex justify-end gap-2 mt-3">
                <button className="text-gray-400 hover:text-green-400 text-sm flex items-center gap-1">
                  <FiCheck size={14} /> تایید
                </button>
                <button className="text-gray-400 hover:text-red-400 text-sm flex items-center gap-1">
                  <FiTrash2 size={14} /> حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-800/20 border border-dashed border-gray-700 rounded-lg p-8 text-center">
          <FiMessageSquare className="mx-auto text-gray-600 mb-3" size={48} />
          <div className="text-gray-400 mb-1">هنوز نظری ثبت نشده است</div>
          <div className="text-sm text-gray-600">نظرات کاربران در اینجا نمایش داده می‌شود</div>
        </div>
      )}
    </div>
  );
};

export default CommentList;
