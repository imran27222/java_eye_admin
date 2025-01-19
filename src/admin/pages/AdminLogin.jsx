import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signinAdmin } from "../../store/admin/adminSlice";
import { useNavigate } from "react-router";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      // Add login logic here

      dispatch(signinAdmin({ email, password })).then((unwrapResult) => {
        if (unwrapResult.type === "user/signin/fulfilled") {
          toast.success("Admin Login successful!");
          navigate("/admin");
        } else {
          toast.error(unwrapResult.payload);
        }
      });
    } catch (error) {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" required />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" required />
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
