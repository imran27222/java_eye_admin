import React, { useState } from "react";

const History = () => {
  const [activeTab, setActiveTab] = useState("investing");

  const investingHistory = [
    { description: "Invested $500 in NFT PixelProwler", date: "01/09/2024" },
    { description: "Invested $1000 in NFT CyberSage", date: "01/09/2024" },
    { description: "Invested $200 in NFT NeonPhoenix", date: "02/09/2024" },
  ];

  const withdrawHistory = [
    { description: "Withdrawn $300 to TRC20 Wallet", date: "01/10/2024" },
    { description: "Withdrawn $200 to ERC20 Wallet", date: "02/10/2024" },
    { description: "Withdrawn $100 to BTC Wallet", date: "03/10/2024" },
  ];

  return (
    <div className="min-h-screen bg-[#1a202c] flex flex-col items-center p-6">
      <h1 className="text-4xl text-pink-500 font-bold mb-6">HISTORY</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        <button onClick={() => setActiveTab("investing")} className={`px-4 py-2 rounded-md text-lg font-medium ${activeTab === "investing" ? "bg-pink-500 text-white" : "bg-[#2d3748] text-gray-300"} hover:bg-pink-600`}>
          Investing History
        </button>
        <button onClick={() => setActiveTab("withdraw")} className={`px-4 py-2 rounded-md text-lg font-medium ${activeTab === "withdraw" ? "bg-pink-500 text-white" : "bg-[#2d3748] text-gray-300"} hover:bg-pink-600`}>
          Withdraw History
        </button>
      </div>

      {/* History Content */}
      <div className="w-full max-w-2xl bg-[#2d3748] p-6 rounded-lg shadow-lg">
        {activeTab === "investing" && (
          <div>
            <h2 className="text-xl text-pink-500 font-semibold mb-4">Investing History</h2>
            <ul className="space-y-4">
              {investingHistory.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-[#4a5568] p-4 rounded-md text-gray-200">
                  <span>{item.description}</span>
                  <span className="text-sm text-gray-400">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "withdraw" && (
          <div>
            <h2 className="text-xl text-pink-500 font-semibold mb-4">Withdraw History</h2>
            <ul className="space-y-4">
              {withdrawHistory.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-[#4a5568] p-4 rounded-md text-gray-200">
                  <span>{item.description}</span>
                  <span className="text-sm text-gray-400">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
