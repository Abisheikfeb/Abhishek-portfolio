import React, { useState, useEffect } from "react";
import photo from "../../assets/my image.jpg";
import { IoEyeOutline } from "react-icons/io5";
import { FaLinkedin, FaInstagram, FaDownload } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import sample1 from "../../pdf/RESUME.pdf";
import axios from "axios";

const Hero = () => {
  const [viewCount, setViewCount] = useState(0);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/views/1`)
      .then((response) => {
        setViewCount(response.data.views);
      })
      .catch((error) => {
        console.error("Error fetching view count:", error);
      });
  }, [API_BASE_URL]);

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    link.click();
  };

  return (
    <div className="hero-container relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Card Container */}
      <div className="bg-white/10 backdrop-blur-lg border border-amber-500 rounded-3xl shadow-xl p-8 flex flex-col items-center w-full max-w-md">
        {/* Profile Image */}
        <img
          className="h-40 w-40 rounded-full border-4 border-pink-400 shadow-lg shadow-pink-500/50 object-cover"
          src={photo}
          alt="Profile"
        />

        {/* Static Info */}
        <h1 className="mt-6 text-3xl font-bold text-amber-300">I am Abisheik</h1>
        <p className="text-lg text-lime-200">Generative AI & Java Developer</p>
        <p className="mt-2 text-center text-sm text-gray-200 px-4">
          Views <IoEyeOutline className="inline text-red-500" /> {viewCount}
        </p>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => handleDownload(sample1)}
            className="bg-green-600 border-2 px-3 py-2 rounded-lg border-green-800 flex items-center hover:bg-green-700 transition-colors"
          >
            <span>RESUME</span>
            <FaDownload className="ml-2" />
          </button>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-8 flex space-x-5">
        <a
          className="bg-white rounded-full p-2 text-blue-500 hover:scale-110 transition"
          href="https://www.linkedin.com/in/abisheik-s-7227b2304/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={28} />
        </a>
        <a
          className="bg-white rounded-full p-2 text-black hover:scale-110 transition"
          href="https://github.com/Abisheikfeb"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsGithub size={28} />
        </a>
        <a
          className="bg-white rounded-full p-2 text-red-500 hover:scale-110 transition"
          href="mailto:abisheik2004feb@gmail.com"
        >
          <GoMail size={28} />
        </a>
        <a
          className="bg-white rounded-full p-2 text-pink-500 hover:scale-110 transition"
          href="https://www.instagram.com/abisheik_feb27/profilecard/?igsh=MWRkNzR3bDZudDVscg=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={28} />
        </a>
      </div>
    </div>
  );
};

export default Hero;
