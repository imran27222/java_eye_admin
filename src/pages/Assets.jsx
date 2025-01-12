import React from "react";

const Assets = () => {
  const levels = [
    { level: 1, amount: "$500", color: "bg-green-500" },
    { level: 2, amount: "$800", color: "bg-blue-500" },
    { level: 3, amount: "$1,200", color: "bg-orange-500" },
    { level: 4, amount: "$1,800", color: "bg-purple-500" },
    { level: 5, amount: "$2,000", color: "bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-[#1a202c] flex flex-col items-center p-6">
      {/* User Info */}
      <div className="bg-[#2d3748] rounded-lg shadow-lg p-6 w-full max-w-md text-center mb-6">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="https://via.placeholder.com/100" // Placeholder avatar
            alt="Avatar"
            className="w-20 h-20 rounded-full border-4 border-pink-500"
          />
          <div>
            <h2 className="text-white text-2xl font-semibold">Name</h2>
            <p className="text-gray-400">Level 5</p>
          </div>
        </div>
      </div>

      {/* Total Balance */}
      <div className="bg-[#2d3748] rounded-lg shadow-lg p-6 w-full max-w-xl text-center">
        <h2 className="text-lg text-gray-300 font-medium">Total Balance</h2>
        <p className="text-4xl text-green-400 font-bold my-4">$50,000</p>

        {/* Levels */}
        <div className="flex justify-around mt-4">
          {levels.map((level) => (
            <div key={level.level} className={`flex flex-col items-center text-sm text-white font-medium px-3 py-2 rounded-full ${level.color}`}>
              <p>Level {level.level}</p>
              <p>{level.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-around w-full max-w-xl mt-8">
        {["Deposit", "Withdraw", "Reward", "Team Earning"].map((button, idx) => (
          <button key={idx} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md text-sm font-medium hover:bg-blue-600 transition duration-200">
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Assets;
