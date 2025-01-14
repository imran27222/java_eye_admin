import React from "react";
import { Link } from "react-router-dom";
import { AcademicCapIcon, PhoneIcon, ClipboardDocumentListIcon, ShieldCheckIcon, HomeIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-700 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Logo Section */}
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold">GFT TREASURE</h2>
            <p className="text-gray-300 mt-2">The best treasure awaits you.</p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 mb-4 sm:mb-0">
            <Link to="/" className="flex items-center text-white hover:text-gray-300 transition duration-200">
              <HomeIcon className="h-5 w-5 mr-2" />
              Home
            </Link>
            <Link to="/about" className="flex items-center text-white hover:text-gray-300 transition duration-200">
              <AcademicCapIcon className="h-5 w-5 mr-2" />
              About Us
            </Link>
            <Link to="/privacy-policy" className="flex items-center text-white hover:text-gray-300 transition duration-200">
              <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="flex items-center text-white hover:text-gray-300 transition duration-200">
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-6 text-sm text-gray-300">
          <p>&copy; 2025 GFT TREASURE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
