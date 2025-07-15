import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../StateManagement/Action'; 

const Login = () => {
  const user = useSelector(state => state.user);
  console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("ایمیل را وارد کنید");
      return;
    }

    if (!password.trim()) {
      setError("گذرواژه را وارد کنید");
      return;
    }

    setLoading(true);

    try {
      await dispatch(login(email, password));

      // اینجا از وضعیت کاربر قبل از تغییر استفاده می‌کنیم
      if (!user.error && user.isAuthenticated) {
        navigate('/dashboard'); // در صورت ورود موفق به داشبورد بروید.
      } else {
        setError(user.error || "وارد شدن ناموفق است. لطفا دوباره تلاش کنید.");
      }
    } catch (err) {
      setError("وارد شدن ناموفق است. لطفا دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="h-screen mt-10 flex items-center justify-center bg-zinc-950"
    >
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 text-gray-400 py-5 px-8 border-t-4 border-blue-700 rounded-md shadow-lg"
      >
        <h2 className="text-3xl text-center mb-3">ورود</h2>

        {error && (
          <div className="mb-3 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mb-2">
          <label htmlFor="email" className="text-base">
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@domain.com"
            value={email}
            className="w-full p-2 mt-1 text-black bg-gray-200 rounded-md focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-2 mb-3">
          <label htmlFor="password" className="text-base">
            گذرواژه
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            className="w-full p-2 mt-1 text-black bg-gray-200 rounded-md focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`border-none bg-blue-800 py-2 px-3 text-white w-full mt-2 rounded-md hover:bg-blue-700 mb-5 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>

        <Link to="#" className="text-sm text-blue-400 hover:text-blue-300">
          رمز را فراموش کردم
        </Link>
      </form>
    </div>
  );
};

export default Login;