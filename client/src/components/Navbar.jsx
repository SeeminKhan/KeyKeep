import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-lg font-bold">KeyKeep</span>
        </div>
        <div className="block md:hidden">
          <button
            onClick={toggleNavbar}
            className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 6L5 6v-.5C5 4.57 6.57 3 8.5 3H15c1.93 0 3.5 1.57 3.5 3.5v.5zm-4 3v9a1 1 0 01-1 1H8a1 1 0 01-1-1v-9H5v9a3 3 0 003 3h6a3 3 0 003-3v-9h-1z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 9L5 9v-.5C5 6.57 6.57 5 8.5 5H15c1.93 0 3.5 1.57 3.5 3.5V9zm-4 3v9a1 1 0 01-1 1H8a1 1 0 01-1-1v-9H5v9a3 3 0 003 3h6a3 3 0 003-3v-9h-1z"
                />
              )}
            </svg>
          </button>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row md:space-x-4">
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
