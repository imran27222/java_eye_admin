import React, { useEffect, useState } from "react";
import withAuth from "../components/hoc/withAuth";
import { findExactNfts } from "../utils/findNFTs";
import nfts from "../data/nfts";

const NFTBuy = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [investedBalance, setInvestedBalance] = useState(10);
  const [totalEarning, setTotalEarning] = useState(0);
  const [todayEarning, setTodayEarning] = useState(14.8);
  const [reservationRange, setReservationRange] = useState("1-1000");
  const [profitRate, setProfitRate] = useState("0-3%");
  const [nftNumber, setNFTNumber] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [userNFTs, setUserNFTs] = useState(["NFT #101", "NFT #202", "NFT #303"]);
  const [activeTab, setActiveTab] = useState("appointment"); // "appointment" or "collection"

  const handleNFTNumberChange = (e) => setNFTNumber(e.target.value);
  const handleAmountChange = (e) => setSelectedAmount(Number(e.target.value));

  useEffect(() => {
    // Example Usage
    const selectedNfts = findExactNfts(nfts, selectedAmount);

    console.log(selectedAmount, " USDT ---- Selected NFTs:", selectedNfts);
  }, [selectedAmount]);
  const handleBuyNow = () => {
    if (!nftNumber) {
      alert("Please enter an NFT number!");
      return;
    }
    alert(`NFT #${nftNumber} purchased for ${selectedAmount} USDT!`);
    setUserNFTs((prev) => [...prev, `NFT #${nftNumber}`]);
    setNFTNumber("");
  };

  const renderTabContent = () => {
    const appointments = [
      { name: "Appointment 1", time: "10:00 AM" },
      { name: "Appointment 2", time: "2:00 PM" },
      { name: "Appointment 3", time: "4:00 PM" },
    ];

    const userNFTs = ["NFT 1", "NFT 2", "NFT 3"];

    if (activeTab === "appointment") {
      return (
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-pink-500 text-lg font-semibold mb-2">Today's Appointments</h2>
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="p-4 bg-gray-900 rounded-md shadow-md text-center">
                <p className="text-gray-300">{appointment.name}</p>
                <p className="text-pink-500 font-semibold">{appointment.time}</p>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (activeTab === "collection") {
      return (
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-pink-500 text-lg font-semibold mb-2">Your Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userNFTs.map((nft, index) => (
              <div key={index} className="p-4 bg-gray-900 rounded-md shadow-md text-center">
                <p className="text-gray-300">NFT</p>
                <p className="text-pink-500 font-semibold">{nft}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center p-6">
      <h1 className="text-3xl text-pink-500 font-semibold mb-6">GFT BUY</h1>

      {/* Balance and Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-6">
        <div className="p-4 bg-gray-800 rounded-lg text-center">
          <p>Wallet Balance:</p>
          <p className="text-lg font-semibold text-pink-500">{walletBalance} USDT</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg text-center">
          <p>Total Earning:</p>
          <p className="text-lg font-semibold text-pink-500">{totalEarning.toFixed(2)} USDT</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg text-center">
          <p>Reservation Range:</p>
          <p className="text-lg font-semibold text-pink-500">{reservationRange} USDT</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg text-center">
          <p>Invested Balance:</p>
          <p className="text-lg font-semibold text-pink-500">{investedBalance} USDT</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg text-center">
          <p>Today Earning:</p>
          <p className="text-lg font-semibold text-pink-500">{todayEarning.toFixed(2)} USDT</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg text-center">
          <p>Profit Rate:</p>
          <p className="text-lg font-semibold text-pink-500">{profitRate}</p>
        </div>
      </div>

      {/* Buy NFT Section */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
        {/* <div className="flex gap-2">
          <button onClick={() => setNFTNumber((prev) => (prev > 1 ? prev - 1 : 1))} className="bg-gray-800 px-4 py-2 rounded-md text-pink-500 font-bold hover:bg-pink-500 hover:text-gray-900">
            -
          </button>
          <input type="number" value={nftNumber} onChange={handleNFTNumberChange} placeholder="Number" className="p-3 w-32 bg-gray-800 text-pink-500 font-bold text-center rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
          <button onClick={() => setNFTNumber((prev) => (prev ? +prev + 1 : 1))} className="bg-gray-800 px-4 py-2 rounded-md text-pink-500 font-bold hover:bg-pink-500 hover:text-gray-900">
            +
          </button>
        </div> */}
        <select value={selectedAmount} onChange={handleAmountChange} className="p-3 bg-gray-800 text-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
          <option value="0">Select Amount</option>
          <option value="50">50 USDT</option>
          <option value="100">100 USDT</option>
          <option value="150">150 USDT</option>
          <option value="200">200 USDT</option>
          <option value="250">250 USDT</option>
          <option value="300">300 USDT</option>
          <option value="350">350 USDT</option>
          <option value="400">400 USDT</option>
          <option value="450">450 USDT</option>
          <option value="500">500 USDT</option>
          <option value="550">550 USDT</option>
          <option value="600">600 USDT</option>
          <option value="650">650 USDT</option>
          <option value="700">700 USDT</option>
          <option value="750">750 USDT</option>
          <option value="800">800 USDT</option>
          <option value="850">850 USDT</option>
          <option value="900">900 USDT</option>
          <option value="950">950 USDT</option>
          <option value="1000">1000 USDT</option>
        </select>
      </div>
      <button onClick={handleBuyNow} className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-bold hover:bg-blue-600">
        Buy Now
      </button>

      {/* Tabs */}
      <div className="flex gap-4 mt-6">
        <button onClick={() => setActiveTab("appointment")} className={`px-4 py-2 rounded-md font-bold ${activeTab === "appointment" ? "bg-pink-500 text-gray-900" : "bg-gray-800 text-pink-500 hover:bg-pink-500 hover:text-gray-900"}`}>
          Today's Appointment
        </button>
        <button onClick={() => setActiveTab("collection")} className={`px-4 py-2 rounded-md font-bold ${activeTab === "collection" ? "bg-pink-500 text-gray-900" : "bg-gray-800 text-pink-500 hover:bg-pink-500 hover:text-gray-900"}`}>
          Collection
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full max-w-4xl mt-8">{renderTabContent()}</div>
    </div>
  );
};

export default withAuth(NFTBuy);
