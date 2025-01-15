import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "./userService"; // Import the service function

// Async Thunk for Sign-In
export const signin = createAsyncThunk("user/signin", async (credentials, { rejectWithValue }) => {
  try {
    const data = await loginUser(credentials); // Call the login service
    return data; // Assume the API returns a user object and token
  } catch (error) {
    return rejectWithValue(error.message); // Pass the error message to Redux state
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // Stores the logged-in user's information
    token: null, // Stores the user's authentication token
    lastPurchase: null, // Stores the user's last purchase
    loading: false, // Tracks the loading state of the API call
    error: null, // Stores error messages from the API call
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.lastPurchase = null;
    },
    setLastPurchase: (state, action) => {
      state.lastPurchase = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state for the API call
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state for a successful API call
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Assume API returns a `user` object
        state.token = action.payload.token; // Assume API returns a `token`
        state.lastPurchase = action.payload.lastPurchase; // Assume API returns a `lastPurchase`
      })
      // Rejected state for a failed API call
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout, setLastPurchase } = userSlice.actions;
export default userSlice.reducer;
