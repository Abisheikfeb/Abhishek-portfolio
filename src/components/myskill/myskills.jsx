import React, { useState, useEffect, useCallback } from "react";
import { items } from "./items";

export default function MultiFilters() {
  const [activeFilter, setActiveFilter] = useState(null); // Single active filter
  const [filteredItems, setFilteredItems] = useState(items);

  const filters = ["SHOW ALL", "LANGUAGES", "FRAME WORK", "VERSIONS", "DATABASE"];

  // Handle clicking on a filter button
  const handleFilterButtonClick = (selectedCategory) => {
    setActiveFilter((prevFilter) =>
      prevFilter === selectedCategory ? null : selectedCategory // Toggle or activate
    );
  };

  // Filtering logic to update filteredItems based on activeFilter
  const filterItems = useCallback(() => {
    if (activeFilter && activeFilter !== "SHOW ALL") {
      const tempItems = items.filter((item) => item.category === activeFilter);
      setFilteredItems(tempItems);
    } else {
      setFilteredItems(items); // Show all items if "SHOW ALL" or no filter is active
    }
  }, [activeFilter]);

  useEffect(() => {
    filterItems();
  }, [activeFilter, filterItems]);

  return (
    <div id="myskill">
      <div className="font-medium text-3xl text-center mt-20">
        <h1>
          <span className="text-4xl text-red-400">MY</span> SKILLS
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-x-1 gap-y-1 text-sm mt-5 md:flex md:justify-center md:gap-4 ">
        {filters.map((category) => (
          <button
            onClick={() => handleFilterButtonClick(category)}
            className={`
              flex items-center justify-center border-2 bg-red-200 hover:bg-green-200 text-sm ml-4
              h-6 w-24 rounded-md text-black md:h-12 md:w-36 md:text-lg md:px-3 md:py-2 
              ${activeFilter === category ? "bg-green-300 border-green-600" : ""}
              ${category === "FRAME WORK" ? "whitespace-nowrap" : ""}
            `}
            key={category}
            aria-pressed={activeFilter === category}
            aria-label={`Filter by ${category}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-10">
        {filteredItems.map((item) => (
          <div
            key={item.name}
            className="border-2 border-red-500 bg-violet-300 shadow-lg shadow-yellow-500 rounded-md p-2 md:p-10 md:h-60"
          >
            <img
              src={item.images}
              alt={item.name}
              className="border-2 bg-white rounded-md border-yellow-300 h-15 w-20 md:h-28 md:w-28"
            />
            <p className="flex justify-center text-md text-black md:text-2xl md:justify-center md:mt-9">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
