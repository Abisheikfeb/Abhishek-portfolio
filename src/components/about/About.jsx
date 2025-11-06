import React from 'react';
import { FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { SiSpringboot } from "react-icons/si";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const About = () => {
  // Sample data for chart
  const data = [
    { time: 'Jan', Python: 4000, Java: 2400 },
    { time: 'Feb', Python: 3000, Java: 1398 },
    { time: 'Mar', Python: 2000, Java: 9800 },
    { time: 'Apr', Python: 2780, Java: 3908 },
    { time: 'May', Python: 1890, Java: 4800 },
    { time: 'Jun', Python: 2390, Java: 3800 },
    { time: 'Jul', Python: 3490, Java: 4300 },
  ];

  return (
    <div id="aboutme"  className=" bg-gradient-to-b from-pink-300 to-zinc-400 p-6 md:p-12">
      <h1 className="text-center text-4xl md:text-5xl font-semibold">
        <span className="text-red-500">A</span>bout Me
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">

        {/* Left - Skills */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <h1 className="text-2xl md:text-4xl font-semibold text-center md:text-start">
            I work on
          </h1>
          <p className="text-xl text-gray-500 text-center md:text-start">Some of my key skills</p>

          {/* Progress Circle */}
          <div className="w-40 h-40 md:w-48 md:h-48">
            {/* Replace with your circular progress if needed */}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <FaJava className="text-5xl text-orange-600" />
              <h3 className="text-2xl font-medium">Java</h3>
            </div>
            <div className="flex items-center gap-4">
              <TbBrandCSharp className="text-5xl text-blue-600" />
              <h3 className="text-2xl text-red-600 font-medium">C#</h3>
            </div>
            <div className="flex items-center gap-4">
              <SiSpringboot className="text-5xl text-green-700" />
              <h3 className="text-2xl text-blue-500 font-medium">Spring Boot</h3>
            </div>
          </div>
        </div>

        {/* Middle - Description */}
        <div className="flex flex-col justify-center md:justify-start items-center md:items-start space-y-6 border-l-2 border-r-2 border-gray-300 px-4 md:px-8">
          <p className="text-lg md:text-xl text-blue-100 text-center md:text-start leading-relaxed">
            As a Java and backend developer, I specialize in designing and implementing
            server-side logic, ensuring that applications run smoothly and efficiently.
          </p>
          <p className="text-lg md:text-xl text-blue-100 text-center md:text-start leading-relaxed">
            My expertise lies in creating scalable APIs, managing databases, and optimizing
            system performance.
          </p>
        </div>

        {/* Right - Chart */}
        <div className="w-full bg-white border-2 p-6 shadow-xl rounded-lg">
          <h2 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-start">Python vs Java Trends</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Python" stroke="#1f77b4" strokeWidth={3} />
              <Line type="monotone" dataKey="Java" stroke="#ff4d4d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default About;
