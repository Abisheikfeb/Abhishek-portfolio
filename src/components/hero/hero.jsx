import React, { useEffect, useState } from "react";
import photo from "../../assets/my image.jpg";
import { IoEyeOutline, IoTerminalOutline } from "react-icons/io5";
import { FaLinkedin, FaInstagram, FaDownload, FaGithub } from "react-icons/fa6";
import { GoMail } from "react-icons/go";
import sample1 from "../../pdf/RESUME.pdf";
import axios from "axios";

const Hero = () => {
  const [viewCount, setViewCount] = useState(0);
  const [terminalText, setTerminalText] = useState("");
  const fullText = "abisheik@linux:~$ python3 portfolio.py --status 'active' --role 'AI Developer'";
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Typewriter effect for terminal
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTerminalText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (API_BASE_URL) {
      axios
        .get(`${API_BASE_URL}/api/views/1`)
        .then((response) => setViewCount(response.data.views))
        .catch((error) => console.error("Error fetching view count:", error));
    }
  }, [API_BASE_URL]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = sample1;
    link.download = "Abisheik_Resume.pdf";
    link.click();
  };

  return (
    <div id="home" className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f8fafc] px-6 lg:px-20 py-20 overflow-hidden font-sans gap-12">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-400/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-400/10 rounded-full blur-[120px]"></div>

      {/* --- LEFT: Main Profile Card --- */}
      <div className="relative z-10 w-full max-w-lg bg-white/70 backdrop-blur-xl border border-white rounded-[40px] shadow-2xl p-10 flex flex-col items-center text-center transition-all hover:shadow-blue-500/5">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-red-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
          <img
            className="relative h-44 w-44 rounded-full border-[6px] border-white shadow-xl object-cover transform transition-transform duration-500 hover:scale-105"
            src={photo}
            alt="Abisheik"
          />
        </div>

        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">Abisheik</span>
          </h1>
          <p className="mt-3 text-lg font-medium text-black border-b-4 border-yellow-400 inline-block rounded">Generative AI & Python Developer</p>
          
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-600 border border-slate-200 uppercase tracking-widest">
            <IoEyeOutline className="text-blue-500 text-sm" />
            <span>{viewCount} Profile Views</span>
          </div>
        </div>

        <div className="mt-10 w-full flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={handleDownload} className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
            <span>RESUME</span>
            <FaDownload className="text-sm" />
          </button>
        </div>

        <div className="mt-8 flex items-center gap-5">
            <SocialIcon href="https://linkedin.com/..." icon={<FaLinkedin />} color="hover:text-blue-600" />
            <SocialIcon href="https://github.com/..." icon={<FaGithub />} color="hover:text-slate-900" />
            <SocialIcon href="mailto:..." icon={<GoMail />} color="hover:text-red-500" />
            <SocialIcon href="https://instagram.com/..." icon={<FaInstagram />} color="hover:text-pink-500" />
        </div>
      </div>

      {/* --- RIGHT: Terminal Card (Fills the Empty Space) --- */}
      <div className="relative z-10 w-full max-w-lg hidden lg:block">
        <div className="bg-[#1e1e1e] rounded-2xl shadow-2xl border border-slate-700 overflow-hidden font-mono">
          {/* Terminal Header */}
          <div className="bg-[#323232] px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-slate-400 text-xs ml-2 flex items-center gap-1">
              <IoTerminalOutline /> terminal — 80x24
            </span>
          </div>
          
          {/* Terminal Body */}
          <div className="p-6 text-sm sm:text-base leading-relaxed">
            <div className="flex gap-2 text-green-400">
              <span className="text-blue-400 font-bold">abisheik@linux</span>
              <span className="text-white">:</span>
              <span className="text-purple-400">~</span>
              <span className="text-white">$</span>
              <span className="text-green-400 whitespace-pre-wrap">{terminalText}</span>
              <span className="w-2 h-5 bg-green-400 animate-pulse"></span>
            </div>
            
            <div className="mt-4 text-slate-400">
              <p>&gt; Checking dependencies... <span className="text-green-500">OK</span></p>
              <p>&gt; Loading AI models... <span className="text-green-500">DONE</span></p>
              <p className="mt-2 text-blue-400 font-bold underline">Success: Developer Portfolio Loaded.</p>
            </div>
          </div>
        </div>
        
        {/* Decorative Floating Tag */}
        <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                MCA
            </div>
            <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Studying</p>
                <p className="text-sm font-black text-slate-800">Machine Learning</p>
            </div>
        </div>
      </div>

    </div>
  );
};

const SocialIcon = ({ href, icon, color }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`text-xl text-slate-400 transition-all duration-300 transform hover:scale-125 ${color}`}>
    {icon}
  </a>
);

export default Hero;