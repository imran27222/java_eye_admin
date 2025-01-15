import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Timer = () => {
  const lastPurchase = useSelector((state) => state.user.lastPurchase);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (lastPurchase) {
      const interval = setInterval(() => {
        const now = Date.now();
        const lastPurchaseTime = new Date(lastPurchase.created_at);
        const timeLeft = 24 * 60 * 60 * 1000 - (now - lastPurchaseTime);
        setRemainingTime(Math.max(timeLeft, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lastPurchase]);

  const formatTimeDigits = (time) => {
    const hours = String(Math.floor((time / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
    return { hours, minutes, seconds };
  };

  if (!lastPurchase) {
    return null;
  }

  const { hours, minutes, seconds } = formatTimeDigits(remainingTime);

  return (
    <div className="flex justify-center items-center py-5 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 text-center border-4 border-blue-400">
        <h1 className="text-lg sm:text-2xl font-bold text-blue-500 mb-4">Next Purchase Available In:</h1>
        <div className="flex justify-center items-center gap-1 sm:gap-2">
          {[...hours].map((digit, index) => (
            <span key={`hours-${index}`} className="text-lg sm:text-4xl font-bold text-white bg-blue-600 rounded-md px-3 py-2 shadow">
              {digit}
            </span>
          ))}
          <span className="text-lg sm:text-4xl font-bold text-blue-600">:</span>
          {[...minutes].map((digit, index) => (
            <span key={`minutes-${index}`} className="text-lg sm:text-4xl font-bold text-white bg-green-600 rounded-md px-3 py-2 shadow">
              {digit}
            </span>
          ))}
          <span className="text-lg sm:text-4xl font-bold text-green-600">:</span>
          {[...seconds].map((digit, index) => (
            <span key={`seconds-${index}`} className="text-lg sm:text-4xl font-bold text-white bg-red-600 rounded-md px-3 py-2 shadow">
              {digit}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timer;
