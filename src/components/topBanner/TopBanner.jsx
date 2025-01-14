import React, { useState } from "react";
import { useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useSelector((state) => state.user);

  if (!isVisible || !user || user.emailVerified) {
    return null; // Don't display if hidden or email is verified
  }

  return (
    <div className="bg-yellow-500 text-white py-3 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-sm md:text-base font-semibold">Verify your email to access all features of GFT Treasure! (If you already verified, Please re-Login)</span>
      </div>
      <button onClick={() => setIsVisible(false)} className="bg-blue-100 text-white hover:text-blue-800">
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default TopBanner;
