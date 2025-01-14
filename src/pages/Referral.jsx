import React, { useState } from "react";
import withAuth from "../components/hoc/withAuth";

const Referral = () => {
  const [referralCode] = useState("GFT12345"); // Replace with your actual referral code
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.target.select();
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-gray-300">
        <h2 className="text-2xl font-semibold text-center text-pink-500 mb-4">Referral Program</h2>

        {/* Referral Code Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Your Referral Code:</label>
          <input type="text" value={referralCode} readOnly onClick={handleCopy} className={`w-full p-3 bg-gray-700 text-lg font-semibold text-pink-500 rounded-md cursor-pointer focus:outline-none focus:ring-2 ${copied ? "focus:ring-green-500" : "focus:ring-pink-500"}`} />
          {copied && <p className="text-green-500 text-sm mt-2">Copied to clipboard!</p>}
        </div>

        {/* Invitees Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Number of Invitees:</label>
          <div className="bg-gray-700 p-3 rounded-md text-lg font-semibold text-pink-500 text-center">12</div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-sm text-gray-400">Share your referral code and earn rewards!</p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Referral);
