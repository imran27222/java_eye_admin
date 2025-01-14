import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router";
import withAuth from "../components/hoc/withAuth";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!formData.newPassword || formData.newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters";
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateForm()) {
      const { currentPassword, newPassword } = formData;

      const payload = {
        currentPassword,
        newPassword,
      };

      axios
        .post("/auth/change-password", payload)
        .then((response) => {
          if (response.data.message) {
            toast.success("Password changed successfully.");
            navigate("/profile");
          }
        })
        .catch((errors) => {
          if (errors.response.data.message) {
            toast.error(errors.response.data.message);
          }
        });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-pink-500 mb-6">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">
              Current Password<span className="text-red-500">*</span>
            </label>
            <input id="currentPassword" type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
            {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
              New Password<span className="text-red-500">*</span>
            </label>
            <input id="newPassword" type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-300">
              Confirm New Password<span className="text-red-500">*</span>
            </label>
            <input id="confirmNewPassword" type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
            {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword}</p>}
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500" disabled={isLoading}>
            Change Password
          </button>

          <div className="text-center mt-4 text-sm text-gray-400">
            <Link to="/profile" className="text-pink-500 hover:underline">
              Go back to Profile
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(ChangePassword);
