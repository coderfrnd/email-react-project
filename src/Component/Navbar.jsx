import React from "react";

const Navbar = () => {
  return (
    <>
      <header className="flex pl-[80px]">
        <ul className="flex space-x-12 p-6">
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
