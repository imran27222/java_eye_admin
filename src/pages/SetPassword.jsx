import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { decodeJWT } from "../utils/decodeJWT";

const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      try {
        const decoded = decodeJWT(token);
        const now = Date.now() / 1000;
        if (decoded.payload.exp > now) {
          setIsTokenValid(true);
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        setIsTokenValid(false);
      }
    } else {
      setIsTokenValid(false);
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

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
    setIsLoading(true);

    if (validateForm()) {
      const token = searchParams.get("token");
      const payload = {
        password: formData.password,
      };

      axios
        .post("/auth/reset-password?token=" + token, payload)
        .then((response) => {
          if (response.data.message) {
            toast.success("Password reset successfully. You can now log in.");
            navigate("/login");
          }
        })
        .catch((errors) => {
          if (errors.response?.data?.message) {
            toast.error(errors.response.data.message);
          }
        });
    }
    setIsLoading(false);
  };

  if (!isTokenValid) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-red-500 mb-6">Link Expired</h2>
          <p className="text-gray-300 text-center">The password reset link has expired. Please request a new one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-pink-500 mb-6">Set New Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              New Password<span className="text-red-500">*</span>
            </label>
            <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} disabled={isLoading} className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className={`w-full py-3 px-4 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isLoading}>
            {isLoading ? "Processing..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
