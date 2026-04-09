import React, { useState, useEffect,  } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { FiExternalLink, FiPlus } from "react-icons/fi";
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Assuming your image imports remain the same
import image1 from '../../assets/onlinebanking.svg';
import image2 from '../../assets/weather.svg';
import image3 from '../../assets/spam.svg';
import image4 from '../../assets/chat.svg';
import image5 from '../../assets/calculator.svg';
import image6 from '../../assets/youtube.svg';

const initialData = [
  { id: 1, src: image1, title: 'Tic-Tac-Toe', tech: 'JAVA', link: 'https://abisheikfeb.github.io/tic-ta-to/' },
  { id: 2, src: image2, title: 'Weather App', tech: 'C#', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 3, src: image3, title: 'Spam Detector', tech: 'PYTHON', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 4, src: image4, title: 'Chat Application', tech: 'PYTHON', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 5, src: image5, title: 'Logic Calc', tech: 'C#', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 6, src: image6, title: 'Video Stream', tech: 'JAVA', link: 'https://abisheikfeb.github.io/tempmessage/' },
];

const Project = ({ isLoggedIn }) => {
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [likeCounts, setLikeCounts] = useState({});
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [celebrationProject, setCelebrationProject] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (API_BASE_URL) {
      const fetchLikeCounts = async () => {
        try {
          const likePromises = initialData.map((project) =>
            axios.get(`${API_BASE_URL}/api/likes/${project.id}`).then((res) => ({ id: project.id, count: res.data.count }))
          );
          const likes = await Promise.all(likePromises);
          const likeCountMap = likes.reduce((acc, like) => ({ ...acc, [like.id]: like.count }), {});
          setLikeCounts(likeCountMap);
        } catch (error) { console.error('Error fetching likes:', error); }
      };
      fetchLikeCounts();
    }
  }, [API_BASE_URL]);

  const handleLikeClick = async (projectId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/likes/${projectId}`);
      setLikeCounts(prev => ({ ...prev, [projectId]: response.data.count }));
      setLikedProjects(prev => new Set([...prev, projectId]));
      setCelebrationProject(projectId);
      setTimeout(() => setCelebrationProject(null), 1500);
    } catch (error) { console.error('Error updating like:', error); }
  };

  const fireworkVariants = {
    initial: { scale: 0, opacity: 1, x: 0, y: 0 },
    animate: (i) => ({
      scale: [0, 1.2, 0],
      opacity: [1, 0.8, 0],
      x: Math.cos(i * Math.PI / 4) * 80,
      y: Math.sin(i * Math.PI / 4) * 80,
      transition: { duration: 0.8, ease: 'easeOut' },
    }),
  };

  return (
    <div id="projects" className="min-h-screen bg-[#f8fafc] py-20 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Portfolio</h2>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
          Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Works.</span>
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {initialData.slice(0, showMore ? initialData.length : 3).map((project) => (
          <motion.div
            key={project.id}
            className="group relative bg-white rounded-[32px] shadow-sm border border-slate-100 p-2 overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
            layout
          >
            {/* Visual Header */}
            <div className="bg-slate-50 rounded-[24px] p-8 flex justify-center items-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <motion.img
                src={project.src}
                alt={project.title}
                className="w-32 h-32 object-contain relative z-10"
                whileHover={{ scale: 1.1, rotate: -5 }}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{project.title}</h3>
                  <span className="text-[10px] font-black tracking-widest text-blue-500 bg-blue-50 px-2 py-1 rounded-md uppercase">
                    {project.tech}
                  </span>
                </div>
                <button 
                  onClick={() => isLoggedIn ? window.open(project.link, '_blank') : setShowLoginMessage(true)}
                  className="p-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200"
                >
                  <FiExternalLink size={18} />
                </button>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <button
                  onClick={() => handleLikeClick(project.id)}
                  className="flex items-center gap-2 group/like"
                >
                  {likedProjects.has(project.id) ? (
                    <IoIosHeart className="text-2xl text-red-500 animate-pulse" />
                  ) : (
                    <IoIosHeartEmpty className="text-2xl text-slate-300 group-hover/like:text-red-400 transition-colors" />
                  )}
                  <span className="text-slate-600 font-bold text-sm">
                    {likeCounts[project.id] || 0}
                  </span>
                </button>
              </div>
            </div>

            {/* Fireworks Animation Overlay */}
            <AnimatePresence>
              {celebrationProject === project.id && (
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-50">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-blue-400"
                      variants={fireworkVariants}
                      initial="initial"
                      animate="animate"
                      custom={i}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Show More Trigger */}
      {!showMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowMore(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-blue-200 transition-all shadow-sm"
          >
            Explore All Projects <FiPlus />
          </button>
        </div>
      )}

      {/* Modern Modal */}
      <AnimatePresence>
        {showLoginMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowLoginMessage(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white p-8 rounded-[32px] shadow-2xl max-w-sm w-full text-center border border-slate-100"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <IoClose size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Access Denied</h3>
              <p className="text-slate-500 mb-8 font-medium">Please log in to view the live demo of this project.</p>
              <div className="flex flex-col gap-3">
                <a href="#home" onClick={() => setShowLoginMessage(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-colors">
                  Go to Login
                </a>
                <button onClick={() => setShowLoginMessage(false)} className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-bold">
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Project;