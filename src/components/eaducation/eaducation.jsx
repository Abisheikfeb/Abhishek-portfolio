import React from 'react';
import { FaGraduationCap, FaSchool, FaCertificate } from "react-icons/fa";
import { GiSchoolBag } from "react-icons/gi";
import { RiPresentationLine } from "react-icons/ri";

const MySkill = () => {
  const educationData = [
    {
      title: "HSE - Maths Computer",
      location: "Model School Dharmapuri",
      icon: <FaSchool className="text-amber-500" />,
      type: "Schooling",
      color: "border-amber-200"
    },

    {
      title: "MCA - AI, ML & Data Science",
      location: "Ongoing - s vyasa deemed to be university bangalore", 
      icon: <RiPresentationLine className="text-emerald-500" />,
      type: "Post Graduation",
      color: "border-emerald-200"
    },

    {
      title: "BCA - Computer Applications",
      location: "Don Bosco College",
      icon: <GiSchoolBag className="text-blue-500" />,
      type: "College",
      color: "border-blue-200"
    },
    {
      title: "Oracle Database",
      location: "Oracle University",
      icon: <RiPresentationLine className="text-red-500" />,
      type: "Specialization",
      color: "border-red-200"
    },
    {
      title: "Cyber Security",
      location: "Standards and Regulations",
      icon: <FaCertificate className="text-purple-500" />,
      type: "Certification",
      color: "border-purple-200"
    }
  ];

  return (
    <div id="education" className="min-h-screen bg-[#f8fafc] py-20 px-6 font-sans">
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-red-500 font-bold tracking-widest uppercase text-sm mb-3">Academic Path</h2>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">Education.</span>
        </h1>
      </div>

  
      <div className="max-w-5xl mx-auto relative">
        
       
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-red-400 via-purple-400 to-transparent opacity-30"></div>

      
        <div className="flex justify-center mb-12 relative z-10">
          <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce">
            <FaGraduationCap className="text-5xl text-slate-800" />
          </div>
        </div>

        <div className="space-y-12">
          {educationData.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center justify-between w-full group ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
             
              <div className="hidden md:block w-[45%]"></div>

              
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-red-500 shadow-sm z-20 group-hover:scale-150 transition-transform"></div>

              
              <div className={`w-full md:w-[45%] bg-white p-6 rounded-3xl shadow-sm border ${item.color} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative`}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-slate-50 text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-slate-500 text-sm pl-1 border-l-2 border-slate-100 ml-3 py-1">
                  {item.location}
                </p>

                
                <div className="md:hidden absolute -top-6 left-1/2 -translate-x-1/2 h-6 w-0.5 bg-slate-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySkill; 