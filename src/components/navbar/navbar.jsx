import React, { useEffect, useState } from 'react';
import { FaListUl, FaHome, FaUser, FaLaptopCode, FaCertificate, FaPhoneAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import RegisterForm from '../project/RegisterForm';

const Navbar = ({ onLogin, user }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle Navbar visibility on scroll
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 100 && window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Prevent background scroll when modal or mobile menu is open
  useEffect(() => {
    if (navOpen || isRegisterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [navOpen, isRegisterOpen]);

  const menuItems = [
    { name: 'Home', href: '#home', icon: <FaHome /> },
    { name: 'About', href: '#aboutme', icon: <FaUser /> },
    { name: 'Skills', href: '#myskill', icon: <FaLaptopCode /> },
    { name: 'Projects', href: '#projects', icon: <FaLaptopCode /> },
    { name: 'Certificates', href: '#certificate', icon: <FaCertificate /> },
    { name: 'Contact', href: '#contactme', icon: <FaPhoneAlt /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[100] flex flex-col items-center transition-transform duration-500 px-4 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* --- Main Navbar Pill --- */}
      <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-full px-6 py-3 flex items-center justify-between mt-5 relative z-[110]">
        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">
          ABISHEIK<span className="text-blue-600">.</span>
        </h1>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-8 font-bold text-slate-500 text-sm uppercase tracking-widest">
          {menuItems.map((item) => (
            <li key={item.name} className="hover:text-blue-600 transition-colors">
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <span className="hidden md:block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold border border-blue-100">
              Hi, {user.name}
            </span>
          ) : (
            <button
              className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-blue-600 text-xs font-bold uppercase tracking-widest transition-all active:scale-90"
              onClick={() => setIsRegisterOpen(true)}
            >
              Sign In
            </button>
          )}

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-700 text-2xl" 
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <IoClose /> : <FaListUl />}
          </button>
        </div>
      </div>

      {/* --- Mobile Dropdown --- */}
      {navOpen && (
        <div className="lg:hidden absolute top-24 w-[90%] max-w-md bg-white border border-slate-200 shadow-2xl rounded-[32px] p-6 flex flex-col gap-2 z-[100]">
          <p className="text-[10px] font-black text-slate-400 tracking-[0.2em] mb-2 px-4">NAVIGATION</p>
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all font-bold group"
              onClick={() => setNavOpen(false)}
            >
              <span className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-100 transition-colors">{item.icon}</span>
              {item.name}
            </a>
          ))}
        </div>
      )}

      {/* --- Login Modal Overlay --- */}
      {isRegisterOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900/60 backdrop-blur-sm z-[200] flex justify-center items-center p-4">
          {/* Modal Container */}
          <div className="bg-white p-6 md:p-10 rounded-[32px] shadow-2xl relative w-full max-w-lg border border-slate-100 overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-2xl text-slate-400 hover:text-slate-900 z-[210] p-2 hover:bg-slate-100 rounded-full transition-all"
              onClick={() => setIsRegisterOpen(false)}
            >
              <IoClose />
            </button>
            
            {/* Form Component */}
            <RegisterForm onLogin={(u) => { onLogin(u); setIsRegisterOpen(false); }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;