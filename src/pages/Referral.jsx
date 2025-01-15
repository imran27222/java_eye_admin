import React, { useEffect, useState } from "react";
import withAuth from "../components/hoc/withAuth";
import { useSelector } from "react-redux";
import api from "../utils/axios";
import { QRCodeCanvas } from "qrcode.react";

const Referral = () => {
  const [referralCode, setReferralCode] = useState("");
  const [invitees, setInvitees] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copiedURL, setCopiedURL] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((store) => store.user);

  const fetchReference = async () => {
    setCopiedURL(false);
    try {
      setIsLoading(true);
      const response = await api.get("/auth/reference");
      if (response) {
        setReferralCode(response.data.code);
        setInvitees(response.data.invitees);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReference();
  }, [user]);

  const handleCopy = (e) => {
    e.target.select();
    setCopiedURL(false);

    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };
  const handleCopyURL = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(`${import.meta.env.VITE_WEB_URL}/signup?code=${referralCode}`).then(() => {
      setCopiedURL(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-gray-300">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent border-dashed rounded-full animate-spin"></div>
            <p className="text-pink-500 font-medium mt-4">Loading...</p>
          </div>
        </div>
      </div>
    );
  }
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

        {/* QR Code Section */}
        <div className="mb-6 text-center">
          <label className="block text-sm font-medium mb-2">Your QR Code:</label>

          <div className="bg-gray-700 p-4 rounded-lg inline-block cursor-pointer">
            <QRCodeCanvas value={`${import.meta.env.VITE_WEB_URL}/signup?code=${referralCode}` || "No code available"} size={128} bgColor="#1f2937" fgColor="#f43f5e" onClick={handleCopyURL} />
            {copiedURL && <p className="text-green-500 text-sm mt-2">Copied to clipboard!</p>}
          </div>
          <p className="text-xs text-gray-400 mt-2">Scan this QR code to share your referral code.</p>
        </div>

        {/* Invitees Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Number of Invitees:</label>
          <div className="bg-gray-700 p-3 rounded-md text-lg font-semibold text-pink-500 text-center">{invitees.length}</div>
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
