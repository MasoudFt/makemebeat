
// // Frontend (React) - Video Upload Form


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// const VideoPost = () => {
  //     const userId = useSelector((state) => state.userId);
//   const [videoFile, setVideoFile] = useState(null);
//   const [title, setTitle] = useState('');
//   const [uploadStatus, setUploadStatus] = useState('');

//   const handleVideoChange = (e) => {
//     setVideoFile(e.target.files[0]);
//   };

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!videoFile) {
//       setUploadStatus('Please select a video file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('video', videoFile);
//     formData.append('title', title);
//     formData.append('user_id', 1); // Replace with actual user ID

//     try {
//       const response = await axios.post('http://localhost:3000/video-uploadtest', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setUploadStatus(response.data);
//     } catch (error) {
//       console.error('Error uploading video:', error);
//       setUploadStatus('Error uploading video.');
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Video</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title:</label>
//           <input type="text" id="title" value={title} onChange={handleTitleChange} />
//         </div>
//         <div>
//           <label htmlFor="video">Video File:</label>
//           <input type="file" id="video" accept="video/*" onChange={handleVideoChange} />
//         </div>
//         <button type="submit">Upload</button>
//         {uploadStatus && <p>{uploadStatus}</p>}
//       </form>
//     </div>
//   );
// };

// export default VideoPost;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const VideoUpload = () => {
      const userId = useSelector((state) => state.userId);
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [videos, setVideos] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !title) {
      setUploadStatus('لطفاً عنوان ویدیو و فایل ویدیویی را وارد کنید.');
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('user_id', 1); // به جای 1، شناسه کاربر واقعی را قرار دهید

    try {
      await axios.post('http://localhost:3000/video-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('ویدیو با موفقیت بارگذاری شد!');
      fetchVideos(); // بارگذاری مجدد ویدیوها
    } catch (error) {
      console.error('خطا در بارگذاری ویدیو:', error);
      setUploadStatus('خطا در بارگذاری ویدیو. لطفاً دوباره تلاش کنید.');
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('خطا در دریافت ویدیوها:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">آپلود ویدیو</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">عنوان ویدیو:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">انتخاب فایل ویدیویی:</label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          بارگذاری ویدیو
        </button>
      </form>
      {uploadStatus && <p className="text-red-500">{uploadStatus}</p>}

      {/* <h2 className="text-lg">2</h2> */}
      </div>
  )
}
  export default VideoUpload;