import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AdminTopbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    console.log("Logout clicked");
    setIsDropdownOpen(false);
    // Perform logout logic here
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-2 relative">
      {/* Hamburger Menu */}
      <button onClick={onMenuClick} className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none">
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Admin Dashboard Title */}
      <h1 className="text-lg font-semibold cursor-pointer text-gray-800" onClick={() => navigate("/admin")}>
        Admin Dashboard
      </h1>

      {/* Profile Icon */}
      <div className="relative">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="focus:outline-none">
          <UserCircleIcon className="w-8 h-8 text-gray-600 cursor-pointer" />
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 text-gray-700">
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminTopbar;
