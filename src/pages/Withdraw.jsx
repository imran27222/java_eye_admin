import React from "react";

const Withdraw = () => {
  return (
    <div className="min-h-screen bg-[#1a202c] flex flex-col items-center justify-center">
      <h1 className="text-4xl text-pink-500 font-bold mb-8">Withdraw Now</h1>
      <div className="w-full max-w-md bg-[#2d3748] p-6 rounded-lg shadow-lg">
        <form>
          <div className="mb-4">
            <label htmlFor="wallet-address" className="block text-sm text-gray-300 font-medium mb-2">
              Wallet Address
            </label>
            <input type="text" id="wallet-address" placeholder="Enter wallet address" className="w-full px-4 py-2 rounded-lg bg-[#4a5568] text-gray-200 border border-[#718096] focus:outline-none focus:ring focus:ring-pink-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="wallet-type" className="block text-sm text-gray-300 font-medium mb-2">
              Wallet Type
            </label>
            <select id="wallet-type" className="w-full px-4 py-2 rounded-lg bg-[#4a5568] text-gray-200 border border-[#718096] focus:outline-none focus:ring focus:ring-pink-500">
              <option value="TRC20">TRC20</option>
              <option value="ERC20">ERC20</option>
              <option value="BTC">BTC</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="withdraw-amount" className="block text-sm text-gray-300 font-medium mb-2">
              Withdraw Amount
            </label>
            <input type="number" id="withdraw-amount" placeholder="Enter amount" className="w-full px-4 py-2 rounded-lg bg-[#4a5568] text-gray-200 border border-[#718096] focus:outline-none focus:ring focus:ring-pink-500" />
          </div>
          <button type="submit" className="w-full py-2 text-lg font-semibold text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition">
            Withdraw
          </button>
        </form>
      </div>
      <div className="mt-8 p-6 text-sm text-gray-200 bg-[#2d3748] rounded-lg max-w-lg shadow-lg">
        <h2 className="text-lg text-pink-500 font-semibold mb-4">Withdrawal Instructions</h2>
        <p className="mb-2">
          <strong>Wallet Address Confirmation:</strong> Please confirm whether the wallet address is correct. If the information is incorrectly filled in, we will not be responsible for your loss.
        </p>
        <p className="mb-2">
          <strong>Processing Time:</strong> The withdrawal amount will be processed within 2 to 72 hours.
        </p>
        <p>
          <strong>Withdrawal Limit:</strong> You can only apply for 1 withdrawal per day.
        </p>
      </div>
    </div>
  );
};

export default Withdraw;
