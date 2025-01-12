import React, { useState } from "react";

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState(null);

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#1a202c] flex items-center justify-center">
      <div className="bg-[#2d3748] p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-pink-500 mb-6">Profile Page</h2>

        {/* Profile Picture and Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-pink-500 shadow-md">
            {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-500 bg-[#4a5568]">No Image</div>}
          </div>
          <label className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-pink-600">
            Upload Profile Picture
            <input type="file" accept="image/*" onChange={handleProfileUpload} className="hidden" />
          </label>
        </div>

        {/* Assets Credit */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-pink-500 mb-4">Assets Credit</h3>
          <div className="flex items-center justify-between bg-[#4a5568] p-4 rounded-md shadow-sm">
            <p className="text-gray-300">Total Credits:</p>
            <p className="text-pink-500 font-bold text-lg">$1,250</p>
          </div>
        </div>

        {/* History of Deposit and Withdraw */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-pink-500 mb-4">History</h3>
          <div className="bg-[#4a5568] p-4 rounded-md shadow-sm">
            <h4 className="text-lg font-medium text-gray-300 mb-2">Deposits</h4>
            <ul className="list-disc list-inside text-gray-400">
              <li>Jan 5th - $500</li>
              <li>Feb 10th - $300</li>
            </ul>
            <h4 className="text-lg font-medium text-gray-300 mt-4 mb-2">Withdrawals</h4>
            <ul className="list-disc list-inside text-gray-400">
              <li>Jan 20th - $200</li>
              <li>Feb 15th - $100</li>
            </ul>
          </div>
        </div>

        {/* Reset Password CTA */}
        <div className="mb-8">
          <button className="w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Reset Password</button>
        </div>

        {/* List of Cards */}
        <div>
          <h3 className="text-xl font-semibold text-pink-500 mb-4">Your Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Example Card */}
            <div className="bg-[#4a5568] p-4 rounded-md shadow-sm">
              <h4 className="text-lg font-medium text-gray-300">Visa - **** 1234</h4>
              <p className="text-gray-400">Expiry: 12/25</p>
            </div>
            <div className="bg-[#4a5568] p-4 rounded-md shadow-sm">
              <h4 className="text-lg font-medium text-gray-300">MasterCard - **** 5678</h4>
              <p className="text-gray-400">Expiry: 10/24</p>
            </div>
            {/* Add more cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
