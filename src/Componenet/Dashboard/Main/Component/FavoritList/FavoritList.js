
import React, { useState } from 'react';
const FavList = ({ onSubmit }) => {
  const [artistName, setArtistName] = useState('');
  const [price, setPrice] = useState('');
  const [musicFile, setMusicFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!artistName || !price || !musicFile || !coverFile) {
      alert('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    const formData = new FormData();
    formData.append('artistName', artistName);
    formData.append('price', price);
    formData.append('music', musicFile);
    formData.append('cover', coverFile);

    onSubmit(formData);
  };

  return (
   
//     <div className="grid grid-cols-2  font-bold text-white text-xl gap-4 ">
// FavList
//     </div>
<form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
<h3>آپلود موسیقی</h3>
<div>
  <label>نام هنرمند:</label>
  <input type="text" value={artistName} onChange={(e) => setArtistName(e.target.value)} />
</div>
<div>
  <label>قیمت:</label>
  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
</div>
<div>
  <label>فایل موسیقی:</label>
  <input type="file" accept="audio/*" onChange={(e) => setMusicFile(e.target.files[0])} />
</div>
<div>
  <label>کاور موسیقی:</label>
  <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} />
</div>
<button type="submit">ارسال</button>
</form>
  )
}

export default FavList;