import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
const ShowPlayerAdmin = () => {
  
  const urlMusicFile = useSelector((state) => state.urlMusicFile);
// console.log(urlMusicFile)
const baseUrl="http://localhost:3000/"
const [fileId, setFileId] = useState('');

const handleDownload = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.get(`${baseUrl}download/${fileId}`, {
      responseType: 'blob', // دریافت به‌عنوان Blob
    });

    // ایجاد url برای فایل دانلود شده
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    // ایجاد لینک دانلود
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', ''); // این خط نام فایل را خالی می‌گذارد تا فرمت اصلی حفظ شود
    document.body.appendChild(link);
    link.click();
    link.remove();

  } catch (error) {
    console.error('Error downloading the file:', error);
  }
};
  return (
    <>
    <form onSubmit={handleDownload}>
      <input
      className="text-black font-bold text-base"
        type="number"
        min="0"
        accept="audio/mpeg"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
        placeholder="ID فایل"
        required
      />
      <button type="submit">دانلود فایل</button>
    </form>
    </>
  )
}

export default ShowPlayerAdmin