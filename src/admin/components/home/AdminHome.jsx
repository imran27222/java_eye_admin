import React from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-8">
      {/* Deposit Card */}
      <Link to="/admin/deposit" className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-blue-800">Deposit</h2>
          <p className="text-gray-600 mt-2">Manage deposits requests</p>
        </div>
      </Link>

      {/* Withdraw Card */}
      <Link to="/admin/withdraw" className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-blue-800">Withdraw</h2>
          <p className="text-gray-600 mt-2">Manage withdrawals requests</p>
        </div>
      </Link>
    </div>
  );
};

export default AdminHome;
