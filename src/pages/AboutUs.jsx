import React from "react";
import { AcademicCapIcon, UsersIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-pink-500">About GFT TREASURE</h1>
          <p className="text-gray-300 mt-4 text-lg">Discover the best treasures and unique experiences. We are dedicated to providing you with the finest in everything!</p>
        </div>

        {/* Our Mission Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center text-pink-500 mb-4">Our Mission</h2>
          <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto">
            At GFT TREASURE, our mission is to bring the best treasures to your doorstep. Whether it's products, experiences, or services, we ensure that every treasure is of the highest quality, offering our customers an unparalleled experience. Our team is dedicated to providing excellence in
            everything we do.
          </p>
        </div>

        {/* Core Values Section */}
        <div className="flex flex-col sm:flex-row sm:space-x-12 text-center">
          <div className="mb-8 sm:mb-0">
            <AcademicCapIcon className="h-12 w-12 mx-auto text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-200">Knowledge</h3>
            <p className="text-gray-300 mt-2">We believe in sharing knowledge and continuously growing. Our expertise ensures you get the best possible service.</p>
          </div>
          <div className="mb-8 sm:mb-0">
            <UsersIcon className="h-12 w-12 mx-auto text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-200">Community</h3>
            <p className="text-gray-300 mt-2">At GFT TREASURE, we value building a strong and supportive community where everyone can thrive and succeed.</p>
          </div>
          <div className="mb-8 sm:mb-0">
            <GlobeAltIcon className="h-12 w-12 mx-auto text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-200">Innovation</h3>
            <p className="text-gray-300 mt-2">We are always at the cutting edge of innovation, bringing you new and exciting treasures that push the boundaries of what’s possible.</p>
          </div>
        </div>

        {/* Team Section */}
        {/* <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-pink-500 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-300 mb-8">Our team is made up of passionate individuals committed to making GFT TREASURE the best place for all your needs.</p>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-64 bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="h-24 w-24 mx-auto bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-white">John Doe</h3>
              <p className="text-gray-300">CEO & Founder</p>
            </div>
            <div className="w-64 bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="h-24 w-24 mx-auto bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-white">Jane Smith</h3>
              <p className="text-gray-300">Chief Marketing Officer</p>
            </div>
            <div className="w-64 bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="h-24 w-24 mx-auto bg-gray-700 rounded-full mb-4"></div>
              <h3 className="text-xl font-semibold text-white">Alex Johnson</h3>
              <p className="text-gray-300">Product Manager</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AboutUs;
