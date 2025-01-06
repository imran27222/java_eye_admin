import React from "react";
const TextBanner = () => {
  return (
    <div className="bg-black p-4">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex justify-between items-center text-white">
        <div className="text-white w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-lg">For Big Investments, Contact GFT Trader</div>
        </div>
      </div>
    </div>
  );
};

export default TextBanner;
