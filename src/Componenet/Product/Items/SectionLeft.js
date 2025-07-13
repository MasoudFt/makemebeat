import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoCartSharp } from 'react-icons/io5';
import { MdSupportAgent } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { PiUsersThreeBold } from 'react-icons/pi';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { LiaEyeSolid } from 'react-icons/lia';
import { postProductlist } from '../../StateManagement/Action'; // اطمینان از صحت وارد کردن
import { Alert, Stack, Checkbox, FormGroup, FormControlLabel, Box, Typography, TextField } from '@mui/material'; // Import MUI components

const SectionLeft = ({ OneMusicInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedVersions, setSelectedVersions] = useState({
    project: false,
    wave: false,
    mp3: false,
  });

  const [quantity, setQuantity] = useState(1);
  const [alertMessage, setAlertMessage] = useState(null); // State for alert message

  const handleVersionChange = (event) => {
    const { name, checked } = event.target;
    setSelectedVersions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleAddToCart = () => {
    if (!OneMusicInfo) {
      setAlertMessage("لطفاً ابتدا یک موسیقی را انتخاب کنید.");
      return;
    }
    if (!selectedVersions.project && !selectedVersions.wave && !selectedVersions.mp3) {
      setAlertMessage("لطفاً حداقل یک نسخه از بیت را انتخاب کنید.");
      return;
    }
    if (quantity < 1) {
      setAlertMessage("تعداد باید حداقل 1 باشد.");
      return;
    }

    // Dispatch action with selected info
    dispatch(postProductlist({ ...OneMusicInfo, selectedVersions, quantity }));
    navigate("/Card");
    setAlertMessage(null); // Clear alert after successful action
  };

  // Styling for cards
  const cardStyles = "p-6 rounded-xl shadow-xl border border-zinc-700 bg-zinc-900 flex flex-col gap-6";
  const iconStyles = "text-cyan-500 mr-3"; // Default icon color

  return (
    <div className="flex flex-col gap-6 max-md:mt-10">

      {/* Alert Message Display */}
      {alertMessage && (
        <Alert severity="warning" onClose={() => setAlertMessage(null)}>
          {alertMessage}
        </Alert>
      )}

      {/* Price and Version Selection Card */}
      <div className={cardStyles}>
        {/* Price Display */}
        <div className="text-center">
          {OneMusicInfo.orginalPriceTanzim && (
            <Typography variant="overline" className="line-through decoration-red-500 decoration-2 text-gray-400">
              {`${OneMusicInfo.orginalPriceTanzim.toLocaleString()} تومان`}
            </Typography>
          )}
          <Typography variant="h4" className="font-bold text-cyan-400">
            {OneMusicInfo.discountPriceTanzim ? `${OneMusicInfo.discountPriceTanzim.toLocaleString()} تومان` : "رایگان"}
          </Typography>
        </div>

        {/* Version Selection */}
        <FormGroup>
          <Typography variant="h6" gutterBottom className="text-gray-300">نوع بیت:</Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="project"
                checked={selectedVersions.project}
                onChange={handleVersionChange}
                sx={{ color: "white", '&.Mui-checked': { color: 'cyan' } }}
              />
            }
            label={<Typography className="text-white">پروژه بیت</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="wave"
                checked={selectedVersions.wave}
                onChange={handleVersionChange}
                sx={{ color: "white", '&.Mui-checked': { color: 'cyan' } }}
              />
            }
            label={<Typography className="text-white">نسخه Wave بیت</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="mp3"
                checked={selectedVersions.mp3}
                onChange={handleVersionChange}
                sx={{ color: "white", '&.Mui-checked': { color: 'cyan' } }}
              />
            }
            label={<Typography className="text-white">نسخه MP3 بیت</Typography>}
          />
        </FormGroup>

        {/* Quantity and Add to Cart */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
  <TextField
    variant="outlined"
    type="number"
    label="تعداد"
    value={quantity}
    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
    className="w-full sm:w-24 text-white border-2 border-white"
    min={1}
    InputProps={{
      style: {
        color: 'white' 
      }
    }}
    InputLabelProps={{
      style: {
        color: 'white' 
      }
    }}
  />
  <button
    onClick={handleAddToCart}
    className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-br from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75 w-full sm:w-auto sm:px-4"
  >
    <IoCartSharp size={24} />
    افزودن به سبد خرید
  </button>
</div>
      </div>

      {/* Actions and Stats Card */}
      <div className={cardStyles}>
        {/* Support Button */}
        <button className="flex items-center gap-3 text-white font-semibold py-3 px-4 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          <MdSupportAgent size={30} className={iconStyles} />
          دریافت پشتیبانی
        </button>

        {/* Favorites Button */}
        <button className="flex items-center gap-3 text-white font-semibold py-3 px-4 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
          <FaHeart size={22} className="ml-2 text-pink-500" />
          افزودن به علاقه‌مندی‌ها
        </button>

        {/* Buyer/View Stats */}
        <div className="flex flex-col xs:flex-row justify-between xs:items-center gap-4 xs:gap-0 py-4 border-t border-zinc-700">
         
          <div className="flex items-center gap-2">
            <PiUsersThreeBold size={30} className="text-purple-500" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-purple-500">0</span>
              <span className="text-sm text-gray-400">خریداران</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <VscCommentDiscussion size={26} className="text-yellow-500" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-yellow-500">0</span>
              <span className="text-sm text-gray-400">دیدگاه</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LiaEyeSolid size={30} className="text-green-500" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-green-500">{OneMusicInfo.view || 0}</span>
              <span className="text-sm text-gray-400">بازدید</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLeft;