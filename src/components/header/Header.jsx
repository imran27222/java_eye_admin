import React from "react";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-700 text-white p-4 flex justify-between items-center relative">
      <h1 className="text-xl font-bold">GFT TREASURE</h1>
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </div>
        {/* Menu Icon */}
        <Bars3Icon className="h-6 w-6" />
      </div>
    </header>
  );
};

export default Header;
