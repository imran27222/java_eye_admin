import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserService, loginUser } from "./adminService"; // Import the service function

// Async Thunk for Sign-In
export const signinAdmin = createAsyncThunk("user/signin", async (credentials, { rejectWithValue }) => {
  try {
    const data = await loginUser(credentials); // Call the login service
    return data; // Assume the API returns a user object and token
  } catch (error) {
    return rejectWithValue(error.message); // Pass the error message to Redux state
  }
});
export const fetchAdmin = createAsyncThunk("user/fetchuser", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchUserService(); // Call the login service
    return data; // Assume the API returns a user object and token
  } catch (error) {
    return rejectWithValue(error.message); // Pass the error message to Redux state
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: null, // Stores the logged-in user's information
    token: null, // Stores the user's authentication token
    loading: false, // Tracks the loading state of the API call
    error: null, // Stores error messages from the API call
  },
  reducers: {
    setAdmin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    logoutAdmin: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state for the API call
      .addCase(signinAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state for a successful API call
      .addCase(signinAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Assume API returns a `user` object
        state.token = action.payload.token; // Assume API returns a `token`
        state.lastPurchase = action.payload.lastPurchase; // Assume API returns a `lastPurchase`
      })
      // Rejected state for a failed API call
      .addCase(signinAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Assume API returns a `user` object
        state.token = action.payload.token; // Assume API returns a `token`
        state.lastPurchase = action.payload.lastPurchase; // Assume API returns a `lastPurchase`
      })
      .addCase(fetchAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { setAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
