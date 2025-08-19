import React from 'react';
import { FaGraduationCap } from "react-icons/fa";
import { FaSchool } from "react-icons/fa6";
import { GiSchoolBag } from "react-icons/gi";
import { RiPresentationLine } from "react-icons/ri";

const MySkill = () => {
  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <h1 className="text-center font-medium text-3xl">
        <span className="text-red-500 text-4xl">My</span> Education
      </h1>

      {/* Timeline Container */}
      <div className="flex flex-col items-center mt-10 relative">
        
        {/* Graduation Cap Icon */}
        <div className="text-6xl md:text-8xl text-purple-500">
          <FaGraduationCap />
        </div>

        {/* Vertical Line */}
        <div className="h-10 w-1 bg-orange-500"></div>

        {/* Education Cards */}
        <div className="space-y-6">
          {/* High School */}
          <div className="w-80 md:w-96 border-2 border-red-300 rounded-md p-3 shadow-md">
            <h1 className="text-lg font-semibold">HSE</h1>
            <div className="flex items-center gap-2 mt-1">
              <FaSchool className="text-yellow-300 text-xl" />
              <p className="text-sm">Maths Computer at Model School Dharmapuri</p>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="h-10 w-1 bg-orange-500 mx-auto"></div>

          {/* College */}
          <div className="w-80 md:w-96 border-2 border-red-300 rounded-md p-3 shadow-md">
            <h1 className="text-lg font-semibold">College</h1>
            <div className="flex items-center gap-2 mt-1">
              <GiSchoolBag className="text-yellow-300 text-xl" />
              <p className="text-sm">Computer Applications at Don Bosco College</p>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="h-10 w-1 bg-orange-500 mx-auto"></div>

          {/* Oracle Course */}
          <div className="w-80 md:w-96 border-2 border-red-300 rounded-md p-3 shadow-lg shadow-amber-500">
            <h1 className="text-lg font-semibold">Course</h1>
            <div className="flex items-center gap-2 mt-1">
              <RiPresentationLine className="text-yellow-300 text-xl" />
              <p className="text-sm">Oracle Database at Oracle University</p>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="h-10 w-1 bg-orange-500 mx-auto"></div>

          {/* Cyber Security Course */}
          <div className="w-80 md:w-96 border-2 border-red-300 rounded-md p-3 shadow-lg shadow-amber-500">
            <h1 className="text-lg font-semibold">Course</h1>
            <div className="flex items-center gap-2 mt-1">
              <RiPresentationLine className="text-yellow-300 text-xl" />
              <p className="text-sm">Cyber Security in Standards and Regulations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySkill;