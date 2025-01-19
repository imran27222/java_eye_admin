import React, { useEffect, useState } from "react";
import withAuth from "../components/hoc/withAuth";
import Timer from "../components/purchase/Timer";
import YourCollection from "../components/buySection/YourCollection";
import BuySection from "../components/buySection/BuySection";
import api from "../utils/axios";

const NFTBuy = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [investedBalance, setInvestedBalance] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [todayEarning, setTodayEarning] = useState(0);
  const [reservationRange, setReservationRange] = useState("1-1000");
  const [profitRate, setProfitRate] = useState("0-3%");

  const fetchSummary = async () => {
    try {
      const response = await api.get("/auth/buy-summary");
      if (response?.data) {
        setWalletBalance(response?.data?.wallet_balance);
        setInvestedBalance(response?.data?.invested_balance);
        setTotalEarning(response?.data?.total_earning);
        setTodayEarning(response?.data?.today_earning);
      }
    } catch (error) {
      if (error.response.data.message) {
      }
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center p-6">
      <h1 className="text-3xl text-pink-500 font-semibold mb-6">GFT BUY</h1>

      {/* Balance and Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-4xl mb-6">
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

      <BuySection fetchSummary={fetchSummary} />

      <Timer />
      <YourCollection />
    </div>
  );
};

export default withAuth(NFTBuy);
