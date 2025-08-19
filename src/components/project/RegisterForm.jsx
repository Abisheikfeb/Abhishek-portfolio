import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaSignInAlt, FaSync } from 'react-icons/fa';

const RegisterForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? `${API_BASE_URL}/api/auth/login`
      : `${API_BASE_URL}/api/auth/register`;

    try {
      const res = await axios.post(url, formData);
      setMessage(`Welcome, ${res.data.name || formData.name}!`);
      onLogin(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="md:mb-5 w-full py-2">
      <div className="w-full rounded-2xl shadow-xl bg-white p-6 sm:p-10 transition-all duration-500">
        <div className={`relative ${isLogin ? 'flip' : 'flip-reverse'} transition-all duration-500`}>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-600 flex items-center justify-center gap-3">
            {isLogin ? (
              <FaSignInAlt className="text-red-400 text-2xl sm:text-3xl" />
            ) : (
              <FaUserPlus className="text-green-500 text-2xl sm:text-3xl" />
            )}
            {isLogin ? 'Login to your account' : 'Create a new account'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="flex items-center border border-red-400 rounded-md p-3 sm:p-4">
                <FaUser className="text-red-500 mr-3 text-xl sm:text-2xl" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-black text-base sm:text-lg outline-none"
                />
              </div>
            )}

            <div className="flex items-center border border-blue-400 rounded-md p-3">
              <FaEnvelope className="text-blue-500 mr-3 text-xl sm:text-2xl" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-base text-black sm:text-lg outline-none"
              />
            </div>

            <div className="flex items-center border border-green-400 rounded-md p-3 sm:p-4">
              <FaLock className="text-green-600 mr-3 text-xl sm:text-2xl" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full text-base text-black sm:text-lg outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full text-lg sm:text-xl py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white rounded-lg font-semibold transition duration-300"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-6 flex items-center justify-center text-sm sm:text-base text-gray-600 hover:text-blue-500 transition-all duration-300"
          >
            <FaSync className="mr-2 text-red-400 animate-spin-slow text-base sm:text-lg" />
            Switch to {isLogin ? 'Register' : 'Login'}
          </button>
        </div>

        {message && (
          <p className="mt-5 text-center text-red-600 text-base sm:text-lg font-medium transition-all duration-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
