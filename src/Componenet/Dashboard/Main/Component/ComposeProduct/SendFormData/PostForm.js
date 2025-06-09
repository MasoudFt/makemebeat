
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ServerURL from '../../../../../API/ServerURL';

const PostForm = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userId);
    const [formData, setFormData] = useState({
        musicName: "",
        price: "",
    });
    const [musicFile, setMusicFile] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('userId', userInfo.userId);
        data.append('musicName', formData.musicName);
        data.append('price', formData.price);  // اطمینان حاصل کنید که قیمت را نیز اضافه می‌کنید
        data.append('musicFile', musicFile);
        data.append('artist', userInfo.username);
        data.append('cover', coverFile);

        try {
            const response = await axios.post(`${ServerURL()}uploadMusic`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
            console.log(response)
            // Dispatch appropriate actions here based on your Redux setup
            // dispatch(someAction(response.data));
        } catch (error) {
            console.error('Error uploading:', error);
            setMessage('Error uploading');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMusicFileChange = (e) => {
        setMusicFile(e.target.files[0]);
    };

    const handleCoverFileChange = (e) => {
        setCoverFile(e.target.files[0]);
    };

    return (
        <form onSubmit={handleSubmit} className="text-white text-xl">
            <div className="grid grid-cols-2 font-bold text-white text-base gap-4 p-2">
                
                <div>
                    <label className="grid px-2 py-2 ml-2">نام موسیقی</label>
                    <input
                        name="musicName"
                        onChange={handleInputChange}
                        type="text"
                        placeholder="نام موسیقی"
                        className="w-full border-2 border-purple-600 p-2 mt-1 bg-zinc-950 text-white rounded-md focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="grid px-2 py-2 ml-2">قیمت</label>
                    <input
                        name="price"
                        onChange={handleInputChange}
                        type="text"
                        placeholder="قیمت"
                        className="w-full border-2 border-purple-600 p-2 mt-1 bg-zinc-950 text-white rounded-md focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="grid px-2 py-2 ml-2">آپلود آهنگ</label>
                    <input
                        type="file"
                        onChange={handleMusicFileChange}
                        accept="audio/*"
                        className="w-full border-purple-600 mt-1 border-2 bg-zinc-950 rounded-lg cursor-pointer focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="grid px-2 py-2 ml-2">آپلود کاور</label>
                    <input
                        type="file"
                        onChange={handleCoverFileChange}
                        accept="image/*"
                        className="w-full border-purple-600 mt-1 border-2 bg-zinc-950 rounded-lg cursor-pointer focus:outline-none"
                        required
                    />
                </div>
                
                <div>
                    <button className="rounded-xl text-white text-xl h-12 mt-7 font-semibold bg-black border border-purple-600 w-24 p-2" type="submit">
                        ارسال
                    </button>
                </div>
            </div>
            {message && <div className="text-red-500 text-xl mt-2">{message}</div>}
        </form>
    );
};

export default PostForm;