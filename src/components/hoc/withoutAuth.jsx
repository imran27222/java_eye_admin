import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const withoutAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    // Access user and token from Redux store
    const { user, token } = useSelector((state) => state.user);

    // If the user is logged in, redirect to home or show a message
    if (user && token) {
      return (
        <div className="min-h-screen bg-[#1a202c] flex items-center justify-center">
          <div className="bg-[#2d3748] p-6 rounded-lg shadow-md w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">You are already logged in!</h2>
            <p className="text-gray-300 mb-6">Please go back to the home page or log out to access this page.</p>
            <button onClick={() => navigate("/")} className="bg-pink-500 text-white py-2 px-6 rounded-md hover:bg-pink-600">
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    // If the user is not logged in, render the wrapped component
    return <WrappedComponent {...props} />;
  };
};

export default withoutAuth;
