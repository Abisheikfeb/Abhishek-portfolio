import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import Hero from './components/hero/hero';
import About from './components/about/About';
import Eaducation from './components/eaducation/eaducation';
import Myskill from './components/myskill/myskills';
import Project from './components/project/project';
import Certificate from './components/certificate/certificate';
import Contact from './components/contact/contact';
import Footer from './components/footer/footer';


function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <>
      <Navbar onLogin={handleLogin} user={user} />
      <Hero />
      <About />
      <Eaducation />
      <Myskill />
      <Project isLoggedIn={!!user} />
      <Certificate />
      <Contact />
      <Footer/>
      
      
    </>
  );
}

export default App;




