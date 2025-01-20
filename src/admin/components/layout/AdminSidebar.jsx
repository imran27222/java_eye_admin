import React from "react";
import { Link } from "react-router-dom";
import { BanknotesIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const AdminSidebar = ({ isOpen, onClose }) => {
  return (
    <aside className={`fixed z-30 top-0 left-0 h-screen w-64 bg-blue-100 text-gray-800 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
      <div className="p-4 text-xl font-bold text-blue-800">Admin Menu</div>
      <nav className="flex flex-col space-y-2 px-4">
        <Link to="/admin/withdraw" className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-200">
          <ArrowDownTrayIcon className="w-5 h-5 mr-2 text-blue-800" />
          Withdraw
        </Link>
        <Link to="/admin/deposit" className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-200">
          <BanknotesIcon className="w-5 h-5 mr-2 text-blue-800" />
          Deposit
        </Link>
      </nav>

      {/* Close Button for Mobile */}
      <button onClick={onClose} className="absolute top-4 right-4 text-blue-600 md:hidden">
        Close
      </button>
    </aside>
  );
};

export default AdminSidebar;
