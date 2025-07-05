import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface recaptchaSlice {
  data: string;
}

const initialState: recaptchaSlice = {
  data: "",
};

export const recaptchaSlice = createSlice({
  name: "recaptchaSlice",
  initialState,
  reducers: {
    updaterecaptcha: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updaterecaptcha } = recaptchaSlice.actions;

export default recaptchaSlice.reducer;
