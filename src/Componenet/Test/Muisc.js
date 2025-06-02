
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Howl } from 'howler';

const Music = () => {
    const [music, setMusic] = useState(null);
    const soundRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [filepath,setFilePath]=useState("");
    const getdata = async () => {
        try {
            const res = await axios.get("http://localhost:3000/rockmusics/72266ae9d031355c44e823e1b78672d8");
            console.log(res);
            setMusic(res.data[0]);
            setFilePath(res.data[0].file_path);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    useEffect(() => {
        if (music) {
            soundRef.current = new Howl({
                src: [`http://localhost:3000/${filepath}`],
                html5: true,
                volume: volume,
                onplay: () => setIsPlaying(true),
                onstop: () => setIsPlaying(false),
                onend: () => setIsPlaying(false),
            });
        }

        return () => {
            soundRef.current && soundRef.current.stop();
        };
    }, [music, volume]); // وابستگی به music و volume

    const playSound = () => {
        if (isPlaying) {
            soundRef.current.pause();
        } else {
            soundRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        soundRef.current.volume(newVolume);
    };

    return (
        <div>
           
                    <div className="flex flex-col text-black items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-zinc-800 p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold mb-4">پخش صدای Howler.js</h1>
            <button
                onClick={playSound}
                className={`py-2 px-4 rounded-lg text-black transition ${
                    isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
                {isPlaying ? 'توقف' : 'پخش'}
            </button>
            <div className="mt-4">
                <label className="block text-gray-700 mb-2" htmlFor="volume">
                    حجم صدا: {Math.round(volume * 100)}%
                </label>
                <input
                    id="volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-blue-500"
                />
            </div>
            {/* <button onClick={()=>getdata()}className="bg-black w-full text-white">fetch</button> */}
         <div className='grid bg-slate-500 rounded-lg'>
                {music !== null?
                <>
                <span>gammuisc:{music.gammuisc}</span>
                <span>like:{music.likeproduct}</span>
                <span>tempo:{music.tempo}</span>
                <span>Name:{music.title}</span>
                <span>view:{music.view}</span>
                <img className='h-44 w-44 grid place-items-center rounded-xl' src={`http://localhost:3000/${music.cover_path}`}/>
                </>
                    :
                    "در حال بارگذاری"                }
         </div>

        </div>
    </div>
            
        </div>
    );
};

export default Music;
