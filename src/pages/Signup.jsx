import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import withoutAuth from "../components/hoc/withoutAuth";

const Signup = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    refCode: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      setFormData((prev) => ({ ...prev, refCode: code }));
    }
  }, [searchParams]);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

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
    setIsLoading(true);

    if (validateForm()) {
      const { confirmPassword, password, username, email, refCode } = formData;

      const payload = {
        email,
        password,
        userName: username,
        ...(refCode && { refCode }),
      };

      axios
        .post("/auth/register", payload)
        .then((response) => {
          if (response.data.message) {
            toast.success("Success! Your account registered successfully.");
            navigate("/login");
          }
        })
        .catch((errors) => {
          if (errors.response?.data?.message) {
            toast.error(errors.response.data.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-pink-500 mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username<span className="text-red-500">*</span>
            </label>
            <input id="username" type="text" name="username" value={formData.username} onChange={handleChange} className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" disabled={isLoading} />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email<span className="text-red-500">*</span>
            </label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" disabled={isLoading} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password<span className="text-red-500">*</span>
            </label>
            <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" disabled={isLoading} />
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
              className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              disabled={isLoading}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="refCode" className="block text-sm font-medium text-gray-300">
              Reference Code
            </label>
            <input id="refCode" type="text" name="refCode" value={formData.refCode} onChange={handleChange} className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" disabled={isLoading} />
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="text-center mt-4 text-sm text-gray-400">
            <Link to="/login" className={`text-pink-500 hover:underline ${isLoading && "pointer-events-none opacity-50"}`}>
              Already have your account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withoutAuth(Signup);
