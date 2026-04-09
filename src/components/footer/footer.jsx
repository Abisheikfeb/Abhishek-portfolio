import React from 'react';
import { FaLinkedin, FaGithub, FaArrowUp } from "react-icons/fa6";
import { GoMail } from "react-icons/go";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-100 py-10 px-6 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
          <h2 className="text-xl font-black text-slate-900 tracking-tighter">
            ABISHEIK<span className="text-blue-600">.</span>
          </h2>
        </div>

        
        <p className="text-slate-400 text-sm font-medium order-3 md:order-none">
          &copy; {new Date().getFullYear()} — Built with React
        </p>

       
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4 pr-5 border-r border-slate-100">
            <FooterIcon href="https://linkedin.com/..." icon={<FaLinkedin />} />
            <FooterIcon href="https://github.com/..." icon={<FaGithub />} />
            <FooterIcon href="mailto:..." icon={<GoMail />} />
          </div>


<button 
  onClick={scrollToTop}
  className="group flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-blue-50 rounded-xl transition-all active:scale-95 shadow-sm"
  aria-label="Back to top"
>
 
  <span className="text-black text-xs font-bold uppercase tracking-wider">
    Back to Top
  </span>


  <FaArrowUp 
    size={14} 
    className="text-black transition-transform group-hover:-translate-y-1" 
    style={{ stroke: "black", strokeWidth: "2" }} 
  />
</button>
         
        </div>

      </div>
    </footer>
  );
};


const FooterIcon = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-lg text-slate-400 hover:text-slate-900 transition-colors"
  >
    {icon}
  </a>
);

export default Footer;