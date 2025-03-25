import React from "react";

const Navbar = ({ handleButtonClick }) => {
  return (
    <>
      <header className="flex pl-[80px]">
        <ul
          className="flex space-x-12 p-6 cursor-pointer"
          onClick={(e) => handleButtonClick(e.target.textContent)}
        >
          <span>Filter By:</span>
          <li>Unread</li>
          <li>Read</li>
          <li>Favorites</li>
        </ul>
      </header>
    </>
  );
};

export default Navbar;
