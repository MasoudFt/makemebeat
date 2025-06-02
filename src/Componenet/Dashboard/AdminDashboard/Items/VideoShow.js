import React from "react";
import ReactPlayer from "react-player";

const VideoShow = ({ url, thumbnail }) => {
  return (
    <>
      <ReactPlayer
        // url={"http://localhost:3000/uploads\\c2df6853da6115b8b0ec32cbd20727c4"}
        url={
          "http://localhost:3000/uploads/videos/demoVideofile-1748607121287-169446406.mp4"
        }
        controls
        width="25%"
        height="25%"
        light={thumbnail || false} // نمایش تامبنیل به عنوان تصویر پیش‌نمایش اگر موجود باشد
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
    </>
  );
};
export default VideoShow;
