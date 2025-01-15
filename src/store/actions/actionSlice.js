import { createSlice } from "@reduxjs/toolkit";

const actionSlice = createSlice({
  name: "actions",
  initialState: {
    emailSent: null,
  },
  reducers: {
    sendEmail: (state, action) => {
      state.emailSent = action.payload;
    },
  },
});

export const { sendEmail } = actionSlice.actions;
export default actionSlice.reducer;
