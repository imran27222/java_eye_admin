import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "../utils/axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    refCode: "", // Added refCode field
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Basic validation
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { confirmPassword, password, username, email, refCode } = formData;

      const payload = {
        email,
        password,
        userName: username,
        ...(refCode && { refCode }), // Include refCode if it's not empty
      };

      axios
        .post("/auth/register", payload)
        .then((response) => {
          if (response.data.message) {
            toast.success("Success! Your account registered successfully.", {
              // position: toast.POSITION.TOP_RIGHT,
            });
            navigate("/login");
          }
        })
        .catch((errors) => {
          if (errors.response.data.message) {
            toast.error(errors.response.data.message, {
              // position: toast.POSITION.TOP_RIGHT,
            });
          }
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username<span className="text-red-500">*</span>
            </label>
            <input id="username" type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* New Reference Code Field */}
          <div className="mb-4">
            <label htmlFor="refCode" className="block text-sm font-medium text-gray-700">
              Reference Code
            </label>
            <input id="refCode" type="text" name="refCode" value={formData.refCode} onChange={handleChange} className="w-full p-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign Up
          </button>

          <div className="text-center mt-4 fs-6">
            <Link to="/login">Already have your account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
