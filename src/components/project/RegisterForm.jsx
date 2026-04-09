import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaSync } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const RegisterForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const url = isLogin
      ? `${API_BASE_URL}/api/auth/login`
      : `${API_BASE_URL}/api/auth/register`;

    try {
      const res = await axios.post(url, formData);
      setMessage(`Success! Welcome, ${res.data.name || formData.name}`);
      onLogin(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto font-sans">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          {isLogin ? 'Welcome back' : 'Get started'}
          <span className="text-blue-600">.</span>
        </h2>
        <p className="text-slate-500 text-sm font-medium">
          {isLogin ? 'Enter your details to access your account.' : 'Join the community and start building.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="relative group">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium"
              required
            />
          </div>
        )}

        <div className="relative group">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            required
          />
        </div>

        <div className="relative group">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          {!isLoading && <FiArrowRight className="text-lg" />}
        </button>
      </form>

      {/* Switcher & Messages */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
          className="group flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
        >
          <FaSync className={`transition-transform duration-500 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>

        {message && (
          <div className={`text-sm font-bold px-4 py-2 rounded-lg ${message.includes('Success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500 animate-shake'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;