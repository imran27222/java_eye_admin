// axiosInstance.js
import axios from "axios";

import { store } from "../store/store"; // Import your Redux store

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the token from Redux
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from Redux store
    const state = store.getState();
    const token = state.admin.token; // Assuming your admin slice stores the token
    // If a token exists, add it to the request headers
    if (token) {
      config.headers["x-auth-token"] = token;
      // config.headers["x-auth-token"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
