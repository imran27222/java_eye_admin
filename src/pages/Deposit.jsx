import React, { useState } from "react";
import api from "../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import withAuth from "../components/hoc/withAuth";
// import { QRCodeCanvas } from "qrcode.react";
import qr from "../assets/images/QR.png";

const WALLET_ADDRESS = "TN7GcdXrdZykpciWcahNVo8TfQMYyHttEr";

const Deposit = () => {
  const [transactionNumber, setTransactionNumber] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    setScreenshot(file);
  };

  const validate = () => {
    const newErrors = {};
    if (!transactionNumber.trim()) {
      newErrors.transactionNumber = "Transaction number is required.";
    }
    if (!screenshot) {
      newErrors.screenshot = "Screenshot is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!validate()) {
        return;
      }

      setLoading(true); // Set loading state to true

      const formData = new FormData();
      formData.append("transaction_number", transactionNumber);
      formData.append("image", screenshot, screenshot.name);

      const response = await api.post("/deposit/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.message) {
        toast.success("Form submitted successfully!");
        setTransactionNumber("");
        setScreenshot(null);
        navigate("/");
      } else {
        toast.error("Error submitting form.");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center bg-black">
      <div className="min-h-screen p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-4">Submit Recharge</h1>
        <p className="text-center text-gray-300 mb-4">
          <span className="font-bold">WalletADD:</span> <span className="text-red-500">TRC20</span>
        </p>
        <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md mb-4">
          <p className="text-gray-300 truncate">{WALLET_ADDRESS}</p>
          <button onClick={() => navigator.clipboard.writeText(WALLET_ADDRESS)} className={`text-pink-500 text-sm font-medium hover:underline ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
            Copy
          </button>
        </div>
        <div className="flex justify-center mb-6">
          <img src={qr} width={128} />
          {/* <QRCodeCanvas value={WALLET_ADDRESS} size={128} bgColor="#1f2937" fgColor="#f43f5e" /> */}
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
            disabled={loading}
            className={`w-full bg-gray-800 text-gray-300 p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          />
          {errors.transactionNumber && <span style={{ color: "red" }}>{errors.transactionNumber}</span>}
        </div>
        <div className="mb-6">
          <label htmlFor="screenshot" className="block text-gray-300 font-medium mb-1">
            Recharge Screenshot Upload
          </label>
          <div className={`border border-gray-700 bg-gray-800 p-6 rounded-md flex flex-col items-center justify-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
            {screenshot ? (
              <div className="flex flex-col items-center">
                <p className="text-gray-300 text-sm mb-2">{screenshot.name}</p>
                <button type="button" onClick={() => setScreenshot(null)} disabled={loading} className="text-sm text-red-500 hover:underline">
                  Remove
                </button>
              </div>
            ) : (
              <label className={`cursor-pointer ${loading ? "cursor-not-allowed" : ""}`}>
                <input id="screenshot" type="file" accept="image/*" onChange={handleScreenshotUpload} disabled={loading} className="hidden" />
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v12m0 0l3.5-3.5M12 15l-3.5-3.5M4 13.5A8 8 0 0112 5.5a8 8 0 018 8v5h-4a1 1 0 01-1-1v-1h-6v1a1 1 0 01-1 1H4v-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-gray-500 mt-2 text-sm">Click to upload a screenshot</p>
                </div>
              </label>
            )}
          </div>
          {errors.screenshot && <span style={{ color: "red" }}>{errors.screenshot}</span>}
        </div>
        <button onClick={handleSubmit} disabled={loading} className={`w-full bg-pink-500 text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
          {loading ? "Submitting..." : "OK to Recharge"}
        </button>
      </div>
    </div>
  );
};

export default withAuth(Deposit);
