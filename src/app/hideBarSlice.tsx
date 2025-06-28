import { createSlice } from "@reduxjs/toolkit";
// Define the initial state using that type
const initialState: any = {
  hideBar: false,
};

export const hideBarSlice = createSlice({
  name: "hideBarSlice",
  initialState,
  reducers: {
    sethideBar: (state, { payload }) => {
      state.hideBar = payload;
    },
  },
});

export const { sethideBar } = hideBarSlice.actions;

export default hideBarSlice.reducer;
