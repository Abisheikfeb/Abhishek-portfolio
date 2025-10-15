import React, { useState, useEffect, useCallback } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { FiExternalLink } from "react-icons/fi";
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import image1 from '../../assets/onlinebanking.svg';
import image2 from '../../assets/weather.svg';
import image3 from '../../assets/spam.svg';
import image4 from '../../assets/chat.svg';
import image5 from '../../assets/calculator.svg';
import image6 from '../../assets/youtube.svg';
import axios from 'axios';

const initialData = [
  { id: 1, src: image1, alt: 'JAVA', link: 'https://abisheikfeb.github.io/tic-ta-to/' },
  { id: 2, src: image2, alt: 'C#', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 3, src: image3, alt: 'PYTHON', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 4, src: image4, alt: 'PYTHON', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 5, src: image5, alt: 'C#', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 6, src: image6, alt: 'JAVA', link: 'https://abisheikfeb.github.io/tempmessage/' },
];

const Project = ({ isLoggedIn }) => {
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [likeCounts, setLikeCounts] = useState({});
  const [likedProjects, setLikedProjects] = useState(new Set());
  const [celebrationProject, setCelebrationProject] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchLikeCounts = async () => {
      try {
        const likePromises = initialData.map((project) =>
          axios.get(`${API_BASE_URL}/api/likes/${project.id}`).then((response) => ({
            id: project.id,
            count: response.data.count,
          }))
        );
        const likes = await Promise.all(likePromises);
        const likeCountMap = likes.reduce((acc, like) => {
          acc[like.id] = like.count;
          return acc;
        }, {});
        setLikeCounts(likeCountMap);
      } catch (error) {
        console.error('Error fetching like counts:', error);
      }
    };
    fetchLikeCounts();
  }, [API_BASE_URL]);

  const handleLinkClick = useCallback((link) => {
    if (isLoggedIn) {
      window.open(link, '_blank');
    } else {
      setShowLoginMessage(true);
    }
  }, [isLoggedIn]);

  const handleLikeClick = async (projectId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/likes/${projectId}`);
      setLikeCounts((prev) => ({
        ...prev,
        [projectId]: response.data.count,
      }));
      setLikedProjects((prev) => new Set(prev.add(projectId)));
      setCelebrationProject(projectId);
      setTimeout(() => {
        setCelebrationProject(null);
        setLikedProjects((prev) => {
          const updated = new Set(prev);
          updated.delete(projectId);
          return updated;
        });
      }, 2000);
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  const closeLoginMessage = () => {
    setShowLoginMessage(false);
  };

  const toggleShowMore = () => {
    setShowMore(true);
  };

  // Firework particle animation variants
  const fireworkVariants = {
    initial: { scale: 0, opacity: 1, x: 0, y: 0 },
    animate: (i) => ({
      scale: [0, 1, 0],
      opacity: [1, 0.8, 0],
      x: Math.cos(i * Math.PI / 4) * 100,
      y: Math.sin(i * Math.PI / 4) * 100,
      transition: { duration: 1, ease: 'easeOut' }
    })
  };

  return (
    <div id='projects' className="mt-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        className="text-center font-bold text-4xl md:text-5xl mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="text-red-500">P</span>rojects
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {initialData.slice(0, showMore ? initialData.length : 3).map((image) => (
          <motion.div
            key={image.id}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: image.id * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex justify-center items-center p-6">
              <motion.img
                src={image.src}
                alt={image.alt}
                className="w-28 h-28 object-contain"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-semibold text-red-500 dark:text-red-400">{image.alt}</p>
            </div>
            <div className="flex justify-between items-center p-4">
              <motion.button
                onClick={() => handleLikeClick(image.id)}
                className="flex items-center gap-2 text-red-500 dark:text-red-400"
                whileTap={{ scale: 0.9 }}
              >
                {likedProjects.has(image.id) ? (
                  <IoIosHeart className="text-2xl text-red-600" />
                ) : (
                  <IoIosHeartEmpty className="text-2xl text-gray-400 dark:text-gray-500" />
                )}
                <span className="text-gray-900 dark:text-gray-100 font-medium">{likeCounts[image.id] || 0}</span>
              </motion.button>
              <motion.button
                onClick={() => handleLinkClick(image.link)}
                className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiExternalLink size={24} />
              </motion.button>
            </div>
            <AnimatePresence>
              {celebrationProject === image.id && (
                <motion.div
                  className="absolute inset-0 flex justify-center items-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-yellow-400"
                      variants={fireworkVariants}
                      initial="initial"
                      animate="animate"
                      custom={i}
                    />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i + 8}
                      className="absolute w-3 h-3 rounded-full bg-red-400"
                      variants={fireworkVariants}
                      initial="initial"
                      animate="animate"
                      custom={i + 0.5}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <AnimatePresence>
          {!showMore && (
            <motion.button
              onClick={toggleShowMore}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show More
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showLoginMessage && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-red-500 dark:border-red-400 relative max-w-sm w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                onClick={closeLoginMessage}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose className="text-2xl" />
              </motion.button>
              <p className="text-lg text-red-500 dark:text-red-400 font-medium mb-6 text-center">
                🚫 Please log in to visit this link!
              </p>
              <a href="#home">
                <motion.button
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                  onClick={closeLoginMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Project;