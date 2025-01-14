import React, { useState, useEffect } from "react";
import api from "../utils/axios";
import withAuth from "../components/hoc/withAuth";
import { Link } from "react-router";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data from API
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/auth");
        const data = response?.data[0];
        if (data) {
          setProfileData(data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a202c] flex items-center justify-center">
        <p className="text-pink-500 font-semibold text-xl">Loading...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-[#1a202c] flex items-center justify-center">
        <p className="text-red-500 font-semibold text-xl">Failed to load profile data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a202c] flex items-center justify-center">
      <div className="bg-[#2d3748] p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-pink-500 mb-6">Profile Page</h2>

        {/* User Details Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-pink-500 mb-4">User Details</h3>
          <div className="bg-[#4a5568] p-6 rounded-md shadow-sm">
            {/* <p className="text-gray-300 mb-2">
              <span className="font-medium text-pink-500">Name:</span> {profileData.name}
            </p> */}
            <p className="text-gray-300 mb-2">
              <span className="font-medium text-pink-500">Username:</span> {profileData.userName}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-pink-500">Email:</span> {profileData.email}
            </p>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-pink-500 mb-4">Change Password</h3>
          <Link to={"/change-password"}>
            <button className="w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">Change Password</button>
          </Link>
        </div>

        {/* Credit Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-pink-500 mb-4">Credits</h3>
          <div className="flex items-center justify-between bg-[#4a5568] p-4 rounded-md shadow-sm">
            <p className="text-gray-300">Total Credits:</p>
            <p className="text-pink-500 font-bold text-lg">${profileData.current_balance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);
