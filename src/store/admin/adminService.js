import api from "../../utils/adminAxios";

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/admin-login", credentials);
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    // Check if the error is due to a response, or a request issue
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to login");
    } else {
      throw new Error(error.message);
    }
  }
};
export const fetchUserService = async () => {
  try {
    const response = await api.get("/auth/by-accesstoken");
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    // Check if the error is due to a response, or a request issue
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to login");
    } else {
      throw new Error(error.message);
    }
  }
};
