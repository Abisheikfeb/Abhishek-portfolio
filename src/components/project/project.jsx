import React, { useState, useEffect, useCallback } from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'; 
import { FiExternalLink } from "react-icons/fi";
import { IoClose } from 'react-icons/io5';
import image1 from '../../assets/onlinebanking.svg';
import image2 from '../../assets/weather.svg';
import image3 from '../../assets/spam.svg';
import image4 from '../../assets/chat.svg';
import image5 from '../../assets/calculator.svg';
import image6 from '../../assets/youtube.svg';
import axios from 'axios';

const initialData = [
  { id: 1, src: image1, alt: 'JAVA', link:'https://abisheikfeb.github.io/tic-ta-to/' },
  { id: 2, src: image2, alt: 'C#', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 3, src: image3, alt: 'PYTHON', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 4, src: image4, alt: 'PYTHON', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 5, src: image5, alt: 'C#', link: 'https://abisheikfeb.github.io/tempmessage/' },
  { id: 6, src: image6, alt: 'java', link: 'https://abisheikfeb.github.io/tempmessage/' },
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
    setShowMore(true); // Only show more, no toggle back
  };

  return (
    <div id='projects' className="mt-12">
      <h1 className="text-center font-medium mt-10 text-3xl">
        <span className="text-red-400 text-5xl">P</span>ROJECTS
      </h1>

      <div className="flex flex-col gap-5 mt-5 md:flex-row px-10 md:justify-center">
        {initialData.slice(0, showMore ? initialData.length : 3).map((image) => (
          <div key={image.id} className="bg-gray-300 shadow-lg rounded-lg px-10 relative overflow-hidden">
            <div className="flex justify-center items-center pt-4">
              <img src={image.src} alt={image.alt} className="w-32 h-32 object-contain" />
            </div>
            <div className="p-4">
              <p className="text-lg text-center text-red-400">{image.alt}</p>
            </div>

            <div className="flex justify-between items-center pb-4">
              <button
                onClick={() => handleLikeClick(image.id)}
                className={`flex justify-end text-red-400 p-1 transition-transform ${likedProjects.has(image.id) ? 'scale-125 text-red-600' : ''}`}
              >
                <div className="flex gap-2">
                  {likedProjects.has(image.id) ? (
                    <IoIosHeart className="text-3xl text-red-600" />
                  ) : (
                    <IoIosHeartEmpty className="text-3xl text-gray-500" />
                  )}
                  <span className="text-black font-semibold">{likeCounts[image.id] || 0}</span>
                </div>
              </button>

              <button
                onClick={() => handleLinkClick(image.link)}
                className="text-blue-500 hover:text-yellow-300"
              >
                <FiExternalLink className="flex mb-2" size={24} />
              </button>
            </div>

            {celebrationProject === image.id && (
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="animate-ping absolute h-24 w-24 rounded-full bg-yellow-400 opacity-50"></div>
                <div className="animate-ping absolute h-32 w-32 rounded-full bg-red-300 opacity-50"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        {!showMore && (
          <button
            onClick={toggleShowMore}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:scale-105 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform"
          >
            Show More
          </button>
        )}
      </div>

      {showLoginMessage && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white border-2 border-red-500 p-6 rounded-lg text-center relative w-80">
            <IoClose
              className="absolute top-2 right-2 text-2xl cursor-pointer text-gray-600 hover:text-red-600"
              onClick={closeLoginMessage}
            />
            <p className="text-lg mb-4 text-red-400 font-medium">
              🚫 Please log in to visit this link!
            </p>
            <a href="#home">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={closeLoginMessage}>
                Login
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;


