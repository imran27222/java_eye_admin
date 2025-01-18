import React, { useEffect, useState } from "react";
import { findExactNfts } from "../../utils/findNFTs";
import nfts from "../../data/nfts";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/axios";
import { toast } from "react-toastify";
import usePurchaseAuth from "../../hooks/usePurchaseAuth";

function BuySection() {
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

      console.log("Purchase Payload: ", { items: selectedNfts, purchase_amount });
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
