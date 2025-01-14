import React from "react";
import { CreditCardIcon, CurrencyDollarIcon, GiftIcon, ShareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const MyAssetsCard = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="bg-black p-4">
      {/* <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center text-white"> */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col gap-4 justify-between items-center text-white">
        {/* Left Section */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">
            My Assets: <span className="font-bold text-yellow-500">{user ? `${user.current_balance} USDT` : "Not logged In yet!"}</span>
          </h2>
        </div>

        {/* Center Section */}
        <div className="flex flex-col md:flex-row justify-center gap-6 text-center pb-4 md:pb-0">
          <Link to="/deposit" className="flex flex-col items-center text-white hover:text-blue-600">
            {/* <div className="flex flex-col items-center"> */}
            <CreditCardIcon className="h-6 w-6" />
            <span className="mt-2">Deposit</span>
            {/* </div> */}
          </Link>
          <Link to="/withdraw" className="flex flex-col items-center text-white hover:text-blue-600">
            {/* <div className="flex flex-col items-center"> */}
            <CurrencyDollarIcon className="h-6 w-6" />
            <span className="mt-2">Withdraw</span>
            {/* </div> */}
          </Link>
          <div className="flex flex-col items-center">
            <GiftIcon className="h-6 w-6" />
            <span className="mt-2">Rewards</span>
          </div>
          <div className="flex flex-col items-center">
            <ShareIcon className="h-6 w-6" />
            <span className="mt-2">Referral</span>
          </div>
        </div>

        {/* Right Section */}
        {/* <div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Add Funds</button>
        </div> */}
      </div>
    </div>
  );
};

export default MyAssetsCard;
