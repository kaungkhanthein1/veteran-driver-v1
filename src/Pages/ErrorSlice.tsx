// errorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "errorslice",
  initialState: {
    message: null,
    type: null, // 'error' or 'success'
    showToast: false,
  },
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type; // 'error' or 'success'
      state.showToast = true;
    },
    hideToast: (state) => {
      state.message = null;
      state.type = null;
      state.showToast = false;
    },
  },
});

export const { showToast, hideToast } = errorSlice.actions;
export default errorSlice.reducer;
