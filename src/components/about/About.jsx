import React from 'react';
import { FaJava, FaCode, FaBrain } from "react-icons/fa"; 
import { TbBrandCSharp } from "react-icons/tb";
import { SiPython, SiTensorflow, SiPytorch } from "react-icons/si"; 
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


const data = [
  { epoch: '10', Accuracy: 45 },
  { epoch: '20', Accuracy: 58 },
  { epoch: '30', Accuracy: 72 },
  { epoch: '40', Accuracy: 81 },
  { epoch: '50', Accuracy: 89 },
  { epoch: '60', Accuracy: 94 },
  { epoch: '70', Accuracy: 97 },
];

const About = () => {
  return (
    <div id="aboutme" className="min-h-screen bg-[#f8fafc] py-24 px-6 md:px-12 lg:px-20 font-sans overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-blue-600 font-black tracking-[0.2em] uppercase text-xs mb-4">Introduction</h2>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
          Know <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Who I Am.</span>
        </h1>
        <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
        
        
        <div className="group bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center lg:items-start hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 text-2xl group-hover:scale-110 transition-transform">
              <FaBrain />
            </div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">AI & ML Stack</h3>
          </div>

          
          <div className="relative flex items-center justify-center w-48 h-48 mb-10">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-50" />
              <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="12" strokeDasharray={527} strokeDashoffset={527 - (527 * 92) / 100} strokeLinecap="round" fill="transparent" className="text-indigo-600 transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-slate-900">92%</span>
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Python & AI</span>
            </div>
          </div>

          <div className="w-full space-y-4">
            <SkillItem icon={<SiPython className="text-blue-500" />} name="Python Ecosystem" color="bg-blue-50/50" />
            <SkillItem icon={<SiTensorflow className="text-orange-500" />} name="TensorFlow / Keras" color="bg-orange-50/50" />
            <SkillItem icon={<SiPytorch className="text-red-500" />} name="PyTorch Deep Learning" color="bg-red-50/50" />
          </div>
        </div>

        
        <div className="flex flex-col justify-between bg-slate-900 p-10 md:p-14 rounded-[40px] text-white shadow-2xl lg:-translate-y-4 relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/30 transition-all"></div>
          
          <div className="relative z-10">
            <p className="text-2xl md:text-3xl font-medium leading-[1.4] mb-8">
              As an <span className="text-blue-400 font-black">AI Developer</span>, I bridge the gap between complex data and intelligent automation.
            </p>
            <div className="h-1 w-12 bg-blue-500 mb-8 rounded-full"></div>
            <p className="text-slate-400 leading-relaxed text-lg font-light italic">
              "Focused on Computer Vision and Predictive Modeling, I aim to build systems that learn, adapt, and solve real-world challenges."
            </p>
          </div>

          <div className="flex items-end justify-between pt-12 relative z-10">
            <div className="space-y-1">
              <p className="text-4xl font-black text-blue-500 tracking-tighter">Student</p>
              <p className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em]">Learning AI</p>
            </div>
            <div className="h-12 w-px bg-slate-800"></div>
            <div className="space-y-1 text-right">
              <p className="text-4xl font-black text-white tracking-tighter">MCA</p>
              <p className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.2em]">Specialist</p>
            </div>
          </div>
        </div>

        
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Model Performance</h3>
            <p className="text-sm text-slate-500 font-medium">Training Accuracy over Epochs (Python/TF)</p>
          </div>

          <div className="flex-grow w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="epoch" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                   formatter={(value) => [`${value}%`, 'Accuracy']}
                   contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '15px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }} />
                <Line type="monotone" dataKey="Accuracy" stroke="#6366f1" strokeWidth={5} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 8, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <p className="mt-8 text-xs text-slate-400 font-bold text-center uppercase tracking-widest italic">
            Visualizing optimization and loss reduction
          </p>
        </div>

      </div>
    </div>
  );
};

const SkillItem = ({ icon, name, color }) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl ${color} border border-transparent hover:border-slate-200 hover:bg-white transition-all duration-300 group/item cursor-default`}>
    <span className="text-2xl group-hover/item:rotate-12 transition-transform">{icon}</span>
    <span className="font-bold text-slate-700">{name}</span>
  </div>
);

export default About;