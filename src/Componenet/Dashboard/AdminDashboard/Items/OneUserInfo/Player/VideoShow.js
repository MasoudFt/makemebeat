import React from "react";
import ReactPlayer from "react-player";
import ServerURL from "../../../../../API/ServerURL"
const VideoShow = ({ url, thumbnail }) => {
  return (
    <>
      <ReactPlayer
        url={
          `${ServerURL()}uploads/videos/demoVideofile-1748607121287-169446406.mp4`
        }
        controls
        style={{padding:"3%",borderRadius:"5%"}}
        width="100%"
        height="100%"
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
