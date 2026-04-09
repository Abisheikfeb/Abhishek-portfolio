import React, { useState, useEffect, useCallback } from "react";
import { items } from "./items";

export default function MultiFilters() {
  const [activeFilter, setActiveFilter] = useState("SHOW ALL");
  const [filteredItems, setFilteredItems] = useState(items);

  const filters = ["SHOW ALL", "LANGUAGES", "FRAME WORK", "VERSIONS", "DATABASE"];

  const handleFilterButtonClick = (selectedCategory) => {
    setActiveFilter(selectedCategory);
  };

  const filterItems = useCallback(() => {
    if (activeFilter && activeFilter !== "SHOW ALL") {
      const tempItems = items.filter((item) => item.category === activeFilter);
      setFilteredItems(tempItems);
    } else {
      setFilteredItems(items);
    }
  }, [activeFilter]);

  useEffect(() => {
    filterItems();
  }, [activeFilter, filterItems]);

  return (
    <div id="myskill" className="min-h-screen bg-[#f8fafc] py-20 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">Expertise</h2>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Stack.</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          A comprehensive look at the languages, frameworks, and tools I use to build robust applications.
        </p>
      </div>

      {/* Modern Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
        {filters.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterButtonClick(category)}
            className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 border ${
              activeFilter === category
                ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200"
                : "bg-white text-slate-500 border-slate-100 hover:border-blue-200 hover:text-blue-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.name}
            className="group relative bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center"
          >
            {/* Icon Container */}
            <div className="relative mb-4 w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors duration-500"></div>
              <img
                src={item.images}
                alt={item.name}
                className="relative w-12 h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Label */}
            <p className="text-sm font-black text-slate-400 group-hover:text-slate-900 uppercase tracking-tighter transition-colors">
              {item.name}
            </p>

            {/* Subtle category tag on hover */}
            <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full transition-opacity">
              {item.category}
            </span>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 italic">No skills found in this category.</p>
        </div>
      )}
    </div>
  );
}