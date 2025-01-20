import React from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold text-pink-500 mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-300 mb-8">Oops! The page you're looking for doesn't exist. It may have been moved or deleted.</p>
        <Link to="/" className="bg-pink-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-pink-600 transition duration-300">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
