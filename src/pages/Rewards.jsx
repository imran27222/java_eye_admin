import React from "react";
import { Link } from "react-router";

const Rewards = () => {
  //   const rewards = [
  //     { id: 1, title: "10% Discount Coupon", points: 500 },
  //     { id: 2, title: "Free Shipping Voucher", points: 1000 },
  //     { id: 3, title: "Exclusive Gift Box", points: 2000 },
  //   ];

  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-900">
  //       <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl text-gray-300">
  //         <h2 className="text-3xl font-semibold text-center text-pink-500 mb-6">Rewards</h2>

  //         <p className="text-center text-gray-400 mb-4">Earn points and redeem amazing rewards for your loyalty!</p>

  //         {/* Reward List */}
  //         <div className="space-y-4">
  //           {rewards.map((reward) => (
  //             <div key={reward.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-md shadow-md">
  //               <div>
  //                 <h3 className="text-lg font-bold text-pink-500">{reward.title}</h3>
  //                 <p className="text-sm text-gray-400">Requires {reward.points} points</p>
  //               </div>
  //               <button className="px-4 py-2 bg-pink-500 text-white rounded-md font-semibold hover:bg-pink-600 transition duration-300" disabled>
  //                 Redeem
  //               </button>
  //             </div>
  //           ))}
  //         </div>

  //         {/* Points Display */}
  //         <div className="mt-6 p-4 bg-gray-700 rounded-md text-center">
  //           <h3 className="text-lg font-semibold text-gray-300">
  //             Your Current Points: <span className="text-pink-500">1250</span>
  //           </h3>
  //         </div>

  //         {/* CTA Section */}
  //         <div className="text-center mt-4">
  //           <p className="text-sm text-gray-400">Keep shopping and referring to earn more points!</p>
  //         </div>
  //       </div>
  //     </div>
  //   );

  // return (
  //   <div className="flex items-center justify-center min-h-screen bg-gray-900">
  //     <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl text-gray-300">
  //       <h2 className="text-3xl font-semibold text-center text-pink-500 mb-6">Reward Policy</h2>

  //       <p className="text-gray-400 mb-4 text-center">
  //         Learn how to maximize your rewards while enjoying the best treasures at <span className="text-pink-500 font-semibold">gfttreasure.com</span>.
  //       </p>

  //       <div className="space-y-4">
  //         {/* Reward Point 1 */}
  //         <div className="flex items-start">
  //           <span className="text-pink-500 font-bold text-lg mr-2">•</span>
  //           <p className="text-gray-300">
  //             Earn <span className="text-pink-500 font-semibold">3%</span> cashback on every purchase. Your rewards will be added to your account automatically.
  //           </p>
  //         </div>

  //         {/* Reward Point 2 */}
  //         <div className="flex items-start">
  //           <span className="text-pink-500 font-bold text-lg mr-2">•</span>
  //           <p className="text-gray-300">
  //             Purchases must be made <span className="text-pink-500 font-semibold">once every 24 hours</span> to be eligible for cashback rewards.
  //           </p>
  //         </div>

  //         {/* Reward Point 3 */}
  //         <div className="flex items-start">
  //           <span className="text-pink-500 font-bold text-lg mr-2">•</span>
  //           <p className="text-gray-300">You can deposit as much as you want with no restrictions.</p>
  //         </div>
  //       </div>

  //       {/* Notes Section */}
  //       <div className="mt-6 p-4 bg-gray-700 rounded-md">
  //         <h3 className="text-lg font-semibold text-pink-500">Important Notes:</h3>
  //         <ul className="list-disc list-inside text-gray-400 mt-2 space-y-2">
  //           <li>Rewards are subject to account verification and valid transactions.</li>
  //           <li>Reward points cannot be transferred or redeemed for cash.</li>
  //           <li>Check your account dashboard for detailed reward tracking.</li>
  //         </ul>
  //       </div>

  //       {/* Call to Action */}
  //       <div className="text-center mt-6">
  //         <p className="text-gray-400">Start earning today! Visit our store and enjoy amazing rewards for every purchase.</p>
  //         <Link to="/" className="inline-block mt-4 px-6 py-3 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 transition duration-300">
  //           Shop Now
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl text-gray-300">
        <h2 className="text-4xl font-semibold text-center text-pink-500 mb-6">VIP Reward Program</h2>

        <p className="text-gray-400 mb-8 text-center">
          Unlock exclusive rewards and boost your earnings by progressing through our VIP Levels at <span className="text-pink-500 font-semibold">gfttreasure.com</span>.
        </p>

        <div className="space-y-6">
          {/* Member Reference Reward */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-pink-500 mb-2">Reference Member Reward</h3>
            <p className="text-gray-300">
              Earn <span className="text-pink-500 font-bold">20 USDT</span> for every successful member referral.
            </p>
          </div>

          {/* VIP Levels */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-pink-500 mb-2">VIP Levels</h3>
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="bg-gray-700 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="text-gray-300">
                  <h4 className="text-lg font-semibold">
                    <span className="text-pink-500">VIP LEVEL {level}</span>
                  </h4>
                  <p>RAFAL: {level * 10}</p>
                  <p>DEPOSIT: $100</p>
                </div>
                <div className="text-right sm:text-left">
                  <p className="text-pink-500 text-lg font-bold">MEMBER MONTHLY INCOME: ${level * 150}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <p className="text-gray-400">Join our VIP program today and start earning incredible rewards. Take the first step towards financial freedom!</p>
          <Link to="/" className="inline-block mt-6 px-6 py-3 bg-pink-500 text-white hover:text-grey-200 font-semibold rounded-md hover:bg-pink-600 transition duration-300">
            Become a VIP Member
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
