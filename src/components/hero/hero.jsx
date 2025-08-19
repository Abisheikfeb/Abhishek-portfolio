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
  const [flipped, setFlipped] = useState(false);
  const [typedText, setTypedText] = useState("");
  const aboutText =
    "I am Abisheik — Generative AI Developer & Java Developer. Passionate about building AI solutions, optimizing algorithms, and developing scalable backend applications.";

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

  // Typing effect
  useEffect(() => {
    if (flipped) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(aboutText.substring(0, i + 1));
        i++;
        if (i >= aboutText.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    } else {
      setTypedText("");
    }
  }, [flipped]);

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    link.click();
  };

  return (
    <div className="hero-container relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Flip Card Container */}
      <div
        className="relative w-full max-w-md h-[420px] cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`absolute inset-0 transition-transform duration-700 transform ${
            flipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              className="h-40 w-40 rounded-full border-4 border-pink-400 shadow-lg shadow-pink-500/50 object-cover"
              src={photo}
              alt="Profile"
            />
            <h1 className="mt-4 text-3xl font-bold text-amber-300">
              I am Abisheik
            </h1>
            <p className="text-lg text-lime-200">
              Generative AI & Java Developer
            </p>
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

          {/* Back Side */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <h2 className="text-xl font-bold text-amber-200">About Me</h2>
            <p className="mt-3 text-sm text-gray-100 leading-relaxed">
              {typedText}
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Icons Under Card */}
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