import React, { useState } from 'react';
import { FaListUl, FaHome, FaUser, FaLaptopCode, FaCertificate, FaPhoneAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import RegisterForm from '../project/RegisterForm';

const Navbar = ({ onLogin, user }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleNavToggle = () => setNavOpen(!navOpen);
  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  const handleLogin = (loggedInUser) => {
    onLogin(loggedInUser);
    closeRegister();
  };

  const menuItems = [
    { name: 'Home', href: '#home', icon: <FaHome /> },
    { name: 'About Me', href: '#aboutme', icon: <FaUser /> },
    { name: 'My Skill', href: '#myskill', icon: <FaLaptopCode /> },
    { name: 'Projects', href: '#projects', icon: <FaLaptopCode /> },
    { name: 'Certificate', href: '#certificate', icon: <FaCertificate /> },
    { name: 'Contact Me', href: '#contactme', icon: <FaPhoneAlt /> },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <div className="w-[95%] md:w-[70%] bg-white rounded-full shadow-md px-5 py-2 flex items-center justify-between mt-4">
        <h1 className="text-blue-700 font-bold text-xl md:text-2xl">ABISHEIK</h1>

        <ul className="hidden md:flex gap-6 font-medium text-gray-700">
          {menuItems.map((item) => (
            <li key={item.name} className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
              {item.icon}
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">
              Welcome, {user.name}
            </span>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 text-sm"
              onClick={openRegister}
            >
              Sign In
            </button>
          )}

          <div className="md:hidden" onClick={handleNavToggle}>
            {navOpen ? <IoClose className="text-gray-700 text-2xl" /> : <FaListUl className="text-gray-700 text-2xl" />}
          </div>
        </div>
      </div>

      {navOpen && (
        <div className="md:hidden absolute top-20 w-[85%] bg-blue-200 shadow-lg rounded-xl p-4 flex flex-col gap-3 items-center z-50">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-400 bg-red-300 w-60 justify-center"
              onClick={() => setNavOpen(false)}
            >
              {item.icon} {item.name}
            </a>
          ))}
        </div>
      )}

      {isRegisterOpen && (
        <div className="fixed inset-0 flex justify-center items-start pt-20 bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg relative w-72 md:w-96">
            <IoClose
              className="absolute top-2 right-2 text-2xl cursor-pointer text-gray-600"
              onClick={closeRegister}
            />
            <RegisterForm onLogin={handleLogin} />
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Default export must be **outside the function**
export default Navbar;
