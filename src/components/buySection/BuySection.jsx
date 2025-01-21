import React, { useEffect, useState } from "react";
import { findExactNfts } from "../../utils/findNFTs";
import nfts from "../../data/nfts";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/axios";
import { toast } from "react-toastify";
import usePurchaseAuth from "../../hooks/usePurchaseAuth";

function BuySection({ fetchSummary }) {
  const { lastPurchase } = useSelector((store) => store.user);
  const { makePurchase } = usePurchaseAuth();
  const dispatch = useDispatch();

  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleAmountChange = (e) => setSelectedAmount(Number(e.target.value));

  const buyCall = async (payload) => {
    try {
      const { setLastPurchase } = await import("../../store/user/userSlice"); // Import the logout action
      const response = await api.post("/purchase/buy", payload);
      if (response) {
        // work here
        dispatch(setLastPurchase(response.data.product));
        dispatch(fetchUser());
        fetchSummary();
        toast.success("Purchase successful!");
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleBuyNow = async () => {
    try {
      const selectedNfts = findExactNfts(nfts, selectedAmount);
      const purchase_amount = selectedNfts.reduce((acc, item) => {
        acc += item.price;
        return acc;
      }, 0);

      makePurchase({
        cb: () => {
          buyCall({ items: selectedNfts, purchase_amount });
        },
        amount: purchase_amount,
      });
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
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
          <option value="30">30 USDT</option>
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
          <option value="1050">1050 USDT</option>
          <option value="1100">1100 USDT</option>
          <option value="1150">1150 USDT</option>
          <option value="1200">1200 USDT</option>
          <option value="1250">1250 USDT</option>
          <option value="1300">1300 USDT</option>
          <option value="1350">1350 USDT</option>
          <option value="1400">1400 USDT</option>
          <option value="1450">1450 USDT</option>
          <option value="1500">1500 USDT</option>
          <option value="1550">1550 USDT</option>
          <option value="1600">1600 USDT</option>
          <option value="1650">1650 USDT</option>
          <option value="1700">1700 USDT</option>
          <option value="1750">1750 USDT</option>
          <option value="1800">1800 USDT</option>
          <option value="1850">1850 USDT</option>
          <option value="1900">1900 USDT</option>
          <option value="1950">1950 USDT</option>
          <option value="2000">2000 USDT</option>
          <option value="2050">2050 USDT</option>
          <option value="2100">2100 USDT</option>
          <option value="2150">2150 USDT</option>
          <option value="2200">2200 USDT</option>
          <option value="2250">2250 USDT</option>
          <option value="2300">2300 USDT</option>
          <option value="2350">2350 USDT</option>
          <option value="2400">2400 USDT</option>
          <option value="2450">2450 USDT</option>
          <option value="2500">2500 USDT</option>
          <option value="2550">2550 USDT</option>
          <option value="2600">2600 USDT</option>
          <option value="2650">2650 USDT</option>
          <option value="2700">2700 USDT</option>
          <option value="2750">2750 USDT</option>
          <option value="2800">2800 USDT</option>
          <option value="2850">2850 USDT</option>
          <option value="2900">2900 USDT</option>
          <option value="2950">2950 USDT</option>
          <option value="3000">3000 USDT</option>
          <option value="3050">3050 USDT</option>
          <option value="3100">3100 USDT</option>
          <option value="3150">3150 USDT</option>
          <option value="3200">3200 USDT</option>
          <option value="3250">3250 USDT</option>
          <option value="3300">3300 USDT</option>
          <option value="3350">3350 USDT</option>
          <option value="3400">3400 USDT</option>
          <option value="3450">3450 USDT</option>
          <option value="3500">3500 USDT</option>
          <option value="3550">3550 USDT</option>
          <option value="3600">3600 USDT</option>
          <option value="3650">3650 USDT</option>
          <option value="3700">3700 USDT</option>
          <option value="3750">3750 USDT</option>
          <option value="3800">3800 USDT</option>
          <option value="3850">3850 USDT</option>
          <option value="3900">3900 USDT</option>
          <option value="3950">3950 USDT</option>
          <option value="4000">4000 USDT</option>
          <option value="4050">4050 USDT</option>
          <option value="4100">4100 USDT</option>
          <option value="4150">4150 USDT</option>
          <option value="4200">4200 USDT</option>
          <option value="4250">4250 USDT</option>
          <option value="4300">4300 USDT</option>
          <option value="4350">4350 USDT</option>
          <option value="4400">4400 USDT</option>
          <option value="4450">4450 USDT</option>
          <option value="4500">4500 USDT</option>
          <option value="4550">4550 USDT</option>
          <option value="4600">4600 USDT</option>
          <option value="4650">4650 USDT</option>
          <option value="4700">4700 USDT</option>
          <option value="4750">4750 USDT</option>
          <option value="4800">4800 USDT</option>
          <option value="4850">4850 USDT</option>
          <option value="4900">4900 USDT</option>
          <option value="4950">4950 USDT</option>
          <option value="5000">5000 USDT</option>
        </select>
      </div>
      <button onClick={handleBuyNow} className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-bold hover:bg-blue-600">
        Buy Now
      </button>
    </>
  );
}

export default BuySection;
