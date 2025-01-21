import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/axios";
import withAuth from "../components/hoc/withAuth";
import { useNavigate } from "react-router";

const Withdraw = () => {
  const [formData, setFormData] = useState({
    walletAddress: "",
    walletType: "TRC20",
    withdrawAmount: "",
  });

  const [errors, setErrors] = useState({
    walletAddress: "",
    withdrawAmount: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.walletAddress) {
      newErrors.walletAddress = "Wallet address is required";
      isValid = false;
    }

    if (!formData.withdrawAmount || formData.withdrawAmount <= 0) {
      newErrors.withdrawAmount = "Withdraw amount must be greater than zero";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validateForm()) {
        setLoading(true); // Start loading
        const { walletAddress, walletType, withdrawAmount } = formData;

        const payload = {
          wallet_address: walletAddress,
          wallet_type: walletType,
          withdraw_amount: parseFloat(withdrawAmount),
        };

        const response = await api.post("/withdraw", payload);

        if (response.data.message) {
          toast.success("Withdrawal request submitted successfully!", {
            position: "top-right",
          });
          navigate("/");

          setFormData({
            walletAddress: "",
            walletType: "TRC20",
            withdrawAmount: "",
          });
        } else {
          toast.error("Error submitting withdrawal request.");
        }
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-[#1a202c] flex flex-col items-center justify-center">
      <h1 className="text-4xl text-pink-500 font-bold mb-8">Withdraw Now</h1>
      <div className="w-full max-w-md bg-[#2d3748] p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="walletAddress" className="block text-sm text-gray-300 font-medium mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              placeholder="Enter wallet address"
              disabled={loading}
              className={`w-full px-4 py-2 rounded-lg bg-[#4a5568] text-gray-200 border border-[#718096] focus:outline-none focus:ring focus:ring-pink-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.walletAddress && <p className="text-red-500 text-sm mt-1">{errors.walletAddress}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="walletType" className="block text-sm text-gray-300 font-medium mb-2">
              Wallet Type
            </label>
            <select
              id="walletType"
              name="walletType"
              value={formData.walletType}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-4 py-2 rounded-lg bg-[#4a5568] text-gray-200 border border-[#718096] focus:outline-none focus:ring focus:ring-pink-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <option value="TRC20">TRC20</option>
              <option value="ERC20">ERC20</option>
              <option value="BTC">BTC</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="withdrawAmount" className="block text-sm text-gray-300 font-medium mb-2">
              Withdraw Amount
            </label>
            <input
              type="number"
              id="withdrawAmount"
              name="withdrawAmount"
              value={formData.withdrawAmount}
              onChange={handleChange}
              placeholder="Enter amount"
              disabled={loading}
              className={`w-full px-4 py-2 rounded-lg bg-[#4a5568] text-gray-200 border border-[#718096] focus:outline-none focus:ring focus:ring-pink-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            {errors.withdrawAmount && <p className="text-red-500 text-sm mt-1">{errors.withdrawAmount}</p>}
          </div>

          <button type="submit" disabled={loading} className={`w-full py-2 text-lg font-semibold text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
            {loading ? "Processing..." : "Withdraw"}
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

export default withAuth(Withdraw);
