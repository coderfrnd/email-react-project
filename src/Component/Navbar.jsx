import React, { useState } from "react";

const Navbar = ({ handleButtonClick }) => {
  const [activeFilter, setActiveFilter] = useState("All");
  const handleClick = (filter) => {
    setActiveFilter(filter);
    handleButtonClick(filter);
  };

  return (
    <header className="flex pl-11 pt-4">
      <ul className="flex space-x-4 p-6 cursor-pointer">
        <span className=" p-2">Filter By:</span>
        {["All", "Unread", "Read", "Favorites"].map((filter) => (
          <li
            key={filter}
            className={` text-center p-2 h-10 w-24 rounded-full ${
              activeFilter === filter
                ? "bg-[#E1E4EA] text-[#636363] border border-[#CFD2DC] "
                : "bg-transparent"
            }`}
            onClick={() => handleClick(filter)}
          >
            {filter}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Navbar;
