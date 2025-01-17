import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Timer = () => {
  const lastPurchase = useSelector((state) => state.user.lastPurchase);
  const [remainingTime, setRemainingTime] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (lastPurchase) {
      setShow(true);
      const interval = setInterval(() => {
        const now = Date.now();
        const lastPurchaseTime = new Date(lastPurchase.created_at);
        const timeLeft = 24 * 60 * 60 * 1000 - (now - lastPurchaseTime);
        if (timeLeft > 0) {
          setRemainingTime(Math.max(timeLeft, 0));
        } else {
          setShow(false);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
        setShow(false);
      };
    } else {
      setShow(false);
    }
  }, [lastPurchase]);

  const formatTimeDigits = (time) => {
    const hours = String(Math.floor((time / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, "0");
    return { hours, minutes, seconds };
  };

  if (!(lastPurchase && show)) {
    return null;
  }

  const { hours, minutes, seconds } = formatTimeDigits(remainingTime);

  return (
    <div className="flex justify-center items-center py-5 bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-6 md:p-8 text-center border-2 border-grey-400">
        <h1 className="text-lg sm:text-2xl font-bold text-pink-500 mb-4">Next Purchase Available In:</h1>
        <div className="flex justify-center items-center gap-1 sm:gap-2">
          {[...hours].map((digit, index) => (
            <span key={`hours-${index}`} className="text-lg sm:text-4xl font-bold text-white bg-cyan-600 rounded-md px-3 py-2 shadow">
              {digit}
            </span>
          ))}
          <span className="text-lg sm:text-4xl font-bold text-blue-600">:</span>
          {[...minutes].map((digit, index) => (
            <span key={`minutes-${index}`} className="text-lg sm:text-4xl font-bold text-white bg-cyan-700 rounded-md px-3 py-2 shadow">
              {digit}
            </span>
          ))}
          <span className="text-lg sm:text-4xl font-bold text-green-600">:</span>
          {[...seconds].map((digit, index) => (
            <span key={`seconds-${index}`} className="text-lg sm:text-4xl font-bold text-white bg-cyan-800 rounded-md px-3 py-2 shadow">
              {digit}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timer;
