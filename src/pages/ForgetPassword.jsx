import React from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-sm bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-pink-500 mb-4 text-center">Forgot Password</h1>
        <p className="text-gray-400 text-sm text-center mb-6">Enter your email address, and we will send you a link to reset your password.</p>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input type="email" id="email" placeholder="Enter your email" className="w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
          </div>
          <button type="submit" className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold rounded-lg transition">
            Send Reset Link
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-gray-400 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
