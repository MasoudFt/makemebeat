
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const [isSignInActive, setIsSignInActive] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [errors, setErrors] = useState({});
  const[pastSignUp,setPastSignUp]=useState("");
  const navigate=useNavigate();


  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    type: true,
  });

  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "نام",
      validation: value => !value ? "لطفا نام را وارد کنید" : ""
    },
    {
      name: "email",
      type: "email",
      placeholder: "ایمیل",
      validation: value => {
        if (!value) return "لطفا ایمیل را وارد کنید";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "فرمت ایمیل نامعتبر است";
        return "";
      }
    },
    {
      name: "password",
      type: "password",
      placeholder: "گذرواژه",
      validation: value => {
        if (!value) return "لطفا گذرواژه را وارد کنید";
        if (value.length < 6) return "گذرواژه باید حداقل 6 کاراکتر باشد";
        return "";
      }
    },
    {
      name: "mobile",
      type: "tel",
      placeholder: "موبایل",
      validation: value => {
        if (!value) return "لطفا موبایل را وارد کنید";
        if (!/^[0-9]{11}$/.test(value)) return "شماره موبایل باید 11 رقمی باشد";
        return "";
      }
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    
    if (pastSignUp) {
      setPastSignUp("");
    }

    if (errors[name]) {
      const fieldConfig = formFields.find(f => f.name === name);
      const errorMsg = fieldConfig.validation(value);
      setErrors(prev => ({ ...prev, [name]: errorMsg }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    formFields.forEach(field => {
      const errorMsg = field.validation(user[field.name]);
      if (errorMsg) {
        newErrors[field.name] = errorMsg;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const postUser = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/users/register", {
        username: user.name || null,
        email: user.email || null,
        password: user.password || null,
        mobile: user.mobile || null,
        type: user.type,
      });
      console.log(data)
      navigate("/login")
      setPastSignUp(""); 
    } catch (error) {
      console.log(error.response);
      
      // اگر خطا مربوط به تکراری بودن کاربر بود
      if (error.response?.data?.message?.includes("already exists") || 
          error.response?.data?.message === "Error creating user") {
        setPastSignUp("شما قبلا ثبت نام کرده اید");
      } else {
        setPastSignUp(""); // ریست کردن پیام برای سایر خطاها
      }

      // مدیریت سایر خطاهای API
      if (error.response?.data?.errors) {
        setErrors(prev => ({ ...prev, ...error.response.data.errors }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      postUser();
    }
     if(pastSignUp){
      setPastSignUp("")
    }
  };

  const handleToggle = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newSignInActive = !isSignInActive;
    setIsSignInActive(newSignInActive);

    setUser(prev => ({
      ...prev,
      type: newSignInActive,
    }));

    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, isSignInActive]);

  return (
    <div className="flex items-center justify-center bg-zinc-950 p-4 mt-10">
      <div className="relative w-full max-w-4xl h-screen overflow-hidden shadow-xl rounded-lg">
        {/* Background Panel */}
        <div
          className={`absolute top-0 bottom-0 w-1/2 bg-cover bg-center transition-all duration-500 ease-in-out ${
            isSignInActive ? "left-0" : "left-1/2"
          }`}
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/ca/e1/9c/cae19c241ebcab73c557e9739344f02a.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">خوش آمدید!</h2>
            <p className="text-center mb-6">
              برای استفاده از امکانات سابت لطفا اطلاعات خود را وارد کنید
            </p>
            <button
              className={`py-2 px-3 ${isSignInActive ? "bg-red-700" : "bg-green-700"} text-white w-24 mt-2 rounded-md hover:bg-black mb-5`}
              onClick={handleToggle}
            >
              {isSignInActive ? "فروشنده" : "خریدار"}
            </button>
          </div>
        </div>

        {/* Form Panel */}
        <div
          dir="rtl"
          className={`absolute w-1/2 p-5 top-0 bottom-0 flex flex-col justify-center transition-all duration-500 ease-in-out ${
            isSignInActive ? "left-1/2" : "left-0"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            <h2 className="text-2xl text-white font-bold mb-6">
              {isSignInActive ? "ثبت نام خریداران" : "ثبت نام فروشندگان"}
            </h2>

            {/* Render fields dynamically */}
            {formFields.map((field) => (
              <div className="mb-2" key={field.name}>
                <label htmlFor={field.name} className="text-sm text-white">
                  {field.placeholder}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={user[field.name]}
                  onChange={handleChange}
                  className="w-full border-solid border-2 p-2 mt-1 bg-gray-900 text-white rounded-md focus:outline-none"
                />
                {errors[field.name] && (
                  <div className="text-red-500 text-sm mt-1">{errors[field.name]}</div>
                )}
              </div>
            ))}

<button
  type="submit"
  className={`
    ${pastSignUp === "شما قبلا ثبت نام کرده اید" ? "bg-red-600 border-none" : ""}
    ${isSignInActive ? "hover:bg-green-600 " : "hover:bg-red-600 "}
    w-full py-2 px-4 border border-purple-600 text-white font-medium rounded-md hover:text-black hover:border-none`}
>
  {pastSignUp === "شما قبلا ثبت نام کرده اید" 
    ? "شما قبلا ثبت نام کرده اید" 
    : isSignInActive ? "ثبت نام خریداران" : "ثبت نام فروشندگان"}
</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
