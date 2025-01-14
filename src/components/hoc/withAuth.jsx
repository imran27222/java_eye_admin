import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent, byPassEmailCheck = false) => {
  return (props) => {
    const navigate = useNavigate();

    // Get user and token from the Redux store
    const { user, token } = useSelector((state) => state.user);

    // If the user is not authenticated, redirect to the login page
    if (!user || !token) {
      return (
        <div className="min-h-screen bg-[#1a202c] flex items-center justify-center">
          <div className="bg-[#2d3748] p-6 rounded-lg shadow-md w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">Access Denied</h2>
            <p className="text-gray-300 mb-6">You must be logged in to access this page.</p>
            <button onClick={() => navigate("/login")} className="bg-pink-500 text-white py-2 px-6 rounded-md hover:bg-pink-600">
              Go to Login
            </button>
          </div>
        </div>
      );
    }

    if (!byPassEmailCheck && !user.is_verified) {
      return (
        <div className="min-h-screen bg-[#1a202c] flex items-center justify-center">
          <div className="bg-[#2d3748] p-6 rounded-lg shadow-md w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">Email Verification Required</h2>
            <p className="text-gray-300 mb-6">You must verify your email address to access this page.</p>
            <button onClick={() => navigate("/profile")} className="bg-pink-500 text-white py-2 px-6 rounded-md hover:bg-pink-600">
              Go to Profile
            </button>
          </div>
        </div>
      );
    }

    // If the user is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
