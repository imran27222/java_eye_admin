import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 border-t-4 border-blue-500">
      <div className="flex flex-wrap items-center justify-center gap-1">
        {/* Footer Buttons */}
        <Link to="/" className="text-white hover:text-gray-300  hover:border-gray-300">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition">Home</button>
        </Link>
        {/* <Link to="/assets" className="text-white hover:text-gray-300  hover:border-gray-300">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition">Assets</button>
        </Link> */}
        <Link to="/history" className="text-white hover:text-gray-300  hover:border-gray-300">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition">History</button>
        </Link>
        <Link to="/profile" className="text-white hover:text-gray-300  hover:border-gray-300  ">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition">Profile</button>
        </Link>
        <Link to="/login" className="text-white hover:text-gray-300  hover:border-gray-300">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition">Login</button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
