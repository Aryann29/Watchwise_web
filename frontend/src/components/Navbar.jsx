import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Searchmovie from './Searchmovie';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 ">
      <div className="mx-auto px-4 h-16 py-3 max-w-7xl flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/watchwise" className="logo  text-gray-200 hover:text-gray-100 text-xl font-bold">
            WATCHWISE
          </Link>
          
        </div>
  <Searchmovie/>
        <div
          className={`${
            isOpen ? '' : 'hidden'
          } lg:block  lg:items-center lg:static  flex flex-col absolute right-0 top-12 z-20 `}
        >
        
          {/* <Link
            to="/watchlist"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-gray-100 lg:bg-gray-800 bg-gray-700 h-5 mr-4"
          >
            Watchlist
          </Link> */}
          {/* <Link
            to="/watchwise/chatbot"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-gray-100 mr-4"
          >
            Chatbot
          </Link> */}
          <Link
            to="/watchwise/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-gray-100 mr-4"
          >
            About
          </Link>

            <Link
            to="/watchwise/contact"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-gray-100 mr-4"
          >
            Contact
          </Link>
    </div>
    <button
            type="button"
            className="block lg:hidden mr-7 text-gray-200 hover:text-gray-100 focus:outline-none focus:shadow-outline-purple"
            onClick={toggleNavbar}
          >
            <svg
              className="h-8 w-8 fill-current"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.293 4.293a1 1 0 011.414 0l1 1a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414l1-1a1 1 0 011.414 0L12 10.586l7.293-7.293a1 1 0 011.414 0zM4 8a1 1 0 100 2h16a1 1 0 100-2H4z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zM4 11a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zM4 16a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z"
                />
              )}
            </svg>
          </button>
  </div>
</nav>
);
};

export default Navbar;