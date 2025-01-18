import React from "react";
import { useSelector } from "react-redux";

function YourCollection() {
  const { lastPurchase } = useSelector((store) => store.user);

  if (!lastPurchase?.items) {
    return null;
  }
  return (
    <div className="w-full max-w-4xl mt-8">
      <div className="p-4 bg-gray-800 rounded-lg">
        <h2 className="text-pink-500 text-lg font-semibold mb-2">Your Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lastPurchase?.items?.map((nft, index) => (
            <div key={index} className="p-4 bg-gray-900 rounded-md shadow-md text-center">
              <p className="text-gray-300">NFT</p>
              <p className="text-pink-500 font-semibold">
                {nft.product_name} <span>{nft.product_price} USD</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default YourCollection;
