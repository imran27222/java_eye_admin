import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signin } from "../store/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(signin(formData)).then((unwrapResult) => {
        if (unwrapResult.payload) {
          navigate("/");
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-pink-500 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} className="w-full p-3 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500">
            Login
          </button>
          <div className="text-center mt-4 text-sm text-gray-400">
            <Link to="/signup" className="text-pink-500 hover:underline">
              Create your own account.
            </Link>
          </div>
          <div className="text-center mt-2 text-sm text-gray-400">
            <Link to="/forget-password" className="text-pink-500 hover:underline">
              Forget Your Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
