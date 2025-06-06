

import { useState } from 'react';
import { FiSend, FiX } from 'react-icons/fi';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.title.trim() || !formData.message.trim()) {
      setError('عنوان و متن تیکت الزامی هستند');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setFormData({ title: '', message: '', priority: 'medium' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('خطا در ارسال تیکت. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-950 rounded-xl shadow-lg p-6 border border-purple-500/20">
      <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
        <span className="bg-purple-500/10 p-2 rounded-lg">
          <FiSend className="text-purple-400" />
        </span>
        ارسال تیکت جدید
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-900/50 border border-green-500 rounded-lg text-green-200">
          تیکت شما با موفقیت ارسال شد!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-purple-300 mb-2">عنوان تیکت</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="عنوان مشکل یا سوال خود را وارد کنید"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="message" className="block text-purple-300 mb-2">متن تیکت</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full bg-zinc-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="شرح کامل مشکل یا سوال خود را بنویسید"
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label htmlFor="priority" className="block text-purple-300 mb-2">اولویت</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full bg-zinc-950 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="low">کم</option>
            <option value="medium">متوسط</option>
            <option value="high">زیاد</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
            isSubmitting 
              ? 'bg-purple-800 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700'
          } text-white transition-colors`}
        >
          {isSubmitting ? 'در حال ارسال...' : 'ارسال تیکت'}
          <FiSend />
        </button>
      </form>
    </div>
  );
};

export default TicketForm;

