import React, { useState } from "react";

const Deposit = () => {
  const [transactionNumber, setTransactionNumber] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);
  };

  const handleSubmit = () => {
    console.log({
      transactionNumber,
      screenshot,
    });
  };

  return (
    <div className="flex items-center justify-center bg-black">
      <div className="min-h-screen p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-4">Submit Recharge</h1>
        <p className="text-center text-gray-300 mb-4">
          <span className="font-bold">WalletADD:</span> <span className="text-red-500">TRC20</span>
        </p>
        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md mb-4">
          <p className="text-gray-300 truncate">TAVsDZyEZiibcU8xz4wb4JHt3S9bCoKa3x</p>
          <button onClick={() => navigator.clipboard.writeText("TAVsDZyEZiibcU8xz4wb4JHt3S9bCoKa3x")} className="text-pink-500 text-sm font-medium hover:underline">
            Copy
          </button>
        </div>
        <div className="flex justify-center mb-6">
          <img src="https://via.placeholder.com/150" alt="QR Code" className="w-32 h-32" />
        </div>
        <div className="mb-4">
          <label htmlFor="transactionNumber" className="block text-gray-300 font-medium mb-1">
            Transaction Number
          </label>
          <input
            id="transactionNumber"
            type="text"
            value={transactionNumber}
            onChange={(e) => setTransactionNumber(e.target.value)}
            placeholder="Please enter your transaction number"
            className="w-full bg-gray-800 text-gray-300 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="screenshot" className="block text-gray-300 font-medium mb-1">
            Recharge Screenshot Upload
          </label>
          <div className="border border-gray-700 bg-gray-800 p-6 rounded-md flex flex-col items-center justify-center">
            {screenshot ? (
              <p className="text-gray-300 text-sm">{screenshot.name}</p>
            ) : (
              <label className="cursor-pointer">
                <input id="screenshot" type="file" accept="image/*" onChange={handleScreenshotUpload} className="hidden" />
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v12m0 0l3.5-3.5M12 15l-3.5-3.5M4 13.5A8 8 0 0112 5.5a8 8 0 018 8v5h-4a1 1 0 01-1-1v-1h-6v1a1 1 0 01-1 1H4v-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-gray-500 mt-2 text-sm">Click to upload a screenshot</p>
                </div>
              </label>
            )}
          </div>
        </div>
        <button onClick={handleSubmit} className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition">
          OK to Recharge
        </button>
      </div>
    </div>
  );
};

export default Deposit;
