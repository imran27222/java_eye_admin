import React, { useState, useEffect, useRef } from "react";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a reference for the dropdown menu

  const { user, token } = useSelector((state) => state.user); // Get user and token from the Redux store

  const dispatch = useDispatch(); // Get the dispatch function from the useDispatch hook

  const handleLogout = async () => {
    const { logout } = await import("../../store/user/userSlice"); // Import the logout action
    dispatch(logout()); // Dispatch the logout action
    setDropdownOpen(false); // Close the dropdown
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-700 text-white p-4 flex justify-between items-center relative">
      <Link to={"/"} className="text-white hover:text-gray-300">
        <h1 className="text-xl font-bold">GFT TREASURE</h1>
      </Link>

      <div className="flex items-center space-x-4">
        {!token ? (
          // Login Button
          <Link to={"/login"}>
            <button className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500">Login</button>
          </Link>
        ) : (
          // Profile Dropdown
          <div className="relative">
            <div className="w-8 h-8 bg-[#4a5568] rounded-full flex items-center justify-center cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span className="text-white font-bold">{user?.userName?.charAt(0).toUpperCase() || "U"}</span>
            </div>
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 bg-[#3a4450] text-gray-300 shadow-lg rounded-md w-48 z-10">
                {/* Username */}
                <p className="px-4 py-2 border-b border-gray-600 text-sm font-medium text-gray-400">{user?.userName || "Username"}</p>

                {/* Go to Profile */}
                <Link to="/profile">
                  <div className="flex items-center px-4 py-2 hover:bg-[#2d3748] hover:text-white cursor-pointer rounded-md">
                    <span className="text-gray-400 font-medium">Go to Profile</span>
                  </div>
                </Link>

                {/* History */}
                <Link to="/history">
                  <div className="flex items-center px-4 py-2 hover:bg-[#2d3748] hover:text-white cursor-pointer rounded-md">
                    <span className="text-gray-400 font-medium">History</span>
                  </div>
                </Link>

                {/* Assets */}
                {/* <Link to="/assets">
                  <div className="flex items-center px-4 py-2 hover:bg-[#2d3748] hover:text-white cursor-pointer rounded-md">
                    <span className="text-gray-400 font-medium">Assets</span>
                  </div>
                </Link> */}

                {/* Logout */}
                <div onClick={handleLogout} className="flex items-center px-4 py-2 hover:bg-[#2d3748] hover:text-white cursor-pointer rounded-md">
                  <PowerIcon className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-red-500 font-medium">Logout</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
