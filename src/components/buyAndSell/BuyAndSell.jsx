import React from "react";

const BuyAndSell = () => {
  return (
    <div className="bg-black flex justify-center gap-4 py-4">
      <button className="bg-green-600 text-white px-6 py-2 rounded shadow-md hover:bg-green-700">BUY</button>
      <button className="bg-red-600 text-white px-6 py-2 rounded shadow-md hover:bg-red-700">SELL</button>
    </div>
  );
};

export default BuyAndSell;
