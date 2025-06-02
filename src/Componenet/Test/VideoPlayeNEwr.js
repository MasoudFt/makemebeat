import React from 'react';
import ReactPlayer from 'react-player';
const VideoPlayer = ({ url, thumbnail }) => {
  return (
    <div className="max-w-4xl mx-auto mt-36 p-4  rounded-lg shadow-lg">
      {thumbnail && (
        <img 
          src={thumbnail} 
          alt="Video Thumbnail" 
          className="w-full h-full object-cover rounded-md mb-4"
        />
      )}
      <ReactPlayer
        url={"http://localhost:3000/uploads\\c2df6853da6115b8b0ec32cbd20727c4"}
        controls
        width="100%"
        height="100%"
        light={thumbnail || false}  // نمایش تامبنیل به عنوان تصویر پیش‌نمایش اگر موجود باشد
        playIcon={
          <button className="bg-purple-700 text-white p-4 rounded-full shadow-lg hover:bg-purple-800">
            ▶
          </button>
        }
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
            hlsOptions: {
              // Optional HLS config here if needed
            },
          },
        }}
      />
    </div>
  );
};
export default VideoPlayer;