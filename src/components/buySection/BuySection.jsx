import React, { useEffect, useState } from "react";
import { findExactNfts } from "../../utils/findNFTs";
import nfts from "../../data/nfts";
import { useSelector } from "react-redux";

function BuySection() {
  const { lastPurchase } = useSelector((store) => store.user);

  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleAmountChange = (e) => setSelectedAmount(Number(e.target.value));

  const handleBuyNow = () => {
    // alert(`NFT #${nftNumber} purchased for ${selectedAmount} USDT!`); // change in toast
    const selectedNfts = findExactNfts(nfts, selectedAmount);
  };

  if (lastPurchase) {
    return null;
  }

  return (
    <>
      {/* Buy NFT Section */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
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
    </>
  );
}

export default BuySection;
